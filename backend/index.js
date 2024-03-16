
const mongoose = require("mongoose");
const App = require('./app.js');

mongoose.connect(
    "mongodb+srv://mdechano:mdechanoatlas@uplbdmiscluster.5xxnerf.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true },
    async (err) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Successfully connected to Mongo DB");
            
            try {
                App.start();
            } catch (err) {
                console.log(`Error setting up Database: Error: ${err}`);
            }
        }
    }
);

