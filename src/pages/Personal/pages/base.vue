<template>
  <div class="Base">
    <p class="title">{{ $t("personal.base.title") }}</p>
    <div class="avatarBox">
      <p class="title">{{ $t("personal.base.avatarTitle") }}</p>
      <img :src="avatar" />
      <PButton
        class="upload"
        :text="$t('personal.base.avatarButton')"
        :icon="require('@/assets/personal/icon_upload.svg')"
      />
    </div>
    <div class="inputBox">
      <p class="title">{{ $t("personal.base.nameLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="name"
          :placeholder="$t('personal.base.namePlaceholder')"
        />
      </div>
    </div>
    <div class="inputBox">
      <p class="title">{{ $t("personal.base.emailLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="email"
          :placeholder="$t('personal.base.emailPlaceholder')"
          :disabled="email !== ''"
        />
      </div>
    </div>
    <PButton
      theme="blue"
      class="save"
      :text="$t('personal.base.saveButton')"
      @btnClick="saveInfo"
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
      avatar: require("@/assets/index/anna.jpg"),
      name: "",
      email: "",
    };
  },
  methods: {
    saveInfo() {
      this.$message.message(this.$t("personal.base.saveTips"));
    },
  },
};
</script>

<style lang="scss" scoped>
.Base {
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
  .avatarBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    .title {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
    }
    img {
      width: 110px;
      height: 110px;
      border-radius: 110px;
      margin-top: 10px;
    }
    .upload {
      margin-top: 20px;
      padding: 5px 14px;
    }
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
    }
  }
  .save {
    margin-top: 90px;
  }
}
</style>