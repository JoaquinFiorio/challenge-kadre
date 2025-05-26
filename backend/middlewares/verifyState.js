const { ENUM_STATE } = require('../utils/constants');

const verifyState = (req, res, next) => {
    const { state } = req.body;

    if (!state || !Object.values(ENUM_STATE).includes(state)) {
        return res.status(400).json({
            error: `Invalid state. Allowed values: ${Object.values(ENUM_STATE).join(', ')}`
        });
    }
    next();
}

module.exports = verifyState;