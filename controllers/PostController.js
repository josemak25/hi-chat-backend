const httpStatus = require('http-status');
const { PostQuery, UserQuery } = require('../models/index');
const sendResponse = require('../helpers/response');

const PostController = () => {
  const create = async (req, res, next) => {
    try {
      const { post, likes, user_id, image } = req.body;

      const newPost = await PostQuery.create({
        post,
        likes,
        user_id,
        image
      });

      return res.json(sendResponse(httpStatus.OK, 'success', newPost, null));
    } catch (err) {
      next(err);
    }
  };

  const getUserPosts = async (req, res, next) => {
    try {
      const {
        token: { id: user_id }
      } = req;

      const posts = await PostQuery.getAll({ user_id });
      return res.json(sendResponse(httpStatus.OK, 'success', posts, null));
    } catch (err) {
      next(err);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const posts = await PostQuery.getAll({});
      return res.json(sendResponse(httpStatus.OK, 'success', posts, null));
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

      if (user_id == user._id) {
        await PostQuery.delete({ _id: post_id });
      }

      return res.json(sendResponse(httpStatus.OK, 'success', 'Post deleted successfully', null));
    } catch (err) {
      next(err);
    }
  };

  return {
    create,
    getUserPosts,
    getAll,
    deletePost
  };
};

module.exports = PostController;
