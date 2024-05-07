const mongoose = require("mongoose");

const proteinSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the title"],
    },
    company: {
      type: String,
      required: [true, "Please add the author"],
    },

    imageSrc: {
      type: String,
      required: [true, "Please add the image"],
    },
    category:{
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: [true, "Please add the description"],
    },
    price: {
      type: Number,
      required: [true, "Please add the  price"],
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Protein", proteinSchema);