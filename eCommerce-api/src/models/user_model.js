const { Schema, model } = require("mongoose");

//Schema
const userSchema = new Schema({
  userID: { type: String, unique: true, required: true },
  fullName: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  phone: { type: String, unique: true },

  address: { type: String, default: "" },
  country: { type: String, default: "" },
  city: { type: String, default: "" },
  pincode: { type: String, default: "" },

  addedOn: { type: Date, default: Date.now },
});
//Model

const UserModel = model("User", userSchema);

module.exports = UserModel;
