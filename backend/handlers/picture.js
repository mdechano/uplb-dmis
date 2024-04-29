const { Picture } = require('../models/index').models;

exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Picture
        const picture = new Picture(object)
        picture.save((err, picture) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly uploaded file
            else {
                resolve(picture); 
            }
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Picture.findOne(query, (err, imgdata) => {
            if (err) { reject(err); }
            resolve(imgdata);
        });
    });
}