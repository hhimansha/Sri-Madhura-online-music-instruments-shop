const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    firstname: {
        type: String,
        requrired: true
    },
    lastname: {
        type: String,
        requrired: true
    },
    email: {
        type: String,
        requrired: true
    },
    password: {
        type: String,
        requrired: true
    },
    phone: {
        type: String,
        requrired: true
    }
})

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;