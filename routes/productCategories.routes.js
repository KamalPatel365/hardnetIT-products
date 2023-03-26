module.exports = app => {
    const ProductCategory = require("../controllers/productCategories.controller");
    var router = require("express").Router();

    router.get("/categories/retrieve", ProductCategory.getProductCategories);

    
  app.use('/products/', router);
}