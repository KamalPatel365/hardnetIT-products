const ProductsSlider = require("../models/companyProductsSlider.model");

exports.addSliderImage = async (req, res, next) => {
    const {sequence, description, imageDirPath, categoryId} = req.body;

    try {
        // Validate request
        if (!req.body || Object.keys(req.body).length === 0) {
          res.status(400).send({
            errorMsg: "Content can not be empty ", errorCode: 505
          });
          return;
        }
        else if(('') in req.body)
        {
            res.status(400).send({errorMsg: " Cannot have empty key", errorCode: 506});
            return;
        }
        else if( description === undefined || categoryId === undefined || sequence === undefined || imageDirPath === undefined)
        {
            res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined", errorCode: 502});
            return;
        }
        else if(description === "" )
        {
            res.status(400).send({errorMsg: "'description' field cannot be empty", errorCode: 504});
            return;
        }
        else if(sequence === "" )
        {
            res.status(400).send({errorMsg: "'sequence' field cannot be empty", errorCode: 504});
            return;
        }
        else if(categoryId === "")
        {
            res.status(400).send({errorMsg: "'categoryId' field cannot be empty", errorCode: 504});
            return;
        }
        else if(imageDirPath === "")
        {
            res.status(400).send({errorMsg: "'imageDirPath' field cannot be empty", errorCode: 504});
            return;
        }
        else
        {              
           const productsSlider = new ProductsSlider({
            description : req.body.description,
            sequence : req.body.sequence,
            categoryId : req.body.categoryId,
            imageDirPath : req.body.imageDirPath
           });

           //Save a ProductsSlider
           await ProductsSlider.addProductsSliderImage(productsSlider, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the ProductFeature"});
            }
            else{
                res.status(200).send( {products_slider: data});
            }
        });
        }
        
        next();   
    } catch (error) {
        res.status(403).send({errorMsg: error});
        next();
    } 
}

exports.deleteProductsSliderById = async (req, res) => {

    try {
        
        await ProductsSlider.deleteProductsSliderById(req.params.imageId, (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found ProductsSlider with id ${req.params.imageId}.`
                    });
                }
                else{
                    // console.warn("Error Message ==>", err.sqlMessage);
                    if( err.sqlMessage !== '' )
                        res.status(500).send({errorMsg: "Some error occured while deleting the Products Slider"});
                }
            }
            else{
                data.affectedRows > 0 ? res.status(200).send({product: "Deleted Successfully"}) : res.status(200).send({product: data});
            }
        })
    }
    catch(error)
    {
        res.status(403).send({ errorMsg: error })
    }
}

exports.updateSliderDataById = async (req, res) => {
    const { description, sequence, categoryId, imageDirPath } = req.body;
    try {
    
        if (Object.keys(req.body).length === 0) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(description !== undefined && description === "" )
          {
              res.status(400).send({errorMsg: "'description' field cannot be empty", errorCode: 504});
              return;
          }
          else if(sequence !== undefined && sequence === "" )
          {
              res.status(400).send({errorMsg: "'sequence' field cannot be empty", errorCode: 504});
              return;
          }
          else if(categoryId !== undefined && categoryId === "" )
          {
              res.status(400).send({errorMsg: "'categoryId' field cannot be empty", errorCode: 504});
              return;
          }
          else if(imageDirPath !== undefined && imageDirPath === "" )
          {
              res.status(400).send({errorMsg: "'imageDirPath' field cannot be empty", errorCode: 504});
              return;
          }
    
        await ProductsSlider.updateSliderDataById(req.params.imageId, new ProductsSlider(req.body), (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found ProductsSlider with id ${req.params.imageId}.`
                    });
                }
                else{
                    res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the ProductsSlider"});
                }
            }
            else{
                res.status(200).send({product: data});
            }
        })
    }
    catch(error)
    {
        res.status(403).send({ errorMsg: error })
    }
}

exports.getProductsSliderData = async (req, res) => {
    try{
        await ProductsSlider.getProductsSliderData(req, (err, data) => {
            
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product", errorCode: 503});
            }
            else{
                res.status(200).send( {products_slider: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}

// exports.findTitle = async (req, res) => {
//     try{
//         await ProductsOffer.getProductOfferTitle(req, (err, data) => {
//             if(err){
//                 res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product", errorCode: 503});
//             }
//             else{
//                 res.status(200).send( {product_title: data});
//             }
//         });
//     } catch (error) {
//         res.status(403).send({errorMsg: error});
//     }
// }



// exports.updateProductOfferByTitleId = async (req, res) => {
//     const {posterPath, description, categoryId} = req.body;

//     try {
    
//         if (Object.keys(req.body).length === 0) {
//             res.status(400).send({
//               errorMsg: "Content can not be empty!"
//             });
//             return;
//           }
//           else if(posterPath !== undefined && posterPath === "" )
//           {
//               res.status(400).send({errorMsg: "'posterPath' field cannot be empty", errorCode: 504});
//               return;
//           }
//           else if(description !== undefined && description === "" )
//           {
//               res.status(400).send({errorMsg: "'description' field cannot be empty", errorCode: 504});
//               return;
//           }
//           else if(categoryId !== undefined && categoryId === "" )
//           {
//               res.status(400).send({errorMsg: "'categoryId' field cannot be empty", errorCode: 504});
//               return;
//           }
    
//         await ProductsOffer.updateProductOfferById(req.params.titleId ,req.params.offerId, new ProductsOffer(req.body), (err, data) => {
//             if(err){
//                 if(err.kind === 'not_found')
//                 {
//                     res.status(404).send({
//                         message: `Not found ProductsOffer with id ${req.params.offerId}.`
//                     });
//                 }
//                 else{
//                     console.warn("Error Message ==>", err.sqlMessage);
//                     if( err.sqlMessage !== '' )
//                         res.status(500).send({errorMsg: "Some error occured while creating the ProductsOffer"});
//                 }
//             }
//             else{
//                 res.status(200).send({product: data});
//             }
//         })
//     }
//     catch(error)
//     {
//         res.status(403).send({ errorMsg: error })
//     }
// }

// exports.deleteProductOfferTitleById = async (req, res) => {

//     try {
        
//         await ProductsOffer.deleteProductOfferTitleById(req.params.titleId, (err, data) => {
//             if(err){
//                 if(err.kind === 'not_found')
//                 {
//                     res.status(404).send({
//                         message: `Not found Products Offer title with id ${req.params.offerId}.`
//                     });
//                 }
//                 else{
//                     console.warn("Error Message ==>", err.sqlMessage);
//                     if( err.sqlMessage !== '' )
//                         res.status(500).send({errorMsg: "Some error occured while deleting the Products Offer Title"});
//                 }
//             }
//             else{
//                 data.affectedRows > 0 ? res.status(200).send({product: "Deleted Successfully"}) : res.status(200).send({product: data});
//             }
//         })
//     }
//     catch(error)
//     {
//         res.status(403).send({ errorMsg: error })
//     }
// }



