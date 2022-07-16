const { Router } = require('express');

const categoryController = require('../controllers/categoryController');
const middleware = require('../Middlewares');

const categoryRouter = Router();

categoryRouter.post('/', middleware.auth, categoryController.createCategory);

module.exports = categoryRouter;