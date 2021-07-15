<template>
  <div class="Pagination">
    <p class="totalNum">
      {{ $t("global.pagination.totalNum", { num: page.dataNum }) }}
    </p>
    <el-pagination
      background
      layout="prev, pager, next"
      :pager-count="5"
      :page-count="page.total"
      :current-page="page.current"
      @prev-click="prevPage"
      @next-click="nextPage"
      @current-change="currentChange"
    >
    </el-pagination>
    <div class="jumper">
      <p>{{ $t("global.pagination.goPage") }}</p>
      <div>
        <input v-model="pageNum" type="number" @keydown="enterEvent" />
      </div>
      <p>{{ $t("global.pagination.pageUnit") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["page"],
  data() {
    return {
      pageNum: 1,
      // page: {
      //   dataNum: 1000,
      //   total: 100,
      //   size: 10,
      //   current: 1,
      // },
    };
  },
  methods: {
    goPage() {
      console.log("跳转");
      this.$emit("goPage", this.pageNum);
    },
    currentChange(num) {
      this.$emit("current-change", num);
    },
    prevPage() {
      this.$emit("prev-click");
    },
    nextPage() {
      this.$emit("next-click");
    },
    enterEvent(event) {
      let e = event || window.event;
      if (e && e.keyCode == 13) {
        if (this.pageNum > this.page.total) this.pageNum = this.page.total;
        else if (this.pageNum <= 0 || this.pageNum == "") this.pageNum = 1;
        this.goPage();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 24px;
  .totalNum {
    font-size: 14px;
    color: #666666;
    line-height: 20px;
    margin-right: 18px;
  }
  .jumper {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 18px;
    p {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      white-space: nowrap;
    }
    input {
      padding: 0;
      margin: 0;
      margin-left: 8px;
      margin-right: 8px;
      padding-left: 4px;
      padding-right: 4px;
      width: 46px;
      height: 28px;
      border-radius: 4px;
      border: 1px solid #dddfe6;
      box-sizing: border-box;
      transition: all 0.1s;
      background: none;
      outline: none;
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      text-align: center;
    }
    input:focus {
      border: 1px solid #4b78f6;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
  // }
}
</style>