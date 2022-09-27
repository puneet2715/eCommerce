const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  productID: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  description: { type: String, default: "" },
  styles: { type: [{ type: Schema.Types.ObjectId, ref: "ProductStyle" }], default: [] },
  addedOn: { type: Date, default: Date.now },
});

const productModel = model("Product", productSchema);

module.exports = productModel;
