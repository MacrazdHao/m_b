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
              :value="nickName"
              :placeholder="$t('personal.cbase.namePlaceholder')"
              @input="
                (text) => {
                  nickName = text;
                }
              "
            />
          </div>
        </div>
        <div class="inputBox">
          <p class="title">{{ $t("personal.cbase.countryLabel") }}</p>
          <div>
            <PInput
              class="input"
              :value="nation"
              :placeholder="$t('personal.cbase.countryPlaceholder')"
              @input="
                (text) => {
                  nation = text;
                }
              "
            />
          </div>
        </div>
        <div class="inputBox">
          <p class="title">{{ $t("personal.cbase.educationLabel") }}</p>
          <div>
            <PInput
              class="input"
              :value="background"
              :placeholder="$t('personal.cbase.educationPlaceholder')"
              @input="
                (text) => {
                  background = text;
                }
              "
            />
          </div>
        </div>
        <div class="inputBox">
          <p class="title">{{ $t("personal.cbase.accountLabel") }}</p>
          <div>
            <PInput class="input" :value="email" :disabled="email !== ''" />
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
          @btnClick="uploadAvatar"
        />
      </div>
    </div>
    <PButton
      theme="blue"
      class="save"
      :text="$t('personal.base.saveButton')"
      @btnClick="saveInfo"
    />
    <input
      ref="imupload"
      type="file"
      @change="uploadFile"
      v-show="false"
      accept=".png,.jpg"
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
      nation: "",
      background: "",
      userId: "",
      avatarUrl: null,
      username: "",
      nickName: "",
      email: "",
    };
  },
  computed: {
    avatar() {
      if (this.avatarUrl) {
        return this.$_default.ossUrl + this.avatarUrl;
      } else {
        return this.$_default.avatar;
      }
    },
    form() {
      return {
        userId: this.userId,
        avatarUrl: this.avatarUrl,
        username: this.username,
        nickName: this.nickName,
        email: this.email,
        nation: this.nation,
        background: this.background,
      };
    },
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    initInfo() {
      // if (!this.$store.state.personal.baseInfo) {
      this.$store
        .dispatch("personal/getConsultantBaseInfo")
        .then((res) => {
          for (let key in res.data) {
            this[key] = res.data[key];
          }
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("personal.base.failTips.getBaseInfoFail"),
          });
        });
      // } else {
      //   for (let key in this.$store.state.personal.baseInfo) {
      //     this[key] = this.$store.state.personal.baseInfo[key];
      //   }
      // }
    },
    uploadAvatar() {
      this.$refs.imupload.click();
    },
    uploadFile(e) {
      let file = e.target;
      if (!file || file.files.length == 0) return;
      if (
        (file.files[0].size > 20 * 1024 * 1024 && this.uploadType == "file") ||
        (file.files[0].size > 5 * 1024 * 1024 && this.uploadType == "picture")
      ) {
        this.$message.warning({
          text: this.$t("personal.base.failTips.uploadBig"),
        });
        return;
      }
      this.uploading = true;
      let reader = new FileReader();
      reader.readAsDataURL(file.files[0]);

      let fileName = file.files[0].name;
      let fileType = fileName.substring(
        fileName.lastIndexOf(".") + 1,
        fileName.length
      );
      if (fileType != "png" && fileType != "jpg") {
        this.$message.warning({
          text: this.$t("personal.base.failTips.uploadType"),
        });
        return;
      }
      if (!file.files || !file.files[0]) {
        return;
      }
      let fd = new FormData();
      fd.append("avatarImg", file.files[0]);
      this.$store
        .dispatch("global/uploadUserAvatar", fd)
        .then((res) => {
          console.log(res);
          this.avatarUrl = res.data.avatarUrl;
          this.$message.message({
            text: this.$t("personal.base.successTips.uploadSuccess"),
          });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("personal.base.failTips.uploadFail"),
          });
        });
    },
    saveInfo() {
      this.$store
        .dispatch("personal/saveConsultantBaseInfo", this.form)
        .then((res) => {
          this.$message.message({
            text: this.$t("personal.base.successTips.saveBaseInfoSuccess"),
          });
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("personal.base.failTips.saveBaseInfoFail"),
          });
        });
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