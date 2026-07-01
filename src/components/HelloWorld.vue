<template>
  <div
    :class="[
      'scroll-wrapper',
      { transition: !isTouching, touchignore: isTouchignore },
    ]"
    :style="{ '--translateY': translateYStyle }"
  >
    <div class="scroll-view">
      <div ref="scrollViewTop" class="scroll-view-top"></div>
      <div>{{ msg }}</div>
      <p>
        For a guide and recipes on how to configure / customize this project,<br />
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener"
          >vue-cli documentation</a
        >.
      </p>
      <h3>Installed CLI Plugins</h3>
      <ul>
        <li>
          <a
            href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
            target="_blank"
            rel="noopener"
            >babel</a
          >
        </li>
      </ul>
      <h3>Essential Links</h3>
      <ul>
        <li>
          <a href="https://vuejs.org" target="_blank" rel="noopener"
            >Core Docs</a
          >
        </li>
        <li>
          <a href="https://forum.vuejs.org" target="_blank" rel="noopener"
            >Forum</a
          >
        </li>
        <li>
          <a href="https://chat.vuejs.org" target="_blank" rel="noopener"
            >Community Chat</a
          >
        </li>
        <li>
          <a href="https://twitter.com/vuejs" target="_blank" rel="noopener"
            >Twitter</a
          >
        </li>
        <li>
          <a href="https://news.vuejs.org" target="_blank" rel="noopener"
            >News</a
          >
        </li>
      </ul>
      <h3>Ecosystem</h3>
      <ul v-for="i in 10" :key="i">
        <li>
          <a href="https://router.vuejs.org" target="_blank" rel="noopener"
            >vue-router</a
          >
        </li>
        <li>
          <a href="https://vuex.vuejs.org" target="_blank" rel="noopener"
            >vuex</a
          >
        </li>
        <li>
          <a
            href="https://github.com/vuejs/vue-devtools#vue-devtools"
            target="_blank"
            rel="noopener"
            >vue-devtools</a
          >
        </li>
        <li>
          <a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener"
            >vue-loader</a
          >
        </li>
        <li>
          <a
            href="https://github.com/vuejs/awesome-vue"
            target="_blank"
            rel="noopener"
            >awesome-vue</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      /** @type {"hide" | "mid" | "full"} */
      state: "full",
      originTranslateY: 0,
      translateY: "50%",
      height: 0,
      isTouching: false,
      isTouchignore: true,
      isScrollViewTop: true,
      deltaY: 0,
    };
  },
  computed: {
    translateYStyle() {
      return typeof this.translateY === "number"
        ? this.translateY + "px"
        : this.translateY;
    },
  },
  mounted() {
    this.addResizeListener();
    this.addScrollTopListener();
    this.addTouchListener();
  },
  methods: {
    addResizeListener() {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          const calcStyle = getComputedStyle(entry.target);
          const width = calcStyle.getPropertyValue("width");
          const height = calcStyle.getPropertyValue("height");
          console.log(
            "width",
            width,
            "height",
            height,
            "devicePixelRatio",
            devicePixelRatio,
          );
          this.height = parseFloat(height);
          this.translateY = this.height / 2;
          this.originTranslateY = this.translateY;
        });
      });
      observer.observe(this.$el);
    },
    addScrollTopListener() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            console.log("isScrollViewTop", entry.isIntersecting);
            this.isScrollViewTop = entry.isIntersecting;
          });
        },
        { root: this.$el },
      );
      observer.observe(this.$refs.scrollViewTop);
    },
    addTouchListener() {
      document.addEventListener("touchstart", this.onTouchstart, {
        passive: false,
        capture: true,
      });
    },
    /** @param {TouchEvent} event */
    onTouchstart(event) {
      console.log("touchstart", event);
      if (event.touches.length > 1) return;
      this.isTouching = true;
      const startY = event.touches[0].clientY;
      this._lastY = startY;
      const onTouchmove = (/** @type {TouchEvent} */ event) => {
        if (!this.isScrollViewTop) return;
        const touch = event.touches[0];
        this.deltaY = touch.clientY - this._lastY;
        this._lastY = touch.clientY;
        this.translateY = this.originTranslateY + (touch.clientY - startY);
        if (this.translateY < 0) this.translateY = 0;
        if (this.translateY > this.height) this.translateY = this.height;
      };
      document.addEventListener("touchmove", onTouchmove, {
        passive: false,
      });
      document.addEventListener(
        "touchend",
        (/** @type {TouchEvent} */ event) => {
          console.log("deltaY", this.deltaY);
          this.isTouching = false;
          this.isTouchignore = true;
          // 下滑
          if (this.deltaY > 0) {
            if (this.translateY <= this.height / 2) {
              this.translateY = this.height / 2;
            }
            if (this.translateY > this.height / 2) {
              this.translateY = this.height;
            }
          }
          // 上滑
          if (this.deltaY < 0) {
            if (this.translateY <= this.height / 2) {
              this.translateY = 0;
              this.isTouchignore = false;
            }
            if (this.translateY > this.height / 2) {
              this.translateY = this.height / 2;
            }
          }

          this.originTranslateY = this.translateY;

          document.removeEventListener("touchmove", onTouchmove, {
            passive: false,
          });
        },
        { once: true },
      );
      document.addEventListener(
        "touchcancel",
        (/** @type {TouchEvent} */ event) => {
          console.log("touchcancel", event);
          document.removeEventListener("touchmove", onTouchmove, {
            passive: false,
          });
        },
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.scroll-wrapper {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(var(--translateY, 0));
  overflow-y: auto;
  &.transition {
    transition: transform 300ms linear;
  }
  &.touchignore {
    touch-action: none;
  }
  .scroll-view {
    position: relative;
    .scroll-view-top {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background-color: red;
    }
  }
}
</style>
