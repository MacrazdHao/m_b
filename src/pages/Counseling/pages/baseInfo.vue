<template>
  <div class="BaseInfo">
    <div class="lawTipsBox">
      <p class="lawTips">
        {{ $t("counseling.step1.lawTips") }}
      </p>
    </div>
    <div class="content">
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("counseling.step1.baseInfo.title") }}</p>
        </div>
        <div class="form">
          <FormInput
            class="formInput"
            :label="$t('counseling.step1.baseInfo.name.label')"
            :placeholder="$t('counseling.step1.baseInfo.name.placeholder')"
            :value="name"
            @input="setName"
          />
          <FormInput
            class="formInput"
            :label="$t('counseling.step1.baseInfo.class.label')"
            :placeholder="$t('counseling.step1.baseInfo.class.placeholder')"
            :value="gradeclass"
            @input="setClass"
          />
          <FormRadio
            class="formInput"
            :label="$t('counseling.step1.baseInfo.sex.label')"
            :data="sexData"
            @setValue="setSex"
          />
          <FormRadio
            class="formInput"
            :label="$t('counseling.step1.baseInfo.country.label')"
            :data="countryData"
            @setValue="setCountry"
          />
        </div>
      </div>
      <div class="content-item baseInfoBox">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("counseling.step1.academic.title") }}</p>
        </div>
        <div class="form">
          <!-- <FormTextarea
            class="formInput longInput"
            :label="$t('counseling.step1.academic.score.label')"
            :placeholder="$t('counseling.step1.academic.score.placeholder')"
            :value="score"
            :maxLength="500"
            @input="setScore"
          /> -->
          <div class="scoreBox">
            <p class="label">
              {{ $t("counseling.step1.academic.score.label") }}：
            </p>
            <div class="scoreUploadBox">
              <p class="uploadTips">
                {{ $t("counseling.step1.baseInfo.uploadTips") }}
              </p>
              <CButton
                class="uploadButton"
                :text="$t('counseling.step1.baseInfo.uploadButton')"
                theme="wathat"
                @btnClick="uploadScoreFile"
              />
              <div class="filesBox">
                <template v-for="(item2, index2) in scoreFiles">
                  <div class="file" :key="index2">
                    <FileBox
                      :info="item2"
                      :buttonText="$t('counseling.step1.baseInfo.deleteButton')"
                    />
                  </div>
                  {{ "" }}
                </template>
              </div>
            </div>
          </div>
          <FormTextarea
            class="formInput longInput"
            :label="$t('counseling.step1.academic.evaluation.label')"
            :placeholder="
              $t('counseling.step1.academic.evaluation.placeholder')
            "
            :value="evaluation"
            :maxLength="800"
            @input="setEvaluation"
          />
          <FormTextarea
            class="formInput longInput"
            :label="$t('counseling.step1.academic.extracurricular.label')"
            :placeholder="
              $t('counseling.step1.academic.extracurricular.placeholder')
            "
            :value="extracurricular"
            :maxLength="800"
            @input="setExtracurricular"
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
            class="formInput longInput"
            :label="$t('counseling.step1.hobby.book.label')"
            :placeholder="$t('counseling.step1.hobby.book.placeholder')"
            :value="book"
            :maxLength="500"
            @input="setBook"
          />
          <FormTextarea
            class="formInput longInput"
            :label="$t('counseling.step1.hobby.sport.label')"
            :placeholder="$t('counseling.step1.hobby.sport.placeholder')"
            :value="sport"
            :maxLength="800"
            @input="setSport"
          />
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="$t('counseling.step1.cancelButton')"
        @btnClick="cancel"
      />
      <CButton
        class="button"
        :text="$t('counseling.step1.saveButton')"
        theme="blue"
        @btnClick="submit"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
