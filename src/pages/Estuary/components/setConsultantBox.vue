<template>
  <div class="SetConsultantBox">
    <CustomDialog
      class="setConsultantDialog"
      v-if="_initInfo"
      :visible="show"
      :title="$t('estuary.setConsultantBox.title')"
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
            {{ $t("estuary.setConsultantBox.consultantLabel") }}：
          </p>
          <PInput
            class="input"
            :placeholder="$t('estuary.setConsultantBox.consultantPlaceholder')"
            :value="consultantName"
            :associate="true"
            :asssociateList="searchResult"
            associateItemTextField="nickName"
            :loading="searching"
            :error="searchError"
            :noKeyText="$t('estuary.setConsultantBox.noKeyTips')"
            :loadingText="$t('estuary.setConsultantBox.searchingTips')"
            :errorText="$t('estuary.setConsultantBox.searchingErrorTips')"
            :emptyText="$t('estuary.setConsultantBox.searchingEmptyTips')"
            @input="
              (text) => {
                consultantName = text;
              }
            "
            @handleSelect="handleAssociate"
            @associateLoadMore="associateLoadMore"
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
      selectedResult: null,
      consultantName: "",
      searchResult: [],
      searching: false,
      searchError: false,
      page: {
        dataNum: 10,
        total: 1,
        size: 10,
        current: 1,
      },
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
  watch: {
    consultantName(val) {
      this.selectedResult = null;
      this.searchResult = [];
      // this.searchEmpty = false;
      this.searchError = false;
      if (!val) return;
      this.searching = true;
      this.pageNum = 1;
      this.$store
        .dispatch("estuary/getConsultantList", {
          pageIndex: 1,
          pageSize: this.page.size,
          keyword: val,
        })
        .then((res) => {
          this.searchResult = res.data;
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: res.pageSize,
            current: res.pageIndex,
          };
          if (res.data.length > 0) this.selectedResult = { ...res.data[0] };
          // else this.searchEmpty = true;
          this.searching = false;
        })
        .catch((err) => {
          this.searching = false;
          this.searchError = true;
        });
    },
  },
  mounted() {
    console.log("初始信息", this.initInfo);
  },
  methods: {
    associateLoadMore(e) {
      this.$store
        .dispatch("estuary/getConsultantList", {
          pageIndex: this.page.current + 1,
          pageSize: this.page.size,
          keyword: this.consultantName,
        })
        .then((res) => {
          this.searchResult = [...this.searchResult, ...res.data];
          // this.searching = false;
          this.page = {
            dataNum: res.total,
            total: res.pageTotal,
            size: res.pageSize,
            current: res.pageIndex,
          };
        })
        .catch((err) => {
          // this.searching = false;
          this.searchError = true;
        });
    },
    handleAssociate(index, item) {
      this.selectedResult = { ...item };
      this.consultantName = item.nickName;
    },
    confirmBtn() {
      this.$emit("confirm", this.selectedResult);
    },
    cancelBtn() {
      this.$emit("cancel");
    },
  },
};
</script>

<style lang="scss">
.SetConsultantBox {
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
.SetConsultantBox {
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