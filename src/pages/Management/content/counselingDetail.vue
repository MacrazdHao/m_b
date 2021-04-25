<template>
  <div class="Detail">
    <div class="content">
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
            <p class="item-content">{{ info.school }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.name.label") }}：
            </p>
            <p class="item-content">{{ info.name }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.class.label") }}：
            </p>
            <p class="item-content">{{ info.grade }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.sex.label") }}：
            </p>
            <p class="item-content">{{ info.sex }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.country.label") }}：
            </p>
            <p class="item-content">{{ info.country }}</p>
          </div>
        </div>
      </div>
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("counseling.step1.academic.title") }}</p>
        </div>
        <div class="form">
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.score.label')"
            :placeholder="$t('counseling.step1.academic.score.placeholder')"
            :value="info.score"
            :maxLength="500"
            :disabled="true"
          />
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.evaluation.label')"
            :placeholder="
              $t('counseling.step1.academic.evaluation.placeholder')
            "
            :value="info.selfAssess"
            :maxLength="800"
            :disabled="true"
          />
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.extracurricular.label')"
            :placeholder="
              $t('counseling.step1.academic.extracurricular.placeholder')
            "
            :value="info.extraStudy"
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
            :value="info.books"
            :maxLength="500"
            :disabled="true"
          />
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.hobby.sport.label')"
            :placeholder="$t('counseling.step1.hobby.sport.placeholder')"
            :value="info.sports"
            :maxLength="800"
            :disabled="true"
          />
        </div>
      </div>
      <div class="content-item baseInfoBox">
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
      </div>
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("management.consultTitle") }}</p>
        </div>
        <div class="consultSetting">
          <p class="label">{{ $t("management.consultTitle") }}：</p>
          <div class="consult-item">
            <div
              class="timeBox"
              v-for="(item, index) in consultCheckbox"
              :key="index"
            >
              <img
                class="checkbox"
                :src="
                  require(`@/assets/archives/icon_checkbox${
                    item.selected ? '_selected' : ''
                  }.svg`)
                "
                v-if="item.status != 1"
                @click="selectItem(index)"
              />
              <div class="checkbox" v-else>&nbsp;</div>
              <p class="label">{{ $t(`management.consultLabel${index}`) }}</p>
              <FormInput
                class="input"
                :placeholder="$t('management.timePlaceholder')"
                :value="item.time"
                :disabled="!(item.selected && item.status != 1)"
                :timer="true"
              />
              <div class="statusBox" v-if="item.status == 1">
                <img src="@/assets/counseling/report.svg" />
                <p>{{ $t("management.finishTips") }}</p>
              </div>
            </div>
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
export default {
  props: ["info"],
  components: {
    // Dialog,
    FormInput,
    // FormRadio,
    FormTextarea,
    CButton,
  },
  data() {
    return {
      consultCheckbox: [],
    };
  },
  mounted() {
    let consultCheckbox = [];
    this.info.consult.forEach((item, index) => {
      consultCheckbox.push({
        selected: item.time != null,
        ...item,
      });
    });
    this.consultCheckbox = consultCheckbox;
    this.$emit("setSuffixMenu", [this.info.name]);
  },
  methods: {
    selectItem(index) {
      this.consultCheckbox[index].selected = !this.consultCheckbox[index]
        .selected;
      this.$forceUpdate();
    },
    goBack() {
      this.$emit("closeDetail");
    },
    saveInfo() {},
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
            align-items: center;
            white-space: nowrap;
            .checkbox {
              width: 14px;
              flex-shrink: 0;
            }
            img {
              cursor: pointer;
            }
            .label {
              min-width: 164px;
              text-align: left;
              margin-left: 10px;
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
              p {
                font-size: 14px;
                color: #666666;
                line-height: 20px;
                margin-left: 10px;
              }
              img {
                width: 20px;
                cursor: default;
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