import FormInput from "../components/input.vue";
import FormRadio from "../components/radio.vue";
import FormTextarea from "../components/textarea.vue";
import FileBox from "@/components/common/file";
export default {
  components: {
    // Dialog,
    FormInput,
    FormRadio,
    FormTextarea,
    CButton,
    FileBox,
  },
  computed: {
    stateInfo() {
      return this.$store.state.counseling.stateInfo;
    },
  },
  data() {
    return {
      sexData: [
        { name: this.$t("counseling.step1.baseInfo.sex.boy"), value: 0 },
        { name: this.$t("counseling.step1.baseInfo.sex.girl"), value: 1 },
      ],
      countryData: [
        { name: this.$t("counseling.step1.baseInfo.country.china"), value: 0 },
        {
          name: this.$t("counseling.step1.baseInfo.country.foreign"),
          value: 1,
        },
      ],
      name: "",
      gradeclass: "",
      sex: {},
      country: {},
      score: "",
      evaluation: "",
      extracurricular: "",
      book: "",
      sport: "",
      showLeaveDialog: true,
      scoreFiles: [
        {
          fileURL: "",
          fileName: "财务报告1.pdf",
          fileType: "pdf",
          fileSize: "9.03MB",
        },
        {
          fileURL: "",
          fileName: "财务报告2.pdf",
          fileType: "pdf",
          fileSize: "9.03MB",
        },
        {
          fileURL: "",
          fileName: "财务报告3.pdf",
          fileType: "pdf",
          fileSize: "9.03MB",
        },
        {
          fileURL: "",
          fileName: "财务报告4.pdf",
          fileType: "pdf",
          fileSize: "9.03MB",
        },
        {
          fileURL: "",
          fileName: "财务报告5.pdf",
          fileType: "pdf",
          fileSize: "9.03MB",
        },
      ],
    };
  },
  computed: {
    language() {
      return this.$i18n.locale;
    },
  },
  watch: {
    language() {
      this.$emit("setSuffixMenu", [this.$t("counseling.step1.title")]);
    },
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.$t("counseling.step1.title")]);
    this.$emit("setStep", 1);
  },
  methods: {
    setName(val) {
      this.name = val;
    },
    setClass(val) {
      this.gradeclass = val;
    },
    setSex(val) {
      this.sex = val;
    },
    setCountry(val) {
      this.country = val;
    },
    setScore(val) {
      this.score = val;
    },
    setEvaluation(val) {
      this.evaluation = val;
    },
    setExtracurricular(val) {
      this.extracurricular = val;
    },
    setBook(val) {
      this.book = val;
    },
    setSport(val) {
      this.sport = val;
    },
    submit() {
      this.$store
        .dispatch("counseling/submitBaseInfo", {
          extracurricularStudy: this.extracurricular,
          gender: this.sex.value,
          gradeName: this.gradeclass,
          nation: this.country.value,
          readingCategory: this.book,
          realName: this.name,
          selfEvaluation: this.evaluation,
          sportHobby: this.sport,
          subjectAchievement: this.score,
          nodeType: this.stateInfo.nodeType,
          instanceId: this.stateInfo.instanceId,
          nodeId: this.stateInfo.nodeId,
          nodeName: this.stateInfo.nodeName,
          tenantId: this.stateInfo.tenantId,
        })
        .then((res) => {
          this.$store.dispatch("counseling/getStateinfo");
        })
        .catch((err) => {
          // this.$message.error({text: this.$t("counseling.step1.tips.submitError")});
        });
    },
    cancel() {
      this.$dialog
        .message({
          text: this.$t("counseling.step1.leaveTips"),
          confirm: () => {},
          cancel: () => {},
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.BaseInfo {
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
        .formInput {
          margin-left: 10px;
        }
        .formInput + .formInput {
          margin-top: 24px;
        }
        .longInput {
          height: 134px;
        }
        .scoreBox {
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          .label {
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            white-space: nowrap;
          }
          .scoreUploadBox {
            margin-left: 29px;
            .uploadTips {
              font-size: 14px;
              color: #999999;
              line-height: 20px;
              text-align: left;
            }
            .uploadButton {
              margin-top: 12px;
            }
            .filesBox {
              // display: flex;
              // flex-direction: row;
              // flex-wrap: wrap;
              margin-top: 16px;
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