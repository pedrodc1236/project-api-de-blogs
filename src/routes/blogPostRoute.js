const { Router } = require('express');

const blogPostController = require('../controllers/blogPostController');
const middleware = require('../Middlewares');

const blogPostRouter = Router();

blogPostRouter.post('/', middleware.auth, blogPostController.createPost);
blogPostRouter.get('/', middleware.auth, blogPostController.getAll);
blogPostRouter.get('/search', middleware.auth, blogPostController.query);
blogPostRouter.get('/:id', middleware.auth, blogPostController.getById);
blogPostRouter.put('/:id', middleware.auth, blogPostController.update);
blogPostRouter.delete('/:id', middleware.auth, blogPostController.remove);

module.exports = blogPostRouter;