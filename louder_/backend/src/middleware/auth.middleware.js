const isAuth = (req, res, next) => {
  console.log("AUTH CHECK");
  console.log("req.user:", req.user);
  console.log("isAuthenticated:", req.isAuthenticated?.());

  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized" });
};

export default isAuth;




// import jwt from "jsonwebtoken";

// const isAuth = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   try {
//     const token = authHeader.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded; // { id, email, name }
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default isAuth;
