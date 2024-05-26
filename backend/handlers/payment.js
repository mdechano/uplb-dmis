const { Payment } = require('../models/index').models;

exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new payment
        const payment = new Payment(object)
        payment.save((err, payment) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly uploaded file
            else {
                resolve(payment); 
            }
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        Payment.find((err, payment) => {
            if (err) { reject(err); }
            resolve(payment);
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        Payment.findOne(query, (err, payment) => {
            if (err) { reject(err); }
            resolve(payment);
        });
    });
}

exports.edit = (object) => {
    return new Promise((resolve, reject) => {
        // findone then edit
        Payment.findOne({ _id: object.id }, (err, payment) => {
            if (err) { reject(err); }
            payment.term = object.term,
            payment.period_covered = object.period_covered,
            payment.or_number = object.or_number,
            payment.dorm_fee = object.dorm_fee,
            payment.appliances_fee = object.appliances_fee,
            payment.date_paid = object.date_paid,
            payment.resident_id = object.resident_id,
            payment.committed_by = object.committed_by
            
            payment.save((err, payment) => {
                if(err) { reject(err); }
                resolve(payment);
            });
        });
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        Payment.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
}
