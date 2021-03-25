<template>
  <div class="Index">
    <div class="page page-1">
      <div class="background background-1">
        <div class="background-content">
          <img class="svg svg1" src="../assets/b1_1.svg" />
          <img class="svg svg2" src="../assets/b1_2.svg" />
          <img class="svg svg3" src="../assets/b1_3.svg" />
          <img class="svg svg4" src="../assets/b1_4.svg" />
          <img class="svg svg5" src="../assets/b1_5.svg" />
        </div>
      </div>
      <div class="page-1-content">
        <div class="left">
          <p class="title1 wow fadeInLeft" data-wow-delay="0s">CECP</p>
          <p class="title2 wow fadeInLeft" data-wow-delay=".1s">生涯服务</p>
          <p class="subtitle wow fadeInLeft" data-wow-delay=".2s">
            生涯成长和学校教育<br />全链条生涯规划
          </p>
          <div class="shortline wow fadeInLeft" data-wow-delay=".3s"></div>
          <p class="direction wow fadeInLeft" data-wow-delay=".4s">
            CECP 项目是对处在 12-18
            岁阶段的学生进行的以自我认知、职业倾向为导向的全链条生涯规划
          </p>
          <p
            class="button wow fadeInLeft"
            data-wow-delay=".5s"
            @click="goCareer"
          >
            查看更多
          </p>
        </div>
        <div class="right wow fadeInRight">
          <img src="../assets/banner.svg" />
        </div>
      </div>
    </div>
    <div class="page page-2">
      <div class="background background-2">
        <div class="background-content">
          <img class="svg svg1" src="../assets/b2_1.svg" />
          <img class="svg svg2" src="../assets/b2_2.svg" />
        </div>
      </div>
      <div class="page-2-content">
        <div class="director director1">
          <div class="picGroup wow fadeInLeft" data-wow-duration="1.5s">
            <img src="../assets/director1.png" />
            <div class="picGroup-bg">
              <div
                class="picGroup-bg-inbox wow fadeInRight"
                data-wow-delay=".45s"
              >
                <div class="picGroup-bg-item picGroup-bg-item1"></div>
                <div class="picGroup-bg-item picGroup-bg-item2"></div>
                <div class="picGroup-bg-item picGroup-bg-item3"></div>
              </div>
            </div>
            <div class="identify wow fadeInLeft" data-wow-delay=".05s">
              <p class="name">Dr Steve Bailey</p>
              <p class="position">责任咨询师</p>
            </div>
          </div>
          <div class="personalInfo">
            <div class="aboutTag wow fadeInRight" data-wow-delay="0s">
              <p class="preffix">ABO</p>
              <p class="suffix">UT US</p>
            </div>
            <p class="title wow fadeInRight" data-wow-delay=".1s">
              CECP服务负责人介绍
            </p>
            <div class="middleline wow fadeInRight" data-wow-delay=".2s"></div>
            <p class="information wow fadeInRight" data-wow-delay=".3s">
              Dr Steve
              Bailey，史提芬·贝利博士。纬英科技英国区主管合伙人。英国著名教育学家、历史学家，现任英国顶级私校威斯敏斯特学校校长、英国儿童教育及福利保护协会主席、英国住宿制学校联盟执委会委员；现任哈罗公学、德威学院等多所顶尖名校特命首长督学。曾任职于九大公学之一的温彻斯特公学近
              30 年时间，担任高级院长 11
              年，帮助数以百计的学生成功获得哈佛大学、麻省理工、剑桥大学、牛津大学等世界顶尖高校的学位，并获得优异成绩毕业。
            </p>
          </div>
        </div>
        <div class="director director2">
          <div class="picGroup wow fadeInRight" data-wow-duration="1.5s">
            <img src="../assets/director2.png" />
            <div class="picGroup-bg">
              <div
                class="picGroup-bg-inbox wow fadeInRight"
                data-wow-delay=".45s"
              >
                <div class="picGroup-bg-item picGroup-bg-item1"></div>
                <div class="picGroup-bg-item picGroup-bg-item2"></div>
                <div class="picGroup-bg-item picGroup-bg-item3"></div>
              </div>
            </div>
            <div class="identify wow fadeInRight" data-wow-delay=".05s">
              <p class="name">Sam Wong</p>
              <p class="position">客户负责人</p>
            </div>
          </div>
          <div class="personalInfo">
            <div class="aboutTag wow fadeInLeft" data-wow-delay="0s">
              <p class="preffix">ABO</p>
              <p class="suffix">UT US</p>
            </div>
            <p class="title wow fadeInLeft" data-wow-delay=".1s">
              CECP服务负责人介绍
            </p>
            <div class="middleline wow fadeInLeft" data-wow-delay=".2s"></div>
            <p class="information wow fadeInLeft" data-wow-delay=".3s">
              Sam
              Wong，黄星维。纬英科技中国区主管合伙人。华威大学数学、统筹学、统计学、经济学一等荣誉学位毕业，注册助理统计学家。温彻斯特公学奖学金获得者。一直以来，致力于统计学及大数据科学在教育领域的应用与发展。
            </p>
          </div>
        </div>
        <div class="director director3">
          <div class="picGroup wow fadeInLeft" data-wow-duration="1.5s">
            <img src="../assets/director3.png" />
            <div class="picGroup-bg">
              <div
                class="picGroup-bg-inbox wow fadeInLeft"
                data-wow-delay=".45s"
              >
                <div class="picGroup-bg-item picGroup-bg-item1"></div>
                <div class="picGroup-bg-item picGroup-bg-item2"></div>
                <div class="picGroup-bg-item picGroup-bg-item3"></div>
              </div>
            </div>
            <div class="identify wow fadeInLeft" data-wow-delay=".05s">
              <p class="name">Yvonne Wu</p>
              <p class="position">客户咨询师</p>
            </div>
          </div>
          <div class="personalInfo">
            <div class="aboutTag wow fadeInRight" data-wow-delay="0s">
              <p class="preffix">ABO</p>
              <p class="suffix">UT US</p>
            </div>
            <p class="title wow fadeInRight" data-wow-delay=".1s">
              CECP服务负责人介绍
            </p>
            <div class="middleline wow fadeInRight" data-wow-delay=".2s"></div>
            <p class="information wow fadeInRight" data-wow-delay=".3s">
              Yvonne
              Wu，武燕。纬英科技中国区合伙人CECP项目产品设计师。华威大学教育学硕士，
              南开大学法学学士，生涯规划咨询师。由纬英科技成立以来，结合自身经历及专业领域知识，一直专注于让留学生更好地融入海外生活文化，并辅助学生从根本上解决学习难题。
            </p>
          </div>
        </div>
      </div>
    </div>
    <div id="topFlag" class="page page-3">
      <div class="background background-3">
        <div class="background-content">
          <img class="svg svg1" src="../assets/b3_1.svg" />
        </div>
      </div>
      <div class="page-3-content">
        <div class="contentItem">
          <div class="personalInfo">
            <div class="aboutTag wow fadeInLeft" data-wow-delay="0s">
              <p class="preffix">CORE</p>
              <p class="suffix">&nbsp;TEAM</p>
            </div>
            <p class="title wow fadeInLeft" data-wow-delay=".1s">
              核心成员团队
            </p>
            <div class="middleline wow fadeInLeft" data-wow-delay=".2s"></div>
            <p class="information wow fadeInLeft" data-wow-delay=".3s">
              CECP项目核心团队成员由拥有40年以上教育行业履历的海内外知名学术泰斗、教育咨询领域资深生涯规划专家，及热衷于教育行业的世界知名学府校友组成。团队成员从事教育业以来已成功协助数以百计的学生完成生涯及学业规划，并最终辅助学生成功入读哈佛大学、麻省理工学院、牛津大学及剑桥大学等国际顶尖高校。
            </p>
          </div>
        </div>
        <div class="contentItem teammate teammate1">
          <img
            class="wow fadeInRight"
            data-wow-delay="0s"
            src="../assets/teammate1.png"
          />
          <div class="teammate-info wow fadeInRight" data-wow-delay=".2s">
            <div class="teammate-info-inbox">
              <div class="teammate-info-content">
                <div class="title">
                  <div class="orangeShortline"></div>
                  Vivienne Goodger
                </div>
                <p class="content">
                  MyFellas项目专家委员会成员<br />
                  10年以上教育咨询行业经验<br />
                  剑桥大学中国研究学一等荣誉学士学位<br />
                  英国线上教育先驱Education Inspires创始人
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="contentItem teammate teammate2">
          <img
            class="wow fadeInLeft"
            data-wow-delay="0s"
            src="../assets/teammate1.png"
          />
          <div class="teammate-info wow fadeInLeft" data-wow-delay=".2s">
            <div class="teammate-info-inbox">
              <div class="teammate-info-content">
                <div class="title">
                  <div class="orangeShortline"></div>
                  Vivienne Goodger
                </div>
                <p class="content">
                  MyFellas项目专家委员会成员<br />
                  10年以上教育咨询行业经验<br />
                  剑桥大学中国研究学一等荣誉学士学位<br />
                  英国线上教育先驱Education Inspires创始人
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="contentItem teammate teammate3">
          <img
            class="wow fadeInRight"
            data-wow-delay="0s"
            src="../assets/teammate1.png"
          />
          <div class="teammate-info wow fadeInRight" data-wow-delay=".2s">
            <div class="teammate-info-inbox">
              <div class="teammate-info-content">
                <div class="title">
                  <div class="orangeShortline"></div>
                  Vivienne Goodger
                </div>
                <p class="content">
                  MyFellas项目专家委员会成员<br />
                  10年以上教育咨询行业经验<br />
                  剑桥大学中国研究学一等荣誉学士学位<br />
                  英国线上教育先驱Education Inspires创始人
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="page page-4">
      <div class="background background-4">
        <div class="background-content">
          <img class="svg svg1" src="../assets/b4_1.svg" />
          <img class="svg svg2" src="../assets/b4_2.svg" />
        </div>
      </div>
      <div class="page-4-content">
        <div class="page-4-content-inbox">
          <div class="page-4-content-item1">
            <div class="personalInfo">
              <div class="aboutTag wow fadeInLeft" data-wow-delay="0s">
                <p class="preffix">OUR</p>
                <p class="suffix">&nbsp;PRODUCTS</p>
              </div>
              <p class="title wow fadeInLeft" data-wow-delay=".1s">
                生涯成长和学校教育的一体化模式
              </p>
              <div class="middleline wow fadeInLeft" data-wow-delay=".2s"></div>
              <div class="photo">
                <img
                  class="photo-img wow zoomIn"
                  data-wow-delay=".2s"
                  data-wow-duration=".8s"
                  style="z-index: 1000"
                  src="../assets/product1.png"
                />
                <div
                  class="wow pulse"
                  data-wow-delay=".2s"
                  data-wow-duration="2s"
                  data-wow-iteration="1"
                >
                  <img
                    class="background-img wow fadeIn"
                    data-wow-delay=".5s"
                    data-wow-duration="1.3s"
                    src="../assets/product_bg.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="page-4-content-item2">
            <div class="feature wow fadeInDown" data-wow-duration="2.5s">
              <img src="../assets/icon_talent.svg" />
              <div class="feature-content">
                <p class="title">01. 天赋探测</p>
                <p class="detail">
                  CECP项目帮助用户从多个维度探索发现最真实的自己，寻找潜能并尝试未来发展的多种可能性。
                </p>
              </div>
            </div>
            <div class="feature wow fadeInDown" data-wow-duration="2.5s">
              <img src="../assets/icon_travel.svg" />
              <div class="feature-content">
                <p class="title">02. 奇妙旅程</p>
                <p class="detail">
                  CECP项目通过多样性的工具和产品保障用户可以获得关于其余未来职业与教育发展的全景。
                </p>
              </div>
            </div>
            <div class="feature wow fadeInDown" data-wow-duration="2.5s">
              <img src="../assets/icon_track.svg" />
              <div class="feature-content">
                <p class="title">03. 长线跟踪</p>
                <p class="detail">
                  我们记录和跟进每一位CECP用户的成长和表现，帮助他们不断的优化未来计划。
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="page-4-content-inbox" data-wow-delay=".7s">
          <div class="solution wow fadeInDown" data-wow-duration="3s">
            <div class="solution-header solution-header1">
              <p class="solution-title-en">Personal</p>
              <p class="solution-title-cn">个人解决方案</p>
            </div>
            <p class="solution-detail">
              项目为学生提供生涯咨询和教育解决方案，通过个人用户主页，用户能够随时掌握教育评估、申请、学习等进度，并了解更多的教育信息和机会。
            </p>
          </div>
          <div class="solution wow fadeInDown" data-wow-duration="3s">
            <div class="solution-header solution-header2">
              <p class="solution-title-en">School and Institutional</p>
              <p class="solution-title-cn">学校和机构解决方案</p>
            </div>
            <p class="solution-detail">
              通过对学校和机构进行需求评估后，平台分配相应数量的账号给到用户。通过已订阅的账号，学生可以在平台上使用生涯规划、学生咨询等服务，学校及机构可以进行后台管理，掌握学生的平台使用情况、学习情况并获得平台所提供的各项缝隙数据。
            </p>
          </div>
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
  methods: {
    goCareer() {
      this.$router.push({ path: "/career" });
    },
  },
};
</script>

