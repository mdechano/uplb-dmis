require("dotenv").config();
const mongoose = require("mongoose");
const App = require('./app.js');

mongoose.connect(
    process.env.DB,
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully connected to MongoDB");
            
            try {
                App.start();
            } catch (err) {
                console.log(`Error setting up Database: Error: ${err}`);
            }
        }
    }
);

