const mongoose = require('mongoose');

const addonSchema = new mongoose.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true,
		uppercase: true
	},
	price: {
		type: Number,
		required: true
	}
});

const AddOn = mongoose.model('AddOn', addonSchema);
module.exports = AddOn;
