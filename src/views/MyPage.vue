<template>
	<div class="container pt-5">
		<UserProfile :user="user" />
		<h5>유저가 쓴 포스트</h5>
		<hr />
		<UserPosts :posts="userPosts" />
		<Uploader />
	</div>
</template>

<script>
import axios from 'axios';
import UserProfile from '../components/User/UserProfile';
import UserPosts from '../components/User/UserPosts';
import Uploader from '../components/Util/Uploader';
import { mapGetters } from 'vuex';

export default {
	name: 'MyPage',
	components: {
		UserProfile,
		UserPosts,
		Uploader,
	},
	data() {
		return {
			user: null,
		};
	},
	computed: {
		...mapGetters(['requestHeader', 'userPosts']),
		userId() {
			return this.$store.getters.loggedInUser.user_id;
		},
	},
	methods: {
		getLoginUser(reqUrl) {
			axios
				.get(`${reqUrl}/api/v1/user/${this.userId}/`, this.requestHeader)
				.then(res => {
					const { data } = res;
					this.user = data;
				})
				.catch(err => {
					console.log(err);
				});
		},
	},
	mounted() {
		const requestUrl = 'http://localhost:8000';
		this.getLoginUser(requestUrl);
		this.$store.dispatch('getUserPostsAction', this.userId);
	},
	created() {
		// 비 로그인시 차단
		if (!this.$store.getters.isAuthenticated) {
			this.$router.push('/login');
		}
	},
};
</script>

<style></style>
