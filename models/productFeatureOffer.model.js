const sqlConnection = require("../database");

const ProductFeatureOffer = function(productFeatureOffer) {
  this.productId = productFeatureOffer.productId;
  this.productFeatureId = productFeatureOffer.productFeatureId;
  this.title = productFeatureOffer.title;
  this.description1 = productFeatureOffer.description1;
  this.description2 = productFeatureOffer.description2;
  this.description3 = productFeatureOffer.description3;
  this.description4 = productFeatureOffer.description4;
  this.description5 = productFeatureOffer.description5;
  };

  
  ProductFeatureOffer.addProductFeatureOffer =  async (productId, productFeatureOffer, result) => {
    let productFeatureOfferInsertQuery = "";

    await new Promise(() => {
      productFeatureOfferInsertQuery = "INSERT INTO product_feature_offers(product_id, product_feature_id, title, description1, description2, description3, description4, description5) VALUES (?,?,?,?,?,?,?,?)"; 
  
            sqlConnection.query(productFeatureOfferInsertQuery, [ productId, productFeatureOffer.productFeatureId, productFeatureOffer.title, productFeatureOffer.description1, productFeatureOffer.description2, productFeatureOffer.description3, productFeatureOffer.description4, productFeatureOffer.description5 ], (err, results) => {
                if(err)
                {
                  result(err, null);
                  return;
                } 
                if(results!==undefined)
                {
                  result(null, { id: results.insertId, ...productFeatureOffer });
                }
            });
          });
  
  };

  ProductFeatureOffer.getProductOffer = async (req, result) => {
  
    const productId = req.params.productId;
    
    await new Promise(() => {
      getProductQuery = `SELECT id, products.name, products.model, products.short_description, products.price, product_feature_offers.title, product_feature_offers.description1, product_feature_offers.description2, product_feature_offers.description3, product_feature_offers.description4, product_feature_offers.description5 FROM product_feature_offers LEFT JOIN products ON products.id=product_feature_offers.product_id WHERE product_id='${productId}'`;
      
      sqlConnection.query(getProductQuery, (err, results) => {
        
        if(err){
          result(err, null);
          return;
        }
        if(results !== undefined)
        {
          result(null, { ...results[0] });
        }
  
      });
    });
  }

  ProductFeatureOffer.updateProductFeatureOffersById = async (productId, productFeatureData, result) => {
  
    const { title, description1, description2, description3, description4, description5 } = productFeatureData;
    
    let selProductFeatureQuery = `SELECT * FROM product_feature_offers WHERE product_id='${productId}'`;

    sqlConnection.query(selProductFeatureQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productFeatureUpdateQuery = "UPDATE product_feature_offers SET ";
    
        if(title !== undefined){
          productFeatureUpdateQuery += `title='${title}'`
        }
    
        if(description1 !== undefined){
          productFeatureUpdateQuery += `, description1='${description1}' `
        }
    
        if(description2 !== undefined){
          productFeatureUpdateQuery += `, description2='${description2}' `
        }
    
        if(description3 !== undefined){
          productFeatureUpdateQuery += `, description3='${description3}' `
        }
    
        if(description4 !== undefined){
          productFeatureUpdateQuery += `, description4='${description4}' `
        }
    
        if(description5 !== undefined){
          productFeatureUpdateQuery += `, description5='${description5}' `
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
            result(null, {...productFeatureData});
          }
        });
      }
      else{
        result(null, {msg: "No offers found for passed Product ID"})
      }
    });
  }

  ProductFeatureOffer.deleteFeatureOffer = async (req, result) => {
  
    const productId = req.params.productId;
    
    await new Promise(() => {
      deleteProductFeatureOffersQuery = `DELETE FROM product_feature_offers WHERE product_id='${productId}'`;
      
      sqlConnection.query(deleteProductFeatureOffersQuery, (err, results) => {
        
        if(err){
          result(err, null);
          return;
        }
        if(results !== undefined)
        {
          result(null, { ...results[0] });
        }
  
      });
    });
  }  
  
  
  module.exports = ProductFeatureOffer;