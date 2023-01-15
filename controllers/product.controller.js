const Product = require("../models/product.model");

exports.create = async (req, res) => {
    const {categoryId, brand, name, model, shortDescription, description, price} = req.body;

    try {
        // Validate request
        if (!req.body) {
          res.status(400).send({
            errorMsg: "Content can not be empty!"
          });
          return;
        }
        else if(categoryId === undefined || brand === undefined || name === undefined || model === undefined || shortDescription === undefined || description === undefined || price === undefined)
        {
            res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined"});
            return;
        }
        else if(categoryId === "" )
        {
            res.status(400).send({errorMsg: "'categoryId' field cannot be empty"});
            return;
        }
        else if(brand === "" )
        {
            res.status(400).send({errorMsg: "'brand' field cannot be empty"});
            return;
        }
        else if(name === "")
        {
            res.status(400).send({errorMsg: "'name' field cannot be empty"});
            return;
        }
        else if( model === "")
        {
            res.status(400).send({errorMsg: "'model' field cannot be empty"});
            return;
        }
        else if(shortDescription === "")
        {
            res.status(400).send({errorMsg: "'shortDescription' field cannot be empty"});
            return;
        }
        else if(description === "")
        {
            res.status(400).send({errorMsg: "'description' field cannot be empty"});
            return;
        }
        else if(price === "")
        {
            res.status(400).send({errorMsg: "'price' field cannot be empty"});
            return;
        }
        else
        {
            // Create a Product
           const product = new Product({
            categoryId: req.body.categoryId,
            brand: req.body.brand,
            name: req.body.name,
            model: req.body.model,
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            price: req.body.price
           });

           //Save a Product
           await Product.create(product, (err, data) => {
                if(err){
                    res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product"});
                    return;
                }
                else if(data.errorMsg !== undefined){
                    res.status(500).send({errorMsg: data.errorMsg || "Some error occured while creating the Product"});
                    return;
                }
                else{
                    res.status(200).send( {product: data});
                }
           })
        }
        
        next();   
    } catch (error) {
        res.status(403).send({errorMsg: error});
    } 

}

exports.findOne = async (req, res) => {
    try{
        await Product.getSingleProduct(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while getting single Product"});
            }
            else{
                res.status(200).send( {product: data});
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
    
        await Product.updateProductById(req.params.id, new Product(req.body), (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found Product with id ${req.params.id}.`
                    });
                }
                else{
                    res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while updating the Product"});
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

exports.retrieveAll = async (req, res)  => {
    try {
	    await Product.retrieveAllProduct(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while retrieve all Product"});
            }
            else{
                res.status(200).send(data);
            }
        });
    } catch (error) {
        res.status(403).send({ errorMsg: error })
    }
}