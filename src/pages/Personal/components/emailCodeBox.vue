<template>
  <transition name="slide-fade">
    <div class="EmailCodeBox" v-if="visible">
      <div class="messageBox">
        <div class="header">
          <div class="title">
            <p>{{ $t("personal.safe.emailCode.title") }}</p>
            <img src="@/assets/index/icon_close.svg" @click="closeBtn" />
          </div>
          <p class="sendTips">
            {{ $t("personal.safe.emailCode.sendTips", { email }) }}
          </p>
        </div>
        <div class="inputBox">
          <div class="inputInbox">
            <p class="label">{{ $t("personal.safe.emailCode.codeLabel") }}</p>
            <PInput
              class="input"
              :placeholder="$t('personal.safe.emailCode.codePlaceholder')"
              @input="
                (text) => {
                  code = text;
                }
              "
            />
          </div>
          <p class="errorTips" v-if="errorType != 2 && errorType != 3">
            &nbsp;
          </p>
          <p class="errorTips" v-if="errorType == 2">
            {{ $t("personal.safe.emailCode.emptyCodeTips") }}
          </p>
          <p class="errorTips" v-if="errorType == 3">
            {{ $t("personal.safe.emailCode.errorCodeTips") }}
          </p>
        </div>
        <PButton
          theme="blue"
          class="save"
          :text="$t('personal.safe.emailCode.verifyButton')"
          @btnClick="verifyCode"
        />
        <p class="resendButton" @click="resendCode">
          {{
            $t("personal.safe.emailCode.resendButton") +
            (seconds > 0 ? `(${seconds})` : "")
          }}
        </p>
      </div>
    </div>
  </transition>
</template>

<script>
import PInput from "./passwordInput";
import PButton from "@/components/common/button";
import PSelector from "@/components/common/selector";
import * as vcodeTimer from "@/utils/vcodeTimer";
export default {
  components: {
    PInput,
    PButton,
    PSelector,
  },
  props: ["visible", "email"],
  data() {
    return {
      code: "",
      errorType: 0,
    };
  },
  computed: {
    seconds() {
      return this.$store.state.global.emailVCodeSeconds;
    },
  },
  watch: {
    visible(val) {
      if (!val) {
        this.errorType = 0;
        this.code = "";
      }
    },
  },
  mounted() {
    if (!this.vcodeTimeout) this.vcodeTimeout = 0;
  },
  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },
    verifyCode() {
      if (!this.code) {
        this.errorType = 2;
        this.$message.warning({
          text: this.$t("personal.safe.emailCode.emptyCodeTips"),
        });
        return;
      }
      this.errorType = 0;
      // 请求确认验证码
      // 验证码正确 ---> 关闭窗口，重新获取个人信息
      // 验证码错误 ---> errorType=3
      this.$store
        .dispatch("user/schoolEmailBind", {
          email: this.email,
          emailCode: this.code,
        })
        .then((res) => {
          this.$message.message({
            text: this.$t("personal.safe.emailCode.verifySuccessTips"),
          });
          this.$emit("updateInfo");
          this.closeBtn();
        })
        .catch((err) => {
          this.errorType = 3;
          this.$message.error({
            text: this.$t("personal.safe.emailCode.verifyFailTips"),
          });
        });
    },
    resendCode() {
      this.$miniDialog.showDialog({
        text: this.$t("personal.safe.emailCode.ifResendTips"),
        confirm: () => {
          vcodeTimer.sendEmailVCode(
            { email: this.email, operateType: 3 },
            () => {
              this.$emit("handleNext", this.email);
            }
          );
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.EmailCodeBox {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    margin: 0;
  }
  .messageBox {
    background-color: #fff;
    border-radius: 2px;
    width: 558px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 28px;
    .header {
      display: flex;
      flex-direction: column;
      padding: 20px 20px 20px 28px;
      width: 100%;
      box-sizing: border-box;
      .title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        p {
          font-size: 18px;
          color: #333333;
          line-height: 25px;
        }
        img {
          width: 12px;
          cursor: pointer;
        }
      }
      .sendTips {
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        text-align: left;
        margin-top: 4px;
      }
    }
    .inputBox {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 0 28px;
      margin-top: 20px;
      width: 100%;
      box-sizing: border-box;
      .inputInbox {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        .label {
          width: 68px;
          text-align: left;
          font-size: 14px;
          color: #666666;
          line-height: 20px;
        }
        .input {
          // width: 100%;
          flex: 1;
        }
        .send {
          margin-left: 12px;
          min-width: 86px;
          padding: 9px 0;
          color: #666666 !important;
          p {
          }
        }
        .send--waitting {
          color: #999999 !important;
          p {
          }
        }
      }
      .errorTips {
        font-size: 12px;
        color: #db4c40;
        line-height: 17px;
        margin-top: 8px;
        margin-left: 68px;
      }
    }
    .save {
      margin-top: 36px;
    }
    .resendButton {
      margin-top: 14px;
      font-size: 14px;
      color: #999999;
      line-height: 20px;
      cursor: pointer;
    }
  }
}
</style>