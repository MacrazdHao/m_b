<template>
  <div class="Detail">
    <div class="content">
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("management.consultTitle") }}</p>
        </div>
        <div class="consultSetting" v-if="liveInfo">
          <p class="label">{{ $t("management.consultTitle2") }}：</p>
          <div class="consult-item">
            <div class="timeBox">
              <div class="timePickers">
                <div class="timePickerItem">
                  <div class="consultStageLabel">
                    <p class="label">
                      {{ consultStage[0].label }}
                    </p>
                  </div>
                  <DatePicker
                    class="picker"
                    v-if="stageNum == 1"
                    :readonly="true"
                    :placeholder="$t('management.noSetTimePlaceholder')"
                    :value="
                      liveInfo.startTime ? new Date(liveInfo.startTime) : ''
                    "
                  />
                  <DatePicker
                    class="picker"
                    v-else-if="stageNum > 1"
                    :readonly="true"
                    :placeholder="$t('management.stageHasPassTips')"
                  />
                  <DatePicker
                    class="picker"
                    v-else
                    :readonly="true"
                    :placeholder="$t('management.stageNotStartTips')"
                  />
                  <!-- <div class="statusBox" v-if="liveInfo.status == -1">
                      <img src="@/assets/counseling/icon_finish.svg" />
                      <p>{{ $t("management.finishTips") }}</p>
                    </div> -->
                  <!-- <div class="statusBox" v-else></div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="reportBox" v-if="contentInfo && liveInfo && stageNum == 1">
        <div class="content-item baseInfoBox">
          <div class="title-box">
            <div class="leftline"></div>
            <p class="title">{{ $t("management.backgroundTitle") }}</p>
          </div>
          <div class="form">
            <FormTextarea
              class="formInput"
              :label="$t('management.currentStatusLabel')"
              :placeholder="$t('management.currentStatusPlaceholder')"
              :value="contentInfo[0].data[0].content"
              :disabled="!(stageNum == 2 && liveInfo.status == -1)"
              @input="(text) => setContent(text, 0, 0)"
            />
          </div>
        </div>
        <div class="content-item baseInfoBox">
          <div class="title-box">
            <div class="leftline"></div>
            <p class="title">{{ $t("management.basicMatterTitle") }}</p>
          </div>
          <p class="subtitle">{{ $t("management.basicMatterSubtitle") }}</p>
          <div class="form">
            <FormTextarea
              class="formInput"
              :label="$t('management.subjectLabel')"
              :placeholder="$t('management.subjectPlaceholder')"
              :value="contentInfo[1].data[0].children[0].content"
              :disabled="!(stageNum == 2 && liveInfo.status == -1)"
              @input="(text) => setContent(text, 1, 0, 0)"
            />
            <FormTextarea
              class="formInput"
              :label="$t('management.exploreLabel')"
              :placeholder="$t('management.explorePlaceholder')"
              :value="contentInfo[1].data[0].children[1].content"
              :disabled="!(stageNum == 2 && liveInfo.status == -1)"
              @input="(text) => setContent(text, 1, 0, 1)"
            />
          </div>
        </div>
        <div class="content-item baseInfoBox">
          <div class="title-box">
            <div class="leftline"></div>
            <p class="title">{{ $t("management.nextStepTitle") }}</p>
          </div>
          <p class="subtitle">{{ $t("management.nextStepSubtitle") }}</p>
          <div class="form">
            <FormTextarea
              class="formInput"
              :label="$t('management.adviseLabel')"
              :placeholder="$t('management.advisePlaceholder')"
              :value="contentInfo[2].data[0].children[0].content"
              :disabled="!(stageNum == 2 && liveInfo.status == -1)"
              @input="(text) => setContent(text, 2, 0, 0)"
            />
            <FormTextarea
              class="formInput"
              :label="$t('management.announceLabel')"
              :placeholder="$t('management.announcePlaceholder')"
              :value="contentInfo[2].data[0].children[1].content"
              :disabled="!(stageNum == 2 && liveInfo.status == -1)"
              @input="(text) => setContent(text, 2, 0, 1)"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="
          stageNum == 1
            ? $t('management.cancelButton')
            : $t('management.backButton')
        "
        @btnClick="cancel"
      />
      <CButton
        class="button"
        v-if="stageNum == 1"
        :text="$t('management.saveButton')"
        theme="blue"
        @btnClick="saveInfo"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
