const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentOrderSchema = new Schema({
    rentalItemID: {
        type: Schema.Types.ObjectId,
        ref: 'RentalItem', // Reference to the RentalItem model
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    bankSlip: {
        type: String,
        required: true,
        default: "https://makeenbooks.com/public/img/app/scan.png"
    },
    rentalDate: {
        type: Date,
        required: true
    },
    numberOfDays: {
        type: Number,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now // Set default value to current date
    },
    // Add more fields as needed
});

module.exports = mongoose.model('RentalOrder', rentOrderSchema);
