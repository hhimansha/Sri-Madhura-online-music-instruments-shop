const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentItemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    rentalPrice: {
        type: Number,
        required: true
    },
    stockCount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    
    },
    // You can add more fields here if needed
}, {
    timestamps: true
});

module.exports = mongoose.model('RentItem', rentItemSchema);
