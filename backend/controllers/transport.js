const Transport = require('../models/travelModel');
const { v4: uuidv4 } = require('uuid');

const getAllTransports = async (req, res) => {
    try {
        const transports= await Transport.find();

        return res.status(200).json({
            transports
        });

    } catch (err) {
        console.error('Error fetching viajes:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const totalTransports = async (req, res) => {
    try {
        const count = await Transport.countDocuments();

        return res.status(200).json({ count });
    } catch (err) {
        console.error('Error counting transports:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const getTotalGallonsComplete = async (req, res) => {
    try {
        const result = await Transport.aggregate([
            { $match: { state: 'FINALIZADO' } },
            { $group: { _id: null, totalGallons: { $sum: "$gallons" } } }
        ]);

        const gallons = result.length > 0 ? result[0].totalGallons : 0;

        return res.status(200).json({ gallons });
    } catch (err) {
        console.error('Error calculating total gallons:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const createTransport = async (req, res) => {
    try {

        const { truck, driver, origin, destination, fuel_type, gallons, departure_date } = req.body;

        const id = uuidv4();

        const newViaje = new Transport({
            id,
            truck,
            driver,
            origin,
            destination,
            fuel_type,
            gallons,
            departure_date: new Date(departure_date),
        });

        await newViaje.save();

        return res.status(201).send({ message: 'Transport created successfully' });

    } catch (err) {
        console.error('Error creating a transport:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const updateTransport = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) return res.status(400).json({ error: 'ID is required' });

        const updated = await Transport.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        
        if (!updated) {
            return res.status(404).json({ error: 'Transport not found' });
        }

        return res.status(200).send({ message: 'Transport updated successfully' });
    } catch (err) {
        console.error('Error updating a transport:', err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const updateTransportState = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;

    try {
        const viaje = await Transport.findByIdAndUpdate(
            id,
            { state },
            { new: true, runValidators: true }
        );

        if (!viaje) {
            return res.status(404).json({ error: 'Transport not found' });
        }

        return res.status(200).send({ message: 'Transport state updated successfully' });
    } catch (err) {
        console.error('Error updating state on transport: ' , err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const updateTransportFuelType = async (req, res) => {
    const { id } = req.params;
    const { fuel_type } = req.body;

    try {
        const transport = await Transport.findByIdAndUpdate(
            id,
            { fuel_type },
            { new: true, runValidators: true }
        );

        if (!transport) {
            return res.status(404).json({ error: 'Transport not found' });
        }

        return res.status(200).send({ message: 'Transport state updated successfully' });
    } catch (err) {
        console.error('Error updating state on transport: ' , err);
        return res.status(500).json({ error: 'Server error' });
    }
};

const getTransport = async (req, res) => {
    const { id } = req.params;

    try {
        const transport = await Transport.findById(id);

        if (!transport) {
            return res.status(404).json({ error: 'Transport not found' });
        }

        return res.json(transport);
    } catch (err) {
        console.error('Error fetching transport:', err);
        return res.status(500).json({ error: 'Server error' });
    }
}

module.exports = {
    getAllTransports,
    createTransport,
    updateTransport,
    updateTransportState,
    getTransport,
    updateTransportFuelType,
    getTotalGallonsComplete,
    totalTransports
};