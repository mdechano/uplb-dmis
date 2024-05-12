const mongoose = require ("mongoose");

const ViolationSchema = new mongoose.Schema(
    {
        date: {type: Date},
        time: {type: String},
        nature: {type: String},
        remarks: {type: String},
        resident_id: {type: String}, // id of resident with violation
        committed_by: {type: String} // id of mgr/attendant who added te violation
    }
);

module.exports = mongoose.model("Violation", ViolationSchema);