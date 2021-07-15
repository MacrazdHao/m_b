<template>
  <div class="Counseling">
    <div class="stepsBox">
      <div
        :class="[
          'stepsItem',
          'stepsItem-1',
          stateInfo.nodeType == 11 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step_first${
              stateInfo.nodeType == 11 ? '_selected' : ''
            }.svg`) +
            ') no-repeat center',
        }"
      >
        <p>1. {{ $t("counseling.step1.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-2',
          stateInfo.nodeType == 12 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step${
              stateInfo.nodeType == 12 ? '_selected' : ''
            }.svg`) +
            ') no-repeat center',
        }"
      >
        <p>2. {{ $t("counseling.step2.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-3',
          stateInfo.nodeType == 13 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step${
              stateInfo.nodeType == 13 ? '_selected' : ''
            }.svg`) +
            ') no-repeat center',
        }"
      >
        <p>3. {{ $t("counseling.step3.title") }}</p>
      </div>
      <div
        :class="[
          'stepsItem',
          'stepsItem-4',
          stateInfo.nodeType == 21 ? 'stepsItem--selected' : '',
        ]"
        :style="{
          background:
            'url(' +
            require(`@/assets/counseling/step${
              stateInfo.nodeType == 21 ? '_selected' : ''
            }.svg`) +
            ') no-repeat center',
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
            }.svg`) +
            ') no-repeat center',
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
            }.svg`) +
            ') no-repeat center',
        }"
      >
        <p>6. {{ $t("counseling.step6.title") }}</p>
      </div>
    </div>
    <transition name="slide-fade">
      <router-view
        @setStep="setStep"
        @setSuffixMenu="setSuffixMenu"
        v-if="loaded"
      />
      <div
        style="
          width: 100%;
          height: 100%;
          padding-top: 130px;
          padding-bottom: 280px;
        "
        v-else
      ></div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      step: 1,
      loaded: false,
    };
  },
  computed: {
    stateInfo() {
      return this.$store.state.counseling.stateInfo;
    },
  },
  watch: {
    stateInfo(val) {
      console.log("状态信息更新了");
      this.$router.push({ path: "/index/counseling/baseInfo" });
      // switch (val.nodeType) {
      //   case 11:
      //     this.$router.push({ path: "/index/counseling/baseInfo" });
      //     break;
      //   case 12:
      //     this.$router.push({ path: "/index/counseling/onlineTest" });
      //     break;
      //   case 13:
      //     this.$router.push({ path: "/index/counseling/consultLive" });
      //     break;
      //   case 21:
      //     this.$router.push({ path: "/index/counseling/consultLive" });
      //     break;
      // }
      this.loaded = true;
    },
  },
  mounted() {
    this.$store.dispatch("counseling/getStateinfo");
  },
  methods: {
    nextStep() {
      this.step++;
    },
    setStep(step) {
      this.step = step;
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
      // height: 72px;
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
      // min-width: calc(100% / 6);
      flex: 1;
      height: 50px;
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