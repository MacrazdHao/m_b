<template>
  <div class="Detail">
    <div class="content" v-if="info">
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("counseling.step1.baseInfo.title") }}</p>
        </div>
        <div class="form">
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.school.label") }}：
            </p>
            <p class="item-content">{{ info.schoolName }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.code.label") }}：
            </p>
            <p class="item-content">{{ info.userCode }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.name.label") }}：
            </p>
            <p class="item-content">{{ info.nickName }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.class.label") }}：
            </p>
            <p class="item-content">{{ info.gradeName }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.sex.label") }}：
            </p>
            <p class="item-content">
              {{
                $t(
                  `counseling.step1.baseInfo.sex.${
                    info.gender == 0 ? "boy" : "girl"
                  }`
                )
              }}
            </p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.country.label") }}：
            </p>
            <p class="item-content">
              {{
                $t(
                  `counseling.step1.baseInfo.country.${
                    info.nation == 0 ? "china" : "foreign"
                  }`
                )
              }}
            </p>
          </div>
        </div>
      </div>
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("counseling.step1.academic.title") }}</p>
        </div>
        <div class="form">
          <!-- <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.score.label')"
            :placeholder="$t('counseling.step1.academic.score.placeholder')"
            :value="info.score"
            :maxLength="500"
            :disabled="true"
          /> -->
          <div class="scoreBox">
            <p class="label">
              {{ $t("counseling.step1.academic.score.label") }}：
            </p>
            <p class="noScoreTipx" v-if="info.subjectAchievement.length == 0">
              暂无成绩单
            </p>
            <div class="filesBox">
              <template v-for="(item2, index2) in info.subjectAchievement">
                <div class="file" :key="index2">
                  <FileBox :info="item2" buttonText="查看" />
                </div>
                {{ "" }}
              </template>
            </div>
          </div>
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.evaluation.label')"
            :placeholder="
              $t('counseling.step1.academic.evaluation.placeholder')
            "
            :value="info.selfEvaluation"
            :maxLength="800"
            :disabled="true"
          />
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.extracurricular.label')"
            :placeholder="
              $t('counseling.step1.academic.extracurricular.placeholder')
            "
            :value="info.extracurricularStudy"
            :maxLength="800"
            :disabled="true"
          />
        </div>
      </div>
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("counseling.step1.hobby.title") }}</p>
        </div>
        <div class="form">
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.hobby.book.label')"
            :placeholder="$t('counseling.step1.hobby.book.placeholder')"
            :value="info.readingCategory"
            :maxLength="500"
            :disabled="true"
          />
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.hobby.sport.label')"
            :placeholder="$t('counseling.step1.hobby.sport.placeholder')"
            :value="info.sportHobby"
            :maxLength="800"
            :disabled="true"
          />
        </div>
      </div>
      <!-- <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("management.testTitle") }}</p>
        </div>
        <div class="form">
          <FormTextarea
            class="formInput"
            :label="$t('management.testReportLabel')"
            :placeholder="$t('management.testReportPlaceholder')"
            :value="info.testReport"
            :maxLength="500"
          />
        </div>
      </div> -->
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("management.consultTitle") }}</p>
        </div>
        <div class="consultSetting">
          <p class="label">{{ $t("management.consultTitle") }}：</p>
          <div class="consult-item">
            <template v-for="(item, index) in consultStage">
              <div
                class="timeBox"
                v-if="stageTimes[index].length > 0"
                :key="index"
              >
                <div class="consultStageLabel" @click="selectItem(index)">
                  <img
                    class="checkbox"
                    :src="
                      require(`@/assets/archives/icon_checkbox${
                        item.allCompeleted
                          ? '_selected_disabled'
                          : item.selected
                          ? '_selected'
                          : ''
                      }.svg`)
                    "
                  />
                  <p class="label">{{ item.label }}</p>
                </div>
                <FormInput
                  class="input"
                  :placeholder="
                    $t('management.consultUnopenPlaceholder', {
                      num: numToChinese(stageTimes[index].length),
                    })
                  "
                  :disabled="true"
                  v-show="!(item.selected || item.allCompeleted)"
                />
                <div
                  class="timePickers"
                  v-show="item.selected || item.allCompeleted"
                >
                  <template v-for="(item2, index2) in stageTimes[index]">
                    <div class="timePickerItem" :key="index2">
                      <DatePicker
                        class="picker"
                        :readonly="
                          !(
                            consultStage[nodeTypeToLabelIndex(item2.nodeType)]
                              .selected && item2.status != -1
                          )
                        "
                        :disabled="
                          item2.status == -1 ||
                          (index2 == 0 &&
                            (item2.status == -1 || item2.status == 1)) ||
                          (index2 > 0 &&
                            (stageTimes[index][index2 - 1].status != -1 ||
                              item2.status == 1))
                        "
                        :placeholder="
                          $t('management.consultPlaceholder', {
                            num: numToChinese(index2 + 1),
                          })
                        "
                        :value="
                          item2.startTime ? new Date(item2.startTime) : ''
                        "
                        @change="(e) => selectTime(e, index, index2)"
                      />
                      <div class="statusBox" v-if="item2.status == -1">
                        <img src="@/assets/counseling/icon_finish.svg" />
                        <p>{{ $t("management.finishTips") }}</p>
                      </div>
                      <div class="statusBox" v-else></div></div
                  ></template>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="$t('management.cancelButton')"
        @btnClick="goBack"
      />
      <CButton
        class="button"
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
import DatePicker from "../components/datePicker";
import FileBox from "../components/file";
import DateTools from "@/utils/date";
import { numToChinese } from "@/utils/others";
export default {
  // props: ["info"],
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
        // {
        //   label: this.$t("management.consultLabel2"),
        //   selected: false,
        // allCompeleted: false,
        // },
      ],
      times: [],
    };
  },
  computed: {
    stageTimes() {
      let finished = Array.apply(null, Array(this.consultStage.length)).map(
        () => 0
      );
      let arr = Array.apply(null, Array(this.consultStage.length)).map(
        (item, index) => {
          return this.times.filter((_item, _index) => {
            let i = this.nodeTypeToLabelIndex(_item.nodeType);
            // console.log(index, _item.scheduleId, _item.status, i);
            if (_item.status == -1 && i == index) {
              finished[i]++;
            }
            return i == index;
          });
        }
      );
      if (this.initial && this.times.length > 0) {
        for (let i = 0; i < this.consultStage.length; i++) {
          this.$set(this.consultStage, i, {
            ...this.consultStage[i],
            selected: finished[i] > 0,
            allCompeleted: finished[i] == arr[i].length,
          });
          console.log(finished[i], arr[i].length);
        }
        this.initial = false;
      }
      return arr;
    },
  },
  watch: {},
  mounted() {
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
            .dispatch("management/getStudentSchedule", this.$route.query.id)
            .then((res) => {
              this.times = res.data;
            })
            .catch((err) => {
              this.$message.error({
                text: this.$t("management.getStudentScheduleErrorTips"),
              });
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
    },
    selectTime(text, index, index2) {
      let _index = index2;
      for (let i = 0; i < index; i++) {
        _index += this.stageTimes[i].length;
      }
      console.log(new Date(text).getTime(), _index);
      this.$set(this.times, _index, {
        ...this.times[_index],
        startTime: new Date(text).getTime(),
      });
    },
    selectItem(index) {
      this.$set(this.consultStage, index, {
        ...this.consultStage[index],
        selected: !this.consultStage[index].selected,
      });
    },
    goBack() {
      this.$emit("closeDetail");
    },
    saveInfo() {
      this.$store
        .dispatch("management/saveStudentSchedule", {
          studentId: this.$route.query.id,
          times: this.times,
        })
        .then((res) => {
          this.$message.message({
            text: this.$t("management.saveStudentScheduleSuccessTips"),
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            text: this.$t("management.saveStudentScheduleErrorTips"),
          });
        });
    },
  },
};
</script>

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