const mongoose = require("mongoose");
const utils = require('./utils')

const DormSchema = new mongoose.Schema(
    {
        dorm_name: {type: String},
        dorm_manager_id: {type: String},
        residents: {type: Array, required: false}
    }
)

module.exports = mongoose.model("Dorm", DormSchema);