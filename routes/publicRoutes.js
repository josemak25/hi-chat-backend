const { celebrate: validate } = require('celebrate');
const paramValidation = require('../api/validations/user.validation');

const publicRoutes = {
  'POST /signup': {
    path: 'UserController.signup',
    middlewares: [validate(paramValidation.createUser, { abortEarly: false })]
  },
  'POST /login': {
    path: 'UserController.login',
    middlewares: [validate(paramValidation.loginUser, { abortEarly: false })]
  }
};

module.exports = publicRoutes;
