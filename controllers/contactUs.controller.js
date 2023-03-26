const ContactUs = require("../models/contactUs.model");

// exports.updateById = async (req, res) => {
//     try {


    
//         if (Object.keys(req.body).length === 0) {
//             res.status(400).send({
//               errorMsg: "Content can not be empty!"
//             });
//             return;
//           }
    
//         await Product.updateProductById(req.params.id, new Product(req.body), (err, data) => {
//             if(err){
//                 if(err.kind === 'not_found')
//                 {
//                     res.status(404).send({
//                         message: `Not found Product with id ${req.params.id}.`
//                     });
//                 }
//                 else{
//                     res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while updating the Product"});
//                 }
//             }
//             else{
//                 res.status(200).send({product: data});
//             }
//         })
//     }
//     catch(error)
//     {
//         res.status(403).send({ errorMsg: error })
//     }
// }

exports.getContactDetails = async (req, res)  => {
    try {
	    await ContactUs.getContactDetails(req, (err, data) => {
            if(err){
                res.status(500).send({errorMsg: err.sqlMessage || "Some error occured while retrieve all Product"});
            }
            else{
                res.status(200).send(data[0]);
            }
        });
    } catch (error) {
        res.status(403).send({ errorMsg: error })
    }
}