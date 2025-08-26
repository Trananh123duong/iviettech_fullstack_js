const express = require('express');
const router = express.Router()

const userController = require('../controllers/user.controller')

router.get('/:id', userController.getUserById)
router.get('/:id/task', userController.getUserById)

module.exports = router