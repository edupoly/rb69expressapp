var express = require("express");
var router = express.Router();
var fs = require("fs");

router.get("/getAllProducts", (req, res) => {
  var allproducts = JSON.parse(fs.readFileSync("products.txt").toString());
  res.render("products", { allproducts });
});

router.get("/productDetails/:id", (req, res) => {
  var allproducts = JSON.parse(fs.readFileSync("products.txt").toString());
  var productDetails = allproducts.find((product) => {
    if (product.id == req.params.id) {
      return true;
    }
  });
  res.render("productDetails", { productDetails });
});

module.exports = router;
