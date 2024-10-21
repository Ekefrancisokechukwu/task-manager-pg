const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const db = new Pool({
  connectionString: process.env.DATABASE_URL,
});

db.connect((err, client, release) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
  } else {
    console.log("Connected to the PostgreSQL database successfully");
  }
  release();
});

const closeDB = async () => {
  try {
    await db.end();
    console.log("Database connection closed");
  } catch (err) {
    console.error("Error closing the database connection:", err.stack);
  }
};

db.on("error", (err) => {
  console.error("Error connecting to the database:", err);
  process.exit(-1);
});

module.exports = db;
