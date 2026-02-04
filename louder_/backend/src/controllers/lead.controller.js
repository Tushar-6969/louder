// controllers/lead.controller.js

import Lead from "../models/Lead.js";

/**
 * PUBLIC
 * POST /api/leads
 */
export const createLead = async (req, res) => {
  try {
    const { email, consent, eventId } = req.body;

    if (!email || !consent || !eventId) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const lead = await Lead.create({
      email,
      consent,
      event: eventId,
    });

    res.status(201).json({
      message: "Lead saved successfully",
      lead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to save lead",
    });
  }
};
