<template>
  <transition name="slide-fade">
    <div class="LogoutDialog" v-if="visible">
      <div class="messageBox">
        <div class="titleBox">
          <p class="icon">?</p>
          <p class="title">{{ $t("global.logout.title") }}</p>
        </div>
        <p class="content">{{ $t("global.logout.content") }}</p>
        <div class="buttonBox">
          <CButton
            class="button"
            :text="_i18n.t('global.logout.cancel')"
            theme="gray"
            @btnClick="cancelBtn"
          />
          <CButton
            class="button"
            :text="_i18n.t('global.logout.confirm')"
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
  // props: ["theme", "text", "showDialog"],
  components: {
    CButton,
  },
  data() {
    return {
      confirm: () => {},
      cancel: () => {},
      visible: false,
    };
  },
  computed: {
    _i18n() {
      return i18n;
    },
  },
  watch: {
    visible(val) {
      if (val) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    },
  },
  methods: {
    confirmBtn() {
      this.confirm();
      this.visible = false;
    },
    cancelBtn() {
      this.cancel();
      this.visible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.LogoutDialog {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  // align-items: center;
  p {
    margin: 0;
  }
  .messageBox {
    background-color: #fff;
    border-radius: 4px;
    width: 420px;
    height: 180px;
    // padding: 20px 20px 30px 20px;
    padding-top: 30px;
    padding-bottom: 18px;
    margin-top: 84px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    .titleBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon {
        font-size: 16px;
        color: #ffffff;
        line-height: 24px;
        width: 24px;
        height: 24px;
        background: #ffbe3d;
        border-radius: 24px;
        text-align: center;
      }
      .title {
        margin-left: 14px;
        font-size: 16px;
        color: #333333;
        line-height: 22px;
      }
    }
    .content {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      margin-top: 12px;
    }
    .buttonBox {
      margin-top: 44px;
      display: flex;
      flex-direction: row;
      .button {
        padding: 5px 21px;
      }
      .button+.button {
        margin-left: 40px;
      }
    }
  }
}
</style>