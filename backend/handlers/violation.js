const { Violation } = require('../models/index').models;

exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new violation
        const violation = new Violation(object)
        violation.save((err, violation) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly uploaded file
            else {
                resolve(violation); 
            }
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Violation.find((err, violation) => {
            if (err) { reject(err); }
            resolve(violation);
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Violation.findOne(query, (err, violation) => {
            if (err) { reject(err); }
            resolve(violation);
        });
    });
}

exports.edit = (object) => {
    return new Promise((resolve, reject) => {
        // findone then edit
        Violation.findOne({ _id: object.id }, (err, violation) => {
            if (err) { reject(err); }
            violation.date = object.date,
            violation.time = object.time,
            violation.nature = object.nature,
            violation.remarks = object.remarks,
            violation.resident_id = object.resident_id,
            violation.committed_by = object.committed_by
            
            violation.save((err, violation) => {
                if(err) { reject(err); }
                resolve(violation);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Violation.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}
