<template>
  <div class="Back">
    <img class="logo" src="@/assets/reportModule/logo.svg" />
    <div class="bottom">
      <img class="pattern" src="@/assets/reportModule/pattern_back.svg" />
      <div class="about">
        <div class="search">
          <div class="icon">
            <img src="@/assets/reportModule/icon_search.svg" />
          </div>
          <p>https://www.myfellas.net/</p>
        </div>
        <p class="address">
          广东省广州市越秀区广州大道中289号南方同创汇4号楼501
        </p>
        <p class="address">tel：(86-02)8737 2142</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.Back {
  background: #f7f8f8;
  height: 852px;
  width: 596px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  // margin-left: -1px;
  // transform: scale(2);
  .logo {
    width: 338px;
    height: 76px;
    margin-bottom: 158px;
  }
  .bottom {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
    .pattern {
      width: 262px;
      height: 262px;
    }
    .about {
      display: flex;
      flex-direction: column;
      margin-bottom: 30px;
      margin-left: 12px;
      width: 312px;
      .search {
        display: flex;
        flex-direction: row;
        // align-items: center;
        width: fit-content;
        background-color: #fff;
        border: 1px solid #ffb706;
        margin-bottom: 12px;
        .icon {
          background-color: #ffb706;
          width: 22px;
          height: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 16px;
            height: 16px;
          }
        }
        p {
          color: #ffb706;
          font-size: 12px;
          color: #ffb706;
          line-height: 22px;
          font-variant: normal !important;
          // letter-spacing: 1px;
          padding: 0 7px;
        }
      }
      .address {
        text-align: left;
        font-size: 12px;
        color: #999999;
        line-height: 13px;
        width: 100%;
      }
      .address + .address {
        // margin-top: 5px;
      }
    }
  }
}
</style>