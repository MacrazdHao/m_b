<template>
  <div class="Cover">
    <img class="logo" src="@/assets/reportModule/logo.svg" />
    <div class="titleBox">
      <p class="cecp">CECP Elite</p>
      <p class="title">咨询回顾</p>
      <p class="subtitle">学科专业探索</p>
    </div>
    <div class="bottom">
      <div class="info">
        <p>
          客户编号：VCN21-023<br />
          客户负责人：Dr.Steve Bailey<br />
          日期：07.21.21<br />
          本报告阅读范围： 学生家长、Alina
        </p>
        <p>纬英（广州）教育科技有限公司</p>
      </div>
      <img class="pattern" src="@/assets/reportModule/pattern_cover.svg" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.Cover {
  background: #f7f8f8;
  height: 852px;
  width: 596px;
  display: flex;
  flex-direction: column;
  padding-left: 50px;
  box-sizing: border-box;
  position: relative;
  p {
    user-select: none;
  }
  .logo {
    width: 338px;
    height: 76px;
    margin-bottom: 80px;
    margin-top: 50px;
  }
  .titleBox {
    p {
      text-align: left;
      width: fit-content;
    }
    .cecp {
      font-size: 58px;
      font-family: FrutigerCE-Bold;
      color: #013047;
      line-height: 52px;
      height: 52px;
    }
    .title {
      font-size: 50px;
      font-family: AlibabaPuHuiTiM;
      color: #013047;
      line-height: 65px;
      height: 65px;
      letter-spacing: 1px;
      margin-top: 20px;
    }
    .subtitle {
      font-size: 34px;
      color: #013047;
      line-height: 43px;
      height: 43px;
      margin-top: 10px;
    }
  }
  .info {
    position: absolute;
    left: 50px;
    bottom: 26px;
    p {
      font-size: 14px;
      color: #999999;
      line-height: 18px;
      height: 72px;
      text-align: left;
      white-space: nowrap;
    }
    p + p {
      margin-top: 10px;
    }
  }
  .pattern {
    position: absolute;
    right: 0;
    bottom: 0px;
    width: 370px;
    height: 438px;
  }
}
</style>