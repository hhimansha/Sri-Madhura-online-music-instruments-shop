const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    Simage: {
      type: String,
      required: true,
  },
  SimageBase64: {
      type: String,
      required: true,
  },
    condition: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    bank: {
      type: String,
      required: true,
    },
    accno: {
      type: Number,
      required: true,
    },
    accname: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneno: {
      type: Number,
      required: true,
    },
    orderstatus: {
      type: String,
    },
    
    
  },
  {
    timestamps: true,
  }
);

exports.SellItem = mongoose.model('sellItem', itemSchema);
