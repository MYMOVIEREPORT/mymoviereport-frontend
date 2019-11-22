import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Signup from '../views/Signup.vue';
import MyPage from '../views/MyPage.vue';
import PostDetail from '../views/PostDetail.vue';

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
		path: '/post/:postId',
		name: 'post',
		component: PostDetail,
		props: true,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
