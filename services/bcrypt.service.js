require('dotenv').config();
const bcrypt = require('bcrypt');

const bcryptService = () => {
  const hashPassword = ({ password }) => {
    return bcrypt.hash(password, Number(process.env.HASHING_SALT));
  };

  const comparePassword = (password, hash) => bcrypt.compare(password, hash);

  return {
    hashPassword,
    comparePassword
  };
};

module.exports = bcryptService;
