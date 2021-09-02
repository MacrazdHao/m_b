<template>
  <div class="List">
    <div class="list-content">
      <div class="toolsBar">
        <!-- <PSelector
          class="statusSelector"
          :items="status"
          :index="statusIndex"
          :border="true"
          @handleSelect="handleStatusSelect"
        /> -->
        <SInput
          class="searchInput"
          :placeholder="$t('live.list.searchPlaceholder')"
          :icon="require('@/assets/students/icon_search.svg')"
          :value="value"
          @input="
            (text) => {
              value = text;
            }
          "
        />
        <SButton
          class="button"
          :text="$t('live.list.searchButton')"
          @btnClick="searchWithKeyword"
        />
      </div>
      <div class="table">
        <el-table :data="tableData" height="642" style="width: 100%">
          <div slot="empty">
            <p class="loadTips" v-if="loading">
              {{ $t("live.list.emptyTips.loadingList") }}
            </p>
            <p
              class="loadTips"
              v-if="tableData.length == 0 && !loading & !error"
            >
              {{ $t("live.list.emptyTips.emptyList") }}
            </p>
            <p class="loadTips" v-if="error">
              {{ $t("live.list.errorTips.nolist") }}
            </p>
          </div>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("estuary.records.studentName") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.studentInfo.nickName }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("estuary.records.studentCode") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.studentInfo.userCode }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("estuary.records.consultantName") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{
                  scope.row.consultantInfo
                    ? scope.row.consultantInfo.nickName
                    : $t("estuary.records.hasNotConsultant")
                }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("estuary.records.consultantCode") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{
                  scope.row.consultantInfo
                    ? scope.row.consultantInfo.userCode
                    : "-"
                }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("estuary.records.times") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.totalConsultNum || 0 }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("estuary.records.finishedTimes") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{
                  scope.row.currentConsultNum > 0
                    ? scope.row.currentConsultNum - 1
                    : 0
                }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("estuary.records.nextTime") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{
                  scope.row.nextConsultTime > 0
                    ? `${getDateString(
                        scope.row.nextConsultTime,
                        "YYYY-MM-DD hh:mm"
                      )}-${getDateString(
                        scope.row.nextConsultTime +
                          scope.row.nextConsultTimeLength * 60 * 60 * 1000,
                        "hh:mm"
                      )}`
                    : $t("estuary.records.hasNotNextTime")
                }}
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
    <SetConsultantBox
      v-if="showSetConsultantBox"
      :visible="showSetConsultantBox"
      :initInfo="editTarget"
      @confirm="setConsultant"
      @cancel="showSetConsultantBox = false"
    />
    <SetConsultTimesBox
      v-if="showSetConsultTimesBox"
      :visible="showSetConsultTimesBox"
      :initInfo="editTarget"
      @confirm="setConsultTimes"
      @cancel="showSetConsultTimesBox = false"
    />
    <SetConsultTimeBox
      v-if="showSetConsultTimeBox"
      :visible="showSetConsultTimeBox"
      :initInfo="editTarget"
      @confirm="setConsultTime"
      @cancel="showSetConsultTimeBox = false"
    />
  </div>
</template>

