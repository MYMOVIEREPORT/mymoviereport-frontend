const state = {
	token: null,
};

const mutations = {
	setToken(state, token) {
		state.token = token;
	},
};

const actions = {
	setTokenAction(options, token) {
		options.commit('setToken', token);
	},
};

const getters = {
	isAuthenticated(state) {
		return state.token ? true : false;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
