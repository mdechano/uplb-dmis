const mongoose = require ("mongoose");

const ReceiptSchema = new mongoose.Schema(
    {
        
    }
);

module.exports = mongoose.model("receipt", ReceiptSchema);