const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentalPaymentSchema = new Schema({
    rentalItemID: {
        type: Schema.Types.ObjectId,
        ref: 'RentalItem', // Reference to the RentalItem model
        required: true
    },
    
    image: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    
    // Add more fields as needed
});

module.exports = mongoose.model('RentalPayment', rentalPaymentSchema);
