const express = require('express');
const multer = require('multer');
const { Price } = require('../models/repairDetails.js');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/'); // Change this to your desired upload directory
    },
    filename: function (req, file, cb) {
        cb(null, `price_${Date.now()}_${file.originalname}`);
    },
});

// Initialize multer upload
const upload = multer({ storage: storage });

// Route for saving a new price with image
// router.post('/', upload.single('Rimage'), async (request, response) => {
//     try {
//         // Check if the request contains all required fields
//         if (!request.file || !request.body.issueType2 || !request.body.fprice || !request.body.issueDetail) {
//             return response.status(400).send({
//                 message: 'Send all required fields: Rimage, issueType2, fprice, issueDetail',
//             });
//         }

//         // Create a new Price document
//         const newPrice = new Price({
//             Rimage: request.file.filename,
//             issueType2: request.body.issueType2,
//             fprice: request.body.fprice,
//             issueDetail: request.body.issueDetail,
//         });

//         // Save the new Price document to the database
//         const savedPrice = await newPrice.save();

//         return response.status(201).send(savedPrice);
//     } catch (error) {
//         console.error(error);
//         response.status(500).send({ message: 'Internal Server Error' });
//     }
// });

router.post('/', upload.single('Rimage'), async (request, response) => {
    try {
        // Check if the request contains all required fields
        if (!request.file || !request.body.issueType2 || !request.body.fprice || !request.body.issueDetail) {
            return response.status(400).send({
                message: 'Send all required fields: Rimage, issueType2, fprice, issueDetail',
            });
        }
        // Create a new Price document
        const newPrice = new Price({
            Rimage: request.file.filename,
	        RimageBase64: request.body.filebase64,
            Ninstrument:request.body.Ninstrument,
            issueType2: request.body.issueType2,
            fprice: request.body.fprice,
            issueDetail: request.body.issueDetail,
        });

        // Save the new Price document to the database
        const savedPrice = await newPrice.save();

        return response.status(201).send(savedPrice);
	
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for getting all prices
router.get('/', async (request, response) => {
    try {
        const prices = await Price.find({});
        return response.status(200).json({
            count: prices.length,
            data: prices
        });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for getting a single price by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const price = await Price.findById(id);
        if (!price) {
            return response.status(404).json({ message: 'Price not found' });
        }
        return response.status(200).json(price);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for updating a price by ID
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedPrice = await Price.findByIdAndUpdate(id, request.body, { new: true });
        if (!updatedPrice) {
            return response.status(404).json({ message: 'Price not found' });
        }
        return response.status(200).send(updatedPrice);
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for deleting a price by ID
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedPrice = await Price.findByIdAndDelete(id);
        if (!deletedPrice) {
            return response.status(404).json({ message: 'Price not found' });
        }
        return response.status(200).send({ message: 'Price deleted successfully' });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: 'Internal Server Error' });
    }
});

// Export the router
module.exports = router;

