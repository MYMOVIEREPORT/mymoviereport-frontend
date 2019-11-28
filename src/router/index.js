import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import MyPage from '../views/MyPage.vue';
import Movies from '../views/Movies.vue';
import Movie from '../views/Movie.vue';
import Search from '../views/Search.vue';
import AllMovies from '../views/AllMovies.vue';
import GenreMovies from '../views/GenreMovies.vue';
import ScoreMovies from '../views/ScoreMovies.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home,
	},
	{
		path: '/login',
		name: 'login',
		component: Login,
	},
	{
		path: '/signup',
		name: 'signup',
		component: Signup,
	},
	{
		path: '/mypage',
		name: 'mypage',
		component: MyPage,
	},
	{
		path: '/movies',
		name: 'movies',
		component: Movies,
		children: [
			{ path: '', component: AllMovies },
			{ path: 'genre/:genreId', component: GenreMovies, props: true },
			{
				path: 'score/:minScore/:maxScore',
				component: ScoreMovies,
				props: true,
			},
		],
	},
	{
		path: '/movie/:movieId',
		name: 'movie',
		component: Movie,
		props: true,
	},
	{
		path: '/search/:keyword',
		name: 'search',
		component: Search,
		props: true,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
