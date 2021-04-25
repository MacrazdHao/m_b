<template>
  <div class="CounselingList">
    <List v-if="!detail" @toDetail="toDetail" />
    <Detail
      v-else
      @closeDetail="closeDetail"
      @setSuffixMenu="setSuffixMenu"
      :info="detailInfo"
    />
  </div>
</template>

<script>
import List from "../content/counselingList";
import Detail from "../content/counselingDetail";
export default {
  components: {
    List,
    Detail,
  },
  data() {
    return {
      detailInfo: null,
      detail: false,
    };
  },
  methods: {
    setSuffixMenu(arr) {
      this.$emit("setSuffixMenu", arr);
    },
    toDetail(info) {
      this.detail = true;
      this.detailInfo = info;
    },
    closeDetail() {
      this.detail = false;
      this.detailInfo = null;
    },
  },
};
</script>

<style lang="scss" scoped>
.CounselingList {
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