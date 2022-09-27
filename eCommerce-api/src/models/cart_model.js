const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
    cartID: { type: String, required: true, unique: true },
    userID: { type: String, required: true },
    items: { type: [{ type: Schema.Types.ObjectId, ref: "CartItem"}], default: []}
});

const cartModel = model("Cart", cartSchema);

module.exports = cartModel;