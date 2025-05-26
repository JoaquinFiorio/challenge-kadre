const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        password: {
            type: String,
            required: true
        }
    },
    { 
        timestamps: true,
        versionKey: false 
    }
)

const usersModel = mongoose.model('UserModel', userSchema)

module.exports = usersModel
