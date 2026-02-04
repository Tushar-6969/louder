// controllers/event.controller.js

import Event from "../models/Event.js";

/**
 * PUBLIC
 * GET /api/events
 */
export const getPublicEvents = async (req, res) => {
  try {
    const events = await Event.find({
      status: { $ne: "inactive" },
    }).sort({ dateTime: 1 });

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
};

/**
 * DASHBOARD
 * GET /api/events/dashboard
 */
export const getDashboardEvents = async (req, res) => {
  try {
    const { city, keyword, startDate, endDate } = req.query;
    let query = {};

    if (city) query.city = city;

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { venue: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (startDate || endDate) {
      query.dateTime = {};
      if (startDate) query.dateTime.$gte = new Date(startDate);
      if (endDate) query.dateTime.$lte = new Date(endDate);
    }

    const events = await Event.find(query).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Dashboard fetch failed" });
  }
};

/**
 * DASHBOARD ACTION
 * POST /api/events/:id/import
 */
export const importEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.status = "imported";
    event.importedAt = new Date();
    event.importedBy = req.user?.email || "admin";
    event.importNotes = req.body.importNotes || "";

    await event.save();

    res.json({
      message: "Event imported successfully",
      event,
    });
  } catch (error) {
    res.status(500).json({ message: "Import failed" });
  }
};
