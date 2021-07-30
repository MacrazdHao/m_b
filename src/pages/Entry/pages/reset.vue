<template>
  <div class="Register2">
    <div class="titleBox">
      <img src="@/assets/entry/icon_back.svg" @click="goback" />
      <p class="title">{{ $t("entry.reset.resetTitle") }}</p>
      <div class="white"></div>
    </div>
    <div class="emailTips">
      <p>{{ $t("entry.reset.sendEmailTips", { email: form.username }) }}</p>
      <p>{{ $t("entry.reset.sendEmailTips2") }}</p>
    </div>
    <entryInput
      class="formItem"
      @input="
        (val) => {
          form.code = val;
        }
      "
      :placeholder="$t(`entry.reset.codePlaceholder`)"
      autocomplete="new-password"
    />
    <entryInput
      class="formItem"
      :viewer="true"
      :passwordMode="true"
      @input="
        (val) => {
          form.password = val;
        }
      "
      :placeholder="$t(`entry.reset.passwordPlaceholder`)"
      autocomplete="new-password"
    />
    <entryInput
      class="formItem"
      :viewer="true"
      :passwordMode="true"
      @input="
        (val) => {
          form.cPassword = val;
        }
      "
      :placeholder="$t(`entry.reset.cPasswordPlaceholder`)"
      autocomplete="new-password"
    />
    <div class="errorTipsBox">
      <p class="errorTips" v-if="errorType == 1">
        {{ $t("entry.reset.errorTips.password") }}
      </p>
      <p class="errorTips" v-if="errorType == 2">
        {{ $t("entry.reset.errorTips.cPassword") }}
      </p>
    </div>
    <entry-button
      class="submit"
      :title="$t('entry.reset.resetButton')"
      @click="submit"
    />
  </div>
</template>

<script>
import { redirectMixin, entryRedirectMixin } from "@/mixins";
import { checkPassword } from "@/utils/regExp";
import entryInput from "../components/input";
import entryButton from "../components/button";
export default {
  mixins: [redirectMixin, entryRedirectMixin],
  components: {
    entryInput,
    entryButton,
  },
  props: ["identity"],
  data() {
    return {
      form: {
        username: "",
        code: "",
        password: "",
        cPassword: "",
      },
      errorType: 0,
    };
  },
  mounted() {
    this.form.username = this.$route.params.username;
    document.addEventListener("keydown", this.enterToSubmit);
  },
  methods: {
    enterToSubmit(event) {
      let e = event ? event : window.event ? window.event : null;
      if (e.keyCode == 13) {
        this.submit();
      }
    },
    goback() {
      this.$router.go(-1);
    },
    submit() {
      this.errorType = 0;
      if (this.form.code == "") {
        this.$message.warning({
          text: this.$t("entry.reset.alertTips.codeEmptyTips"),
        });
        return;
      } else if (this.form.password == "") {
        this.$message.warning({
          text: this.$t("entry.reset.alertTips.passwordEmptyTips"),
        });
        return;
      } else if (this.form.cPassword == "") {
        this.$message.warning({
          text: this.$t("entry.reset.alertTips.cPasswordEmptyTips"),
        });
        return;
      }
      if (!checkPassword(this.form.password)) {
        this.errorType = 1;
        return;
      } else if (this.form.password != this.form.cPassword) {
        this.errorType = 2;
        return;
      }
      this.errorType = 0;
      this.$store
        .dispatch("user/forgetAndResetPassword", {
          email: this.form.username,
          emailCode: this.form.code,
          password: this.form.cPassword,
        })
        .then((res) => {
          this.$message.message({
            text: this.$t("entry.reset.resetSuccessTips"),
          });
          this.$router.push({ path: "/" });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("entry.reset.resetFailTips"),
          });
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener("keydown", this.enterToSubmit);
    next();
  },
};
</script>

<style lang="scss" scoped>
.Register2 {
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
  .emailTips,
  .formItem {
    margin-top: 1.042vw;
    align-self: flex-start;
  }
  .emailTips {
    font-size: 0.729vw;
    text-align: left;
  }
  .errorTipsBox {
    margin-top: 0.521vw;
    min-height: 34px;
    .errorTips {
      text-align: left;
      font-size: 0.625vw;
      color: #db4c40;
    }
  }
  .submit {
    margin-top: 0.78125vw;
    margin-bottom: 1.5625vw;
  }
}
</style>