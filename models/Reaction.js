const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    action: {
      enum: ['like', 'dislike']
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    post_id: {
      type: Schema.Types.ObjectId,
      ref: 'post',
      required: true
    }
  },
  { timestamps: { createdAt: 'createdAt' } }
);

schema.methods.toJSON = function() {
  const like = this.toObject();
  const { _id } = like;
  like.id = _id;
  delete like.updatedAt;
  delete like._id;
  delete like.__v;
  return like;
};

module.exports = model('reaction', schema);
