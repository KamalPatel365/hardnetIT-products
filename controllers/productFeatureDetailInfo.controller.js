const ProductFeatureDetailInfo = require("../models/productFeatureDetailInfo.model");

exports.addProdDetailInfo = async (req, res) => {
    
    const { productFeatureId, infoTitle, info } = req.body;

    try {
        
        if (!req.body) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(req.params.productId === undefined || productFeatureId === undefined || infoTitle === undefined || info === undefined)
          {
              res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined"});
              return;
          }
          else if(infoTitle === "" &&  info === "")
          {
              res.status(400).send({msg: "nothing to save"});
              return;
          }
          else if(infoTitle !== "" &&  info === "")
          {
              res.status(400).send({errorMsg: "'infoTitle' and 'info' field cannot be empty"});
              return;
          }
          else if(info !== "" &&  infoTitle === "")
          {
              res.status(400).send({errorMsg: "'infoTitle' and 'info' field cannot be empty"});
              return;
          }
          else
          {
            const productFeatureDetailInfo = new ProductFeatureDetailInfo({
                productId: req.params.productId,
                productFeatureId : req.body.productFeatureId,
                infoTitle : req.body.infoTitle,
                info : req.body.info
            });
  
             await ProductFeatureDetailInfo.addProdFeatureDetailInfo(req.params.productId, productFeatureDetailInfo, (err, data) => {
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

exports.findFeatureProdInfoByID = async (req, res) => {
    try{
        await ProductFeatureDetailInfo.getFeatureProdInfo(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while fetching the Product feature detail info"});
            }
            else{
                res.status(200).send( {prod_feature_detail_info: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}

exports.updateFeatureProdInfoById = async (req, res) => {
    
    const { infoTitle, info } = req.body;
    
    try {
    
        if (Object.keys(req.body).length === 0) {
            res.status(400).send({
              errorMsg: "Content can not be empty!"
            });
            return;
          }
          else if(req.params.productId === undefined || infoTitle === undefined || info === undefined )
          {
              res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined"});
              return;
          }
          else if(infoTitle === "" &&  info === "")
          {
              res.status(400).send({msg: "nothing to save"});
              return;
          }
          else if(infoTitle !== "" &&  info === "")
          {
              res.status(400).send({errorMsg: "'infoTitle' and 'info' field cannot be empty"});
              return;
          }
          else if(info !== "" &&  infoTitle === "")
          {
              res.status(400).send({errorMsg: "'infoTitle' and 'info' field cannot be empty"});
              return;
          }
    
        await ProductFeatureDetailInfo.updateProdDetailInfoById(req.params.productId, new ProductFeatureDetailInfo(req.body), (err, data) => {
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
                data.msg !== "" ? res.status(500).send(data) : res.status(200).send({prod_feature_detail_info: data});
            }
        })
    }
    catch(error)
    {
        res.status(403).send({ errorMsg: error })
    }
}

exports.deleteFeatureProdInfo = async (req, res) => {
    try{
        await ProductFeatureDetailInfo.deleteProdFeatureDetailInfo(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while deleting the Product Feature detail info"});
            }
            else{
                res.status(200).send( {info_deleted: data});
            }
        });
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
}