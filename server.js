const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnect');
const multer = require('multer');
const path = require('path');

connectDB();
const PORT = process.env.PORT || 5050;
const app = express();


// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // File name
  }
});

const upload = multer({
  storage: storage
});

// Load environment variables
if (dotenv.error) {
  console.error("Error loading .env file:", dotenv.error);
}

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// start the Express server
const URL = process.env.ATLAS_URI;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection successful!!!");
});

// Routes
const rentItemsRoute = require("./routes/rentItemsRoute");
app.use("/api", rentItemsRoute); // Change the route to /api

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const item = require('./routes/item.js');
app.use('/item', item);

const request = require('./routes/request.js');
app.use('/request', request);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
