const express = require('express');
const router = express.Router()

const authController = require('../controllers/users.controller')

const checkUserNotExists = require('../middleware/checkUserNotExists');

router.post('', checkUserNotExists, authController.register)
router.get('', authController.getAllUsers)


module.exports = router