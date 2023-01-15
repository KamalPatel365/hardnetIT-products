const ProductsOffer = require("../models/companyProductsOffer.model");

exports.createOffer = async (req, res, next) => {
    const {headerDesc, validity, description, contentPath, categoryId} = req.body;

    try {
        // Validate request
        if (!req.body) {
          res.status(400).send({
            errorMsg: "Content can not be empty!"
          });
          return;
        }
        else if(('') in req.body)
        {
            res.status(400).send({errorMsg: " Cannot have empty key"});
            return;
        }
        else if(headerDesc === undefined || description === undefined || categoryId === undefined || validity === undefined || contentPath === undefined)
        {
            res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined", errorCode: 502});
            return;
        }
        else if(headerDesc === "" )
        {
            res.status(400).send({errorMsg: "'headerDesc' field cannot be empty"});
            return;
        }
        else if(description === "" )
        {
            res.status(400).send({errorMsg: "'description' field cannot be empty"});
            return;
        }
        else if(validity === "" )
        {
            res.status(400).send({errorMsg: "'validity' field cannot be empty"});
            return;
        }
        else if(categoryId === "")
        {
            res.status(400).send({errorMsg: "'categoryId' field cannot be empty"});
            return;
        }
        else if(contentPath === "")
        {
            res.status(400).send({errorMsg: "'contentPath' field cannot be empty"});
            return;
        }
        else
        {
            // Create a Product
           const productsOffer = new ProductsOffer({
            headerDesc: req.body.headerDesc,
            description: req.body.description,
            validity: req.body.validity,
            categoryId: req.body.categoryId,
            contentPath: req.body.contentPath
           });

           //Save a ProductsOffer
           await ProductsOffer.addProductsOffer(productsOffer, next)
           .then(result=>{
                // console.info(result);
                if(result)
                   res.status(200).send( {result: "Product Offers Inserted Sucessfully"});
                next();
            })
           .catch(err=> {
                console.error(err);
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the ProductsOffer"});
                next();
            });
        }
        
        next();   
    } catch (error) {
        res.status(403).send({errorMsg: error});
        next();
    } 

}

exports.findTitle = async (req, res) => {
    try{
        await ProductsOffer.getProductOfferTitle(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product", errorCode: 503});
            }
            else{
                res.status(200).send( {product_title: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}

exports.findOffersByTitle = async (req, res) => {
    try{
        await ProductsOffer.getAllOffersForTitle(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product", errorCode: 503});
            }
            else{
                res.status(200).send( {product_offer: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}

exports.updateOfferTitleById = async (req, res) => {
    const {headerDesc, validity} = req.body;
    try {
    
        if (Object.keys(req.body).length === 0) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(headerDesc !== undefined && headerDesc === "" )
          {
              res.status(400).send({errorMsg: "'headerDesc' field cannot be empty", errorCode: 504});
              return;
          }
          else if(validity !== undefined && validity === "" )
          {
              res.status(400).send({errorMsg: "'validity' field cannot be empty", errorCode: 504});
              return;
          }
    
        await ProductsOffer.updateTitleById(req.params.titleId, new ProductsOffer(req.body), (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found ProductsOffer with id ${req.params.titleId}.`
                    });
                }
                else{
                    res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the ProductsOffer"});
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

exports.updateProductOfferByTitleId = async (req, res) => {
    const {posterPath, description, categoryId} = req.body;

    try {
    
        if (Object.keys(req.body).length === 0) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(posterPath !== undefined && posterPath === "" )
          {
              res.status(400).send({errorMsg: "'posterPath' field cannot be empty", errorCode: 504});
              return;
          }
          else if(description !== undefined && description === "" )
          {
              res.status(400).send({errorMsg: "'description' field cannot be empty", errorCode: 504});
              return;
          }
          else if(categoryId !== undefined && categoryId === "" )
          {
              res.status(400).send({errorMsg: "'categoryId' field cannot be empty", errorCode: 504});
              return;
          }
    
        await ProductsOffer.updateProductOfferById(req.params.titleId ,req.params.offerId, new ProductsOffer(req.body), (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found ProductsOffer with id ${req.params.offerId}.`
                    });
                }
                else{
                    console.warn("Error Message ==>", err.sqlMessage);
                    if( err.sqlMessage !== '' )
                        res.status(500).send({errorMsg: "Some error occured while creating the ProductsOffer"});
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

exports.deleteProductOfferTitleById = async (req, res) => {

    try {
        
        await ProductsOffer.deleteProductOfferTitleById(req.params.titleId, (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found Products Offer title with id ${req.params.offerId}.`
                    });
                }
                else{
                    console.warn("Error Message ==>", err.sqlMessage);
                    if( err.sqlMessage !== '' )
                        res.status(500).send({errorMsg: "Some error occured while deleting the Products Offer Title"});
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

exports.deleteProductOfferById = async (req, res) => {

    try {
        
        await ProductsOffer.deleteProductOfferById(req.params.titleId ,req.params.offerId, (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found ProductsOffer with id ${req.params.offerId}.`
                    });
                }
                else{
                    console.warn("Error Message ==>", err.sqlMessage);
                    if( err.sqlMessage !== '' )
                        res.status(500).send({errorMsg: "Some error occured while creating the ProductsOffer"});
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

exports.getActiveOffersGroup = async (req, res) => {
    try{
        await ProductsOffer.getActiveOffersGroup(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product", errorCode: 503});
            }
            else{
                res.status(200).send( {product_offers: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}

exports.getActiveOffersTitle = async (req, res) => {
    try{
        await ProductsOffer.getActiveOffersTitle(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product", errorCode: 503});
            }
            else{
                res.status(200).send( {product_offers: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}

// exports.retrieveAll = async (req, res)  => {
//     try {
// 	    await Product.retrieveAllProduct(req, (err, data) => {
//             if(err){
//                 res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product"});
//             }
//             else{
//                 res.status(200).send( {products: data});
//             }
//         });
//     } catch (error) {
//         res.status(403).send({ errorMsg: error })
//     }
// }