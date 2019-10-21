const { Joi } = require('celebrate');

module.exports = {
  createComment: {
    body: {
      message: Joi.string()
        .max(1500)
        .required(),
      user_id: Joi.string().required(),
      post_id: Joi.string().required()
    }
  }
};
