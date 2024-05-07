const AddItem = require("../models/AdminAddItemModel");

const getAllAddItem = async (req, res, next) => {
  let additem;
  // Get all AddItem
  try {
    additem = await AddItem.find();
  } catch (err) {
    console.log(err);
  }
  // not found
  if (!additem) {
    return res.status(404).json({ message: "AddItem not found" });
  }
  // Display all additem
  return res.status(200).json({ additem });
};

// data Insert
const addAddItem = async (req, res, next) => {
  const { type, wood, casetype, price,imgurl } = req.body;
  let additem;
  try {
    additem = new AddItem({
      type,
      wood,
      casetype,
      price,
      imgurl
    });
    await additem.save();
  } catch (err) {
    console.log(err);
  }
  // not insert additems
  if (!additem) {
    return res.status(404).json({ message: "unable to add AddItem" });
  }
  return res.status(200).json({ additem });
};
exports.getAllAddItem = getAllAddItem;
exports.addAddItem = addAddItem;
