const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config()
mongoose
  .connect(
    `mongodb+srv://puneet:${process.env.DBPASSWORD}@cluster0.ue9pkch.mongodb.net/ecommerce?retryWrites=true&w=majority`
  )
  .then(function () {
    app.get("/", function (req, res) {
      res.send("Ecommerce Setup");
    });

    const userRoutes = require("./routes/user_routes");
    app.use("/api/user", userRoutes);
    
    const productRoutes = require("./routes/product_routes");
    app.use("/api/product", productRoutes);
    
    const categoryRoutes = require("./routes/category_routes");
    app.use("/api/category", categoryRoutes);
  });

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(PORT, function () {
  console.log(`Server started on PORT: ${PORT}`);
}); //
