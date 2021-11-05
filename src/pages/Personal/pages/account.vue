<template>
  <div class="Account">
    <p class="title">{{ $t("personal.account.title") }}</p>
    <div class="inputBox">
      <p class="title">{{ $t("personal.account.parentsUserLabel") }}</p>
      <div>
        <PInput
          class="input"
          :disabled="hasParentAccount"
          :value="parentAccount"
          :placeholder="$t('personal.account.parentsUserPlaceholder')"
          @input="(text) => (parentAccount = text)"
        />
        <p>@myfellas.com</p>
      </div>
    </div>
    <div class="inputBox">
      <p class="title">{{ $t("personal.account.passwordLabel") }}</p>
      <div>
        <PInput
          class="input"
          :disabled="hasParentAccount"
          :value="parentPassword"
          :placeholder="$t('personal.account.passwordPlaceholder')"
          @input="(text) => (parentPassword = text)"
        />
      </div>
      <p class="tips">{{ $t("personal.account.passwordTips") }}</p>
    </div>
    <div class="inputBox createUserBox">
      <p class="title">{{ $t("personal.account.createUserLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="result"
          :placeholder="$t('personal.account.createUserPlaceholder')"
          :disabled="true"
        />
        <!-- <p class="delete" v-if="result != ''">
          {{ $t("personal.account.deleteButton") }}
        </p> -->
      </div>
      <p class="tips" v-show="result != ''">
        {{ $t("personal.account.createUserTips") }}
      </p>
    </div>
    <PButton
      theme="blue"
      class="create"
      :text="$t('personal.account.createButton')"
      @btnClick="createParentsUser"
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
    return {
      hasParentAccount: false,
      parentAccount: "",
      parentPassword: "",
      studentId: "",
      result: "",
    };
  },
  computed: {
    form() {
      return {
        parentAccount: this.parentAccount,
        parentPassword: this.parentPassword,
        studentId: this.studentId,
        result: this.result,
      };
    },
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    initInfo() {
      if (!this.$store.state.personal.accountInfo) {
        this.$store
          .dispatch("personal/getAccountInfo")
          .then((res) => {
            for (let key in res.data) {
              this[key] = res.data[key];
            }
            if (res.data.parentAccount) {
              this.hasParentAccount = true;
              this.result = `${this.parentAccount}@myfellas.com`;
            }
          })
          .catch((err) => {
            this.$message.error({
              text: this.$t("personal.account.getAccountInfoFail"),
            });
          });
      } else {
        for (let key in this.$store.state.personal.accountInfo) {
          this[key] = this.$store.state.personal.accountInfo[key];
        }
      }
    },
    createParentsUser() {
      this.$store
        .dispatch("personal/saveAccountInfo", this.form)
        .then((res) => {
          this.result = `${this.parentAccount}@myfellas.com`;
          this.$message.message({
            text: this.$t("personal.account.createAccountSuccess"),
          });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("personal.account.createAccountFail"),
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.Account {
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
  .inputBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    width: 100%;
    .title {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      margin-bottom: 10px;
    }
    div {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .input {
        // width: 27.5%;
        max-width: 308px;
        flex: 1;
      }
      p {
        margin-left: 12px;
        font-size: 14px;
        color: #333333;
        line-height: 20px;
      }
      .delete {
        font-size: 14px;
        color: #db4c40;
        line-height: 20px;
        cursor: pointer;
      }
    }
    .tips {
      margin-top: 10px;
      font-size: 12px;
      color: #db4c40;
      line-height: 17px;
      text-align: left;
      max-width: 308px;
      flex: 1;
    }
  }
  .createUserBox {
    margin-top: 60px;
  }
  .create {
    padding: 7px 16px;
    margin-top: 119px;
  }
}
</style>