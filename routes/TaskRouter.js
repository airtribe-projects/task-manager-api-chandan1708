const express = require('express');
const { getAllTasks, getTaskById, getTasksByPriority, createTask, updateTaskById, deleteTaskById } = require('../controllers/TaskController');
const router = express.Router();

// Define routes for task management

// Get all tasks
router.get('/', getAllTasks);

// Get tasks by priority level
router.get('/priority/:level', getTasksByPriority);

// Get a task by ID
router.get('/:id', getTaskById);

// Create a new task
router.post('/', createTask);

// Update a task by ID
router.put('/:id', updateTaskById);

// Delete a task by ID
router.delete('/:id', deleteTaskById);

module.exports = router;