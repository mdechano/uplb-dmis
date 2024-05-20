const mongoose = require ("mongoose");

const ReceiptSchema = new mongoose.Schema(
    {
        date_posted: {type: String},
        academic_year: {type: String, required: true},
        semester: {type: String, required: true},
        months_covered: {type: String, required: true},
        resident_id: {type: String, required: true}, // id of resident who posted
        pdf_url: {type: String, required: true}
    }
);

module.exports = mongoose.model("receipt", ReceiptSchema);