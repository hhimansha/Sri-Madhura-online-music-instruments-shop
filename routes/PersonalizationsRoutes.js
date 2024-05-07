const express = require("express");
const router = express.Router();
//Insert Controller
const PersonalizationsController = require("../controllers/PersonalizationsController");

router.get("/", PersonalizationsController.getAllPersonalizations);
router.post("/", PersonalizationsController.addPersonalizations);
router.get("/:id", PersonalizationsController.getById);
router.put("/:id", PersonalizationsController.updatePersonalizations);
router.delete("/:id", PersonalizationsController.deletePersonalizations);

//export
module.exports = router;
