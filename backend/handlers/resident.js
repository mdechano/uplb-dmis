const { Resident } = require('../models/index').models;

// create a new Resident
exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Resident
        const newResident = new Resident(object);
        newResident.save((err, resident) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created resident
            else {
                resolve(resident); 
            }
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Resident.findOne(query, (err, resident) => {
            if (err) { reject(err); }
            resolve(resident);
        });
    });
}

exports.getMany = (query, order, next) => {
    return new Promise((resolve, reject) => {
        Resident.find(query, (err, resident) => {
            if (err) { reject(err); }
            resolve(resident);
        })
        .sort(order)
    });
} 

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Resident.find((err,resident) => {
            if(err) {reject(err); }
            resolve(resident)
        })
    });
}

exports.edit = (object) =>{
    return new Promise((resolve, reject) => {
        // findone then edit
        Resident.findOne({ _id: object.id }, (err, resident) => {
            if (err) { reject(err); }
            resident.user_id = object.user_id,
            resident.role = object.role,
            resident.dorm = object.dorm,
            resident.first_name = object.first_name,
            resident.last_name = object.last_name,
            resident.middle_name = object.middle_name,
            resident.suffix = object.suffix,
            resident.sex = object.sex,
            resident.student_no = object.student_no,
            resident.civil_status = object.civil_status,
            resident.birthday = object.birthday,
            resident.contact_number = object.contact_number,
            resident.email = object.email,
            resident.home_address = object.home_address,
            resident.region = object.region,
            resident.college = object.college,
            resident.degree_program = object.degree_program,
            resident.last_school_attended = object.last_school_attended,
            resident.classification = object.classification,
            resident.honors_received = object.honors_received,
            resident.talents = object.talents,
            resident.hobbies = object.hobbies,
            resident.organizations = object.organizations,
            resident.ailments = object.ailments,
            resident.medications = object.medications,
            resident.scholarships = object.scholarships,
            resident.monthly_stipend = object.monthly_stipend
            resident.parents_status = object.parents_status,
            resident.father_detials = object.father_details,
            resident.mother_details = object.mother_details,
            resident.number_of_brothers = object.number_of_brothers,
            resident.number_of_sisters = object.number_of_sisters,
            resident.birth_order = object.birth_order,
            resident.check_in_out_details = object.check_in_out_details,
            resident.appliances = object.appliances,
            resident.appliances_information = object.appliances_information,
            resident.emergency_details = object.emergency_details,  
            // resident.slas = object.slas,
            // resident.payment_details = object.payment_details,
            // resident.violation_details = object.violation_details,
            resident.picture_id = object.picture_id,
            resident.dorm_id = object.dorm_id
            
            resident.save((err, resident) => {
                if(err) { reject(err); }
                resolve(resident);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Resident.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}