const httpStatus = require('http-status');
const { CommentQuery } = require('../models/index');
const sendResponse = require('../helpers/response');

const PostController = () => {
  const create = async (req, res, next) => {
    try {
      const { message, user_id, post_id } = req.body;

      const comment = await CommentQuery.create({
        message,
        user_id,
        post_id
      });

      return res.json(sendResponse(httpStatus.OK, 'success', comment, null));
    } catch (err) {
      next(err);
    }
  };

  const getAll = async (req, res, next) => {
    const {
      params: { post_id }
    } = req;
    try {
      const comments = await CommentQuery.getAll({ post_id });
      return res.json(sendResponse(httpStatus.OK, 'success', comments, null));
    } catch (err) {
      next(err);
    }
  };

  return {
    create,
    getAll
  };
};

module.exports = PostController;
