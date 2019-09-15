const Query = require('../queries/queries');
const User = require('./User');

const UserQuery = new Query(User);

module.exports = {
  UserQuery
};
