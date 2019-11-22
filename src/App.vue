<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <div v-if="isAuthenticated">
        <h5>{{ userName }}님 안녕하세요.</h5>
        <router-link to="/mypage">MyPage</router-link>
        <a @click.prevent="logout">로그아웃</a>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </nav>
    <div class="container my-3">
      <router-view />
    </div>
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
  },
  mounted() {
    // const token = this.$session.get("mmr-token");
    // if (token) {
    //   this.$store.dispatch("setTokenAction", token);
    // }
  }
};
</script>

<style>
nav {
  padding: 1.5rem;
  background-color: blanchedalmond;
}
nav a {
  color: black;
  font-weight: bold;
  margin-right: 1rem;
}
nav a:hover {
  text-decoration: none;
}
.vue-auth-form {
  border: 1px solid rgba(128, 128, 128, 0.342);
  border-radius: 5px;
  padding: 3rem;
}
.btn {
  width: 100%;
}
</style>
