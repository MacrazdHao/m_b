<template>
  <div class="Live">
    <div class="list-content">
      <div class="toolsBar">
        <PSelector
          class="statusSelector"
          :items="status"
          :index="statusIndex"
          :border="true"
          @handleSelect="handleStatusSelect"
        />
        <SInput
          class="searchInput"
          :placeholder="$t('live.list.searchPlaceholder')"
          :icon="require('@/assets/student/icon_seach.svg')"
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
          @btnClick="searchLiveWithKeyword"
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
          <el-table-column fixed>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.name") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.studentName) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.code") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ scope.row.userCode }}</p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.grade") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(scope.row.gradeName) }}</p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.process") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">
                {{
                  overline(
                    $tc("live.list.table.processText", scope.row.process)
                  )
                }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.time") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ getDateString(scope.row.time) }}</p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.status") }}
              </p>
            </template>
            <template slot-scope="scope">
              <div class="statusBox">
                <div
                  :class="[
                    scope.row.status == 1 ? 'dot--finish' : 'dot--waiting',
                  ]"
                ></div>
                <p class="tableRow-text">
                  {{
                    overline(
                      $tc("live.list.table.statusText", scope.row.status)
                    )
                  }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.options") }}
              </p>
            </template>
            <template slot-scope="scope">
              <div class="buttons">
                <p
                  :class="[
                    'tableRow-text',
                    'tableRow-button',
                    scope.row.status <= 1 &&
                    scope.row.time < new Date().getTime()
                      ? 'tableRow-button--disabled'
                      : '',
                  ]"
                  @click="toLiving(scope.row)"
                >
                  {{ $t("live.list.table.watchButton") }}
                </p>
              </div>
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
import SInput from "./components/input";
import SButton from "@/components/common/button.vue";
import PSelector from "@/components/common/selector";
import DateUtils from "@/utils/date";
export default {
  components: {
    SPagination,
    SInput,
    SButton,
    PSelector,
  },
  data() {
    return {
      loading: false,
      error: false,
      status: [
        { text: this.$t("live.list.status.all"), value: -1 },
        { text: this.$t("live.list.status.living"), value: 1 },
        { text: this.$t("live.list.status.notStart"), value: 0 },
        { text: this.$t("live.list.status.end"), value: 2 },
      ],
      statusIndex: 0,
      value: "",
      tableData: [],
      page: {
        dataNum: 0,
        total: 1,
        size: 10,
        current: 1,
      },
    };
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
    ...DateUtils,
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("live/getLiveList", {
          pageIndex: this.page.current,
          pageSize: this.page.size,
          keyword: this.value,
          status: this.status[this.statusIndex].value,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: 1,
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
    searchLiveWithKeyword() {
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
    toLiving(info) {
      if (info.status > 1) {
        this.$message.warning({ text: "直播暂已结束" });
        return;
      }
      if (info.time > new Date().getTime()) {
        this.$message.warning({ text: "直播暂未开始，请留意直播时间" });
        return;
      }
      this.$router.push({ name: "living", query: { roomId: info.id } });
    },
    overline(text = "") {
      if (!text) return "";
      return text.substring(0, 40) + (text.length > 30 ? "..." : "");
    },
    goPage(pageNum) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("live/getLiveList", {
          pageIndex: parseInt(pageNum),
          pageSize: this.page.size,
          keyword: this.value,
          status: this.status[this.statusIndex].value,
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("live/getLiveList", {
          pageIndex: parseInt(num),
          pageSize: this.page.size,
          keyword: this.value,
          status: this.status[this.statusIndex].value,
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("live/getLiveList", {
          pageIndex: this.page.current - 1,
          pageSize: this.page.size,
          keyword: this.value,
          status: this.status[this.statusIndex].value,
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("live/getLiveList", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
          keyword: this.value,
          status: this.status[this.statusIndex].value,
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
.Live {
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
    // .el-table th:nth-last-child(2) {
    //   .cell {
    //     justify-content: flex-end;
    //   }
    // }
  }
}
</style>
<style lang="scss" scoped>
.Live {
  // height: 792px;
  box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
  background: #fff;
  margin-bottom: 24px;
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
      .statusSelector {
        width: 120px;
        height: 36px;
      }
      .searchInput {
        width: 300px;
        margin-left: 12px;
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
      .tableRow-button--disabled {
        color: #999999 !important;
      }
      .buttons {
        display: flex;
        flex-direction: row;
        // justify-content: flex-end;
        .tableRow-button {
          color: #4b77f6;
          cursor: pointer;
          white-space: nowrap;
        }
        .tableRow-button + .tableRow-button {
          margin-left: 30px;
        }
      }
    }
  }
}
</style>