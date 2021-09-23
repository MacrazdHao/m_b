<template>
  <div class="SetConsultTimeBox">
    <CustomDialog
      class="setConsultTimeDialog"
      v-if="_initInfo && consultInfo"
      :visible="show"
      :title="$t('estuary.setConsultTimeBox.title')"
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
          <p class="label">{{ $t("estuary.records.consultantName") }}：</p>
          <p>{{ _initInfo.consultantInfo.nickName }}</p>
        </div>
        <div class="infoItem">
          <p class="label">{{ $t("estuary.records.consultantCode") }}：</p>
          <p>{{ _initInfo.consultantInfo.userCode }}</p>
        </div>
        <div class="infoItem">
          <p class="label">
            {{ $t("estuary.setConsultTimeBox.consultThemeLabel") }}：
          </p>
          <PInput
            class="input"
            :placeholder="
              $t('estuary.setConsultTimeBox.consultThemePlaceholder')
            "
            :value="liveName"
            @input="
              (text) => {
                liveName = text;
              }
            "
          />
        </div>
        <div class="infoItem">
          <p class="label">
            {{ $t("estuary.setConsultTimeBox.consultTimeLongLabel") }}：
          </p>
          <PInput
            class="input"
            :placeholder="
              $t('estuary.setConsultTimeBox.consultTimeLongPlaceholder')
            "
            :hasUnit="true"
            :unitText="$t('estuary.setConsultTimeBox.hourUnit')"
            type="number"
            :minNumber="0"
            :value="consultTimeLong"
            @input="
              (text) => {
                consultTimeLong = text;
              }
            "
          />
        </div>
        <div class="infoItem">
          <p class="label">
            {{ $t("estuary.setConsultTimeBox.consultTimeLabel") }}：
          </p>
          <DatePicker
            class="picker"
            :placeholder="
              $t('estuary.setConsultTimeBox.consultTimePlaceholder')
            "
            :value="consultTime ? new Date(consultTime) : ''"
            @change="(e) => selectTime(e)"
          />
        </div>
      </div>
    </CustomDialog>
  </div>
</template>

<script>
import CustomDialog from "@/components/common/customDialog";
import DatePicker from "@/components/common/datePicker";
import PInput from "./input";
export default {
  props: ["visible", "initInfo"],
  components: {
    CustomDialog,
    DatePicker,
    PInput,
  },
  data() {
    return {
      consultantList: [],
      selectedResult: null,
      liveName: null,
      consultTimeLong: null,
      consultTime: null,
      searchResult: [],
      searching: false,
      searchError: false,
      consultInfo: null,
    };
  },
  computed: {
    show() {
      return this.visible;
    },
    _initInfo() {
      return this.initInfo;
    },
    form() {
      return {
        ...this.consultInfo,
        nextConsultTitle: this.liveName,
        nextConsultTimeLength: parseInt(this.consultTimeLong * 60),
        nextConsultTime: this.consultTime,
      };
    },
  },
  mounted() {
    console.log("初始信息", this.initInfo);
    this.consultTime = this._initInfo.nextConsultTime;
    this.initList();
  },
  methods: {
    initList() {
      this.$store
        .dispatch("estuary/getStudentConsultInfo", this._initInfo.recordId)
        .then((res) => {
          this.liveName = res.data.nextConsultTitle;
          this.consultTimeLong = (res.data.nextConsultTimeLength / 60).toFixed(2);
          this.consultInfo = res.data;
          this.$nextTick(() => {
            this.$forceUpdate();
          });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("estuary.setConsultTimeBox.getConsultInfoErrorTips"),
          });
          this.cancelBtn();
        });
    },
    selectTime(text) {
      this.consultTime = new Date(text).getTime();
    },
    confirmBtn() {
      if (this.consultTimeLong < 1) {
        this.$message.warning({
          text: this.$t("estuary.setConsultTimeBox.lessThanOneHourTips"),
        });
        return;
      }
      this.$emit("confirm", this.form);
    },
    cancelBtn() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
.SetConsultTimeBox {
  .CustomDialog {
    .messageBox {
      max-height: 540px !important;
      .content {
        padding: 30px 30px 76px 30px !important;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.SetConsultTimeBox {
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
      .picker {
        height: 32px;
        max-width: 298px;
      }
    }
  }
}
</style>