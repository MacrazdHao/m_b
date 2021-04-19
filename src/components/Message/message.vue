<template>
  <div
    :class="['Message', theme]"
    :style="{
      display: 'none',
      transform: `translate(-50%, ${baseTop - 30}px)`,
    }"
    v-if="visible"
    :id="`bubble${messageNum}`"
  >
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messageNum: 0,
      text: "",
      theme: "blue",
      duration: 2000,
      visible: false,
      callback: () => {},
    };
  },
  computed: {
    baseTop() {
      return (this.messageNum - 1) * 50;
    },
  },
  watch: {
    visible(val) {
      if (val) {
        this.show(this.hide);
      }
    },
  },
  methods: {
    show(callback) {
      setTimeout(() => {
        let el = document.getElementById(`bubble${this.messageNum}`);
        el.style.display = "block";
        setTimeout(() => {
          el.style.transform = `translate(-50%, ${this.baseTop + 30}px)`;
          el.style.opacity = "1";
          callback();
        }, 200);
      }, 100);
    },
    hide() {
      setTimeout(() => {
        let el = document.getElementById(`bubble${this.messageNum}`);
        el.style.transform = `translate(-50%, ${this.baseTop - 30}px)`;
        el.style.opacity = "0";
        setTimeout(() => {
          this.callback();
          this.visible = false;
        }, 200);
      }, this.duration);
    },
  },
};
</script>

<style lang="scss" scoped>
.Message {
  position: fixed;
  top: 0px;
  opacity: 0;
  left: 50%;
  min-width: 380px;
  padding: 10px 24px;
  transition: all 0.2s ease;
  z-index: 2000;
  p {
    margin: 0;
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    text-align: center;
  }
}
.blue {
  background-color: #4b77f6;
  box-shadow: 0px 4px 16px 0px rgba(56, 100, 225, 0.4);
}
.yellow {
  background: #ffbe3d;
  box-shadow: 0px 4px 16px 0px rgba(225, 161, 36, 0.4);
}
.red {
  background-color: #ff4d4f;
  box-shadow: 0px 4px 16px 0px rgba(228, 52, 54, 0.4);
}
</style>