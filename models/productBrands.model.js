const sqlConnection = require("../database");

// constructor
const ProductBrand = function(contact) {
  this.brandId = contact.brandId;
  this.name = contact.name;
};

ProductBrand.getProductBrands = (req, result) => {

  const fetchProductBrands = "SELECT * FROM company_product_brands ORDER BY brand_id";
  
  sqlConnection.query(fetchProductBrands, (err, results) => {
    if(err)
    {
      result(err, null);
    }

    if(results != undefined)
    {
      result(null, [...results])
    }
  });
}

module.exports = ProductBrand;