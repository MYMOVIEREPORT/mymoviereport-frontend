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
		state.moviePosts.push(post);
	},
	deleteMoviePost(state, postId) {
		if (state.moviePosts) {
			const postIdx = state.moviePosts.findIndex(post => post.id === postId);
			if (postIdx > -1) {
				state.moviePosts.splice(postIdx, 1);
			}
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
	deleteMoviePostAction(options, postId) {
		options.commit('deleteMoviePost', postId);
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
