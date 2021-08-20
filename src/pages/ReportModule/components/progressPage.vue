<template>
  <div class="ProgressPage" ref="progress">
    <div class="progress">
      <p class="title">目前进度</p>
      <div class="persentBox">
        <canvas
          class="circle"
          ref="circle"
          width="180"
          height="180"
          :src="progressImg"
        />
        <p class="persent">{{ data.data.progress }}%</p>
      </div>
    </div>
    <div class="schedule">
      <p class="title">菁英计划时间表</p>
      <div class="table" ref="table">
        <div class="th">
          <div
            class="tableHeader"
            v-for="(group, gIndex) in schedule"
            :key="`th${gIndex}`"
          >
            <div
              class="tableHeaderItem"
              ref="tableHeaderItem"
              v-for="(item, index) in group"
              :key="`thItem${index}`"
            >
              <div class="tableTitle">
                <p class="month">{{ getMonth(item[0].start) }}月</p>
                <p class="tableItemTitle">
                  {{ data.data.schedule[gIndex].title }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="tb">
          <div
            class="tableBody"
            ref="tableBody"
            v-for="(group, groupIndex) in timeList"
            :key="`tb${groupIndex}`"
          >
            <div
              class="tableBodyItem"
              v-for="(item, index) in group"
              :key="`tbItem${index}`"
            >
              <p class="weekNum">
                第{{ numToChinese(getWeekIndex(groupIndex, index)) }}周
              </p>
              <p class="date">
                {{ getDateString(item.start)
                }}{{
                  item.start == item.end ? ` - ${getDateString(item.end)}` : ""
                }}
              </p>
            </div>
            <div
              class="tableBodyItem"
              v-for="(item, index) in 5 - group.length"
              :key="`tbItem${index + group.length}`"
            >
              <p>-</p>
            </div>
          </div>
        </div>
      </div>
      <div class="openDate" ref="openDate">
        <p>开学日：第九周{{ getDateString(data.data.openDate) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import DateTools from "@/utils/date";
import { numToChinese } from "@/utils/others";
export default {
  props: ["data", "contentHeight", "chapterIndex", "startPage"],
  data() {
    return {
      bigChapterPageInfo: {
        startPage: 1,
        endPage: 1,
      },
      schedule: [],
      chapterPageInfo: null,
      progressImg: "",
      pageStartDom: null,
    };
  },
  computed: {
    timeList() {
      let res = [];
      this.schedule.forEach((item, index) => {
        res = [...res, ...item];
      });
      return res;
    },
  },
  watch: {
    startPage() {
      this.$set(this.bigChapterPageInfo, "startPage", this.startPage);
    },
    bigChapterPageInfo(val) {
      this.$emit(
        "setPageNum",
        this.chapterIndex,
        this.bigChapterPageInfo,
        this.chapterPageInfo,
        {}
      );
    },
    data() {},
    schedule() {
      this.$nextTick(this.initTable);
      let endPage =
        this.startPage +
        Math.ceil(this.$refs.progress.offsetHeight / this.contentHeight) -
        1;
      this.$set(this.bigChapterPageInfo, "endPage", endPage);
    },
  },
  mounted() {
    this.chapterPageInfo = JSON.parse(JSON.stringify(this.data.data));
    this.bigChapterPageInfo = {
      ...this.data,
      startPage: this.startPage,
      endPage: this.startPage,
    };
    this.getPersentCircle();
    this.getMonthSchedule();
    this.initTable();
  },
  methods: {
    numToChinese,
    initTable() {
      this.pageStartDom = this.$refs.progress;
      let pageStartTop = this.pageStartDom.offsetTop;
      let headerItems = this.$refs.tableHeaderItem;
      let tableBody = this.$refs.tableBody;
      if (!headerItems) return;
      for (let i = 0; i < headerItems.length; i++) {
        let lastHeight =
          this.contentHeight - headerItems[i].offsetTop + pageStartTop;
        // console.log(pageStartTop, headerItems[i].offsetTop, lastHeight);
        if (lastHeight < headerItems[i].offsetHeight) {
          headerItems[i - 1].style.marginBottom = `${lastHeight}px`;
          tableBody[i - 1].style.marginBottom = `${lastHeight}px`;
          if (i < headerItems.length - 1) {
            pageStartTop = headerItems[i].offsetTop;
          }
        }
      }
      let openDateDom = this.$refs.openDate;
      let lastHeight =
        this.contentHeight - openDateDom.offsetTop + pageStartTop;
      console.log(lastHeight);
      if (lastHeight < openDateDom.offsetHeight) {
        this.$refs.table.style.marginBottom = `${lastHeight}px`;
      }
      this.$nextTick(() => {
        let thisPage = this.$refs.progress;
        let pageHeight = thisPage.offsetHeight;
        let pageNum = Math.ceil(pageHeight / this.contentHeight);
        let filler = document.createElement("div");
        filler.style.width = "100%";
        filler.style.height = pageNum * this.contentHeight - pageHeight + "px";
        thisPage.appendChild(filler);
        // console.log(pageNum);
      });
    },
    getPersentCircle() {
      let canvas = this.$refs.circle;
      canvas.width = 180;
      canvas.height = 180;
      let ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.arc(90, 90, 90, 0, 2 * Math.PI);
      ctx.fillStyle = "#d3d3d3";
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(90, 90);
      ctx.arc(
        90,
        90,
        90,
        1.5 * Math.PI,
        (1.5 + (2 * this.data.data.progress) / 100) * Math.PI
      );
      ctx.fillStyle = "#013047";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(90, 90, 64, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    },
    getDateString(timestamp) {
      return DateTools.getDateString(timestamp, "MM/DD");
    },
    getMonthSchedule() {
      for (let index = 0; index < this.data.data.schedule.length; index++) {
        let thisItemSchedule = [];
        let existMonth = [];
        for (let i = 0; i < this.data.data.schedule[index].dates.length; i++) {
          let item = this.data.data.schedule[index].dates[i];
          let thisMonth = new Date(item.start).getMonth() + 1;
          if (existMonth.indexOf(thisMonth) > -1) continue;
          existMonth.push(thisMonth);
          let thisMonthSchedule = [];
          thisMonthSchedule.push(item);
          for (
            let j = i + 1;
            j < this.data.data.schedule[index].dates.length;
            j++
          ) {
            let _item = this.data.data.schedule[index].dates[j];
            let _thisMonth = new Date(_item.start).getMonth() + 1;
            if (_thisMonth != thisMonth) continue;
            thisMonthSchedule.push(_item);
          }
          thisMonthSchedule.sort((a, b) => {
            return a.start - b.start;
          });
          thisItemSchedule.push(thisMonthSchedule);
        }
        if (thisItemSchedule.length > 1) {
          thisItemSchedule.sort((a, b) => {
            return a[0].start - b[0].start;
          });
        }
        this.schedule.push(thisItemSchedule);
      }
    },
    getMonth(timestamp) {
      return new Date(timestamp).getMonth() + 1;
    },
    getProjectWeekNum(index) {
      let res = 0;
      for (let i = 0; i < this.schedule[index].length; i++) {
        res += this.schedule[index][i].length;
      }
      return res;
    },
    getWeekIndex(groupIndex, index) {
      let monthIndex = groupIndex;
      let weekIndex = 1;
      for (let i = 0; i < this.schedule.length; i++) {
        let thisProjectMonthNum = this.schedule[i].length;
        if (monthIndex >= thisProjectMonthNum) {
          monthIndex -= thisProjectMonthNum;
        } else {
          for (let j = 0; j < monthIndex; j++) {
            weekIndex += this.schedule[i][j].length;
          }
          weekIndex += index;
          break;
        }
      }
      return weekIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
.ProgressPage {
  background: #fff;
  width: 596px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  .progress {
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-size: 20px;
      font-family: AlibabaPuHuiTiM;
      color: #333333;
      line-height: 27px;
      height: 27px;
      margin-bottom: 10px;
    }
    .persentBox {
      position: relative;
      width: 180px;
      height: 180px;
      .persent {
        font-size: 33px;
        font-family: arialbd;
        color: #013047;
        line-height: 38px;
        height: 38px;
        // margin-top: -4px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
  .schedule {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: fit-content;
    box-sizing: border-box;
    margin-top: 20px;
    .title {
      font-size: 18px;
      font-family: AlibabaPuHuiTiM;
      color: #333333;
      line-height: 25px;
      height: 25px;
      text-align: center;
    }
    .table {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
      .th {
        display: flex;
        flex-direction: column;
        .tableHeader {
          display: flex;
          flex-direction: column;
          .tableHeaderItem {
            display: flex;
            flex-direction: column;
            .tableTitle {
              background-color: #ffb706;
              // padding: 6px 8px 7px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              width: 90px;
              height: 46px;
              p {
                font-size: 12px;
                color: #013047;
                line-height: 17px;
                height: 17px;
                white-space: nowrap;
              }
            }
          }
          .tableHeaderItem + .tableHeaderItem {
            margin-top: 2px;
          }
        }
        .tableHeader + .tableHeader {
          margin-top: 2px;
        }
        .tableHeader:nth-child(even) {
          .tableHeaderItem {
            .tableTitle {
              background-color: #013047;
              p {
                color: #ffffff;
              }
            }
          }
        }
      }
      .tb {
        display: flex;
        flex-direction: column;
        .tableBody {
          display: flex;
          flex-direction: row;
          .tableBodyItem {
            margin-left: 2px;
            background-color: #dcdddd;
            // padding: 6px 8px 7px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 90px;
            height: 46px;
            p {
              font-size: 12px;
              color: #333333;
              line-height: 17px;
              height: 17px;
              white-space: nowrap;
            }
          }
        }
        .tableBody:nth-child(even) {
          .tableBodyItem {
            background-color: #efefef;
          }
        }
        .tableBody + .tableBody {
          margin-top: 2px;
        }
      }
    }
    .openDate {
      width: 100%;
      height: 28px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background: #ffd8c7;
      margin-top: 2px;
      p {
        font-size: 12px;
        color: #333333;
        line-height: 17px;
        height: 17px;
      }
    }
  }
}
</style>