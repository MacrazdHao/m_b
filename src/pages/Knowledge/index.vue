<template>
  <div class="Knowledge">
    <div class="messageBox">
      <div class="message" v-for="(item, index) in messages" :key="index">
        <div class="messageTitle" @click="showFiles(index)">
          <div class="titleBox">
            <p>{{ item.title }}</p>
            <div v-show="!item.isRead"></div>
          </div>
          <div class="timeBox">
            <p>{{ item.time || "" }}</p>
            <img
              :class="[opening[index] ? 'pull--show' : 'pull--hide']"
              src="@/assets/knowledge/icon_pull.svg"
            />
          </div>
        </div>
        <div class="fileList" :id="`child${item.id || index}`">
          <p class="tips">{{ $t("knowledge.fileTips") }}：</p>
          <div class="filesBox">
            <!-- <div
              class="file"
              v-for="(item2, index2) in item.files"
              :key="index2"
            >
              <FileBox :info="item2" />
            </div> -->
            <div class="file">
              <FileBox
                :info="{
                  fileName: item.reportName,
                  fileType: 'pdf',
                }"
                :buttonText="$t('knowledge.watchButton')"
                @btnClick="watchReport(index)"
              />
            </div>
          </div>
        </div>
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
import FileBox from "@/components/common/file";
import DateTools from "@/utils/date";
export default {
  components: {
    FileBox,
    SPagination,
  },
  data() {
    return {
      loading: false,
      error: false,
      opening: [],
      messages: [],
      pageNum: 1,
      page: {
        dataNum: 0,
        total: 10,
        size: 10,
        current: 1,
      },
    };
  },
  computed: {
    timestamp() {
      return this.$route.query.timestamp;
    },
  },
  watch: {
    timestamp(val) {
      console.log(val);
      this.page = {
        dataNum: 0,
        total: 10,
        size: 10,
        current: 1,
      };
      this.messages = [];
      this.initList();
    },
    loading(val) {
      if (val) {
        this.tableData = [];
      }
    },
  },
  mounted() {
    if (!this.$route.query.timestamp) {
      this.$router.push({
        path: "/index/knowledge",
        query: { timestamp: new Date().getTime() },
      });
      return;
    }
    this.page = {
      dataNum: 0,
      total: 10,
      size: 10,
      current: 1,
    };
    this.messages = [];
    this.initList();
  },
  methods: {
    ...DateTools,
    initList() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("knowledge/getMessages", {
          pageIndex: this.page.current,
          pageSize: this.page.size,
          type: 1,
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
          this.messages = res.data;
          this.opening = Array.apply(null, Array(this.messages.length)).map(
            () => false
          );
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.messages = [];
          this.$message.error({
            text: err || this.$t("messages.errorTips.nolist"),
          });
        });
    },
    showFiles(index) {
      this.opening[index] = !this.opening[index];
      this.$forceUpdate();
      this.menuAnimate(
        document.getElementById(`child${this.messages[index].id || index}`),
        !this.opening[index]
      );
    },
    watchReport(index) {
      // 待修改：查看报告
    },
    menuAnimate(element, hide) {
      element.style.padding = "12px 30px 0 30px";
      element.style.borderBottom = "1px solid #d3d3d3";
      element.style.height = "auto";
      element.style.opacity = "1";
      let targetHeight = window.getComputedStyle(element).height;
      let targetPadding = "12px 30px 0 30px";
      let targetBorderBottom = "1px solid #d3d3d3";
      element.style.height = hide ? targetHeight : "0";
      element.style.padding = hide ? targetPadding : "0 30px";
      element.style.borderBottom = hide
        ? targetBorderBottom
        : "0px solid #d3d3d3";
      element.style.opacity = hide ? "1" : "0";
      setTimeout(() => {
        element.style.height = hide ? "0" : targetHeight;
        element.style.padding = hide ? "0 30px" : targetPadding;
        element.style.borderBottom = hide
          ? "0px solid #d3d3d3"
          : targetBorderBottom;
        element.style.opacity = hide ? "0" : "1";
      });
    },
    readMessage(index) {
      if (this.messages[index].readStatus) return;
      this.$store
        .dispatch("knowledge/readMessages", this.messages[index].id)
        .then((res) => {
          this.$set(this.messages, index, {
            ...this.messages[index],
            readStatus: true,
          });
          this.$store.dispatch("knowledge/getUnreadNum");
        })
        .catch((err) => {
          // console.log("错，这是新数据", err);
        });
    },
    goPage(pageNum) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("knowledge/getMessages", {
          pageIndex: parseInt(pageNum),
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: parseInt(pageNum),
          };
          this.messages = res.data;
          this.opening = Array.apply(null, Array(this.messages.length)).map(
            () => false
          );
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.messages = [];
          this.$message.error({
            text: err || this.$t("messages.errorTips.nolist"),
          });
        });
    },
    currentChange(num) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("knowledge/getMessages", {
          pageIndex: parseInt(num),
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: parseInt(num),
          };
          this.messages = res.data;
          this.opening = Array.apply(null, Array(this.messages.length)).map(
            () => false
          );
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.messages = [];
          this.$message.error({
            text: err || this.$t("messages.errorTips.nolist"),
          });
        });
    },
    prevPage() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("knowledge/getMessages", {
          pageIndex: this.page.current - 1,
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: this.page.current - 1,
          };
          this.messages = res.data;
          this.opening = Array.apply(null, Array(this.messages.length)).map(
            () => false
          );
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.messages = [];
          this.$message.error({
            text: err || this.$t("messages.errorTips.nolist"),
          });
        });
    },
    nextPage() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("knowledge/getMessages", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: 10,
            current: this.page.current + 1,
          };
          this.messages = res.data;
          this.opening = Array.apply(null, Array(this.messages.length)).map(
            () => false
          );
          this.loading = false;
        })
        .catch((err) => {
          this.loading = false;
          this.error = true;
          this.messages = [];
          this.$message.error({
            text: err || this.$t("messages.errorTips.nolist"),
          });
        });
    },
    removeEnterEvent() {
      document.onkeydown = () => {};
    },
  },
};
</script>

