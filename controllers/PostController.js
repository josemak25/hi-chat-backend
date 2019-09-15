const httpStatus = require('http-status');
const { PostQuery, UserQuery } = require('../models/index');
const sendResponse = require('../helpers/response');

const PostController = () => {
  const create = async (req, res, next) => {
    try {
      const { body, likes, user_id, image } = req.body;

      const post = await PostQuery.create({
        body,
        likes,
        user_id,
        image
      });

      return res.json(sendResponse(httpStatus.OK, 'success', post, null));
    } catch (err) {
      next(err);
    }
  };

  const deletePost = async (req, res, next) => {
    try {
      const {
        params: { post_id },
        token: { id: user_id, email }
      } = req;

      const user = await UserQuery.getOne({ email });

      if (user_id === user._id) {
        await PostQuery.remove({ _id: post_id });
      }

      return res.json(
        sendResponse(httpStatus.OK, 'success', 'Post deleted successfully', null, token)
      );
    } catch (err) {
      next(err);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const {
        token: { id: user_id }
      } = req;

      const posts = await PostQuery.getAll({ _id: user_id });
      return res.json(sendResponse(httpStatus.OK, 'success', posts, null, token));
    } catch (err) {
      next(err);
    }
  };

  return {
    create,
    deletePost,
    getAll
  };
};

module.exports = PostController();
