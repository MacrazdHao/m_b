<template>
  <div class="Register2">
    <div class="titleBox">
      <img src="@/assets/entry/icon_back.svg" @click="goback" />
      <p class="title">{{ $t("entry.register.registerTitle") }}</p>
      <div class="white"></div>
    </div>
    <div class="emailTips">
      <p>{{ $t("entry.register.sendEmailTips", { email: form.email }) }}</p>
      <p>{{ $t("entry.register.sendEmailTips2") }}</p>
    </div>
    <entryInput
      class="formItem"
      @input="
        (val) => {
          form.emailCode = val;
        }
      "
      :placeholder="$t(`entry.register.codePlaceholder`)"
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
      :placeholder="$t(`entry.register.passwordPlaceholder`)"
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
      :placeholder="$t(`entry.register.cPasswordPlaceholder`)"
    />
    <entryInput
      class="formItem"
      @input="
        (val) => {
          form.schoolInviteCode = val;
        }
      "
      :placeholder="
        $t(
          `entry.register.${
            identity == 1 ? 'student' : 'consultant'
          }.iCodePlaceholder`
        )
      "
    />
    <div class="errorTipsBox">
      <p class="errorTips" v-if="errorType == 1">
        {{ $t("entry.register.errorTips.password") }}
      </p>
      <p class="errorTips" v-if="errorType == 2">
        {{ $t("entry.register.errorTips.cPassword") }}
      </p>
      <p class="errorTips" v-if="errorType == 3">
        {{ $t("entry.register.errorTips.iCode") }}
      </p>
    </div>
    <entry-button
      class="submit"
      :title="$t('entry.register.registerButton')"
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
        email: "",
        emailCode: "",
        password: "",
        cPassword: "",
        schoolInviteCode: "",
      },
      errorType: 0,
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.form.email = this.$route.params.username;
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    submit() {
      this.errorType = 0;
      if (this.form.emailCode == "") {
        this.$message.warning({
          text: this.$t("entry.register.alertTips.codeEmptyTips"),
        });
        return;
      } else if (this.form.password == "") {
        this.$message.warning({
          text: this.$t("entry.register.alertTips.passwordEmptyTips"),
        });
        return;
      } else if (this.form.cPassword == "") {
        this.$message.warning({
          text: this.$t("entry.register.alertTips.cPasswordEmptyTips"),
        });
        return;
      } else if (this.form.schoolInviteCode == "") {
        this.$message.warning({
          text: this.$t("entry.register.alertTips.iCodeEmptyTips"),
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
      console.log(this.form);
      this.$store
        .dispatch(
          `user/${this.identity == 1 ? "student" : "admin"}Register`,
          this.form
        )
        .then((res) => {
          console.log(res);
          if (this.redirect) {
            this.$router.push({
              path: this.redirect,
              query: this.otherQuery,
            });
          } else {
            this.$router.push({ path: "/index" });
          }
        })
        .catch((err) => {
          console.log(err);
          // this.$message.warning(
          //   {text: this.$t("entry.login.alertTips.loginErrorTips")}
          // );
          return;
        });
    },
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
    margin-top: 3.646vw;
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
    width: 100%;
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