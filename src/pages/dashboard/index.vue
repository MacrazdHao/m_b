<template>
  <div class="Dashboard">
    <router-view @setSuffixMenu="setSuffixMenu" />
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