<template>
  <div class="Match">
    <div class="matching" v-if="!finished && !loading">
      <img src="@/assets/counseling/matching.svg" />
      <p class="title">{{ $t(`counseling.step${step}.matchTitle`) }}</p>
      <p class="tips" v-if="!matchFinish">
        {{ $t(`counseling.step${step}.matchingTips`) }}
      </p>
      <p class="tips" v-else>
        {{
          time && !liveEnd
            ? $t(`counseling.step${step}.matchedTips`, {
                time: getDateString(time),
              })
            : $t(`counseling.step${step}.waitingMatch`)
        }}
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
        :disable="
          liveEnd || !time || time - 15 * 60 * 1000 > new Date().getTime()
        "
        theme="blue"
        @btnClick="toLiving"
      />
    </div>
    <div class="finish" v-if="finished && !loading">
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
import DateTools from "@/utils/date";
export default {
  props: ["timestamp"],
  components: {
    CButton,
  },
  data() {
    return {
      loading: true,
      finished: false,
      liveStarting: false,
      liveEnd: false,
      time: "",
      matchFinish: true,
      roomId: null,
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
  watch: {
    timestamp(val) {
      this.$store
        .dispatch("counseling/getConsultStatus")
        .then((res) => {
          this.loading = false;
          // this.finished = res.data.status == 2;
          // this.liveStarting = res.data.status == 1;
          this.liveEnd = res.data.status == -1;
          this.liveStarting = res.data.status != -1;
          // this.matchFinish = res.data.status == 0;
          this.roomId = res.data.id;
          this.time = res.data.startTime;
          console.log(this.time, new Date().getTime());
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            text: this.$t("counseling.loadInfoError"),
          });
        });
    },
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.$t(`counseling.step${this.step}.title`)]);
    this.$emit("setStep", this.step);
  },
  methods: {
    ...DateTools,
    toLiving() {
      if (
        this.liveEnd ||
        !this.time ||
        this.time - 15 * 60 * 1000 > new Date().getTime()
      ) {
        return;
      }
      this.$router.push({ name: "living", query: { roomId: this.roomId } });
    },
    backToDashboard() {
      this.$router.push({ path: "/" });
    },
    getReport() {},
  },
};
</script>

<style lang="scss" scoped>
.Match {
  min-height: 720px;
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