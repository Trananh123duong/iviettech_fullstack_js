const express = require('express');
const router = express.Router()

const taskController = require('../controllers/task.controller')
const { verifyToken } = require('../middleware/auth')

router.get('/', taskController.getTaskList)

router.get('/:id', taskController.getTaskById)

router.post('/', verifyToken, taskController.createTask)

router.patch('/:id', verifyToken, taskController.updateTask)

router.delete('/:id', verifyToken, taskController.deleteTask)

module.exports = router