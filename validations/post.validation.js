const { Joi } = require('celebrate');

module.exports = {
  createPost: {
    body: {
      post: Joi.string()
        .max(1500)
        .required(),
      user_id: Joi.string().required(),
      image: Joi.string()
    }
  }
};
