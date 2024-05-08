const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentBlogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
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

module.exports = mongoose.model('Blog', rentBlogSchema);
