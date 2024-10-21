const { Router } = require("express");
const {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
  getSingleTask,
} = require("../controllers/taskController");

const router = Router();

router.route("/").post(addTask).get(getTasks);
router.route("/:id").delete(deleteTask).put(updateTask).get(getSingleTask);

module.exports = router;
