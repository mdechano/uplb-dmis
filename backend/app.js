const express = require("express");
const cookieParser = require("cookie-parser");
const Router = require('./router');
require("dotenv").config();

// initialize express app
exports.start = () => {
    const App = express();
    // App.use(formData.parse());
    App.use(express.urlencoded({ extended: true }));
    App.use(express.json());
    App.use(cookieParser());

    App.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE")
        res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type")
        res.setHeader("Access-Control-Allow-Credentials","true")
        next()
    })
    // define route
    App.use('/', Router);

    
    // start server
    App.listen(3001, (err) => {
    if (err) { console.log(err); }
    else { console.log("Server listening at port 3001"); }
    });
}