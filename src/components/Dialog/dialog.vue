<template>
  <transition name="slide-fade">
    <div class="Dialog" v-if="visible">
      <div class="messageBox">
        <div class="header">
          <img src="@/assets/index/icon_close.svg" @click="cancelBtn" />
        </div>
        <div class="content">
          <img :src="require(`@/assets/index/icon_msg_${theme}.svg`)" />
          <p class="title" v-html="_i18n.t('global.dialog.tipsTitle')"></p>
          <div class="msg">
            <p v-for="(item, index) in text" :key="index">{{ item }}</p>
          </div>
        </div>
        <div class="buttonBox">
          <CButton
            class="button"
            :text="_i18n.t('global.dialog.cancel')"
            theme="gray"
            @btnClick="cancelBtn"
          />
          <CButton
            class="button"
            :text="_i18n.t('global.dialog.confirm')"
            :theme="theme"
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
      text: [""],
      theme: "blue",
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
.Dialog {
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
    width: 600px;
    min-height: 280px;
    padding: 20px 20px 30px 20px;
    box-sizing: border-box;
    // margin-top: calc(100vh / 3);
    .header {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      width: 100%;
      img {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
    }
    .content {
      margin-top: 18px;
      display: flex;
      flex-direction: column;
      // justify-content: center;
      align-items: center;
      width: 100%;
      img {
        width: 60px;
        height: 60px;
      }
      .title {
        margin-top: 12px;
        font-size: 16px;

        color: #333333;
        line-height: 22px;
      }
      .msg {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        p {
          font-size: 14px;
          color: #666666;
          line-height: 20px;
        }
      }
    }
    .buttonBox {
      display: flex;
      flex-direction: row;
      margin-top: 34px;
      justify-content: center;
      .button + .button {
        margin-left: 24px;
      }
    }
  }
}
</style>