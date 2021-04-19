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
          <p class="title">{{ $t("archives.detail.archives.title") }}</p>
        </div>
        <div class="form">
          <div class="archives"><p>PDF</p></div>
        </div>
      </div>
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("archives.detail.follow.title") }}</p>
        </div>
        <div class="form">
          <FormTextarea
            class="formInput"
            :label="$t('archives.detail.follow.step1Label')"
            :placeholder="$t('archives.detail.follow.step1Placeholder')"
            :value="step1"
            @input="setStep1"
            :maxLength="500"
          />
          <FormTextarea
            class="formInput"
            :label="$t('archives.detail.follow.step2Label')"
            :placeholder="$t('archives.detail.follow.step2Placeholder')"
            :value="step2"
            @input="setStep2"
            :maxLength="800"
          />
          <FormTextarea
            class="formInput"
            :label="$t('archives.detail.follow.step3Label')"
            :placeholder="$t('archives.detail.follow.step3Placeholder')"
            :value="step3"
            @input="setStep3"
            :maxLength="800"
          />
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="$t('archives.detail.cancelButton')"
        @btnClick="goBack"
      />
      <CButton
        class="button"
        :text="$t('archives.detail.saveButton')"
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
      step1: "",
      step2: "",
      step3: "",
    };
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.info.name]);
    this.step1 = this.info.step1;
    this.step2 = this.info.step2;
    this.step3 = this.info.step3;
    console.log(this.info);
  },
  methods: {
    setStep1(val) {
      this.step1 = val;
    },
    setStep2(val) {
      this.step2 = val;
    },
    setStep3(val) {
      this.step3 = val;
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
        .archives {
          width: 100%;
          height: 550px;
          max-width: 718px;
          max-height: 550px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid #979797;
          p {
            font-size: 48px;
            color: #333333;
            line-height: 65px;
          }
        }
        .form-item + .form-item {
          margin-top: 24px;
        }
        .form-item {
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          .item-label {
            margin-right: 29px;
          }
        }
        .formInput {
          margin-left: 10px;
        }
        .formInput + .formInput {
          margin-top: 24px;
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