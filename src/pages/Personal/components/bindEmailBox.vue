<template>
  <transition name="slide-fade">
    <div class="BindPhoneBox" v-if="visible">
      <div class="messageBox">
        <div class="header">
          <p>{{ $t("personal.safe.bindEmail.title") }}</p>
          <img src="@/assets/index/icon_close.svg" @click="closeBtn" />
        </div>
        <div class="inputBox">
          <div class="inputInbox">
            <p class="label">{{ $t("personal.safe.bindEmail.newLabel") }}</p>
            <PInput
              class="input"
              :placeholder="$t('personal.safe.bindEmail.newPlaceholder')"
              @input="
                (text) => {
                  email = text;
                }
              "
            />
          </div>
          <p class="errorTips" v-if="errorType != 3 && errorType != 4">
            &nbsp;
          </p>
          <p class="errorTips" v-if="errorType == 3">
            {{ $t("personal.safe.bindEmail.emptyNewEmailTips") }}
          </p>
          <p class="errorTips" v-if="errorType == 4">
            {{ $t("personal.safe.bindEmail.errorNewEmailTips") }}
          </p>
        </div>
        <PButton
          theme="blue"
          class="save"
          :text="$t('personal.safe.bindEmail.nextButton')"
          @btnClick="nextStep"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import PInput from "./passwordInput";
import PButton from "@/components/common/button";
import PSelector from "@/components/common/selector";
import { checkEmail } from "@/utils/regExp";
import * as vcodeTimer from "@/utils/vcodeTimer";
export default {
  components: {
    PInput,
    PButton,
    PSelector,
  },
  props: ["visible"],
  data() {
    return {
      email: "",
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
        this.email = "";
      }
    },
  },
  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },
    nextStep() {
      if (!this.email) {
        this.errorType = 3;
        this.$message.warning({
          text: this.$t("personal.safe.email.emptyNewEmailTips"),
        });
        return;
      } else if (!checkEmail(this.email)) {
        this.errorType = 4;
        this.$message.warning({
          text: this.$t("personal.safe.email.errorNewEmailTips"),
        });
        return;
      }
      this.errorType = 0;
      vcodeTimer.sendEmailVCode({ email: this.email, operateType: 3 }, () => {
        this.$emit("handleNext", this.email);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.BindPhoneBox {
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
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px 20px 28px;
      width: 100%;
      box-sizing: border-box;
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
  }
}
</style>