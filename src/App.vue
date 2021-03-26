<template>
  <div id="app">
    <div class="header">
      <div class="header-inbox">
        <img @click="goIndex" src="./assets/logo.svg" />
        <div>
          <p @click="goIndex">{{ $t("header.home") }}</p>
          <p @click="goCareer">{{ $t("header.career") }}</p>
          <p @click="goAbout">{{ $t("header.about") }}</p>
          <p @click="goLogin">{{ $t("header.login") }}</p>
        </div>
      </div>
    </div>
    <transition name="fade-transform" mode="out-in">
      <router-view style="flex: 1 0 auto" />
    </transition>
    <div class="footer">
      <div class="contact">
        <p>+(86-02) 87378806</p>
        <p>support@myfellas.net</p>
        <p>广州市越秀区广州大道中289号南方同创汇4号楼501室</p>
      </div>
      <div class="longline"></div>
      <p class="website">https://myfellas.net</p>
    </div>
    <div class="topBtn" v-show="showTop" @click="backToTop">
      <img src="./assets/icon_top.svg" />
      <p>TOP</p>
    </div>
  </div>
</template>

<script>
import languageMixin from "./mixins/language";
export default {
  name: "App",
  mixins: [languageMixin],
  data() {
    return {
      showTop: false,
    };
  },
  mounted() {
    // this.backToTop();
    window.onscroll = () => {
      this.showTop =
        window.pageYOffset > document.getElementById("topFlag").offsetTop;
    };
  },
  methods: {
    backToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    goIndex() {
      this.$router.push({ path: "/" });
    },
    goCareer() {
      this.$router.push({ path: "/career" });
    },
    goAbout() {
      this.$router.push({ path: "/about" });
    },
    goLogin() {
      this.language = this.language == "en" ? "zh" : "en";
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  p {
    margin: 0;
    width: fit-content;
  }
  .header {
    position: absolute;
    display: flex;
    flex-direction: row;
    // align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    padding-top: 0.99vw;
    padding-bottom: 0.99vw;
    flex: 0 0 auto;
    .header-inbox {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 62.5vw;
      div {
        p {
          cursor: pointer;
          font-family: Alibaba-PuHuiTi-Regular;
        }
      }
      img {
        width: 14.48vw;
        height: 3.23vw;
        cursor: pointer;
      }
      div {
        display: flex;
        flex-direction: row;
        height: fit-content;
        // margin-left: 21.15vw;
        p + p {
          margin-left: 3.13vw;
        }
        p {
          font-size: 1.46vw;
          height: fit-content;
          cursor: pointer;
        }
      }
    }
  }
  .footer {
    flex: 0 0 auto;
    background-color: #013047;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 3.125vw;
    padding-bottom: 3.125vw;
    p + p {
      margin-left: 6.25vw;
    }
    p {
      font-size: 1.15vw;
      white-space: nowrap;
      color: #ffffff;
      font-family: Alibaba-PuHuiTi-Regular;
    }
    .contact {
      display: flex;
      flex-direction: row;
      p {
        font-size: 1.15vw;
        white-space: nowrap;
        color: #ffffff;
        font-family: Alibaba-PuHuiTi-Regular;
      }
    }
    .longline {
      width: 62.5vw;
      height: 0.1vw;
      background: #e0e0e0;
      margin-top: 1.56vw;
      margin-bottom: 1.56vw;
    }
  }
  .topBtn {
    position: fixed;
    bottom: 15.73vw;
    right: 3.125vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    background-color: white;
    box-shadow: 0 0.3125vw 0.83vw rgba(212, 218, 229, 0.5);
    border-radius: 4.17vw;
    padding: 0.9375vw 1.15vw;
    cursor: pointer;
    img {
      width: 0.9375vw;
    }
    p {
      margin-top: 0.21vw;
      color: #013047;
      font-size: 0.9375vw;
      font-family: huakangli;
      font-weight: bold;
    }
  }
}
</style>
