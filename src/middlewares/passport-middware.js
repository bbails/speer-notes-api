import passport from "passport";
import { User } from "../models/index.js";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { SECRET as secretOrKey } from "../constants/index.js";

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey
};

passport.use(
    new JWTStrategy(options, async ({ id }, done) => {
        try {
            const user = await User.findById(id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    })
)