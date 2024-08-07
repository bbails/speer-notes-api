import { User } from '../models/index.js';
import { createUser, findUserByEmail } from '../services/user.js';

export async function registerUser (req, res){
    let email = req.body.email;
    let password = req.body.password;
    let user = await findUserByEmail(email);
    if (user) {
        return res.status(400).json({
                    success: false,
                    msg: 'User already exists with that email'
                })
        }
    user = createUser(email, password);

    return res.status(200).json({
        success: true,
        message: 'User created successfully'
    });
}

export async function loginUser(req, res) {
    let user = await findUserByEmail(req.body.email);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User does not exist with that email'
        })
    }
    if (!await user.comparePassword(req.body.password)) {
        return res.status(400).json({
            success: false,
            message: 'Email or Password is incorrect'
        })
    }
    let token = await user.GenerateJWT();
    return res.status(200).json({
        success: true,
        token: token,
        user: user.email
    })
}

export default { registerUser, loginUser } 