import FormInput from "../components/input.vue";
// import FormRadio from "../components/radio.vue";
import FormTextarea from "../components/textarea.vue";
import DatePicker from "@/components/common/datePicker";
import FileBox from "@/components/common/file";
import DateTools from "@/utils/date";
import { numToChinese } from "@/utils/others";
import defaultBackMixin from "@/mixins/defaultBack";
import Enum from "@/utils/enum";
export default {
  // props: ["info"],
  mixins: [defaultBackMixin],
  components: {
    // Dialog,
    FormInput,
    // FormRadio,
    FormTextarea,
    CButton,
    DatePicker,
    FileBox,
  },
  data() {
    return {
      info: null,
      initial: true,
      consultStage: [
        {
          label: this.$t("management.consultLabel0"),
          selected: false,
          allCompeleted: false,
        },
        {
          label: this.$t("management.consultLabel1"),
          selected: false,
          allCompeleted: false,
        },
        {
          label: this.$t("management.consultLabel2"),
          selected: false,
          allCompeleted: false,
        },
      ],
      liveInfo: null,
      contentInfo: null,
      cnTitles: ["目录", "概况与背景", "咨询基本情况", "下一步"],
      enTitles: ["Contents", "Overview", "Interview Notes", "Next Steps"],
      date: new Date().getTime(),
    };
  },
  computed: {
    form() {
      return {
        contentInfo: this.contentInfo,
        cnTitles: this.cnTitles,
        enTitles: this.enTitles,
        nickName: this.info.nickName,
        date: new Date().getTime(),
      };
    },
    stageNum() {
      if (!this.liveInfo) return -1;
      return Enum.getServerNodeStage(this.liveInfo.nodeType);
    },
  },
  watch: {},
  mounted() {
    if (!this.$route.query.id || !this.$route.query.nodeId) {
      this.goBack();
      return;
    }
    this.initInfo();
  },
  methods: {
    ...DateTools,
    numToChinese,
    initInfo() {
      this.$store
        .dispatch("management/getStudentDetail", this.$route.query.id)
        .then((res) => {
          this.info = res.data;
          this.$emit("setSuffixMenu", [this.info.nickName]);
          this.$store
            .dispatch(
              "management/getStudentCurrentLiveInfo",
              this.$route.query.id
            )
            .then((res2) => {
              this.contentInfo = [
                {
                  startPage: 1,
                  endPage: 1,
                  data: [
                    {
                      startPage: 1,
                      endPage: 1,
                      title: "学生当前状况",
                      content: "",
                    },
                  ],
                },
                {
                  startPage: 1,
                  endPage: 1,
                  data: [
                    {
                      startPage: 1,
                      endPage: 1,
                      title: "与学生的沟通",
                      children: [
                        {
                          title: "专业科目探索",
                          content: "",
                        },
                        {
                          title: "探索总结",
                          content: "",
                        },
                      ],
                    },
                  ],
                },
                {
                  startPage: 1,
                  endPage: 1,
                  data: [
                    {
                      title: "建议及咨询预告",
                      children: [
                        {
                          startPage: 1,
                          endPage: 1,
                          title: "建议",
                          content: "",
                        },
                        {
                          startPage: 1,
                          endPage: 1,
                          title: "咨询内容预告",
                          content: "",
                        },
                      ],
                    },
                  ],
                },
              ];
              this.$store
                .dispatch(
                  "management/getStudentHistoryLiveList",
                  this.$route.query.id
                )
                .then((res3) => {
                  this.liveInfo = {
                    ...res2.data,
                    ...res3.data.currentNodeDTO,
                  };
                  this.$nextTick(() => {
                    this.$forceUpdate();
                  });
                })
                .catch((err) => {
                  this.$message.error({
                    text: this.$t("management.getConsultStatusError"),
                  });
                });
            })
            .catch((err) => {
              this.$message.error({
                text: this.$t("management.getLiveStatusErrorTips"),
              });
              this.goBack();
            });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("management.getStudentDetailErrorTips"),
          });
        });
    },
    nodeTypeToLabelIndex(nodeType) {
      if (nodeType > 9 && nodeType < 20) return 0;
      if (nodeType > 19 && nodeType < 30) return 1;
      // 大学建议和偏好咨询,if (nodeType > 19 && nodeType < 30) return 1;
    },
    selectItem(index) {
      this.$set(this.consultStage, index, {
        ...this.consultStage[index],
        selected: !this.consultStage[index].selected,
      });
    },
    setContent(text, bigChapter, chapter, part) {
      let result = JSON.parse(JSON.stringify(this.contentInfo[bigChapter]));
      if (!result.data[chapter].children) result.data[chapter].content = text;
      else result.data[chapter].children[part].content = text;
      this.$set(this.contentInfo, bigChapter, result);
      console.log(this.contentInfo);
    },
    cancel() {
      if (this.stageNum != 1) {
        this.goBack();
        return;
      }
      this.$dialog.warning({
        text: [
          this.$t("management.cancelTips1"),
          this.$t("management.cancelTips2"),
        ],
        confirm: () => {
          this.goBack();
        },
        cancel: () => {},
        showCancel: true,
        showClose: false,
      });
    },
    saveInfo() {
      this.$dialog.message({
        text: [
          this.$t("management.saveTips1"),
          this.$t("management.saveTips2"),
        ],
        confirm: () => {
          this.$store
            .dispatch("management/saveStudentProfile", {
              userId: this.$route.query.id,
              nodeId: this.$route.query.nodeId,
              name: `1-1`,
              reportData: this.form,
            })
            .then((res) => {
              this.$store.dispatch(
                `management/endLiveNode`,
                this.$route.query.id
              );
              this.$message.message({
                text: this.$t("management.saveStudentScheduleSuccessTips"),
              });
              this.goBack();
            })
            .catch((err) => {
              console.log(err);
              this.$message.error({
                text: this.$t("management.saveStudentProfileErrorTips"),
              });
            });
        },
        cancel: () => {},
        showCancel: true,
        showClose: false,
      });
    },
  },
};
</script>

