<template>
  <div class="LoginApp">
    <div class="background">
      <div class="background-content">
        <img class="svg svg1" src="@/assets/entry/bg1.svg" />
        <img class="svg svg2" src="@/assets/entry/bg2.svg" />
        <img class="svg svg3" src="@/assets/entry/bg3.svg" />
        <img class="svg svg4" src="@/assets/entry/bg4.svg" />
        <img class="svg svg5" src="@/assets/entry/bg5.svg" />
        <img class="svg svg6" src="@/assets/entry/bg6.svg" />
      </div>
    </div>
    <div class="entry">
      <div class="multiply"></div>
      <div class="center">
        <div class="center-content">
          <p class="title">CECP</p>
          <p class="welcome">Welcome to MyFellas</p>
          <p class="login">Log in to access your account</p>
        </div>
        <img src="@/assets/entry/img.svg" />
      </div>
      <div class="entry-box">
        <div class="left">
          <img class="logo" src="@/assets/entry/logo.svg" />
          <div class="identity">
            <div class="selectedPipe">
              <div
                :class="[
                  'line',
                  identity == 0
                    ? 'line--position1'
                    : identity == 1
                    ? 'line--position2'
                    : 'line--position3',
                ]"
              ></div>
            </div>
            <div class="identity-box">
              <div
                :class="[
                  'identity-item',
                  identity == 0 ? 'identity-item--selected' : '',
                ]"
                @click="identity = 0"
              >
                <img
                  :src="
                    require(`@/assets/entry/icon_school${
                      identity == 0 ? '2' : ''
                    }.svg`)
                  "
                />
                <p>学校</p>
              </div>
              <div
                :class="[
                  'identity-item',
                  identity == 1 ? 'identity-item--selected' : '',
                ]"
                @click="identity = 1"
              >
                <img
                  :src="
                    require(`@/assets/entry/icon_student${
                      identity == 1 ? '2' : ''
                    }.svg`)
                  "
                />
                <p>学生</p>
              </div>
              <div
                :class="[
                  'identity-item',
                  identity == 2 ? 'identity-item--selected' : '',
                ]"
                @click="identity = 2"
              >
                <img
                  :src="
                    require(`@/assets/entry/icon_tutor${
                      identity == 2 ? '2' : ''
                    }.svg`)
                  "
                />
                <p>咨询师</p>
              </div>
            </div>
          </div>
        </div>
        <div class="white"></div>
        <div class="right">
          <router-view style="min-height: 280px" :identity="identity" />
          <p class="license">MyFellas @ 2020.all rights reserved</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      identity: 0,
    };
  },
  mounted() {
    this.$router.push({ path: "/" });
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/" });
    },
    toRegister() {
      this.$router.push({ path: "register" });
    },
    toForget() {
      this.$router.push({ path: "forget" });
    },
  },
};
</script>

<style lang="scss" scoped>
.LoginApp {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -1;
    .background-content {
      position: relative;
      height: 100%;
      width: 100%;
      .svg {
        position: absolute;
      }
      .svg1,
      .svg2 {
        top: 0;
        left: 0;
      }
      .svg1 {
        width: 37.96875vw;
      }
      .svg2 {
        width: 44.32vw;
      }
      .svg3 {
        top: 0;
        right: 0;
        width: 7.8125vw;
      }
      .svg4 {
        bottom: 3.125vw;
        left: 1.5625vw;
        width: 7.2917vw;
      }
      .svg5 {
        bottom: 10.417vw;
        left: 8.33vw;
        width: 4.17vw;
      }
      .svg6 {
        bottom: 0;
        right: 0;
        width: 26.46vw;
      }
    }
  }
  .entry {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    background-color: #fff;
    .multiply {
      position: absolute;
      left: 10.4125vw;
      top: -1.979vw;
      width: 26.042vw;
      min-width: 240px;
      height: calc(100% + 3.958vw);
      mix-blend-mode: multiply;
      box-shadow: 0 0 1.5625vw 0.9375vw #e2e5ef;
    }
    .center {
      position: absolute;
      left: 10.4125vw;
      top: -1.979vw;
      background: #013047;
      width: 26.042vw;
      min-width: 240px;
      height: calc(100% + 3.958vw);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      z-index: 1000;
      .center-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 4.635vw;
        margin-top: 5.625vw;
        p {
          text-align: left;
        }
        .title {
          font-size: 2.083vw;
          color: #ffb706;
        }
        .welcome {
          font-size: 1.979vw;
          margin-top: 5.3125vw;
          color: #fff;
        }
        .login {
          font-size: 1.042vw;
          margin-top: 1.042vw;
          color: #fff;
        }
      }
      img {
        // height: 8.854vw;
        width: 100%;
        // align-self: center;
        margin-top: 3.542vw;
      }
    }
    .entry-box {
      display: flex;
      flex-direction: row;
      // align-items: center;
      height: 31.25vw;
      justify-content: center;
      box-shadow: 0 0.833vw 1.354vw 0.521vw #e2e5ef;
      // background-color: #fff;
      mix-blend-mode: multiply;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #fff;
        // height: 31.25vw;
        height: 100%;
        .logo {
          width: 5.625vw;
          margin-top: 2.604vw;
        }
        .identity {
          margin-top: 3.073vw;
          display: flex;
          flex-direction: row;
          .selectedPipe {
            width: 0.3125vw;
            position: relative;
            .line {
              width: 100%;
              height: 3.18025vw;
              position: absolute;
              background-color: #ffb706;
              transition: 0.3s;
            }
            .line--position1 {
              top: 0.9375vw;
              left: 0;
            }
            .line--position2 {
              top: 5.99275vw;
              left: 0;
            }
            .line--position3 {
              top: 11.048vw;
              left: 0;
            }
          }
          .identity-box {
            .identity-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding-top: 0.9375vw;
              padding-bottom: 0.9375vw;
              width: 10.104vw;
              cursor: pointer;
              img {
                width: 1.67vw;
              }
              p {
                margin-top: 0.104vw;
                font-size: 1.042vw;
                line-height: 1.40625vw;
              }
            }
            .identity-item--selected {
              color: #ffb706;
            }
          }
        }
      }
      .white {
        width: 26.042vw;
        min-width: 240px;
      }
      .right {
        width: 23.958vw;
        min-width: 320px;
        // width: 460px;
        min-height: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .license {
          // justify-self: flex-end;
          font-size: 0.5208vw;
          color: #999999;
          margin-bottom: 1.042vw;
          // margin-top: 1.5625vw;
        }
      }
    }
  }
}
</style>