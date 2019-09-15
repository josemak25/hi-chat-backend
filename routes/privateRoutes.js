const { Router } = require('express');
const router = Router();
const isAdmin = require('../middlewares/isAdmin');
const authToken = require('../policies/auth.policy');
const User = require('../controllers/UserController');

// all admin private routes
router.route('/users').get(authToken, isAdmin, User.getAll);

module.exports = router;
