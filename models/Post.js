const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    post: {
      type: String,
      trim: true,
      maxlength: 1500,
      required: true
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    likes: {
      type: Number,
      default: 0
    },
    image: {
      type: String
    }
  },
  { timestamps: { createdAt: 'createdAt' } }
);

schema.pre('update', function() {
  this.update({}, { $set: { likes: new Date() } });
});

schema.methods.toJSON = function() {
  const post = this.toObject();
  const { _id } = post;
  post.id = _id;
  delete post.updatedAt;
  delete post._id;
  delete post.__v;
  return post;
};

module.exports = model('post', schema);
