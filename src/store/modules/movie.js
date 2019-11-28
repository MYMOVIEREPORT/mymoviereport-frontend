import axios from 'axios';
const reqUrl = 'https://mymoviereport.herokuapp.com';

const state = {
	movie: null,
};

const mutations = {
	getMovie(state, movieId) {
		state.movie = null; // 초기화 후
		axios
			.get(`${reqUrl}/api/v1/movie/${movieId}/`)
			.then(res => {
				const { data } = res;
				state.movie = data;
			})
			.catch(err => console.log(err));
	},
};

const actions = {
	getMovieAction(options, movieId) {
		options.commit('getMovie', movieId);
	},
	initializeMovieAction(options) {
		options.commit('initializeMovie');
	},
};

const getters = {
	movie(state) {
		return state.movie;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
