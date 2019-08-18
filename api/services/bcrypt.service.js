require('dotenv').config();
const bcrypt = require('bcrypt');

const bcryptService = () => {
  const hashPassword = ({ password }) => {
    const salt = bcrypt.genSaltSync(Number(process.env.HASHING_SALT));
    return bcrypt.hashSync(password, salt);
  };

  const comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);

  return {
    hashPassword,
    comparePassword
  };
};

module.exports = bcryptService;
