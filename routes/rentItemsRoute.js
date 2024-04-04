const express = require("express");
const router = express.Router();

const {createRentItem, getRentals} = require('../controllers/rentItemController'); 

router.route('/rentalcreate').post(createRentItem);
router.route('/rentals').get(getRentals);

module.exports = router;