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
            <div class="addButton">
              <img src="@/assets/school/icon_add.svg" />
              <p>{{ $t("school.business.addButton") }}</p>
            </div>
          </div>
          <div class="modulesBox">
            <div class="moduleItem">
              <div class="selection">
                <CCheckBox :data="stageSelections" />
              </div>
              <div class="moduleData">
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage1Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage2Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage3Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage4Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.moduleNumLabel") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.moduleNumPlaceholder')"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div class="moduleItem">
              <div class="selection">
                <CCheckBox :data="stageSelections" />
              </div>
              <div class="moduleData">
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage1Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage2Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage3Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.stage1Label") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.stage4Placeholder')"
                    />
                  </p>
                </div>
                <div class="form-item">
                  <p class="item-label">
                    {{ $t("school.business.moduleNumLabel") }}
                  </p>
                  <p class="item-content">
                    <FormInput
                      class="input"
                      :placeholder="$t('school.business.moduleNumPlaceholder')"
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
        @btnClick="nextPage"
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
      stageSelections: [
        {
          name: this.$t("school.business.stage1"),
          value: 0,
        },
        {
          name: this.$t("school.business.stage2"),
          value: 1,
        },
        {
          name: this.$t("school.business.stage3"),
          value: 2,
        },
        {
          name: this.$t("school.business.stage4"),
          value: 3,
        },
      ],
    };
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