const Task = require("../models/Task");

const createTask = async (req, res) => {
  try {

    console.log(req.user);

    const {
      title,
      description,
      priority,
      assignedTo,
      status,
    } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo: assignedTo || null,
      status,
      createdBy: req.user._id,
    });

    res.status(201).json(task);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const getTasks = async (req, res) => {
  try {

    let tasks;

    // Admin can see all tasks
    if (req.user.role === "Admin") {

      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("createdBy", "name")
        .populate("project", "title");

    } else {

      // Member sees only assigned tasks
      tasks = await Task.find({
        assignedTo: req.user._id,
      })
        .populate("assignedTo", "name email")
        .populate("createdBy", "name")
        .populate("project", "title");
    }

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateTaskStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    // Member can update only assigned task
    if (
      req.user.role === "Member" &&
      task.assignedTo &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You can update only assigned tasks",
      });
    }

    task.status = status;

    await task.save();

    res.status(200).json(task);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      message: "Task deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask,
};