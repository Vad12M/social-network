import { body } from "express-validator";

export const registerValidations = [
    body('email', 'Email is required').isEmail().withMessage('Wrong email'),
    body('password', 'Password is required').isLength({
        min: 3,
        max: 32
    }).withMessage('Password must be between 3 and 32 characters'),
    body('firstName', 'First name is required').isString().isLength({
        min: 2,
    }).withMessage('First name must be at least 2 characters'),
    body('lastName', 'Last name is required').isString().isLength({
        min: 2,
    }).withMessage('Last name must be at least 2 characters'),
];

export const loginValidations = [
    body('email', 'Email is required').isEmail().withMessage('Wrong email'),
    body('password', 'Password is required').isLength({
        min: 3,
        max: 32
    }).withMessage('Password must be between 3 and 32 characters'),
];
