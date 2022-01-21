const express = require('express');
const resetController = require('../controllers/reset');
const router = express.Router();

router.get("/reset", resetController.reset);

module.exports = router;