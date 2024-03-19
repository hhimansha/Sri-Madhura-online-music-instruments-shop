const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

// start the Express server
const URL = process.env.ATLAS_URI;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection successfull!!!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
