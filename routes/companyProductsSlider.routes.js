module.exports = app => {
    const productsSlider = require("../controllers/companyProductsSlider.controller");
    var router = require("express").Router();

    router.post("/productSlider/", productsSlider.addSliderImage);
    router.delete("/productSlider/:imageId", productsSlider.deleteProductsSliderById);
    router.put("/productSlider/:imageId", productsSlider.updateSliderDataById);
    router.get("/productSlider/retrieve", productsSlider.getProductsSliderData);

    
  app.use('/products', router);
}