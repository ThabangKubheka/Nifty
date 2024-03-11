const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();
const { register, login, updateDetails, deleteUser } = require('./customer_controller');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

router.use(limiter);

router.post('/register', register);
router.post('/login', login);
router.put('/update/:email', updateDetails);
router.delete('/delete/:email', deleteUser); 

module.exports = router;
