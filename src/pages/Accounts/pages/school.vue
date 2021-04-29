<template>
  <div class="School">
    <p class="title">{{ $t("accounts.school.title") }}</p>
    <div class="inputBox">
      <p class="title">{{ $t("accounts.school.parentsUserLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="username"
          :placeholder="$t('accounts.school.parentsUserPlaceholder')"
        />
      </div>
    </div>
    <div class="inputBox">
      <p class="title">{{ $t("accounts.school.passwordLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="password"
          type="password"
          :placeholder="$t('accounts.school.passwordPlaceholder')"
        />
      </div>
      <p class="tips">{{ $t("accounts.school.passwordTips") }}</p>
    </div>
    <div class="inputBox">
      <p class="title">{{ $t("accounts.school.nameLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="schoolName"
          :placeholder="$t('accounts.school.namePlaceholder')"
        />
      </div>
    </div>
    <div class="inputBox createUserBox">
      <p class="title">{{ $t("accounts.school.createUserLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="result"
          :placeholder="$t('accounts.school.createUserPlaceholder')"
          :disabled="true"
          :copy="result != ''"
          :copyTips="$t('accounts.copyAccountSuccess')"
          :copyErrTips="$t('accounts.copyAccountFail')"
        />
      </div>
    </div>
    <PButton
      theme="blue"
      class="create"
      :text="$t('accounts.school.createButton')"
      @btnClick="createParentsUser"
    />
  </div>
</template>

<script>
import PButton from "@/components/common/button";
import PInput from "../components/input";
import PCheckbox from "../components/checkbox";
export default {
  components: {
    PButton,
    PInput,
    PCheckbox,
  },
  data() {
    return {
      username: "",
      password: "",
      schoolName: "",
      result: "123123",
    };
  },
  methods: {
    createParentsUser() {},
  },
};
</script>

<style lang="scss" scoped>
.School {
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
  .permissionBox {
    margin-top: 60px;
    .permission {
    }
  }
  .create {
    padding: 7px 16px;
    margin-top: 178px;
  }
}
</style>