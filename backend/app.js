// dependencies
const express = require('express')
const cookieParser = require("cookie-parser");
const myParser = require("body-parser");
const Router = require('./router');
const formData = require('express-form-data');
const path = require('path')
require("dotenv").config();

// initialize express app
exports.start = () => {
    const App = express();
    App.use(formData.parse());
    App.use(cookieParser());
    App.use(express.json({limit: '200mb'}));
    App.use(express.urlencoded({limit: '200mb',  extended: true }));
    // App.use(myParser.json({limit: '200mb'}));
    // App.use(myParser.urlencoded({limit: '200mb', extended: true}));
    // App.use(myParser.text({limit: '200mb'}));
    

    App.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type")
        res.setHeader("Access-Control-Allow-Credentials","true")
        next()
    })
    // define route
    App.use('/', Router);

    // start server at port

    App.listen(process.env.PORT || 3001, '0.0.0.0', (err) => {
        if (err) { console.log(err) }
        else {console.log(`Server started at port ${process.env.PORT}`)}
    })
}