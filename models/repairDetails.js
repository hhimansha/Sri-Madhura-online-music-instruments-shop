import mongoose from "mongoose";

const priceSchema = mongoose.Schema(
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

export const Price = mongoose.model('prices', priceSchema);
