<template>
  <div class="Progress" :style="globalStyle">
    <div :style="progressStyle"></div>
  </div>
</template>

<script>
export default {
  props: [
    "progress",
    "error",
    "width",
    "height",
    "backgroundColor",
    "uploadColor",
    "finishColor",
    "errorColor",
  ],
  computed: {
    globalStyle() {
      return {
        "min-width": (this.width || 100) + "px",
        width: (this.width || 100) + "px",
        height: (this.height || 2) + "px",
        "background-color": this.backgroundColor || "#d3d3d3",
      };
    },
    progressStyle() {
      return {
        width: (this.progress / 100) * (this.width || 100) + "px",
        height: (this.height || 2) + "px",
        "background-color":
          this.progress <= 0
            ? "none"
            : this.progress >= 100
            ? this.finishColor || "#53c41b"
            : this.error
            ? this.errorColor || "#ff4d4f"
            : this.uploadColor || "#4b77f6",
      };
    },
  },
  mounted() {
    // console.log(this.globalStyle);
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.Progress {
}
</style>