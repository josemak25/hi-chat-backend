const { Joi } = require('celebrate');

module.exports = {
  createUser: {
    body: {
      fullName: Joi.string()
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
      isAdmin: Joi.boolean()
    }
  },

  loginUser: {
    body: {
      email: Joi.string()
        .email()
        .max(200)
        .required(),
      password: Joi.string()
        .min(6)
        .max(255)
        .required()
    }
  }
};
