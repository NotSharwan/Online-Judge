const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  // console.log("Received Header:", req.header("Authorization"));
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const token = authHeader.split(" ")[1];
    // console.log("Extracted Token:", authHeader.split(" ")[1]); // Extract token after "Bearer "
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("JWT Secret:", process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
