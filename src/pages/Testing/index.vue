<template>
  <div class="Testing">
    <transition name="slide-fade2">
      <router-view @setSuffixMenu="setSuffixMenu" />
    </transition>
  </div>
</template>

<script>
export default {
  methods: {
    setSuffixMenu(arr) {
      // console.log("设置后缀2", arr);
      this.$emit("setSuffixMenu", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.Testing {
}
</style>