const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, getOrder, deleteOrder, getGrandTotal } = require('../controllers/orderController');

router.route('/place').post(placeOrder);
router.route('/admindash').get(getGrandTotal);
router.route('/admindash/orders').get(getOrders);
router.route('/admindash/orders/:id').delete(deleteOrder); 
router.route('/orders/user/:id').get(getOrder); // Corrected route

module.exports = router;
