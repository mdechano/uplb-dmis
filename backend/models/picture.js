const mongoose = require("mongoose")

const PictureSchema = new mongoose.Schema({
    base64_string: {type: String, required: true},
    profile_id: {type: String}
})

module.exports = mongoose.model("Picture", PictureSchema);