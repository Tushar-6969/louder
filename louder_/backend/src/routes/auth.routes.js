import express from "express";
import passport from "passport";
import {
  getMe,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

/**
 * @route   GET /api/auth/google
 * @desc    Login with Google
 */
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback
 */
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // successful login
    res.redirect("http://localhost:5173/dashboard");
  }
);

/**
 * @route   GET /api/auth/logout
 * @desc    Logout user
 */
router.get("/logout", logoutUser);

/**
 * @route   GET /api/auth/me
 * @desc    Get logged-in user
 */
router.get("/me", getMe);

export default router;

