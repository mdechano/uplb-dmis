const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
		email: {type: String, required: [true, "No email provided"]},
		first_name: {type: String, required: true},
		last_name: {type: String, required: true},
		picture: {type: String},
        role: {type: String, enum: ['dorm manager', 'dorm assistant', 'student'], default: 'student'}
	}
);

module.exports = mongoose.model("User", UserSchema);