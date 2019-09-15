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
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    post_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'post'
    }
  },
  { timestamps: { createdAt: 'createdAt' } }
);

schema.methods.toJSON = function() {
  const comment = this.toObject();
  const { _id } = comment;
  comment.id = _id;
  delete comment.updatedAt;
  delete comment._id;
  delete comment.__v;
  return comment;
};

module.exports = model('comment', schema);
