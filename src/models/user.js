import mongoose from "mongoose"; 
const { Schema, model } = mongoose; 
import bcrypt from "bcryptjs";
const { compare, hash } = bcrypt;
import * as jwt from "jsonwebtoken";


const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }   
}, { timestamps: true });

UserSchema.pre("save", async function(next) {
    let user = this;
    if (!user.isModified("password")) return next();
    user.password = await hash(user.password, 10);
    next();
})

UserSchema.methods.comparePassword = async function(password) {
    return await compare(password, this.password);
}

UserSchema.methods.GenerateJWT = async function() {
    let payload = {
        email: this.email,
        id: this._id
    }
    return await jwt.sign(id, SECRET, {expiresIn: "1d"});
}

const User = model("user", UserSchema);
export default User;