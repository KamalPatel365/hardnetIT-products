const sqlConnection = require("../database");

const ProductsPartner = function(productsPartner) {
    this.description = productsPartner.description,
    this.categoryId = productsPartner.categoryId,
    this.partnerImg = productsPartner.partnerImg
  };

  
  ProductsPartner.addProductsPartnerDetails =  async (productsPartner, result) => {
    let productsPartnerInsrtQuery = "";

    await new Promise(() => {
        productsPartnerInsrtQuery = "INSERT INTO company_product_partners(partner_img, description, category_id) VALUES (?,?,?)"; 
    
        sqlConnection.query(productsPartnerInsrtQuery, [ productsPartner.partnerImg, productsPartner.description, productsPartner.categoryId ], (err, results) => {
            if(err)
            {
              result(err, null);
              return;
            } 

            if(results!==undefined)
            {
              result(null, { id: results.insertId, ...productsPartner });
            }
        });
    });
  };
  
  ProductsPartner.deleteProductsPartnerById = async (partnerId, result) => {
    
    let selProductsPartnerQuery = `SELECT * FROM company_product_partners WHERE partner_id='${partnerId}'`;

    sqlConnection.query(selProductsPartnerQuery, async (err, checkProdResults) => {

      if(err)
      {
        await result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productsPartnerDeleteQuery = "DELETE FROM company_product_partners ";
        
        if (partnerId !== "") {
          productsPartnerDeleteQuery += ` WHERE partner_id='${partnerId}'`
        }
        
        sqlConnection.query(productsPartnerDeleteQuery, async (err, results) => {
          if(err)
          {
            await result(err, null);
          }
      
          if(results !== undefined){
            await result(null, {...results})
          }
        });
      }
      else{
        await result(null, {msg: "No slider found for passed Product image ID"})
      }
    });
  }

  ProductsPartner.updateProductPartnerDataById = async (partnerId, productsPartnerData, result) => {
  
    const { description, categoryId, partnerImg } = productsPartnerData;
    
    let selProductOfferQuery = `SELECT * FROM company_product_partners WHERE partner_id='${partnerId}'`;

    sqlConnection.query(selProductOfferQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productsPartnerDataUpdateQuery = "UPDATE company_product_partners SET ";
    
        if(description !== undefined){
          productsPartnerDataUpdateQuery += `description='${description}'`
        }
    
        if(categoryId !== undefined){
          productsPartnerDataUpdateQuery += `, category_id ='${categoryId}'`
        }
    
        if(partnerImg !== undefined){
          productsPartnerDataUpdateQuery += `, partner_img='${partnerImg}'`
        }
        
        if (Object.keys(productsPartnerData).length !== 0) {
          productsPartnerDataUpdateQuery += ` WHERE partner_id='${partnerId}'`
        }
        
        sqlConnection.query(productsPartnerDataUpdateQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...productsPartnerData})
          }
        });
      }
      else{
        result(null, {msg: "No partner details found for passed Product partner ID"})
      }
    });
  }

  ProductsPartner.getProductsPartnerData = async (req, result) => {
    
    await new Promise(() => {
      getProductsPartnerDataQuery = `SELECT company_product_partners.partner_img, company_product_partners.description, product_categories.name FROM company_product_partners LEFT JOIN product_categories ON product_categories.category_id=company_product_partners.category_id`;
      
      sqlConnection.query(getProductsPartnerDataQuery, (err, results) => {
        
        if(err){
          result(err, null);
          return;
        }
        if(results !== undefined)
        {
          result(null, { ...results });
        }
  
      });
    });
  }
    
  module.exports = ProductsPartner;