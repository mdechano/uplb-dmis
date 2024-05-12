const { User } = require('../models/index').models;

exports.create = (object) => {
    // asynchronous
    return new Promise((resolve,reject) => {
        // create and save new User model
        const newUser = new User(object);
        newUser.save((err, user) => {
            // failed: return error
            if(err) { reject(err); }
            // success: return newly created user
            else {
                resolve(user); 
            }
        });
    });
}

exports.getOne = (query, next) => {
    return new Promise((resolve, reject) => {
        User.findOne(query, (err, user) => {
            if (err) { reject(err); }
            resolve(user);
        });
    });
}

exports.editRoleandDorm = (object) => {
    return new Promise((resolve, reject) => {
        // findone then edit
        User.findOne({ email: object.email }, (err, user) => {
            if (err) { reject(err); }
            user.role = object.role
            user.dorm = object.dorm
            user.save((err, user) => {
                if(err) { reject(err); }
                resolve(user);
            });
        });
    });
}

exports.editCompletedProfile = (object) => {
    return new Promise((resolve, reject) => {
        // findone then edit
        User.findOne({ email: object.email }, (err, user) => {
            if (err) { reject(err); }
            user.completed_profile = object.completed_profile
            user.profile_id = object.profile_id
            user.save((err, user) => {
                if(err) { reject(err); }
                resolve(user);
            });
        });
    });
}

exports.editResidentRole = (object) => {
    return new Promise((resolve, reject) => {
        // findone then edit
        User.findOne({ _id: object.id }, (err, user) => {
            if (err) { reject(err); }
            user.email = object.email,
            user.first_name = object.first_name,
            user.last_name = object.last_name,
            user.picture = object.picture,
            user.role = object.role,
            user.dorm = object.dorm,
            user.completed_profile = object.completed_profile,
            user.profile_id = user.profile_id
            
            user.save((err, user) => {
                if(err) { reject(err); }
                resolve(user);
            });
        });
    });
}

exports.getAll = () => {
    return new Promise((resolve, reject) => {
        User.find((err,user) => {
            if(err) {reject(err); }
            resolve(user)
        })
    });
}

exports.delete = (query) => {
    return new Promise((resolve, reject) => {
        // deletemany returns an object w/ number of deleted docs if the operation is successful
        User.deleteMany(query, (err, result) => {
            if(err) { reject(err); }
            else { resolve(result); }
        })
    })
    
}