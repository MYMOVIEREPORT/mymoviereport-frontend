<template>
	<div>
		<Loading v-if="loading" />
		<div v-else>
			<div class="mb-2">
				<img :src="user.thumbnail" class="rounded mx-auto d-block thumbnail" />
			</div>
			<h3 class="text-center">{{ user.username }}</h3>
			<h5 class="text-center text-muted font-italic">{{ user.email }}</h5>
			<div class="d-flex justify-content-center my-3">
				<button
					type="button"
					class="btn btn-primary w-auto"
					data-toggle="modal"
					:data-target="`#user-${user.id}`"
				>
					프로필 수정
				</button>
			</div>
			<h5>리포트 분석</h5>
			<hr />
			<div class="row">
				<div
					class="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center my-2"
				>
					<h3>총 평가 영화 수</h3>
					<h2 class="d-flex align-items-center">
						<FilmIcon fill="#d35400" />
						<span class="ml-2">{{ postCount }}</span>
					</h2>
					<h3>평가한 영화 점수 평균</h3>
					<h2 class="d-flex align-items-center">
						<StarIcon fill="#f9ca24" />
						<span class="ml-2">{{ totalPostScore }}</span>
					</h2>
				</div>
				<div
					class="d-flex justify-content-center align-items-center col-12 col-md-6 my-2 "
				>
					<DonutChart :posts="posts" v-if="posts.length > 0" />
					<h6 v-else>평가할 리포트가 없습니다.</h6>
				</div>
			</div>
			<UserUpdateModal :user="user" @userUpdated="onUserUpdated" />
		</div>
	</div>
</template>

<script>
import Loading from '../Util/Loading';
import UserUpdateModal from './UserUpdateModal';
import DonutChart from '../Util/DonutChart';
import axios from 'axios';
import { mapGetters } from 'vuex';
import FilmIcon from '../Icon/FilmIcon';
import StarIcon from '../Icon/StarIcon';
export default {
	name: 'UserProfile',
	components: {
		Loading,
		UserUpdateModal,
		DonutChart,
		FilmIcon,
		StarIcon,
	},
	computed: {
		...mapGetters(['requestHeader']),
		loading() {
			return this.user ? false : true;
		},
		postCount() {
			return this.posts.length;
		},
		totalPostScore() {
			if (this.posts.length > 0) {
				let score = this.posts.reduce((acc, post) => (acc += post.score), 0);
				const avg = score / this.posts.length;
				return avg.toFixed(2);
			}

			return 0;
		},
	},
	data() {
		return {
			posts: [],
		};
	},
	props: {
		user: {
			type: Object,
		},
	},
	methods: {
		onUserUpdated(data) {
			const { email, thumbnail } = data;
			this.user.email = email;
			this.user.thumbnail = thumbnail;
		},
	},
	mounted() {
		const requestUrl = process.env.VUE_APP_REQUEST_URL;
		axios
			.get(
				`${requestUrl}/api/v1/user/${this.user.id}/posts/`,
				this.requestHeader
			)
			.then(({ data }) => {
				if (data.length > 0) {
					this.posts = data;
				}
			})
			.catch(err => console.log(err));
	},
};
</script>

<style>
.thumbnail {
	width: 200px;
}
</style>
