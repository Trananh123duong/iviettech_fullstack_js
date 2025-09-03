const express = require('express');
const router = express.Router();
const { createArticle, getUserArticles } = require('../controllers/articles.controller');

router.post('/users/:userId/articles', createArticle);

router.get('/users/:userId/articles', getUserArticles);

module.exports = router;
