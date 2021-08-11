<template>
  <div class="Catalogue" ref="catalogue">
    <div class="catalogueItem" v-for="(item, index) in data" :key="index">
      <p class="en">{{ enTitles[index + 1] }}</p>
      <div class="cnTitleBox">
        <p class="cn">{{ cnTitles[index + 1] }}</p>
        <p class="index" v-if="item.noChapters">
          {{ getNumString(item.startPage + pageNum) }}
        </p>
      </div>
      <div class="menuBox" v-if="!item.noChapters">
        <div class="menu" v-for="(item2, index2) in item.data" :key="index2">
          <p class="subtitle">{{ item2.title }}</p>
          <p class="index">{{ getNumString(item2.startPage + pageNum) }}</p>
        </div>
      </div>
      <div class="dashed">
        <template v-for="(dot, dotIndex) in 100">
          <div class="line" :key="dotIndex"></div>
          {{ "" }}
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data", "cnTitles", "enTitles", "contentHeight"],
  data() {
    return {
      pageNum: 1,
    };
  },
  watch: {
    contentHeight() {
      this.pageNum = Math.ceil(
        this.$refs.catalogue.offsetHeight / this.contentHeight
      );
    },
    data() {
      this.pageNum = Math.ceil(
        this.$refs.catalogue.offsetHeight / this.contentHeight
      );
    },
  },
  methods: {
    getNumString(num) {
      return (num < 10 ? "0" : "") + num;
    },
  },
};
</script>

<style lang="scss" scoped>
.Catalogue {
  // background: yellow;
  // height: 752px;
  background: #fff;
  width: 596px;
  padding: 0 50px;
  padding-top: 4px;
  box-sizing: border-box;
  p {
    text-align: left;
    margin-top: -4px;
  }
  .catalogueItem + .catalogueItem {
    margin-top: 20px;
  }
  .catalogueItem {
    width: 100%;
    // padding-bottom: 10px;
    // border-bottom: 1px dashed #999999;
    .en {
      font-size: 18px;
      font-family: arial;
      color: #666666;
      line-height: 21px;
    }
    .cnTitleBox {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
      margin-top: 10px;
      .cn {
        font-size: 20px;
        font-family: AlibabaPuHuiTiM;
        color: #333333;
        line-height: 27px;
      }
      .index {
        color: #999999;
        font-size: 18px;
        line-height: 25px;
      }
    }
    .menuBox {
      .menu {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding-left: 22px;
        margin-top: 10px;
        box-sizing: border-box;
        p {
          font-size: 18px;
          line-height: 25px;
        }
        .subtitle {
          color: #333333;
        }
        .index {
          color: #999999;
        }
      }
    }
    .dashed {
      width: 100%;
      overflow: hidden;
      margin-top: 10px;
      white-space: nowrap;
      line-height: 1px;
      height: 1px;
      font-size: 0;
      letter-spacing: 4px;
      .line {
        display: inline-block;
        width: 4px;
        height: 1px;
        background-color: #999999;
      }
    }
  }
}
</style>