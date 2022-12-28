const { Router } = require('express');
const db = require('../database');

const router = Router();


router.get('/', async (req,res) => {
    const results = await db.promise().query(`SELECT * FROM user_credentials`);

    console.log("🚀 ~ file: user.js ~ line 9 ~ router.get ~ results", results);
    res.status(200).send(results[0]);
    
})

router.post('/', (req, res) => {
    const { username, password } = req.body;

    if(username && password){
        try {
                db.promise().query(`INSERT INTO user_credentials(id, uname, pwd) VALUES(NULL, "${username}", "${password}")`);
                res.status('201').send({msg: "USER Created Successfully ! !"});
        } catch (error) {
            console.log("🚀 ~ file: user.js ~ line 14 ~ router.post ~ error", error);            
        }
    }
})


module.exports = router;