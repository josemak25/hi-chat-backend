const { Router } = require('express');
const router = Router();
const { celebrate: validate } = require('celebrate');
const paramValidation = require('../validations/user.validation');
const User = require('../controllers/UserController');

router.post('/signup', validate(paramValidation.createUser, { abortEarly: false }), User.signup);

router.post('/login', validate(paramValidation.loginUser, { abortEarly: false }), User.login);

module.exports = router;
