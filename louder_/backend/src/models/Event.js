import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    dateTime: {
      type: Date,
    },

    venue: {
      type: String,
    },

    address: {
      type: String,
    },

    city: {
      type: String,
      default: "Sydney",
    },

    description: {
      type: String,
    },

    category: {
      type: [String],
    },

    imageUrl: {
      type: String,
    },

    source: {
      type: String, // Eventbrite, TimeOut, etc.
      required: true,
    },

    originalUrl: {
      type: String,
      required: true,
      unique: true, // IMPORTANT for detecting new/updated events
    },

    status: {
      type: String,
      enum: ["new", "updated", "inactive", "imported"],
      default: "new",
    },

    lastScrapedAt: {
      type: Date,
      default: Date.now,
    },

    // Dashboard import fields
    importedAt: {
      type: Date,
    },

    importedBy: {
      type: String, // admin email
    },

    importNotes: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
