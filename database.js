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

// const sqlConnection = mysql.createConnection({
//     host: 'sql6.freesqldatabase.com',
//     port: '3306',
//     user: 'sql6587074',
//     password: 'eEHYKwbtH6',
//     database: 'sql6587074',
//     multipleStatements: true,
//     secure: false,
//     secureOptions: 'none',
//     connTimeout: 10000,
//     pasvTimeout: 10000,
//     aliveTimeout: 10000
// });

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
