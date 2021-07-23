<template>
  <div class="Archives">
    <transition name="slide-fade2">
      <router-view
        @toDetail="toDetail"
        @closeDetail="closeDetail"
        @setSuffixMenu="setSuffixMenu"
        :info="detailInfo"
      />
    </transition>
  </div>
</template>

<script>
import Bus from "./utils/bus";
export default {
  data() {
    return {
      detailInfo: null,
    };
  },
  mounted() {
    this.detailInfo = Bus.getStudentInfo() || null;
  },
  methods: {
    setSuffixMenu(arr) {
      this.$emit("setSuffixMenu", arr);
    },
    toDetail(info) {
      this.detailInfo = info;
      Bus.setStudentInfo(info);
      this.$router.push({ path: "/index/archives/archivesDetail" });
    },
    closeDetail() {
      this.$router.push({ path: "/index/archives/archivesList" });
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