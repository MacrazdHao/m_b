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
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.name.label") }}：
            </p>
            <FormInput
              class="item-content"
              :placeholder="$t('counseling.step1.baseInfo.name.placeholder')"
              :value="name"
              @input="setName"
            />
          </div>
          <div class="form-item">
            <p class="item-label">
              {{ $t("counseling.step1.baseInfo.class.label") }}：
            </p>
            <FormInput
              class="item-content"
              :placeholder="$t('counseling.step1.baseInfo.class.placeholder')"
              :value="gradeclass"
              @input="setClass"
            />
          </div>
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
                      :disableButton="
                        item2.uploadProgress < 100 && !item2.uploadError
                      "
                      @btnClick="(info) => deleteFile(index2, info)"
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
    <input
      ref="fileUpload"
      type="file"
      @change="uploadFile"
      v-show="false"
      accept=".pdf"
    />
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
import FormInput from "../components/input.vue";
import FormRadio from "../components/radio.vue";
import FormTextarea from "../components/textarea.vue";
import FileBox from "@/components/common/file";
import { getFileSizeString } from "@/utils/others";
export default {
  components: {
    // Dialog,
    FormInput,
    FormRadio,
    FormTextarea,
    CButton,
    FileBox,
  },
  data() {
    return {
      uploading: false,
      deleting: false,
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
      evaluation: "",
      extracurricular: "",
      book: "",
      sport: "",
      showLeaveDialog: true,
      scoreFiles: [],
    };
  },
  computed: {
    stateInfo() {
      return this.$store.state.counseling.stateInfo;
    },
    language() {
      return this.$i18n.locale;
    },
    form() {
      return {
        extracurricularStudy: this.extracurricular,
        gender: this.sex.value,
        gradeName: this.gradeclass,
        nation: this.country.value,
        readingCategory: this.book,
        realName: this.name,
        selfEvaluation: this.evaluation,
        sportHobby: this.sport,
        subjectAchievement: this.scoreFiles.map((item, index) => {
          return {
            name: item.fileName,
            originFormat: item.fileType,
            size: item.fileSizeNumber,
            url: item.fileURL,
          };
        }),
        nodeType: this.stateInfo.nodeType,
        instanceId: this.stateInfo.instanceId,
        nodeId: this.stateInfo.nodeId,
        nodeName: this.stateInfo.nodeName,
        tenantId: this.stateInfo.tenantId,
      };
    },
  },
  mounted() {},
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
    uploadScoreFile() {
      this.$refs.fileUpload.click();
    },
    uploadFile(e) {
      if (this.uploading) {
        this.$message.warning({
          text: this.$t("counseling.step1.baseInfo.uploadingFile"),
        });
        return;
      }
      if (this.scoreFiles.length == 3) {
        this.$message.warning({
          text: this.$t("counseling.step1.baseInfo.uploadTips"),
        });
        return;
      }
      let file = e.target;
      if (!file || file.files.length == 0) return;
      if (file.files[0].size > 20 * 1024 * 1024) {
        this.$message.warning({
          text: this.$t("personal.base.failTips.uploadBig"),
        });
        return;
      }
      this.uploading = true;
      let reader = new FileReader();
      reader.readAsDataURL(file.files[0]);

      let fileName = file.files[0].name;
      let fileType = fileName.substring(
        fileName.lastIndexOf(".") + 1,
        fileName.length
      );
      if (fileType != "pdf") {
        this.$message.warning({
          text: this.$t("personal.base.failTips.uploadType"),
        });
        return;
      }
      if (!file.files || !file.files[0]) {
        return;
      }
      let index = this.scoreFiles.length;
      this.scoreFiles.push({
        fileURL: null,
        fileName: fileName,
        fileType: "pdf",
        fileSize: getFileSizeString(file.files[0].size, 2),
        fileSizeNumber: file.files[0].size,
        uploadProgress: 0,
        uploadError: false,
      });
      let fd = new FormData();
      fd.append("file", file.files[0]);
      this.$store
        .dispatch("counseling/uploadScoreFile", {
          file: fd,
          progressCallback: (e) => {
            this.$set(this.scoreFiles, index, {
              ...this.scoreFiles[index],
              uploadProgress: ((e.loaded / e.total) * 100) | 0,
            });
          },
        })
        .then((res) => {
          this.$message.message({
            text: this.$t("personal.base.successTips.uploadSuccess"),
          });
          this.$set(this.scoreFiles, index, {
            ...this.scoreFiles[index],
            fileURL: res.data.url,
            uploadProgress: 100,
          });
          this.$refs.fileUpload.value = "";
          this.uploading = false;
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("personal.base.failTips.uploadFail"),
          });
          this.$set(this.scoreFiles, index, {
            ...this.scoreFiles[index],
            uploadError: true,
          });
          this.$refs.fileUpload.value = "";
          this.uploading = false;
        });
    },
    deleteFile(index, info) {
      if (this.deleting) {
        this.$message.warning({
          text: this.$t("counseling.step1.baseInfo.deletingFile"),
        });
        return;
      }
      this.deleting = true;
      this.scoreFiles = this.scoreFiles.filter((value, _index) => {
        return _index != index;
      });
      this.deleting = false;
    },
    submit() {
      this.$store
        .dispatch("counseling/submitBaseInfo", this.form)
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
        .form-item {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 10px;
          width: 100%;
          max-width: 718px;
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
            flex: 1;
          }
        }
        .form-item + .form-item,
        .formInput + .formInput,
        .form-item + .formInput {
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