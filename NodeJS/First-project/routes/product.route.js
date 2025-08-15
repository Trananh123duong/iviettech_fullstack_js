const express = require('express');
const router = express.Router()

const productController = require('../controllers/product.controller')
const { verifyToken, checkAdmin } = require('../middleware/auth')
const { upload } = require('../middleware/upload');

router.get('/', productController.getAllProducts)

router.get('/:id', productController.detailProduct)

router.post('/', verifyToken, checkAdmin, upload.single('image'), productController.createProduct)

router.patch('/:id', verifyToken, checkAdmin, upload.single('image'), productController.updateProduct)

router.delete('/:id', verifyToken, checkAdmin, productController.deleteProduct)

module.exports = router