<template>
  <div class="List">
    <div class="list-content">
      <div class="toolsBar">
        <el-select
          v-model="value"
          :placeholder="$t('students.list.statusPlaceholder')"
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
          :placeholder="$t('students.list.searchPlaceholder')"
          :icon="require('@/assets/student/icon_seach.svg')"
        />
        <SButton class="button" :text="$t('students.list.searchButton')" />
      </div>
      <div class="table">
        <el-table :data="tableData" height="642" style="width: 100%">
          <el-table-column min-width="100px" fixed>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.school") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.school) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" fixed>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.name") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.name) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" sortable>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("students.list.table.grade") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(scope.row.grade) }}</p>
            </template>
          </el-table-column>
          <el-table-column min-width="100px" sortable>
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
                      scope.row.status == 0
                        ? 'dot'
                        : scope.row.status == 4
                        ? 'dot--finish'
                        : 'dot--doing',
                    ]"
                  ></div>
                </div>
                <p class="tableRow-text">
                  {{
                    overline(
                      $t(
                        `students.list.table.consultStatusText${scope.row.status}`
                      )
                    )
                  }}
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column min-width="100px">
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
                  {{ $t("students.list.table.watchButton") }}
                </p> -->
              <FixedMenu
                :menuId="`schoolS${scope.$index}${new Date().getTime()}`"
                :text="$t('school.students.moreButton')"
                :menu="optionsMenu"
                :extra="scope.row"
              />
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
  </div>
</template>

<script>
import SInput from "../components/input";
import SButton from "@/components/common/button.vue";
import FixedMenu from "@/components/common/fixedMenu.vue";
import Bus from "../utils/bus";
export default {
  components: {
    SInput,
    SButton,
    FixedMenu,
  },
  data() {
    return {
      school: null,
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
          school: "华南师范大学附属中学国际部",
          name: "梁湛霞",
          grade: "高一(三)班",
          sex: "女生",
          country: "中国",
          score:
            "数学:B、物理:B、政治:A、英语:A、社会学:A、统计学:C、历史:B、经济学:B、社会及环境生",
          selfAssess:
            "学习生活方面自我评价 在本学年,本人在学习上，严格要求自己，刻苦钻研，勤奋好学，态度端正，目",
          extraStudy: "现在有参加数学、物理和经济学的课外补习",
          books:
            "《异类》、《秘密花园》、《人性的枷锁》、《傲慢与偏见》、《风格练习》、《历史的终结与最后",
          sports: "篮球、羽毛球、乒乓球、高尔夫、保龄球",
          testReport: "这是评测报告",
          career: {
            introduce:
              "很高兴见到Alina，她在学校宿舍进行此次测评。Alina很放松，易于交谈。",
            discuss:
              "在我们的会面中，Alina描述了她在学校学习的所有科目。她最爱的科目有经济学、计算机科学和数学，并认为可能最擅长语文和数学，因为中文是她的母语，所以觉得最简单。Alina认为化学是最难的科目，同时也很喜欢这门课。她说:“化学很有趣，但也很困难。”我们谈到了面对挑战带来的好处，她提出了一些明智的观点。谈到家庭，Alina认为父母慈爱善良，让她自己解决问题，在她有需要的时候给予支持。她描述了每周与父母和妹妹弟弟通两次电话的情况，还描述了往返学校和家的路途。我问Alina当iGCSE考试结束后，她对A level科目的选择有什么想法。她说她可能会选修数学、高等数学、经济学、物理和计算机科学。我从学校网站上了解到通常是第一年修数学，第二年再修高等数学，所以这样的选择是可行的。 当被问及在考虑什么职业时，Alina的回答是:商学、计算机工作或“设计师”。为了更准确地了解她的想法，我问了许多问题。她谈了更多关于她对建筑设计的兴趣，这引发了一场活跃的对话，Alina对这个领域展现出了真正的兴趣。当被问及建筑师需要哪些知识和技能时，Alina正确回答出数学和物理，然后补充了计算机科学，并问艺术是否也有帮助。我告诉Alina，英国的大学现在需要艺术、设计或建筑研究的作品集作为入学要求的一部分。Alina认为一名优秀的建筑师能还需要想象力。我让她说出一些她喜欢的建筑，她首先说的是比萨斜塔。当被问到为什么喜欢它时，她的回答比较肤浅：因为它倾斜着却没有倒塌，这太神奇了。我迫使她用逻辑思考，如果比萨斜塔倒塌了，或者并不是倾斜的，它是否仍能举世瞩目! 她知道这会变得非常不同，但她说她仍然喜欢这座塔的风格和年代，所以即使塔不是倾斜的她也仍会喜欢这座建筑。她表示紫禁城是她另一座欣赏的建筑。我们讨论了这座建筑的优点，然后我问她将如何利用她对这两座建筑的欣赏来帮助她设计现代建筑。虽然Alina的推论并不成熟，但她提出了一些很好的观点。",
            summary: "总结",
            advise: "建议",
          },
          teacher: "Dr Steve Bailey",
          consult: [
            {
              time: 1618992995,
              status: 1,
            },
            {
              time: null,
              status: 0,
            },
            {
              time: null,
              status: 0,
            },
          ],
          status: 0,
        },
      ],
      pageNum: 1,
      page: {
        dataNum: 1000,
        total: 100,
        size: 10,
        current: 1,
      },
      optionsMenu: [
        {
          text: this.$t("school.students.watchButton"),
          callback: (info) => {
            this.toDetail(info);
          },
        },
        {
          text: this.$t("school.students.deleteButton"),
          callback: (info) => {
            this.deleteInfo(info);
          },
        },
      ],
    };
  },
  mounted() {
    // 后期修改如果能够通过请求获取到学校详情，则传query到这个页面即可，不再需要使用Bus
    this.school = Bus.getSchoolInfo();
    if (!this.school) {
      this.$router.go(-1);
      return;
    }
    this.$emit("setSuffixMenu", [this.school.orgName]);
  },
  methods: {
    toDetail(info) {
      Bus.setStudentInfo(info);
      this.$router.push({
        name: "sdetail",
      });
    },
    deleteInfo(info) {
      console.log("删除", info);
      this.$dialog
        .warning({
          text: [
            this.$t(`school.students.deleteTips1`),
            this.$t(`school.students.deleteTips2`),
          ],
        })
        .catch(() => {});
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