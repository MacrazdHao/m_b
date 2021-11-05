<template>
  <div class="Safe">
    <p class="title">{{ $t("personal.safe.title") }}</p>
    <div class="strengthBox">
      <p class="title">{{ $t("personal.safe.userTitle") }}</p>
      <div class="strength">
        <p class="tips">
          {{
            $t("personal.safe.strengthTips", {
              strength: $tc("personal.safe.strength", strengthLevel),
            })
          }}
        </p>
        <p class="edit" @click="showResetBox = true">
          {{ $t("personal.safe.editButton") }}
        </p>
      </div>
    </div>
    <div class="strengthBox" v-if="schoolAccount">
      <p class="title">{{ $t("personal.safe.emailTitle") }}</p>
      <div class="strength">
        <p class="tips">
          {{
            email
              ? $t("personal.safe.emailTips") + email
              : $t("personal.safe.noEmailTips")
          }}
        </p>
        <p class="edit" @click="editEmail">
          {{
            email
              ? $t("personal.safe.editButton")
              : $t("personal.safe.bindButton")
          }}
        </p>
      </div>
    </div>
    <ResetBox :visible.sync="showResetBox" @closeBtn="showResetBox = false" />
    <EmailBox
      v-if="schoolAccount"
      :visible.sync="showEmailBox"
      @closeBtn="showEmailBox = false"
      @handleNext="verifyEmailCode"
    />
    <BindEmailBox
      v-if="schoolAccount"
      :visible.sync="showBindEmailBox"
      @closeBtn="showBindEmailBox = false"
      @handleNext="verifyEmailCode"
    />
    <EmailCodeBox
      v-if="schoolAccount"
      :visible.sync="showEmailCodeBox"
      :email="newEmail"
      @updateInfo="updateInfo"
      @closeBtn="showEmailCodeBox = false"
    />
  </div>
</template>

<script>
import ResetBox from "../components/resetBox";
import EmailBox from "../components/emailBox";
import BindEmailBox from "../components/bindEmailBox";
import EmailCodeBox from "../components/emailCodeBox";
import { getUsertype } from "@/utils/auth";
export default {
  components: {
    ResetBox,
    EmailBox,
    BindEmailBox,
    EmailCodeBox,
  },
  data() {
    return {
      strengthLevel: 1,
      showResetBox: false,
      showEmailBox: false,
      showBindEmailBox: false,
      showEmailCodeBox: false,
      newEmail: "",
    };
  },
  computed: {
    email() {
      return this.$store.state.user.userinfo.email;
    },
    schoolAccount() {
      let userType = getUsertype();
      return userType == 1;
    },
  },
  watch: {
    showEmailCodeBox(val) {
      if (!val) {
        this.newEmail = "";
      }
    },
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    initInfo() {
      if (!this.$store.state.personal.securityInfo) {
        this.$store
          .dispatch(
            this.schoolAccount
              ? "personal/getSchoolSecurityInfo"
              : "personal/getSecurityInfo"
          )
          .then((res) => {
            this.strengthLevel = res.data.passwordStrength + 1;
          })
          .catch((err) => {
            this.$message.error({
              text: this.$t("personal.base.failTips.getBaseInfoFail"),
            });
          });
      } else {
        for (let key in this.$store.state.personal.securityInfo) {
          this[key] = this.$store.state.personal.securityInfo[key] + 1;
        }
      }
    },
    editEmail() {
      if (this.email) this.showEmailBox = true;
      else this.showBindEmailBox = true;
    },
    verifyEmailCode(email) {
      this.newEmail = email;
      this.showEmailBox = false;
      this.showBindEmailBox = false;
      this.showEmailCodeBox = true;
    },
    updateInfo() {
      this.$store
        .dispatch("user/getUserinfo")
        .then((res) => {
          this.$message.message({
            text: this.$t("personal.safe.updateUserinfoSuccessTips"),
          });
          this.$store
            .dispatch(
              this.schoolAccount
                ? "personal/getSchoolSecurityInfo"
                : "personal/getSecurityInfo"
            )
            .then((res) => {
              this.strengthLevel = res.data.passwordStrength + 1;
            })
            .catch((err) => {
              this.$message.error({
                text: this.$t("personal.base.failTips.getBaseInfoFail"),
              });
            });
        })
        .catch((err) => {
          this.$message.message({
            text: this.$t("personal.safe.updateUserinfoFailTips"),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Safe {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  p {
    margin: 0;
  }
  .title {
    font-size: 20px;
    color: #333333;
    line-height: 27px;
  }
  .strengthBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    width: 100%;
    .title {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
    }
    .strength {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 14px;
      width: 100%;
      min-width: 200px;
      max-width: 540px;
      border-bottom: 1px solid #d3d3d3;
      .tips {
        font-size: 14px;
        color: #999999;
        line-height: 20px;
      }
      .edit {
        font-size: 14px;
        color: #4b77f6;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>