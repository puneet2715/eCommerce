const router = require("express").Router();
const ProductModel = require("../models/product_model");

router.get("/", async function (req, res) {
  await ProductModel.find()
    .populate("category")
    .exec(function (err, products) {
      if (err) {
        return res.json({ success: false, error: err });
      }

      res.json({ success: true, data: products });
    });
});

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

router.delete("/", async function (req, res) {
  const productID = req.body.productID;
  const result = await ProductModel.findOneAndDelete({
    productID: productID,
  });

  if (!result) {
    return res.json({ success: false, error: "product-not-found" });
  }

  res.json({ success: true, data: result });
});

router.put("/", async function (req, res) {
  const productData = req.body;
  const productID = productData.productID;
  const result = await ProductModel.findOneAndUpdate(
    { productID: productID },
    productData
  );

  if (!result) {
    return res.json({ success: false, error: "product-not-found" });
  }

  res.json({ success: true, data: productData }); //result is the model of the old data
});

module.exports = router;
