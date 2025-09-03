const express = require('express');
const router = express.Router();
const { seedData } = require('../controllers/seed.controller');

router.post('/seed', seedData);

module.exports = router;