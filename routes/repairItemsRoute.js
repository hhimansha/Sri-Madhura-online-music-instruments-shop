import express from 'express';
import { repairs } from '../models/repairItem.js';

const router = express.Router();

// Route for creating a new repair request
router.post('/', async (req, res) => {
    try {
        const { cID,name, email, address, date, instrumentCat, instrumentBrand,brand, warranty,issueType,price, issueDescription, status } = req.body;

        if (!cID ||!name || !email || !address || !date || !instrumentCat || !instrumentBrand || !brand|| !warranty||!issueType|| !issueDescription|| !status|| !price) {
            return res.status(400).send({ message: 'Please provide all required fields: name, email, address, date, instrumentCat, instrumentBrand, warranty,issueType, issueDescription, status,price' });
        }

        const newRequest = await repairs.create({
            cID,
            name,
            email,
            address,
            date,
            instrumentCat,
            instrumentBrand,
            brand,
            warranty,
            issueType,
            price,
            issueDescription,
            status
        });

        return res.status(201).send(newRequest);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for getting all repair requests
router.get('/', async (req, res) => {
    try {
        const repairRequests = await repairs.find({});
        return res.status(200).json({
            count: repairRequests.length,
            data: repairRequests
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for getting a repair request by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const repairRequest = await repairs.findById(id);
        if (!repairRequest) {
            return res.status(404).send({ message: 'Request not found' });
        }
        return res.status(200).send(repairRequest);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for updating a repair request by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedRequest = await repairs.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRequest) {
            return res.status(404).send({ message: 'Request not found' });
        }
        return res.status(200).send({ message: 'Request updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Route for deleting a repair request by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRequest = await repairs.findByIdAndDelete(id);
        if (!deletedRequest) {
            return res.status(404).send({ message: 'Request not found' });
        }
        return res.status(200).send({ message: 'Request deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

export default router;
