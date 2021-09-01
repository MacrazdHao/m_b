<template>
  <div class="SetConsultTimesBox">
    <CustomDialog
      class="setConsultTimesDialog"
      v-if="_initInfo"
      :visible="show"
      :title="$t('estuary.setConsultTimesBox.title')"
      @confirm="confirmBtn"
      @cancel="cancelBtn"
    >
      <div class="infoBox">
        <div class="infoItem">
          <p class="label">{{ $t("estuary.records.studentName") }}：</p>
          <p>{{ _initInfo.studentInfo.nickName }}</p>
        </div>
        <div class="infoItem">
          <p class="label">{{ $t("estuary.records.studentCode") }}：</p>
          <p>{{ _initInfo.studentInfo.userCode }}</p>
        </div>
        <div class="infoItem">
          <p class="label">
            {{ $t("estuary.setConsultTimesBox.consultTimesLabel") }}：
          </p>
          <PInput
            class="input"
            :placeholder="
              $t('estuary.setConsultTimesBox.consultTimesPlaceholder')
            "
            :hasUnit="true"
            :unitText="$t('modules.list.table.unit')"
            type="number"
            :minNumber="_initInfo.currentConsultNum"
            :value="consultTimes"
            @input="
              (text) => {
                consultTimes = text;
              }
            "
          />
        </div>
      </div>
    </CustomDialog>
  </div>
</template>

<script>
import CustomDialog from "@/components/common/customDialog";
import PInput from "./input";
export default {
  props: ["visible", "initInfo"],
  components: {
    CustomDialog,
    PInput,
  },
  data() {
    return {
      consultantList: [],
      selectedResult: null,
      consultTimes: null,
      searchResult: [],
      searching: false,
      searchError: false,
    };
  },
  computed: {
    show() {
      return this.visible;
    },
    _initInfo() {
      return this.initInfo;
    },
  },
  mounted() {
    console.log("初始信息", this.initInfo);
    this.consultTimes = this._initInfo.totalConsultNum;
  },
  methods: {
    confirmBtn() {
      if (this.consultTimes < this._initInfo.currentConsultNum) {
        this.$message.warning({
          text: this.$t("estuary.setConsultTimesBox.lessThanCurrentTimesTips"),
        });
        return;
      }
      this.$emit("confirm", this.consultTimes);
    },
    cancelBtn() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
.SetConsultTimesBox {
  .CustomDialog {
    .messageBox {
      max-height: 540px !important;
      .content {
        padding: 30px 30px 270px 30px !important;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.SetConsultTimesBox {
  p {
    font-size: 14px;
    color: #333333;
    line-height: 20px;
  }
  .infoBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: calc(100vw - 40px);
    max-width: 550px;
    box-sizing: border-box;
    .infoItem + .infoItem {
      margin-top: 24px;
    }
    .infoItem {
      display: flex;
      flex-direction: row;
      align-items: center;
      text-align: left;
      .label {
        width: 99px;
      }
    }
  }
}
</style>