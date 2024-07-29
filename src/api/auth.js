import { User } from '../models/index.js';
import { Router } from 'express';
import { validationResult } from 'express-validator';
import { LoginValidations, RegisterValidations } from '../validators/index.js';

const authRouter = Router();

/**
 * @description Register User
 * @method POST
 * @path /api/auth/signup
 * @body {email, password}
 */
authRouter.post('/signup', RegisterValidations, async (req, res) => {
    let errors = validationResult(req);
    return res.json({
        errors: errors.array(),
    })
});

/**
 * @description Login User
 * @method POST
 * @path /api/auth/login
 * @body {email, password}
 */
authRouter.post('/login', LoginValidations, async (req, res) => {
    let errors = validationResult(req);
    return res.json({
        errors: errors.array(),
    })
});
export default authRouter