const Personalizations = require("../models/PersonalizationsModel");

const getAllPersonalizations = async (req, res, next) => {
  let personal;
  // Get all Personalizations
  try {
    personal = await Personalizations.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!personal) {
    return res.status(404).json({ message: "Personalizations not found" });
  }
  // Display all personal
  return res.status(200).json({ personal });
};

// data Insert
const addPersonalizations = async (req, res, next) => {
  const { gmail, type, wood, casetype, price, status } = req.body;

  let personal;

  try {
    personal = new Personalizations({
      gmail,
      type,
      wood,
      casetype,
      price,
      status,
    });
    await personal.save();
  } catch (err) {
    console.log(err);
  }
  // not insert personals
  if (!personal) {
    return res.status(404).json({ message: "unable to add Personalizations" });
  }
  return res.status(200).json({ personal });
};

//Get by Id
const getById = async (req, res, next) => {
  const id = req.params.id;

  let personal;

  try {
    personal = await Personalizations.findById(id);
  } catch (err) {
    console.log(err);
  }
  // not available personals
  if (!personal) {
    return res.status(404).json({ message: "Personalizations Not Found" });
  }
  return res.status(200).json({ personal });
};

//Update personal Details
const updatePersonalizations = async (req, res, next) => {
  const id = req.params.id;
  const { gmail, type, wood, casetype, price, status } = req.body;

  let personals;

  try {
    personals = await Personalizations.findByIdAndUpdate(id, {
      gmail: gmail,
      type: type,
      wood: wood,
      casetype: casetype,
      price: price,
      status: status,
    });
    personals = await personals.save();
  } catch (err) {
    console.log(err);
  }
  if (!personals) {
    return res
      .status(404)
      .json({ message: "Unable to Update Personalizations Details" });
  }
  return res.status(200).json({ personals });
};

//Delete personal Details
const deletePersonalizations = async (req, res, next) => {
  const id = req.params.id;

  let personal;

  try {
    personal = await Personalizations.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
  }
  if (!personal) {
    return res
      .status(404)
      .json({ message: "Unable to Delete Personalizations Details" });
  }
  return res.status(200).json({ personal });
};

exports.getAllPersonalizations = getAllPersonalizations;
exports.addPersonalizations = addPersonalizations;
exports.getById = getById;
exports.updatePersonalizations = updatePersonalizations;
exports.deletePersonalizations = deletePersonalizations;
