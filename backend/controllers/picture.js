const { Buffer } = require('node:buffer');
const crypto = require('crypto');
const fs = require('fs');
const Picture = require('../handlers/picture');
const decode = require('node-base64-image').decode;

exports.uploadImage = async (req, res) => {
    const {base64} = req.body;

    try{   
        
        await Picture.create( {base64_string: base64} );

        return res.status(200).send({success: true, status: "success"})

    }
    catch(err){
        console.log(err)
        return res.status(500).send({message: "Server side error"})
    }
}

exports.renderImage = async (req,res) => {
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