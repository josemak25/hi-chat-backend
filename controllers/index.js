const PostController = require('./PostController');
const UserController = require('./UserController');

module.exports = {
  User: UserController(),
  Post: PostController()
};
