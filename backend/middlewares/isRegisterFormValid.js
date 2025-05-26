const { body, validationResult } = require('express-validator');

const registerValidationRules = [
    body('firstname')
        .trim()
        .notEmpty().withMessage('Firstname is required.'),
    body('lastname')
        .trim()
        .notEmpty().withMessage('Lastname is required.'),
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long.'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Invalid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
];

const isRegisterFormValid = [
    ...registerValidationRules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'Some field missing' });
        }
        next();
    }
];

module.exports = isRegisterFormValid;