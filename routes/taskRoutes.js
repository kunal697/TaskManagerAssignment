const express = require("express");
const protect = require("../middleware/authMiddleware");
const {createTask, getTasks, getTaskById, updateTask, deleteTask} = require("../controllers/taskController");

const router = express.Router();

router.post("/create",protect, createTask); 
router.get("/",protect, getTasks);
router.get("/:id",protect, getTaskById);
router.put("/:id",protect, updateTask);
router.delete("/:id",protect, deleteTask);

module.exports = router;
