const sqlConnection = require("../database");

// constructor
const Product = function(product) {
  this.categoryId = product.categoryId;
  this.brand = product.brand;
  this.name = product.name;
  this.model = product.model;
  this.shortDescription = product.shortDescription;
  this.description = product.description;
  this.price = product.price;
};

Product.create =  async (newProduct, result) => {
  
  await new Promise(() => {

    checkIfProductExistQuery = `SELECT name, model FROM products WHERE name='${newProduct.name}' OR model='${newProduct.model}'`; 
    
     sqlConnection.query(checkIfProductExistQuery, (err, results) => {
        if(err)
        {
          // reject(productResponse.errorMsg.push({msg: err.sqlMessage}));
          // console.log("error: ", err);
          result(err, null);
          return;
        } 
        if(results!==undefined && results.length!==0 )
        {
          if(results[0].name === newProduct.name)
          {
            result(null, {errorMsg: "Product name already Exixts"});
            return;
          }

          if(results[0].model === newProduct.model)
          {
            result(null, {errorMsg: "Product model already Exixts"});
            return;
          }
        }
        else{
          // resolve(productResponse.result = results);
          productInsertQuery = "INSERT INTO products(category_id, brand_id, name, model, short_description, description, price) VALUES (?,?,?,?,?,?,?)"; 

          sqlConnection.query(productInsertQuery, [newProduct.categoryId, newProduct.brand, newProduct.name, newProduct.model, newProduct.shortDescription, newProduct.description, newProduct.price], (err, results) => {
              if(err)
              {
                // reject(productResponse.errorMsg.push({msg: err.sqlMessage}));
                // console.log("error: ", err);
                result(err, null);
                return;
              } 
              if(results!==undefined)
              {
                // resolve(productResponse.result = results);
                result(null, { id: results.insertId, ...newProduct });
              }
          });
        }
    });
  });

};

Product.getSingleProduct = async (req, result) => {

  const productId = req.params.id;
  
  await new Promise(() => {
    getProductQuery = `SELECT id, product_categories.name, company_product_brands.name, products.name, products.model, products.short_description, products.description, products.price FROM products LEFT JOIN company_product_brands ON products.brand_id=company_product_brands.brand_id LEFT JOIN product_categories ON products.category_id=product_categories.category_id WHERE id='${productId}'`;

    sqlConnection.query(getProductQuery, (err, results) => {
      if(err){
        result(err, null);
        return;
      }
      if(results !== undefined)
      {
        result(null, { ...results[0] })
      }

    });
  });
}

Product.updateProductById = async (productId, productData, result) => {

  const { categoryId, brand, name, model, shortDescription, description, price } = productData;
  let productInsertQuery = "";

  if(categoryId !== "" && categoryId !== ""){
    productInsertQuery = `UPDATE products SET category_id='${categoryId}'`
  }

  if(brand !== undefined && brand !== ""){
    productInsertQuery += `, brand='${brand}'`
  }

  if(name !== undefined && name !== ""){
    productInsertQuery += `, name='${name}'`
  }

  if(model !== undefined && model !== ""){
    productInsertQuery += `, model='${model}'`
  }

  if(shortDescription !== undefined && shortDescription !== ""){
    productInsertQuery += `, short_description='${shortDescription}'`
  }

  if(description !== undefined && description !== ""){
    productInsertQuery += `, description='${description}'`
  }

  if(price !== undefined && price !== ""){
    productInsertQuery += `, price='${price}'`
  }  
  
  if (Object.keys(productData).length !== 0) {
    productInsertQuery += ` WHERE id='${productId}'`
  }

  sqlConnection.query(productInsertQuery, (err, results) => {
    if(err)
    {
      result(err, null);
    }

    if(results !== undefined){
      result(null, {...productData})
    }
  });
}

Product.retrieveAllProduct = (productsReq, result) => {
  const fetchAllProduct = "SELECT id, product_categories.name, company_product_brands.name, products.name, products.model, products.short_description, products.description, products.price, products.image FROM products LEFT JOIN company_product_brands ON products.brand_id=company_product_brands.brand_id LEFT JOIN product_categories ON products.category_id=product_categories.category_id";
  sqlConnection.query(fetchAllProduct, (err, results) => {
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

module.exports = Product;