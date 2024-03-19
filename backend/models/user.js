const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
		email: {type: String, required: [true, "No email provided"]},
		first_name: {type: String, required: true},
		last_name: {type: String, required: true},
		picture: {type: String},
        role: {type: String, enum: ['dorm manager', 'dorm assistant', 'resident', 'user'], default: 'user'},
		dorm: {type: String, enum: [`Women's Residence Hall`,`Men's Residence Hall`, `International House Residence Hall`, `VetMed Residence Hall`, `Makiling Residence Hall`, `ATI-NTC Residence Hall`, `Forestry Residence Hall`, `New Forestry Residence Hall`, `New Dormitory Residence Hall`, `UP Dorm`], default: 'UP Dorm'}
	}
);

module.exports = mongoose.model("User", UserSchema);