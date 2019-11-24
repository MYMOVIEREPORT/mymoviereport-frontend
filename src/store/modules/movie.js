import axios from 'axios';
const reqUrl = 'http://localhost:8000';

const state = {
	movie: null,
};

const mutations = {
	getMovie(state, movieId) {
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
