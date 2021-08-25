<template>
  <div class="Archives">
    <transition name="slide-fade2">
      <router-view @setSuffixMenu="setSuffixMenu" />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    setSuffixMenu(arr) {
      this.$emit("setSuffixMenu", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.Archives {
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