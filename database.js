const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config();

const sqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'hdIT',
    password: 'hardnetIT89##',
    database: 'hardnetit_cctv_data',
    multipleStatements: true
});

sqlConnection.connect( (err) => {
    if(err)
    {
        console.log(err.message);
    }
    console.log('db '+ sqlConnection.state);
});

module.exports = sqlConnection;

//  ==== ==== ==== ====

// db.promise().query(`INSERT INTO products(id, category_id, name, model, short_description, description, price) VALUES (NULL, '${categoryId}','${name}','${model}','${shortDescription}','${description}','${price}')`)
//         .then((result)=>{
//             console.log(result);
//             res.status(201).send("Product Added Successfully")
//         }).catch((err)=>{
//             console.log(err);
//             res.status(403).send(err)
//         });