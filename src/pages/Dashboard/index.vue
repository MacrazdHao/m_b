<template>
  <div class="Dashboard">
    <transition name="slide-fade2">
      <router-view @setSuffixMenu="setSuffixMenu" />
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    setSuffixMenu(arr) {
      this.$emit("setSuffixMenu", arr, true);
    },
  },
};
</script>

<style lang="scss" scoped>
.Dashboard {
  p {
    margin: 0;
  }
}
</style>