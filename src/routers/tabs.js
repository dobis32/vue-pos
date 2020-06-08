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
		res.send({ result: true, tabs });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'Something went wrong...' });
	}
});

router.patch('/tabs', async (req, res) => {
	try {
		const { tab } = req.body;
		if (!tab) throw new Error('Invalid data!');
		const tabToEdit = await Tab.findById(tab._id);
		tab.check.forEach((item) => {
			delete item.unsent;
		});
		tabToEdit.check = tab.check;
		await tabToEdit.save();
		const tabs = await Tab.find({});
		res.send({ result: true, tabs });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'Something went wrong...' });
	}
});

router.patch('/tabs/items/delete', async (req, res) => {
	try {
		const { tab, updatedCheck } = req.body;
		if (!tab || !Array.isArray(updatedCheck)) throw new Error('Invalid data!');
		// const updatedCheck = tab.check.filter((item) => item.selected != true);
		const tabToPatch = await Tab.findById(tab._id);
		updatedCheck.forEach((item) => delete item.selected);
		tabToPatch.check = updatedCheck;
		await tabToPatch.save();
		const tabs = await Tab.find({});
		res.send({ result: true, tabs });
	} catch (error) {
		console.log(error);
		res.status(500).send({ result: false, message: 'Something went wrong...' });
	}
});

module.exports = router;
