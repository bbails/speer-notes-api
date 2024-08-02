import { Schema, model } from "mongoose"; 
import bcrypt from "bcrypt";
const { compare, hash } = bcrypt;



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

const User = model("user", UserSchema);
export default User;