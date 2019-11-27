<template>
	<nav id="nav navbar-expadn-lg" class="d-flex align-items-center">
		<router-link to="/" class="logo">MMR</router-link>
		<div class="router">
			<div>
				<router-link to="/">Home</router-link>
				<router-link to="/movies">Movies</router-link>
				<SearchBar />
			</div>
			<div v-if="isAuthenticated">
				<router-link to="/mypage">{{ userName }}</router-link>
				<a href="#" @click.prevent="logout">로그아웃</a>
			</div>
			<div v-else>
				<router-link to="/login">Login</router-link>
				<router-link to="/signup">Signup</router-link>
			</div>
		</div>
	</nav>
</template>

<script>
import SearchBar from './SearchBar';
export default {
	name: 'NavBar',
	components: {
		SearchBar,
	},
	methods: {
		logout() {
			this.$store.dispatch('logout');
			this.$session.remove('mmr-token');
			this.$router.push('/login');
		},
	},
	computed: {
		isAuthenticated() {
			return this.$store.getters.isAuthenticated;
		},
		userName() {
			return this.$store.getters.loggedInUser.username;
		},
	},
};
</script>

<style scoped>
nav {
	padding: 0 2rem;
	background-color: transparent;
	height: 4rem;
	background-image: linear-gradient(
		to bottom,
		rgba(0, 0, 0, 0.9) 10%,
		rgba(0, 0, 0, 0)
	);
	width: 100%;
	position: fixed;
	top: 0;
	z-index: 100;
}

.router {
	flex-grow: 1;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.router a {
	color: #e5e5e5;
	font-weight: bold;
	margin-right: 1rem;
	text-decoration: none;
}

a:hover {
	text-decoration: none;
	cursor: pointer;
}

.logo {
	color: #c44569;
	font-weight: bold;
	font-size: 2rem;
	margin-right: 2rem;
	cursor: pointer;
	text-decoration: none;
}

.logo:hover {
	text-decoration: none;
	color: #c44569;
}
</style>
