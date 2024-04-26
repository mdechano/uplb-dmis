const { Dorm } = require('../models/index').models;

// create a new Dorm
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Dorm
        const newDorm = new Dorm(object);
        newDorm.save((err, dorm) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created dorm
            else {
                resolve(dorm); 
            }
        });
    });
} 

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Dorm.findOne(query, (err, dorm) => {
            if (err) { reject(err); }
            resolve(dorm);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Dorm.find(query, (err, dorm) => {
            if (err) { reject(err); }
            resolve(dorm);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Dorm.find((err, dorm) => {
            if(err) {reject(err); }
            resolve(dorm)
        })
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Dorm.findOne({ _id: object.id }, (err, dorm) => {
            if (err) { reject(err); }
            dorm.dorm_name = object.dorm_name,
            dorm.dorm_manager_id = object.dorm_manager_id,
            dorm.dorm_manager_name = object.dorm_manager_name,
            dorm.dorm_manager_email = object.dorm_manager_email,
            dorm.dorm_manager_contact_number = object.dorm_manager_contact_number,
            dorm.dorm_attendant_id = object.dorm_attendant_id,
            dorm.dorm_attendant_name = object.dorm_attendant_name,
            dorm.dorm_attendant_email = object.dorm_attendant_email,
            dorm.dorm_attendant_contact_number = object.dorm_attendant_contact_number,
            dorm.office_hours_start = object.office_hours_start,
            dorm.office_hours_end = object.office_hours_end,
            dorm.late_permit_start = object.late_permit_start,
            dorm.late_permit_end = object.late_permit_end,
            dorm.overnight_permit_start = object.overnight_permit_start,
            dorm.overnight_permit_end = object.overnight_permit_end,
            dorm.stayover_permit_start = object.stayover_permit_start,
            dorm.stayover_permit_end = object.stayover_permit_end
            
            dorm.save((err, dorm) => {
                if(err) { reject(err); }
                resolve(dorm);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Dorm.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}