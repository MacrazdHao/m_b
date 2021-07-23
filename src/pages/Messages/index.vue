<template>
  <div class="Messages">
    <div class="messageBox">
      <div class="message" v-for="(item, index) in messages" :key="index">
        <div class="messageTitle" @click="showFiles(index)">
          <div class="titleBox">
            <p>{{ item.title }}</p>
            <div v-show="!item.isRead"></div>
          </div>
          <div class="timeBox">
            <p>{{ item.time }}</p>
            <img
              :class="[opening[index] ? 'pull--show' : 'pull--hide']"
              src="@/assets/knowledge/icon_pull.svg"
            />
          </div>
        </div>
        <div class="content" :id="`child${item.id}`">
          <div class="contentHtml" v-html="item.content"></div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <p class="totalNum">
        {{ $t("global.pagination.totalNum", { num: messages.length }) }}
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
import FileBox from "./components/file";
export default {
  components: {
    FileBox,
  },
  data() {
    return {
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
        total: 100,
        size: 10,
        current: 1,
      },
    };
  },
  mounted() {
    this.opening = Array.apply(null, Array(this.messages.length)).map(
      () => false
    );
    // console.log(this.opening);
  },
  methods: {
    showFiles(index) {
      this.opening[index] = !this.opening[index];
      this.$forceUpdate();
      this.menuAnimate(
        document.getElementById(`child${this.messages[index].id}`),
        !this.opening[index]
      );
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
          // a {
          //   cursor: pointer;
          //   color: #4b77f6;
          // }
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