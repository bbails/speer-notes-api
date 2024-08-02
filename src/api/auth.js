import { Router } from 'express';
import Validator from '../middlewares/validation-middleware.js';
import { LoginValidations, RegisterValidations } from '../validators/index.js';
import userController from '../controllers/user.js';

const authRouter = Router();

/**
 * @description Register User
 * @access Public
 * @method POST
 * @path /api/auth/signup
 * @body {email, password}
 */
authRouter.post('/signup', RegisterValidations, Validator, userController.registerUser);

/**
 * @description Login User
 * @access Public
 * @method POST
 * @path /api/auth/login
 * @body {email, password}
 */
authRouter.post('/login', LoginValidations, Validator, userController.loginUser);


export default authRouter