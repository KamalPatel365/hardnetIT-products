module.exports = app => {
    const productFeatureOffer = require("../controllers/productFeatureOffer.controller");
    var router = require("express").Router();

    router.post("/:productId/feature/offer", productFeatureOffer.addProductFeatureOffer);
    router.get("/:productId/feature/offer", productFeatureOffer.findFeatureOfferByID);
    router.put("/:productId/feature/offer", productFeatureOffer.updateFeatureOfferById);
    router.delete("/:productId/feature/offer", productFeatureOffer.deleteFeatureOffer);

    
  app.use('/products', router);
}