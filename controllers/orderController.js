const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const placeOrder = asyncHandler(async (req, res) => {
  try {
    const { userId, carts } = req.body;

    const newOrders = await Promise.all(
      carts.map(async (cartItem) => {
        const newOrder = await Order.create({
          userId,
          ...cartItem,
        });
        return newOrder;
      })
    );

    res.status(201).json({ success: true, data: newOrders });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

const getOrders = asyncHandler(async(req,res) => {
  const orders = await Order.find(); 
  res.status(200).json(orders);
});

const getOrder = asyncHandler(async (req, res) => {
  const userId = req.params.id; // Assuming the user ID is passed in the URL parameter
  const orders = await Order.find({ userId });

  if (!orders || orders.length === 0) {
    res.status(404);
    throw new Error("No orders found for the specified user");
  }

  res.status(200).json(orders);
});

const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
      res.status(404);
      throw new Error("order not found");
  }

  await order.deleteOne(); // Use deleteOne to remove the document
  res.status(200).json(order);
});

const getGrandTotal = asyncHandler(async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: null,
          grandTotal: { $sum: '$TotPrice' },
        },
      },
    ]);

    res.status(200).json({ grandTotal: result.length > 0 ? result[0].grandTotal : 0 });
  } catch (error) {
    console.error('Error calculating grand total:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = { placeOrder, getOrders, getOrder, deleteOrder, getGrandTotal };
