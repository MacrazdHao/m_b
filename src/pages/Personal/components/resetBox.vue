<template>
  <transition name="slide-fade">
    <div class="ResetBox" v-if="visible">
      <div class="messageBox">
        <div class="header">
          <p>{{ $t("personal.safe.reset.title") }}</p>
          <img src="@/assets/index/icon_close.svg" @click="closeBtn" />
        </div>
        <div class="inputBox">
          <div class="inputInbox">
            <p class="label">{{ $t("personal.safe.reset.oldLabel") }}</p>
            <PInput
              class="input"
              :placeholder="$t('personal.safe.reset.oldPlaceholder')"
              :passwordMode="true"
              :viewer="true"
              @input="
                (text) => {
                  oldPassword = text;
                }
              "
            />
          </div>
          <p class="errorTips" v-if="errorType != 1">&nbsp;</p>
          <p class="errorTips" v-if="errorType == 1">
            {{ $t("personal.safe.reset.oldErrorTips") }}
          </p>
        </div>
        <div class="inputBox">
          <div class="inputInbox">
            <p class="label">{{ $t("personal.safe.reset.newLabel") }}</p>
            <PInput
              class="input"
              :placeholder="$t('personal.safe.reset.newPlaceholder')"
              :passwordMode="true"
              :viewer="true"
              @input="
                (text) => {
                  newPassword = text;
                }
              "
            />
          </div>
        </div>
        <div class="inputBox">
          <div class="inputInbox">
            <p class="label">{{ $t("personal.safe.reset.confirmLabel") }}</p>
            <PInput
              class="input"
              :placeholder="$t('personal.safe.reset.confirmPlaceholder')"
              :passwordMode="true"
              :viewer="true"
              @input="
                (text) => {
                  newPassword2 = text;
                }
              "
            />
          </div>
          <p class="errorTips" v-if="errorType <= 0">&nbsp;</p>
          <p class="errorTips" v-if="errorType == 1">
            {{ $t("personal.safe.reset.emptyOldPasswordTips") }}
          </p>
          <p class="errorTips" v-if="errorType == 2">
            {{ $t("personal.safe.reset.emptyNewPasswordTips") }}
          </p>
          <p class="errorTips" v-if="errorType == 3">
            {{ $t("personal.safe.reset.emptyNewPassword2Tips") }}
          </p>
          <p class="errorTips" v-if="errorType == 4">
            {{ $t("personal.safe.reset.confirmErrorTips") }}
          </p>
          <p class="errorTips" v-if="errorType == 5">
            {{ $t("personal.safe.reset.sameErrorTips") }}
          </p>
        </div>
        <PButton
          theme="blue"
          class="save"
          :text="$t('personal.safe.reset.saveButton')"
          @btnClick="saveInfo"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import PInput from "../components/passwordInput";
import PButton from "@/components/common/button";
import { getUsertype } from "@/utils/auth";
export default {
  components: {
    PInput,
    PButton,
  },
  props: ["visible"],
  data() {
    return {
      // visible: false,
      errorType: 0,
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      resetUrl: "",
    };
  },
  mounted() {
    console.log(typeof getUsertype());
    switch (getUsertype()) {
      case "1":
        this.resetUrl = "user/resetSchoolPassword";
      case "10":
        this.resetUrl = "user/resetAdminPassword";
        break;
      default:
        break;
    }
  },
  methods: {
    closeBtn() {
      this.$emit("closeBtn");
    },
    saveInfo() {
      console.log(this.oldPassword, this.newPassword, this.newPassword2);
      if (this.oldPassword == "") {
        this.errorType = 1;
        this.$message.warning({
          text: this.$t("personal.safe.reset.emptyOldPasswordTips"),
        });
        return;
      }
      if (!this.newPassword) {
        this.errorType = 2;
        this.$message.warning({
          text: this.$t("personal.safe.reset.emptyNewPasswordTips"),
        });
        return;
      }
      if (!this.newPassword2) {
        this.errorType = 3;
        this.$message.warning({
          text: this.$t("personal.safe.reset.emptyNewPassword2Tips"),
        });
        return;
      }
      if (this.newPassword != this.newPassword2) {
        this.errorType = 4;
        this.$message.warning({
          text: this.$t("personal.safe.reset.confirmErrorTips"),
        });
        return;
      }
      if (this.newPassword == this.oldPassword) {
        this.errorType = 5;
        this.$message.warning({
          text: this.$t("personal.safe.reset.sameErrorTips"),
        });
        return;
      }
      this.errorType = 0;
      console.log(this.resetUrl);
      this.$store
        .dispatch(this.resetUrl, {
          oldPassword: this.oldPassword,
          password: this.newPassword,
        })
        .then((res) => {
          this.$message.message({
            text: this.$t("personal.safe.reset.resetSuccessTips"),
          });
          this.closeBtn();
        })
        .catch((err) => {
          console.log(err);
          this.$message.error({
            text: err || this.$t("personal.safe.reset.resetFailTips"),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.ResetBox {
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
      margin-top: 57px;
    }
  }
}
</style>