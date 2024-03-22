const mongoose = require("mongoose");
const utils = require('./utils')

const ResidentSchema = new mongoose.Schema(
    {
		first_name: {type: String, required: true},
        last_name: {type: String, required: true},
        middle_name: {type: String, required: false},
        suffix: {type: String, required: false},
        sex: {type: String, required: true},
        student_no: {type: String, required: true},
        civil_status: {type: String, required: true},
        birthday: {type: Date, required: true},
        contact_number: {type: String, required: true},
        email: {type: String, required: true},
        home_address: {type: String, required: true},
        region: {type: String, required: true},
        college: {type: String, required: true},
        degree_program: {type: String, required: true},
        last_school_attended: {type: String},
        classification: {type: String},
        honors_received: {type: String},
        talents: {type: String},
        hobbies: {type: String},
        organizations: {type: String},
        ailments: {type: String},
        medications: {type: String},
        scholarships: {type: String},
        monthly_stipend: {type: String},
        parents_status: {type: String},
        father_detials: {type: Object},
        mother_details: {type: Object},
        number_of_brothers: {type: String},
        number_of_sisters: {type: String},
        birth_order: {type: String},
        check_in_out_details: {type: Object},
        appliances: {type: Object},
        appliances_information: {type: Object},
        emergency_details: {type: Object},
        payment_details: {type: Object},
        violation_details: {type: Object},
        picture_id: {type: String},
        dorm_id: {type: String, required: true}
    }
);

ResidentSchema.pre("save", function(next){
    const resident = this;

    resident.first_name = utils.toTitleCase(resident.first_name);
    resident.last_name = utils.toTitleCase(resident.last_name);
    resident.middle_name = utils.toTitleCase(resident.middle_name);
    return next();
});

module.exports = mongoose.model("Resident", ResidentSchema);