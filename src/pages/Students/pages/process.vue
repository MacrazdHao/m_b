<template>
  <div class="Process">
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
          <p class="title">{{ $t("students.process.processTitle") }}</p>
        </div>
        <div class="form">
          <div class="form-item">
            <p class="item-label">
              {{ $t("students.process.processLabel") }}：
            </p>
            <div>
              <PCheckbox :data="permissions" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="$t('students.process.cancelButton')"
        @btnClick="goback"
      />
      <CButton
        class="button"
        :text="$t('students.process.saveButton')"
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
import PCheckbox from "../components/checkbox";
export default {
  props: ["info"],
  components: {
    // Dialog,
    FormInput,
    // FormRadio,
    FormTextarea,
    CButton,
    PCheckbox,
  },
  data() {
    return {
      permissions: [
        {
          name: this.$t("students.process.step1"),
          value: 0,
        },
        {
          name: this.$t("students.process.step2"),
          value: 1,
        },
        {
          name: this.$t("students.process.step3"),
          value: 2,
        },
      ],
    };
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.info.name]);
  },
  methods: {
    saveInfo() {
    },
    goback() {
      this.$emit("closeDetail");
    },
  },
};
</script>

<style lang="scss" scoped>
.Process {
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