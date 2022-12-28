module.exports = app => {
    const productFeatureDetailInfo = require("../controllers/productFeatureDetailInfo.controller");
    var router = require("express").Router();

    // router.post("/:productId/feature/offer", productFeatureOffer.addProductFeatureOffer);
    router.post("/:productId/feature/prodInfo", productFeatureDetailInfo.addProdDetailInfo);
    router.get("/:productId/feature/prodInfo", productFeatureDetailInfo.findFeatureProdInfoByID);
    router.put("/:productId/feature/prodInfo", productFeatureDetailInfo.updateFeatureProdInfoById);
    router.delete("/:productId/feature/prodInfo/:productDetailId", productFeatureDetailInfo.deleteFeatureProdInfo);

    
  app.use('/products', router);
}