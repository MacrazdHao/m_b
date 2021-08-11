<template>
  <div class="NormalPage">
    <div
      class="chapterBox"
      :ref="`chapter${chapterIndex}-${index}`"
      v-for="(item, index) in data.data"
      :key="index"
    >
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
            <p
              class="content"
              v-if="contents.length > 0"
              :ref="`chapter${index}-part${index2}-content-text`"
              v-html="contents[index][index2]"
            ></p>
          </div>
        </div>
      </div>
      <div class="contentBox" :ref="`chapter${index}_content`" v-else>
        <p
          class="content chapterContent"
          :ref="`chapter${index}-content-text`"
          v-html="contents[index]"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
/*
  {
    startPage: 起始页,
    endPage: 结束页,
    data: [  章节
      {
        title: string,
        startPage: 起始页,
        endPage: 结束页,
        children: [小节]
      }
    ],
  }
*/
export default {
  props: ["data", "contentHeight", "lineHeight", "chapterIndex", "startPage"],
  data() {
    return {
      bigChapterPageInfo: {
        startPage: 1,
        endPage: 1,
      },
      chapterPageInfo: [],
      contents: [],
      partPageCounter: 0,
    };
  },
  watch: {
    contentHeight() {
      // this.initContentText();
    },
    startPage(val) {
      // console.log("起始页改变了", val);
      this.$set(this.bigChapterPageInfo, "startPage", this.startPage);
      // this.$nextTick(this.initContentText);
    },
    bigChapterPageInfo() {
      this.$emit(
        "setPageNum",
        this.chapterIndex,
        this.bigChapterPageInfo,
        this.chapterPageInfo
      );
    },
    chapterPageInfo() {
      this.$emit(
        "setPageNum",
        this.chapterIndex,
        this.bigChapterPageInfo,
        this.chapterPageInfo
      );
    },
  },
  mounted() {
    this.chapterPageInfo = JSON.parse(JSON.stringify(this.data.data));
    this.bigChapterPageInfo = {
      startPage: this.startPage,
      endPage: this.startPage,
    };
    this.initContentText();
  },
  methods: {
    // initPage() {
    //   for (let index = 0; index < this.data.data.length; index++) {
    //     let filler = document.createElement("div");
    //     filler.style.width = "100%";
    //     if (!this.data.data[index].children) {
    //       filler.style.height = this.getChapterRemainHeight(index) + "px";
    //       this.$refs[`chapter${index}_content`][0].appendChild(filler);
    //     } else {
    //       this.partPageCounter = 0;
    //       for (
    //         let index2 = 0;
    //         index2 < this.data.data[index].children.length;
    //         index2++
    //       ) {
    //         let filler = document.createElement("div");
    //         filler.style.width = "100%";
    //         filler.style.height =
    //           this.getPartRemainHeight(index, index2) + "px";
    //         this.$refs[
    //           `part${this.chapterIndex}-${index}-${index2}`
    //         ][0].appendChild(filler);
    //       }
    //     }
    //   }
    // },
    // 纯文本章节补白高度
    getChapterRemainHeight(index) {
      let res = 0;
      let chapterDom = this.$refs[`chapter${index}_content`] || null;
      let pageNum = Math.ceil(chapterDom[0].offsetHeight / this.contentHeight);
      let startPage =
        index == 0
          ? this.startPage
          : this.chapterPageInfo[index - 1].endPage + 1;
      let endPage = startPage + pageNum - 1;
      res = this.contentHeight * pageNum - chapterDom[0].offsetHeight - 48;
      this.$set(this.chapterPageInfo, index, {
        ...this.chapterPageInfo[index],
        startPage,
        endPage,
      });
      if (index == this.chapterPageInfo.length - 1) {
        this.$set(this.bigChapterPageInfo, "endPage", endPage);
      }
      return res;
    },
    // 非纯文本章节补白高度
    getPartRemainHeight(index, index2) {
      let res = 0;
      let partDom =
        this.$refs[`part${this.chapterIndex}-${index}-${index2}_inbox`] || null;
      let pageNum = Math.ceil(
        (partDom[0].offsetHeight + (index2 == 0 ? 88 : 0)) / this.contentHeight
      );
      this.partPageCounter += pageNum;
      let startPage =
        index == 0
          ? this.startPage
          : this.chapterPageInfo[index - 1].endPage + 1;
      let endPage = this.startPage + this.partPageCounter - 1;
      res =
        this.contentHeight * pageNum -
        partDom[0].offsetHeight -
        (index2 == 0 ? 88 : 0);
      // console.log(
      //   "小节页数",
      //   pageNum,
      //   startPage,
      //   endPage,
      //   this.chapterPageInfo
      // );
      // console.log("小节高度", this.contentHeight, partDom[0].offsetHeight);
      this.$set(this.chapterPageInfo, index, {
        ...this.chapterPageInfo[index],
        startPage,
        endPage,
      });
      if (index == this.chapterPageInfo.length - 1) {
        this.$set(this.bigChapterPageInfo, "endPage", endPage);
      }
      return res;
    },
    async initContentText() {
      // console.log(this.chapterIndex, this.chapterPageInfo);
      for (let index = 0; index < this.data.data.length; index++) {
        if (!this.data.data[index].children) {
          this.contents.push(
            this.getContentText(this.data.data[index].content, index)
          );
        } else {
          let children = [];
          for (
            let index2 = 0;
            index2 < this.data.data[index].children.length;
            index2++
          ) {
            children.push(
              this.getContentText(
                this.data.data[index].children[index2].content,
                index,
                index2
              )
            );
          }
          this.contents.push(children);
        }
        // console.log("下一步");
      }
      this.$nextTick(this.initChapterContent);
    },
    // 章节内容转换
    getContentText(text, index, index2) {
      let p = document.createElement("p");
      p.style.fontSize = "16px";
      p.style.lineHeight = this.lineHeight + "px";
      p.style.textAlign = "justify";
      p.style.textAlignLast = "justify";
      p.style.wordBreak = "break-word";
      p.style.width = "100%";
      // p.style.marginTop = "-4px";
      let parent =
        this.$refs[
          index2 >= 0
            ? `part${this.chapterIndex}-${index}-${index2}_inbox`
            : `chapter${index}_content`
        ][0];
      parent.appendChild(p);
      let res = "";
      let aColumn = "";
      let cutStart = 0;
      for (let i = 0; i < text.length; i++) {
        aColumn = text.substring(cutStart, i + 1);
        p.innerHTML = aColumn;
        // console.log(p.scrollHeight, i);
        if (p.scrollHeight > this.lineHeight) {
          aColumn = "";
          p.innerHTML = aColumn;
          let section = text.substring(cutStart, i);
          section = `<p style="line-height:${this.lineHeight}px;${
            section.length < 30 ? "width: fit-content;" : ""
          }">${section}</p>`;
          res += section;
          cutStart = i;
        }
      }
      if (aColumn != "") {
        let section = aColumn;
        if (section.length < 30) {
          section = `<p style="line-height:${this.lineHeight}px;width: fit-content;">${section}</p>`;
        }
        res += section;
      }
      parent.removeChild(p);
      return res;
    },
    initChapterContent() {
      let pageStartTop = 0;
      // 小章节
      for (let index = 0; index < this.contents.length; index++) {
        // console.log(this.data.data[index]);
        if (!this.data.data[index].children) {
          // 纯文本章节
          let thisChapter = this.$refs[`chapter${index}-content-text`][0];
          let contents = thisChapter.childNodes;
          pageStartTop =
            this.$refs[`chapter${this.chapterIndex}-${index}`][0].offsetTop;
          for (let i = 0; i < contents.length; i++) {
            let lastHeight =
              this.contentHeight - contents[i].offsetTop + pageStartTop;
            if (lastHeight < contents[i].offsetHeight) {
              contents[i - 1].style.marginBottom = `${lastHeight}px`;
              if (contents[i].innerHTML == "<br>") {
                contents[i].innerHTML = "";
              }
              if (i < contents.length - 1) {
                pageStartTop = contents[i].offsetTop;
              }
            }
          }
          let filler = document.createElement("div");
          filler.style.height = this.getChapterRemainHeight(index) + "px";
          thisChapter.appendChild(filler);
          // console.log("下一章节");
        } else {
          // 非纯文本章节
          pageStartTop =
            this.$refs[`chapter${this.chapterIndex}-${index}`][0].offsetTop;
          for (let index2 = 0; index2 < this.contents[index].length; index2++) {
            let thisPart =
              this.$refs[`part${this.chapterIndex}-${index}-${index2}`][0];
            let contents =
              this.$refs[`chapter${index}-part${index2}-content-text`][0]
                .childNodes;
            if (index2 > 0) pageStartTop = thisPart.offsetTop;
            for (let i = 0; i < contents.length; i++) {
              let lastHeight =
                this.contentHeight - contents[i].offsetTop + pageStartTop;
              if (lastHeight < contents[i].offsetHeight) {
                // console.log(
                //   lastHeight,
                //   contents[i].offsetHeight,
                //   contents[i - 1]
                // );
                contents[i - 1].style.marginBottom = `${lastHeight}px`;
                if (contents[i].innerHTML == "<br>") {
                  contents[i].innerHTML = "";
                }
                if (i < contents.length - 1) {
                  pageStartTop = contents[i].offsetTop;
                }
              }
            }
            let filler = document.createElement("div");
            filler.style.height =
              this.getPartRemainHeight(index, index2) + "px";
            thisPart.appendChild(filler);
            // console.log("下一章节");
          }
        }
      }
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
        width: 100%;
        font-size: 16px;
        color: #333333;
        text-align: justify;
        text-align-last: justify;
        margin-top: -4px;
        word-break: break-word;
      }
      .chapterContent {
        margin-top: 36px;
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