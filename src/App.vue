<template>
  <div class="body" id="app">
    <Header/>
    <div class="mb-5">
      <router-view></router-view>
    </div>
    <Footer class="footer"/>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style scoped>
.body {
  padding: 20px;
  font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;
}

a {
  color: #00B7FF;
}

.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.footer {
  bottom: 0px;
  position: fixed;
}

</style>
