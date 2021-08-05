<template>
  <div class="NormalPage">
    <div class="chapterBox" v-for="(item, index) in data" :key="index">
      <div class="titleBox">
        <p class="title">{{ item.title }}</p>
      </div>
      <div class="contentBox" v-if="item.children">
        <div
          class="partBox"
          :style="{
            marginTop: (index2 == 0 ? 40 : 0) + 'px',
          }"
          :ref="`part${chapterIndex}-${index}-${index2}`"
          v-for="(item2, index2) in item.children"
          :key="index2"
        >
          <div
            class="partInBox"
            :ref="`part${chapterIndex}-${index}-${index2}_inbox`"
          >
            <div class="subtitleBox">
              <!-- <img
                class="subtitle-icon"
                src="@/assets/reportModule/icon_rectangle.svg"
              /> -->
              <div class="subtitle-icon">
                <div></div>
              </div>
              <p class="subtitle">{{ item2.title }}</p>
            </div>
            <p class="content" v-html="item2.content"></p>
          </div>
        </div>
      </div>
      <div class="contentBox" :ref="`chapter${index}_content`" v-else>
        <p class="content chapterContent" v-html="item.content"></p>
      </div>
    </div>
  </div>
</template>

<script>
/*
  [ 章节
    {
      title: string
      children: [小节]
    }
  ],
*/
export default {
  props: ["data", "contentHeight", "chapterIndex"],
  watch: {
    contentHeight() {
      this.initPage();
    },
  },
  mounted() {
    // this.initPage();
  },
  methods: {
    initPage() {
      for (let index = 0; index < this.data.length; index++) {
        let filler = document.createElement("div");
        filler.style.width = "100%";
        if (!this.data[index].children) {
          filler.style.height = this.getChapterRemainHeight(index) + "px";
          this.$refs[`chapter${index}_content`][0].appendChild(filler);
        } else {
          for (
            let index2 = 0;
            index2 < this.data[index].children.length;
            index2++
          ) {
            let filler = document.createElement("div");
            filler.style.width = "100%";
            filler.style.height =
              this.getPartRemainHeight(index, index2) + "px";
            this.$refs[
              `part${this.chapterIndex}-${index}-${index2}`
            ][0].appendChild(filler);
          }
        }
      }
    },
    // 纯文本章节补白
    getChapterRemainHeight(index) {
      let res = 0;
      let chapterDom = this.$refs[`chapter${index}_content`] || null;
      res =
        this.contentHeight *
          Math.ceil(chapterDom[0].offsetHeight / this.contentHeight) -
        chapterDom[0].offsetHeight -
        48;
      return res;
    },
    // 非纯文本章节补白
    getPartRemainHeight(index, index2) {
      let res = 0;
      let partDom =
        this.$refs[`part${this.chapterIndex}-${index}-${index2}_inbox`] || null;
      res =
        this.contentHeight *
          Math.ceil(partDom[0].offsetHeight / this.contentHeight) -
        partDom[0].offsetHeight -
        (index2 == 0 ? 88 : 0);
      return res;
    },
  },
};
</script>

<style lang="scss" scoped>
.NormalPage {
  background: #fff;
  width: 596px;
  box-sizing: border-box;
  .chapterBox {
    display: flex;
    flex-direction: column;
    .titleBox {
      width: 222px;
      height: 48px;
      background: #013047;
      border-radius: 0px 100px 100px 0px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .title {
        font-size: 20px;
        color: #ffffff;
        line-height: 27px;
        margin-top: -4px;
      }
    }
    .contentBox {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 50px;
      .content {
        font-size: 16px;
        color: #333333;
        line-height: 22px;
        text-align: justify;
        margin-top: -4px;
      }
      .chapterContent {
        margin-top: 40px;
      }
      .partBox {
        .partInBox {
          .subtitleBox {
            display: flex;
            flex-direction: row;
            align-items: center;
            .subtitle-icon {
              // width: 14px;
              // height: 14px;
              width: 14.14px;
              height: 14.14px;
              display: flex;
              align-items: center;
              justify-content: center;
              div {
                background-color: #013047;
                width: 9.998px;
                height: 9.998px;
                transform: rotate(45deg);
              }
            }
            .subtitle {
              font-size: 18px;
              font-family: AlibabaPuHuiTiM;
              color: #013047;
              line-height: 25px;
              margin-left: 8px;
              margin-top: -4px;
            }
          }
          .content {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
</style>