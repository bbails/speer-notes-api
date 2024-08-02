import User from "../models/user.js";

export async function createUser(email, password) {
    let user = new User({email, password});
    return await user.save();
}

export async function findUserByEmail(email) {
    return await User.findOne({email: email});
}

export async function findUserById(id) {
    return await User.findById(id);
}

export async function deleteUser(email) {
    let user = await findUserByEmail(email);
    if (user) {
        return await User.findByIdAndDelete(id);
    }
    else
        return null;
}