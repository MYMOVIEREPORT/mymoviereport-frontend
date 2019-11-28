import axios from 'axios';

const reqUrl = 'https://mymoviereport.herokuapp.com';

const state = {
	userPosts: null,
};

const mutations = {
	getUserPosts(state, userId) {
		axios
			.get(`${reqUrl}/api/v1/user/${userId}/posts/`, this.getters.requestHeader)
			.then(res => {
				const { data } = res;
				state.userPosts = data;
			})
			.catch(err => {
				console.log(err);
			});
	},
	deleteUserPost(state, postId) {
		if (state.userPosts) {
			const postIdx = state.userPosts.findIndex(post => post.id === postId);
			if (postIdx > -1) {
				state.userPosts.splice(postIdx, 1);
			}
		}
	},
};

const actions = {
	getUserPostsAction(options, userId) {
		options.commit('getUserPosts', userId);
	},
	deleteUserPostAction(options, postId) {
		options.commit('deleteUserPost', postId);
	},
};

const getters = {
	userPosts(state) {
		return state.userPosts;
	},
};

export default {
	state,
	mutations,
	actions,
	getters,
};
