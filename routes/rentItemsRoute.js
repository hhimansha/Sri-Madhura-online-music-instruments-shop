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

const {createRentItem, getRentals, getRentItem, updateRentItem, deleteRentItem} = require('../controllers/rentItemController'); 

router.post('/rentalcreate', upload.single('image'), createRentItem);
router.route('/rentals').get(getRentals);
router.route('/rentals/:id').get(getRentItem);
router.put('/rentals/update/:id', upload.single('image'), updateRentItem);
router.route('/rentals/delete/:id').delete(deleteRentItem);


module.exports = router;