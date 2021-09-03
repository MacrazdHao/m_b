<template>
  <div class="DistributeBox">
    <CustomDialog
      class="distributeDialog"
      v-if="!loadingInfo"
      :visible="show"
      :title="$t('students.list.distributeButton')"
      @confirm="confirmBtn"
      @cancel="cancelBtn"
    >
      <div class="templateList">
        <div class="templateItem" v-if="!templates.length"></div>
        <div
          :class="[
            'templateItem',
            selected == index ? 'templateItem--selected' : '',
          ]"
          v-for="(item, index) in templates"
          :key="index"
          @click="selected = index"
        >
          <div class="templateInfo">
            <p class="templateContent">
              {{ $t("modules.list.table.stage1") }}({{ item.initDiscussTimes
              }}{{ $t("modules.list.table.unit") }})+{{
                $t("modules.list.table.stage2")
              }}({{ item.onionCircleTimes
              }}{{ $t("modules.list.table.unit") }})+{{
                $t("modules.list.table.stage3")
              }}({{ item.estuaryCircleTimes
              }}{{ $t("modules.list.table.unit") }})
            </p>
            <p class="templateNum">人数：{{ item.remainAuthCount }}</p>
          </div>
          <img
            class="selectTag"
            v-show="selected == index"
            src="@/assets/students/checkbox_selected.svg"
          />
        </div>
      </div>
    </CustomDialog>
  </div>
</template>

<script>
import CustomDialog from "@/components/common/customDialog";
export default {
  props: ["visible"],
  components: {
    CustomDialog,
  },
  data() {
    return {
      loadingInfo: true,
      templates: [],
      selected: null,
    };
  },
  computed: {
    show() {
      return this.visible;
    },
  },
  mounted() {
    this.initList();
  },
  methods: {
    initList() {
      this.loadingInfo = true;
      this.$store
        .dispatch("students/getTemplateList")
        .then((res) => {
          this.templates = res.data;
          this.loadingInfo = false;
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("students.list.getTemplateListErrorTips"),
          });
          this.cancelBtn();
        });
    },
    confirmBtn() {
      if (this.selected === null) {
        this.$message.warning({
          text: this.$t("students.list.selectNoTemplateTips"),
        });
        return;
      }
      this.$emit("confirm", this.templates[this.selected].templateId);
    },
    cancelBtn() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
.DistributeBox {
  .CustomDialog {
    .messageBox {
      .content {
        padding: 20px !important;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.DistributeBox {
  .templateList {
    display: flex;
    flex-direction: column;

    .templateItem {
      width: calc(100vw - 40px);
      max-width: 935px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 30px 10px 20px;
      box-sizing: border-box;
      cursor: pointer;
      .templateInfo {
        display: flex;
        flex-direction: row;
        flex: 1;
        p {
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          white-space: nowrap;
          user-select: none;
        }
        p + p {
          margin-left: 30px;
        }
      }
      .selectTag {
        width: 20px;
        height: 20px;
        margin-left: 12px;
      }
    }
    .templateItem--selected {
      background-color: #f1f4ff;
    }
    .templateItem + .templateItem {
      margin-top: 10px;
    }
  }
}
</style>