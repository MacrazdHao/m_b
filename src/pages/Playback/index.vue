<template>
  <div class="Playback">
    <div class="list-content">
      <div class="toolsBar">
        <el-select
          v-model="value"
          :placeholder="$t('playback.list.statusPlaceholder')"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <SInput
          class="searchInput"
          :placeholder="$t('playback.list.searchPlaceholder')"
          :icon="require('@/assets/student/icon_seach.svg')"
        />
        <SButton class="button" :text="$t('playback.list.searchButton')" />
      </div>
      <div class="table">
        <el-table :data="tableData" height="642" style="width: 100%">
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("playback.list.table.school") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.school) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("playback.list.table.name") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.name) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("playback.list.table.grade") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(scope.row.grade) }}</p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("playback.list.table.process") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">
                {{
                  overline(
                    $tc("playback.list.table.processText", scope.row.process)
                  )
                }}
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
                  @click="showRecords(scope.$index)"
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
    <RightDrawer ref="playbackList" :title="$t('playback.list.list.title')">
      <div class="recordsList">
        <p class="subtitle">{{ $t("playback.list.list.subtitle") }}</p>
        <div
          class="record"
          v-for="(item, index) in tableData[playbackIndex].records"
          :key="index"
        >
          <p class="processTitle">{{ item.process }}</p>
          <p class="playbackButton">回看</p>
        </div>
      </div>
    </RightDrawer>
  </div>
</template>

<script>
import SInput from "./components/input";
import SButton from "@/components/common/button.vue";
import RightDrawer from "@/components/common/rightDrawer.vue";
export default {
  components: {
    SInput,
    SButton,
    RightDrawer,
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      tableData: [
        {
          id: 999,
          school: "超级无敌霸王阿斯顿发送到发斯蒂芬阿斯蒂芬阿斯蒂芬大学",
          name: "梁湛霞",
          grade: "高一(三)班",
          process: 0,
          records: [
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
          ],
        },
        {
          id: 999,
          school: "超级无敌霸王阿斯顿发送到发斯蒂芬阿斯蒂芬阿斯蒂芬大学",
          name: "梁湛霞",
          grade: "高一(三)班",
          process: 1,
          records: [
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
          ],
        },
        {
          id: 999,
          school: "超级无敌霸王阿斯顿发送到发斯蒂芬阿斯蒂芬阿斯蒂芬大学",
          name: "梁湛霞",
          grade: "高一(三)班",
          process: 2,
          records: [
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
            {
              id: 999,
              process: "职业发展咨询 1-1",
            },
          ],
        },
      ],
      pageNum: 1,
      page: {
        dataNum: 1000,
        total: 100,
        size: 10,
        current: 1,
      },
      playbackIndex: 0,
    };
  },
  mounted() {},
  methods: {
    showRecords(index) {
      this.playbackIndex = index;
      this.$refs.playbackList.openDrawer();
    },
    toStatusText(code) {
      switch (code) {
        case 0:
          return "未出报告";
        case 1:
          return "完成报告";
      }
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
      .searchInput {
        width: 300px;
        margin-left: 12px;
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