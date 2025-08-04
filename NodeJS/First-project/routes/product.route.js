const express = require('express');
const router = express.Router()

const productController = require('../controllers/product.controller')

router.get('/', productController.getAllProducts)
router.get('/list', productController.getListProducts)

router.get('/:id', productController.detailProduct)

router.post('/', productController.createProduct)

router.patch('/:id', productController.updateProduct)

router.delete('/:id', productController.deleteProduct)

module.exports = router