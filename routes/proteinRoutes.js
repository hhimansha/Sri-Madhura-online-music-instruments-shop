const express = require("express");
const router = express.Router();
const {
    getProtein, getProteins, createProtein, updateProtein, deleteProtein
    } = require("../controllers/proteinController")

//setup route for get all protein
router.route("/").get(getProteins)

// setup route for get a specific protein
router.route("/admindash/products/:id").get(getProtein);


//setup route for create a protein
router.route("/admindash/products").post(createProtein)

//setup route for update a protein
router.route("/admindash/products/update/:id").put(updateProtein)

//setup route for delete a protein
router.route("/admindash/products/:id").delete(deleteProtein)

//export the router
module.exports = router;
