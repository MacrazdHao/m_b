<template>
  <div class="Register">
    <div class="titleBox">
      <img src="@/assets/entry/icon_back.svg" @click="goback" />
      <p class="title">{{ $t("entry.register.registerTitle") }}</p>
      <div class="white"></div>
    </div>
    <entryInput
      class="username"
      @input="
        (val) => {
          username = val;
        }
      "
      :placeholder="$t(`entry.register.emailPlaceholder`)"
    />
    <entry-button
      class="nextStep"
      :title="$t('entry.register.nextButton')"
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
      username: "",
    };
  },
  methods: {
    goback() {
      this.$router.push({ path: "/" });
    },
    goNext() {
      if (this.username == "") {
        this.$message.warning({
          text: this.$t("entry.register.alertTips.emailEmptyTips"),
        });
        return;
      }

      this.$store
        .dispatch(
          `user/${this.identity == 1 ? "student" : "admin"}EmailVerify`,
          {
            email: this.username,
            operateType: 1,
          }
        )
        .then((res) => {
          console.log(res);
          this.$router.push({
            name: "register2",
            params: {
              username: this.username,
            },
          });
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning({ text: this.$t("tips.sendEmailError") });
          return;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Register {
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
  .nextStep {
    margin-top: 3.125vw;
    margin-bottom: 9.479vw;
  }
}
</style>