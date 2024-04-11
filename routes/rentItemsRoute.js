const express = require("express");
const router = express.Router();

const {createRentItem, getRentals, getRentItem, updateRentItem, deleteRentItem} = require('../controllers/rentItemController'); 

router.route('/rentalcreate').post(createRentItem);
router.route('/rentals').get(getRentals);
router.route('/rentals/:id').get(getRentItem);
router.route('/rentals/update/:id').put(updateRentItem);
router.route('/rentals/delete/:id').delete(deleteRentItem);


module.exports = router;