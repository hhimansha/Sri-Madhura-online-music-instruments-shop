const asyncHandler = require('express-async-handler');
const RentItem = require('../models/rentItem');
const {error} = require("console");


const getRentals = asyncHandler(async(req,res) => {
    const rentals = await RentItem.find(); 
    res.status(200).json(rentals);
});



//@desc Create new rentItem
//@route POST /api/rentitem
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

module.exports = {createRentItem, getRentals};