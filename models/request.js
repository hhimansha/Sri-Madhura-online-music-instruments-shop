const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const request = new Schema({
    rid: {
        type: String,
        required: true,
        unique: true
    },
    itemId: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const requestSchema = mongoose.model('request', request);

module.exports = requestSchema;
