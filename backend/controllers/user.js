const User = require('../handlers/user');
const UserLog = require('../handlers/userlog');
const Delete = require('../handlers/deleted');
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
            return res.status(200).cookie('authToken', token, {maxAge: 60 * 60 * 1000, httpOnly: true, sameSite: 'None', secure: true}).send(response)
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
    
        const body = req.body;
        console.log(`resident user id: ${req.params.id}`) // /.../:id -> value

        const user = {
            id: req.params.id,
            email: body.email,
            first_name: body.first_name,
            last_name: body.last_name,
            picture: body.picture,
            role: body.role,
            dorm: body.dorm,
            completed_profile: body.completed_profile,
            profile_id: body.profile_id
        }
        
        try{
            mongoose.Types.ObjectId(user.id)
        }
        catch (err) {
            console.log('Invalid id')
            return res.status(400).send({ message: 'Invalid id' })
        }

        var existing = null
        try{
            existing = await User.getOne({_id: user.id});
            if(!existing){
                console.log("User not found")
                return res.status(404).send({ message: 'User not found' });
            }
        }
        catch(err){
            console.log(`Error looking for manager in DB. Error: ${err}`);
            return res.status(500).send({ message: 'Error searching for manager in database' })
        }

        try{
            const edit = await User.editResidentRole(user)
            await UserLog.create(token.user, 'edit', `user ${edit._id}`)
            console.log(`Edited user ${edit}`)
            return res.status(200).send({ message: 'User successfully edited' })
        }
        catch(err){
            console.log(`Unable to edit user. Error: ${err}`);
            return res.status(500).send({ message: 'Error editing user' })
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
    return res.status(200).redirect('/');
  }

exports.deleteUser = async (req, res) => {
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


    const idList = req.body.ids;
    let deleted = 0, failed = 0;
    let invalidId = new Array;
    let validId = new Array;

    try{
        var reqLength = idList.length;
    }
    catch(err){
    console.log('Invalid property');
    res.status(501).send({ message: 'Invalid property'});
    }

    try{
        for(let i = 0; i < reqLength; i++){
            try{
                mongoose.Types.ObjectId(idList[i]);
            }
            catch(err){
                console.log('Wrong format:', idList[i]);
                invalidId[failed] = idList[i];
                failed++;
                continue;
            }
        
    
            let user = null;
            try{
                user = await User.getOne({_id: idList[i]});  //call to handler here
                //console.log(manager);
                if(user){
                    await Delete.create("user", user);
                    await UserLog.create(token.user, 'delete', `user ${user._id}`)
                    await User.delete({_id: idList[i]});
                    console.log('Successfully deleted user with id:', idList[i]);
                    validId[deleted] = idList[i];
                    deleted++;
                }
                else{
                    console.log('Invalid user id:', idList[i]);
                    invalidId[failed] = idList[i];
                    failed++;
                }
            }catch(err){
                console.log(`Error searching for user in the DB ${err}` );
                return res.status(500).send({message: 'Error searching for user'});
            }
        }

        if(reqLength == failed){
            res.status(404).send({body: invalidId, message: "ids not found" })
            return;
        }else if(failed == 0){
            res.status(200).send({message: `Successfully deleted ${deleted} user`});
            return;
        }else{
            res.status(201).send({body: invalidId ,message: `Successfully deleted ${deleted} user/s but failed to delete ${failed} user/s`});
            return;
        }
        
    }catch(err){
        console.log(`Error deleting users ${err}`);
        res.status(500).send({ message: 'Error deleting users'});
        return;
    }
}