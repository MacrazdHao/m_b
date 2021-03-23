<template>
  <div id="app">
    <div class="header">
      <img @click="goIndex" src="./assets/logo.svg" />
      <div>
        <p @click="goIndex">首页</p>
        <p @click="goCareer">生涯模式</p>
        <p @click="goAbout">关于我们</p>
        <p>登录</p>
      </div>
    </div>
    <router-view />
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
export default {
  name: "App",
  data() {
    return {
      showTop: false,
    };
  },
  mounted() {
    window.onscroll = () => {
      this.showTop =
        window.pageYOffset > document.getElementById("topFlag").offsetTop;
      console.log(
        window.pageYOffset,
        document.getElementById("topFlag").offsetTop
      );
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
  p {
    margin: 0;
    width: fit-content;
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding-top: 0.99vw;
    padding-bottom: 0.99vw;
    justify-content: center;
    align-items: center;
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
      margin-left: 21.15vw;
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
  .footer {
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
      color: #ffffff;
      font-family: Alibaba-PuHuiTi-Regular;
    }
    .contact {
      display: flex;
      flex-direction: row;
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
