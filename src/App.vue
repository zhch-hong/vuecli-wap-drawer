<template>
  <div id="app">
    <div id="spine-container" class="spine-container"></div>
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
  mounted() {
    window.spineplayer = new window.spine.SpinePlayer("spine-container", {
      jsonUrl: "/spine/char020401.json",
      atlasUrl: "/spine/char020401.atlas",
      animation: "idle",
      premultipliedAlpha: true,
      showControls: false,
      viewport: {
        padLeft: "0%",
        padRight: "0%",
        padTop: "0%",
        padBottom: "0%",
      },
    });
  },
};
</script>

<style lang="scss">
html {
  touch-action: none;
  overscroll-behavior: none;
}
body {
  margin: 0;
}
#app {
  .spine-container {
    height: 100dvh;
  }
}
</style>
