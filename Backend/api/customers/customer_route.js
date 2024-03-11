const express = require('express');
const router = express.Router();
const controller = require('./customer_controller');

router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
