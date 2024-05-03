const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    proteinId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Reference to the Book collection
      required: [true, "Please add the title"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User collection
      required: [true, "Please add the title"],
    },
    proteinName: {
      type: String,
      required: [true, "Please add the author"],
    },
    qty: {
      type: Number,
      required: [true, "Please add the publish year"],
    },
    imageSrc: {
      type: String,
      required: [true, "Please add the image"],
    },
    TotPrice: {
      type: Number,
      required: [true, "Please add the price"],
    },
  },
  {
    timestamps: true,
  }
);

// Add a static method to the schema to calculate the grand total
orderSchema.statics.calculateGrandTotal = async function () {
  try {
    const result = await this.aggregate([
      {
        $group: {
          _id: null,
          grandTotal: { $sum: "$TotPrice" },
        },
      },
    ]);

    return result.length > 0 ? result[0].grandTotal : 0;
  } catch (error) {
    console.error("Error calculating grand total:", error);
    throw error;
  }
};


module.exports = mongoose.model("Order", orderSchema);
