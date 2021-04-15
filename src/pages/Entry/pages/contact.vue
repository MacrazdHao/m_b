<template>
  <div class="Contact">
    <div class="titleBox">
      <img src="@/assets/entry/icon_back.svg" @click="goback" />
      <p class="title">{{ $t("entry.reset.resetTitle") }}</p>
      <div class="white"></div>
    </div>
    <div class="contactTips">
      <p>{{ $t("entry.reset.school.contactTips") }}</p>
      <p>{{ $t("entry.reset.school.contactTips2") }}</p>
    </div>
    <entryInput
      class="username"
      @input="
        (val) => {
          username = val;
        }
      "
      :placeholder="$t(`entry.reset.school.usernamePlaceholder`)"
    />
    <entry-button
      class="reset"
      :title="$t('entry.reset.resetButton')"
      @click="submit"
    />
  </div>
</template>

<script>
import { entryRedirectMixin } from "@/mixins";
import entryInput from "../components/input";
import entryButton from "../components/button";
export default {
  mixins: [entryRedirectMixin],
  props: ["identity"],
  components: {
    entryInput,
    entryButton,
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    submit() {
      if (this.username == "") {
        this.$message.warning(
          this.$t("entry.reset.alertTips.usernameEmptyTips")
        );
        return;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Contact {
  width: 100%;
  box-sizing: border-box;
  padding-left: 3.125vw;
  padding-right: 3.125vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  p {
    margin: 0;
  }
  .titleBox {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 5.833vw;
    .title {
      font-size: 1.5625vw;
      font-family: AlibabaPuHuiTiM;
      color: #013047;
    }
    img,
    .white {
      width: 1.25vw;
    }
    img {
      cursor: pointer;
    }
  }
  .contactTips {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 1.042vw;
    width: 100%;
    p {
      color: #999999;
      font-size: 0.7292vw;
      text-align: left;
    }
  }
  .username {
    margin-top: 1.042vw;
  }
  .reset {
    margin-top: 8.958vw;
  }
}
</style>