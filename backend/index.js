
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

// // register User model with Mongoose
// require("./models/user");

// // initialize server
// const app = express();
// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use(cookieParser());

// // allow CORS
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Access-Control-Allow-Methods,Origin,Accept,Content-Type");
//     res.setHeader("Access-Control-Allow-Credentials","true");
//     next();
// });

// // setup routes
// require("./routes")(app);

// // start server
// app.listen(3001, (err) => {
//   if (err) { console.log(err); }
//   else { console.log("Server listening at port 3001"); }
// });