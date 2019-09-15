const { Router } = require('express');
const router = Router();
const isAdmin = require('../middlewares/isAdmin');
const { User, Post } = require('../controllers/index');
const postValidation = require('../validations/post.validation');
const { celebrate: validate } = require('celebrate');

/**************************************************** ALL PRIVATE ROUTES ****************************************************/

/*::::::::::::::::::::::::::::::::::::::::::::::::::::::: ALL ADMIN ROUTES :::::::::::::::::::::::::::::::::::::::::::::::::*/

/**
 * Returns an array of users with user information.
 * @property {Array} users - Array of User model.
 * @returns {Array}
 */

router.route('/users').get(isAdmin, User.getAll);

/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::: ALL POST ROUTES ::::::::::::::::::::::::::::::::::::::::::::::::::*/

/**
 * Returns a post object with post information.
 * @property {Object} posts - Object of Post model.
 * @returns {Object}
 */

router
  .route('/create-post')
  .post(validate(postValidation.createPost, { abortEarly: false }), Post.create);

/**
 * Returns an array of all posts for a user.
 * @property {Array} posts - Array of Post model.
 * @returns {Array}
 */
router.route('/user-posts').get(Post.getUserPosts);

/**
 * Returns a string with success information.
 * @property {String} post - String of Post model.
 * @returns {String}
 */
router.route('/delete-post/:post_id').delete(Post.deletePost);

module.exports = router;
