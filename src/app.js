require("express-async-errors");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

const rateLimiter = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const errorHandlerMiddleware = require("./middlewares/error-handler");
const notFoundMiddleware = require("./middlewares/not-found");

// routes
const authRoutes = require("./routes/authRoute");
const taskRoutes = require("./routes/taskRoute");
const { authenticateUser } = require("./middlewares/auth");

const app = express();

app.set("trust proxy", 1);
app.use(rateLimiter({ windowMS: 15 * 60 * 1000, max: 60 }));

app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
//serve static file
app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/task", authenticateUser, taskRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

module.exports = app;
