<template>
	<div id="app">
		<!-- 네비 -->
		<NavBar />

		<!-- 라우터 뷰 -->
		<div style="flex-grow:1">
			<router-view />
		</div>

		<!-- 푸터 -->
		<footer class="footer">
			<div>© MY MOVIE REPORT - 띵한만다린, {{ new Date().getFullYear() }}</div>
		</footer>
	</div>
</template>

<script>
import NavBar from './components/Util/NavBar';
export default {
	name: 'App',
	components: {
		NavBar,
	},
};
</script>

<style>
#app {
	min-height: 100vh;
	display: flex;
	flex-direction: column;
}

.container {
	margin: 2rem auto;
}

.vue-auth-form {
	border: 1px solid rgba(128, 128, 128, 0.342);
	border-radius: 5px;
	padding: 3rem;
}

.btn {
	width: 100%;
}

.footer {
	padding: 1rem;
	background-color: black;
	display: flex;
	justify-content: center;
	width: 100%;
	bottom: 0;
}
.footer div {
	color: white;
}
</style>
