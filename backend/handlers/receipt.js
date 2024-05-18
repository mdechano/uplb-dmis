const { Receipt } = require('../models/index').models;

exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new Receipt
        const receipt = new Receipt(object)
        receipt.save((err, receipt) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly uploaded file
            else {
                resolve(receipt); 
            }
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Receipt.find((err, receipt) => {
            if (err) { reject(err); }
            resolve(receipt);
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Receipt.findOne(query, (err, receipt) => {
            if (err) { reject(err); }
            resolve(receipt);
        });
    });
}

exports.edit = (object) => {
    return new Promise((resolve, reject) => {
        // findone then edit
        Receipt.findOne({ _id: object.id }, (err, receipt) => {
            if (err) { reject(err); }
            receipt.date_posted = object.date_posted,
            receipt.academic_year = object.academic_year,
            receipt.semester = object.semester,
            receipt.months_covered = object.months_covered,
            receipt.resident_id = object.resident_id, // id of resident who posted
            receipt.pdf_url = object.pdf_url
            
            receipt.save((err, receipt) => {
                if(err) { reject(err); }
                resolve(receipt);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Receipt.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}
