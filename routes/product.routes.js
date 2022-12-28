module.exports = app => {
    const products = require("../controllers/product.controller");
    var router = require("express").Router();

    router.post("/", products.create);
    router.get("/:id", products.findOne);
    router.put("/:id", products.updateById);
    router.get("/", products.retrieveAll);

    
  app.use('/products', router);
}