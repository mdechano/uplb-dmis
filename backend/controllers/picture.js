const Picture = require('../handlers/picture');
const mongoose = require('mongoose');
const UserLog = require('../handlers/userlog');
const utils = require('./utils');
const Delete = require('../handlers/deleted');

exports.uploadImage = async (req, res) => {

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

    const newPicture = {
        base64_string: body.base64_string
        // profile_id: body.profile_id
    }

    try{   
        
        const picture = await Picture.create(newPicture);
        await UserLog.create(token.user, 'create', `picture ${picture._id}`)
        console.log(`New picture: \n ${picture}`);
        return res.status(201).send({success: true, message: "Successfully added picture.", id: picture.id})

    }
    catch(err){
        console.log(`Unable to upload new picture. Error: ${err}`);
        return res.status(500).send({ message: "Error uploading new picture." })
    }
}

exports.renderImages = async (req,res) => {

    // if (!req.cookies || !req.cookies.authToken) {
    //     res.status(401).send({message: "Unauthorized access"});
    //     return;
    //   }
      
    //   // validate token
    // const token = await utils.verifyToken(req);
    
    //   // error validating token
    // if(!token.status){
    //     res.status(token.code).send({ message: token.message });
    //     return;
    // }

    let picture;

    try{
        picture = await Picture.getAll()
        if (!picture) {
            console.log("Picture database is empty.")
            return res.status(404).send({message: `No picture in database`})
        } else {
            return res.status(200).send(picture)
        }
        
    }
    catch(err){
        console.log(`Error searching for picture in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for pictures'})
    }
}

exports.renderImage = async (req,res) => {
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
    console.log(`picture id: ${req.params.id}`)

    const picture = {
        id: req.params.id,
        base64_string: body.base64_string
        // profile_id: body.profile_id
    }

    try{
        mongoose.Types.ObjectId(picture.id)
    }
    catch (err) {
        console.log('Invalid id')
        return res.status(400).send({ message: 'Invalid id' })
    }

    var existing = null
    try{
        existing = await Picture.getOne({_id: picture.id});
        if (!existing) {
            console.log("Picture not found")
            return res.status(404).send({ message: 'Picture not found' });
        }
    }
    catch(err){
        console.log(`Error looking for picture in DB. Error: ${err}`);
        return res.status(500).send({ message: 'Error searching for picture in database' })
    }

    try{
        const edit = await Picture.edit(picture)
        await UserLog.create(token.user, 'edit', `picture ${edit._id}`)
        console.log(`Edited picture ${edit}`)
        return res.status(200).send({ message: 'Picture successfully edited' })
    }
    catch{
        console.log(`Unable to edit picture. Error: ${err}`);
        return res.status(500).send({ message: 'Error editing picture' })
    }

}