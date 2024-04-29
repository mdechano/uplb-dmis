const { Buffer } = require('node:buffer');
const crypto = require('crypto');
const fs = require('fs');
const Picture = require('../handlers/picture');
const decode = require('node-base64-image').decode;

exports.uploadImage = async (req, res) => {
    try{   
        const file = req.files.image
        if(!file){
            return res.status(404).send({message: "Please upload image"})
        }
    
        const img = fs.readFileSync(file.path)
        var encode_img = img.toString('base64')
        const buffer = Buffer.from(encode_img, 'base64')
        const randId = crypto.randomBytes(16).toString('hex')
    
        var final_img = {
            picture_id: randId,
            contentType: file.headers['content-type'],
            path: file.path,
            image: buffer
        }
        const cType = final_img.contentType
        const extension = cType.slice(6,cType.length)
    
        Picture.create(final_img)
        //console.log(randId)
        return res.status(200).send({success: true, id: `${randId}.${extension}`})
    }
    catch(err){
        console.log(err)
        return res.status(500).send({message: "Server side error"})
    }
}

exports.renderImage = async (req,res) => {
    const picture_id = req.params.id
    try{
        const pictures = await Picture.getOne({picture_id: picture_id})
        if(!pictures){
            console.log("pictrue not found")
            return res.status(404).send({message: `pictures not found`})
        }
        else{
            //console.log(uploads)
            const imagedata = pictures.image
            const cType = pictures.contentType
            const extension = cType.slice(6,cType.length)
            const base64 = imagedata.toString('base64')
            await decode(base64, {fname: `../frontend/src/components/pictures/${picture_id}`, ext: extension})
            return res.status(200).send({success: true})
        }
    }
    catch(err){
        console.log(`Error searching for picture in the DB ${err}` );
        return res.status(500).send({message: 'Error searching for pictures'})
    }
}