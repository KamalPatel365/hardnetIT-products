const sqlConnection = require("../database");

const ProductsOffer = function(productsOffer) {
    this.headerDesc = productsOffer.headerDesc,
    this.description = productsOffer.description,
    this.validity = productsOffer.validity,
    this.categoryId = productsOffer.categoryId,
    this.contentPath = productsOffer.contentPath
  };

  
ProductsOffer.addProductsOffer =  ( productsOffer, next ) =>  new Promise(function(resolve, reject) {
  let productsOfferTitleInsertQuery = "";
  let productsOfferDetailInsertQuery = "";

  productsOfferTitleInsertQuery = "INSERT INTO company_offer_title(header_desc, validity) VALUES (?,?)";

  sqlConnection.promise().query(productsOfferTitleInsertQuery, [ productsOffer.headerDesc, productsOffer.validity ])
  .then(res => {
    
      let dbQueries = new Array();
      let dbSuperQueries = new Array();
      productsOfferDetailInsertQuery = "INSERT INTO company_product_offers(title_id, poster_path, description, category_id) VALUES ?";

      let i=0;
      while(i < productsOffer.contentPath.length)
      { 
        dbQueries = new Array();
        dbQueries.push(res[0].insertId, productsOffer.contentPath[i], productsOffer.description, productsOffer.categoryId);
        dbSuperQueries.push(dbQueries);
        i++;
      }

        sqlConnection.query(productsOfferDetailInsertQuery, [dbSuperQueries], (err, results) => {
          try {
            if (err) throw err;
            sqlConnection.end();
  
            // console.log("🚀 ~ Results", results.affectedRows);
            if(results !== undefined)
            {
              resolve(results);
            }
          } catch (error) {
            console.log("Something went Wrong --- ", error);
            next();
          };
          
      });
      
    }).catch(error => console.log(error));
  
  });


  ProductsOffer.getProductOfferTitle = async (req, result) => {
    let getProductOfferQuery = "";
  
    const productOfferTitleId = req.params.titleId;
    
    await new Promise(() => {
      getProductOfferQuery = `SELECT title_id, header_desc, validity FROM company_offer_title WHERE title_id='${productOfferTitleId}'`;
      
      sqlConnection.query(getProductOfferQuery, (err, results) => {
        
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

  ProductsOffer.getAllOffersForTitle = async (req, result) => {
    let getProductOfferQuery = "";
  
    const productOfferTitleId = req.params.productOfferTitleId;
    
    await new Promise(() => {
      getProductOfferQuery = `SELECT company_product_offers.offer_id, company_offer_title.header_desc, company_offer_title.validity, company_product_offers.poster_path, company_product_offers.description, product_categories.name AS category FROM company_product_offers LEFT JOIN company_offer_title ON company_product_offers.title_id=company_offer_title.title_id LEFT JOIN product_categories ON product_categories.category_id=company_product_offers.category_id WHERE company_offer_title.title_id='${productOfferTitleId}'`;
      
      sqlConnection.query(getProductOfferQuery, (err, results) => {
        
        if(err){
          result(err, null);
          return;
        }
        if(results !== undefined)
        {
          result(null, { ...results })
        }
  
      });
    });
  }

  ProductsOffer.updateTitleById = async (titleId, productFeatureData, result) => {
  
    const { headerDesc, validity } = productFeatureData;
    
    let selProductOfferQuery = `SELECT * FROM company_offer_title WHERE title_id='${titleId}'`;

    sqlConnection.query(selProductOfferQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productFeatureUpdateQuery = "UPDATE company_offer_title SET ";
    
        if(headerDesc !== undefined){
          productFeatureUpdateQuery += `header_desc='${headerDesc}'`
        }
    
        if(validity !== undefined){
          productFeatureUpdateQuery += `, validity='${validity}'`
        }
        
        if (Object.keys(productFeatureData).length !== 0) {
          productFeatureUpdateQuery += ` WHERE title_id='${titleId}'`
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

  ProductsOffer.updateProductOfferById = async (titleId, offerId, productOfferData, result) => {
  
    const { contentPath, description, categoryId } = productOfferData;
    
    let selProductOfferQuery = `SELECT * FROM company_product_offers WHERE title_id='${titleId}' AND offer_id='${offerId}'`;

    sqlConnection.query(selProductOfferQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productFeatureUpdateQuery = "UPDATE company_product_offers SET ";
    
        if(contentPath !== undefined){
          productFeatureUpdateQuery += `poster_path='${contentPath}', `
        }
    
        if(description !== undefined){
          productFeatureUpdateQuery += `description='${description}', `
        }
    
        if(categoryId !== undefined){
          productFeatureUpdateQuery += `category_id='${categoryId}'`
        }
        
        if (Object.keys(productOfferData).length !== 0) {
          productFeatureUpdateQuery += ` WHERE title_id='${titleId}' AND offer_id='${offerId}'`
        }
        
        sqlConnection.query(productFeatureUpdateQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...productOfferData})
          }
        });
      }
      else{
        result(null, {msg: "No feature details found for passed Product ID"})
      }
    });
  }

  ProductsOffer.deleteProductOfferTitleById = async (titleId, result) => {
    
    let selProductOfferQuery = `SELECT * FROM company_offer_title WHERE title_id='${titleId}'`;

    sqlConnection.query(selProductOfferQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productOfferTitleDeleteQuery = "DELETE FROM company_product_offers ";
        
        if (titleId !== "") {
          productOfferTitleDeleteQuery += `WHERE title_id='${titleId}'; DELETE FROM company_offer_title WHERE title_id='${titleId}'`;
        }
        
        sqlConnection.query(productOfferTitleDeleteQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...results[1]}); // results[1] is for affected rows in PRODUCT Title table AND results[0] is for affected rows in PRODUCT OFFER table
          }
        });
      }
      else{
        result(null, {msg: "No offer title found for passed Product title ID"})
      }
    });
  }

  ProductsOffer.deleteProductOfferById = async (titleId, offerId, result) => {
    
    let selProductOfferQuery = `SELECT * FROM company_product_offers WHERE title_id='${titleId}' AND offer_id='${offerId}'`;

    sqlConnection.query(selProductOfferQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productOfferDeleteQuery = "DELETE FROM company_product_offers ";
        
        if (titleId !== "" && offerId !== "") {
          productOfferDeleteQuery += ` WHERE title_id='${titleId}' AND offer_id='${offerId}'`
        }
        
        sqlConnection.query(productOfferDeleteQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...results})
          }
        });
      }
      else{
        result(null, {msg: "No offer found for passed Product title ID"})
      }
    });
  }
  
  ProductsOffer.getActiveOffersGroup = async (req, result) => {
    let getProductOfferQuery = "";
    
    await new Promise(() => {
      getProductOfferQuery = `SELECT company_product_offers.offer_id, company_offer_title.title_id, company_offer_title.header_desc, company_offer_title.validity, company_product_offers.poster_path, company_product_offers.description, product_categories.name AS category FROM company_product_offers LEFT JOIN company_offer_title ON company_product_offers.title_id=company_offer_title.title_id LEFT JOIN product_categories ON product_categories.category_id=company_product_offers.category_id WHERE company_offer_title.validity >= CURRENT_DATE`;
      
      sqlConnection.query(getProductOfferQuery, (err, results) => {
        
        if(err){
          result(err, null);
          return;
        }
        if(results !== undefined)
        {
          result(null, { ...results })
        }
  
      });
    });
  }
  
  ProductsOffer.getActiveOffersTitle= async (req, result) => {
    let getProductOffersTitleQuery = "";
    
    await new Promise(() => {
      getProductOffersTitleQuery = `SELECT * FROM company_offer_title WHERE company_offer_title.validity >= CURRENT_DATE`;
      
      sqlConnection.query(getProductOffersTitleQuery, (err, results) => {
        
        if(err){
          result(err, null);
          return;
        }
        if(results !== undefined)
        {
          result(null, { ...results })
        }
  
      });
    });
  }
    
  module.exports = ProductsOffer;