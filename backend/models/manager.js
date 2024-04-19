const mongoose = require("mongoose");
const utils = require('./utils')

const ManagerSchema = new mongoose.Schema(
    {
        user_id: {type: String, required: true},
        role: {type: String, required: true},
        dorm: {type: String, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        middle_name: {type: String, required: false},
        suffix: {type: String, required: false},
        sex: {type: String, required: true},
        birthday: {type: Date, required: true},
        contact_number: {type: String, required: true},
        email: {type: String, required: true},
        home_address: {type: String, required: true},
        picture_id: {type: String}
    }
)
 
ManagerSchema.pre("save", function(next){
    const manager = this;

    manager.first_name = utils.toTitleCase(manager.first_name);
    manager.last_name = utils.toTitleCase(manager.last_name);
    manager.middle_name = utils.toTitleCase(manager.middle_name);
    return next();
});

module.exports = mongoose.model("DormManager", ManagerSchema);