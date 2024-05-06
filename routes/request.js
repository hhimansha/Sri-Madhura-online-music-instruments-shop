const router = require('express').Router();
const requestSchema = require('../models/request');

router.post('/addRequest', async (req, res) => {
    try {
        const { rid, itemId, item, quantity, status, price, mail } = req.body;
        const newRequest = new requestSchema({ rid, itemId, item, quantity, status, price, mail });
        const savedRequest = await newRequest.save();
        res.json(savedRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.route("/updateReq").put(async (req, res) => {
    const {  rid, itemId, item, quantity, status, price, mail } = req.body;
    const data = {
        rid, itemId, item, quantity, status, price, mail
    }
    const update = await requestSchema.findOneAndUpdate({ rid: rid }, data).then(() => {
        res.status(200).send({ status: "Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.delete('/deleteRequest/:rid', async (req, res) => {
    try {
        await requestSchema.findOneAndDelete({ rid: req.params.rid });
        res.json({ message: 'Request deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/allRequests', async (req, res) => {
    try {
        const allRequests = await requestSchema.find();
        res.json(allRequests);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
