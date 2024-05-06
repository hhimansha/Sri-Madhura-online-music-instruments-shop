const asyncHandler = require('express-async-handler');
const RentalOrder = require('../models/rentalOrder');

//@desc Get all rental orders
//@route GET /api/rental-orders
//@access Public
const getRentalOrders = asyncHandler(async (req, res) => {
    const rentalOrders = await RentalOrder.find().sort({ orderDate: -1 }); // Sort by orderDate in descending order
    res.status(200).json(rentalOrders);
  });

//@desc Get a rental order by ID
//@route GET /api/rental-orders/:id
//@access Public
const getRentalOrderById = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const rentalOrder = await RentalOrder.find({userId: userId});
    if (!rentalOrder) {
        res.status(404);
        throw new Error("Rental order not found");
    }
    res.status(200).json(rentalOrder);
});

//@desc Create a new rental order
//@route POST /api/rental-orders
//@access Public
const createRentalOrder = asyncHandler(async (req, res) => {
    const { rentalItemID, userId, image, title, quantity, totalPrice, rentalDate, numberOfDays } = req.body;

    try {
        const rentalOrder = await RentalOrder.create({
            rentalItemID,
            userId,
            image,
            title,
            quantity,
            totalPrice,
            rentalDate,
            numberOfDays,
            orderDate: Date.now() // Include orderDate
        });
        res.status(201).json(rentalOrder);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create rental order" });
    }
});


//@desc Update a rental order by ID
//@route PUT /api/rental-orders/:id
//@access Public
const updateRentalOrder = asyncHandler(async (req, res) => {
    const rentalOrder = await RentalOrder.findById(req.params.id);
    if (!rentalOrder) {
        res.status(404);
        throw new Error("Rental order not found");
    }

    try {
        // Update the rental order with the new data
        rentalOrder.set(req.body);
        const updatedRentalOrder = await rentalOrder.save();

        res.status(200).json(updatedRentalOrder);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to update rental order" });
    }
});

//@desc Delete a rental order by ID
//@route DELETE /api/rental-orders/:id
//@access Public
const deleteRentalOrder = asyncHandler(async (req, res) => {
    try {
        // Find the rental order by ID
        const rentalOrder = await RentalOrder.findById(req.params.id);

        // Check if the rental order exists
        if (!rentalOrder) {
            return res.status(404).json({ message: "Rental order not found" });
        }

        // Attempt to remove the rental order
        await rentalOrder.deleteOne();
        res.status(200).json({ message: "Rental order removed" });
    } catch (error) {
        // Handle any errors that occur during removal
        console.error(error);
        res.status(500).json({ error: "Error removing rental order" });
    }
});

module.exports = { getRentalOrders, getRentalOrderById, createRentalOrder, updateRentalOrder, deleteRentalOrder };
