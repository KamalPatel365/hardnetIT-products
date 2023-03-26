module.exports = app => {
    const contactUs = require("../controllers/contactUs.controller");
    var router = require("express").Router();

    router.get("/", contactUs.getContactDetails);

    
  app.use('/contactUs', router);
}