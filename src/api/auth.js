import { Router } from 'express';
import Validator from '../middlewares/validation-middleware.js';
import { LoginValidations, RegisterValidations } from '../validators/index.js';
import authController from '../controllers/auth.js';

const authRouter = Router();

/**
 * @description Register User
 * @access Public
 * @method POST
 * @path /api/auth/signup
 * @body {email, password}
 */
authRouter.post('/signup', RegisterValidations, Validator, authController.authRegister);

/**
 * @description Login User
 * @access Public
 * @method POST
 * @path /api/auth/login
 * @body {email, password}
 */
authRouter.post('/login', LoginValidations, Validator, authController.authLogin);


export default authRouter