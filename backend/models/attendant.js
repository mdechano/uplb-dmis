const mongoose = require("mongoose");
const utils = require('./utils');

const AttendantSchema = new mongoose.Schema(
    {
        user_id: {type: String, required: true},
        role: {type: String, required: true},
        dorm: {type: String, required: true},
        first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        middle_name: {type: String, required: false},
        suffix: {type: String, required: false},
        sex: {type: String, required: true},
        birthday: {type: String, required: true},
        contact_number: {type: String, required: true},
        email: {type: String, required: true},
        home_address: {type: String, required: true},
        picture_url: {type: String}
    }
)

AttendantSchema.pre("save", function(next){
    const attendant = this;

    attendant.first_name = utils.toTitleCase(attendant.first_name);
    attendant.last_name = utils.toTitleCase(attendant.last_name);
    attendant.middle_name = utils.toTitleCase(attendant.middle_name);
    return next();
});

module.exports = mongoose.model("Attendant", AttendantSchema);