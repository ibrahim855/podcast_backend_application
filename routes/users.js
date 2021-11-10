const express = require('express');
const router = express.Router();

//models


//controllers
const { login, register, removeAccount } = require('../controllers/users');
const Authentication = require('../middlewares/auth');

router.post('/login', login);

router.post('/register', register);

router.delete('/:username/delete', Authentication, removeAccount);


module.exports = router;