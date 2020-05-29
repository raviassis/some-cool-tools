<template>
    <header>
      
        <div class="flex">
          <router-link to="/">
            <img class="logo" src="../assets/images/logo.png" alt="logo">
          </router-link>
          <router-link to="/">
            <h2 class="h3">Some Cool Tools</h2>
          </router-link>
        </div>      
        <p class="subtitle">
          <router-link to="/">Some tools to help you</router-link>
        </p>
      
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style scoped>
a {
  color: unset;
  text-decoration: none;
}
.flex {
  display: flex;
}
.logo {
  width: 25px;
  height: 25px;
  margin-top: .4rem;
}
.subtitle{
  margin-left: 27px;
}
</style>