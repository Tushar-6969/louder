import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import leadRoutes from "./routes/lead.routes.js";

dotenv.config();

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // 🔥 REQUIRED
  })
);

app.use(express.json());

/* -------------------- SESSION (🔥 FIXED) -------------------- */
app.use(
  session({
    // ❌ DO NOT CHANGE NAME — Passport expects this
    name: "connect.sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // localhost only
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

/* -------------------- PASSPORT -------------------- */
app.use(passport.initialize());
app.use(passport.session());

/* -------------------- ROUTES -------------------- */
app.get("/", (req, res) => {
  res.send("Louder Events API running");
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/leads", leadRoutes);

export default app;
