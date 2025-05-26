const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/* Middlewares */
const { isAuthenticated } = require('../middlewares/auth');
const isRegisterFormValid = require('../middlewares/isRegisterFormValid');

/* Controllers */
const { register, login, getUserProfile } = require('../controllers/auth');

/* Functions */

/* Constants */

/* Utils */

//DONE
router.post('/register', [isRegisterFormValid], register);

//DONE
router.post('/login', login);

//DONE
router.get('/get-user', [isAuthenticated], getUserProfile);

module.exports = router;
