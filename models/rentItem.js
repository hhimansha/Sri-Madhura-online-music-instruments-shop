const mongoose = require('mongoose');

const Schema = mongoose.Schema;
 const rentItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    rentPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    rentDate : {
        type: Date,
        required: true
    },
    noOfRentDays: {
        type: Number,
        required: true
    },
    },{
    timestamps: true
    
 });

 module.exports = mongoose.model('RentItem', rentItemSchema);
