<template>

  <nav class="navbar">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="logo-vue">
      <p>Todo List App</p>
    </div>
    <div class="link">
      <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/about">About</RouterLink></li>
      </ul>
    </div>
  </nav>

</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: var(--navbar-color);
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  width: 50px;
  height: 50px;
}

.logo p {
  margin-left: 5px;
  font-size: 1.5rem;
}

.link ul{
  display: flex;
  align-items: center;
  list-style: none;
  gap: 20px;
  font-size: 25px;
}

.link a{
  color: var(--text-color);
  text-decoration: none;
}

.link a.router-link-active{
  color: var(--accent-color);
}

@media (max-width: 680px){
  .navbar{
    display: block;  
  }

  .logo{
    justify-content: flex-start;
  }

  .link ul{
    font-size: 20px;
  }

  .link ul{
    padding: 0;
    margin: 0
  }

} 

</style>