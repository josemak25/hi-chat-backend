const { Joi } = require('celebrate');

module.exports = {
  createUser: {
    body: {
      name: Joi.string()
        .max(200)
        .required(),
      email: Joi.string()
        .email()
        .max(200)
        .required(),
      password: Joi.string()
        .min(6)
        .max(255)
        .required(),
      password2: Joi.string()
        .min(6)
        .max(255)
        .required(),
      user_type: Joi.string()
    }
  }
};
