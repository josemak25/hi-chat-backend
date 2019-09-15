const PostController = require('./PostController');
const UserController = require('./UserController');
const CommentController = require('./CommentController');

module.exports = {
  User: UserController(),
  Post: PostController(),
  Comment: CommentController()
};
