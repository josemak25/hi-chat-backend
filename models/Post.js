const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    body: {
      type: String,
      trim: true,
      maxlength: 1500,
      required: true
    },
    user_id: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    image: {
      type: String
    },
    category: {
      type: String
    }
  },
  { timestamps: { createdAt: 'createdAt' } }
);

module.exports = model('post', schema);
