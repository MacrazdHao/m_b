<template>
  <div class="Forget">
    <div class="titleBox">
      <img src="@/assets/entry/icon_back.svg" @click="goback" />
      <p class="title">{{ $t("entry.forget.forgetTitle") }}</p>
      <div class="white"></div>
    </div>
    <entryInput
      class="username"
      @input="
        (val) => {
          username = val;
        }
      "
      :placeholder="
        $t(
          `entry.forget.${
            identity == 0 ? 'school' : identity == 1 ? 'student' : 'consultant'
          }.emailPlaceholder`
        )
      "
    />
    <div class="contactTips" v-if="identity == 0">
      <p>{{ $t("entry.forget.school.contactTips") }}</p>
      <p @click="goContact">{{ $t("entry.forget.school.contactButton") }}</p>
    </div>
    <entry-button
      :class="['nextStep', identity == 0 ? 'nextStep--school' : '']"
      :title="$t('entry.forget.nextButton')"
      @click="goNext"
    />
  </div>
</template>

<script>
import { entryRedirectMixin } from "@/mixins";
import entryInput from "../components/input";
import entryButton from "../components/button";
export default {
  mixins: [entryRedirectMixin],
  props: ["identity"],
  components: {
    entryInput,
    entryButton,
  },
  data() {
    return {
      sending: false,
      username: "",
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: "/" });
    },
    goContact() {
      this.$router.push({ path: "/contact" });
    },
    goNext() {
      if (this.username == "") {
        this.$message.warning({
          text: this.$t("entry.forget.alertTips.emailEmptyTips"),
        });
        return;
      }
      if (this.sending) {
        this.$message.warning({
          text: this.$t("entry.forget.alertTips.sendingCodeErrorTips"),
        });
        return;
      }
      this.sending = true;
      this.$store
        .dispatch(
          `user/${this.identity == 2 ? "admin" : "student"}EmailVerify`,
          {
            email: this.username,
            operateType: 2,
          }
        )
        .then((res) => {
          this.sending = false;
          this.$message.message({
            text: this.$t("entry.forget.sendCodeSuccessTips"),
          });
          this.$router.push({
            name: "reset",
            params: {
              username: this.username,
            },
          });
        })
        .catch((err) => {
          this.sending = false;
          this.$message.error({
            text: this.$t("entry.forget.sendCodeFailTips"),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Forget {
  width: 100%;
  box-sizing: border-box;
  padding-left: 3.125vw;
  padding-right: 3.125vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
  }
  .titleBox {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5.833vw;
    .title {
      font-size: 1.5625vw;
      font-family: AlibabaPuHuiTiM;
      color: #013047;
    }
    img,
    .white {
      width: 1.25vw;
    }
    img {
      cursor: pointer;
    }
  }
  .username {
    margin-top: 4.6875vw;
  }
  .contactTips {
    margin-top: 2.083vw;
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
    p {
      font-size: 0.625vw;
      color: #999999;
    }
    p + p {
      margin-left: 0.4167vw;
      color: #ffb706;
      cursor: pointer;
    }
  }
  .nextStep {
    margin-top: 3.125vw;
    // margin-bottom: 9.479vw;
  }
  .nextStep--school {
    margin-top: 2.34375vw;
  }
}
</style>