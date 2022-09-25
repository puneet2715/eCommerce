const router = require("express").Router();
const ProductModel = require("../models/product_model");

router.post("/", async function (req, res) {
  const productData = req.body;
  const newProduct = new ProductModel(productData);
  await newProduct.save(function (err) {
    if (err) {
      return res.json({ success: false, error: err });
      }
      
      res.json({ success: true, data: newProduct });
  });
});

module.exports = router;
