<template>
  <div class="SBase">
    <p class="title">{{ $t("personal.base.title") }}</p>
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
    <div class="inputBox">
      <p class="title">{{ $t("personal.sbase.nameLabel") }}</p>
      <div>
        <PInput
          class="input"
          :value="username"
          :placeholder="$t('personal.sbase.namePlaceholder')"
          @input="(text) => (username = text)"
        />
      </div>
    </div>
    <div class="inputBox">
      <p class="title">{{ $t("personal.sbase.accountLabel") }}</p>
      <div>
        <PInput class="input" :value="email" :disabled="true" />
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
import { getUsertype } from "@/utils/auth";
export default {
  components: {
    PButton,
    PInput,
  },
  data() {
    return {
      userId: "",
      avatarUrl: null,
      username: "",
      email: "",
    };
  },
  computed: {
    form() {
      return {
        userId: this.userId,
        avatarUrl: this.avatarUrl,
        username: this.username,
        email: this.email,
      };
    },
    avatar() {
      if (this.avatarUrl) {
        return this.$_default.ossUrl + this.avatarUrl;
      } else {
        return this.$_default.avatar;
      }
    },
  },
  mounted() {
    this.initInfo();
  },
  methods: {
    initInfo() {
      let path = (() => {
        switch (parseInt(getUsertype())) {
          // 租户（学校）
          case 1:
            return "personal/getSchoolBaseInfo";
          // 老师、学生、家长
          case 2:
          case 3:
          case 4:
            return "personal/getBaseInfo";
          // 咨询师、管理员
          case 10:
            return "";
          case 11:
            return "";
        }
      })();
      console.log(path)
      if (!this.$store.state.personal.baseInfo) {
        this.$store
          .dispatch(path)
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
      } else {
        for (let key in this.$store.state.personal.baseInfo) {
          this[key] = this.$store.state.personal.baseInfo[key];
        }
      }
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
      fd.append("file", file.files[0]);
      this.$store
        .dispatch("global/uploadUserAvatar", fd)
        .then((res) => {
          console.log(res);
          this.avatarUrl = res.data.url;
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
      let path = (() => {
        switch (parseInt(getUsertype())) {
          // 租户（学校）
          case 1:
            return "personal/saveSchoolBaseInfo";
          // 老师、学生、家长
          case 2:
          case 3:
          case 4:
            return "personal/saveBaseInfo";
          // 咨询师、管理员
          case 10:
            return "";
          case 11:
            return "";
        }
      })();
      this.$store
        .dispatch(path, this.form)
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
.SBase {
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