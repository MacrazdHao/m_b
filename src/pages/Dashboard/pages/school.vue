<template>
  <div class="School">
    <div class="info-itemBox info-itemBox-1">
      <div class="info-item">
        <div class="titleBox">
          <p class="title">{{ $t("dashboard.school.studentNum.title") }}</p>
        </div>
        <p class="total">{{ studentNum.total }}</p>
        <div class="chart">
          <el-tooltip
            class="item"
            v-for="(item, index) in studentChart"
            :key="index"
            effect="dark"
            :content="`${item}`"
            placement="top"
          >
            <div :style="{ height: chartItemHeight(item) }"></div>
          </el-tooltip>
        </div>
        <div class="enterNumBox">
          <div class="enterItem">
            <p class="enterTitle">
              {{ $t("dashboard.school.studentNum.enterTitle") }}
            </p>
            <p class="enterNum">{{ studentNum.today }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="info-itemBox info-itemBox-1">
      <div class="info-item">
        <div class="titleBox">
          <p class="title">{{ $t("dashboard.school.fileNum.title") }}</p>
          <div class="moreButton" @click="goProfiles">
            <p>{{ $t("dashboard.school.moreButton") }}</p>
            <img src="@/assets/dashboard/icon_view.svg" />
          </div>
        </div>
        <p class="total">{{ fileNum.total }}</p>
        <p class="fileTitle">{{ $t("dashboard.school.fileNum.fileTitle") }}</p>
        <div class="enterNumBox">
          <div class="enterItem">
            <p class="enterTitle">
              {{ $t("dashboard.school.fileNum.newTitle") }}
            </p>
            <p class="enterNum">
              {{ fileNum.today }}{{ $t("dashboard.school.fileNum.fileUnit") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="info-itemBox info-itemBox-1">
      <div class="info-item">
        <div class="titleBox">
          <p class="title">{{ $t("dashboard.school.accountManage.title") }}</p>
          <div class="moreButton" @click="goAccountManagement">
            <p>{{ $t("dashboard.school.moreButton") }}</p>
            <img src="@/assets/dashboard/icon_view.svg" />
          </div>
        </div>
        <div class="totalBox">
          <div class="totalItem">
            <p class="num">{{ accountNum.admin }}</p>
            <p class="identity">
              {{ $t("dashboard.school.accountManage.adminTitle") }}
            </p>
          </div>
          <div class="totalItem">
            <p class="num">{{ accountNum.admin }}</p>
            <p class="identity">
              {{ $t("dashboard.school.accountManage.teacherTitle") }}
            </p>
          </div>
        </div>
        <div class="enterNumBox">
          <div class="enterItem">
            <p class="enterTitle">
              {{ $t("dashboard.school.accountManage.newAdmin") }}
            </p>
            <p class="enterNum">
              {{ accountNum.newAdmin
              }}{{ $t("dashboard.school.accountManage.peopleUnit") }}
            </p>
          </div>
          <div class="enterItem">
            <p class="enterTitle">
              {{ $t("dashboard.school.accountManage.newTeacher") }}
            </p>
            <p class="enterNum">
              {{ accountNum.newTeacher
              }}{{ $t("dashboard.school.accountManage.peopleUnit") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="info-itemBox info-itemBox-1">
      <div class="info-item">
        <div class="calendarBox">
          <div class="header">
            <p class="date">
              {{
                `${currentYear}${$t(
                  "dashboard.school.calendar.year"
                )}${calendarMonth}${$t("dashboard.school.calendar.month")}`
              }}
            </p>
            <ToggleGroup
              :value="calendarMonth - (currentMonth - 1)"
              :items="calendarToggles"
            />
          </div>
          <div class="weekday">
            <p>{{ $t("dashboard.school.calendar.monday") }}</p>
            <p>{{ $t("dashboard.school.calendar.tuesday") }}</p>
            <p>{{ $t("dashboard.school.calendar.wednesday") }}</p>
            <p>{{ $t("dashboard.school.calendar.thursday") }}</p>
            <p>{{ $t("dashboard.school.calendar.friday") }}</p>
            <p>{{ $t("dashboard.school.calendar.saturday") }}</p>
            <p>{{ $t("dashboard.school.calendar.sunday") }}</p>
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
                `2021-${calendarMonth}-1`
              )"
              :key="index"
              @click="toCalendar(item, index)"
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
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
      studentNum: {
        total: 80,
        today: 3,
      },
      studentChart: [100, 10, 30, 20, 60, 50, 40, 70, 90, 80, 30, 6],
      fileNum: {
        total: 38,
        today: 9,
      },
      accountNum: {
        admin: 5,
        teacher: 8,
        newAdmin: 3,
        newTeacher: 0,
      },
      currentYear: new Date().getFullYear(),
      calendarMonth: new Date().getMonth() + 1,
      currentMonth: new Date().getMonth() + 1,
      currentDay: new Date().getDate(),
      calendarToggles: [
        {
          text: this.$t("dashboard.school.calendar.lastMonth"),
          callback: this.lastMonth,
        },
        {
          text: this.$t("dashboard.school.calendar.today"),
          callback: this.thisMonth,
        },
        {
          text: this.$t("dashboard.school.calendar.nextMonth"),
          callback: this.nextMonth,
        },
      ],
    };
  },
  computed: {
    maxChange() {
      return Math.max(...this.studentChart) || 100;
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    ...DateUtils,
    initData() {
      this.$store
        .dispatch("dashboard/getSchoolDashboardData")
        .then((res) => {
          this.studentNum = {
            total: res.data.schoolAccountManagerDTO.totalStudentAccountNum,
            today: res.data.schoolAccountManagerDTO.todayStudentAccountNum,
          };
          this.studentChart =
            res.data.cecpInstanceSummaryDTO.lastTwoWeekStudentNum;
          this.fileNum = {
            total: res.data.schoolAccountManagerDTO.totalProfileNum || 0,
            today: res.data.schoolAccountManagerDTO.todayProfileNum || 0,
          };
          this.accountNum = {
            admin: res.data.schoolAccountManagerDTO.totalAdminAccountNum,
            newAdmin: res.data.schoolAccountManagerDTO.todayAdminAccountNum,
            teacher: res.data.schoolAccountManagerDTO.totalTeacherAccountNum,
            newTeacher: res.data.schoolAccountManagerDTO.todayTeacherAccountNum,
          };
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("dashboard.getInfoError"),
          });
        });
    },
    chartItemHeight(item) {
      return (44 * item) / this.maxChange + "px";
    },
    nextMonth() {
      this.calendarMonth = this.currentMonth + 1;
    },
    thisMonth() {
      this.calendarMonth = this.currentMonth;
    },
    lastMonth() {
      this.calendarMonth = this.currentMonth - 1;
    },
    toCalendar(item, index) {
      if ((item > 25 && index < 7) || (item < 13 && index > 28)) return;
      this.$router.push({ path: "/index/dashboard/schedules" });
    },
    goAccountManagement() {
      this.$router.push({ path: "/index/accounts/admin" });
    },
    goProfiles() {
      this.$router.push({ path: "/index/archives/archivesList" });
    },
  },
};
</script>

