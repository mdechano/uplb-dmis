const { Attendant } = require('../models/index').models;

// create a new Attendant
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Attendant
        const newAttendant = new Attendant(object);
        newAttendant.save((err, attendant) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created attendant
            else {
                resolve(attendant); 
            }
        });
    });
} 

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Attendant.findOne(query, (err, attendant) => {
            if (err) { reject(err); }
            resolve(attendant);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Attendant.find(query, (err, attendant) => {
            if (err) { reject(err); }
            resolve(attendant);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Attendant.find((err, attendant) => {
            if(err) {reject(err); }
            resolve(attendant)
        })
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Attendant.findOne({ _id: object.id }, (err, attendant) => {
            if (err) { reject(err); }
            attendant.user_id = object.user_id,
            attendant.role = object.role,
            attendant.dorm = object.dorm,
            attendant.first_name = object.first_name,
            attendant.last_name = object.last_name,
            attendant.middle_name = object.middle_name,
            attendant.suffix = object.suffix,
            attendant.sex = object.sex,
            attendant.student_no = object.student_no,
            attendant.civil_status = object.civil_status,
            attendant.birthday = object.birthday,
            attendant.contact_number = object.contact_number,
            attendant.email = object.email,
            attendant.home_address = object.home_address,
            attendant.picture_url = object.picture_url
            
            attendant.save((err, attendant) => {
                if(err) { reject(err); }
                resolve(attendant);
            });
        });
    });
}


exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Attendant.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}