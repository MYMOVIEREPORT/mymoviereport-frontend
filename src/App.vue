<template>
  <div id="app">
    <nav id="nav" class="d-flex align-items-center">
      <span class="logo">MMR</span>
      <div class="router">
        <div>
          <router-link to="/">Home</router-link>
          <router-link to="/movies">Movies</router-link>
        </div>
        <div v-if="isAuthenticated">
          <router-link to="/mypage">{{userName}}</router-link>
          <a href="#" @click.prevent="logout">로그아웃</a>
        </div>
        <div v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Signup</router-link>
        </div>
      </div>
    </nav>

    <!-- 라우터 뷰 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$session.remove("mmr-token");
      this.$router.push("/login");
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    userName() {
      return this.$store.getters.loggedInUser.username;
    }
  }
  // created() {
  //   window.addEventListener("scroll", this.onScroll);
  // },
  // destroyed() {
  //   window.removeEventListener("scroll", this.onScroll);
  // }
};
</script>

<style>
nav {
  padding: 0 2rem;
  background-color: rgb(20, 20, 20);
  height: 4rem;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.7) 10%,
    rgba(0, 0, 0, 0)
  );
  width: 100%;
  position: relative;
}

.container {
  margin: 2rem auto;
}

.scroll {
  position: fixed;
  z-index: 1;
  background-color: transparent;
}

.router a {
  color: #e5e5e5;
  font-weight: bold;
  margin-right: 1rem;
}

.router {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

a:hover {
  text-decoration: none;
  cursor: pointer;
}
.vue-auth-form {
  border: 1px solid rgba(128, 128, 128, 0.342);
  border-radius: 5px;
  padding: 3rem;
}
.btn {
  width: 100%;
}

.logo {
  color: #c44569;
  font-weight: bold;
  font-size: 2rem;
  margin-right: 2rem;
}
</style>