<script>
import FixedMenu from "@/components/common/fixedMenu.vue";
import SPagination from "@/components/common/pagination";
import SInput from "../components/input";
import SButton from "@/components/common/button.vue";
import PSelector from "@/components/common/selector";
import Enum from "@/utils/enum";
import DateTools from "@/utils/date";
import SetConsultantBox from "../components/setConsultantBox";
import SetConsultTimesBox from "../components/setConsultTimesBox";
import SetConsultTimeBox from "../components/setConsultTimeBox";
export default {
  components: {
    FixedMenu,
    SPagination,
    SInput,
    SButton,
    PSelector,
    SetConsultantBox,
    SetConsultTimesBox,
    SetConsultTimeBox,
  },
  data() {
    return {
      loading: false,
      error: false,
      status: [
        { text: this.$t("management.status.all"), value: -1 },
        { text: this.$t("management.status.noStart"), value: 0 },
        // { text: this.$t("management.status.collection"), value: 11 },
        // { text: this.$t("management.status.testing"), value: 12 },
        // { text: this.$t("management.status.discussion"), value: 13 },
        // { text: this.$t("management.status.consultation"), value: 21 },
        // { text: this.$t("management.status.fllowup"), value: 31 },
        // { text: this.$t("management.status.update"), value: 32 },
        // { text: this.$t("management.status.asupport"), value: 41 },
        // { text: this.$t("management.status.support"), value: 42 },
        // { text: this.$t("management.status.monitoring"), value: 43 },
        // { text: this.$t("management.status.report"), value: 88 },
        // { text: this.$t("management.status.end"), value: 99 },
        { text: this.$t("management.status.consultLabel0"), value: 1 },
        { text: this.$t("management.status.consultLabel1"), value: 2 },
      ],
      statusIndex: 2,
      value: "",
      tableData: [],
      pageNum: 1,
      page: {
        dataNum: 0,
        total: 1,
        size: 10,
        current: 1,
      },
      editTarget: null,
      optionsMenu: [
        {
          text: this.$t("estuary.records.setConsultantButton"),
          callback: (info, index) => {
            this.editTarget = info;
            this.showSetConsultantBox = true;
          },
        },
        {
          text: this.$t("estuary.records.setConsultTimesButton"),
          callback: (info, index) => {
            this.editTarget = info;
            this.showSetConsultTimesBox = true;
          },
        },
        {
          text: this.$t("estuary.records.setTimeButton"),
          callback: (info, index) => {
            this.editTarget = info;
            this.showSetConsultTimeBox = true;
          },
        },
      ],
      showSetConsultantBox: false,
      showSetConsultTimesBox: false,
      showSetConsultTimeBox: false,
    };
  },
  watch: {
    loading(val) {
      if (val) {
        this.tableData = [];
      }
    },
  },
  mounted() {
    this.page = {
      dataNum: 0,
      total: 1,
      size: 10,
      current: 1,
    };
    this.tableData = [];
    this.initList();
  },
  methods: {
    ...DateTools,
    setConsultant(info) {
      this.$dialog.message({
        text: this.$t("estuary.setConsultantBox.confirmTips", {
          code: info.userCode || "null",
          name: info.nickName,
        }),
        confirm: () => {
          let data = new FormData();
          data.append("newConsultantId", info.userId);
          data.append("recordId", this.editTarget.recordId);
          this.$store
            .dispatch("estuary/setConsultant", data)
            .then((res) => {
              this.$message.message({
                text: this.$t("estuary.setConsultantBox.saveSuccessTips"),
              });
              this.showSetConsultantBox = false;
              this.editTarget = null;
              this.initList();
            })
            .catch((err) => {
              this.$message.error({
                text: this.$t("estuary.setConsultantBox.saveErrorTips"),
              });
            });
        },
        cancel: () => {},
      });
    },
    setConsultTimes(totalConsultNum) {
      let data = new FormData();
      data.append("totalConsultNum", totalConsultNum);
      data.append("recordId", this.editTarget.recordId);
      this.$store
        .dispatch("estuary/setConsultTimes", data)
        .then((res) => {
          this.$message.message({
            text: this.$t("estuary.setConsultTimesBox.saveSuccessTips"),
          });
          this.showSetConsultTimesBox = false;
          this.editTarget = null;
          this.initList();
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("estuary.setConsultTimesBox.saveErrorTips"),
          });
        });
    },
    setConsultTime(info) {
      this.$store
        .dispatch("estuary/setConsultInfo", info)
        .then((res) => {
          this.$message.message({
            text: this.$t("estuary.setConsultTimesBox.saveSuccessTips"),
          });
          this.showSetConsultTimeBox = false;
          this.editTarget = null;
          this.initList();
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("estuary.setConsultTimesBox.saveErrorTips"),
          });
        });
    },
    statusToText(status) {
      let _status = Enum.getServerNodeStage(status);
      switch (_status) {
        case 0:
          return this.$t("management.status.noStart");
        case 1:
          return this.$t("management.status.consultLabel0");
        case 2:
          return this.$t("management.status.consultLabel1");
        // case 11:
        //   return this.$t("management.status.collection");
        // case 12:
        //   return this.$t("management.status.discussion");
        // case 21:
        //   return this.$t("management.status.consultation");
        // case 31:
        //   return this.$t("management.status.fllowup");
        // case 32:
        //   return this.$t("management.status.update");
        // case 41:
        //   return this.$t("management.status.asupport");
        // case 42:
        //   return this.$t("management.status.support");
        // case 43:
        //   return this.$t("management.status.monitoring");
        // case 88:
        //   return this.$t("management.status.report");
        // case 99:
        //   return this.$t("management.status.end");
        default:
          return this.$t("management.status.none");
      }
    },
    handleStatusSelect(index) {
      this.statusIndex = index;
      this.page = {
        dataNum: 0,
        total: 10,
        size: 10,
        current: 1,
      };
      this.initList();
    },
    initList() {
      console.log(this.status[this.statusIndex].value);
      this.tableData = [];
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("estuary/getStudentList", {
          pageIndex: this.page.current,
          pageSize: this.page.size,
          keyword: this.value,
          nodeType: this.status[this.statusIndex].value,
        })
        .then((res) => {
          if (res.pageTotal != 0 && res.pageTotal < res.pageIndex) {
            this.page = {
              dataNum: res.total,
              total: res.pageTotal,
              size: 10,
              current: res.pageIndex > 1 ? res.pageIndex - 1 : 1,
            };
            this.initList();
            return;
          }
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
          this.tableData = [];
          this.$message.error({
            text: err || this.$t("live.list.errorTips.nolist"),
          });
        });
    },
    searchWithKeyword() {
      if (this.value == "" || this.value) {
        this.page = {
          keyword: this.value,
          dataNum: 0,
          total: 1,
          size: 10,
          current: 1,
        };
        this.initList();
      }
    },
    goPage(pageNum) {
      this.tableData = [];
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("estuary/getStudentList", {
          pageIndex: parseInt(pageNum),
          pageSize: this.page.size,
          keyword: this.value,
          nodeType: this.status[this.statusIndex].value,
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
          this.tableData = [];
          this.$message.error({
            text: err || this.$t("live.list.errorTips.nolist"),
          });
        });
    },
    currentChange(num) {
      this.tableData = [];
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("estuary/getStudentList", {
          pageIndex: parseInt(num),
          pageSize: this.page.size,
          keyword: this.value,
          nodeType: this.status[this.statusIndex].value,
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
          this.tableData = [];
          this.$message.error({
            text: err || this.$t("live.list.errorTips.nolist"),
          });
        });
    },
    prevPage() {
      this.tableData = [];
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("estuary/getStudentList", {
          pageIndex: this.page.current - 1,
          pageSize: this.page.size,
          keyword: this.value,
          nodeType: this.status[this.statusIndex].value,
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
          this.tableData = [];
          this.$message.error({
            text: err || this.$t("live.list.errorTips.nolist"),
          });
        });
    },
    nextPage() {
      this.tableData = [];
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("estuary/getStudentList", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
          keyword: this.value,
          nodeType: this.status[this.statusIndex].value,
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
          this.tableData = [];
          this.$message.error({
            text: err || this.$t("live.list.errorTips.nolist"),
          });
        });
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
    // overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    .toolsBar {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      .statusSelector {
        width: 120px;
        height: 36px;
      }
      .searchInput {
        width: 300px;
        // margin-left: 12px;
        height: 36px;
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
      .loadTips {
        font-size: 14px;
        color: #d3d3d3;
        line-height: 20px;
        margin-top: 18px;
      }
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
    // margin-top: 24px;
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