<style lang="scss" scoped>
.Index {
  position: relative;
  width: 100%;
  p {
    margin: 0;
    width: fit-content;
  }
  .page {
    position: relative;
    width: 100vw;
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
    .personalInfo {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .aboutTag {
        font-size: 0;
        display: flex;
        flex-direction: row;
        p {
          padding-top: 0.42vw;
          padding-bottom: 0.42vw;
        }
        .preffix {
          color: #ffffff;
          padding-left: 1.09vw;
          background: linear-gradient(270deg, #0557e8 0%, #6429cd 100%);
          box-shadow: 0 0.52vw 0.94vw #c2d8ff;
          border-radius: 0.31vw 0 0 0.31vw;
          font-size: 1.46vw;
          font-family: huakangli;
          font-weight: bold;
        }
        .suffix {
          color: #333333;
          padding-right: 1.09vw;
          font-size: 1.46vw;
          font-family: huakangli;
          font-weight: bold;
        }
      }
      .title {
        color: #333333;
        text-align: left;
        margin-top: 1.56vw;
        font-size: 1.56vw;
        font-family: Alibaba-PuHuiTi-Medium;
      }
      .middleline {
        width: 4.69vw;
        height: 0.28vw;
        background-color: #e0e0e0;
        margin-top: 2.08vw;
      }
      .information {
        text-align: left;
        width: 26.25vw;
        margin-top: 2.08vw;
        color: #666666;
        font-size: 1.25vw;
        font-family: Alibaba-PuHuiTi-Regular;
        text-align: justify;
      }
    }
  }
  .page-1 {
    width: 100vw;
    // min-height: 46.875vw;
    padding-bottom: 10vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0 0.729vw 1.98vw #dbe0ea;
    .background-1 {
      .svg1 {
        width: 13.07vw;
        top: 0;
        left: 0;
      }
      .svg2 {
        width: 6.72vw;
        top: 0;
        right: 0;
      }
      .svg3 {
        width: 6.2vw;
        bottom: 0.47vw;
        left: 0.99vw;
      }
      .svg4 {
        width: 3.75vw;
        bottom: 6.35vw;
        left: 6.35vw;
      }
      .svg5 {
        width: 11.82vw;
        bottom: 0;
        right: 0;
      }
    }
    .page-1-content {
      margin-top: 11.46vw;
      display: flex;
      flex-direction: row;
      width: 62.5vw;
      .left {
        p {
          text-align: left;
        }
        .title1 {
          background-color: #013047;
          padding: 0.42vw 0.625vw;
          font-size: 2.08vw;
          color: #ffb706;
          border-radius: 0.52vw;
          font-family: AiDeep;
        }
        .title2 {
          margin-top: 0.625vw;
          font-size: 1.98vw;
          font-family: Alibaba-PuHuiTi-Medium;
          color: #013047;
        }
        .subtitle {
          margin-top: 1.875vw;
          font-size: 1.67vw;
          font-family: Alibaba-PuHuiTi-Medium;
          color: #013047;
        }
        .shortline {
          background-color: #e0e0e0;
          height: 0.3125vw;
          width: 4.17vw;
          margin-top: 2.08vw;
        }
        .direction {
          margin-top: 2.08vw;
          font-size: 1.04vw;
          color: #999999;
          font-family: Alibaba-PuHuiTi-Regular;
          text-align: justify;
        }
        .button {
          width: 8.33vw;
          height: 2.6vw;
          background: linear-gradient(270deg, #ffd05d 0%, #ffb706 100%);
          box-shadow: 0 0.31vw 0.625vw 0 #ffe6a9;
          border-radius: 1.51vw;
          text-align: center;
          line-height: 2.6vw;
          color: #fff;
          font-size: 1.25vw;
          font-family: Alibaba-PuHuiTi-Regular;
          margin-top: 2.08vw;
          cursor: pointer;
        }
      }
      .right {
        margin-left: 2.34vw;
        img {
          width: 36.46vw;
          height: 25.21vw;
        }
      }
    }
  }
  .page-2 {
    // height: 120.89vw;
    padding-bottom: 4.17vw;
    .background-2 {
      .svg1 {
        width: 7.92vw;
        top: 40.21vw;
        right: 0;
      }
      .svg2 {
        width: 10.16vw;
        bottom: 0;
        left: 0;
      }
    }
    .page-2-content {
      .director {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 4.17vw;
        .picGroup {
          position: relative;
          width: 33.125vw;
          height: 34.74vw;
          img {
            position: absolute;
            left: 0;
            top: 0;
            width: 25vw;
            box-shadow: 0 0.938vw 1.56vw rgba(119, 119, 119, 0.5);
            border-radius: 1.04vw;
          }
          .picGroup-bg {
            width: 20.47vw;
            height: 31.61vw;
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: -1;
            .picGroup-bg-inbox {
              position: relative;
              height: 100%;
              width: 100%;
              .picGroup-bg-item {
                position: absolute;
                width: 16.88vw;
                border-radius: 0.521vw;
              }
              .picGroup-bg-item1 {
                background: linear-gradient(204deg, #6429cd 0%, #0557e8 100%);
                height: 18.23vw;
                top: 0;
                left: 0;
              }
              .picGroup-bg-item2 {
                background-color: #f0f0f0;
                height: 18.23vw;
                top: 7.29vw;
                left: 2.08vw;
              }
              .picGroup-bg-item3 {
                background-color: #f0f0f0;
                height: 20.31vw;
                right: 0;
                bottom: 0;
              }
            }
          }
          .identify {
            position: absolute;
            bottom: 7.66vw;
            right: 2.08vw;
            width: 15.1vw;
            // height: 5.73vw;
            background: linear-gradient(129deg, #ffa724 0%, #ffd83d 100%);
            box-shadow: 0 0.729vw 1.15vw #ffe7a936;
            border-radius: 0.625vw;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 0.625vw;
            padding-bottom: 0.52vw;
            p {
              color: #013047;
            }
            .name {
              // margin-top: 0.625vw;
              font-size: 1.67vw;
              line-height: 2.29vw;
              font-family: Alibaba-PuHuiTi-Medium;
            }
            .position {
              margin-top: 0.1vw;
              font-size: 1.56vw;
              line-height: 2.19vw;
              font-family: Alibaba-PuHuiTi-Regular;
            }
          }
        }
        .personalInfo {
          margin-left: 3.125vw;
          margin-top: 3.125vw;
        }
      }
      .director2 {
        flex-direction: row-reverse;
        .picGroup {
          margin-left: 3.125vw;
        }
        .personalInfo {
          margin-left: 0;
        }
      }
    }
  }
  .page-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 4.17vw;
    padding-bottom: 5.21vw;
    .background-3 {
      background: linear-gradient(180deg, #f5f5f5 0%, #ffffff 100%);
      .svg1 {
        width: 11.72vw;
        bottom: 0;
        right: 0;
      }
    }
    .page-3-content {
      width: 70.5vw;
      .contentItem {
        display: inline-block;
        width: 28.96vw;
        min-height: 23.28vw;
        font-size: 0;
        vertical-align: top;
        .personalInfo {
          .preffix {
            padding-left: 0.36vw;
          }
        }
      }
      .teammate {
        position: relative;
        img {
          position: absolute;
          top: 0;
          right: 0;
          z-index: -1;
          box-shadow: 0 0.625vw 1.04vw #d6d9e5;
          border-radius: 1.04vw;
          width: 25vw;
        }
        .teammate-info {
          // position: absolute;
          margin-top: 13.125vw;
          // left: 0;
          // z-index: 2;
          width: 21.93vw;
          background: linear-gradient(90deg, #0557e8 0%, #6429cd 100%);
          box-shadow: 0 0.625vw 1.04vw #d6d9e5;
          border-radius: 0.625vw;
          display: flex;
          flex-direction: row;
          // justify-content: center;
          align-items: center;
          .teammate-info-inbox {
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            padding-top: 1.56vw;
            padding-bottom: 1.56vw;
            .teammate-info-content {
              width: 16.3vw;
              // margin-left: 0.625vw;
              margin-left: 1.56vw;
              p {
                text-align: left;
              }
              .title {
                font-size: 1.25vw;
                color: #fff;
                font-family: Alibaba-PuHuiTi-Medium;
                text-align: left;
                display: flex;
                flex-direction: row;
                align-items: center;
                .orangeShortline {
                  width: 1.875vw;
                  height: 0.21vw;
                  // margin-top: 0.625vw;
                  background: linear-gradient(228deg, #ffd05d 0%, #ffb706 100%);
                  border-radius: 0.104vw;
                  margin-right: 0.625vw;
                }
              }
              .content {
                margin-left: 2.5vw;
                font-size: 0.83vw;
                color: #e5eaef;
                margin-top: 0.52vw;
                font-family: Alibaba-PuHuiTi-Regular;
                text-align: justify;
              }
            }
          }
        }
      }
      .teammate1,
      .teammate3 {
        margin-left: 4.58vw;
      }
      .teammate2,
      .teammate3 {
        margin-top: 4.17vw;
      }
    }
  }
  .page-4 {
    .background-4 {
      .background-content {
        .svg1 {
          bottom: 12.97vw;
          left: 0;
          width: 6.61vw;
        }
        .svg2 {
          width: 24.84vw;
          bottom: 27.14vw;
          right: 0;
        }
      }
    }
    .page-4-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 4.17vw;
      padding-bottom: 12.5vw;
      .page-4-content-inbox {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .page-4-content-item1,
        .page-4-content-item2 {
          min-height: 38.59vw;
        }
        .page-4-content-item1 {
          width: fit-content;
          .personalInfo {
            .preffix {
              padding-left: 0.36vw;
            }
            .photo {
              margin-top: 2.08vw;
              position: relative;
              .photo-img {
                position: absolute;
                top: 1.98vw;
                left: 1.77vw;
                width: 29.58vw;
                height: 22vw;
                box-shadow: 0 0.94vw 1.56vw rgba(162, 162, 162, 0.5);
                border-radius: 1.04vw;
              }
              .background-img {
                width: 34.17vw;
                height: 26.04vw;
                // box-shadow: 0 0.52vw 0.94vw #C2D8FF;
              }
            }
          }
        }
        .page-4-content-item2 {
          margin-left: 10.55vw;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          .feature + .feature {
            margin-top: 1.56vw;
          }
          .feature {
            padding: 1.04vw 1.56vw;
            display: flex;
            flex-direction: row;
            align-items: center;
            background: #fff;
            box-shadow: 0 0.52vw 1.56vw rgba(208, 208, 208, 0.5);
            border-radius: 0.52vw;
            img {
              width: 3.125vw;
              height: 3.125vw;
            }
            .feature-content {
              margin-left: 2.08vw;
              .title {
                text-align: left;
                color: #333333;
                font-size: 1.25vw;
                font-family: Alibaba-PuHuiTi-Medium;
              }
              .detail {
                margin-top: 0.42vw;
                text-align: left;
                color: #666666;
                font-size: 0.83vw;
                width: 16.15vw;
                font-family: Alibaba-PuHuiTi-Regular;
                text-align: justify;
              }
            }
          }
        }
        .solution + .solution {
          margin-left: 13.54vw;
        }
        .solution {
          width: 20.83vw;
          background: #ffffff;
          box-shadow: 0 1.04vw 2.08vw rgba(208, 208, 208, 0.5);
          border-radius: 0.52vw;
          margin-top: 4.17vw;
          .solution-header {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            border-radius: 0.52vw 0.52vw 0 0;
            padding-top: 2.08vw;
            padding-bottom: 2.19vw;
            .solution-title-en {
              font-size: 1.56vw;
              font-family: huakangli;
              font-weight: bold;
            }
            .solution-title-cn {
              font-size: 1.46vw;
              margin-top: 0.52vw;
              font-family: Alibaba-PuHuiTi-Regular;
            }
          }
          .solution-header1 {
            background: linear-gradient(225deg, #ffa724 0%, #ffd83d 100%);
            color: #333333;
          }
          .solution-header2 {
            background: linear-gradient(45deg, #0557e8 0%, #6429cd 100%);
            color: #ffffff;
          }
          .solution-detail {
            color: #666666;
            font-size: 1.15vw;
            padding: 1.56vw;
            text-align: left;
            font-family: Alibaba-PuHuiTi-Regular;
            text-align: justify;
          }
        }
      }
    }
  }
}
</style>