import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	items: [],
	addons: [],
	tabs: [],
	openTab: {},
	lastSelection: -1,
	activeItem: undefined
};

const mutations = {
	setActiveItem: (state, activeItem) => {
		for (let i = 0; i < state.openTab.check.length; i++) {
			const item = state.openTab.check[i];
			if (i == activeItem) {
				item.active = true;
			}
			item.selected = false;
		}
		state.activeItem = activeItem;
	},
	initTabs: (state, tabs) => {
		state.tabs = tabs;
	},
	initItems: (state, items) => {
		state.items = items;
	},
	initAddons: (state, addons) => {
		state.addons = addons;
	},
	addTab: (state, newTab) => {
		state.tabs.push(newTab);
	},
	openTab: (state, openTab) => {
		openTab.check.forEach((item) => {
			item.selected = false;
		});
		state.openTab = openTab;
	},
	addItemToTab: (state, item) => {
		state.openTab.check.push(item);
	},
	addToItem: (state, addon) => {
		state.openTab.check[state.activeItem].addons.push(addon);
		state.openTab.check[state.activeItem].price += addon.price;
	},
	itemSelectionChange: (state, args) => {
		const { index, status } = args;
		console.log('status', status, 'committing change to', index);
		if (status) state.lastSelection = index;
		else state.lastSelection = undefined;
		state.openTab.check[index].selected = status;
		console.log(state);
	},
	addonSelectionChange: (state, addon) => {
		addon.selected = !addon.selected;
	},
	updateCheck: (state, updatedCheck) => {
		state.openTab.check = updatedCheck;
	},
	sendItems: (state) => {
		state.openTab.check = state.openTab.check.forEach((item) => {
			delete item.unsent;
		});
	},
	unsetActiveItem: (state) => {
		const updatedCheck = new Array();
		for (let i = 0; i < state.openTab.check.length; i++) {
			let item = state.openTab.check[i];
			item.addons = item.addons.slice();
			item.addons.forEach((addon) => (addon.selected = false));
			const clone = { ...item };
			clone.active = false;
			updatedCheck.push(clone);
		}
		state.openTab.check = updatedCheck;
		state.activeItem = undefined;
	}
};

