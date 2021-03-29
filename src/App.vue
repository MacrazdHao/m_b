<template>
  <div id="app">
    <transition name="fade-transform" mode="out-in">
      <router-view style="flex: 1 0 auto" />
    </transition>
  </div>
</template>

<script>
import languageMixin from "./mixins/language";
export default {
  name: "App",
  mixins: [languageMixin],
  data() {
    return {
      showTop: false,
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    width: fit-content;
  }
}
</style>
