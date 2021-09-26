<template>
  <div class="AdminEntry">
    <div class="loginBox">
      <div class="left">
        <img class="logo" src="@/assets/entry/logo_white.svg" />
        <div class="left-content">
          <p class="welcome">Welcome to MyFellas</p>
          <p class="login">Log in to access your account</p>
        </div>
        <img class="other" src="@/assets/entry/img.svg" />
      </div>
      <div class="right">
        <div class="Login">
          <div class="titleBox">
            <p class="title">{{ $t("entry.login.adminLoginTitle") }}</p>
          </div>
          <div class="loginForm">
            <entry-input
              class="loginForm-item"
              iconName="icon_account"
              @input="
                (val) => {
                  username = val;
                }
              "
              :placeholder="$t(`entry.login.admin.usernamePlaceholder`)"
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
              :placeholder="$t(`entry.login.admin.passwordPlaceholder`)"
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
          <p class="parentButton" v-if="identity == 1" @click="toParents">
            {{ $t("entry.login.parentsButton") }}
          </p>
        </div>
        <p class="license">MyFellas @ 2020.all rights reserved</p>
      </div>
    </div>
  </div>
</template>

<script>
import { redirectMixin } from "@/mixins";
import entryInput from "./components/input";
import entryButton from "./components/button";
export default {
  mixins: [redirectMixin],
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
  mounted() {
    document.addEventListener("keydown", this.enterToLogin);
  },
  methods: {
    enterToLogin(event) {
      let e = event ? event : window.event ? window.event : null;
      if (e.keyCode == 13) {
        this.login();
      }
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },
    toForget() {
      this.$router.push({ path: "/forget" });
    },
    toParents() {
      this.$router.push({ path: "/parents" });
    },
    login() {
      if (this.username == "") {
        this.$message.warning({
          text: this.$t("entry.login.alertTips.usernameErrorTips"),
        });
        return;
      } else if (this.password == "") {
        this.$message.warning({
          text: this.$t("entry.login.alertTips.passwordErrorTips"),
        });
        return;
      }
      if (this.remember) {
        // Cookies.set(`user${this.username}`, this.password, { expires: 15 });
      }
      this.$store
        .dispatch(`user/adminLogin`, {
          email: this.username,
          account: this.username,
          password: this.password,
          rememberMe: this.remember,
        })
        .then((res) => {
          console.log(res);
          // if (this.redirect) {
          //   this.$router.push({
          //     path: this.redirect,
          //     query: this.otherQuery,
          //   });
          // } else {
            this.$router.push({ path: "/index" });
          // }
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning({
            text: err || this.$t("entry.login.alertTips.loginErrorTips"),
          });
          return;
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener("keydown", this.enterToLogin);
    next();
  },
};
</script>

<style lang="scss" scoped>
.AdminEntry {
  background-color: #eff1f5;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    margin: 0;
  }
  .loginBox {
    display: flex;
    flex-direction: row;
    width: 56.25vw;
    min-height: 31.25vw;
    height: fit-content;
    box-shadow: 0 0.8333vw 1.35417vw 0.52083vw rgba(209, 212, 221, 0.8);
    background-color: #013047;
    .left {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: #013047;
      .logo {
        width: 5.625vw;
        margin-top: 2.604167vw;
      }
      .left-content {
        .welcome {
          font-size: 1.97917vw;
          font-family: MyriadSetPro-Semibold;
          color: #ffffff;
          line-height: 2.08333vw;
          margin-top: 3.7292vw;
        }
        .login {
          font-size: 1.04167vw;
          font-family: Roboto-Regular;
          color: #ffffff;
          line-height: 1.25vw;
          margin-top: 1.04167vw;
        }
      }
      .other {
        width: 100%;
        margin-top: 3.4375vw;
      }
    }
    .right {
      width: 50%;
      background-color: #fff;
      // height: 100%;
      // height: fit-content;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .Login {
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
          justify-content: center;
          margin-top: 5.833vw;
          .title {
            font-size: 1.5625vw;
            font-family: AlibabaPuHuiTiM;
            color: #013047;
          }
          .register {
            position: absolute;
            font-size: 0.9375vw;
            right: 0;
            bottom: 0.2083vw;
            color: #ffb706;
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
                user-select: none;
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
      .license {
        // justify-self: flex-end;
        font-size: 0.5208vw;
        color: #999999;
        padding-top: 6px;
        margin-bottom: 1.042vw;
        // margin-top: 1.5625vw;
      }
    }
  }
}
</style>