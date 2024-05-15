const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        term: {type: String},
        period_covered: {type: String},
        or_number: {type: String},
        dorm_fee: {type: Number},
        appliances_fee: {type: Number},
        date_paid: {type: String},
        resident_id: {type: String}, // id of resident with violation
        committed_by: {type: String} // id of mgr/attendant who added te violation
    }
);

module.exports = mongoose.model("Payment", PaymentSchema);