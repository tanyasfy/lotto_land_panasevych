<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/lottery">Results</RouterLink>
  </nav>
</template>

<style scoped>
nav {
  height: 10vh;
  background-image: linear-gradient(#bfbab0, #f0ece3);
}

nav a.router-link-exact-active {
  color: var(--color-text) !important;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  font-weight: 600;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem;
  }
}

@media (max-width: 400px) {
  nav {
    height: 5vh;
  }
}
</style>
