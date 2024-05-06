const express = require('express');
const { Request } = require('../models/orderRequestModel');
const router = express.Router();
//Route for save a new order
router.post('/', async (request, response) => {
  try {
    if (
      !request.body.instrument ||
      !request.body.type ||   
      !request.body.brand ||
      !request.body.quantity 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: instrument, quantity',
      });
    }
    const newRequest = {
        instrument: request.body.instrument,
        type: request.body.type,
        brand: request.body.brand,
        quantity: request.body.quantity,
    };

    const newRequestObject= await Request.create(newRequest);

    return response.status(201).send(newRequestObject);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});

//Route for get all requests from database
router.get('/', async (request, response) => {
  try {
    const suprequests = await Request.find({});

    return  response.status(200).json({
      count: suprequests.length,
      data: suprequests

  });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});


//Route for get one request from database by id
router.get('/:id', async (request, response) => {
  try {

    const { id } = request.params;
    const oneRequest = await Request.findById(id);

    return  response.status(200).json(oneRequest);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});

//Route for update a request
router.put('/:id', async(request, response) => {
  try {
    if (
      !request.body.instrument ||
      !request.body.type ||
      !request.body.brand ||
      !request.body.quantity 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: instrument, quantity',
      });
    }

    const { id } = request.params;
    
    const result = await Request.findByIdAndUpdate(id, request.body);

    if(!result){
      return response.status(404).json({ message: 'Request not found'});
    }

    return response.status(200).send({ message: 'Request updated successfully'});
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});

//Route for Delete a Request
router.delete('/:id', async(request, response) => {
  try {
    const { id } = request.params;
    
    const result = await Request.findByIdAndDelete(id);
    
    if(!result){
      return response.status(404).json({ message: 'Request not found'});
    }

    return response.status(200).send({ message: 'Request deleted successfully'});

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message});
  }
});
module.exports = router;