<style lang="scss" scoped>
.School {
  margin-bottom: 24px;
  p {
    margin: 0;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .info-itemBox {
    width: calc(50% - 12px);
    .info-item {
      background-color: #fff;
      box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
      box-sizing: border-box;
      padding: 20px 12px 10px 12px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      min-height: 181px;
      .titleBox {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        .title {
          font-size: 14px;

          white-space: nowrap;
          color: #999999;
          line-height: 20px;
        }
        .moreButton {
          display: flex;
          flex-direction: row;
          align-items: center;
          cursor: pointer;
          p {
            font-size: 14px;

            white-space: nowrap;
            color: #666666;
            line-height: 20px;
          }
          img {
            width: 4px;
            margin-left: 8px;
          }
        }
      }
      .total {
        margin-top: 4px;
        font-size: 28px;
        font-family: AlibabaPuHuiTiM;
        white-space: nowrap;
        color: #333333;
        line-height: 38px;
      }
      .chart {
        margin-top: 2px;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding: 0 16px;
        padding-bottom: 12px;
        width: 100%;
        height: 56px;
        box-sizing: border-box;
        border-bottom: 1px solid #d3d3d3;
        justify-content: space-between;
        div {
          background: #68afff;
          // flex: 1;
          width: 4.255%;
          max-width: 24px;
          min-width: 12px;
          min-height: 3px;
          cursor: pointer;
          transition: .2s all;
        }
        div:hover {
          background: #68e1ff;
        }
      }
      .fileTitle {
        margin-top: 26px;
        font-size: 14px;
        white-space: nowrap;

        color: #666666;
        line-height: 20px;
        padding-bottom: 12px;
        width: 100%;
        box-sizing: border-box;
        border-bottom: 1px solid #d3d3d3;
        text-align: left;
      }
      .totalBox {
        display: flex;
        flex-direction: row;
        margin-top: 4px;
        width: 100%;
        padding-bottom: 12px;
        border-bottom: 1px solid #d3d3d3;
        .totalItem {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          width: 40.185%;
          .num {
            font-size: 28px;
            white-space: nowrap;
            font-family: AlibabaPuHuiTiM;
            color: #333333;
            line-height: 38px;
          }
          .identity {
            margin-top: 26px;
            font-size: 14px;
            white-space: nowrap;
            text-align: left;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #666666;
            line-height: 20px;
          }
        }
      }
      .enterNumBox {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        margin-top: 10px;
        width: 100%;
        .enterItem {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          width: 40.185%;
          .enterTitle {
            font-size: 14px;

            white-space: nowrap;
            color: #666666;
            line-height: 20px;
          }
          .enterNum {
            margin-left: 10px;
            font-size: 14px;

            white-space: nowrap;
            color: #333333;
            line-height: 20px;
          }
        }
      }
      .calendarBox {
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
            height: 55px;
            box-sizing: border-box;
            padding: 4px;
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
  }
  .info-itemBox:nth-child(n + 3) {
    margin-top: 24px;
  }
}
</style>