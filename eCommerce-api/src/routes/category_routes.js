const router = require("express").Router();
const CategoryModel = require("../models/category_model");

router.get("/", async function (req, res) {
  await CategoryModel.find().exec(function (err, categories) {
    if (err) {
      return res.json({ success: false, error: err });
    }

    res.json({ success: true, data: categories });
  });
});

router.post("/", async function (req, res) {
  const categoryData = req.body;
  const newCategory = new CategoryModel(categoryData);
  await newCategory.save(function (err) {
    if (err) {
      return res.json({ success: false, error: err });
    }

    res.json({ success: true, data: newCategory });
  });
});

router.delete("/", async function (req, res) {
  const categoryID = req.body.categoryID;
  const result = await CategoryModel.findOneAndDelete({
    categoryID: categoryID,
  });
  if (!result) {
    return res.json({ success: false, error: "category-not-found" });
  }
  res.json({ success: true, data: result });
});

router.put("/", async function (req, res) {
  const categoryData = req.body;
  const categoryID = categoryData.categoryID;
  const result = await CategoryModel.findOneAndUpdate({ categoryID: categoryID }, categoryData);

  if (!result) {
    return res.json({ success: false, error: "category-not-found" });
  }

  res.json({ success: true, data: categoryData }); //result is the model of the old data
});

module.exports = router;
