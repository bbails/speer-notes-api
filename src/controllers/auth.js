import { User } from '../models/index.js';

export async function authRegister (req, res){
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
        message: 'User created successfully'
    });
}

export async function authLogin(req, res) {
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

export default { authRegister, authLogin } 