<template>
  <div class="Parents">
    <div class="titleBox">
      <img src="@/assets/entry/icon_back.svg" @click="goback" />
      <p class="title">{{ $t("entry.login.loginTitle") }}</p>
      <div class="white"></div>
    </div>
    <div class="loginForm">
      <entry-input
        class="loginForm-item"
        iconName="icon_email"
        @input="
          (val) => {
            username = val;
          }
        "
        :placeholder="$t(`entry.login.parents.usernamePlaceholder`)"
      />
      <entry-input
        class="loginForm-item"
        :passwordMode="true"
        iconName="icon_password"
        @input="
          (val) => {
            password = val;
          }
        "
        :placeholder="$t(`entry.login.parents.passwordPlaceholder`)"
      />
      <div class="toolsBar">
        <div class="remember" @click="remember = !remember">
          <img
            :src="
              require(`@/assets/entry/${
                remember ? 'checkbox_pre' : 'checkbox'
              }.svg`)
            "
          />
          <p>{{ $t("entry.login.rememberTips") }}</p>
        </div>
      </div>
    </div>
    <entry-button
      class="submit"
      :title="$t('entry.login.loginButton')"
      @click="login"
    />
  </div>
</template>

<script>
import { entryRedirectMixin } from "@/mixins";
import entryInput from "../components/input";
import entryButton from "../components/button";
export default {
  mixins: [entryRedirectMixin],
  components: {
    entryInput,
    entryButton,
  },
  props: ["identity"],
  data() {
    return {
      username: "",
      password: "",
      remember: false,
    };
  },
  watch: {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    toForget() {
      this.$router.push({ path: "/forget" });
    },
    login() {
      if (this.username == "") {
        this.$message.warning(
          this.$t("entry.login.alertTips.usernameErrorTips")
        );
        return;
      } else if (this.password == "") {
        this.$message.warning(
          this.$t("entry.login.alertTips.passwordErrorTips")
        );
        return;
      }
      if (this.remember) {
        // Cookies.set(`user${this.username}`, this.password, { expires: 15 });
      }
      this.$store
        .dispatch(`user/studentLogin`, {
          email: this.username,
          account: this.username,
          password: this.password,
          rememberMe: this.remember,
        })
        .then((res) => {
          console.log(res);
          if (this.redirect) {
            this.$router.push({
              path: this.redirect,
              query: this.otherQuery,
            });
          } else {
            this.$router.push({ path: "index" });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning(
            this.$t("entry.login.alertTips.loginErrorTips")
          );
          return;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Parents {
  width: 100%;
  // height: 100%;
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
  .loginForm {
    margin-top: 4.6875vw;
    width: 100%;
    .loginForm-item + .loginForm-item {
      margin-top: 1.5625vw;
    }
    .toolsBar {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-top: 2.083vw;
      cursor: pointer;
      .remember {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 0.729vw;
          min-width: 12px;
        }
        p {
          margin-left: 0.417vw;
          font-size: 0.625vw;
          color: #999999;
        }
      }
      .forget {
        display: flex;
        flex-direction: row;
        cursor: pointer;
        p {
          font-size: 0.625vw;
          color: #999999;
        }
        p + p {
          margin-left: 0.417vw;
          color: #ffb706;
        }
      }
    }
  }
  .submit {
    margin-top: 2.34375vw;
  }
  .parentButton {
    font-size: 0.625vw;
    margin-top: 1.25vw;
    color: #999e9d;
    cursor: pointer;
  }
}
</style>