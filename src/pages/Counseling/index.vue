<template>
  <div class="Counseling">
    <div class="stepsBox">
      <div
        :class="[
          'stepsItem',
          'stepsItem-1',
          step == 1 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step_first${
              step == 1 ? '_selected' : ''
            }.png`) +
            ') no-repeat',
        }"
      >
        <p>1. {{ $t("counseling.step1.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-2',
          step == 2 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step${
              step == 2 ? '_selected' : ''
            }.png`) +
            ') no-repeat',
        }"
      >
        <p>2. {{ $t("counseling.step2.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-3',
          step == 3 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step${
              step == 3 ? '_selected' : ''
            }.png`) +
            ') no-repeat',
        }"
      >
        <p>3. {{ $t("counseling.step3.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-4',
          step == 4 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step${
              step == 4 ? '_selected' : ''
            }.png`) +
            ') no-repeat',
        }"
      >
        <p>4. {{ $t("counseling.step4.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-5',
          step == 5 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step${
              step == 5 ? '_selected' : ''
            }.png`) +
            ') no-repeat',
        }"
      >
        <p>5. {{ $t("counseling.step5.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-6',
          step == 6 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step_last${
              step == 6 ? '_selected' : ''
            }.png`) +
            ') no-repeat',
        }"
      >
        <p>6. {{ $t("counseling.step6.title") }}</p>
      </div>
    </div>
    <transition name="slide-fade">
      <BaseInfo
        v-if="step == 1"
        @setSuffixMenu="setSuffixMenu"
        @nextStep="nextStep"
      />
      <OnlineTest
        v-if="step == 2"
        @setSuffixMenu="setSuffixMenu"
        @nextStep="nextStep"
      />
      <MatchConsultant
        v-if="step == 3"
        :step="step"
        @setSuffixMenu="setSuffixMenu"
        @nextStep="nextStep"
      />
      <MatchConsultant
        v-if="step == 4"
        :step="step"
        @setSuffixMenu="setSuffixMenu"
        @nextStep="nextStep"
      />
      <MatchConsultant
        v-if="step == 5"
        :step="step"
        @setSuffixMenu="setSuffixMenu"
        @nextStep="nextStep"
      />
      <OutputReport
        v-if="step == 6"
        @setSuffixMenu="setSuffixMenu"
      />
    </transition>
  </div>
</template>

<script>
import BaseInfo from "./steps/baseInfo.vue";
import OnlineTest from "./steps/test.vue";
import MatchConsultant from "./steps/match.vue";
import OutputReport from "./steps/report.vue";
export default {
  components: {
    BaseInfo,
    OnlineTest,
    MatchConsultant,
    OutputReport
  },
  data() {
    return {
      step: 6,
    };
  },
  mounted() {},
  methods: {
    nextStep() {
      this.step++;
    },
    setSuffixMenu(arr) {
      this.$emit("setSuffixMenu", arr);
    },
  },
};
</script>

<style lang="scss" scoped>
.Counseling {
  background: #fff;
  box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
  width: 100%;
  margin-bottom: 24px;
  p {
    margin: 0;
  }
  .stepsBox {
    display: flex;
    flex-direction: row;
    padding: 22px 24px 0 24px;
    width: 100%;
    box-sizing: border-box;
    .stepsItem {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      // background-color: #f4f7fa;
      // white-space: nowrap;
      // padding: 15px 0 15px 0;
      min-width: calc(100% / 6);
      min-height: 50px;
      box-sizing: border-box;
      background-size: 100% 100% !important;
    }
    p {
      // margin-left: 21.19%;
    }
    .stepsItem--selected {
      color: #ffffff;
      // background-color: #4b77f6;
    }
    .stepsItem-1 {
      p {
        margin-left: -5.978%;
      }
    }
    .stepsItem-2,
    .stepsItem-3,
    .stepsItem-4,
    .stepsItem-5 {
    }
    .stepsItem-6 {
      p {
        margin-right: -5.978%;
      }
    }
  }
}
</style>