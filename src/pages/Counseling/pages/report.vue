<template>
  <div class="Report">
    <div class="outputing" v-if="!finished">
      <img src="@/assets/counseling/report.svg" />
      <p class="title">{{ $t(`counseling.step6.outputingTitle`) }}</p>
      <p class="tips">
        {{ $t(`counseling.step6.outputingTips`, { time }) }}
      </p>
      <CButton
        :class="['button', 'backButton']"
        :text="$t(`counseling.step6.backButton`)"
        theme="blue"
        @btnClick="backToDashboard"
      />
    </div>
    <div class="finish" v-if="finished">
      <img src="@/assets/counseling/success.svg" />
      <p class="title">{{ $t(`counseling.step6.finishTitle`) }}</p>
      <p class="tips">{{ $t(`counseling.step6.finishTips`) }}</p>
      <CButton
        class="button"
        :text="$t(`counseling.step6.reportButton`)"
        theme="blue"
        @btnClick="getReport"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
export default {
  props: ["step"],
  components: {
    CButton,
  },
  data() {
    return {
      finished: true,
    };
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.$t(`counseling.step6.title`)]);
    this.$emit("setStep", 6);
  },
  methods: {
    backToDashboard() {
      this.$router.push({ path: "/" });
    },
    getReport() {},
  },
};
</script>

<style lang="scss" scoped>
.Report {
  p {
    margin: 0;
  }
  .outputing {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 120px;
    padding-bottom: 280px;
    img {
      width: 181px;
    }
    .title {
      margin-top: 12px;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
    }
    .tips {
      margin-top: 16px;
      font-size: 14px;
      color: #666666;
      line-height: 20px;
    }
    .button {
      margin-top: 34px;
    }
    .backButton {
      padding-left: 14px;
      padding-right: 14px;
    }
    .liveButton {
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .finish {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 174px;
    padding-bottom: 346px;
    img {
      width: 60px;
      height: 60px;
    }
    .title {
      margin-top: 12px;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
    }
    .tips {
      margin-top: 16px;
      font-size: 14px;
      color: #666666;
      line-height: 20px;
    }
    .button {
      margin-top: 34px;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
}
</style>