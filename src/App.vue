<template>
  <div id="app">
    <!-- <iframe
      class="wiki-iframe"
      src="https://www.gamekee.com/zsca2/tj/611786.html"
    ></iframe> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
};
</script>

<style lang="scss">
html {
  touch-action: none;
}
body {
  margin: 0;
}
#app {
  .wiki-iframe {
    display: block;
    width: 100vw;
    height: 100dvh;
    border-width: 0;
  }
}
</style>
