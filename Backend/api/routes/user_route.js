const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const { authToken } = require('../../auth/token_validation');
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

router.use(limiter);

router.post('/user', userController.createUser);
router.post('/login', userController.login);
router.post('/register', authToken, userController.registerUser);
router.get('/user/:username/eligibility', authToken, userController.checkEligibility);
router.get('/user/:username/info', authToken, userController.getUserInfo);
router.delete('/users/delete/:username',authToken, userController.deleteUser);
router.put('/users/update/:username',authToken, userController.updateUser);
router.put('/users/update/:username/password',authToken, userController.updatePassword);

module.exports = router;
