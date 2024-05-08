const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const priceSchema = new Schema(
    {
        Ninstrument: {
            type: String,
            required: true,
        },
        Rimage: {
            type: String,
            required: true,
        },
        RimageBase64: {
            type: String,
            required: true,
        },
        issueType2: {
            type: String,
            required: true,
        },
        fprice: {
            type: String,
            required: true,
        },
        issueDetail: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

exports.Price = mongoose.model('prices', priceSchema);
