const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Destination folder where files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File name
    }
});

const upload = multer({
    storage: storage
});

const { createRentItem, getRentals, getRentItem, updateRentItem, deleteRentItem } = require('../controllers/rentItemController');
const { createRentalOrder, getRentalOrders, getRentalOrderById, updateRentalOrder, deleteRentalOrder } = require('../controllers/rentalOrderController');

// Rental item routes
router.post('/rentals/rentalcreate', upload.single('image'), createRentItem);
router.route('/rentals').get(getRentals);
router.route('/rentals/:id').get(getRentItem);
router.put('/rentals/update/:id', upload.single('image'), updateRentItem);
router.route('/rentals/delete/:id').delete(deleteRentItem);

// Rental order routes
router.post('/rental-orders/create', createRentalOrder);
router.route('/rental-orders').get(getRentalOrders);
router.route('/rental-orders/:id').get(getRentalOrderById);
router.put('/rental-orders/update/:id', updateRentalOrder);
router.route('/rental-orders/delete/:id').delete(deleteRentalOrder);

module.exports = router;
