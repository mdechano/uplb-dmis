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

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Picture.find((err, picture) => {
            if (err) { reject(err); }
            resolve(picture);
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Picture.findOne(query, (err, picture) => {
            if (err) { reject(err); }
            resolve(picture);
        });
    });
}

exports.edit = (object) => {
    return new Promise((resolve, reject) => {
        // findone then edit
        Picture.findOne({ _id: object.id }, (err, picture) => {
            if (err) { reject(err); }
            picture.base64_string = object.base64_string,
            picture.profile_id = object.profile_id
            
            picture.save((err, picture) => {
                if(err) { reject(err); }
                resolve(picture);
            });
        });
    });
}