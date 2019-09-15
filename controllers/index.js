const PostController = require('./PostController');
const UserController = require('./UserController');
const CommentController = require('./CommentController');
const ReactionController = require('./ReactionController');

module.exports = {
  User: UserController(),
  Post: PostController(),
  Comment: CommentController(),
  Reaction: ReactionController()
};
