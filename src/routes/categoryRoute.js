const { Router } = require('express');

const categoryController = require('../controllers/categoryController');
const middleware = require('../Middlewares');

const categoryRouter = Router();

categoryRouter.post('/', middleware.auth, categoryController.createCategory);
categoryRouter.get('/', middleware.auth, categoryController.getAllCategories);

module.exports = categoryRouter;