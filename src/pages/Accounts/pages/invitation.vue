<template>
  <div class="Invitation">
    <p class="title">{{ $t("accounts.invitation.title") }}</p>
    <div class="codeBox">
      <p class="label">{{ $t("accounts.invitation.codeLabel") }}</p>
      <PInput
        class="input"
        :customStyle="{
          'font-size': '14px',
          'font-family': 'Roboto-Regular',
          'font-weight': '400',
          color: '#333333',
          'line-height': '16px',
          'letter-spacing': '2px',
        }"
        :value="icode"
        :disabled="true"
        :copy="icode != ''"
        :copyTips="$t('accounts.invitation.copyCodeSuccess')"
        :copyErrTips="$t('accounts.invitation.copyCodeFail')"
      />
      <p class="tips">{{ $t("accounts.invitation.codeTips") }}</p>
    </div>
    <PButton
      theme="blue"
      class="create"
      :text="$t('accounts.invitation.createButton')"
      @btnClick="createCode"
    />
  </div>
</template>

<script>
import PButton from "@/components/common/button";
import PInput from "../components/input";
export default {
  components: {
    PButton,
    PInput,
  },
  data() {
    return { icode: "" };
  },
  methods: {
    createCode() {
      this.icode = "XJREWT";
      this.$store
        .dispatch("accounts/getInviteCode")
        .then((res) => {
          this.icode = res.data.inviteCode;
          this.$message.message({
            text: this.$t("accounts.invitation.createSuccess"),
          });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("accounts.invitation.createFail"),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Invitation {
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
  .codeBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    .label {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      text-align: left;
    }
    .input {
      margin-top: 10px;
      padding: 6px 11px;
      width: 100%;
      max-width: 308px;
    }
    .tips {
      margin-top: 10px;
      font-size: 12px;
      color: #999999;
      line-height: 17px;
      text-align: left;
      width: 100%;
      max-width: 308px;
      text-align: justify;
    }
  }
  .create {
    padding: 7px 9px;
    margin-top: 90px;
  }
}
</style>