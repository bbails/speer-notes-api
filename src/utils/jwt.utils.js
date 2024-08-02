import jwt from "jsonwebtoken";

import { SECRET } from "../constants/index.js";


export const GenerateJWT = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: "1d" });
}