<template>
  <div class="File">
    <div class="infoBox">
      <img :src="require(`@/assets/knowledge/${svgIcon}.svg`)" />
      <div class="detail">
        <p class="name">{{ info.fileName }}</p>
        <p class="size" v-if="info.fileSize || info.fileSize === 0">
          {{ info.fileSize }}
        </p>
        <Progress
          class="progress"
          v-show="
            info.uploadProgress &&
            info.uploadProgress >= 0 &&
            info.uploadProgress < 100
          "
          :width="132"
          :progress="info.uploadProgress"
          :error="info.uploadError"
        />
      </div>
    </div>
    <KButton
      class="button"
      theme="blue"
      fontSize="12px"
      lineHeight="17px"
      :text="buttonText"
      v-if="!hideButton"
      :disable="disableButton"
      @btnClick="handleClick"
    />
  </div>
</template>

<script>
import KButton from "@/components/common/button";
import Progress from "@/components/common/progress";
export default {
  props: ["info", "hideButton", "buttonText", "disableButton"],
  components: {
    KButton,
    Progress,
  },
  computed: {
    svgIcon() {
      switch (this.info.fileType) {
        case "pdf":
          return "icon_pdf";
        case "doc":
          return "icon_word";
        case "docx":
          return "icon_word";
        case "xls":
          return "icon_excel";
        case "xlsx":
          return "icon_excel";
        case "ppt":
          return "icon_ppt";
        case "pptx":
          return "icon_ppt";
        default:
          return "icon_unknow";
      }
    },
  },
  methods: {
    handleClick() {
      this.$emit("btnClick", this.info);
    },
  },
};
</script>

<style lang="scss" scoped>
.File {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #f6f8fa;
  border-radius: 4px;
  padding-right: 10px;
  p {
    margin: 0;
  }
  .infoBox {
    display: flex;
    flex-direction: row;
    img {
      width: 48px;
    }
    .detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 6px 8px;
      width: 148px;
      box-sizing: border-box;
      position: relative;
      .name {
        font-size: 12px;
        color: #333333;
        line-height: 17px;
        text-align: left;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
      .size {
        margin-top: 2px;
        font-size: 12px;
        color: #999999;
        line-height: 17px;
      }
      .progress {
        position: absolute;
        bottom: 6px;
        left: 8px;
        z-index: 10;
      }
    }
  }
  .button {
    padding: 2px 12px;
    // margin-left: 32px;
    // font-size: 12px !important;
    // line-height: 17px !important;
  }
}
</style>