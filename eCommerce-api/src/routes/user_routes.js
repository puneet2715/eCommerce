const router = require("express").Router();
const UserModel = require("../models/user_model");
const bcrypt = require("bcrypt");

router.get("/:userID", async function (req, res) {
  const userID = req.params.userID;
  const foundUser = await UserModel.findOne({ userID: userID });
  if (!foundUser) {
    return res.json({ success: false, error: "user-not-found" });
  }
  res.json({ success: true, data: foundUser });
});

router.post("/createaccount", async function (req, res) {
  const userData = req.body;

  //Encrypt (Hash) Password
  const password = userData.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  userData.password = hashedPassword;

  const newUser = new UserModel(userData);
  await newUser.save(function (err) {
    if (err) {
      return res.json({ success: false, error: err });
    }

    res.json({ success: true, data: newUser });
  });
});

router.post("/login", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const foundUser = await UserModel.findOne({ email: email });
  if (!foundUser) {
    return res.json({ success: false, error: "user-not-found" });
  }

  const correctPassword = await bcrypt.compare(password, foundUser.password);
  if (!correctPassword) {
    return res.json({ success: false, error: "incorrect-password" });
  }

  res.json({ success: true, data: foundUser });
});

module.exports = router;
