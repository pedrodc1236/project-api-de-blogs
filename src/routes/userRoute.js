const { Router } = require('express');

const userController = require('../controllers/userController');
const middlewares = require('../Middlewares');

const userRouter = Router();

userRouter.post('/', userController.create);
userRouter.get('/', middlewares.auth, userController.getAll);

module.exports = userRouter;