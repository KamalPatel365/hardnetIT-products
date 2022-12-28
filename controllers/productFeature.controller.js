const ProductFeature = require("../models/productFeature.model");

exports.addProductFeature = async (req, res) => {
    
    const {description, productInfo, discountPrice} = req.body;

    try {
        
        if (!req.body) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(description === undefined || productInfo === undefined || discountPrice === undefined)
          {
              res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined"});
              return;
          }
          else if(productInfo === "" )
          {
              res.status(400).send({errorMsg: "'productInfo' field cannot be empty"});
              return;
          }
          else
          {
            const productFeature = new ProductFeature({
             productId: req.params.productId,
             description: req.body.description,
             productInfo: req.body.productInfo,
             discountPrice: req.body.discountPrice
            });
  
             await ProductFeature.addProductFeature(req.params.productId, productFeature, (err, data) => {
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

exports.findOne = async (req, res) => {
    try{
        await ProductFeature.getSingleProduct(req, (err, data) => {
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

exports.updateById = async (req, res) => {
    try {
    
        if (Object.keys(req.body).length === 0) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
    
        await ProductFeature.updateProductFeatureById(req.params.productId, new ProductFeature(req.body), (err, data) => {
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
