<template>
  <div class="Messages">
    <div class="messageBox">
      <p class="loadTips" v-if="loading">
        {{ $t("messages.emptyTips.loadingList") }}
      </p>
      <p class="loadTips" v-if="messages.length == 0 && !error && !loading">
        {{ $t("messages.emptyTips.emptyList") }}
      </p>
      <p class="loadTips" v-if="error">{{ $t("messages.errorTips.nolist") }}</p>
      <div class="messageItemBox" v-if="!loading">
        <div class="message" v-for="(item, index) in messages" :key="index">
          <div class="messageTitle" @click="showMessages(index)">
            <div class="titleBox">
              <p>{{ item.title }}</p>
              <div v-show="!item.readStatus"></div>
            </div>
            <div class="timeBox">
              <p v-if="item.gmtCreate">{{ getDateString(item.gmtCreate) }}</p>
              <img
                :class="[opening[index] ? 'pull--show' : 'pull--hide']"
                src="@/assets/knowledge/icon_pull.svg"
              />
            </div>
          </div>
          <div class="content" :id="`child${item.id}`">
            <div class="contentHtml" v-html="item.message"></div>
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
import FileBox from "./components/file";
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
      messages: [
        {
          id: 100,
          title: "“家长账号”已成功创建，家长账号只能创建一个",
          time: "2020-09-21 16:47",
          isRead: false,
          content: "“家长账号”已成功创建，家长账号只能创建一个",
        },
        {
          id: 999,
          title: "“职业发展咨询”即将开始，请准时进入直播间进行咨询",
          time: "2020-09-21 16:47",
          isRead: true,
          content: "<a>点击跳转到页面</a>",
        },
      ],
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
  },
  mounted() {
    if (!this.$route.query.timestamp) {
      this.$router.push({
        path: "/index/messages",
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
        .dispatch("user/getMessages", {
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
            dataNum: res.data.total,
            total: res.data.pages,
            size: 10,
            current: this.page.current,
          };
          this.messages = res.data.records;
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
    showMessages(index) {
      this.opening[index] = !this.opening[index];
      this.$forceUpdate();
      this.menuAnimate(
        document.getElementById(`child${this.messages[index].id}`),
        !this.opening[index]
      );
      this.readMessage(index);
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
        .dispatch("user/readMessages", this.messages[index].id)
        .then((res) => {
          this.$set(this.messages, index, {
            ...this.messages[index],
            readStatus: true,
          });
          this.$store.dispatch("user/getUnreadNum");
        })
        .catch((err) => {
          // console.log("错，这是新数据", err);
        });
    },
    goPage(pageNum) {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("user/getMessages", {
          pageIndex: parseInt(pageNum),
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.data.total,
            total: res.data.pages,
            size: 10,
            current: parseInt(pageNum),
          };
          this.messages = res.data.records;
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
        .dispatch("user/getMessages", {
          pageIndex: parseInt(num),
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.data.total,
            total: res.data.pages,
            size: 10,
            current: parseInt(num),
          };
          this.messages = res.data.records;
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
        .dispatch("user/getMessages", {
          pageIndex: this.page.current - 1,
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.data.total,
            total: res.data.pages,
            size: 10,
            current: this.page.current - 1,
          };
          this.messages = res.data.records;
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
        .dispatch("user/getMessages", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
          type: 1,
        })
        .then((res) => {
          this.page = {
            dataNum: res.data.total,
            total: res.data.pages,
            size: 10,
            current: this.page.current + 1,
          };
          this.messages = res.data.records;
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
.Messages {
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
.Messages {
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
  .loadTips {
    font-size: 14px;
    color: #d3d3d3;
    line-height: 20px;
    margin-top: 40px;
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
    .messageItemBox {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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
        .content {
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
          .contentHtml {
            margin-bottom: 18px;
            font-size: 14px;
            line-height: 20px;
            text-align: left;
            // a {
            //   cursor: pointer;
            //   color: #4b77f6;
            // }
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