const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please add the firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Please add the firstname"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique : [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
    Admin: {
      type: Boolean,
      default : false
    },
    DeliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("User", userSchema);