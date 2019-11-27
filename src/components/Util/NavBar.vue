<template>
  <nav id="nav">
    <div class="d-flex align-items-center justify-content-between px-4">
      <router-link to="/" class="logo">MMR</router-link>
      <button
        v-show="window.width <= 768"
        class="nav-btn"
        type="button"
        data-toggle="collapse"
        data-target="#navbar-small"
        aria-expanded="false"
        aria-controls="navbar-small"
      >
        <NavIcon fill="white" />
      </button>
      <div v-show="window.width > 768" class="router">
        <div>
          <router-link to="/">Home</router-link>
          <router-link to="/movies">Movies</router-link>
        </div>
        <SearchBar class="searcbar" />
        <div v-if="isAuthenticated">
          <router-link to="/mypage">{{ userName }}</router-link>
          <a href="#" @click.prevent="logout">로그아웃</a>
        </div>
        <div v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">Signup</router-link>
        </div>
      </div>
    </div>
    <div class="collapse" id="navbar-small" v-show="window.width <= 768">
      <div class="small-nav-container">
        <div class="small-nav-items">
          <router-link class="small-nav-item" to="/">Home</router-link>
          <router-link class="small-nav-item" to="/movies">Movies</router-link>
        </div>
        <div v-if="isAuthenticated" class="small-nav-items">
          <router-link class="small-nav-item" to="/mypage">
            {{
            userName
            }}
          </router-link>
          <a class="small-nav-item" href="#" @click.prevent="logout">로그아웃</a>
        </div>
        <div v-else class="small-nav-items">
          <router-link class="small-nav-item" to="/login">Login</router-link>
          <router-link class="small-nav-item" to="/signup">Signup</router-link>
        </div>
        <SearchBar class="searcbar small-nav-item" />
      </div>
    </div>
  </nav>
</template>

<script>
import SearchBar from "./SearchBar";
import NavIcon from "../Icon/NavIcon";
export default {
  name: "NavBar",
  components: {
    SearchBar,
    NavIcon
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$session.remove("mmr-token");
      this.$router.push("/login");
    },
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    navClick() {
      if (this.navBackground.backgroundColor === "#2d3436") {
        this.navBackground.backgroundColor = "transparent";
      } else {
        this.navBackground.backgroundColor = "#2d3436";
      }
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
  data() {
    return {
      window: {
        width: 0,
        height: 0
      }
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style scoped>
nav {
  padding: 0.5rem 0;
  background-color: #2d3436;
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

.nav-btn {
  background-color: transparent;
  border: none;
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
}

.nav-btn:focus {
  outline: none;
}

.small-nav-container {
  background-color: #2d3436;
  padding-bottom: 1rem;
}

.small-nav-items {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.small-nav-item {
  color: white;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
}

.router {
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.searchbar {
  flex-grow: 1;
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
