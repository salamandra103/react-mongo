const express = require('express');
const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getData);
router.post('/', mainController.setData);

module.exports = router;