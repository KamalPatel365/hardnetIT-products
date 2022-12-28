module.exports = app => {
    const companyServices = require("../controllers/companyProductsServices.controller");
    var router = require("express").Router();

    router.post("/companyService/", companyServices.addCompanyServices);
    router.delete("/companyService/:serviceId", companyServices.deleteCompanyServicesById);
    router.put("/companyService/:serviceId", companyServices.updateCompanyServiceById);
    router.get("/companyService/retrieve", companyServices.retrieveCompanyServices);

    
  app.use('/products', router);
}