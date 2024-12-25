const jwt = require("jsonwebtoken");
const { User } = require("../Model/user");


const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"] || req.headers["Authorization"];

  if (!token) {
    return res.status(401).json({ error: "Access denied. Token is required." });
  }

  if (!process.env.SECRET_KEY) {
    return res
      .status(500)
      .json({ error: "Internal server error. Missing SECRET_KEY." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
     if (!decoded.userId) {
       return res
         .status(401)
         .json({ error: "Invalid token. User ID not found." });
     }
     
    req.user = decoded;
    const user = await User.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const username = user.fullname;
    req.username = username;
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = {verifyToken}
