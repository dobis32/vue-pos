import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
	items: [],
	tabs: [],
	openTab: {}
};

const mutations = {
	initTabs: (state, tabs) => {
		state.tabs = tabs;
	},
	initItems: (state, items) => {
		state.items = items;
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
	selectionChange: (state, args) => {
		const { index, status } = args;
		console.log('status', status, 'committing change to', index);
		state.openTab.check[index].selected = status;
	},
	updateCheck: (state, updatedCheck) => {
		state.openTab.check = updatedCheck;
	},
	sendItems: (state) => {
		state.openTab.check = state.openTab.check.forEach((item) => {
			delete item.unsent;
		});
	}
};

const actions = {
	async initTabs(context) {
		const response = await axios.get('http://localhost:3000/tabs');
		if (response.data.result) {
			context.commit('initTabs', response.data.tabs);
		} else alert('failed to load tabs');
	},
	async initItems(context) {
		const response = await axios.get('http://localhost:3000/items');
		if (response.data.result) {
			context.commit('initItems', response.data.items);
		} else alert('failed to load tabs');
	},
	async addTab(context, tabName) {
		const response = await axios.post('http://localhost:3000/tabs', { name: tabName });
		if (response.data.result) {
			context.commit('addTab', response.data.newTab);
			return response.data.result;
		} else return response.data.result;
	},
	async openTab(context, openTab) {
		const currentTab = await context.state.openTab;
		if (currentTab.check && currentTab.check.find((item) => item.unsent)) {
			alert('Current tab has unsent items. Please send items before openning a different tab.');
		} else {
			const computedCheck = await context.dispatch('computeCheck', openTab);
			openTab.check = computedCheck;
			context.commit('openTab', openTab);
		}
	},
	async computeCheck(context, openTab) {
		const items = await context.state.items;
		const computedCheck = [];
		openTab.check.forEach((checkItem) => {
			const clone = {};
			Object.assign(clone, items.find((item) => item._id == checkItem._id));
			clone.selected = false;
			computedCheck.push(clone);
		});
		return computedCheck;
	},
	async addItemToTab(context, item) {
		// const tab = await context.state.openTab;
		const clone = {};
		Object.assign(clone, item);
		clone.selected = false;
		clone.unsent = true;
		context.commit('addItemToTab', clone);
		// const response = await axios.patch('http://localhost:3000/tabs', { tab, item: { _id: clone._id } });
		// if (response.data.result) {
		// 	context.commit('addItemToTab', clone);
		// } else alert('failed to add item to tab');
	},
	async sendItems(context) {
		const openTab = await context.state.openTab;
		const response = await axios.patch('http://localhost:3000/tabs', { tab: openTab });
		if (response.data.result) {
			context.commit('sendItems');
			context.commit('initTabs', response.data.tabs);
			context.dispatch('openTab', context.state.tabs.find((tab) => tab._id == openTab._id));
		} else alert('failed to add item to tab');
	},
	async deleteSelected(context) {
		const openTab = await context.state.openTab;
		const updatedCheck = openTab.check.filter((item) => item.selected != true);
		context.commit('updateCheck', updatedCheck);
	}
};

export default new Vuex.Store({
	state,
	mutations,
	actions
});
