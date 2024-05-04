const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnect');
const  UserRouter  = require("./routes/user.js");
const cookieParser = require('cookie-parser');

connectDB();
const PORT = process.env.PORT || 5050;
const app = express();


// Load environment variables
if (dotenv.error) {
  console.error("Error loading .env file:", dotenv.error);
}

app.use(cors());
app.use(cookieParser(
  {
    origin: ["http://localhost:3000"],
    Credential: true
  }
))
app.use(express.json());
app.use('/auth', UserRouter);
app.use('/api/users', UserRouter);


// start the Express server
const URL = process.env.ATLAS_URI;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection successfull!!!");
});

app.use("/api/rentals", require("./routes/rentItemsRoute")); 

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
