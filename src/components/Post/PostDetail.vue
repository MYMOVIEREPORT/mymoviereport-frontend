<template>
	<article>
		<div>
			<!-- 로그인 시 수정/삭제 버튼 -->
			<div v-if="isAuthenticated">
				<div v-if="loggedInUser.user_id === post.user">
					<button class="btn btn-sm btn-danger" @click="deletePost">
						포스트 삭제
					</button>
					<button class="btn btn-sm btn-info">포스트 수정</button>
				</div>
			</div>
			<!-- 포스트 디테일 -->
			<h3>{{ post.title }}</h3>
			<h6>{{ post.published ? '공개' : '비공개' }}글입니다.</h6>
			<h6>내가 준 점수 : {{ post.score }}점</h6>
			<img :src="post.image" alt style="width:100px" />
			<p>{{ post.content }}</p>
		</div>
	</article>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default {
	name: 'PostDetail',
	props: {
		post: {
			type: Object,
		},
	},
	computed: {
		...mapGetters(['requestHeader', 'isAuthenticated', 'loggedInUser']),
	},
	methods: {
		deletePost() {
			const reqUrl = process.env.VUE_APP_REQUEST_URL;
			axios
				.delete(`${reqUrl}/api/v1/post/${this.post.id}/`, this.requestHeader)
				.then(() => {
					this.$router.push('/mypage');
				})
				.catch(err => console.log(err.response));
		},
	},
};
</script>

<style scoped>
img {
	width: 100%;
}
</style>
