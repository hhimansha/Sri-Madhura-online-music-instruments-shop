const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
        unique: true, // Ensure emails are unique
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user', // Default role is "user"
        enum: ['user', 'admin'], // Define acceptable roles
    },
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
