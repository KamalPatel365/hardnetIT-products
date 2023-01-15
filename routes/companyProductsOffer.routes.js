module.exports = app => {
    const productsOffer = require("../controllers/companyProductsOffer.controller");
    var router = require("express").Router();

    router.post("/productOffer/", productsOffer.createOffer);
    router.get("/productOffer/title/:titleId", productsOffer.findTitle);
    router.get("/productOffer/:productOfferTitleId/offer", productsOffer.findOffersByTitle);
    router.put("/productOffer/title/:titleId", productsOffer.updateOfferTitleById);
    router.put("/productOffer/title/:titleId/offer/:offerId", productsOffer.updateProductOfferByTitleId);
    router.delete("/productOffer/title/:titleId", productsOffer.deleteProductOfferTitleById);
    router.delete("/productOffer/title/:titleId/offer/:offerId", productsOffer.deleteProductOfferById);
    router.get("/productOffer/offers", productsOffer.getActiveOffersGroup);
    router.get("/productOffer/offers/titles", productsOffer.getActiveOffersTitle);

    
  app.use('/products', router);
}