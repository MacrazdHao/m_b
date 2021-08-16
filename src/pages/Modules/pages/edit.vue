<template>
  <div class="Business">
    <div class="content">
      <div class="content-item">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("modules.edit.nameTitle") }}</p>
        </div>
        <div class="form">
          <div class="form-item">
            <p class="item-label">
              {{ $t("modules.edit.nameLabel") }}
            </p>
            <p class="item-content">
              <FormInput
                class="input"
                :placeholder="$t('modules.edit.namePlaceholder')"
                :value="name"
                @input="
                  (text) => {
                    name = text;
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
          <div class="modulesBox">
            <div class="moduleItem">
              <div
                :class="[
                  'selection',
                  getShowContent() ? '' : 'selection--nothing',
                ]"
              >
                <CCheckBox
                  :data="stageSelection"
                  @setValue="
                    (valIndex) => {
                      setStage(valIndex);
                    }
                  "
                />
              </div>
              <div
                :class="[
                  getShowContent() ? 'moduleData' : 'moduleData--nothing',
                ]"
              >
                <div class="form-item" v-if="hasInitDiscuss">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage1Placeholder')"
                      :value="initDiscussTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(0, val)"
                    />
                  </p>
                </div>
                <div class="form-item" v-if="hasOnionCircle">
                  <p class="item-label">
                    {{ $t("school.business.stage2Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage2Placeholder')"
                      :value="onionCircleTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(1, val)"
                    />
                  </p>
                </div>
                <div class="form-item" v-if="hasEstuary">
                  <p class="item-label">
                    {{ $t("school.business.stage3Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage3Placeholder')"
                      :value="estuaryCircleTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(2, val)"
                    />
                  </p>
                </div>
                <div class="form-item" v-if="hasBayes">
                  <p class="item-label">
                    {{ $t("school.business.stage4Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage4Placeholder')"
                      :value="bayesTimes"
                      type="number"
                      :minNumber="0"
                      @input="(val) => setConsultCount(3, val)"
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
import FormInput from "../../School/components/input.vue";
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
      id: null,
      templateId: null,
      name: null,
      hasInitDiscuss: 0,
      hasOnionCircle: 0,
      hasEstuary: 0,
      hasBayes: 0,
      initDiscussTimes: 0,
      onionCircleTimes: 0,
      estuaryCircleTimes: 0,
      bayesTimes: 0,
      stageSelection: [],
    };
  },
  computed: {
    form() {
      return {
        id: this.id,
        templateId: this.templateId,
        name: this.name,
        hasInitDiscuss: this.hasInitDiscuss,
        hasOnionCircle: this.hasOnionCircle,
        hasEstuary: this.hasEstuary,
        hasBayes: this.hasBayes,
        initDiscussTimes: this.hasInitDiscuss
          ? parseInt(this.initDiscussTimes)
          : 0,
        onionCircleTimes: this.hasOnionCircle
          ? parseInt(this.onionCircleTimes)
          : 0,
        estuaryCircleTimes: this.hasEstuary
          ? parseInt(this.estuaryCircleTimes)
          : 0,
        bayesTimes: this.hasBayes ? parseInt(this.bayesTimes) : 0,
      };
    },
  },
  mounted() {
    if (this.$route.query.id == "new") {
      this.$emit("setSuffixMenu", [this.$t("modules.edit.createNewModule")]);
      this.stageSelection = [
        {
          name: this.$t("school.business.stage1"),
          value: 0,
          selected: false,
        },
        {
          name: this.$t("school.business.stage2"),
          value: 1,
          selected: false,
        },
        {
          name: this.$t("school.business.stage3"),
          value: 2,
          selected: false,
        },
        {
          name: this.$t("school.business.stage4"),
          value: 3,
          selected: false,
        },
      ];
    } else this.initInfo();
  },
  methods: {
    initInfo() {
      this.$store
        .dispatch("modules/getModuleInfo", this.$route.query.id)
        .then((res) => {
          this.$emit("setSuffixMenu", [res.data.name]);
          for (let key in res.data) {
            this[key] = res.data[key];
          }
          this.stageSelection = [
            {
              name: this.$t("school.business.stage1"),
              value: 0,
              selected: this[this.selectionIndexToKey(0)] == 1,
            },
            {
              name: this.$t("school.business.stage2"),
              value: 1,
              selected: this[this.selectionIndexToKey(1)] == 1,
            },
            {
              name: this.$t("school.business.stage3"),
              value: 2,
              selected: this[this.selectionIndexToKey(2)] == 1,
            },
            {
              name: this.$t("school.business.stage4"),
              value: 3,
              selected: this[this.selectionIndexToKey(3)] == 1,
            },
          ];
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("school.business.getTemplateErrorTips"),
          });
          this.goBack();
        });
    },
    getShowContent() {
      return (
        this.hasInitDiscuss ||
        this.hasOnionCircle ||
        this.hasEstuary ||
        this.hasBayes
      );
    },
    setStage(valIndex) {
      for (let i = 0; i < 4; i++) {
        this[this.selectionIndexToKey(i)] = valIndex.includes(i) ? 1 : 0;
      }
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
    setConsultCount(valIndex, val) {
      this[this.stageIndexToKey(valIndex)] = val;
    },
    submit() {
      this.$store
        .dispatch(
          this.$route.query.id == "new"
            ? "modules/createTemplate"
            : "modules/editTemplateInfo",
          this.form
        )
        .then((res) => {
          this.$message.message({
            text: this.$t(
              `school.business.${
                this.$route.query.id == "new" ? "create" : "save"
              }TemplateSuccessTips`
            ),
          });
          this.goBack();
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t(
              `school.business.${
                this.$route.query.id == "new" ? "create" : "save"
              }TemplateErrorTips`
            ),
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
            width: 500px;
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
          // margin-top: 20px;
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