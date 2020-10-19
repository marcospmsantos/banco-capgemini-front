import axios from 'axios';

// initial state
const state = {
	user: {
		name: '',
	},
	access_token: null,
	refresh_token: null,
	check: false,
	permissions: [],
	roles: [],
};

// getters
const getters = {
	user: state => {
		return state.user;
	},
	token: state => {
		return state.access_token;
	},
	check: state => {
		return state.check;
	},
	permissions: state => {
		return state.permissions;
	},
	roles: state => {
		return state.roles;
	},
};

// mutations
const mutations = {
	setUser(state, payload) {
		state.user = payload;
	},
	setToken(state, payload) {
		state.access_token = payload.access_token;
		state.refresh_token = payload.refresh_token;
	},
	setCheck(state, payload) {
		state.check = payload;
	},
	setPermissions(state, payload) {
		state.permissions = payload;
	},
	setRoles(state, payload) {
		state.roles = payload;
	},
	fetchUserFailure(state) {
		state.user = null;
		state.access_token = null;
		state.refresh_token = null;
		state.check = false;
		state.permissions = [];
		state.roles = [];
	},
	destroy(state) {
		state.user = null;
		state.access_token = null;
		state.refresh_token = null;
		state.check = false;
		state.permissions = [];
		state.roles = [];
	},
	logout(state) {
		state.user = null;
		state.access_token = null;
		state.refresh_token = null;
		state.check = false;
		state.permissions = [];
		state.roles = [];
	},
};

// actions
const actions = {
	setUser({ commit }, payload) {
		commit('setUser', payload);
	},
	setToken({ commit }, payload) {
		commit('setToken', payload);
	},
	setCheck({ commit }, payload) {
		commit('setCheck', payload);
	},
	setPermissions({ commit }, payload) {
		commit('setPermissions', payload);
	},
	setRoles({ commit }, payload) {
		commit('setRoles', payload);
	},
	destroy({ commit }) {
		commit('destroy');
	},
	logout({ commit }) {
		commit('logout');
	},
	async fetchUser({ commit }) {
		try {
			const { data } = await axios.get('/me');
			commit('setUser', data.user);
			commit('setPermissions', data.permissions);
			commit('setRoles', data.roles);
		} catch (e) {
			commit('fetchUserFailure');
		}
	},
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
