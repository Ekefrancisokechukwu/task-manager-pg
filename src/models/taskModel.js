const db = require("../config/db");

const createTask = async (task) => {
  const { title, user_id, description, status, category, priority, due_date } =
    task;

  const query = `
  INSERT INTO tasks (title, user_id, description, status, category, priority, due_date)
   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
  `;

  const value = [
    title,
    user_id,
    description,
    status,
    category,
    priority,
    due_date,
  ];

  const result = await db.query(query, value);
  return result.rows[0];
};

const getTaskById = async (id) => {
  const query = `
  SELECT * FROM tasks
  WHERE id = $1
  `;

  const result = await db.query(query, [id]);
  return result.rows[0];
};

module.exports = {
  createTask,
  getTaskById,
};
