const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const requestSchema = mongoose.Schema(
  {
    instrument: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
   
  },
  {
    timestamps: true,
  }
);

exports.Request = mongoose.model('suprequest', requestSchema);