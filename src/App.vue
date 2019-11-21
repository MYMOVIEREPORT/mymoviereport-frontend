<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
      <router-link to="/signup">Signup</router-link>
    </nav>
    <div class="container my-3">
      <router-view />
    </div>
  </div>
</template>

<style>
nav {
  padding: 1.5rem;
  background-color: blanchedalmond;
}
nav > a {
  color: black;
  font-weight: bold;
  margin-right: 1rem;
}
nav > a:hover {
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
