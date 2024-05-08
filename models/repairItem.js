const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repairSchema = new Schema( 
    {
        // cID: {
        //     type: String,
        //     required: true,
        // },
       
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required:true,
        },
        instrumentCat: {
            type: String,
           
            required: true,
        },
        instrumentBrand: {
            type: String,
            required: true,
           
        },
        brand: {
            type: String,
            required: true,
           
        },
        warranty: {
            type: String,
            required: true,
            enum: ['Have', 'Not Have', 'Other'], // Define the available options
        },
        issueType: {
            type: String,
            required: true,
            
        },
        price: {
            type: String,
            required: true,
            
        },
        issueDescription: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            required: true,
        },
        
    },
    {
        timestamps: true,
    }
  
);



module.exports = {
    repairs: mongoose.model('repair', repairSchema)
};
