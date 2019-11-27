<template>
	<div class="container pt-5">
		<Loading v-if="loading" />
		<PostDetailModal v-else :post="post" />
	</div>
</template>

<script>
import axios from 'axios';
import PostDetailModal from '../components/Post/PostDetailModal';
import Loading from '../components/Util/Loading';
export default {
	name: 'Post',
	components: {
		PostDetailModal,
		Loading,
	},
	props: {
		postId: {
			type: String,
		},
	},
	data() {
		return {
			post: null,
		};
	},
	computed: {
		loading() {
			return this.post ? false : true;
		},
	},
	methods: {
		getPost() {
			const reqUrl = process.env.VUE_APP_REQUEST_URL;
			axios
				.get(`${reqUrl}/api/v1/post/${this.postId}/`)
				.then(res => {
					const { data } = res;
					this.post = data;
				})
				.catch(err => console.log(err));
		},
	},
	mounted() {
		this.getPost();
	},
};
</script>

<style></style>
