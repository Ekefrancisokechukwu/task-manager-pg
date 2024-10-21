const bcrypt = require("bcryptjs");
const { createUser, getUserByEmail } = require("../models/userModel");
const db = require("../config/db");
const { attachCookiesToResponse } = require("../utils/jwt");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const emailExists = await getUserByEmail(email);

  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 16);
  const newUser = await createUser(username, email, hashedPassword);

  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  const user = await getUserByEmail(email);

  if (!user) return res.status(400).json({ message: "User not found" });

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword)
    return res.status(400).json({ message: "Invalid password" });

  const tokenUser = {
    username: user.username,
    email: user.email,
    id: user.id,
  };

  const token = attachCookiesToResponse(tokenUser, res);

  res.status(200).json({
    message: "Login successfully",
    user: {
      username: user.username,
      email: user.email,
      id: user.id,
    },
    token,
  });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json({ message: "User logged out successfully" });
};

module.exports = { register, login, logout };
