const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require('bcryptjs');


//@desc Get all users
//@route GET /api/books
//@access public
const getUsers = asyncHandler(async(req,res) => {
  // Exclude the password field from the query projection
  const users = await User.find({}, { password: 0 });
  res.status(200).json(users);
});


//@desc Get a user
//@route GET /api/user/:id
//@access public
const getUser = asyncHandler(async(req,res) => {
  const user = await User.findById(req.params.id);
  if(!user){
      res.status(404);
      throw new Error("User not found");
  }
  res.status(200).json(user);
});


//@desc register a user
//@route POST /api/users/register
//@access public
const signUpUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password, Admin } = req.body;
  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("All the fields are required!");
  }

  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed password ", hashedPassword);

  const user = await User.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
    Admin,
  });

  console.log(`User created ${user}`);

  if (user) {
    res.status(201).json({ _id: user._id, email: user.email,firstname: user.firstname,
    lastname: user.lastname,  Admin:user.Admin });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }
});



//@desc login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password} = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All the fields are required!");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    throw new Error('Incorrect email');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    res.status(401);
    throw new Error('Incorrect password');
  }

  console.log(`User logged ${user}`);
  res.status(200).json({ _id: user._id, email: user.email,firstname: user.firstname,
  lastname: user.lastname,  Admin:user.Admin, DeliveryAddress: user.DeliveryAddress });
});



//@desc Create or update delivery address for a user
//@route POST /api/users/create-address
//@access public (you may change to private based on your logic)
const createAddress = asyncHandler(async (req, res) => {
  const userId = req.params.id; // Correct way to get the user ID from the URL
  console.log('Create Address Function Called');
  console.log('User ID:', userId);

  const { street, city, state, zipCode } = req.body;

  if (!street || !city || !state || !zipCode) {
    res.status(400);
    throw new Error("All the fields are required for the delivery address!");
  }

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update the delivery address
  user.DeliveryAddress = {
    street,
    city,
    state,
    zipCode,
  };

  await user.save();

  res.status(200).json(user);

});


//@desc Get user addresses
//@route GET /api/users/:id/addresses
//@access public (you may change to private based on your logic)
const getUserAddresses = asyncHandler(async (req, res) => {
  const userId = req.params._id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  const addresses = user.DeliveryAddress || {};
  res.status(200).json(addresses);
});

//@desc Update user details
//@route PUT /api/users/:id
//@access public (you may change to private based on your logic)
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  const { firstname, lastname, email, password } = req.body;

  // Find the user by ID
  let user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Update user fields
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;

  // Update the password if provided
  if (password) {
    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  // Save the updated user
  const updatedUser = await user.save();

  // Populate the password field in the response
  const userWithPassword = {
    ...updatedUser.toObject(),
    password: password || "", // Use the provided password or an empty string
  };

  res.status(200).json(userWithPassword);
});


//@desc Delete user address
//@route DELETE /api/users/:id/addresses
//@access public (you may change to private based on your logic)
const deleteUserAddress = asyncHandler(async (req, res) => {
  const userId = req.params._id;

  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Clear the delivery address
  user.DeliveryAddress = {};

  await user.save();

  res.status(200).json({ message: 'Address deleted successfully' });
});


//@desc current user info
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current user" });
});

//@desc Delete a user
//@route DELETE /api/user/:id
//@access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
      res.status(404);
      throw new Error("User not found");
  }

  await user.deleteOne(); // Use deleteOne to remove the document
  res.status(200).json(user);
});

module.exports = {
  signUpUser,
  getUsers,
  getUser,
  loginUser,
  deleteUser,
  createAddress,
  getUserAddresses,
  updateUser,
  deleteUserAddress,
};