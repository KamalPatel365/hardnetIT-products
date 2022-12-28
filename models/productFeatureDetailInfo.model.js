const sqlConnection = require("../database");

const ProductFeatureDetailInfo = function(productFeatureDetailInfo) {
    this.productId = productFeatureDetailInfo.productId;
    this.productFeatureId = productFeatureDetailInfo.productFeatureId;
    this.infoTitle = productFeatureDetailInfo.infoTitle;
    this.info = productFeatureDetailInfo.info;
  };

  
  ProductFeatureDetailInfo.addProdFeatureDetailInfo =  async (productId, prodFeatureDetailInfo, result) => {
    let prodFeatureDetailInfoInsrtQuery = "";

    await new Promise(() => {
      prodFeatureDetailInfoInsrtQuery = "INSERT INTO product_details(product_id, product_feature_id, info_title, info) VALUES (?,?,?,?)"; 
  
            sqlConnection.query(prodFeatureDetailInfoInsrtQuery, [ productId, prodFeatureDetailInfo.productFeatureId, prodFeatureDetailInfo.infoTitle, prodFeatureDetailInfo.info ], (err, results) => {
                if(err)
                {
                  result(err, null);
                  return;
                } 
                if(results!==undefined)
                {
                  result(null, { id: results.insertId, ...prodFeatureDetailInfo });
                }
            });
          });
  
  };

  ProductFeatureDetailInfo.getFeatureProdInfo = async (req, result) => {
  
    const productId = req.params.productId;
    
    await new Promise(() => {
      getProductDetailInfoQuery = `SELECT id, products.name, products.model, products.short_description, products.price, product_details.info_title, product_details.info FROM product_details LEFT JOIN products ON products.id=product_details.product_id WHERE product_id='${productId}'`;
      
      sqlConnection.query(getProductDetailInfoQuery, (err, results) => {
        
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

  ProductFeatureDetailInfo.updateProdDetailInfoById = async (productId, productDetailInfoData, result) => {
  
    const { infoTitle, info } = productDetailInfoData;
    
    let selProdDetailInfoQuery = `SELECT * FROM product_details WHERE product_id='${productId}'`;

    sqlConnection.query(selProdDetailInfoQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let prodDetailInfoUpdateQuery = "UPDATE product_details SET ";
    
        if(infoTitle !== undefined){
          prodDetailInfoUpdateQuery += `info_title='${infoTitle}'`
        }
    
        if(info !== undefined){
          prodDetailInfoUpdateQuery += `, info='${info}' `
        }
        
        if (Object.keys(productDetailInfoData).length !== 0) {
          prodDetailInfoUpdateQuery += ` WHERE product_id='${productId}'`
        }
        
        sqlConnection.query(prodDetailInfoUpdateQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...productDetailInfoData});
          }
        });
      }
      else{
        result(null, {msg: "No offers found for passed Product ID"})
      }
    });
  }

  ProductFeatureDetailInfo.deleteProdFeatureDetailInfo = async (req, result) => {
  
    const productId = req.params.productId;
    const productDetailId = req.params.productDetailId;
    
    await new Promise(() => {
      deleteProdFeatureDetailInfoQuery = `DELETE FROM product_details WHERE product_id='${productId}' AND product_detail_id='${productDetailId}'`;
      
      sqlConnection.query(deleteProdFeatureDetailInfoQuery, (err, results) => {
        
        if(err){
          result(err, null);
          return;
        }
        if(results !== undefined)
        {
          console.log("🚀 ~ file: productFeatureDetailInfo.model.js ~ line 115 ~ sqlConnection.query ~ results", results);
          results.affectedRows === 1 ? result(null, true) : result(null, false)
        }
  
      });
    });
  }  
  
  
  module.exports = ProductFeatureDetailInfo;