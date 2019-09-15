const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    message: {
      type: String,
      trim: true,
      maxlength: 500,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    post_id: {
      type: String,
      required: true
    }
  },
  { timestamps: { createdAt: 'createdAt' } }
);

module.exports = model('comment', schema);
