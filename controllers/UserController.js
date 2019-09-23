const httpStatus = require('http-status');
const { UserQuery } = require('../models/index');
const sendResponse = require('../helpers/response');
const bcryptService = require('../services/bcrypt.service');
const authService = require('../services/auth.service');

const UserController = () => {
  const signup = async (req, res, next) => {
    try {
      const { fullName, email, password, isAdmin } = req.body;

      const userExist = await UserQuery.getOne({ email });

      if (userExist) {
        return res.json(
          sendResponse(
            httpStatus.BAD_REQUEST,
            'Email address is already registered with us',
            {},
            { email: 'Email address is already registered with us' }
          )
        );
      }

      const user = await UserQuery.create({
        fullName,
        email,
        password,
        isAdmin
      });

      return res.json(sendResponse(httpStatus.OK, 'success', user, null));
    } catch (err) {
      next(err);
    }
  };

  const login = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await UserQuery.getOne({ email });

      if (!user) {
        return res.json(
          sendResponse(
            httpStatus.NOT_FOUND,
            'Email address is not registered with us',
            {},
            { error: 'Email address is not registered with us' }
          )
        );
      }

      const correctPassword = await bcryptService().comparePassword(password, user.password);

      if (!correctPassword) {
        return res.json(
          sendResponse(
            httpStatus.BAD_REQUEST,
            'Invalid email or password',
            {},
            { error: 'Invalid email or password' }
          )
        );
      }

      const token = authService().issue(user.toJSON());

      req.webSocket.on('connection', () => {
        req.webSocket.emit('login notification', { user });
      });

      return res.json(sendResponse(httpStatus.OK, 'success', user, null, token));
    } catch (err) {
      next(err);
    }
  };

  const getAll = async (req, res, next) => {
    try {
      const users = await UserQuery.getAll({ isAdmin: false });
      return res.json(sendResponse(httpStatus.OK, 'success', users, null));
    } catch (err) {
      next(err);
    }
  };

  return {
    signup,
    login,
    getAll
  };
};

module.exports = UserController;
