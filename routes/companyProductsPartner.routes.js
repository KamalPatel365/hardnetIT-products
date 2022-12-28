module.exports = app => {
    const productsPartner = require("../controllers/companyProductsPartner.controller");
    var router = require("express").Router();

    router.post("/productPartner/", productsPartner.addPartnerDetails);
    router.delete("/productPartner/:partnerId", productsPartner.deleteProductsPartnerById);
    router.put("/productPartner/:partnerId", productsPartner.updateProductPartnerDataById);
    router.get("/productPartner/retrieve", productsPartner.getProductsPartnerData);

    
  app.use('/products', router);
}