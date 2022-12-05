<template>

  <nav class="navbar">
    <img src="@/assets/logo.svg" alt="logo-vue">
    <p>Todo List App</p>
  </nav>
  
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  padding: 20px;
  background: var(--navbar-color);
  margin-bottom: 30px;
}

.navbar img {
  width: 50px;
  height: 50px;
}

.navbar p {
  margin-left: 5px;
  font-size: 1.5rem;
}
</style>