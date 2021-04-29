<template>
  <div class="Management">
    <router-view
      @setSuffixMenu="setSuffixMenu"
      @toDetail="toDetail"
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
    };
  },
  computed: {
    whichPage() {
      return this.$route.name;
    },
    whichGroup() {
      return this.$route.meta.group;
    },
  },
  mounted() {
    this.detailInfo = this.getDetailInfo();
  },
  methods: {
    getDetailInfo() {
      switch (this.whichPage) {
        case "counselingDetail":
          return Bus.getStudentInfo_counseling();
        case "careerDetail":
          return Bus.getStudentInfo_career();
        default:
          return null;
      }
    },
    setSuffixMenu(arr) {
      this.$emit("setSuffixMenu", arr, true);
    },
    toDetail(info) {
      this.detailInfo = info;
      Bus[`setStudentInfo_${this.whichGroup}`](info);
      this.$router.push({ path: `/index/management/${this.whichGroup}Detail` });
    },
    closeDetail() {
      this.$router.push({ path: `/index/management/${this.whichGroup}List` });
    },
  },
};
</script>

<style lang="scss" scoped>
.Management {
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