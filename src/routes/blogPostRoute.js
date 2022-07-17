const { Router } = require('express');

const blogPostController = require('../controllers/blogPostController');
const middleware = require('../Middlewares');

const blogPostRouter = Router();

blogPostRouter.post('/', middleware.auth, blogPostController.createPost);
blogPostRouter.get('/', middleware.auth, blogPostController.getAll);
blogPostRouter.get('/:id', middleware.auth, blogPostController.getById);

module.exports = blogPostRouter;