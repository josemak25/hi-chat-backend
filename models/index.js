const Query = require('../queries/queries');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Reaction = require('./Reaction');

const UserQuery = new Query(User);
const PostQuery = new Query(Post);
const CommentQuery = new Query(Comment);
const ReactionQuery = new Query(Reaction);

module.exports = {
  UserQuery,
  PostQuery,
  CommentQuery,
  ReactionQuery
};
