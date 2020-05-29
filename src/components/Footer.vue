<template>
    <footer class="footer">
      <p>
        <span v-html="copy"></span> 2020 developer by <a href="https://raviassis.github.io/" target='_blank'>Ravi Assis</a>
        | <a href="https://github.com/raviassis/some-cool-tools" target='_blank'>GitHub</a>
      </p>
    </footer>
</template>

<script>
export default {
    name: 'Footer',
    data: function() {
    return {
        copy: '&copy',
    };
  }
}
</script>