const express = require('express');
const AddOn = require('../models/addon');

const router = express.Router();

router.post('/addons', async (req, res) => {
	try {
		const { name, price, type } = req.body;
		if (!name || price < 0 || !type) throw new Error('Invalid data');
		const addon = new AddOn({ name, price, type });
		await addon.save();
		res.status(201).send({ result: true, addon });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false });
	}
});

router.get('/addons', async (req, res) => {
	try {
		const addons = await AddOn.find({});
		res.send({ result: true, addons });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false });
	}
});

module.exports = router;
