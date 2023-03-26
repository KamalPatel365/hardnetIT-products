const sqlConnection = require("../database");

// constructor
const ProductCategory = function(contact) {
  this.categoryId = contact.categoryId;
  this.name = contact.name;
};

ProductCategory.getProductCategories = (req, result) => {

  const fetchProductCategories = "SELECT * FROM product_categories ORDER BY category_id";
  
  sqlConnection.query(fetchProductCategories, (err, results) => {
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

module.exports = ProductCategory;