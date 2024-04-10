const asyncHandler = require('express-async-handler');
const RentItem = require('../models/rentItem');

//@desc Get all rental items
//@route GET /api/rentals
//@access Public
const getRentals = asyncHandler(async (req, res) => {
    const rentals = await RentItem.find();
    res.status(200).json(rentals);
});

//@desc Get a rental item by ID
//@route GET /api/rentals/:id
//@access Public
const getRentItem = asyncHandler(async (req, res) => {
    const rentItem = await RentItem.findById(req.params.id);
    if (!rentItem) {
        res.status(404);
        throw new Error("RentItem not found");
    }
    res.status(200).json(rentItem);
});

//@desc Create a new rental item
//@route POST /api/rentals
//@access Public
const createRentItem = asyncHandler(async (req, res) => {
    const { title, description, category, rentalPrice, stockCount, image } = req.body;
    if (!title || !description || !category || !rentalPrice || !stockCount || !image) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const rentItem = await RentItem.create({
        title,
        description,
        category,
        rentalPrice,
        stockCount,
        image
    });

    res.status(201).json(rentItem);
});

//@desc Update a rental item by ID
//@route PUT /api/rentals/:id
//@access Public
const updateRentItem = asyncHandler(async (req, res) => {
    const rentItem = await RentItem.findById(req.params.id);
    if (!rentItem) {
        res.status(404);
        throw new Error("RentItem not found");
    }

    const updatedRentItem = await RentItem.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json(updatedRentItem);
});

//@desc Delete a rental item by ID
//@route DELETE /api/rentals/:id
//@access Public
const deleteRentItem = asyncHandler(async (req, res) => {
    const rentItem = await RentItem.findById(req.params.id);
    if (!rentItem) {
        res.status(404);
        throw new Error("RentItem not found");
    }

    await rentItem.remove();
    res.status(200).json({ message: "RentItem removed" });
});

module.exports = { getRentals, getRentItem, createRentItem, updateRentItem, deleteRentItem };