<style lang="scss">
.Knowledge {
  .pagination {
    .el-pagination {
      padding: 0;
      font-weight: normal;
    }
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      margin: 0 6px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #4b77f6;
    }
    .el-pager li {
      font-size: 14px;
      line-height: 30px;
      height: 30px;
    }
  }
}
</style>

<style lang="scss" scoped>
.Knowledge {
  background: #fff;
  box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
  width: 100%;
  min-height: 792px;
  margin-bottom: 24px;
  padding-bottom: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
  }
  .messageBox {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // .message:last-child {
    //   .messageTitle {
    //     border-bottom: 0px solid #d3d3d3;
    //   }
    // }
    .message {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .messageTitle {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 20px 24px;
        box-sizing: border-box;
        border-bottom: 1px solid #d3d3d3;
        cursor: pointer;
        .titleBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          max-width: calc(100% - 200px);
          p {
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div {
            width: 6px;
            height: 6px;
            background: #ff4d4f;
            border-radius: 6px;
            margin-left: 16px;
          }
        }
        .timeBox {
          display: flex;
          flex-direction: row;
          p {
            font-size: 14px;
            color: #999999;
            line-height: 20px;
          }
          img {
            width: 12px;
            margin-left: 12px;
            transition: all 0.3s;
          }
          .pull--show {
            transform: rotate(360deg);
          }
          .pull--hide {
            transform: rotate(180deg);
          }
        }
      }
      .fileList {
        height: 0;
        overflow: hidden;
        padding: 0 30px;
        border-bottom: 0px solid #d3d3d3;
        opacity: 0;
        transition: all 0.3s ease;
        width: calc(100% - 60px);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        // box-sizing: border-box;
        .tips {
          font-size: 14px;
          color: #666666;
          line-height: 20px;
        }
        .filesBox {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          margin-top: 16px;
          .file {
            margin-right: 30px;
            margin-bottom: 18px;
          }
        }
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