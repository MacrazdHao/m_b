<template>
  <transition name="slide-fade">
    <div class="CustomDialog" v-if="show">
      <div class="messageBox">
        <div class="header">
          <p class="title">{{ title }}</p>
          <img
            class="closeBtn"
            src="@/assets/index/icon_close.svg"
            @click="closeBtn"
          />
        </div>
        <div class="content">
          <slot></slot>
        </div>
        <div class="buttonBox">
          <CButton
            class="button"
            v-if="!hideCancel"
            :text="cancelText || _i18n.t('global.dialog.cancel')"
            theme="white"
            @btnClick="closeBtn"
          />
          <CButton
            class="button"
            v-if="!hideConfirm"
            :text="confirmText || _i18n.t('global.dialog.confirm')"
            theme="blue"
            @btnClick="confirmBtn"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import CButton from "@/components/common/button.vue";
import i18n from "@/utils/language";
export default {
  props: [
    "visible",
    "title",
    "cancelText",
    "confirmText",
    "hideConfirm",
    "hideCancel",
  ],
  components: {
    CButton,
  },
  data() {
    return {
      _i18n: i18n,
      show: this.visible,
    };
  },
  computed: {
    // _i18n() {
    //   return i18n;
    // },
  },
  watch: {
    visible(val) {
      this.show = val;
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  mounted() {
    // window.addEventListener("popstate", () => {
    //   this.visible = false;
    // });
  },
  methods: {
    closeBtn() {
      this.$emit("cancel");
      // this.show = false;
    },
    confirmBtn() {
      this.$emit("confirm");
      // this.show = false;
    },
    cancelBtn() {
      this.$emit("cancel");
      // this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.CustomDialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  p {
    margin: 0;
  }
  .messageBox {
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    // margin-top: calc(100vh / 3);
    max-height: calc(100vh - 100px);
    .header {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      border-bottom: 1px solid #d3d3d3;
      background-color: #fafbfc;
      .title {
        font-size: 16px;
        color: #333333;
        line-height: 22px;
        min-height: 22px;
      }
      .closeBtn {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
    }
    .content {
      padding: 32px 32px 65px 32px;
      box-sizing: border-box;
      height: calc(100% - 200px);
      overflow: auto;
    }
    .buttonBox {
      display: flex;
      flex-direction: row;
      border-top: 1px solid #d3d3d3;
      justify-content: center;
      padding: 12px 12px;
      .button + .button {
        margin-left: 80px;
      }
    }
  }
}
</style>