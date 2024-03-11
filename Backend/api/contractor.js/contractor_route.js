const express = require('express');
const router = express.Router();
const controller = require('./contractor_controller');

router.post('/registerContractor', controller.register);
router.post('/loginContractor', controller.login);

module.exports = router;
