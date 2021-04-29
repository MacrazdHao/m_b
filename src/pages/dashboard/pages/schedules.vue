<template>
  <div class="Calendar">
    <div class="info-item">
      <div class="calendarBox">
        <div class="header">
          <p class="date">{{ `${currentYear}年${calendarMonth}月` }}</p>
          <ToggleGroup
            :value="calendarMonth - (currentMonth - 1)"
            :items="calendarToggles"
          />
        </div>
        <div class="weekday">
          <p>一</p>
          <p>二</p>
          <p>三</p>
          <p>四</p>
          <p>五</p>
          <p>六</p>
          <p>日</p>
        </div>
        <div class="calendar">
          <div
            :class="[
              'day',
              (item > 25 && index < 7) || (item < 13 && index > 28)
                ? ''
                : 'thismonthday',
              currentMonth + '-' + currentDay ==
              (item > 25 && index < 6
                ? calendarMonth - 1
                : item < 13 && index > 27
                ? calendarMonth + 1
                : calendarMonth) +
                '-' +
                item
                ? 'today'
                : '',
            ]"
            v-for="(item, index) in getMonthCalendar(
              `${currentYear}-${calendarMonth}-1`
            )"
            :key="index"
            @click="showSchedule(item, index)"
          >
            <p
              :class="[
                'daytext',
                (item > 25 && index < 7) || (item < 13 && index > 28)
                  ? 'othermonth'
                  : 'thismonth',
              ]"
            >
              {{ item }}
            </p>
            <div class="numBox" v-if="getScheduleNum(item, index) > 0">
              <div class="num">
                <div class="dotBox"><div class="dot"></div></div>
                <p>{{ getScheduleNum(item, index) }} 项日程</p>
              </div>
            </div>
            <p class="detail" v-if="getScheduleNum(item, index) > 0">
              点击查看详情
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="schedule" v-if="activities.length > 0">
      <p class="title">今日进程</p>
      <div class="timeline">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
          >
            {{ activity.content }}
          </el-timeline-item>
        </el-timeline>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleGroup from "../components/toggleGroup";
import DateUtils from "@/utils/date";
export default {
  components: {
    ToggleGroup,
  },
  data() {
    return {
      schedules: [],
      activities: [],
      currentYear: new Date().getFullYear(),
      calendarMonth: new Date().getMonth() + 1,
      currentMonth: new Date().getMonth() + 1,
      currentDay: new Date().getDate(),
      calendarToggles: [
        {
          text: "上个月",
          callback: this.lastMonth,
        },
        {
          text: "今天",
          callback: this.thisMonth,
        },
        {
          text: "下个月",
          callback: this.nextMonth,
        },
      ],
    };
  },
  watch: {
    calendarMonth() {
      this.schedules = Array.apply(
        null,
        Array(this.getMonthDays(`${this.currentYear}-${this.calendarMonth}-1`))
      ).map(() => {
        return [];
      });
      // 请求日程列表
      // request
    },
  },
  mounted() {
    this.$emit("setSuffixMenu", ["日程表"]);
    this.schedules = Array.apply(
      null,
      Array(this.getMonthDays(`${this.currentYear}-${this.calendarMonth}-1`))
    ).map(() => {
      return [];
    });
    this.schedules[29] = [
      {
        content: "活动按期活动按期开始活动按期开始活动按期开始开始",
        timestamp: "2018-04-15",
      },
      {
        content: "通过审核",
        timestamp: "2018-04-13",
      },
      {
        content: "创建成功",
        timestamp: "2018-04-11",
      },
    ];
  },
  methods: {
    ...DateUtils,
    nextMonth() {
      this.calendarMonth = this.currentMonth + 1;
    },
    thisMonth() {
      this.calendarMonth = this.currentMonth;
    },
    lastMonth() {
      this.calendarMonth = this.currentMonth - 1;
    },
    showSchedule(item, index) {
      console.log(item, index);
      if ((item > 25 && index < 7) || (item < 13 && index > 28)) return;
      this.activities = this.schedules[item - 1];
      this.$forceUpdate();
    },
    getScheduleNum(day, index) {
      if ((day > 25 && index < 7) || (day < 13 && index > 28)) return;
      if (this.schedules.length == 0) return 0;
      if (!this.schedules[day - 1]) return 0;
      return this.schedules[day - 1].length;
    },
  },
};
</script>

<style lang="scss">
.Calendar {
  .schedule {
    .timeline {
      .el-timeline {
        padding-left: 0;
        .el-timeline-item__wrapper {
          padding-left: 22px;
          .el-timeline-item__content,
          .el-timeline-item__timestamp {
            text-align: left;
            color: #666666;
            font-size: 14px;
          }
          .el-timeline-item__timestamp {
            margin-top: 0px;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.Calendar {
  margin-bottom: 24px;
  display: flex;
  flex-direction: row;
  p {
    margin: 0;
  }
  .info-item {
    background-color: #fff;
    box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
    box-sizing: border-box;
    padding: 20px 12px 10px 12px;
    // width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    // transition: all .2s;
    // height: 181px;
    .calendarBox {
      width: 100%;
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        padding-bottom: 14px;
        border-bottom: 1px solid #d3d3d3;
        .date {
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          white-space: nowrap;
        }
      }
      .weekday {
        display: flex;
        flex-direction: row;
        width: 100%;
        padding-top: 12px;
        padding-bottom: 8px;
        p {
          flex: 1;
          font-size: 12px;
          color: #666666;
          line-height: 17px;
        }
      }
      .calendar {
        width: 100%;
        border-left: 1px solid #eceef5;
        border-top: 1px solid #eceef5;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        .thismonthday {
          cursor: pointer;
          transition: all 0.2s;
        }
        .day {
          border-right: 1px solid #eceef5;
          border-bottom: 1px solid #eceef5;
          width: calc(100% / 7);
          min-height: 87px;
          box-sizing: border-box;
          padding: 4px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .daytext {
            font-size: 12px;
            line-height: 17px;
            text-align: left;
          }
          .thismonth {
            color: #333333;
          }
          .othermonth {
            color: #c0c4cc;
          }
          .numBox {
            flex: 1;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            margin-top: -10px;
            .num {
              flex: 1;
              display: flex;
              flex-direction: row;
              justify-content: center;
              .dotBox {
                height: 11px;
                margin-right: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                .dot {
                  background-color: #4b77f6;
                  border-radius: 4px;
                  width: 2px;
                  height: 2px;
                }
              }
              p {
                font-size: 12px;
                color: #333333;
                line-height: 11px;
              }
            }
          }
          .detail {
            font-size: 12px;
            color: #999999;
            line-height: 11px;
            // white-space: nowrap;
            // text-align: left;
            // margin-top: 8px;
          }
        }
        .thismonthday:hover,
        .today {
          background-color: #f1f4ff;
          .daytext {
            color: #4b77f6;
          }
        }
      }
    }
  }
  .schedule {
    background-color: #fff;
    box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
    box-sizing: border-box;
    padding: 20px;
    width: 270px;
    margin-left: 24px;
    .title {
      text-align: left;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
    }
    .timeline {
      margin-top: 20px;
    }
  }
}
</style>