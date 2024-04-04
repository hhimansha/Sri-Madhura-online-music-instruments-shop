const express = require("express");
const router = express.Router();

const {createRentItem, getRentals, getRentItem, updateRentItem} = require('../controllers/rentItemController'); 

router.route('/rentalcreate').post(createRentItem);
router.route('/rentals').get(getRentals);
router.route('/rentals/:id').get(getRentItem);
router.route('/rentals/update/:id').put(updateRentItem);

module.exports = router;