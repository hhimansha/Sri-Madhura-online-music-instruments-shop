const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AddItemSchema = new Schema({
  imgurl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  wood: {
    type: String,
    required: true,
  },
  casetype: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("AddItem", AddItemSchema);
