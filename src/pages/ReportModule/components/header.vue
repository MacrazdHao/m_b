<template>
  <div class="PageHeader">
    <div class="header">
      <img class="logo" src="@/assets/reportModule/logo.svg" />
      <div class="info">
        <p>CECP Elite</p>
        <p>{{ username }}</p>
      </div>
    </div>
    <div class="title">
      <p class="cn">{{ cn }}</p>
      <p class="en">{{ en }}</p>
    </div>
    <!-- 顶部页码{{ pageNum || "nothing" }} -->
  </div>
</template>

<script>
export default {
  props: ["username", "cn", "en", "pageNum"],
};
</script>

<style lang="scss" scoped>
.PageHeader {
  // height: 50px;
  width: 596px;
  // overflow: hidden;
  // background-color: red;
  background-color: #fff;
  padding-bottom: 40px;
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 30px 0 40px 50px;
    box-sizing: border-box;
    .logo {
      width: 186px;
      height: 42px;
    }
    .info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      padding: 1px 31px 2px 30px;
      box-sizing: border-box;
      border-bottom: 1px solid #666666;
      margin-top: -4px;
      p {
        font-size: 14px;
        font-family: arial;
        color: #666666;
        line-height: 16px;
        text-align: right;
      }
      p + p {
        margin-top: 4px;
      }
    }
  }
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    height: 38px;
    background: #ffb706;
    p {
      margin-top: -4px;
    }
    .cn {
      font-size: 22px;
      font-family: AlibabaPuHuiTiM;
      color: #013047;
      line-height: 30px;
    }
    .en {
      font-size: 22px;
      font-family: FrutigerCE-Bold;
      color: #013047;
      line-height: 24px;
    }
  }
}
</style>