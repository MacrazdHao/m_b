<template>
  <div class="Detail" v-if="loaded">
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
            <p class="item-content">{{ nickName }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.class.label") }}：
            </p>
            <p class="item-content">{{ gradeName }}</p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.sex.label") }}：
            </p>
            <p class="item-content">
              {{
                gender == 0
                  ? $t("counseling.step1.baseInfo.sex.boy")
                  : $t("counseling.step1.baseInfo.sex.girl")
              }}
            </p>
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.country.label") }}：
            </p>
            <p class="item-content">
              {{
                nation == 0
                  ? $t("counseling.step1.baseInfo.country.china")
                  : $t("counseling.step1.baseInfo.country.foreign")
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
          <div class="scoreBox">
            <p class="label">
              {{ $t("counseling.step1.academic.score.label") }}：
            </p>
            <div class="scoreUploadBox">
              <p class="uploadTips">
                {{ $t("students.detail.noScoreTips") }}
              </p>
              <!-- <CButton
                class="uploadButton"
                :text="$t('counseling.step1.baseInfo.uploadButton')"
                theme="wathat"
                @btnClick="uploadScoreFile"
              /> -->
              <div class="filesBox">
                <template v-for="(item2, index2) in scoreFiles">
                  <div class="file" :key="index2">
                    <FileBox
                      :info="item2"
                      :buttonText="$t('counseling.step1.baseInfo.deleteButton')"
                      :disableButton="
                        item2.uploadProgress < 100 && !item2.uploadError
                      "
                      @btnClick="watchScore"
                    />
                  </div>
                  {{ "" }}
                </template>
              </div>
            </div>
          </div>
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.evaluation.label')"
            :placeholder="
              $t('counseling.step1.academic.evaluation.placeholder')
            "
            :value="selfEvaluation"
            :maxLength="800"
            :disabled="true"
          />
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.academic.extracurricular.label')"
            :placeholder="
              $t('counseling.step1.academic.extracurricular.placeholder')
            "
            :value="extracurricularStudy"
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
            :value="readingCategory"
            :maxLength="500"
            :disabled="true"
          />
          <FormTextarea
            class="formInput"
            :label="$t('counseling.step1.hobby.sport.label')"
            :placeholder="$t('counseling.step1.hobby.sport.placeholder')"
            :value="sportHobby"
            :maxLength="800"
            :disabled="true"
          />
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="$t('students.detail.backButton')"
        theme="blue"
        @btnClick="goBack"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
import FormInput from "../components/input.vue";
// import FormRadio from "../components/radio.vue";
import FormTextarea from "../components/textarea.vue";
import FileBox from "@/components/common/file";
import { getFileSizeString } from "@/utils/others";
export default {
  components: {
    // Dialog,
    FormInput,
    // FormRadio,
    FormTextarea,
    CButton,
    FileBox,
  },
  data() {
    return {
      loaded: false,
      extracurricularStudy: "",
      gender: null,
      gradeId: null,
      gradeName: null,
      nation: null,
      nickName: "",
      readingCategory: "",
      schoolId: null,
      schoolName: null,
      selfEvaluation: "",
      sportHobby: "",
      subjectAchievement: [],
      userCode: "",
    };
  },
  computed: {
    scoreFiles() {
      return this.subjectAchievement.map((value, index) => {
        return {
          fileURL: this.$_default.ossUrl + value.url,
          fileName: value.name,
          fileType: value.originFormat,
          fileSize: getFileSizeString(parseInt(value.size), 2),
          fileSizeNumber: parseInt(value.size),
          uploadProgress: 100,
          uploadError: false,
        };
      });
    },
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    initInfo() {
      this.loaded = false;
      this.$store
        .dispatch("students/getStudentInfo", this.$route.query.id)
        .then((res) => {
          this.$emit("setSuffixMenu", [res.data.nickName]);
          for (let key in res.data) {
            this[key] = res.data[key];
          }
          this.loaded = true;
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("students.detail.getStudentInfoFail"),
          });
        });
    },
    watchScore(info) {
      window.open(info.url);
    },
    goBack() {
      this.$emit("closeDetail");
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