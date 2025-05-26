const mongoose = require('mongoose');
const { ENUM_STATE, FUEL_TYPE } = require('../utils/constants');

const TransportSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    truck: {
        type: String,
        required: true
    },
    driver: {
        type: String,
        required: true
    },
    origin: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    fuel_type: {
        type: String,
        enum: Object.values(FUEL_TYPE),
        required: true
    },
    gallons: {
        type: Number,
        required: true
    },
    departure_date: {
        type: Date,
        required: true
    },
    state: {
        type: String,
        enum: Object.values(ENUM_STATE),
        default: ENUM_STATE.PENDIENTE
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Transport', TransportSchema);