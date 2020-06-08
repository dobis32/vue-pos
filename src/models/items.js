const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		uppercase: true
	},
	price: {
		type: Number,
		default: 0.0
	},
	type: {
		type: String,
		required: true,
		uppercase: true
	}
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
