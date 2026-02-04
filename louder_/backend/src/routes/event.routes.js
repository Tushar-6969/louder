import express from "express";
import isAuth from "../middleware/auth.middleware.js";
import {
  getPublicEvents,
  getDashboardEvents,
  importEvent,
} from "../controllers/event.controller.js";

const router = express.Router();

/**
 * @route   GET /api/events
 * @desc    Public event listing
 */
router.get("/", getPublicEvents);

/**
 * @route   GET /api/events/dashboard
 * @desc    Admin dashboard event listing (protected)
 */
router.get("/dashboard", isAuth, getDashboardEvents);

/**
 * @route   POST /api/events/:id/import
 * @desc    Import event into platform (protected)
 */
router.post("/:id/import", isAuth, importEvent);

export default router;
