const User = require('../handlers/user');
const jwt_decode = require('jwt-decode');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
require('dotenv').config()

exports.login = async (req, res) => {


    const email = req.body.email.trim();
    const password = req.body.password;

    User.getOne({email}, (err, user) => {

        // check if email exists
        if (err || !user) {
            console.log("User does not exist!");
            return res.send({success:false});
        }

        // check if password is correct
        user.comparePassword(password, (err, isMatch) => {
            if (err || !isMatch) {
                // Scenario 2: Fail - wrong password
                console.log("Wrong password!");
                return res.send({success:false});
            }

            console.log("Successfully logged in!");

            // Scenario 3: SUCCESS - time to create a token
            const tokenPayload = {
                _id: user._id
            }

            const token = jwt.sign(tokenPayload, "THIS_IS_A_SECRET_STRING");

            //return the token to the client
            return res.send({success:true, token, email: user.email});
        })
    })
}

exports.checkifloggedin = async (req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        // scenario 1: FAIL - no cookies / no authToken cookie sent
        console.log("User is not logged in.");
        return res.send({ isLoggedIn: false, status: false });
        // console.log("User is currently logged in.");
    }

    // Token is present. Validate token
    return jwt.verify(
        req.cookies.authToken,
        "THIS_IS_A_SECRET_STRING",
        (err, tokenPayload) => {
          if (err) {
            // Scenario 2: FAIL - Error validating token
            return res.send({ isLoggedIn: false });
          }
    
          const userId = tokenPayload._id;
    
          // check if user exists
          return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
              // Scenario 3: FAIL - Failed to find user based on id inside token payload
              return res.send({ isLoggedIn: false, status: false, code:401 });
            }
    
            // Scenario 4: SUCCESS - token and user id are valid
            console.log("User is currently logged in.");
            return res.send({ isLoggedIn: true, status: true, code: 200, user });
          });
        });

    // // a token is send, validating token...
    // let tokenDetails = await utils.verifyToken(req);

    // if(!tokenDetails.status){
    //     return res.status(tokenDetails.code).send({message: tokenDetails.message, status: false})
        
    //   }

    // // if success, send email, password of user
    // const user = tokenDetails.user;
    // let {_id, email, password} = user

    // return res.status(tokenDetails.code).send({User: {_id, email, password}, status: true, isLoggedIn: true})
}