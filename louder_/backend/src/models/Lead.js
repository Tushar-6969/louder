import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },

    consent: {
      type: Boolean,
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", leadSchema);
