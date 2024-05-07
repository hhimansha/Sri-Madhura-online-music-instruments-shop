const asyncHandler = require('express-async-handler');
const RentalOrder = require('../models/rentalPayment');

const createRentalPayment = asyncHandler(async (req, res) => {
    const { rentalItemID, userId } = req.body;
    const image = req.file ? req.file.filename : null; // Get the filename if file exists, otherwise set to null

    try {
        const rentalPayment = await RentalPayment.create({
            rentalItemID,
            userId,
            image,
        });
        res.status(201).json(rentalPayment);
        console.log(rentalPayment);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create rental payment" });
    }
});

const getRentalPaymentById = asyncHandler(async (req, res) => { 
    const userId = req.params.id;
    const rentalPayment = await RentalPayment.find({userId: userId});
    if (!rentalPayment) {
        res.status(404);
        throw new Error("Rental payment not found");
    }
    res.status(200).json(rentalPayment);
}); 

const getRentalPaymentImage = async (req, res) => {
    const { userId, orderId } = req.params;

    try {
        // Find the rental payment by user ID and rental order ID
        const rentalPayment = await RentalPayment.findOne({ userId, rentalItemID: orderId });
        if (!rentalPayment) {
            return res.status(404).json({ message: 'Rental payment not found' });
        }

        // Send the image file
        res.sendFile(rentalPayment.image);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createRentalPayment, getRentalPaymentById, getRentalPaymentImage };