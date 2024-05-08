const mongoose = require("mongoose")

const PictureSchema = new mongoose.Schema({
    base64_string: {type: String, required: true}
})

module.exports = mongoose.model("Picture", PictureSchema);