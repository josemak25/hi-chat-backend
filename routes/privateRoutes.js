const isAdmin = require('../api/middlewares/isAdmin');

const privateRoutes = {
  'GET /users': {
    path: 'UserController.getAll',
    middlewares: [isAdmin]
  }
};

module.exports = privateRoutes;
