<template>
  <div class="School">
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
.School {
  display: flex;
  flex-direction: row;
  width: 100%;
  // height: 792px;
  box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
  background: #fff;
  margin-bottom: 24px;
  p {
    margin: 0;
  }
}
</style>