<template>
  <div class="Index" @click="logout">
    <!-- 左侧栏、顶部路径栏、头部 -->
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("user/logout").then((res) => {
        this.$router.push({ path: "/" });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Index {
}
</style>