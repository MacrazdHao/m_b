<template>
  <div class="Admin">
    <div class="info-itemBox info-itemBox-1">
      <div class="info-item">
        <div class="titleBox">
          <p class="title">{{ $t("dashboard.admin.cooperateManage.title") }}</p>
          <div class="moreButton" @click="goSchoolList">
            <p>{{ $t("dashboard.admin.moreButton") }}</p>
            <img src="@/assets/dashboard/icon_view.svg" />
          </div>
        </div>
        <div class="totalBox">
          <div class="totalItem">
            <p class="num">{{ schoolNum.school }}</p>
            <p class="identity">
              {{ $t("dashboard.admin.cooperateManage.schoolTitle") }}
            </p>
          </div>
        </div>
        <div class="enterNumBox">
          <div class="enterItem">
            <p class="enterTitle">
              {{ $t("dashboard.admin.cooperateManage.newSchool") }}
            </p>
            <p class="enterNum">
              {{ schoolNum.newSchool
              }}{{ $t("dashboard.admin.cooperateManage.schoolUnit") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="info-itemBox info-itemBox-1">
      <div class="info-item">
        <div class="titleBox">
          <p class="title">
            {{ $t("dashboard.admin.consultantManage.title") }}
          </p>
          <div class="moreButton" @click="goConsultantList">
            <p>{{ $t("dashboard.admin.moreButton") }}</p>
            <img src="@/assets/dashboard/icon_view.svg" />
          </div>
        </div>
        <div class="totalBox">
          <div class="totalItem">
            <p class="num">{{ consultantNum.consultant }}</p>
            <p class="identity">
              {{ $t("dashboard.admin.consultantManage.consultantTitle") }}
            </p>
          </div>
        </div>
        <div class="enterNumBox">
          <div class="enterItem">
            <p class="enterTitle">
              {{ $t("dashboard.admin.consultantManage.newConsultant") }}
            </p>
            <p class="enterNum">
              {{ consultantNum.newConsultant
              }}{{ $t("dashboard.admin.consultantManage.peopleUnit") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="info-itemBox info-itemBox-1">
      <div class="info-item">
        <div class="titleBox">
          <p class="title">{{ $t("dashboard.admin.accountManage.title") }}</p>
          <div class="moreButton" @click="goAccountManagement">
            <p>{{ $t("dashboard.admin.moreButton") }}</p>
            <img src="@/assets/dashboard/icon_view.svg" />
          </div>
        </div>
        <div class="totalBox">
          <div class="totalItem">
            <p class="num">{{ accountNum.admin }}</p>
            <p class="identity">
              {{ $t("dashboard.admin.accountManage.adminTitle") }}
            </p>
          </div>
        </div>
        <div class="enterNumBox">
          <div class="enterItem">
            <p class="enterTitle">
              {{ $t("dashboard.admin.accountManage.newAdmin") }}
            </p>
            <p class="enterNum">
              {{ accountNum.newAdmin
              }}{{ $t("dashboard.admin.accountManage.peopleUnit") }}
            </p>
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
      schoolNum: {
        school: 51,
        newSchool: 33,
      },
      consultantNum: {
        consultant: 544,
        newConsultant: 123,
      },
      accountNum: {
        admin: 5,
        newAdmin: 3,
      },
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      this.$store
        .dispatch("dashboard/getAdminDashboardData")
        .then((res) => {
          this.schoolNum = {
            school: res.data.schoolNum,
            newSchool: res.data.curSchoolNum,
          };
          this.consultantNum = {
            consultant: res.data.consultantNum,
            newConsultant: res.data.curConsultantNum,
          };
          this.accountNum = {
            admin: res.data.adminNum,
            newAdmin: res.data.curAdminNum,
          };
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("dashboard.getInfoError"),
          });
        });
    },
    goSchoolList() {
      this.$router.push({ path: "/index/school/schoollist" });
    },
    goConsultantList() {
      this.$router.push({ path: "/index/index/consultant" });
    },
    goAccountManagement() {
      this.$router.push({ path: "/index/accounts/admin" });
    },
  },
};
</script>

<style lang="scss" scoped>
.Admin {
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
        box-sizing: border-box;
        border-bottom: 1px solid #d3d3d3;
        justify-content: space-between;
        div {
          background: #68afff;
          // flex: 1;
          width: 4.255%;
          max-width: 24px;
          min-width: 12px;
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
    }
  }
  .info-itemBox:nth-child(n + 3) {
    margin-top: 24px;
  }
}
</style>