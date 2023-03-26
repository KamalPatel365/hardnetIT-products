module.exports = app => {
    const ProductBrand = require("../controllers/productBrands.controller");
    var router = require("express").Router();

    router.get("/brands/retrieve", ProductBrand.getProductBrands);

    
  app.use('/products/', router);
}