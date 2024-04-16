const asyncHandler = require('express-async-handler');
const RentalOrder = require('../models/rentOrder');

//@desc Get all rental orders
//@route GET /api/orders
//@access Public
const getOrders = asyncHandler(async (req, res) => {
    const orders = await RentalOrder.find();
    res.status(200).json(orders);
});

//@desc Get a rental order by ID
//@route GET /api/orders/:id
//@access Public
const getOrder = asyncHandler(async (req, res) => {
    const order = await RentalOrder.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error("Rental order not found");
    }
    res.status(200).json(order);
});

//@desc Create a new rental order
//@route POST /api/orders
//@access Public
const createOrder = asyncHandler(async (req, res) => {
    const { rentalItemID, image, title, quantity, totalPrice, rentalDate, numberOfDays } = req.body;

    if (!rentalItemID || !image || !title || !quantity || !totalPrice || !rentalDate || !numberOfDays) {
        res.status(400);
        throw new Error("All fields are required!");
    }
    
    try {
        const order = await RentalOrder.create({
            rentalItemID,
            image,
            title,
            quantity,
            totalPrice,
            rentalDate,
            numberOfDays
        });
        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to create rental order" });
    }
});

//@desc Update a rental order by ID
//@route PUT /api/orders/:id
//@access Public
const updateOrder = asyncHandler(async (req, res) => {
    const order = await RentalOrder.findById(req.params.id);
    if (!order) {
        res.status(404);
        throw new Error("Rental order not found");
    }

    // Extract data from the request body
    const { rentalItemID, image, title, quantity, totalPrice, rentalDate, numberOfDays } = req.body;

    try {
        // Update the rental order with the extracted data
        order.rentalItemID = rentalItemID;
        order.image = image;
        order.title = title;
        order.quantity = quantity;
        order.totalPrice = totalPrice;
        order.rentalDate = rentalDate;
        order.numberOfDays = numberOfDays;

        // Save the updated rental order
        const updatedOrder = await order.save();

        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Failed to update rental order" });
    }
});

//@desc Delete a rental order by ID
//@route DELETE /api/orders/:id
//@access Public
const deleteOrder = asyncHandler(async (req, res) => {
    try {
        // Find the rental order by ID
        const order = await RentalOrder.findById(req.params.id);

        // Check if the rental order exists
        if (!order) {
            return res.status(404).json({ message: "Rental order not found" });
        }

        // Attempt to remove the rental order
        await order.deleteOne();
        res.status(200).json({ message: "Rental order removed" });
    } catch (error) {
        // Handle any errors that occur during removal
        console.error(error);
        res.status(500).json({ error: "Error removing rental order" });
    }
});

module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
