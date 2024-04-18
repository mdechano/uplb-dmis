const mongoose = require("mongoose");
const utils = require('./utils')

const DormSchema = new mongoose.Schema(
    {
        dorm_name: {type: String},
        dorm_details: {type: String},
        dorm_manager_id: {type: String},
        dorm_manager_name: {type: String},
        dorm_manager_email: {type: String},
        dorm_manager_contact_number: {type: String},
        dorm_attendant_name: {type: String},
        dorm_attendant_email: {type: String},
        dorm_attendant_contact_number: {type: String}
    }
)

module.exports = mongoose.model("Dorm", DormSchema);