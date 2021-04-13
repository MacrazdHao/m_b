<template>
  <div class="Test">测试</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    this.$emit("setSuffixMenu", [
      this.$t("counseling.step1.title"),
      this.$t("counseling.step2.title"),
    ]);
  },
};
</script>

<style lang="scss" scoped>
.Test {
}
</style>