const mongoose = require('mongoose');

const tabSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		uppercase: true
	},
	check: {
		type: Array,
		required: true,
		default: []
	},
	open: {
		type: Boolean,
		required: true,
		default: false
	}
});

const Tab = mongoose.model('Tab', tabSchema);
module.exports = Tab;
