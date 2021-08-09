<template>
  <div class="PageFooter">
    <div class="info">
      <!-- 底部页码{{ pageNum || "nothing" }} -->
      <p class="date">Date:{{ date }}</p>
      <p class="title">{{ title }}</p>
      <p class="pageNum">{{ getNumString(pageNum) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["date", "title", "pageNum"],
  methods: {
    getNumString(num) {
      return (num < 10 ? "0" : "") + num;
    },
  },
};
</script>

<style lang="scss" scoped>
.PageFooter {
  width: 596px;
  background-color: #fff;
  padding-top: 25px;
  .info {
    width: 100%;
    height: 48px;
    border-top: 1px solid #999999;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    box-sizing: border-box;
    position: relative;
    p {
      font-size: 14px;
      color: #898989;
      line-height: 20px;
      margin-top: -4px;
      position: absolute;
    }
    .date{
      top: 50%;
      left: 50px;
      transform: translate(0%,-50%);
    }
    .title {
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    .pageNum {
      top: 50%;
      right: 50px;
      transform: translate(0%,-50%);
    }
  }
}
</style>