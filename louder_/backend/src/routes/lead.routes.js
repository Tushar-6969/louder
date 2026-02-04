import express from "express";
import { createLead } from "../controllers/lead.controller.js";

const router = express.Router();

/**
 * @route   POST /api/leads
 * @desc    Save lead email + consent + event reference
 */
router.post("/", createLead);

export default router;
