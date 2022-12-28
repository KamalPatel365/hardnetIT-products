const ProductsPartner = require("../models/companyProductsPartner.model");

exports.addPartnerDetails = async (req, res, next) => {
    const { categoryId , description, partnerImg } = req.body;

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
        else if( description === undefined || categoryId === undefined || partnerImg === undefined)
        {
            res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined", errorCode: 502});
            return;
        }
        else if(description === "")
        {
            res.status(400).send({errorMsg: "'description' field cannot be empty", errorCode: 504});
            return;
        }
        else if(categoryId === "")
        {
            res.status(400).send({errorMsg: "'categoryId' field cannot be empty", errorCode: 504});
            return;
        }
        else if(partnerImg === "")
        {
            res.status(400).send({errorMsg: "'partnerImg' field cannot be empty", errorCode: 504});
            return;
        }
        else
        {              
           const productsPartner = new ProductsPartner({
            description : req.body.description,
            categoryId : req.body.categoryId,
            partnerImg : req.body.partnerImg
           });

           //Save a ProductsPartner
           await ProductsPartner.addProductsPartnerDetails(productsPartner, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product Partner"});
            }
            else{
                res.status(200).send( {products_partner: data});
            }
        });
        }
        
        next();   
    } catch (error) {
        res.status(403).send({errorMsg: error});
        next();
    } 
}

exports.deleteProductsPartnerById = async (req, res) => {

    try {
        
        await ProductsPartner.deleteProductsPartnerById(req.params.partnerId, (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found ProductsPartner with id ${req.params.partnerId}.`
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

exports.updateProductPartnerDataById = async (req, res) => {
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
    
        await ProductsPartner.updateProductPartnerDataById(req.params.partnerId, new ProductsPartner(req.body), (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found ProductsPartner with id ${req.params.partnerId}.`
                    });
                }
                else{
                    res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Products Partner"});
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

exports.getProductsPartnerData = async (req, res) => {
    try{
        await ProductsPartner.getProductsPartnerData(req, (err, data) => {
            
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product", errorCode: 503});
            }
            else{
                res.status(200).send( {products_partner: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}
