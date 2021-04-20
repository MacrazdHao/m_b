<template>
  <div class="List">
    <div class="list-content">
      <div class="toolsBar">
        <SInput
          class="searchInput"
          :placeholder="$t('students.list.searchPlaceholder')"
          :icon="require('@/assets/student/icon_seach.svg')"
        />
        <SButton class="button" :text="$t('students.list.searchButton')" />
      </div>
      <div class="table">
        <el-table :data="tableData" height="642" style="width: 100%">
          <el-table-column min-width="100px" fixed>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.name") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.name) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" sortable>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.grade") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(scope.row.grade) }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.sex") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(scope.row.sex) }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.country") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(scope.row.country) }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.options") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p
                class="tableRow-text tableRow-button"
                @click="toDetail(scope.row)"
              >
                {{ $t("students.list.table.watchButton") }}
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <p class="totalNum">
        {{ $t("global.pagination.totalNum", { num: page.dataNum }) }}
      </p>
      <el-pagination
        background
        layout="prev, pager, next"
        :pager-count="5"
        :page-count="page.total"
        :current-page="page.current"
      >
      </el-pagination>
      <div class="jumper">
        <p>{{ $t("global.pagination.goPage") }}</p>
        <div>
          <input
            v-model="pageNum"
            type="number"
            @focus="enterEvent"
            @blur="removeEnterEvent"
          />
        </div>
        <p>{{ $t("global.pagination.pageUnit") }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SInput from "../components/input";
import SButton from "@/components/common/button.vue";
export default {
  components: {
    SInput,
    SButton,
  },
  data() {
    return {
      value: "",
      tableData: [
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
        {
          id: 999,
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          archivesPdf: "",
          step1: "",
          step2: "",
          step3: "",
        },
      ],
      pageNum: 1,
      page: {
        dataNum: 1000,
        total: 100,
        size: 10,
        current: 1,
      },
    };
  },
  methods: {
    toDetail(info) {
      this.$emit("toDetail", info);
    },
    overline(text = "") {
      return text.substring(0, 40) + (text.length > 30 ? "..." : "");
    },
    goPage() {
      this.page = {
        ...this.page,
        current: parseInt(this.pageNum),
      };
    },
    enterEvent() {
      document.onkeydown = (event) => {
        let e = event || window.event;
        if (e && e.keyCode == 13) {
          if (this.pageNum > this.page.total) this.pageNum = this.page.total;
          else if (this.pageNum <= 0 || this.pageNum == "") this.pageNum = 1;
          this.goPage();
        }
      };
    },
    removeEnterEvent() {
      document.onkeydown = () => {};
    },
  },
};
</script>
<style lang="scss">
.List {
  .toolsBar {
    .el-select .el-input.is-focus .el-input__inner {
      border-color: #4b78f6;
    }
    .el-input__inner {
      height: 36px;
      line-height: 36px;
      border-radius: 2px;
      font-size: 14px;
      color: #333333;
      padding: 0 12px;
      width: 120px;
    }
  }
  .table {
    .el-table th > .cell {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
    }
    .el-table td {
      padding: 12px 0;
      vertical-align: top;
    }
    .el-table th.is-leaf {
      padding: 20px 0;
    }
    .el-table th {
      background-color: #f6f8fa;
    }
  }
}
</style>
<style lang="scss" scoped>
.List {
  width: 100%;
  padding: 22px 24px 14px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
  }
  .list-content {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    .toolsBar {
      display: flex;
      flex-direction: row;
      width: 100%;
      .searchInput {
        width: 300px;
        // margin-left: 12px;
      }
      .button {
        padding: 7px 20px;
        margin-left: 12px;
      }
    }
    .table {
      width: 100%;
      box-sizing: border-box;
      margin-top: 22px;
      .tableHeader-text {
        font-size: 14px;
        font-family: AlibabaPuHuiTiM;
        color: #333333;
        line-height: 20px;
        white-space: nowrap;
        width: fit-content;
      }
      .tableRow-text {
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        width: fit-content;
        // white-space: nowrap;
      }
      .statusBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        .dot--finish {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #53c41b;
          margin-right: 4px;
        }
        .dot--waiting {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #d3d3d3;
          margin-right: 4px;
        }
      }
      .tableRow-longText {
        white-space: normal;
      }
      .tableRow-name {
        color: #333333;
      }
      .tableRow-button {
        color: #4b77f6;
        cursor: pointer;
        white-space: nowrap;
      }
    }
  }
  .pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 24px;
    .totalNum {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      margin-right: 18px;
      white-space: nowrap;
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
}
</style>