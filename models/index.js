const Query = require('../queries/queries');
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

const UserQuery = new Query(User);
const PostQuery = new Query(Post);
const CommentQuery = new Query(Comment);

module.exports = {
  UserQuery,
  PostQuery,
  CommentQuery
};
