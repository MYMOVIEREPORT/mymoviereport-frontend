<template>
	<div class="container pt-5">
		<ul class="nav nav-tabs my-3">
			<li class="nav-item">
				<a class="nav-link active" href="#">전체보기</a>
			</li>
			<li class="nav-item dropdown">
				<a
					class="nav-link dropdown-toggle"
					data-toggle="dropdown"
					href="#"
					role="button"
					aria-haspopup="true"
					aria-expanded="false"
					>Genre</a
				>
				<div class="dropdown-menu">
					<a class="dropdown-item" href="#">Action</a>
					<a class="dropdown-item" href="#">Another action</a>
					<a class="dropdown-item" href="#">Something else here</a>
					<div class="dropdown-divider"></div>
					<a class="dropdown-item" href="#">Separated link</a>
				</div>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">10~7</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">7~4</a>
			</li>
			<li class="nav-item">
				<a class="nav-link" href="#">4~1</a>
			</li>
		</ul>
		<MovieList :movies="movies" />
		<!-- 인피니티 스크롤-->
		<InfiniteLoading @infinite="infiniteHandler" />
	</div>
</template>

<script>
import axios from 'axios';
import MovieList from '../components/Movie/MovieList';
import InfiniteLoading from 'vue-infinite-loading';
export default {
	name: 'Movies',
	data() {
		return {
			page: 1,
			movies: [],
		};
	},
	methods: {
		infiniteHandler($state) {
			const reqUrl = process.env.VUE_APP_REQUEST_URL;
			axios
				.get(`${reqUrl}/api/v1/movies/`, {
					params: {
						page: this.page,
					},
				})
				.then(({ data }) => {
					if (data.length) {
						this.page += 1;
						console.log(this.page);
						this.movies.push(...data);
						$state.loaded();
					} else {
						$state.complete();
					}
				});
		},
	},
	computed: {
		loading() {
			return this.movies ? false : true;
		},
	},
	components: {
		MovieList,
		InfiniteLoading,
	},
};
</script>

<style></style>
