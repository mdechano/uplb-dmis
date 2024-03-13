const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { schema } = require("./models/user");

// get user model registeed in Mongoose

const User = mongoose.model("User");

exports.signUp = (req, res) => {
    const newuser = new User({
        email: req.body.email,
        password: req.body.password,
        resident_hall: req.body.resident_hall,
        role: 'student'
    });

    console.log("New user: ");
    console.log(newuser);

    newuser.save((err) => {
        if (err) {
            return res.send({success:false});
        } else {
            return res.send({success:true});
        }
    })
}

exports.login = (req, res) => {

}

exports.checkIfLoggedIn = (req, res) => {

}