<style lang="scss">
.Detail {
  .Textarea {
    p {
      min-width: 98px !important;
      // width: 98px !important;
    }
    .textareaBox {
      margin-left: 0 !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.Detail {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
  }
  .lawTipsBox {
    padding: 22px 24px 0 24px;
    .lawTips {
      font-size: 14px;

      color: #666666;
      line-height: 20px;
      background: #f1f4ff;
      border: 1px solid #4b77f6;
      text-align: left;
      padding: 11px 12px;
      // width: ;
      flex: 1;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    margin-top: 28px;
    // padding-bottom: 32px;
    padding: 0 24px 32px 24px;
    border-bottom: 1px solid #d3d3d3;
    .reportBox {
      margin-top: 34px;
    }
    .content-item {
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      .title-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        .leftline {
          width: 2px;
          height: 16px;
          background-color: #4b77f6;
        }
        .title {
          width: fit-content;
          padding-left: 8px;
          font-size: 16px;

          color: #333333;
          line-height: 22px;
        }
      }
      .subtitle {
        margin-top: 22px;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        text-align: left;
        margin-left: 10px;
      }
      .form {
        display: flex;
        flex-direction: column;
        margin-top: 22px;
        .form-item + .form-item {
          margin-top: 24px;
        }
        .form-item {
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          .item-label {
            margin-right: 29px;
            font-size: 14px;
            color: #333333;
            line-height: 20px;
          }
          .item-content {
            font-size: 14px;
            color: #333333;
            line-height: 20px;
          }
        }
        .formInput {
          margin-left: 10px;
          height: 520px;
        }
        .formInput + .formInput {
          margin-top: 24px;
        }
        .scoreBox {
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          // margin-bottom: 18px;
          .label {
            margin-right: 29px;
            color: #333333;
            font-size: 14px;
            line-height: 20px;
            white-space: nowrap;
            min-width: 69px;
            text-align: left;
          }
          .noScoreTipx {
            color: #888888;
            font-size: 14px;
            line-height: 20px;
            white-space: nowrap;
            min-width: 69px;
            text-align: left;
            margin-bottom: 24px;
          }
          .filesBox {
            margin-bottom: 6px;
            letter-spacing: 60px;
            text-align: left;
            .file {
              display: inline-block;
              // margin-right: 60px;
              margin-bottom: 18px;
              letter-spacing: normal;
            }
          }
        }
      }
      .consultSetting {
        display: flex;
        flex-direction: row;
        margin-left: 10px;
        margin-top: 22px;
        .label {
          font-size: 14px;
          color: #333333;
          line-height: 32px;
          white-space: nowrap;
        }
        .consult-item {
          margin-left: 29px;
          width: 100%;
          max-width: 588px;
          .timeBox + .timeBox {
            margin-top: 24px;
          }
          .timeBox {
            display: flex;
            flex-direction: row;
            .consultStageLabel {
              display: flex;
              flex-direction: row;
              height: 100%;
              img {
                cursor: pointer;
                width: 14px;
                margin-right: 10px;
              }
              .label {
                width: 164px;
                text-align: left;
                white-space: nowrap;
              }
            }
            .timePickers {
              display: flex;
              flex-direction: column;
              .timePickerItem + .timePickerItem {
                margin-top: 24px;
              }
              .timePickerItem {
                display: flex;
                flex-direction: row;
                align-items: center;
                .picker {
                  height: 32px;
                  max-width: 298px;
                }
                .input {
                  padding: 5px 11px;
                  max-width: 298px;
                  // margin-left: 38px;
                }
                .statusBox {
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  margin-left: 30px;
                  min-width: 80px;
                  p {
                    font-size: 14px;
                    color: #666666;
                    line-height: 20px;
                    margin-left: 10px;
                    white-space: nowrap;
                  }
                  img {
                    width: 20px;
                    height: 20px;
                    cursor: default;
                  }
                }
              }
            }
          }
        }
      }
    }
    .content-item + .content-item {
      margin-top: 28px;
    }
  }
  .buttonBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 12px 0;
    .button + .button {
      margin-left: 80px;
    }
  }
}
</style>