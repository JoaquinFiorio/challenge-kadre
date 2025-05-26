const User = require('../models/User'); // Adjust the path as needed

const usernameExists = async (req, res, next) => {
    try {
        const { username } = req.body;

        const user = await User.findOne({ username });

        if (user) {
            return res.status(409).json({ message: 'Username already exists.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error.' });
    }
};

module.exports = usernameExists;