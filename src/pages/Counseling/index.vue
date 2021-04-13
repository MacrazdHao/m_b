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
          'background-size': '100% 100%',
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
          'background-size': '100% 100%',
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
          'background-size': '100% 100%',
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
          'background-size': '100% 100%',
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
          'background-size': '100% 100%',
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
          'background-size': '100% 100%',
        }"
      >
        <p>6. {{ $t("counseling.step6.title") }}</p>
      </div>
    </div>
    <base-info v-if="step == 1" @setSuffixMenu="setSuffixMenu" />
  </div>
</template>

<script>
import BaseInfo from "./steps/baseInfo.vue";
export default {
  components: {
    BaseInfo,
  },
  data() {
    return {
      step: 1,
    };
  },
  mounted() {},
  methods: {
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
      background-size: 100% 100%;
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