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
      // animation: "cut_B",
      // animations: ["cut_A", "cut_B"],

      // jsonUrl: "/live2d/雪泉-雪花之舞-立绘/char020401.json",
      // atlasUrl: "/live2d/雪泉-雪花之舞-立绘/char020401.atlas",
      animation: "idle",
      // animations: ["cut_A", "cut_B"],

      // alpha: true,
      // backgroundColor: "#00000000",
      premultipliedAlpha: true,
      showControls: false,
      viewport: {
        // debugRender: true,
        padLeft: "0%",
        padRight: "0%",
        padTop: "0%",
        padBottom: "0%",
        // x: -450,
        // y: 50,
        // width: 1600,
        // height: 2000,
        // padLeft: "10%",
        // padRight: "10%",
        // padTop: "10%",
        // padBottom: "10%",
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
