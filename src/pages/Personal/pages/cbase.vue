<template>
  <div class="CBase">
    <p class="title">{{ $t("personal.base.title") }}</p>
    <div class="content">
      <div class="infoBox">
        <div class="inputBox">
          <p class="title">{{ $t("personal.cbase.nameLabel") }}</p>
          <div>
            <PInput
              class="input"
              :value="name"
              :placeholder="$t('personal.cbase.namePlaceholder')"
            />
          </div>
        </div>
        <div class="inputBox">
          <p class="title">{{ $t("personal.cbase.countryLabel") }}</p>
          <div>
            <PInput
              class="input"
              :value="country"
              :placeholder="$t('personal.cbase.countryPlaceholder')"
            />
          </div>
        </div>
        <div class="inputBox">
          <p class="title">{{ $t("personal.cbase.educationLabel") }}</p>
          <div>
            <PInput
              class="input"
              :value="education"
              :placeholder="$t('personal.cbase.educationPlaceholder')"
            />
          </div>
        </div>
        <div class="inputBox">
          <p class="title">{{ $t("personal.cbase.accountLabel") }}</p>
          <div>
            <PInput class="input" :value="account" :disabled="account !== ''" />
          </div>
        </div>
      </div>
      <div class="avatarBox">
        <p class="title">{{ $t("personal.base.avatarTitle") }}</p>
        <img :src="avatar" />
        <PButton
          class="upload"
          :text="$t('personal.base.avatarButton')"
          :icon="require('@/assets/personal/icon_upload.svg')"
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
      avatar: this.$_default.avatar,
      name: "Lucas Hines",
      country: "",
      education: "",
      account: "Lucas Hines@myfellas.com",
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
.CBase {
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
  .content {
    width: 100%;
    max-width: 618px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .infoBox {
      display: flex;
      flex-direction: column;
      flex: 1;
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
    }
    .avatarBox {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      margin-top: 30px;
      margin-left: 30px;
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
  }
  .save {
    margin-top: 90px;
  }
}
</style>