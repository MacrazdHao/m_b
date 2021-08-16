<template>
  <div class="Students">
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
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.school") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.schoolName) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.code") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ scope.row.userCode }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.name") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.nickName) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.grade") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(scope.row.gradeName) }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.status") }}
              </p>
            </template>
            <template slot-scope="scope">
              <div class="statusBox">
                <div class="dotBox">
                  <div
                    :class="[
                      scope.row.nodeType == 0 || !scope.row.nodeType
                        ? 'dot'
                        : scope.row.nodeType == 99
                        ? 'dot--finish'
                        : 'dot--doing',
                    ]"
                  ></div>
                </div>
                <p class="tableRow-text">
                  {{ statusToText(scope.row.nodeType) }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column width="100px">
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.options") }}
              </p>
            </template>
            <template slot-scope="scope">
              <!-- <p
                class="tableRow-text tableRow-button"
                @click="toDetail(scope.row)"
              >
                {{ $t("students.list.table.editButton") }}
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
import PSelector from "@/components/common/selector";
import FixedMenu from "@/components/common/fixedMenu.vue";
import defaultBackMixin from "@/mixins/defaultBack";
export default {
  mixins: [defaultBackMixin],
  components: {
    SPagination,
    SInput,
    SButton,
    PSelector,
    FixedMenu,
  },
  data() {
    return {
      school: null,
      loading: false,
      error: false,
      status: [
        { text: this.$t("management.status.all"), value: -1 },
        { text: this.$t("management.status.noStart"), value: 0 },
        { text: this.$t("management.status.collection"), value: 11 },
        { text: this.$t("management.status.testing"), value: 12 },
        { text: this.$t("management.status.discussion"), value: 13 },
        { text: this.$t("management.status.consultation"), value: 21 },
        { text: this.$t("management.status.fllowup"), value: 31 },
        { text: this.$t("management.status.update"), value: 32 },
        { text: this.$t("management.status.asupport"), value: 41 },
        { text: this.$t("management.status.support"), value: 42 },
        { text: this.$t("management.status.monitoring"), value: 43 },
        { text: this.$t("management.status.report"), value: 88 },
        { text: this.$t("management.status.end"), value: 99 },
      ],
      statusIndex: 0,
      value: "",
      tableData: [],
      pageNum: 1,
      page: {
        dataNum: 0,
        total: 1,
        size: 10,
        current: 1,
      },
      optionsMenu: [
        {
          text: this.$t("school.students.watchButton"),
          callback: (info, index) => {
            this.toDetail(info);
          },
        },
        {
          text: this.$t("school.students.deleteButton"),
          callback: (info, index) => {
            this.deleteInfo(info);
          },
        },
      ],
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
    this.initInfo();
  },
  methods: {
    initInfo() {
      this.$store
        .dispatch("school/getSchoolInfo", this.$route.query.id)
        .then((res) => {
          this.school = res.data;
          this.$emit("setSuffixMenu", [this.school.orgName]);
          this.initList();
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("school.students.getInfoErrorTips"),
          });
          this.goBack();
        });
    },
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
        .dispatch("school/getStudentList", {
          pageIndex: this.page.current,
          pageSize: this.page.size,
          keyword: this.value,
          schoolId: this.$route.query.id,
          nodeType: this.status[this.statusIndex].value,
        })
        .then((res) => {
          if (res.pageTotal < res.pageIndex) {
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
            text: this.$t("school.students.getInfoErrorTips"),
          });
          this.goBack();
        });
    },
    searchLiveWithKeyword() {
      if (this.value == "" || this.value) {
        this.page = {
          keyword: this.value,
          schoolId: this.$route.query.id,
          dataNum: 0,
          total: 1,
          size: 10,
          current: 1,
        };
        this.initList();
      }
    },
    toDetail(info) {
      // this.$emit("toDetail", info);
      this.$router.push({
        path: "/index/school/sdetail",
        query: {
          id: info.userId,
        },
      });
    },
    deleteInfo(info) {
      this.$dialog.warning({
        text: [
          this.$t("school.list.deleteTips1"),
          this.$t("school.list.deleteTips2"),
        ],
        confirm: () => {
          console.log(info);
          this.$store
            .dispatch("school/deleteStudent", info.userId)
            .then((res) => {
              this.$message.message({
                text: this.$t("school.list.successTips.deleteSuccess"),
              });
              this.initList();
            })
            .catch((err) => {
              this.$message.error({
                text: this.$t("school.list.errorTips.deleteFail"),
              });
            });
        },
        cancel: () => {},
      });
    },
    overline(text = "") {
      if (!text) return "";
      return text.substring(0, 40) + (text.length > 30 ? "..." : "");
    },
    goPage(pageNum) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("school/getStudentList", {
          pageIndex: parseInt(pageNum),
          pageSize: this.page.size,
          keyword: this.value,
          schoolId: this.$route.query.id,
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("school/getStudentList", {
          pageIndex: parseInt(num),
          pageSize: this.page.size,
          keyword: this.value,
          schoolId: this.$route.query.id,
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("school/getStudentList", {
          pageIndex: this.page.current - 1,
          pageSize: this.page.size,
          keyword: this.value,
          schoolId: this.$route.query.id,
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
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("school/getStudentList", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
          keyword: this.value,
          schoolId: this.$route.query.id,
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
.Students {
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
.Students {
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