<template>
  <div class="List">
    <div class="list-content">
      <div class="toolsBar">
        <div class="searchBox">
          <SInput
            class="searchInput"
            :placeholder="$t('live.list.searchPlaceholder')"
            :icon="require('@/assets/student/icon_seach.svg')"
            :value="keyword"
            @input="
              (text) => {
                keyword = text;
              }
            "
          />
          <SButton
            class="button"
            :text="$t('students.list.searchButton')"
            @btnClick="initList"
          />
        </div>
        <SButton
          class="button"
          theme="blue"
          :text="$t('modules.list.createModule')"
          @btnClick="toDetail"
        />
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
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("modules.list.table.name") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.name }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("modules.list.table.stage1") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.initDiscussTimes }}
                {{ $t("modules.list.table.unit") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("modules.list.table.stage2") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.onionCircleTimes }}
                {{ $t("modules.list.table.unit") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("modules.list.table.stage3") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.estuaryCircleTimes }}
                {{ $t("modules.list.table.unit") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("modules.list.table.stage4") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.bayesTimes }}
                {{ $t("modules.list.table.unit") }}
              </p>
            </template>
          </el-table-column>
          <el-table-column width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("school.list.table.options") }}
              </p>
            </template>
            <template slot-scope="scope">
              <!-- <p
                class="tableRow-text tableRow-button"
                @click="toDetail(scope.row)"
              >
                {{ $t("school.list.table.watchButton") }}
              </p> -->
              <FixedMenu
                :text="$t('students.list.table.moreButton')"
                :menu="optionsMenu"
                :extra="scope.row"
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="pagination">
      <SPagination
        :page="page"
        :page-count="page.total"
        :current-page="page.current"
        @goPage="goPage"
        @prev-click="prevPage"
        @next-click="nextPage"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script>
import SPagination from "@/components/common/pagination";
import SInput from "../components/input";
import SButton from "@/components/common/button.vue";
import FixedMenu from "@/components/common/fixedMenu.vue";
export default {
  components: {
    SPagination,
    SInput,
    SButton,
    FixedMenu,
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
      optionsMenu: [
        {
          text: this.$t("modules.list.table.editButton"),
          callback: (info, index) => {
            this.toDetail(info);
          },
        },
        {
          text: this.$t("modules.list.table.deleteButton"),
          callback: (info, index) => {
            this.deleteModule(info);
          },
        },
      ],
    };
  },
  watch: {
    keyword(val) {
      // if (val == "" || val) {
      //   this.page = {
      //     dataNum: 0,
      //     total: 10,
      //     size: 10,
      //     current: 1,
      //   };
      //   this.initList();
      // }
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
    this.initList();
  },
  methods: {
    initList() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("modules/getModuleList", {
          pageIndex: this.page.current,
          pageSize: this.page.size,
          keyword: this.keyword || "",
        })
        .then((res) => {
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
            text: this.$t("school.list.errorTips.nolist") + err,
          });
        });
    },
    toDetail(info = { templateId: "new" }) {
      this.$router.push({
        path: "/index/modules/editModule",
        query: {
          id: info.templateId,
        },
      });
    },
    deleteModule(info) {
      console.log(info);
      this.$dialog.warning({
        text: [
          this.$t("modules.list.deleteTips1"),
          this.$t("modules.list.deleteTips2"),
        ],
        confirm: () => {
          this.$store
            .dispatch("modules/deleteModule", info.templateId)
            .then((res) => {
              this.$message.message({
                text: this.$t("modules.list.successTips.deleteSuccess"),
              });
              this.initList();
            })
            .catch((err) => {
              this.$message.error({
                text: this.$t("modules.list.errorTips.deleteFail"),
              });
            });
        },
        cancel: () => {},
      });
    },
    goPage(pageNum) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("modules/getModuleList", {
          pageIndex: parseInt(pageNum),
          pageSize: this.page.size,
          keyword: this.keyword || "",
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: parseInt(pageNum),
          };
          this.tableData = res.data;
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.$message.error({
            text: this.$t("school.list.errorTips.nolist") + err,
          });
        });
    },
    currentChange(num) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("modules/getModuleList", {
          pageIndex: parseInt(num),
          pageSize: this.page.size,
          keyword: this.keyword || "",
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
            text: this.$t("school.list.errorTips.nolist") + err,
          });
        });
    },
    prevPage() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("modules/getModuleList", {
          pageIndex: this.page.current - 1,
          pageSize: this.page.size,
          keyword: this.keyword || "",
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
            text: this.$t("school.list.errorTips.nolist") + err,
          });
        });
    },
    nextPage() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("modules/getModuleList", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
          keyword: this.keyword || "",
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
            text: this.$t("school.list.errorTips.nolist") + err,
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
    .el-table .cell {
      overflow: initial;
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
      justify-content: space-between;
      .searchBox {
        display: flex;
        flex-direction: row;
        .searchInput {
          width: 300px;
          padding: 7px 12px;
        }
        .button {
          padding: 7px 20px;
          margin-left: 12px;
        }
      }
      .button {
        padding: 7px 15px;
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