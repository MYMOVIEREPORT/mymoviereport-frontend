import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import MyPage from '../views/MyPage.vue';
import Post from '../views/Post.vue';
import Movies from '../views/Movies.vue';
import Movie from '../views/Movie.vue';
import Search from '../views/Search.vue';

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
	},
	{
		path: '/post/:postId',
		name: 'post',
		component: Post,
		props: true, // 해당 컴포넌트에서 params를 prop으로 사용 가능하게 한다.
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
