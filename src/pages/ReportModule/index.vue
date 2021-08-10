<template>
  <div class="ReportModule">
    <Cover class="cover progressItem" />
    <div ref="pages" @click="downloadPDF">
      <Catalogue
        class="page"
        :style="{ minHeight: contentHeight + 'px' }"
        :contentHeight="contentHeight"
        :data="contentInfo"
        :cnTitles="cnTitles"
        :enTitles="enTitles"
      />
      <div v-for="(item, index) in contentInfo" :key="index">
        <NormalPage
          class="page"
          v-if="!item.special"
          :style="{ minHeight: contentHeight + 'px' }"
          :chapterIndex="index"
          :startPage="index == 0 ? 1 : contentInfo[index - 1].endPage + 1"
          :data="item"
          :contentHeight="contentHeight"
          @setPageNum="setPageNum"
        />
        <ProgressPage
          class="page"
          v-if="item.special && item.specialKey == 'progress'"
          :style="{ minHeight: contentHeight + 'px' }"
          :chapterIndex="index"
          :startPage="index == 0 ? 1 : contentInfo[index - 1].endPage + 1"
          :data="item"
          :contentHeight="contentHeight"
          @setPageNum="setPageNum"
        />
      </div>
    </div>
    <Back class="cover progressItem" />
    <Header
      class="progressItem"
      ref="header"
      :username="nickName"
      :cn="cnTitles[titleIndex]"
      :en="enTitles[titleIndex]"
      :pageNum="nowPage"
    />
    <Footer
      class="progressItem"
      ref="footer"
      :date="date"
      :title="enTitles[titleIndex]"
      :pageNum="nowPage"
    />
    <div>以下是生成的每页头部和底部</div>
    <div v-for="(item, index) in pageInfo" :key="index">
      <p>---{{ index }} - {{ item.height }}---</p>
      <div v-for="(item2, index2) in item.headers" :key="`header${index2}`">
        <img :src="item2" width="596" />
      </div>
      <div v-for="(item2, index2) in item.footers" :key="`footer${index2}`">
        <img :src="item2" width="596" />
      </div>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script>
