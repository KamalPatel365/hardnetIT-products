const sqlConnection = require("../database");

const ProductsSlider = function(productsSlider) {
    this.description = productsSlider.description,
    this.sequence = productsSlider.sequence,
    this.categoryId = productsSlider.categoryId,
    this.imageDirPath = productsSlider.imageDirPath
  };

  
  ProductsSlider.addProductsSliderImage =  async (productsSlider, result) => {
    let productsSliderInsrtQuery = "";
    let productsSliderTotalImgCountQuery = "";

    await new Promise(() => {
      productsSliderTotalImgCountQuery = "SELECT COUNT(*) AS sider_images_count FROM slider_images";
      sqlConnection.query(productsSliderTotalImgCountQuery, (err, results) => {
        
        if(err)
        {
          result(err, null);
          return;
        } 
        if(results!==undefined)
        {
          // result(null, { id: results.insertId, ...productsSlider });
          if(results[0].sider_images_count < 7)
          {
            productsSliderInsrtQuery = "INSERT INTO slider_images(image_dir, description, sequence, category_id) VALUES (?,?,?,?)"; 
        
            sqlConnection.query(productsSliderInsrtQuery, [ productsSlider.imageDirPath, productsSlider.description, productsSlider.sequence, productsSlider.categoryId ], (err, results) => {
                if(err)
                {
                  result(err, null);
                  return;
                } 
                if(results!==undefined)
                {
                  result(null, { id: results.insertId, ...productsSlider });
                }
            });
          }
          else{
            result(null, { msg: "Cannot exceed max slider image limit of 6" });
          }
        }
      });
    });
  };
  
  ProductsSlider.deleteProductsSliderById = async (imageId, result) => {
    
    let selProductsSliderQuery = `SELECT * FROM slider_images WHERE id='${imageId}'`;

    sqlConnection.query(selProductsSliderQuery, async (err, checkProdResults) => {

      if(err)
      {
        await result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productsSliderDeleteQuery = "DELETE FROM slider_images ";
        
        if (imageId !== "") {
          productsSliderDeleteQuery += ` WHERE id='${imageId}'`
        }
        
        sqlConnection.query(productsSliderDeleteQuery, async (err, results) => {
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

  ProductsSlider.updateSliderDataById = async (imageId, productsSliderData, result) => {
  
    const { description, sequence, categoryId, imageDirPath } = productsSliderData;
    
    let selProductOfferQuery = `SELECT * FROM slider_images WHERE id='${imageId}'`;

    sqlConnection.query(selProductOfferQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let productsSliderDataUpdateQuery = "UPDATE slider_images SET ";
    
        if(description !== undefined){
          productsSliderDataUpdateQuery += `description='${description}'`
        }
    
        if(sequence !== undefined){
          productsSliderDataUpdateQuery += `, sequence='${sequence}'`
        }
    
        if(categoryId !== undefined){
          productsSliderDataUpdateQuery += `, category_id ='${categoryId}'`
        }
    
        if(imageDirPath !== undefined){
          productsSliderDataUpdateQuery += `, image_dir='${imageDirPath}'`
        }
        
        if (Object.keys(productsSliderData).length !== 0) {
          productsSliderDataUpdateQuery += ` WHERE id='${imageId}'`
        }
        
        sqlConnection.query(productsSliderDataUpdateQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...productsSliderData})
          }
        });
      }
      else{
        result(null, {msg: "No slider details found for passed Product slider ID"})
      }
    });
  }

  ProductsSlider.getProductsSliderData = async (req, result) => {
    
    await new Promise(() => {
      getProductsSliderDataQuery = `SELECT slider_images.image_dir, slider_images.description, slider_images.sequence, product_categories.name FROM slider_images LEFT JOIN product_categories ON product_categories.category_id=slider_images.category_id`;
      
      sqlConnection.query(getProductsSliderDataQuery, (err, results) => {
        
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
    
  module.exports = ProductsSlider;