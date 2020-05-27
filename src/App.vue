<template>
  <div class="body" id="app">
    <header>
      <h2 class="h3">Some Cool Tools</h2>
      <p>some tools to help you</p>
    </header>
    <router-view></router-view>
    <footer class="footer">
      <p>
        <span v-html="copy"></span> 2020 developer by <a href="https://raviassis.github.io/" target='_blank'>Ravi Assis</a>
        | <a href="https://github.com/raviassis/some-cool-tools" target='_blank'>GitHub</a>
      </p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: function() {
    return {
        copy: '&copy',
    };
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
}

</style>
