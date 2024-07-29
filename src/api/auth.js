import { User } from '../models/index.js';
import { Router } from 'express';
import Validator from '../middlewares/validation-middleware.js';
import { LoginValidations, RegisterValidations } from '../validators/index.js';

const authRouter = Router();

/**
 * @description Register User
 * @method POST
 * @path /api/auth/signup
 * @body {email, password}
 */
authRouter.post('/signup', 
    RegisterValidations, 
    Validator,
    async (req, res) => {
        try {
            let email = req.body.email;
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                            success: false,
                            msg: 'User already exists with that email'
                        })
                }
            user = new User({...req.body});
            await user.save();

            return res.status(200).json({
                success: true,
                msg: 'User created successfully'
            });

        }
        catch(err) {
            console.log(err);
        }
    }
);

/**
 * @description Login User
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
                    msg: 'User does not exist with that email'
                })
            }
            if (await user.comparePassword(req.body.password)) {
                return res.status(400).json({
                    success: false,
                    msg: 'Password is incorrect'
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