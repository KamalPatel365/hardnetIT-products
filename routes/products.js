const { Router, response } = require("express");
const DBService = require("../database");

const router = Router();

router.post("/addCategory", (req, res, next) => {

    const {categoryName} = req.body;
    try {
        if(categoryName !== undefined && categoryName !== null && categoryName !== "")
        {
            db.promise().query(`INSERT INTO product_categories(category_id,name) VALUES (NULL,'${categoryName}')`);
            res.status('201').send({result: "Category Created Successfully ! !"});
        }
        else{
            res.status('403').send({errorMsg: "Category name cannot be empty"});
        }
            next();   
    } catch (error) {
	
    } 
})

router.post("/addProduct", async (req, res, next) => {

    const db = DBService.getDbInstance();

    const {categoryId, name, model, shortDescription, description, price} = req.body;

    try {
        if(categoryId === undefined || name === undefined || model === undefined || shortDescription === undefined || description === undefined || price === undefined)
        {
            res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined"});
        }
        else if(categoryId === "" )
        {
            res.status(400).send({errorMsg: "categoryId field cannot be empty"});
        }
        else if(name === "")
        {
            res.status(400).send({errorMsg: "name field cannot be empty"});
        }
        else if( model === "")
        {
            res.status(400).send({errorMsg: "model field cannot be empty"});
        }
        else if(shortDescription === "")
        {
            res.status(400).send({errorMsg: "shortDescription field cannot be empty"});
        }
        else if(description === "")
        {
            res.status(400).send({errorMsg: "description field cannot be empty"});
        }
        else if(price === "")
        {
            res.status(400).send({errorMsg: "price field cannot be empty"});
        }
        else
        {
           const result = db.insertProductData(req, res, next );

           await result.then(({errorMsg, result}) => 
                (result === "" && errorMsg !== "") ? res.status(403).send( {errorMsg} ) : res.status(200).send( {product: result} )
           )           
           .catch(err => res.status(403).send( {errorMsg: err}));
           
        }
        
        next();   
    } catch (error) {
        res.status(403).send({errorMsg: error});
    } 
})

router.get("/singleProduct/:productID?", async (req, res, next) => {
    const db = DBService.getDbInstance();
    
    try {
	    if(req.params.productID === undefined)
	    {
	        res.status(400).send({errorMsg: "Product ID not found"});
	    }
	    else{
	        const result = db.getProductDetail(req.params.productID);
	        await result.then(({errorMsg, result}) => {
                (result === "" && errorMsg !== "") ? res.status(403).send( {errorMsg} ) : res.status(200).send( {product: result} )
            })
            .catch(err => res.status(403).send({errorMsg: err}));
	    }
	    next();
    } catch (error) {
        res.status(403).send({errorMsg: error});
    }
});


module.exports = router;