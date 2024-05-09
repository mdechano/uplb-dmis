const User = require('../handlers/user');
const UserLog = require('../handlers/userlog');
const {jwtDecode} = require('jwt-decode');
const jwt = require('jsonwebtoken');
const utils = require('./utils');
require('dotenv').config()
const mongoose = require('mongoose');

exports.login = async (req, res) => {
    const userobject = jwtDecode(req.body.token);

    const newUser = {
        email: userobject.email,
        first_name: userobject.given_name,
        last_name: userobject.family_name,
        picture: userobject.picture,
        role: 'user',
        dorm: 'UP Dorm',
        completed_profile: false,
        profile_id: ""
    }

    // checking if user already in database and has correct role
    try{
        var existing = null
        existing = await User.getOne({email: newUser.email});
        if(!existing){
            if(userobject.hd && userobject.hd == 'up.edu.ph'){
                newUser.role = 'user'
                newUser.dorm ='UP Dorm'
                newUser.completed_profile = false
            }      
        }
        else{
            const tokenPayload = {
                _id: existing._id
            }
            const token = jwt.sign(tokenPayload, process.env.SECRET_ACCESS_TOKEN)
            const response = {
                success: true,
                token
            }
            await UserLog.create(existing, 'login', `user ${existing._id} logged in`)
            return res.status(200).cookie('authToken', token, {maxAge: 60 * 60 * 1000, httpOnly: true}).send(response)
        }
    }
    catch(err){
        console.log(`Unable to add user. Error: ${err}`);
        res.status(500).send({ message: "Error adding new user" });
        return;
    }
    // creating user
    try {
        
        const user = await User.create(newUser);
        const tokenPayload = {
            _id: user._id
        }
        const token = jwt.sign(tokenPayload, process.env.SECRET_ACCESS_TOKEN)
            const response = {
                success: true,
                token
            }
            await UserLog.create(user, 'login', `user ${user._id} logged in`)
            return res.status(200).cookie('authToken', token, {maxAge: 15 * 60 * 1000, httpOnly: true}).send(response)
    }
    catch(err) {
        console.log(`Unable to add new user. Error: ${err}`);
        res.status(500).send({ message: "Error adding new user" })
    }

}

exports.checkifloggedin = async (req, res) => {

    //no authentication cookie sent
    if(!req.cookies || !req.cookies.authToken){
        console.log('Unauthorized access')
        return res.status(200).send({message:'Unauthorized access', status: false})
    }

    //a token is sent, validating token..
    let tokenDetails = await utils.verifyToken(req);


    if(!tokenDetails.status){
      return res.status(tokenDetails.code).send({message: tokenDetails.message, status: false})
      
    }

    //if success, send first name, last name, and email
    const user = tokenDetails.user
    // console.log(user);
    let {_id, email, first_name, last_name, picture, role, dorm, completed_profile, profile_id} = user

    return res.status(tokenDetails.code).send({User: {_id, email, first_name, last_name, picture, role, dorm, completed_profile, profile_id}, status: true})
    
}

exports.changeRoleandDorm = async(req,res) => {

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    if(token.user.role == 'user'){
        const email = req.body.email
        const newRole = req.body.role
        const newDorm = req.body.dorm
        try{
            const existing = await User.getOne({email: email});
            if(existing){
                const user = {
                    email: existing.email,
                    first_name: existing.first_name,
                    last_name: existing.last_name,
                    picture: existing.picture,
                    role: newRole,
                    dorm: newDorm,
                    completed_profile: existing.completed_profile
                }
                const edit = await User.editRoleandDorm(user)
                console.log(`User role and dorm changed: ${edit}`)
                return res.status(200).send({ message: 'User role and dorm updated' })
            }
        }
        catch(err){
            console.log(err)
            return res.status(500).send({ message: `Error changing user's role and dorm` })
        }
    }
    else{
        console.log("Unauthorized Access")
        return res.status(401).send({message: "Unauthorized access"});
    }
}

exports.changeResidentRole = async(req, res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    if(token.user.role == 'dorm manager'){
        // const body = req.body;
        const newRole = req.body.role
        const user_id = req.params.id
        console.log(`user id: `+user_id) // /.../:id -> value

        try{
            mongoose.Types.ObjectId(user_id)
        }
        catch (err) {
            console.log('Invalid id')
            return res.status(400).send({ message: 'Invalid id' })
        }

        try{
            const existing = await User.getOne({_id: user_id});
            if(existing){
                const user = {
                    email: existing.email,
                    first_name: existing.first_name,
                    last_name: existing.last_name,
                    picture: existing.picture,
                    role: newRole,
                    dorm: existing.dorm,
                    completed_profile: existing.completed_profile
                }
                const edit = await User.editResidentRole(user)
                console.log(`User role changed: ${edit}`)
                return res.status(200).send({ message: 'User role updated' })
            }
        }
        catch(err){
            console.log(err)
            return res.status(500).send({ message: `Error changing user's role` })
        }

    } else{
        console.log("Unauthorized Access")
        return res.status(401).send({message: "Unauthorized access"});
    }
}

exports.changeCompletedProfile = async(req,res) => {
    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    console.log(token.user.role);

        const email = req.body.email
        const newCompletedProfile = req.body.completed_profile
        const newProfileID = req.body.profile_id
        try{
            const existing = await User.getOne({email: email});
            if(existing){
                const user = {
                    email: existing.email,
                    first_name: existing.first_name,
                    last_name: existing.last_name,
                    picture: existing.picture,
                    role: existing.role,
                    dorm: existing.dorm,
                    completed_profile: newCompletedProfile,
                    profile_id: newProfileID
                }
                const edit = await User.editCompletedProfile(user)
                console.log(`User completed_profile changed: ${edit}`)
                return res.status(200).send({ message: 'User completed_profile updated' })
            }
        }
        catch(err){
            console.log(err)
            return res.status(500).send({ message: `Error changing user's completed_profile` })
        }
}

exports.findAll = async (req, res) => {

    if (!req.cookies || !req.cookies.authToken) {
        res.status(401).send({message: "Unauthorized access"});
        return;
      }
      
      // validate token
    const token = await utils.verifyToken(req);
    
      // error validating token
    if(!token.status){
        res.status(token.code).send({ message: token.message });
        return;
    }

    let user;
    try{
        user = await User.getAll()
        if(!user){
            console.log("User database is empty")
            return res.status(404).send({message: `No user in database`})
        }
        else{
            return res.status(200).send(user)
        }
    }
    catch(err){
        console.log(`Error searching for user in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for user'})
    }
}

exports.logout = (req, res) => {
    console.log("logged out")
    res.clearCookie('authToken').send({isAuthenticated: false})
  }