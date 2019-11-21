<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/login">Login</router-link>
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
</style>
