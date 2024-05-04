
const express = require('express');
const router = express.Router();
const { SellItem } = require('../models/sellInstrumentModel.js');


//Route for save a new book
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.type ||
      !request.body.condition ||
      !request.body.color ||
      !request.body.brand ||
      !request.body.description ||
      !request.body.price ||
      !request.body.quantity ||
      !request.body.bank ||
      !request.body.accno ||
      !request.body.accname ||
      !request.body.name ||
      !request.body.email ||
      !request.body.phoneno ||
      !request.body.orderstatus
      
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, condition, price....',
      });
    }
    const newSellItem = {
      title: request.body.title,
      type: request.body.type,
      condition: request.body.condition,
      color: request.body.color,
      brand: request.body.brand,
      description: request.body.description,
      price: request.body.price, 
      quantity: request.body.quantity,
      bank: request.body.bank,
      accno: request.body.accno,
      accname: request.body.accname,
      name: request.body.name,
      email: request.body.email,
      phoneno: request.body.phoneno,
      orderstatus: request.body.orderstatus,
    };

    const sellItem = await SellItem.create(newSellItem);

    return response.status(201).send(sellItem);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});

//Route for get all books from database
router.get('/', async (request, response) => {
  try {
    const items = await SellItem.find({});

    return  response.status(200).json({
      count: items.length,
      data: items

  });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});


//Route for get one book from database by id
router.get('/:id', async (request, response) => {
  try {

    const { id } = request.params;
    const sellItem = await SellItem.findById(id);

    return  response.status(200).json(sellItem);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});

//Route for update a book
router.put('/:id', async(request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.type ||
      !request.body.condition ||
      !request.body.color ||
      !request.body.brand ||
      !request.body.description ||
      !request.body.price ||
      !request.body.quantity ||
      !request.body.bank ||
      !request.body.accno ||
      !request.body.accname ||
      !request.body.name ||
      !request.body.email ||
      !request.body.phoneno ||
      !request.body.orderstatus 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: title, condition, price...',
      });
    }

    const { id } = request.params;
    
    const result = await SellItem.findByIdAndUpdate(id, request.body);

    if(!result){
      return response.status(404).json({ message: 'Item not found'});
    }

    return response.status(200).send({ message: 'Item updated successfully'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});

//Route for Delete a book
router.delete('/:id', async(request, response) => {
  try {
    const { id } = request.params;
    
    const result = await SellItem.findByIdAndDelete(id);
    
    if(!result){
      return response.status(404).json({ message: 'Item not found'});
    }

    return response.status(200).send({ message: 'Item deleted successfully'});

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});

module.exports = router;