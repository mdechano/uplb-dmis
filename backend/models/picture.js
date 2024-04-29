const mongoose = require("mongoose")

const PictureSchema = new mongoose.Schema({
    picture_id: {type: String, required: true},
    contentType: {type: String, required: true},
    path: {type: String, required: true},
    image: {type: Object, required: true},
    
})

module.exports = mongoose.model("Picture", PictureSchema);