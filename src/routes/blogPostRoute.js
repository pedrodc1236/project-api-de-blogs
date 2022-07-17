const { Router } = require('express');

const blogPostController = require('../controllers/blogPostController');
const middleware = require('../Middlewares');

const blogPostRouter = Router();

blogPostRouter.post('/', middleware.auth, blogPostController.createPost);

module.exports = blogPostRouter;