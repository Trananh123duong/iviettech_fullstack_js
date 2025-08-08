const express = require('express');
const router = express.Router()

const productController = require('../controllers/product.controller')
const { verifyToken, checkAdmin } = require('../middleware/auth')

router.get('/', productController.getAllProducts)

router.get('/:id', productController.detailProduct)

router.post('/', verifyToken, checkAdmin, productController.createProduct)

router.patch('/:id', verifyToken, checkAdmin, productController.updateProduct)

router.delete('/:id', verifyToken, checkAdmin, productController.deleteProduct)

module.exports = router