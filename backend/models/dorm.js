const mongoose = require("mongoose");
const utils = require('./utils')

const DormSchema = new mongoose.Schema(
    {
        dorm_name: {type: String},
        dorm_manager: {type: String},
        contact_number: {type: String}
    }
)

module.exports = mongoose.model("Dorm", DormSchema);