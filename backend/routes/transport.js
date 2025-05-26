const express = require('express');
const router = express.Router();

/* Middlewares */
const { isAuthenticated } = require('../middlewares/auth');
const isTransportFormValid = require('../middlewares/isTransportFormValid');

/* Controllers */
const { getAllTransports, createTransport, updateTransport, updateTransportState, getTransport, updateTransportFuelType, totalTransports, getTotalGallonsComplete } = require('../controllers/transport');

/* Functions */

/* Constants */

/* Utils */

router.post('/create-transport', [isAuthenticated, isTransportFormValid], createTransport);

router.get('/get-transports', [isAuthenticated], getAllTransports);

router.get('/get-transport/:id', [isAuthenticated], getTransport);

router.put('/update-transport/:id', [isAuthenticated], updateTransport);

router.patch('/update-transport-state/:id', [isAuthenticated], updateTransportState);

router.patch('/update-transport-fuel/:id', [isAuthenticated], updateTransportFuelType);

router.get('/get-transports-count', [isAuthenticated], totalTransports);

router.get('/get-gallons-count', [isAuthenticated], getTotalGallonsComplete);

module.exports = router;
