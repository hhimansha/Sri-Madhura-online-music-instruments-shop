const express = require("express");
const router = express.Router();
//Insert Controller
const AddItemController = require("../controllers/AdminAddItemControlers");

router.get("/", AddItemController.getAllAddItem);
router.post("/", AddItemController.addAddItem);

//export
module.exports = router;
