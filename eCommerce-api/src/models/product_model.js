const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  styles: { type: Array, default: [] },
  prices: { type: Number, required: true },
  images: { type: Array,default :[] },
  addedOn: { type: Date, default: Date.now },
});

const productModel = model("Product", productSchema);

module.exports = productModel;
