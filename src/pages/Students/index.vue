<template>
  <div class="Student" v-if="detailInfo">
    <router-view
      @setSuffixMenu="setSuffixMenu"
      @toProcess="toProcess"
      @toDetail="toDetail"
      @closeDetail="backToList"
      :info="detailInfo"
    />
  </div>
</template>

<script>
import Bus from "./utils/bus";
export default {
  data() {
    return {
      detailInfo: null,
      detail: false,
      process: false,
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
      this.$router.push({ path: "/index/students/studentsDetail" });
    },
    toProcess(info) {
      this.detailInfo = info;
      Bus.setStudentInfo(info);
      this.$router.push({ path: "/index/students/studentsProcess" });
    },
    backToList() {
      this.$router.push({ path: "/index/students/studentsList" });
    }
  },
};
</script>

<style lang="scss" scoped>
.Student {
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