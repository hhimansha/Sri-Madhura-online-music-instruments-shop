const express = require("express");
const router = express.Router();

const {createRentItem, getRentals, getRentItem} = require('../controllers/rentItemController'); 

router.route('/rentalcreate').post(createRentItem);
router.route('/rentals').get(getRentals);
router.route('/rentals/:id').get(getRentItem);

module.exports = router;