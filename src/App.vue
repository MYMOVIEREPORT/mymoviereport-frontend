<template>
  <div id="app">
    <header>
      <router-link to="/">📒 MYMOVIEREPORT</router-link>
    </header>
    <nav id="nav" class="d-flex justify-content-between">
      <div>
        <router-link to="/">Home</router-link>
        <router-link to="/movies">Movies</router-link>
      </div>
      <div v-if="isAuthenticated">
        <router-link to="/mypage" style="color:blue;font-style:italic;">{{userName}}</router-link>
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
header {
  height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fdcb6e;
}
header > a {
  color: black;
  font-size: 2rem;
  font-weight: 400;
}
nav {
  padding: 1.5rem;
  background-color: #ffeaa7;
}
nav a {
  color: black;
  font-weight: bold;
  margin-right: 1rem;
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
</style>
