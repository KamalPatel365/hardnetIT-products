const sqlConnection = require("../database");

// constructor
const ContactUs = function(contact) {
  this.contactId = contact.contactId;
  this.phoneNo = contact.phoneNo;
  this.telephoneNo = contact.telephoneNo;
  this.serviceNo = contact.serviceNo;
  this.emailID1 = contact.emailID1;
  this.emailID2 = contact.emailID2;
  this.address = contact.address;
};

ContactUs.getContactDetails = (req, result) => {

  const fetchContactDetails = "SELECT * from contact_details";
  
  sqlConnection.query(fetchContactDetails, (err, results) => {
    if(err)
    {
      result(err, null);
    }

    if(results != undefined)
    {
      result(null, [...results])
    }
  });
}

module.exports = ContactUs;