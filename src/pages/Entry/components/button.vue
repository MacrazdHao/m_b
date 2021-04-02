<template>
  <div class="button" @click="handleClick">
    <p>{{ title }}</p>
  </div>
</template>

<script>
export default {
  props: ["title"],
  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  padding: 0.5208vw 3.333vw;
  box-sizing: border-box;
  border-radius: 10vw;
  background: linear-gradient(270deg, #ffd05d 0%, #ffb706 100%);
  box-shadow: 0 0.3125vw 0.625vw 0 #ffe6a9;
  cursor: pointer;
  width: fit-content;
  p {
    color: #fff;
    margin: 0;
    width: fit-content;
    font-size: 0.729vw;
  }
}
</style>