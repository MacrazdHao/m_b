<template>
  <div class="Playback">
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
        <!-- <SButton
          class="button"
          :text="$t('live.list.searchButton')"
          @btnClick="showRecords"
        /> -->
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
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.school") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ scope.row.schoolName }}</p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("live.list.table.name") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.nickName) }}
              </p>
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
                {{ statusToText(scope.row.nodeType) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column width="80">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("playback.list.table.options") }}
              </p>
            </template>
            <template slot-scope="scope">
              <div class="buttons">
                <p
                  :class="['tableRow-text', 'tableRow-button']"
                  @click="showRecords(scope.row.userId)"
                >
                  {{ $t("playback.list.table.watchButton") }}
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
    <RightDrawer ref="playbackList" :title="$t('playback.list.list.title')">
      <div class="recordsList">
        <p class="subtitle">{{ $t("playback.list.list.subtitle") }}</p>
        <div class="record" v-for="(item, index) in recordList" :key="index">
          <p class="processTitle">{{ item.liveName }}</p>
          <p class="playbackButton" @click="watchRecord(item.videoRecord)">
            {{ $t("playback.list.playbackButton") }}
          </p>
        </div>
      </div>
    </RightDrawer>
  </div>
</template>

<script>
import SInput from "./components/input";
import SButton from "@/components/common/button.vue";
import RightDrawer from "@/components/common/rightDrawer.vue";
import PSelector from "@/components/common/selector";
import SPagination from "@/components/common/pagination";
import DateUtils from "@/utils/date";
export default {
  components: {
    SInput,
    SButton,
    RightDrawer,
    PSelector,
    SPagination,
  },
  data() {
    return {
      loading: false,
      error: false,
      status: [
        { text: this.$t("live.list.status.all"), value: -2 },
        { text: this.$t("live.list.status.living"), value: 1 },
        { text: this.$t("live.list.status.notStart"), value: 0 },
        { text: this.$t("live.list.status.end"), value: -1 },
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
      recordList: [],
      loadedRecordList: false,
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
    statusToText(status) {
      switch (status) {
        case 0:
          return this.$t("management.status.noStart");
        case 11:
          return this.$t("management.status.collection");
        case 12:
          return this.$t("management.status.discussion");
        case 21:
          return this.$t("management.status.consultation");
        case 31:
          return this.$t("management.status.fllowup");
        case 32:
          return this.$t("management.status.update");
        case 41:
          return this.$t("management.status.asupport");
        case 42:
          return this.$t("management.status.support");
        case 43:
          return this.$t("management.status.monitoring");
        case 88:
          return this.$t("management.status.report");
        case 99:
          return this.$t("management.status.end");
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("playback/getLiveList", {
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
    showRecords(studentId) {
      this.loadedRecordList = false;
      this.$store
        .dispatch("playback/getRecordList", studentId)
        .then((res) => {
          this.loadedRecordList = true;
          this.recordList = res.data;
          this.$refs.playbackList.openDrawer();
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            text: this.$t("playback.list.getRecordListErrorTips"),
          });
        });
    },
    watchRecord(url) {
      window.open(this.$_default.ossUrl + url);
    },
    overline(text = "") {
      if (!text) return "";
      return text.substring(0, 40) + (text.length > 30 ? "..." : "");
    },
    goPage(pageNum) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("playback/getLiveList", {
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
        .dispatch("playback/getLiveList", {
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
        .dispatch("playback/getLiveList", {
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
        .dispatch("playback/getLiveList", {
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
.Playback {
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
.Playback {
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
        margin-right: 12px;
      }
      .searchInput {
        width: 300px;
        height: 36px;
        margin-right: 12px;
      }
      .button {
        padding: 7px 20px;
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
  .recordsList {
    margin-bottom: 30px;
    .subtitle {
      font-size: 16px;
      color: #333333;
      line-height: 22px;
      text-align: left;
      margin-bottom: 8px;
    }
    .record {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #d3d3d3;
      .processTitle {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
      }
      .playbackButton {
        font-size: 14px;
        color: #4b77f6;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>