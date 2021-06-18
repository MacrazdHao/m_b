<template>
  <div class="List">
    <div class="list-content">
      <div class="toolsBar">
        <SInput
          class="searchInput"
          :placeholder="$t('students.list.searchPlaceholder')"
          :icon="require('@/assets/student/icon_seach.svg')"
          @input="
            (text) => {
              keyword = text;
            }
          "
        />
        <SButton class="button" :text="$t('students.list.searchButton')" />
      </div>
      <div class="table">
        <el-table
          :data="tableData"
          height="642"
          style="width: 100%"
          :empty-text="
            loading
              ? $t('school.list.emptyTips.loadingList')
              : error
              ? $t('school.list.errorTips.nolist')
              : $t('school.list.emptyTips.emptyList')
          "
        >
          <el-table-column min-width="100px" fixed>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("school.list.table.school") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.orgName) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" fixed>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("school.list.table.num") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.count }}
              </p>
            </template>
          </el-table-column>
          <el-table-column width="50">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("school.list.table.options") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p
                class="tableRow-text tableRow-button"
                @click="toDetail(scope.row)"
              >
                {{ $t("school.list.table.watchButton") }}
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
        @prev-click="prevPage"
        @next-click="nextPage"
        @current-change="currentChange"
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
import Bus from "../utils/bus";
export default {
  components: {
    SInput,
    SButton,
  },
  data() {
    return {
      loading: false,
      error: false,
      keyword: "",
      tableData: [],
      pageNum: 1,
      page: {
        dataNum: 1000,
        total: 100,
        size: 10,
        current: 1,
      },
    };
  },
  watch: {
    keyword(val) {
      if (val == "" || val) {
        this.page = {
          dataNum: 0,
          total: 10,
          size: 10,
          current: 1,
        };
        this.initList(() => {
          console.log("watch");
        });
      }
    },
  },
  mounted() {
    this.page = {
      dataNum: 0,
      total: 10,
      size: 10,
      current: 1,
    };
    this.keyword = "";
    this.initList(() => {
      console.log("mounted");
    });
  },
  methods: {
    initList(cb) {
      this.loading = true;
      this.$store
        .dispatch("school/getSchoolList", {
          pageIndex: this.page.current,
          pageSize: this.page.size,
          keyword: this.keyword,
        })
        .then((res) => {
          cb();
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: this.page.current,
          };
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          console.log(err);
          this.$message.error({
            text: this.$t("school.list.errorTips.nolist"),
          });
        });
    },
    toDetail(info) {
      this.$router.push({
        name: "student",
      });
      Bus.setSchoolInfo(info);
    },
    overline(text = "") {
      return text.substring(0, 40) + (text.length > 30 ? "..." : "");
    },
    goPage() {
      this.loading = true;
      this.$store
        .dispatch("school/getSchoolList", {
          pageIndex: parseInt(this.pageNum),
          pageSize: this.page.size,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: parseInt(this.pageNum),
          };
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.$message.error({
            text: this.$t("school.list.errorTips.nolist"),
          });
        });
    },
    currentChange(num) {
      this.loading = true;
      this.$store
        .dispatch("school/getSchoolList", {
          pageIndex: parseInt(num),
          pageSize: this.page.size,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: parseInt(num),
          };
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.$message.error({
            text: this.$t("school.list.errorTips.nolist"),
          });
        });
    },
    prevPage() {
      this.loading = true;
      this.$store
        .dispatch("school/getSchoolList", {
          pageIndex: this.page.current - 1,
          pageSize: this.page.size,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: this.page.current - 1,
          };
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.$message.error({
            text: this.$t("school.list.errorTips.nolist"),
          });
        });
    },
    nextPage() {
      this.loading = true;
      this.$store
        .dispatch("school/getSchoolList", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: this.page.current + 1,
          };
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.$message.error({
            text: this.$t("school.list.errorTips.nolist"),
          });
        });
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
      align-items: center;
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
        align-items: flex-start;
        .dotBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 20px;
          .dot {
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background: #d3d3d3;
            margin-right: 4px;
          }
          .dot--finish {
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background: #53c41b;
            margin-right: 4px;
          }
          .dot--doing {
            width: 6px;
            height: 6px;
            border-radius: 6px;
            background: #ffbe3d;
            margin-right: 4px;
          }
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