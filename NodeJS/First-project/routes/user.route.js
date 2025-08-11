const express = require('express');
const router = express.Router()

const userController = require('../controllers/user.controller')
const { verifyToken, checkAdmin } = require('../middleware/auth')

router.get('/', verifyToken, checkAdmin, userController.listUsers)
router.put('/:id', verifyToken, userController.updateUser)
router.patch('/:id/role', verifyToken, checkAdmin, userController.updateUserRole)
router.post('/cart', verifyToken, userController.addToCart)

module.exports = router