const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require('dotenv').config();
const connectDB = require('./config/dbConnect');


connectDB();
const PORT = process.env.PORT || 5050;
const app = express();


// Load environment variables
if (dotenv.error) {
  console.error("Error loading .env file:", dotenv.error);
}

app.use(cors());
app.use(express.json());

// start the Express server
const URL = process.env.ATLAS_URI;
mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection successfull!!!");
});

//Routes
const rentItemsRoute = require("./routes/rentItemsRoute");
app.use("/api", rentItemsRoute);

const repairItemsRoute = require("./routes/repairItemsRoute");
app.use('/repair', repairItemsRoute);

const RepairDetailsRoute = require("./routes/RepairDetailsRoute");
app.use('/prices', RepairDetailsRoute);



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
