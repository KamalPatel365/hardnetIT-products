const sqlConnection = require("../database");

const CompanyServices = function(companyServices) {
    this.description = companyServices.description,
    this.title = companyServices.title,
    this.iconPath = companyServices.iconPath
  };

  
  CompanyServices.addCompanyServicesDetails =  async (companyServices, result) => {
    let comapnyServicesInsrtQuery = "";

    await new Promise(() => {
        comapnyServicesInsrtQuery = "INSERT INTO company_services(icon_path, description, title) VALUES (?,?,?)"; 
    
        sqlConnection.query(comapnyServicesInsrtQuery, [ companyServices.iconPath, companyServices.description, companyServices.title ], (err, results) => {
            if(err)
            {
              result(err, null);
              return;
            } 

            if(results!==undefined)
            {
              result(null, { id: results.insertId, ...companyServices });
            }
        });
    });
  };
  
  CompanyServices.deleteCompanyServicesById = async (serviceId, result) => {
    
    let selcompanyServicesQuery = `SELECT * FROM company_services WHERE service_id='${serviceId}'`;

    sqlConnection.query(selcompanyServicesQuery, async (err, checkProdResults) => {

      if(err)
      {
        await result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let companyServicesDeleteQuery = "DELETE FROM company_services ";
        
        if (serviceId !== "") {
          companyServicesDeleteQuery += ` WHERE service_id='${serviceId}'`
        }
        
        sqlConnection.query(companyServicesDeleteQuery, async (err, results) => {
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
        await result(null, {msg: "No service found for passed Product service ID"})
      }
    });
  }

  CompanyServices.updateCompanyServiceById = async (serviceId, companyServicesData, result) => {
  
    const { description, title, iconPath } = companyServicesData;
    
    let selProductOfferQuery = `SELECT * FROM company_services WHERE service_id='${serviceId}'`;

    sqlConnection.query(selProductOfferQuery, (err, checkProdResults) => {

      if(err)
      {
        result(err, null);
      }
  
      if(checkProdResults !== undefined && checkProdResults.length !== 0){

        let companyServicesDataUpdateQuery = "UPDATE company_services SET ";
    
        if(description !== undefined){
          companyServicesDataUpdateQuery += `description='${description}'`
        }
    
        if(title !== undefined){
          companyServicesDataUpdateQuery += `, title ='${title}'`
        }
    
        if(iconPath !== undefined){
          companyServicesDataUpdateQuery += `, icon_path='${iconPath}'`
        }
        
        if (Object.keys(companyServicesData).length !== 0) {
          companyServicesDataUpdateQuery += ` WHERE service_id='${serviceId}'`
        }
        
        sqlConnection.query(companyServicesDataUpdateQuery, (err, results) => {
          if(err)
          {
            result(err, null);
          }
      
          if(results !== undefined){
            result(null, {...companyServicesData})
          }
        });
      }
      else{
        result(null, {msg: "No partner details found for passed Product partner ID"})
      }
    });
  }

  CompanyServices.retrieveCompanyServicesData = async (req, result) => {
    
    await new Promise(() => {
      getcompanyServicesDataQuery = `SELECT title, description, icon_path FROM company_services`;
      
      sqlConnection.query(getcompanyServicesDataQuery, (err, results) => {
        
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
    
  module.exports = CompanyServices;