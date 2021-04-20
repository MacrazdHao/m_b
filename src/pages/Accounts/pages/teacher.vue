<template>
  <div class="Teacher">
    <p class="title">{{ $t("accounts.teacher.title") }}</p>
    <div class="inputBox">
      <p class="title">{{ $t("accounts.teacher.parentsUserLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="username"
          :placeholder="$t('accounts.teacher.parentsUserPlaceholder')"
        />
      </div>
    </div>
    <div class="inputBox">
      <p class="title">{{ $t("accounts.teacher.passwordLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="password"
          :placeholder="$t('accounts.teacher.passwordPlaceholder')"
        />
      </div>
      <p class="tips">{{ $t("accounts.teacher.passwordTips") }}</p>
    </div>
    <div class="inputBox createUserBox">
      <p class="title">{{ $t("accounts.teacher.createUserLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="result"
          :placeholder="$t('accounts.teacher.createUserPlaceholder')"
          :disabled="true"
          :copy="result != ''"
          :copyTips="$t('accounts.copyAccountSuccess')"
          :copyErrTips="$t('accounts.copyAccountFail')"
        />
      </div>
    </div>
    <div class="inputBox permissionBox">
      <p class="title">{{ $t("accounts.teacher.parentsUserLabel") }}</p>
      <div class="permission">
        <PCheckbox :data="permissions" />
      </div>
    </div>
    <PButton
      theme="blue"
      class="create"
      :text="$t('accounts.teacher.createButton')"
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
      result: "123123",
      permissions: [
        {
          name: this.$t("accounts.admin.permission.student"),
          value: 0,
        },
        {
          name: this.$t("accounts.admin.permission.archives"),
          value: 1,
        },
      ],
    };
  },
  methods: {
    createParentsUser() {},
  },
};
</script>

<style lang="scss" scoped>
.Teacher {
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