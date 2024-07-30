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

export default { authRegister } 