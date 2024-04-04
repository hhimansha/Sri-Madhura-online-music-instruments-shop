const asyncHandler = require('express-async-handler');
const RentItem = require('../models/rentItem');
const {error} = require("console");


const getRentals = asyncHandler(async(req,res) => {
    const rentals = await RentItem.find(); 
    res.status(200).json(rentals);
});

//@desc Get a rentalitem
//@route GET /api/rentals/:id
//@access public
const getRentItem = asyncHandler(async(req,res) => {
    const rentItem = await RentItem.findById(req.params.id);
    if(!rentItem){
        res.status(404);
        throw new Error("RentItem not found");
    }
    res.status(200).json(rentItem);
});

//@desc Create new rentItem
//@route POST /api/rentals/rentalcreate
//@access public
const createRentItem = asyncHandler(async(req,res) => {
    console.log("This is the body : ", req.body);
    const {itemName, rentPrice, quantity, rentDate, noOfRentDays} = req.body;
    if(!itemName || !rentPrice || !quantity || !rentDate || !noOfRentDays){
        res.status(400);
        throw new Error("All the fields are required!");
    }

    const rentitem = await RentItem.create({
        itemName,
        rentPrice,
        quantity,
        rentDate,
        noOfRentDays
    });

    res.status(201).json(rentitem);
});

//@desc update rentItem
//@route PUT /api/rentals/rentals/update/:id
//@access public
const updateRentItem = asyncHandler(async(req,res) => {
    const rentItem = await RentItem.findById(req.params.id);
    if(!rentItem){
        res.status(404);
        throw new Error("RentItem not found");
    }
    const updatedRentItem = await RentItem.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).json(updatedRentItem);
    
});

//@desc delete rentItem
//@route PUT /api/rentals/rentals/delete/:id
//@access public
const deleteRentItem = asyncHandler(async(req,res) => {
    const rentItem = await RentItem.findById(req.params.id);
    if(!rentItem){
        res.status(404);
        throw new Error("RentItem not found");
    }
    await rentItem.deleteOne();
    res.status(200).json({message: "RentItem removed"});
    
});


module.exports = {createRentItem, getRentals, getRentItem, updateRentItem, deleteRentItem};