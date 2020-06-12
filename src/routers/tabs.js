const express = require('express');
const Tab = require('../models/tab');

const router = express.Router();

router.post('/tabs', async (req, res) => {
	try {
		const name = req.body.name;
		if (!name) throw new Error('Invalid data received');
		const newTab = new Tab({ name });
		await newTab.save();
		res.status(201).send({ result: true, newTab });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'Something went wrong...' });
	}
});

router.get('/tabs', async (req, res) => {
	try {
		const id = req.query.id;
		let tabs;
		if (id) tabs = await Tab.findById(id);
		else tabs = await Tab.find({});
		console.log(tabs);
		res.send({ result: true, tabs });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'Something went wrong...' });
	}
});

router.patch('/tabs', async (req, res) => {
	try {
		const { tab, formattedCheck } = req.body;
		console.log('formatted check', formattedCheck);
		if (!tab || !formattedCheck) throw new Error('Invalid data!');
		const tabToPatch = await Tab.findById(tab);
		let updatedCheck = new Array();
		formattedCheck.forEach((item) => {
			let addons = new Array();
			item.addons.forEach((addon) => addons.push(addon));
			let updatedItem = { _id: item._id, addons };
			updatedCheck.push(updatedItem);
		});
		console.log('updated check', updatedCheck);
		tabToPatch.check = updatedCheck;
		await tabToPatch.save();
		const tabs = await Tab.find({});
		res.send({ result: true, tabs });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'Something went wrong...' });
	}
});

router.delete('/tabs', async (req, res) => {
	try {
		const { id } = req.query;
		if (!id) throw new Error('Invalid tab ID');
		await Tab.findByIdAndRemove(id);
		const tabs = await Tab.find({});
		res.send({ result: true, tabs });
	} catch (error) {
		console.log(error);
		res.send({ result: false });
	}
});

module.exports = router;
