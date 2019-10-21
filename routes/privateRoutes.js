const { Router } = require('express');
const router = Router();
const isAdmin = require('../middlewares/isAdmin');
const { User, Post, Comment, Reaction } = require('../controllers/index');
const postValidation = require('../validations/post.validation');
const commentValidation = require('../validations/comment.validation');
const { celebrate: validate } = require('celebrate');

/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************                    ****************************************************/
/****************************************************         ALL        ****************************************************/
/****************************************************       PRIVATE      ****************************************************/
/****************************************************       ROUTES       ****************************************************/
/****************************************************                    ****************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/
/****************************************************************************************************************************/

/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                  :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::: ALL ADMIN ROUTES :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                  :::::::::::::::::::::::::::::::::::::::::::::::::*/

/*
 * Returns an array of users with user information.
 * @property {Array} users - Array of User model.
 * @returns {Array}
 */

router.route('/users').get(isAdmin, User.getAll);

/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                  :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::: ALL POST ROUTES  :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                  :::::::::::::::::::::::::::::::::::::::::::::::::*/

/*
 * Returns a post object with post information.
 * @property {Object} posts - Object of Post model.
 * @returns {Object}
 */

router
  .route('/create-post')
  .post(validate(postValidation.createPost, { abortEarly: false }), Post.create);

/*
 * Returns an array of all posts for a user.
 * @property {Array} posts - Array of Post model.
 * @returns {Array}
 */
router.route('/user-posts').get(Post.getUserPosts);

/*
 * Returns an array of all posts.
 * @property {Array} posts - Array of Post model.
 * @returns {Array}
 */
router.route('/posts').get(Post.getAll);

/*
 * Returns a string with success information.
 * @property {String} post - String of Post model.
 * @returns {String}
 */
router.route('/delete-post/:post_id').delete(Post.deletePost);

/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                  :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::: ALL LIKE ROUTES  :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                  :::::::::::::::::::::::::::::::::::::::::::::::::*/

/*
 * Returns a post object with post information when post is liked.
 * @property {Boolean} true || false - Object of Post model.
 * @returns {Object}
 */
router.route('/post/:post_id/:react').get(Reaction.react);

/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                     :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*::::::::::::::::::::::::::::::::::::::::::::::::::::::: ALL COMMENT ROUTES  :::::::::::::::::::::::::::::::::::::::::::::::::*/
/*:::::::::::::::::::::::::::::::::::::::::::::::::::::::                     :::::::::::::::::::::::::::::::::::::::::::::::::*/

/*
 * Returns a comment object with comment information.
 * @property {Object} comment - Object of Comment model.
 * @returns {Object}
 */

router
  .route('/create-comment')
  .post(validate(commentValidation.createComment, { abortEarly: false }), Comment.create);

/**
 * Returns an array of all comments for a post.
 * @property {Array} comments - Array of Comments model.
 * @returns {Array}
 */
router.route('/post-comments/:post_id').get(Comment.getAll);

module.exports = router;
