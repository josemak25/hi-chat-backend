require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.NODE_ENV;

const authService = () => {
  const issue = payload => jwt.sign(payload, secret, { expiresIn: 86400 });
  const verify = (token, cb) => jwt.verify(token, secret, {}, cb);

  return {
    issue,
    verify
  };
};

module.exports = authService;
