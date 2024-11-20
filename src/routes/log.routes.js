// src/routes/log.routes.js
const express = require('express');
const router = express.Router();
const logController = require('../controllers/log.controller');

router.post('/logs', logController.receberLogs);

module.exports = router;
