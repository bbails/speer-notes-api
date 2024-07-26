import { check } from 'express-validator';

const email = check('email', 'Valid Email is required').isEmail();
const password = check(
    'password', 
    'Password is required, minmum length of 6')
    .isLength({min: 6});


export const RegisterValidations = [email, password];
export const LoginValidations = [email, password];