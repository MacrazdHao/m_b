<template>
  <div class="Dashboard">
    <div class="infoBox" v-if="userType == 0">
      <div class="info-itemBox info-itemBox-1">
        <div class="info-item">
          <p class="title">{{ $t("dashboard.aboutMe.title") }}</p>
          <div class="progress">
            <p>{{ $t("dashboard.process") }}</p>
            <el-progress
              class="progress-line"
              :percentage="50"
              color="#4B78F6"
              :stroke-width="12"
              :show-text="false"
            ></el-progress>
          </div>
          <div class="devideline"></div>
          <div class="content">
            <div class="content-item link content-item-1">
              <p>{{ $t("dashboard.aboutMe.baseInfo") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
            <div class="content-item link content-item-2">
              <p>{{ $t("dashboard.aboutMe.academic") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
            <div class="content-item link content-item-3">
              <p>{{ $t("dashboard.aboutMe.hobby") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
          </div>
        </div>
      </div>
      <div class="info-itemBox info-itemBox-2">
        <div class="info-item">
          <p class="title">{{ $t("dashboard.onlineTest.title") }}</p>
          <div class="progress">
            <p>{{ $t("dashboard.process") }}</p>
            <el-progress
              class="progress-line"
              :percentage="100"
              color="#8FE2A8"
              :stroke-width="12"
              :show-text="false"
            ></el-progress>
          </div>
          <div class="devideline"></div>
          <div class="content">
            <div class="content-item link content-item-1">
              <p>
                <span>30/30</span
                ><span>{{ $t("dashboard.onlineTest.testQuestion") }}</span>
              </p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
            <div class="content-item link content-item-2">
              <p>{{ $t("dashboard.onlineTest.watchReport") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
          </div>
        </div>
      </div>
      <div class="info-itemBox info-itemBox-3">
        <div class="info-item">
          <p class="title">{{ $t("dashboard.counseling.title") }}</p>
          <div class="progress">
            <p>{{ $t("dashboard.process") }}</p>
            <el-progress
              class="progress-line"
              :percentage="75"
              color="#FFBE79"
              :stroke-width="12"
              :show-text="false"
            ></el-progress>
          </div>
          <div class="devideline"></div>
          <div class="content">
            <div class="content-item link content-item-1">
              <p>{{ $t("dashboard.counseling.careerConsult") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
            <div class="content-item link content-item-2">
              <p>{{ $t("dashboard.counseling.courseConsult") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
            <div class="content-item link content-item-3">
              <p>{{ $t("dashboard.counseling.collegeConsult") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
            <div class="content-item link content-item-3">
              <p>{{ $t("dashboard.counseling.lifeFile") }}</p>
              <img :src="require(`@/assets/dashboard/icon_view.svg`)" />
            </div>
          </div>
        </div>
      </div>
      <div class="info-itemBox info-itemBox-4">
        <div class="info-item">
          <p class="title">{{ $t("dashboard.consult.title") }}</p>
          <div class="progress">
            <p>{{ $t("dashboard.time") }}</p>
          </div>
          <div class="devideline"></div>
          <div class="content">
            <div class="process">
              <div class="process-item process-title">
                <p class="process-title-1">
                  {{ $t("dashboard.consult.careerConsult") }}
                </p>
                <p class="process-title-2">
                  {{ $t("dashboard.consult.courseConsult") }}
                </p>
                <p class="process-title-3">
                  {{ $t("dashboard.consult.collegeConsult") }}
                </p>
              </div>
              <div class="process-item process-time">
                <p class="process-time-1">2021-03-21 20:00</p>
                <p class="process-time-2">2021-04-21 21:00</p>
                <p class="process-time-3">2021-05-21 17:00</p>
              </div>
              <div class="process-item process-status">
                <p class="process-status-finish">
                  {{ $t("dashboard.consult.status.finish") }}
                </p>
                <p class="process-status-start">
                  {{ $t("dashboard.consult.status.start") }}
                </p>
                <p class="process-status-noStart">
                  {{ $t("dashboard.consult.status.noStart") }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userType: 0,
    };
  },
};
</script>

<style lang="scss" scoped>
.Dashboard {
  p {
    margin: 0;
  }
  .infoBox {
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
        padding: 16px 0 14px 0;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        .title {
          font-size: 18px;
          color: #333333;
          line-height: 25px;
          padding: 0 24px;
          box-sizing: border-box;
          width: 100%;
          text-align: left;
        }
        .progress {
          margin-top: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          width: 100%;
          padding: 0 24px;
          box-sizing: border-box;
          p {
            margin-right: 40px;
            font-size: 14px;
            color: #666666;
            line-height: 20px;
          }
          .progress-line {
            flex: 1;
            height: fit-content;
            .el-progress-bar__outer {
              height: 12px;
            }
          }
        }
        .devideline {
          height: 1px;
          background-color: #d3d3d3;
          width: calc(100% - 48px);
          margin: auto;
          margin-top: 12px;
          margin-bottom: 10px;
        }
        .content {
          // margin-top: 12px;
          // padding-top: 10px;
          width: 100%;
          // border-top: 1px solid #d3d3d3;
          .content-item {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 6px 24px;
            box-sizing: border-box;
            p {
              font-size: 16px;
              color: #333333;
              line-height: 22px;
            }
          }
          .link {
            transition: all 0.2s;
            cursor: pointer;
            img {
              width: 8px;
            }
          }
          .link:hover {
            background-color: rgb(248, 248, 248);
          }
          .process {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            // width: 100%;
            padding: 0 24px;
            .process-item {
              display: flex;
              flex-direction: column;
              p {
                padding: 6px 0;
                white-space: nowrap;
                font-size: 16px;
                line-height: 22px;
              }
            }
            .process-title {
              p {
                text-align: left;
              }
            }
            .process-time {
              p {
                text-align: center;
              }
            }
            .process-status {
              p {
                text-align: right;
              }
              .process-status-finish {
                color: #999999;
              }
              .process-status-start {
                color: #4B78F6;
              }
              .process-status-noStart {
                color: #FFB706;
              }
            }
          }
        }
      }
    }
    .info-itemBox:nth-child(n + 3) {
      margin-top: 24px;
    }
    .info-itemBox-1,
    .info-itemBox-2 {
      .info-item {
        min-height: 212px;
      }
    }
    .info-itemBox-3,
    .info-itemBox-4 {
      .info-item {
        min-height: 246px;
      }
    }
    .info-itemBox-2 {
      .info-item {
        .content {
          .content-item-1 {
            p {
              span + span {
                margin-left: 20px;
              }
            }
          }
        }
      }
    }
  }
}
</style>