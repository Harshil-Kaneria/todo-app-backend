// Other Packages
require('dotenv').config()
rapid = require('rapid-sql')
const express = require('express')
const helmet = require("helmet");
const fileUpload = require('express-fileupload');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(fileUpload())


// Common Helpers
common_helper = require('./helper/common_helper');


// Middleware
auth_middleware = require('./middleware/auth');


// Constant Variables
constants = require('./config/constant');

// Defined API Versions
const version = ["v1","v2"];


// Define Route
version.forEach(function (item) {
    routes = require(`./application/${item}/routes`);
    app.use(`/${item}/`, routes);
});


// Handel 404 Routes 
app.all('*', function(req, res){
    res.status(404).json({"status": false,"message": "Something is Wrong !"})
});


// Application Listen on PORT
const port = process.env.PORT || 3000
app.listen(port,()=>{console.log(`\nApplication Running on ${port} Port\n`)})