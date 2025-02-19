const Task = require("../models/TaskModel");
const { StatusCodes } = require("http-status-codes");
const { validateMongoDbId } = require("../utils/validateMongoDbId");

const createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const task = await Task.create({
      title,
      description,
      status: status || "pending",
      user: req.user._id,
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    console.error("Create task error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const skip = (page - 1) * limit;
    
    const query = { user: req.user._id };
    
    if (status) {
      query.status = status; 
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const tasks = await Task.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Task.countDocuments(query);

    res.status(StatusCodes.OK).json({
      success: true,
      data: tasks,
      pagination: {
        current: parseInt(page),
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch tasks",
      error: error.message,
    });
  }
};


const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateMongoDbId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: task,
    });
  } catch (error) {
    console.error("Get task by ID error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch task",
      error: error.message,
    });
  }
};


const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!validateMongoDbId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOneAndUpdate(
      { _id: id, user: req.user._id },
      { title, description, status },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    console.error("Update task error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to update task",
      error: error.message,
    });
  }
};


const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validateMongoDbId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    const task = await Task.findOneAndDelete({ _id: id, user: req.user._id });

    if (!task) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to delete task",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
