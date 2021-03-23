<template>
  <div class="About">
    <div class="headerBackground"></div>
    <div class="page">
      <div class="background">
        <div class="background-content">
          <img class="svg svg1" src="../assets/b6_1.svg" />
          <img class="svg svg2" src="../assets/b6_2.svg" />
          <img class="svg svg3" src="../assets/b6_3.svg" />
        </div>
      </div>
      <div class="page-item page-item1">
        <p class="title wow fadeInUp">MyFellas·简介</p>
        <p class="content wow fadeInUp" data-wow-delay=".2s">
          MyFellas国际教育交流平台，是由全球各国顶尖院校的高端人才倾力打造的一款专注中国国际教育垂直领域的SaaS服务平台。
          <br />
          MyFellas从国内国际学校存在的运营管理、教学实践、课外拓展等一系列问题出发，通过整合英国顶尖的教育资源，利用SaaS技术和大数据分析模型赋能，帮助更多的中国国际学校对接优质国际教育资源，全面提升综合实力，顺利完成国际化生涯规划升级。
        </p>
      </div>
      <div class="page-item page-item2">
        <p class="title wow fadeInUp" data-wow-delay=".4s">MyFellas·服务理念</p>
        <p class="content wow fadeInUp" data-wow-delay=".6s">
          立足于国内国际学校实际，着眼于学生未来发展前景，致力为国际教育提供一站式生涯规划方案。
        </p>
      </div>
      <div id="topFlag" class="page-item page-item3">
        <p class="title wow fadeInUp">MyFellas·服务团队</p>
        <p class="content wow fadeInUp">
          CECP成立以来已组成拥有15人的服务团队，成员学术背景覆盖教育学及计算机科学并均拥有多年的教育或数据分析行业经历。团队核心成员均来自QS世界排名TOP50高校，擅长领域包括教育心理学、市场营销管理、及大数据处理。团队全员坚持以学生成长为中心，致力于让CECP成为真正从学生角度出发的生涯规划服务提供商。
        </p>
        <img
          class="wow fadeInUp"
          src="../assets/team.png"
        />
      </div>
    </div>
    <div class="footerBlank"></div>
  </div>
</template>

<script>
import "../assets/animate.css";
import { WOW } from "wowjs";
export default {
  mounted() {
    let wow = new WOW();
    wow.init({
      boxClass: "wow", // animated element css class (default is wow)
      animateClass: "animated", // animation css class (default is animated)
      offset: 0, // distance to the element when triggering the animation (default is 0)
      mobile: true, // trigger animations on mobile devices (default is true)
      live: true, // act on asynchronously loaded content (default is true)
      callback: function (box) {
        // the callback is fired every time an animation is started
        // the argument that is passed in is the DOM node being animated
      },
      scrollContainer: null, // optional scroll container selector, otherwise use window
    });
    console.log(wow);
  },
};
</script>

<style lang="scss" scoped>
.About {
  position: relative;
  width: 100%;
  p {
    margin: 0;
    width: fit-content;
  }
  .headerBackground {
    height: 5.21vw;
    width: 100%;
    background-color: #fff;
    margin-bottom: 4.17vw;
  }
  .page {
    position: relative;
    width: 100vw;
    padding-bottom: 4.32vw;
    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      .background-content {
        width: 100%;
        height: 100%;
        position: relative;
        top: 0;
        left: 0;
        .svg {
          position: absolute;
        }
        .svg1 {
          width: 10vw;
          top: 40.31vw;
          left: 0;
        }
        .svg2 {
          width: 9.69vw;
          top: 25.94vw;
          right: 0;
        }
        .svg3 {
          width: 6.51vw;
          bottom: 8.43vw;
          right: 0;
        }
      }
    }
    .page-item + .page-item {
      margin-top: 6.25vw;
    }
    .page-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 1.875vw;
        font-family: Alibaba-PuHuiTi-Medium;
      }
      .content {
        width: 62.5vw;
        text-align: left;
        margin-top: 4.17vw;
        color: #333333;
        font-size: 1.46vw;
        font-family: Alibaba-PuHuiTi-Regular;
        text-align: justify;
      }
    }
    .page-item1 {
      .title {
        color: #013047;
      }
    }
    .page-item2 {
      .title {
        color: #ffb706;
      }
    }
    .page-item3 {
      .title {
        color: #0856e8;
      }
      img {
        width: 62.5vw;
        margin-top: 3.125vw;
      }
    }
  }
  .footerBlank {
    height: 8.18vw;
    width: 100%;
    background: #fff;
  }
}
</style>