module.exports = app => {
    const productFeature = require("../controllers/productFeature.controller");
    var router = require("express").Router();

    router.post("/:productId/feature", productFeature.addProductFeature);
    router.get("/:productId/feature", productFeature.findOne);
    router.put("/:productId/feature", productFeature.updateById);

    
  app.use('/products', router);
}