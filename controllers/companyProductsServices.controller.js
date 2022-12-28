const CompanyServices = require("../models/companyProductServices.model");

exports.addCompanyServices = async (req, res, next) => {
    const { title , description, iconPath } = req.body;

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
        else if( description === undefined || title === undefined || iconPath === undefined)
        {
            res.status(400).send({errorMsg: "Invalid Key OR Not all required keys are defined", errorCode: 502});
            return;
        }
        else if(description === "")
        {
            res.status(400).send({errorMsg: "'description' field cannot be empty", errorCode: 504});
            return;
        }
        else if(title === "")
        {
            res.status(400).send({errorMsg: "'title' field cannot be empty", errorCode: 504});
            return;
        }
        else if(iconPath === "")
        {
            res.status(400).send({errorMsg: "'iconPath' field cannot be empty", errorCode: 504});
            return;
        }
        else
        {              
           const companyServices = new CompanyServices({
            description : req.body.description,
            title : req.body.title,
            iconPath : req.body.iconPath
           });

           //Save a companyServices
           await CompanyServices.addCompanyServicesDetails(companyServices, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while creating the Product Services"});
            }
            else{
                res.status(200).send( {products_service: data});
            }
        });
        }
        
        next();   
    } catch (error) {
        res.status(403).send({errorMsg: error});
        next();
    } 
}

exports.deleteCompanyServicesById = async (req, res) => {

    try {
        
        await CompanyServices.deleteCompanyServicesById(req.params.serviceId, (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found company services with id ${req.params.serviceId}.`
                    });
                }
                else{
                    // console.warn("Error Message ==>", err.sqlMessage);
                    if( err.sqlMessage !== '' )
                        res.status(500).send({errorMsg: "Some error occured while deleting the Products Services"});
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

exports.updateCompanyServiceById = async (req, res) => {
    const { title , description, iconPath } = req.body;
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
          else if(title !== undefined && title === "" )
          {
              res.status(400).send({errorMsg: "'title' field cannot be empty", errorCode: 504});
              return;
          }
          else if(iconPath !== undefined && iconPath === "" )
          {
              res.status(400).send({errorMsg: "'iconPath' field cannot be empty", errorCode: 504});
              return;
          }
    
        await CompanyServices.updateCompanyServiceById(req.params.serviceId, new CompanyServices(req.body), (err, data) => {
            if(err){
                if(err.kind === 'not_found')
                {
                    res.status(404).send({
                        message: `Not found company services with id ${req.params.serviceId}.`
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

exports.retrieveCompanyServices = async (req, res) => {
    try{
        await CompanyServices.retrieveCompanyServicesData(req, (err, data) => {
            
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
