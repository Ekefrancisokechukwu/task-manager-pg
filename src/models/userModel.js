const db = require("../config/db");

const createUser = async (username, email, password) => {
  const query = `
  INSERT INTO users (username,email,password)
  VALUES ($1, $2, $3)
  RETURNING id, username, email
  `;
  const value = [username, email, password];
  const result = await db.query(query, value);
  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const query = `
  SELECT * FROM users
  WHERE email = $1
  `;
  const result = await db.query(query, [email]);
  return result.rows[0];
};

module.exports = {
  createUser,
  getUserByEmail,
};
