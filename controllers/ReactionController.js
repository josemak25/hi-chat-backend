const httpStatus = require('http-status');
const { LikeQuery, UserQuery } = require('../models/index');
const sendResponse = require('../helpers/response');

const ReactionController = () => {
  const react = async (req, res, next) => {
    const {
      params: { react }
    } = req;

    if (!react) return disLike;

    return like;
  };

  const like = async (req, res, next) => {
    try {
      const {
        params: { post_id },
        token: { id: user_id }
      } = req;

      const like = await LikeQuery.create({ post_id, user_id });
      return res.json(sendResponse(httpStatus.OK, 'success', like, null));
    } catch (err) {
      next(err);
    }
  };

  const disLike = async (req, res, next) => {
    try {
      const {
        token: { id: user_id }
      } = req;

      const user = await UserQuery.getOne({ email });

      if (user_id == user._id) {
        await LikeQuery.delete({ user_id });
      }

      return res.json(sendResponse(httpStatus.OK, 'success', 'Disliked post successfully', null));
    } catch (err) {
      next(err);
    }
  };

  return {
    react
  };
};

module.exports = ReactionController;
