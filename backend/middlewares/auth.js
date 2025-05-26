const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
    if (!req?.headers?.authorization) return res.status(400).json({ message: 'Unauthorized' });

    const bearer_token = req.headers.authorization;
    const bearer_token_split = bearer_token.split(' ');

    if (bearer_token_split.length !== 2) return res.json({ message: 'Invalid Authorization' });
    const token = bearer_token_split[1];

    try {
        const token_data = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const { id: userId } = token_data;

        if (!userId) return res.status(400).json({ message: 'Error verifying the token' });

        req.userId = userId;
        
        next();

    } catch (error) {
        console.log('Error isAuthenticated', error);

        res.status(401).json({
            message: 'Error authenticating user',
            error
        });
    }
};

module.exports = { isAuthenticated };