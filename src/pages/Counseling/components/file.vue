<template>
  <div class="File">
    <div class="infoBox">
      <img :src="require(`@/assets/knowledge/${svgIcon}.svg`)" />
      <div>
        <p class="name">{{ info.fileName }}</p>
        <p class="size">{{ info.fileSize }}</p>
      </div>
    </div>
    <KButton
      class="button"
      theme="blue"
      fontSize="12px"
      lineHeight="17px"
      :text="buttonText"
      @btnClick="handleClick"
    />
  </div>
</template>

<script>
import KButton from "@/components/common/button";
export default {
  props: ["info", "buttonText"],
  components: {
    KButton,
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
    div {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      padding: 6px 8px;
      width: 148px;
      box-sizing: border-box;
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