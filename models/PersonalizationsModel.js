const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PersonalizationsSchema = new Schema({
  gmail: {
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
  status: {
    type: String,
  },
});

module.exports = mongoose.model("Personalizations", PersonalizationsSchema);
