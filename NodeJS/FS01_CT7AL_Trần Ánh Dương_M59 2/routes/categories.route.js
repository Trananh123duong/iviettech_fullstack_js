const express = require('express');
const router = express.Router();
const { createCategory, updateCategory, getAllCategories } = require('../controllers/categories.controller');

router.post('', createCategory);
router.put('/:id', updateCategory);
router.get('', getAllCategories);

module.exports = router;
