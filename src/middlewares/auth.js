const { verifyToken } = require("../utils/jwt");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) return res.status(402).json({ message: "Access denied" });

  try {
    const { username, email, id } = verifyToken(token);
    req.user = { username, email, id };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateUser };
