const express = require('express');
const Item = require('../models/items');
const router = express.Router();

router.post('/items', async (req, res) => {
	try {
		let { name, price, type } = req.body;
		if (!name || !type) throw new Error('Invalid data!');
		const item = new Item({ name, price, type });
		await item.save();
		res.status(201).send({ result: true, item });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'Something went wrong...' });
	}
});

router.get('/items', async (req, res) => {
	try {
		const { by, key } = req.query;
		// if (!by || !key) throw new Error('Invalid data!');
		if (by == 'id') {
			const item = await Item.findById(key);
			res.send({ result: true, item });
		} else if (by == 'type') {
			const items = await Item.find({ type: key });
			res.send({ result: true, items });
		} else {
			const items = await Item.find({});
			res.send({ result: true, items });
		}
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'something went wrong...' });
	}
});

module.exports = router;
