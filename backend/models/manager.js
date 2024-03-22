const mongoose = require("mongoose");
const utils = require('./utils')

const ManagerSchema = new mongoose.Schema(
    {
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        middle_name: {type: String, required: false},
        suffix: {type: String, required: false},
        birthday: {type: Date, required: true},
        sex: {type: String, required: true},
        contact_number: {type: String, required: true},
        email: {type: String, required: true},
        address: {type: String, required: true},
        picture_id: {type: String},
        dorm_id: {type: String}
    }
)

ManagerSchema.pre("save", function(next){
    const manager = this;

    manager.first_name = utils.toTitleCase(manager.first_name);
    manager.last_name = utils.toTitleCase(manager.last_name);
    manager.middle_name = utils.toTitleCase(manager.middle_name);
    return next();
});

module.exports = mongoose.model("Dorm Manager", ManagerSchema);