const express = require('express');
const router = express.Router();
const { register, login, updateDetails, deleteUser } = require('./customer_controller');

router.post('/register', register);
router.post('/login', login);
router.put('/update/:email', updateDetails);
router.delete('/delete/:email', deleteUser); 



module.exports = router;
