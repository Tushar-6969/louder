// controllers/auth.controller.js

export const getMe = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ user: null });
  }

  res.json({ user: req.user });
};

export const logoutUser = (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.json({ message: "Logged out successfully" });
  });
};