import Cover from "./components/cover.vue";
import Catalogue from "./components/catalogue.vue";
import NormalPage from "./components/normalPage.vue";
import ProgressPage from "./components/progressPage.vue";
import Back from "./components/back.vue";
import Header from "./components/header.vue";
import Footer from "./components/footer.vue";
import html2canvas from "html2canvas";
export default {
  components: {
    Cover,
    Catalogue,
    NormalPage,
    ProgressPage,
    Back,
    Header,
    Footer,
  },
  data() {
    return {
      headerImg: null,
      footerImg: null,
      coversImg: [],
      pageInfo: [],
      quality: 2,
      loadedProgress: 0,
      nowPage: 1,
      pageHeight: 852,
      contentHeight: 852,
      headerHeight: 0,
      footerHeight: 0,
      cnTitles: ["目录", "概况与背景", "咨询基本情况", "下一步", "咨询进度"],
      enTitles: [
        "Contents",
        "Overview",
        "Interview Notes",
        "Next Steps",
        "Progress",
      ],
      titleIndex: 0,
      nickName: "Alina Li",
      date: "07.21.21",
      catalogue: [
        {
          titleIndex: 1,
          subtitles: [
            {
              title: "子标题1-1",
              pageIndex: "01",
            },
            {
              title: "子标题1-2",
              pageIndex: "02",
            },
          ],
        },
      ],
      contentInfo: [
        {
          startPage: 1,
          endPage: 1,
          data: [
            {
              startPage: 1,
              endPage: 1,
              title: "学生当前状况",
              content:
                "在本次咨询中,Alina表现得十分积极,并且分享了很多她对于不同事情的看法。\n\n在咨询的开始阶段，Dr.Bailey与Alina进行了上周咨询的内容回顾。在这个环节里面, Alina除了清晰地讲诉了之前探索过的商科/管理课程，同时还提及了艺术/建筑设计方面的内容。".replace(
                  /\n/gm,
                  "<br/>"
                ),
            },
          ],
        },
        {
          startPage: 1,
          endPage: 1,
          data: [
            {
              startPage: 1,
              endPage: 1,
              title: "与学生的沟通",
              children: [
                {
                  title: "专业科目探索",
                  content:
                    "在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。在接下来的咨询里面，Dr.Bailey与Alina共同探索了数个与建筑设计相关的专业方向。专业方向包括:室内设计、城市规划与设计、艺术历史学、建筑设计方向的综合型专业（例如建筑技术工程与设计）。\n\nAlina对这几个方向的分支专业课程都感到兴趣，并且想更多地了解其中的几个课程内容。她表示，其中她比较感兴趣的是城市设计与建筑课程在实际应用方面的内容，同时她对建筑室内设计也比较感兴趣。\n\nDr.Bailey认为，Alina也许不会对纯室内设计的课程感到兴趣。她的兴趣应该会更偏向于实际应用方面的内容，例如城市建筑规划（建筑物如何更好地融入城市）及建筑内部空间的配置与应用（建筑内部空间配置如何满足不同的建筑物功能需求）。\n\n当Dr.Bailey与Alina讨论到与设计相关的实际应用问题的时候，Alina表述的一些观点（例如办公建筑、商场建筑及住宅建筑之间应该如何取得平衡，及公园、绿化工程相关的设计规划）让Dr.Bailey感到印象十分深刻。\n\nDr.Bailey表示，这些观点都是Alina在实际应用方面的理性思考体现，对此他感到十分的惊喜。\n\n除了建筑设计方向的探索，Dr.Bailey与Alina还进行了有关商科的讨论。Dr.Bailey和Alina讨论到当前需要找到一门兴趣与职业规划相结合的专业课程。Alina表示，受父母经商的影响，及自己目前在学校商科社团的经历，她对于商科方向的专业课程感到兴趣并且不会排除选择该类专业课程的可能性。\n\nDr.Bailey理解Alina在一定程度上热衷于商科的原因，并且表示会继续为Alina进行商科方向的课程探索。".replace(
                      /\n/gm,
                      "<br/>"
                    ),
                },
                {
                  title: "探索总结",
                  content:
                    "在本次咨询中，当Dr.Bailey与Alina讨论到商科或建筑设计专业内容的时候，Alina都会十分愿意分享她的看法。\n\n在分享的过程中，Dr.Bailey能够明显感受到Alina表达的内容大多是真正属于她个人的看法观点，而不是受其他人（例如Dr.Bailey或Alina父母）影响导致的观点。\n\nDr.Bailey认为，在接下来的学习生活中，当Alina需要作出有关大学专业课程、未来职业方向等相关重要抉择的时候，这些确定理应遵循并取决于Alina的个人意愿。".replace(
                      /\n/gm,
                      "<br/>"
                    ),
                },
              ],
            },
          ],
        },
        {
          startPage: 1,
          endPage: 1,
          data: [
            {
              title: "建议及咨询预告",
              children: [
                {
                  startPage: 1,
                  endPage: 1,
                  title: "建议",
                  content:
                    "Dr.Bailey再次强调,关于大学专业课程选择，Alina在现阶段并不需要过急的作出最终决定。\n\n当Alina在选择学科专业的时候，应该遵循自己的初心及结合家人、导师的分析建议，全面考量后在作出属于自己的决定。".replace(
                      /\n/gm,
                      "<br/>"
                    ),
                },
                {
                  startPage: 1,
                  endPage: 1,
                  title: "咨询内容预告",
                  content:
                    "在下一次的咨询中，Dr.Bailey将会与Alina继续探索更多不同方向类型的专业课程。".replace(
                      /\n/gm,
                      "<br/>"
                    ),
                },
              ],
            },
          ],
        },
        {
          startPage: 1,
          endPage: 1,
          special: true,
          specialKey: "progress",
          noChapters: true,
          data: {
            progress: 60,
            openDate: new Date("2021/08/16").getTime(),
            schedule: [
              {
                title: "学科专业探索",
                dates: [
                  {
                    start: new Date("2021/06/29").getTime(),
                    end: new Date("2021/06/29").getTime(),
                  },
                  {
                    start: new Date("2021/07/05").getTime(),
                    end: new Date("2021/07/09").getTime(),
                  },
                  {
                    start: new Date("2021/08/02").getTime(),
                    end: new Date("2021/08/06").getTime(),
                  },
                  {
                    start: new Date("2021/07/12").getTime(),
                    end: new Date("2021/07/16").getTime(),
                  },
                  {
                    start: new Date("2021/08/09").getTime(),
                    end: new Date("2021/08/13").getTime(),
                  },
                  {
                    start: new Date("2021/06/21").getTime(),
                    end: new Date("2021/06/25").getTime(),
                  },
                  {
                    start: new Date("2021/07/19").getTime(),
                    end: new Date("2021/07/23").getTime(),
                  },
                  {
                    start: new Date("2021/07/26").getTime(),
                    end: new Date("2021/07/30").getTime(),
                  },
                ],
              },
              {
                title: "英语提升",
                dates: [
                  {
                    start: new Date("2021/06/21").getTime(),
                    end: new Date("2021/06/25").getTime(),
                  },
                  {
                    start: new Date("2021/07/02").getTime(),
                    end: new Date("2021/07/02").getTime(),
                  },
                  {
                    start: new Date("2021/07/05").getTime(),
                    end: new Date("2021/07/09").getTime(),
                  },
                  {
                    start: new Date("2021/07/12").getTime(),
                    end: new Date("2021/07/16").getTime(),
                  },
                  {
                    start: new Date("2021/07/19").getTime(),
                    end: new Date("2021/07/23").getTime(),
                  },
                  {
                    start: new Date("2021/07/26").getTime(),
                    end: new Date("2021/07/30").getTime(),
                  },
                  {
                    start: new Date("2021/08/02").getTime(),
                    end: new Date("2021/08/06").getTime(),
                  },
                  {
                    start: new Date("2021/08/09").getTime(),
                    end: new Date("2021/08/13").getTime(),
                  },
                ],
              },
              {
                title: "英语提升",
                dates: [
                  {
                    start: new Date("2021/06/21").getTime(),
                    end: new Date("2021/06/25").getTime(),
                  },
                  {
                    start: new Date("2021/07/02").getTime(),
                    end: new Date("2021/07/02").getTime(),
                  },
                  {
                    start: new Date("2021/07/05").getTime(),
                    end: new Date("2021/07/09").getTime(),
                  },
                  {
                    start: new Date("2021/07/12").getTime(),
                    end: new Date("2021/07/16").getTime(),
                  },
                  {
                    start: new Date("2021/07/19").getTime(),
                    end: new Date("2021/07/23").getTime(),
                  },
                  {
                    start: new Date("2021/07/26").getTime(),
                    end: new Date("2021/07/30").getTime(),
                  },
                  {
                    start: new Date("2021/08/02").getTime(),
                    end: new Date("2021/08/06").getTime(),
                  },
                  {
                    start: new Date("2021/08/09").getTime(),
                    end: new Date("2021/08/13").getTime(),
                  },
                ],
              },
              {
                title: "英语提升",
                dates: [
                  {
                    start: new Date("2021/06/21").getTime(),
                    end: new Date("2021/06/25").getTime(),
                  },
                  {
                    start: new Date("2021/07/02").getTime(),
                    end: new Date("2021/07/02").getTime(),
                  },
                  {
                    start: new Date("2021/07/05").getTime(),
                    end: new Date("2021/07/09").getTime(),
                  },
                  {
                    start: new Date("2021/07/12").getTime(),
                    end: new Date("2021/07/16").getTime(),
                  },
                  {
                    start: new Date("2021/07/19").getTime(),
                    end: new Date("2021/07/23").getTime(),
                  },
                  {
                    start: new Date("2021/07/26").getTime(),
                    end: new Date("2021/07/30").getTime(),
                  },
                  {
                    start: new Date("2021/08/02").getTime(),
                    end: new Date("2021/08/06").getTime(),
                  },
                  {
                    start: new Date("2021/08/09").getTime(),
                    end: new Date("2021/08/13").getTime(),
                  },
                ],
              },
              {
                title: "英语提升",
                dates: [
                  {
                    start: new Date("2021/06/21").getTime(),
                    end: new Date("2021/06/25").getTime(),
                  },
                  {
                    start: new Date("2021/07/02").getTime(),
                    end: new Date("2021/07/02").getTime(),
                  },
                  {
                    start: new Date("2021/07/05").getTime(),
                    end: new Date("2021/07/09").getTime(),
                  },
                  {
                    start: new Date("2021/07/12").getTime(),
                    end: new Date("2021/07/16").getTime(),
                  },
                  {
                    start: new Date("2021/07/19").getTime(),
                    end: new Date("2021/07/23").getTime(),
                  },
                  {
                    start: new Date("2021/07/26").getTime(),
                    end: new Date("2021/07/30").getTime(),
                  },
                  {
                    start: new Date("2021/08/02").getTime(),
                    end: new Date("2021/08/06").getTime(),
                  },
                  {
                    start: new Date("2021/08/09").getTime(),
                    end: new Date("2021/08/13").getTime(),
                  },
                ],
              },
              {
                title: "英语提升",
                dates: [
                  {
                    start: new Date("2021/06/21").getTime(),
                    end: new Date("2021/06/25").getTime(),
                  },
                  {
                    start: new Date("2021/07/02").getTime(),
                    end: new Date("2021/07/02").getTime(),
                  },
                  {
                    start: new Date("2021/07/05").getTime(),
                    end: new Date("2021/07/09").getTime(),
                  },
                  {
                    start: new Date("2021/07/12").getTime(),
                    end: new Date("2021/07/16").getTime(),
                  },
                  {
                    start: new Date("2021/07/19").getTime(),
                    end: new Date("2021/07/23").getTime(),
                  },
                  {
                    start: new Date("2021/07/26").getTime(),
                    end: new Date("2021/07/30").getTime(),
                  },
                  {
                    start: new Date("2021/08/02").getTime(),
                    end: new Date("2021/08/06").getTime(),
                  },
                  {
                    start: new Date("2021/08/09").getTime(),
                    end: new Date("2021/08/13").getTime(),
                  },
                ],
              },
            ],
          },
        },
      ],
      generating: false,
    };
  },
  computed: {
    loadFinish() {
      return (
        this.loadedProgress ==
        document.getElementsByClassName("progressItem").length
      );
    },
  },
  mounted() {
    console.log(new Date().getMonth());
    this.getCovers();
    this.headerHeight = this.$refs.header.$el.offsetHeight;
    this.footerHeight = this.$refs.footer.$el.offsetHeight;
    this.contentHeight =
      this.pageHeight - this.headerHeight - this.footerHeight;
  },
  methods: {
    setPageNum(pageIndex, bigChapterPageInfo, chapterPageInfo) {
      this.$set(this.contentInfo, pageIndex, {
        ...bigChapterPageInfo,
        data: chapterPageInfo,
      });
      console.log(pageIndex, bigChapterPageInfo);
    },
    html2Img(element) {
      return new Promise((resolve, reject) => {
        html2canvas(element, {
          allowTaint: true,
          height: element.offsetHeight,
          width: element.offsetWidth,
          scrollY: -(
            document.documentElement.scrollTop || document.body.scrollTop
          ),
          scrollX: -2,
          scale: this.quality,
        }).then((canvas) => {
          resolve(canvas);
        });
      });
    },
    async getCovers() {
      let coverDoms = document.getElementsByClassName("cover");
      for (let i = 0; i < coverDoms.length; i++) {
        await this.html2Img(coverDoms[i]).then((canvas) => {
          this.coversImg.push(canvas.toDataURL("image/jpeg"));
          this.loadedProgress++;
          console.log(`封面${i}完成`);
        });
      }
    },
    async getHeader() {
      return new Promise((resolve, reject) => {
        this.html2Img(this.$refs.header.$el).then((canvas) => {
          this.headerImg = canvas.toDataURL("image/jpeg");
          this.loadedProgress++;
          console.log(`内容页头部${this.nowPage}完成`);
          resolve(this.headerImg);
        });
      });
    },
    async getPageInfo() {
      return new Promise(async (resolve) => {
        let pageDoms = document.getElementsByClassName("page");
        // let contentHeight =
        //   this.pageHeight - this.headerHeight - this.footerHeight;
        let index = 0;
        while (index < pageDoms.length) {
          console.log("填装页面信息", this.nowPage);
          let content = pageDoms[index];
          let divide = Math.ceil(content.offsetHeight / this.contentHeight);
          let headers = [];
          let footers = [];
          this.titleIndex = index;
          let thisPageInfo = {
            titleIndex: index,
            subtitles: [],
          };
          // 等待titleIndex引发的更新渲染完毕
          await (() => {
            return new Promise((resolve, reject) => {
              this.$nextTick(async () => {
                for (let i = 0; i < divide; i++) {
                  if (i == 0) {
                    thisPageInfo.subtitles.push({
                      title: this.contentInfo[index],
                    });
                  }
                  await this.getHeader().then(async (header) => {
                    headers.push(header);
                    await this.getFooter().then((footer) => {
                      footers.push(footer);
                      this.nowPage++;
                    });
                  });
                }
                console.log("填装完毕");
                this.pageInfo.push({
                  headers,
                  footers,
                  height: content.offsetHeight,
                });
                index++;
                resolve();
              });
            });
          })();
        }
        resolve();
      });
    },
    async getFooter() {
      return new Promise((resolve, reject) => {
        this.html2Img(this.$refs.footer.$el).then((canvas) => {
          this.footerImg = canvas.toDataURL("image/jpeg");
          this.loadedProgress++;
          console.log(`内容页底部${this.nowPage}完成`);
          resolve(this.footerImg);
        });
      });
    },
    downloadPDF() {
      // if (!this.loadFinish) {
      //   alert("加载尚未完成，请稍后再试");
      //   return;
      // }
      if (this.generating) {
        this.$message.warning({ text: "稍安勿躁，报告已经在生成中" });
        return;
      }
      this.generating = true;
      this.getPageInfo().then(() => {
        this.$getPdf(
          this.$refs.pages,
          {
            quality: this.quality,
            // header: this.headerImg,
            // footer: this.footerImg,
            headerHeight: this.headerHeight,
            footerHeight: this.footerHeight,
            pageHeight: this.pageHeight,
            pageInfo: this.pageInfo,
            coverIndex: [0, document.getElementsByClassName("page").length + 1], // 从0开始，此处的序号不包含分页，只按内容页面的页数为准
            covers: this.coversImg,
          },
          "test"
        ).then((canvas) => {
          document.getElementById("canvas").appendChild(canvas);
          this.generating = false;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.ReportModule {
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 0;
  // transform: scale(2);
}
</style>