const actions = {
	async setActiveItem(context, activeItem) {
		try {
			context.commit('setActiveItem', activeItem);
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},
	async unsetActiveItem(context) {
		try {
			context.commit('unsetActiveItem');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},

	async initTabs(context) {
		try {
			const response = await axios.get('http://localhost:3000/tabs');
			if (response.data.result) context.commit('initTabs', response.data.tabs);
			else throw new Error('Failed to load addons.');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},
	async initItems(context) {
		try {
			const response = await axios.get('http://localhost:3000/items');
			if (response.data.result) context.commit('initItems', response.data.items);
			else throw new Error('Failed to initialize items.');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},
	async initAddons(context) {
		try {
			const response = await axios.get('http://localhost:3000/addons');
			if (response.data.result) context.commit('initAddons', response.data.addons);
			else throw new Error('Failed to initialize addons.');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},
	async addTab(context, tabName) {
		let response = false;
		try {
			response = await axios.post('http://localhost:3000/tabs', { name: tabName });
			if (response.data.result) {
				context.commit('addTab', response.data.newTab);
			} else throw new Error('Failed to add a new tab.');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
		return response.data.result;
	},
	async openTab(context, openTab) {
		const tab = { ...openTab };
		const currentTab = await context.state.openTab;
		if (currentTab.check && currentTab.check.find((item) => item.unsent)) {
			alert('Current tab has unsent items. Please send items before openning a different tab.');
		} else {
			const computedCheck = await context.dispatch('computeCheck', tab);
			openTab.check = computedCheck;
			context.commit('openTab', openTab);
		}
	},
	async computeCheck(context, openTab) {
		const items = await context.state.items;
		const addons = await context.state.addons;
		const computedCheck = [];
		openTab.check.forEach((checkItem) => {
			let itemClone = {};
			Object.assign(itemClone, items.find((item) => item._id == checkItem._id));
			const computedAddons = [];
			checkItem.addons.forEach((addon) => {
				let addonClone = {};
				Object.assign(addonClone, addons.find((a) => a._id == addon._id));
				addonClone.selected = false;
				computedAddons.push(addonClone);
				itemClone.price += addonClone.price;
			});
			itemClone.addons = computedAddons;
			itemClone.selected = false;
			itemClone.unsent = false;
			computedCheck.push(itemClone);
		});
		return computedCheck;
	},
	async addItemToTab(context, item) {
		const clone = {};
		Object.assign(clone, item);
		clone.selected = false;
		clone.unsent = true;
		clone.addons = new Array();
		context.commit('addItemToTab', clone);
		return context.state.openTab.check.length - 1;
	},
	formatCheck(context, check) {
		let formattedCheck = new Array();
		check.forEach((item) => {
			let addons = new Array();
			item.addons.forEach((addon) => addons.push({ _id: addon._id }));
			let updatedItem = { _id: item._id, addons };
			formattedCheck.push(updatedItem);
		});

		return formattedCheck;
	},
	async sendItems(context) {
		try {
			const openTab = await context.state.openTab;
			const formattedCheck = await context.dispatch('formatCheck', openTab.check);
			const response = await axios.patch('http://localhost:3000/tabs', { tab: openTab._id, formattedCheck });
			if (response.data.result) {
				context.commit('sendItems');
				context.commit('initTabs', response.data.tabs);
				context.dispatch('openTab', await context.state.tabs.find((tab) => tab._id == openTab._id));
			} else throw new Error('Failed to add item to tab.');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},
	async deleteSelectedItems(context) {
		try {
			const openTab = await context.state.openTab;
			const unselectedItems = openTab.check.filter((item) => item.selected != true);
			let formattedCheck = await context.dispatch('formatCheck', unselectedItems);
			const response = await axios.patch('http://localhost:3000/tabs', {
				tab: openTab._id,
				formattedCheck
			});
			if (response.data.result) context.commit('updateCheck', unselectedItems);
			else throw new Error('Failed to delete selected items.');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},
	async deleteSelectedAddons(context) {
		try {
			const openTab = await context.state.openTab;
			const unselectedItems = openTab.check.filter((item) => item.selected != true);
			let formattedCheck = await context.dispatch('formatCheck', unselectedItems);
			const response = await axios.patch('http://localhost:3000/tabs', {
				tab: openTab._id,
				formattedCheck
			});
			if (response.data.result) context.commit('updateCheck', unselectedItems);
			else throw new Error('Failed to delete selected items.');
		} catch (error) {
			console.log(error);
			alert(error.message);
		}
	},
	async cancelActiveItem(context) {
		context.commit('unsetActiveItem');
		context.commit('cancelActiveItem');
	},
	async editItem(context) {
		const index = await context.state.lastSelection;
		if (index != undefined && context.state.openTab.check[index].unsent) context.commit('setActiveItem', index);
	},
	addToItem(context, addon) {
		let clone = {};
		Object.assign(clone, addon);
		context.commit('addToItem', clone);
	}
};

const getters = {
	activeItem: (state) => {
		return state.openTab.check[state.activeItem];
	},
	lastSelection: (state) => {
		return state.openTab.check[state.lastSelection];
	},
	hasUnsent: (state) => {
		return state.openTab.check.find((item) => item.unsent);
	},
	hasSelection: (state) => {
		return state.openTab.check.find((item) => item.selected);
	},
	addonsForActiveItem: (state, getters) => {
		return state.addons.filter((item) => item.type.toUpperCase() == getters.activeItem.type.toUpperCase());
	},
	tabTotal: (state) => {
		let total = 0;
		state.openTab.check.forEach((item) => (total += item.price));
		return total;
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
});
