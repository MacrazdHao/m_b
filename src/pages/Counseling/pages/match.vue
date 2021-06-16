<template>
  <div class="Match">
    <div class="matching" v-if="!finished">
      <img src="@/assets/counseling/matching.svg" />
      <p class="title">{{ $t(`counseling.step${step}.matchTitle`) }}</p>
      <p class="tips" v-if="!matchFinish">
        {{ $t(`counseling.step${step}.matchingTips`) }}
      </p>
      <p class="tips" v-else>
        {{ $t(`counseling.step${step}.matchedTips`, { time }) }}
      </p>
      <CButton
        :class="['button', 'backButton']"
        v-if="!matchFinish"
        :text="$t(`counseling.step${step}.backButton`)"
        theme="blue"
        @btnClick="backToDashboard"
      />
      <CButton
        :class="['button', 'liveButton']"
        v-else
        :text="$t(`counseling.step${step}.liveButton`)"
        :disable="!liveStarting"
        theme="blue"
        @btnClick="goLive"
      />
    </div>
    <div class="finish" v-if="finished">
      <img src="@/assets/counseling/success.svg" />
      <p class="title">{{ $t(`counseling.step${step}.finishTitle`) }}</p>
      <p class="tips">{{ $t(`counseling.step${step}.finishTips`) }}</p>
      <CButton
        class="button"
        :text="$t(`counseling.step${step}.reportButton`)"
        theme="blue"
        @btnClick="getReport"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
export default {
  components: {
    CButton,
  },
  data() {
    return {
      finished: true,
      liveStarting: false,
      time: "2021-03-21 20:00",
      matchFinish: false,
    };
  },
  computed: {
    step() {
      return this.$route.meta.step;
    },
    stateInfo() {
      return this.$store.state.counseling.stateInfo;
    },
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.$t(`counseling.step${this.step}.title`)]);
    this.$emit("setStep", this.step);
  },
  methods: {
    backToDashboard() {
      this.$router.push({ path: "/" });
    },
    getReport() {},
    goLive() {},
  },
};
</script>

<style lang="scss" scoped>
.Match {
  p {
    margin: 0;
  }
  .matching {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 130px;
    padding-bottom: 280px;
    img {
      width: 177px;
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