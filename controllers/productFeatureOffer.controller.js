const ProductFeatureOffer = require("../models/productFeatureOffer.model");

exports.addProductFeatureOffer = async (req, res) => {
    
    const { productFeatureId, title, description1, description2, description3, description4, description5 } = req.body;

    try {
        
        if (!req.body) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(req.params.productId === undefined || productFeatureId === undefined || title === undefined || description1 === undefined || description2 === undefined || description3 === undefined || description4 === undefined || description5 === undefined)
          {
              res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined"});
              return;
          }
          else if(title !== "" && (description1 === "" || description2 === "" || description3 === "" || description4 === "" || description5 === ""))
          {
              res.status(400).send({errorMsg: "'description' field cannot be empty"});
              return;
          }
          else
          {
            const productFeature = new ProductFeatureOffer({
                productId: req.params.productId,
                productFeatureId : req.body.productFeatureId,
                title : req.body.title,
                description1 : req.body.description1,
                description2 : req.body.description2,
                description3 : req.body.description3,
                description4 : req.body.description4,
                description5 : req.body.description5
            });
  
             await ProductFeatureOffer.addProductFeatureOffer(req.params.productId, productFeature, (err, data) => {
                if(err){
                    if(err.kind === 'not_found')
                    {
                        res.status(404).send({
                            message: `Not found Product with id ${req.params.productId}.`
                        });
                    }
                    else{
                        res.status(500).send({errorMsg: err.sqlMessage || "Some Error occured while adding Product Feature"});
                    }
                }
                else{
                    res.status(200).send({products: data});
                }
            })
          }
    }catch (error) {
        res.status(403).send({ errorMsg: error })
    }
}

exports.findFeatureOfferByID = async (req, res) => {
    try{
        await ProductFeatureOffer.getProductOffer(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the ProductFeature"});
            }
            else{
                res.status(200).send( {product_feature: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}

exports.updateFeatureOfferById = async (req, res) => {
    
    const { title, description1, description2, description3, description4, description5 } = req.body;
    
    try {
    
        if (Object.keys(req.body).length === 0) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(req.params.productId === undefined || title === undefined || description1 === undefined )
          {
              res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined"});
              return;
          }
          else if(title !== "" && (description1 === "" || description2 === "" || description3 === "" || description4 === "" || description5 === ""))
          {
              res.status(400).send({errorMsg: "'description' field cannot be empty"});
              return;
          }
    
        await ProductFeatureOffer.updateProductFeatureOffersById(req.params.productId, new ProductFeatureOffer(req.body), (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found Product with productId ${req.params.productId}.`
                    });
                }
                else{
                    res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while Updating the Product Feature"});
                }
            }
            else{
                data.msg !== "" ? res.status(500).send(data) : res.status(200).send({product_feature: data});
            }
        })
    }
    catch(error)
    {
        res.status(403).send({ errorMsg: error })
    }
}

exports.deleteFeatureOffer = async (req, res) => {
    try{
        await ProductFeatureOffer.deleteFeatureOffer(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the ProductFeature"});
            }
            else{
                res.status(200).send( {product_feature: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}