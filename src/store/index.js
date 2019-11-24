import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import movie from './modules/movie';
import moviePosts from './modules/moviePosts';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		auth,
		movie,
		moviePosts,
	},
});
