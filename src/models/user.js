import { Schema, models } from "mongoose";  
import { compare,hash } from "bcryptjs";
import { sign } from "jsonwebtoken/promises";

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
    return await sign(id, SECRET, {expiresIn: "1d"});
}

const User = model('user', UserSchema);
export default User;