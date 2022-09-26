const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  productID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  addedOn: { type: Date, default: Date.now },
});

const categoryModel = model("Category", categorySchema); //"Category" is the ref in product model for the objectID

module.exports = categoryModel;
