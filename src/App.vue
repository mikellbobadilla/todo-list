<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <header class="header">
    <Navbar/>
  </header>

  <main class="container">
    <RouterView/>
  </main>

</template>

<style scoped>
.header {
  width: 100%;
}

</style>