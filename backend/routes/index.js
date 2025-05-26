const express = require('express');
const app = express();
const authRoutes = require('./auth');
const transportRoutes = require('./transport');

app.use('/auth', authRoutes);
app.use('/transport', transportRoutes);

module.exports = app;