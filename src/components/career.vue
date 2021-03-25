<template>
  <div class="Career">
    <div class="headerBackground"></div>
    <div class="page page-1">
      <div class="background background-1">
        <div class="background-content">
          <img class="svg svg1" src="../assets/b5_1.svg" />
          <img class="svg svg2" src="../assets/b5_2.svg" />
        </div>
      </div>
      <div class="page-1-content">
        <p class="title wow fadeInDown">生涯成长和学校教育全链条生涯规划</p>
        <div class="page-1-item page-1-item1">
          <div class="left wow fadeInLeft" data-wow-delay=".1s">
            <div class="left-title">
              <img src="../assets/icon_talent.svg" />
              <p>天赋探测</p>
            </div>
            <p class="left-content">
              CECP项目帮助用户从多个维度探索发现最真实的自己，寻找潜能并尝试未来发展的多种可能性。探测不止于题目和平面分析，通过结合专业咨询师对话分析、专业行业实践和学术知识科研等实践项目，保障结果可以更加匹配用户，从而真正实现帮助用户更全面的作出职业和教育的选择及规划。
            </p>
          </div>
          <img
            class="right wow fadeInRight"
            data-wow-delay=".1s"
            src="../assets/career_1.svg"
          />
        </div>
        <div class="page-1-item page-1-item2">
          <div class="left wow fadeInRight" data-wow-delay=".2s">
            <div class="left-title">
              <img src="../assets/icon_travel.svg" />
              <p>奇妙旅程</p>
            </div>
            <p class="left-content">
              CECP项目通过多样性的工具和产品保障用户可以获得关于其余未来职业与教育发展的全景。该项目提供大量的机会、专业的咨询意见和系统的体验式探索，帮助用户做出进一步的教育选择，获得职业的更深入体验以及获得更丰富的教育机会。
            </p>
          </div>
          <img
            class="right wow fadeInLeft"
            data-wow-delay=".2s"
            src="../assets/career_2.svg"
          />
        </div>
        <div class="page-1-item page-1-item3">
          <div class="left wow fadeInLeft" data-wow-delay=".3s">
            <div class="left-title">
              <img src="../assets/icon_track.svg" />
              <p>长线跟踪</p>
            </div>
            <p class="left-content">
              我们记录和跟进每一位CECP用户的成长和表现，帮助他们不断的优化未来计划。通过不断的数据收集，CECP数据跟踪模型将会不断学习用户并作出调整，基于已有大数据的力量，智能地做出更适合个体的选择。
            </p>
          </div>
          <img
            class="right wow fadeInRight"
            data-wow-delay=".3s"
            src="../assets/career_3.svg"
          />
        </div>
      </div>
    </div>
    <div id="topFlag" class="page page-2">
      <div class="background background-2">
        <div class="background-content">
          <img class="svg svg1" src="../assets/b5_3.svg" />
          <img class="svg svg2" src="../assets/b5_4.svg" />
        </div>
      </div>
      <div class="page-2-content">
        <div class="page-2-item page-2-item1">
          <div class="left wow fadeInRight" data-wow-delay=".4s">
            <div class="left-title">
              <p>CECP-个人解决方案</p>
            </div>
            <p class="left-content">
              项目为学生提供生涯咨询和教育解决方案，通过个人用户主页，用户能够随时掌握教育评估、申请、学习等进度，并了解更多的教育信息和机会。
            </p>
          </div>
          <img
            class="right wow fadeInLeft"
            data-wow-delay=".4s"
            src="../assets/career_4.svg"
          />
        </div>
        <div class="page-2-item page-2-item2">
          <div class="left wow fadeInLeft" data-wow-delay=".5s">
            <div class="left-title">
              <p>CECP-学校和机构解决方案</p>
            </div>
            <p class="left-content">
              通过对学校和机构进行需求评估后，平台分配相应数量的账号给到用户。通过已订阅的账号，学生可以在平台上使用生涯规划、学生咨询等服务，学校及机构可以进行后台管理，掌握学生的平台使用情况、学习情况并获得平台所提供的各项缝隙数据。
            </p>
          </div>
          <img
            class="right wow fadeInRight"
            data-wow-delay=".5s"
            src="../assets/career_5.svg"
          />
        </div>
      </div>
    </div>
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
.Career {
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
    // width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      }
    }
  }
  .page-1 {
    // height: 46.875vw;
    min-height: 86.41vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 4.17vw;
    .background-1 {
      .svg1 {
        width: 13.07vw;
        bottom: 4.69vw;
        left: 0;
      }
      .svg2 {
        width: 6.72vw;
        bottom: 0;
        right: 0;
      }
    }
    .page-1-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 62.5vw;
      .title {
        font-size: 1.88vw;
        color: #013047;
        font-family: Alibaba-PuHuiTi-Medium;
      }
      .page-1-item + .page-1-item {
        margin-top: 5.21vw;
      }
      .page-1-item1 {
        margin-top: 4.17vw;
      }
      .page-1-item {
        display: flex;
        // flex-direction: row;
        justify-content: space-between;
        // width: 62.5vw;
        width: 100%;
        .left {
          width: 25vw;
          .left-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            img {
              width: 3.125vw;
            }
            p {
              font-size: 1.56vw;
              color: #333333;
              margin-left: 1.56vw;
              text-align: left;
              font-family: Alibaba-PuHuiTi-Medium;
            }
          }
          .left-content {
            font-size: 1.25vw;
            color: #666666;
            margin-top: 1.35vw;
            text-align: left;
            font-family: Alibaba-PuHuiTi-Regular;
            text-align: justify;
          }
        }
        .right {
          width: 31.7vw;
          height: 100%;
          margin-top: 0.625vw;
        }
      }
      .page-1-item1,
      .page-1-item3 {
        flex-direction: row;
        .right {
          // margin-left: 5.78vw;
        }
      }
      .page-1-item2 {
        flex-direction: row-reverse;
        .right {
          // margin-right: 5.78vw;
        }
      }
      .page-1-item3 {
        .right {
          width: 26.09vw;
        }
      }
    }
  }

  .page-2 {
    width: 100vw;
    // height: 46.875vw;
    min-height: 76.04vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    .background-2 {
      background: linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%);
      .svg1 {
        width: 22.55vw;
        bottom: 0;
        left: 0;
      }
      .svg2 {
        width: 9.84vw;
        top: 15.57vw;
        right: 0;
      }
    }
    .page-2-content {
      width: 62.5vw;
      margin-top: 5.2vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 12.5vw;
      .page-2-item + .page-2-item {
        margin-top: 6.25vw;
      }
      .page-2-item1 {
        margin-top: 5.21vw;
      }
      .page-2-item {
        display: flex;
        justify-content: space-between;
        width: 62.5vw;
        .left {
          .left-title {
            display: flex;
            flex-direction: row;
            align-items: center;
            p {
              font-size: 1.56vw;
              text-align: left;
              font-family: Alibaba-PuHuiTi-Medium;
            }
          }
          .left-content {
            font-size: 1.25vw;
            color: #013047;
            margin-top: 1.98vw;
            text-align: left;
            font-family: Alibaba-PuHuiTi-Regular;
            text-align: justify;
          }
        }
        .right {
          width: 32.6vw;
          height: 100%;
        }
      }
      .page-2-item1 {
        flex-direction: row-reverse;
        .left {
          width: 25vw;
          p {
            color: #ffb706;
          }
        }
        .right {
          // margin-right: 5.78vw;
        }
      }
      .page-2-item2 {
        flex-direction: row;
        .left {
          width: 25vw;
          p {
            color: #0856e8;
          }
        }
        .right {
          // margin-left: 5.78vw;
          letter-spacing: 10px;
        }
      }
    }
  }
}
</style>