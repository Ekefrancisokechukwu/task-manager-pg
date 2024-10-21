const db = require("../config/db");
const { createTask, getTaskById } = require("../models/taskModel");

const addTask = async (req, res) => {
  const title = req.body.title;
  const user_id = req.user.id;
  const newTask = { ...req.body, user_id };

  if (!title) return res.status(400).json({ message: "Please provide title" });

  const task = await createTask(newTask);

  res.status(201).json({ message: "Task added", task });
};

const getTasks = async (req, res) => {
  const user_id = req.user.id;
  const { sort_priority, status, due_date } = req.query;

  let query = ` 
   SELECT * FROM tasks
   WHERE user_id = $1`;

  const values = [user_id];

  if (status) {
    query += " AND status = $2";
    values.push(status);
  }

  if (due_date) {
    query += ` AND due_date = $3`;
    values.push("2024-11-02");
  }

  if (sort_priority) {
    if (sort_priority === "low") {
      query += " ORDER BY priority ASC";
    } else if (sort_priority === "high") {
      query += " ORDER BY priority DESC";
    }
  }

  const result = await db.query(query, values);

  res.status(200).json({ tasks: result.rows, count: result.rowCount });
};

const getSingleTask = async (req, res) => {
  const { id: taskId } = req.params;
  const user_id = req.user.id;

  const task = await getTaskById(taskId);

  if (!task)
    return res
      .status(404)
      .json({ message: `Task with id: ${taskId} not found` });

  // Check if the task belongs to the logged-in user
  if (task.user_id !== user_id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this task" });
  }

  res.status(200).json({ task });
};

const updateTask = async (req, res) => {
  const { title, description, status, category, priority, due_date } = req.body;

  const { id: taskId } = req.params;
  const user_id = req.user.id;

  const task = await getTaskById(taskId);

  if (!task)
    return res
      .status(404)
      .json({ message: `Task with id: ${taskId} not found` });

  // Check if the task belongs to the logged-in user
  if (task.user_id !== user_id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this task" });
  }

  const updatedTitle = title || task.title;
  const updatedDescription = description || task.description;
  const updatedStatus = status || task.status;
  const updatedCategory = category || task.category;
  const updatedPriority = priority || task.priority;
  const updatedDueDate = due_date || task.due_date;

  const query = `
  UPDATE tasks
  SET title = $1, description = $2, status = $3, category = $4, priority = $5, due_date = $6
  WHERE id = $7 AND user_id = $8
  RETURNING *
  `;

  const value = [
    updatedTitle,
    updatedDescription,
    updatedStatus,
    updatedCategory,
    updatedPriority,
    updatedDueDate,
    taskId,
    user_id,
  ];
  const result = await db.query(query, value);

  res.status(200).json({ message: "Task updated", task: result.rows[0] });
};

const deleteTask = async (req, res) => {
  const { id: taskId } = req.params;
  const user_id = req.user.id;

  const task = await getTaskById(taskId);

  if (!task)
    return res
      .status(404)
      .json({ message: `Task with id: ${taskId} not found` });

  // Check if the task belongs to the logged-in user
  if (task.user_id !== user_id) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this task" });
  }

  const query = `
  DELETE FROM tasks
  WHERE id = $1 AND user_id = $2
  `;

  const result = await db.query(query, [taskId, user_id]);

  if (result.rowCount === 0) {
    return res.status(404).json({ message: "Not authorized" });
  }

  res.status(200).json({ message: "Task deleted successfuly" });
};

module.exports = { addTask, getTasks, deleteTask, updateTask, getSingleTask };
