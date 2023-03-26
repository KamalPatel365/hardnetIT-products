const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const store = new session.MemoryStore();
const app = express();

app.use(session({
    secret: 'some-secret',
    cookie: {maxAge: 30000},
    saveUninitialized: false,
    store
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use( (req, res, next) => {
    console.log("🚀 ~ file: app.js ~ line 14 ~ store", store);
    next();
})

// app.use('/users', userRoute);
// app.use('/products', productRoute);
require("./routes/product.routes")(app);
require("./routes/productFeature.routes")(app);
require("./routes/productFeatureOffer.routes")(app);
require("./routes/productFeatureDetail.routes")(app);
require("./routes/productCategories.routes")(app);
require("./routes/productBrands.routes")(app);
require("./routes/companyProductsOffer.routes")(app);
require("./routes/companyProductsSlider.routes")(app);
require("./routes/companyProductsPartner.routes")(app);
require("./routes/companyServices.routes")(app);
require("./routes/contactUs.routes")(app);

app.get('/', (req,res) => {
    res.sendStatus(200);
})

app.listen(process.env.PORT, () =>  {
    console.log(`server is running on PORT ${process.env.PORT}`);
});