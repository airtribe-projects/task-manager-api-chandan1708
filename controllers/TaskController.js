const task = require('../models/data');

function getAllTasks(req, res, next) {
    if (task.length === 0) {
        return res.status(200).json({ message: 'No tasks available' });
    }
    const { completed, sortBy, sortDate } = req.query; // filter and sort parameters

    let filteredTasks = [...task];

    // Filter by completion status
    if (completed !== undefined) {
        if (!['true', 'false'].includes(completed.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid completed value. Use true or false.' });
        }
        const completedValue = completed.toLowerCase() === 'true';
        filteredTasks = filteredTasks.filter(t => t.completed === completedValue);
    }

    // Sort by priority or creation date
    if (sortBy) {
        if (!['asc', 'desc'].includes(sortBy.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid sortBy value. Use asc or desc.' });
        }
        filteredTasks.sort((a, b) => {
            if (sortBy.toLowerCase() === 'asc') {
                return a.priority > b.priority ? 1 : -1;
            } else {
                return a.priority < b.priority ? 1 : -1;
            }
        });
    }

    // Sort by creation date
    if (sortDate) {
        if (!['asc', 'desc'].includes(sortDate.toLowerCase())) {
            return res.status(400).json({ message: 'Invalid sortDate value. Use asc or desc.' });
        }
        filteredTasks.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return sortDate.toLowerCase() === 'asc' ? dateA - dateB : dateB - dateA;
        });
    }

    res.status(200).json(filteredTasks);
}

function getTaskById(req, res, next) {
    const id = parseInt(req.params.id);
    const foundTask = task.find(t => t.id === id);
    if (foundTask) {
        res.status(200).json(foundTask);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

// getTasksByPriority
function getTasksByPriority(req, res, next) {
    const level = req.params.level.toLowerCase();
    const validPriorities = ['low', 'medium', 'high'];
    
    if (!validPriorities.includes(level)) {
        return res.status(400).json({ message: 'Invalid priority level. Use low, medium, or high.' });
    }

    const priorityTasks = task.filter(t => t.priority.toLowerCase() === level);
    
    if (priorityTasks.length === 0) {
        return res.status(200).json({ message: `No tasks found with priority: ${level}` });
    }

    res.status(200).json(priorityTasks);
}

function createTask(req, res, next) {
    const newTask = req.body;
    if (!newTask.title || !newTask.description) {
        return res.status(400).json({ message: 'Title and Description are required' });
    }

    if (newTask.priority && !['Low', 'Medium', 'High'].includes(newTask.priority)) {
        return res.status(400).json({ message: 'Invalid priority. Use Low, Medium, or High.' });
    }

    if (!newTask.id) {
        newTask.id = task.length ? task[task.length - 1].id + 1 : 1;
    }
    if (newTask.completed === undefined) {
        newTask.completed = false;
    }
    if (!newTask.priority) {
        newTask.priority = 'Medium';
    }
    if (!newTask.createdAt) {
        newTask.createdAt = new Date();
    }
    
    task.push(newTask);
    res.status(201).json(newTask);
}

function updateTaskById(req, res, next) {
    const id = parseInt(req.params.id);
    const index = task.findIndex(t => t.id === id);
    if (index !== -1) {
        if (!req.body.title || !req.body.description) {
            return res.status(400).json({ message: 'Title and Description are required' });
        }
        if (req.body.completed !== undefined && typeof req.body.completed !== 'boolean') {
            return res.status(400).json({ message: 'Completed must be a boolean' });
        }
        if (req.body.priority && !['Low', 'Medium', 'High'].includes(req.body.priority)) {
            return res.status(400).json({ message: 'Invalid priority. Use Low, Medium, or High.' });
        }
        task[index] = { ...task[index], ...req.body, updatedAt: new Date() };
        res.status(200).json(task[index]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
    
}

function deleteTaskById(req, res, next) {
    const id = parseInt(req.params.id);
    const index = task.findIndex(t => t.id === id);
    if (index !== -1) {
        const deletedTask = task.splice(index, 1);
        res.status(200).json(deletedTask[0]);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    getTasksByPriority,
    createTask,
    updateTaskById,
    deleteTaskById
};
