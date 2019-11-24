import axios from 'axios';

const reqUrl = 'http://localhost:8000';

const state = {
	moviePosts: [],
};

const mutations = {
	getMoviePosts(state, movieId) {
		axios
			.get(`${reqUrl}/api/v1/movie/${movieId}/posts/`)
			.then(res => {
				const { data } = res;
				state.moviePosts = data;
			})
			.catch(err => console.log(err));
	},
	updateMoviePosts(state, post) {
		if (post.published) {
			state.moviePosts.push(post);
		}
	},
};

const actions = {
	getMoviePostsAction(options, movieId) {
		options.commit('getMoviePosts', movieId);
	},
	updateMoviePostsAction(options, post) {
		options.commit('updateMoviePosts', post);
	},
};

const getters = {
	moviePosts(state) {
		return state.moviePosts;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
