<template>
  <div class="Business">
    <div class="content">
      <div class="content-item">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("school.business.distributionTitle") }}</p>
        </div>
        <div class="form">
          <div class="form-item">
            <p class="item-label">
              {{ $t("school.business.peopleNumLabel") }}
            </p>
            <p class="item-content">
              <FormInput
                class="input"
                :placeholder="$t('school.business.peopleNumPlaceholder')"
                :value="authStudentCount"
                type="number"
                :minNumber="0"
                @input="
                  (text) => {
                    authStudentCount = text;
                  }
                "
              />
            </p>
          </div>
        </div>
      </div>
      <div class="content-item">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("school.business.stageTitle") }}</p>
        </div>
        <div class="form">
          <div class="header">
            <div class="addButton" @click="addTemplate">
              <img src="@/assets/school/icon_add.svg" />
              <p>{{ $t("school.business.addButton") }}</p>
            </div>
          </div>
          <div class="modulesBox">
            <div
              class="moduleItem"
              :id="`template${index}`"
              v-for="(item, index) in templateDTOList"
              :key="index"
            >
              <div
                :class="[
                  'selection',
                  getShowContent(item) ? '' : 'selection--nothing',
                ]"
              >
                <CCheckBox
                  :data="getStageSelection(index)"
                  @setValue="
                    (valIndex) => {
                      setStage(index, valIndex);
                    }
                  "
                />
              </div>
              <div
                :class="[
                  getShowContent(item) ? 'moduleData' : 'moduleData--nothing',
                ]"
              >
                <div class="form-item" v-if="item.hasInitDiscuss">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage1Placeholder')"
                      :value="item.initDiscussTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(index, 0, val)"
                    />
                  </p>
                </div>
                <div class="form-item" v-if="item.hasOnionCircle">
                  <p class="item-label">
                    {{ $t("school.business.stage2Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage2Placeholder')"
                      :value="item.onionCircleTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(index, 1, val)"
                    />
                  </p>
                </div>
                <div class="form-item" v-if="item.hasEstuary">
                  <p class="item-label">
                    {{ $t("school.business.stage3Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage3Placeholder')"
                      :value="item.estuaryCircleTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(index, 2, val)"
                    />
                  </p>
                </div>
                <div class="form-item" v-if="item.hasBayes">
                  <p class="item-label">
                    {{ $t("school.business.stage4Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage4Placeholder')"
                      :value="item.bayesTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(index, 3, val)"
                    />
                  </p>
                </div>
                <div class="form-item" v-if="getShowContent(item)">
                  <p class="item-label">
                    {{ $t("school.business.moduleNumLabel") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.moduleNumPlaceholder')"
                      :value="item.remainAuthCount"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setTemplateCount(index, val)"
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="$t('school.business.cancelButton')"
        @btnClick="goBack()"
      />
      <CButton
        class="button"
        :text="$t('school.business.saveButton')"
        theme="blue"
        @btnClick="submit"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
import FormInput from "../components/input.vue";
import defaultBackMixin from "@/mixins/defaultBack";
import CCheckBox from "../components/checkbox_row";
export default {
  mixins: [defaultBackMixin],
  components: {
    FormInput,
    CButton,
    CCheckBox,
  },
  data() {
    return {
      school: null,
      authStudentCount: 0,
      id: null,
      remainStudentCount: 0,
      schoolId: null,
      status: null,
      templateDTOList: [],
      tenantId: null,
    };
  },
  computed: {
    form() {
      let templateDTOList = [...this.templateDTOList];
      for (let i = 0; i < templateDTOList.length; i++) {
        if (templateDTOList[i].initDiscussTimes < 0)
          templateDTOList[i].initDiscussTimes = 0;
        if (templateDTOList[i].onionCircleTimes < 0)
          templateDTOList[i].onionCircleTimes = 0;
        if (templateDTOList[i].estuaryCircleTimes < 0)
          templateDTOList[i].estuaryCircleTimes = 0;
        if (templateDTOList[i].bayesTimes < 0)
          templateDTOList[i].bayesTimes = 0;
        if (templateDTOList[i].remainAuthCount < 0)
          templateDTOList[i].remainAuthCount = 0;
      }
      return {
        authStudentCount: this.authStudentCount,
        id: this.id,
        remainStudentCount: this.remainStudentCount,
        schoolId: this.$route.query.id,
        status: this.status,
        templateDTOList,
        tenantId: this.tenantId,
      };
    },
  },
  watch: {
    authStudentCount(val) {
      if (!val) return;
      if (val < 0) {
        this.authStudentCount = 0;
      }
    },
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    initInfo() {
      this.$store
        .dispatch("school/getSchoolInfo", this.$route.query.id)
        .then((res) => {
          this.school = res.data;
          this.$emit("setSuffixMenu", [this.school.orgName]);
          this.$store
            .dispatch("school/getSchoolTemplate", this.$route.query.id)
            .then((res2) => {
              for (let key in res2.data) {
                this[key] = res2.data[key];
              }
            })
            .catch((err2) => {
              this.$message.error({
                text: this.$t("school.business.getTemplateErrorTips"),
              });
              this.goBack();
            });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("school.students.getInfoErrorTips"),
          });
          this.goBack();
        });
    },
    addTemplate() {
      this.templateDTOList.push({
        bayesTimes: 0,
        estuaryCircleTimes: 0,
        hasBayes: 0,
        hasEstuary: 0,
        hasInitDiscuss: 0,
        hasOnionCircle: 0,
        id: 0,
        initDiscussTimes: 0,
        instanceNum: 0,
        onionCircleTimes: 0,
        remainAuthCount: 0,
        schoolId: this.$route.query.id,
        status: 0,
        templateId: 0,
        templateStatus: 0,
      });
    },
    getShowContent(item) {
      return (
        item.hasInitDiscuss ||
        item.hasOnionCircle ||
        item.hasEstuary ||
        item.hasBayes
      );
    },
    setStage(index, valIndex) {
      let result = {
        ...this.templateDTOList[index],
      };
      for (let i = 0; i < 4; i++) {
        result[this.selectionIndexToKey(i)] = valIndex.includes(i) ? 1 : 0;
      }
      this.$set(this.templateDTOList, index, result);
      console.log(this.templateDTOList[index]);
    },
    getStageSelection(index) {
      return [
        {
          name: this.$t("school.business.stage1"),
          value: 0,
          selected:
            this.templateDTOList[index][this.selectionIndexToKey(0)] == 1,
        },
        {
          name: this.$t("school.business.stage2"),
          value: 1,
          selected:
            this.templateDTOList[index][this.selectionIndexToKey(1)] == 1,
        },
        {
          name: this.$t("school.business.stage3"),
          value: 2,
          selected:
            this.templateDTOList[index][this.selectionIndexToKey(2)] == 1,
        },
        {
          name: this.$t("school.business.stage4"),
          value: 3,
          selected:
            this.templateDTOList[index][this.selectionIndexToKey(3)] == 1,
        },
      ];
    },
    selectionIndexToKey(index) {
      switch (index) {
        case 0:
          return "hasInitDiscuss";
        case 1:
          return "hasOnionCircle";
        case 2:
          return "hasEstuary";
        case 3:
          return "hasBayes";
      }
    },
    stageIndexToKey(index) {
      switch (index) {
        case 0:
          return "initDiscussTimes";
        case 1:
          return "onionCircleTimes";
        case 2:
          return "estuaryCircleTimes";
        case 3:
          return "bayesTimes";
      }
    },
    setConsultCount(index, valIndex, val) {
      let result = {
        ...this.templateDTOList[index],
      };
      result[this.stageIndexToKey(valIndex)] = parseInt(val);
      this.$set(this.templateDTOList, index, result);
    },
    setTemplateCount(index, val) {
      this.$set(this.templateDTOList, index, {
        ...this.templateDTOList[index],
        remainAuthCount: parseInt(val),
      });
    },
    submit() {
      let checkArr = this.templateDTOList.map((item, index) => {
        return JSON.stringify({
          hasInitDiscuss: item.hasInitDiscuss,
          hasOnionCircle: item.hasOnionCircle,
          hasEstuary: item.hasEstuary,
          hasBayes: item.hasBayes,
          initDiscussTimes: item.initDiscussTimes,
          onionCircleTimes: item.onionCircleTimes,
          estuaryCircleTimes: item.estuaryCircleTimes,
          bayesTimes: item.bayesTimes,
          remainAuthCount: item.remainAuthCount,
        });
      });
      for (let index = 0; index < checkArr.length; index++) {
        let item = checkArr[index];
        if (checkArr.indexOf(item) != checkArr.lastIndexOf(item)) {
          console.log("存在重复", index);
          document.getElementById(`template${index}`).scrollIntoView();
          this.$message.warning({
            text: this.$t("school.business.repeatTemplateErrorTips"),
          });
          return;
        }
      }
      this.$store
        .dispatch("school/updateSchoolTemplate", this.form)
        .then((res) => {
          this.$message.message({
            text: this.$t("school.business.saveTemplateSuccessTips"),
          });
          // this.goBack();
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("school.business.saveTemplateErrorTips"),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Business {
  width: 100%;
  min-height: 792px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .content {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    margin-top: 28px;
    // padding-bottom: 32px;
    padding: 0 24px 32px 24px;
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
          white-space: nowrap;
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
            line-height: 32px;
            white-space: nowrap;
          }
          .item-content {
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            width: 100px;
          }
        }
        .header {
          width: 100%;
          background: #f4f7fa;
          border-radius: 4px;
          padding: 10px 16px;
          box-sizing: border-box;
          .addButton {
            display: flex;
            flex-direction: row;
            align-items: center;
            border-radius: 2px;
            border: 1px dotted #4b77f6;
            width: fit-content;
            padding: 7px 16px;
            cursor: pointer;
            user-select: none;
            white-space: nowrap;
            img {
              width: 10px;
              height: 10px;
              margin-right: 6px;
            }
            p {
              font-size: 14px;
              color: #4b77f6;
              line-height: 20px;
            }
          }
        }
        .modulesBox {
          margin-top: 20px;
          width: 100%;
          display: flex;
          flex-direction: column;
          .moduleItem + .moduleItem {
            margin-top: 20px;
            .moduleData {
              background: #fff;
            }
          }
          .moduleItem {
            width: 100%;
            background: #ffffff;
            border-radius: 4px;
            border: 1px solid #d3d3d3;
            .selection {
              border-bottom: 1px solid #d3d3d3;
              padding: 16px 20px;
            }
            .selection--nothing {
              border-bottom: 0px;
            }
            .moduleData--nothing {
              height: 0;
              padding: 0;
            }
            .moduleData {
              padding: 20px;
              background: #fafafa;
              .form-item + .form-item {
                margin-top: 12px;
              }
              .form-item {
                .item-label {
                  height: 38px;
                  line-height: 38px;
                }
                .item-content {
                  flex: 1;
                  .input {
                    width: 100%;
                    max-width: 360px;
                    background-color: #fff;
                    padding: 8px 9px;
                  }
                }
              }
            }
          }
        }
      }
      .button {
        padding: 7px 20px;
        margin-left: 10px;
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
    border-top: 1px solid #d3d3d3;
    .button {
      width: 90px !important;
    }
    .button + .button {
      margin-left: 80px;
    }
  }
}
</style>