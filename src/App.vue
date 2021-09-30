<template>
  <div id="app">
    <span v-show="false">{{version}}</span>
    <TestConfigBox />
    <transition name="slide-fade2">
      <router-view style="flex: 1 0 auto" :language="language" />
    </transition>
  </div>
</template>

<script>
import config from "@/utils/config";
import languageMixin from "./mixins/language";
import TestConfigBox from "./components/test/testConfigBox_normal.vue";
export default {
  name: "App",
  mixins: [languageMixin],
  components: {
    TestConfigBox,
  },
  data() {
    return {
      version: config.getShortVersion(),
    };
  },
  mounted() {
    // console.log(this.$route.query.lang);
    // if()
  },
  methods: {},
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
  overflow: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    width: fit-content;
  }
}
</style>
