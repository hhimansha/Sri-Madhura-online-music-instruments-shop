const asyncHandler = require("express-async-handler");
const Protein = require("../models/proteinModel");
const { error } = require("console");

//@desc Get all proteins
//@route GET /api/proteins
//@access public
const getProteins = asyncHandler(async(req,res) => {
    const proteins = await Protein.find(); 
    res.status(200).json(proteins);
});

//@desc Create new protein
//@route POST /api/proteins
//@access public
const createProtein = asyncHandler(async(req,res) => {
    console.log("This is the body : ", req.body);
    const {title, company,  imageSrc, category,  description, price} = req.body;
    if(!title || !company || !imageSrc || !category || !description || !price){
        res.status(400);
        throw new Error("All the fields are required!");
    }

    const protein = await Protein.create({
        title,
        company,
        imageSrc,
        category,
        description,
        price
    });

    res.status(201).json(protein);
});

//@desc Get a protein
//@route GET /api/proteins/:id
//@access public
const getProtein = asyncHandler(async(req,res) => {
    const protein = await Protein.findById(req.params.id);
    if(!protein){
        res.status(404);
        throw new Error("protein not found");
    }
    res.status(200).json(protein);
});

//@desc Update a protein
//@route PUT /api/proteins/:id
//@access public
const updateProtein = asyncHandler(async(req,res) => {
    const protein = await Protein.findById(req.params.id);
    if(!protein){
        res.status(404);
        throw new Error("protein not found");
    }

    const updatedProtein =  await Protein.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedProtein);
});

//@desc Delete a protein
//@route DELETE /api/proteins/:id
//@access public
const deleteProtein = asyncHandler(async (req, res) => {
    const protein = await Protein.findById(req.params.id);
    if (!protein) {
        res.status(404);
        throw new Error("protein not found");
    }

    await protein.deleteOne(); // Use deleteOne to remove the document
    res.status(200).json(protein);
});


module.exports = {getProtein, getProteins, createProtein, updateProtein, deleteProtein};