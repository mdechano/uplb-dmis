const User = require('../handlers/user');
const jwt = require("jsonwebtoken");
// const UserLogs = require('../handlers/userlog');
// const Deleted = require('../handlers/deleted');
require('dotenv').config()

exports.verifyToken = (req) => {
    
    return jwt.verify(
        req.cookies.authToken,
            "THIS_IS_A_SECRET_STRING",
            async (err, tokenPayload) => {
            if (err) {
                // Scenario 2: FAIL - Error validating token
                return res.send({ isLoggedIn: false , status:false});
            }
        
            const userId = tokenPayload._id;

            let user = null;

            try {
                user = await User.getOne({_id:userId})

                if(!user) {
                    // Scenario 3: FAIL - Failed to find user based on id inside token payload
                return { isLoggedIn: false, status: false, message: `User not known.`, code:401 };
                } else {
                    // Scenario 4: SUCCESS - token and user id are valid
                    console.log("User is currently logged in.");
                    return { isLoggedIn: true, status: true, code: 200, user };
                }
            } catch (err) {
                console.log("Error validating token");
                return {status: false, message: "Error validating token", code:500}
            }
        
            
            }
    );
}