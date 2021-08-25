<template>
  <transition name="slide-fade">
    <div class="Loading" v-if="visible">
      <img src="@/assets/index/loading2.svg" />
      <!-- <p>加载中...{{ loadingTips }}</p> -->
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      loadingTips: "",
      visible: false,
      close: () => {},
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.closeLoading();
      },
      immediate: true,
    },
  },
  methods: {
    closeLoading() {
      this.close();
    },
  },
};
</script>

<style lang="scss" scoped>
.Loading {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
  }
  p {
    margin: 0;
    color: #4b78f6;
  }
}
</style>