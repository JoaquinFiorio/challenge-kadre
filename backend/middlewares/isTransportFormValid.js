const { body, validationResult } = require('express-validator');
const { ENUM_STATE, FUEL_TYPE } = require('../utils/constants');

const transportValidationRules = [
    body('truck')
        .trim()
        .notEmpty().withMessage('Truck is required.'),

    body('driver')
        .trim()
        .notEmpty().withMessage('Driver is required.'),

    body('origin')
        .trim()
        .notEmpty().withMessage('Origin is required.'),

    body('destination')
        .trim()
        .notEmpty().withMessage('Destination is required.'),

    body('fuel_type')
        .notEmpty().withMessage('Fuel type is required.')
        .isIn(Object.values(FUEL_TYPE)).withMessage(`Fuel type must be one of: ${Object.values(FUEL_TYPE).join(', ')}`),

    body('gallons')
        .notEmpty().withMessage('Gallons is required.')
        .isNumeric().withMessage('Gallons must be a number.'),

    body('departure_date')
        .notEmpty().withMessage('Departure date is required.')
        .isISO8601().withMessage('Departure date must be a valid ISO 8601 date.'),
];

const isTransportFormValid = [
    ...transportValidationRules,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send({ message: 'Some field missing' });
        }
        next();
    }
];

module.exports = isTransportFormValid;