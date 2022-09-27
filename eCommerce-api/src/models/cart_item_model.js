const { Schema, model } = require("mongoose");

const cartItemSchema = new Schema({
  cartItemID: { type: String, required: true, unique: true },
  cartID: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  style: { type: Schema.Types.ObjectId, ref: "ProductStyle" },
  addedOn: { type: Date, default: Date.now },
});

const cartItemModel = model("CartItem", cartItemSchema);

module.exports = productModel;
