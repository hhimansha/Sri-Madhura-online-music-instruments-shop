const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const item = new Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const itemSchema = mongoose.model('item', item);
module.exports = itemSchema;