const Task = require("../models/Task");

const getDashboardData = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();

    const todoTasks = await Task.countDocuments({
      status: "To Do",
    });

    const inProgressTasks = await Task.countDocuments({
      status: "In Progress",
    });

    const completedTasks = await Task.countDocuments({
      status: "Done",
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Done" },
    });

    const tasks = await Task.find().populate(
      "assignedTo",
      "name email"
    );

    res.status(200).json({
      totalTasks,
      todoTasks,
      inProgressTasks,
      completedTasks,
      overdueTasks,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardData,
};