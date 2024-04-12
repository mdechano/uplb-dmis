const { Manager } = require('../models/index').models;

// create a new Manager
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Manager
        const newManager = new Manager(object);
        newManager.save((err, manager) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created manager
            else {
                resolve(manager); 
            }
        });
    });
} 

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Manager.findOne(query, (err, manager) => {
            if (err) { reject(err); }
            resolve(manager);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Manager.find(query, (err, manager) => {
            if (err) { reject(err); }
            resolve(manager);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Manager.find((err,manager) => {
            if(err) {reject(err); }
            resolve(manager)
        })
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Manager.findOne({ _id: object.id }, (err, manager) => {
            if (err) { reject(err); }
            manager.user_id = object.user_id,
            manager.first_name = object.first_name,
            manager.last_name = object.last_name,
            manager.middle_name = object.middle_name,
            manager.suffix = object.suffix,
            manager.sex = object.sex,
            manager.student_no = object.student_no,
            manager.civil_status = object.civil_status,
            manager.birthday = object.birthday,
            manager.contact_number = object.contact_number,
            manager.email = object.email,
            manager.home_address = object.home_address,
            // manager.picture_id = object.picture_id,
            // manager.dorm_id = object.dorm_id
            
            manager.save((err, manager) => {
                if(err) { reject(err); }
                resolve(manager);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Manager.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}