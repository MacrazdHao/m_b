<template>
  <transition name="slide-fade">
    <div class="EditBox" v-if="visible">
      <div class="dialogBox">
        <div class="header">
          <p>{{ $t("accounts.accountlist.editBox.title") }}</p>
          <img src="@/assets/index/icon_close.svg" @click="closeBtn" />
        </div>
        <div class="content">
          <div class="item account">
            <p class="label">
              {{ $t("accounts.accountlist.editBox.accountLabel") }}：
            </p>
            <p class="username">{{ data.account || "unkown account" }}</p>
          </div>
          <div class="item password">
            <p class="label">
              {{ $t("accounts.accountlist.editBox.passwordLabel") }}：
            </p>
            <div>
              <PInput
                class="input"
                :value.sync="password"
                :disabled="!editable"
                :placeholder="
                  $t('accounts.accountlist.editBox.passwordPlaceholder')
                "
                @input="
                  (text) => {
                    password = text;
                  }
                "
              />
              <p class="tips">
                {{ $t("accounts.accountlist.editBox.passwordTips") }}
              </p>
            </div>
            <p class="editButton" @click="editPassword">
              {{ $t("accounts.accountlist.editBox.editButton") }}
            </p>
          </div>
        </div>
        <div class="buttonBox">
          <PButton
            class="button"
            :text="$t('accounts.accountlist.editBox.cancelButton')"
            @btnClick="closeBtn"
          />
          <PButton
            theme="blue"
            class="button"
            :text="$t('accounts.accountlist.editBox.confirmButton')"
            @btnClick="saveInfo"
          />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import PInput from "../components/input";
import PButton from "@/components/common/button";
export default {
  components: {
    PInput,
    PButton,
  },
  props: ["visible", "data"],
  data() {
    return {
      editable: false,
      password: "********",
      editUrl: "",
    };
  },
  watch: {
    $route(next) {
      this.initEditUrl();
    },
  },
  mounted() {
    this.initEditUrl();
  },
  methods: {
    initEditUrl() {
      switch (this.$route.meta.type) {
        case "admin":
          this.editUrl = "accounts/editAdminPassword";
          break;
        case "school":
          this.editUrl = "accounts/editSchoolPassword";
          break;
        default:
          this.editUrl = "accounts/editSchoolPassword";
          break;
      }
    },
    closeBtn() {
      this.$emit("closeBtn");
    },
    saveInfo() {
      this.$store
        .dispatch(this.editUrl, {
          userId: this.data.userId,
          password: this.password,
        })
        .then((res) => {
          this.$message.message(
            this.$t("accounts.accountlist.successTips.editSuccess")
          );
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(this.$t("accounts.accountlist.errorTips.nolist"));
        });
      this.closeBtn();
    },
    editPassword() {
      this.password = "";
      this.editable = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.EditBox {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  p {
    margin: 0;
  }
  .dialogBox {
    width: 570px;
    height: 420px;
    background: #ffffff;
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px 15px 30px;
      background: #fafbfc;
      border-bottom: 1px solid #d3d3d3;
      p {
        font-size: 16px;
        color: #333333;
        line-height: 22px;
      }
      img {
        width: 12px;
        cursor: pointer;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      padding-top: 66px;
      padding-bottom: 94px;
      border-bottom: 1px solid #d3d3d3;
      .item + .item {
        margin-top: 30px;
      }
      .item {
        display: flex;
        flex-direction: row;
        padding-left: 30px;
        align-items: flex-start;
        .label {
          margin-right: 20px;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          height: 36px;
          line-height: 36px;
        }
        .username {
          border-radius: 2px;
          border: 1px solid #d9d9d9;
          padding: 7px 11px;
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          width: 350px;
          box-sizing: border-box;
          text-align: left;
        }
        .input {
          padding: 6px 11px;
          width: 350px;
        }
        .editButton {
          cursor: pointer;
          font-size: 16px;
          color: #4b77f6;
          line-height: 36px;
          margin-left: 30px;
        }
      }
      .tips {
        margin-top: 10px;
        font-size: 12px;
        color: #db4c40;
        width: 350px;
        text-align: left;
      }
    }
    .buttonBox {
      width: 100%;
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .button + .button {
        margin-left: 80px;
      }
    }
  }
}
</style>