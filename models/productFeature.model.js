const sqlConnection = require("../database");

const ProductFeature = function(productFeature) {
    this.productId = productFeature.productId;
    this.description = productFeature.description;
    this.productInfo = productFeature.productInfo;
    this.discountPrice = productFeature.discountPrice;
  };

  
ProductFeature.addProductFeature =  async (productId, productFeature, result) => {
    let productInsertQuery = "";

    await new Promise(() => {
            productInsertQuery = "INSERT INTO product_feature(product_id, description, product_info, discount_price) VALUES (?,?,?,?)"; 
  
            sqlConnection.query(productInsertQuery, [ productId, productFeature.description, productFeature.productInfo, productFeature.discountPrice], (err, results) => {
                if(err)
                {
                  result(err, null);
                  return;
                } 
                if(results!==undefined)
                {
                  result(null, { id: results.insertId, ...productFeature });
                }
            });
          });
  
  };

  ProductFeature.getSingleProduct = async (req, result) => {
    let getProductQuery = "";
  
    const productId = req.params.productId;
    
    await new Promise(() => {
      getProductQuery = `SELECT id, products.name, products.model, products.short_description, products.description, products.price, product_feature.description, product_feature.product_info, product_feature.discount_price
      FROM product_feature LEFT JOIN products ON products.id=product_feature.product_id WHERE product_id='${productId}'`;
      
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

  ProductFeature.updateProductFeatureById = async (productId, productFeatureData, result) => {
  
    const { description, productInfo, discountPrice } = productFeatureData;
    
    let selProductFeatureQuery = `SELECT * FROM product_feature WHERE product_id='${productId}'`;

    sqlConnection.query(selProductFeatureQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productFeatureUpdateQuery = "UPDATE product_feature SET ";
    
        if(description !== undefined){
          productFeatureUpdateQuery += `description='${description}'`
        }
      
        if(productInfo !== undefined){
          productFeatureUpdateQuery += `, product_info='${(productInfo).replace(/'/g, "\\'")}'`
        }  
    
        if(discountPrice !== undefined){
          productFeatureUpdateQuery += `, discount_price='${discountPrice}' `
        }
        
        if (Object.keys(productFeatureData).length !== 0) {
          productFeatureUpdateQuery += ` WHERE product_id='${productId}'`
        }
        
        sqlConnection.query(productFeatureUpdateQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...productFeatureData})
          }
        });
      }
      else{
        result(null, {msg: "No feature details found for passed Product ID"})
      }
    });
  }
  
  
  
  
  module.exports = ProductFeature;