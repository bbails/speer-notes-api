import { User } from '../models/index.js';
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
authRouter.post(
    '/login', 
    LoginValidations, 
    Validator,
    async (req, res) => {
        try{
            let user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User does not exist with that email'
                })
            }
            if (!await user.comparePassword(req.body.password)) {
                return res.status(400).json({
                    success: false,
                    message: 'Password is incorrect'
                })
            }
            let token = await user.GenerateJWT();
            return res.status(200).json({
                success: true,
                token: token,
                user: user.email
            })
        }
        catch(err){
            console.log(err);
        }
    }
);


export default authRouter