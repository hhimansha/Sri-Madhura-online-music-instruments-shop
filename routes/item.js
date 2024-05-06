const router = require('express').Router();
let itemSchema = require('../models/item');

router.route('/addItem').post((req, res) => {
    const { uniqueId, name, type, brand, description, picture } = req.body;
    const item = new itemSchema({uniqueId, name, type, brand, description, picture });
    item.save()
        .then(() => res.json('Item Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/update/").put(async (req, res) => {
    const { uniqueId, name, type, brand, description, picture } = req.body;
    const item = {
        uniqueId, name, type, brand, description, picture
    }
    const update = await itemSchema.findOneAndUpdate({ uniqueId: uniqueId }, item).then(() => {
        res.status(200).send({ status: "Item Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/delete/:itemId").delete(async (req, res) => {
    let itemId = req.params.itemId;
    itemSchema.findOneAndDelete({ uniqueId: itemId })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/allItem").get(async (req, res) => {
    itemSchema.find()
        .then(item => res.json(item))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;