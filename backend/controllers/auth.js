const UserModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    try {
        
        const { email, password, firstname, lastname, username } = req.body;

        const emailLowerCase = email.toLowerCase();
        const userExist = await UserModel.exists({ email: emailLowerCase });
        const user_Exist = await UserModel.exists({ username });

        if (userExist) {
            return res.status(400).json({ message: 'The email already exists' });
        }

        if (user_Exist) {
            return res.status(400).json({ message: 'The username is already taken' });
        }

        const passwordEncrypted = bcrypt.hashSync(password, 10);

        // Create the new user
        const newUser = new UserModel({
            email: emailLowerCase,
            password: passwordEncrypted,
            firstname,
            lastname,
            username,
        });

        await newUser.save();

        return res.status(201).json({ message: "User created successfully" });
    } catch (error) {

        console.log("/register", error);
        return res.status(500).send({ message: "Could not create the user", error });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the database, including the password field
        const user_exist = await UserModel.findOne({ email: email.toLowerCase() }).select('+password');
        
        // If the user is not found, return a 404 error
        if (!user_exist) return res.status(404).send({ message: `Invalid credentials` });

        // Compare the entered password with the one stored in the database using bcrypt
        const password_match = await bcrypt.compare(password, user_exist.password);
        
        // If the password does not match, return a 401 error (unauthorized)
        if (!password_match) return res.status(401).send({ message: 'Invalid credentials' });

        // Generate a JWT token with the user's id, using the secret key and set the expiration time to 2 hours
        const token = jwt.sign(
            { id: user_exist._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "2h" }
        );

        return res.status(200).send({
            message: 'Welcome Back ' + user_exist.username,
            token,
        });

    } catch (error) {
        console.log('Error /login', error);

        return res.status(500).send({
            message: 'An error occurred while logging in',
            error
        });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId).select('username lastname firstname email createdAt');

        if (!user) {
            return res.status(404).send({ message: "User does not exist" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.log("/get-user", error);
        return res.status(500).send({ message: "Error fetching user" });
    }
}

module.exports = {
    register,
    login,
    getUserProfile,
};