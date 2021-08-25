<template>
  <div class="Error">
    <transition name="slide-fade2">
      <router-view />
    </transition>
    <SButton
      class="button"
      :text="$t('global.goIndexButton')"
      theme="blue"
      @btnClick="goIndex"
    />
    <SButton
      class="button"
      :text="$t('home.header.logout')"
      @btnClick="logout"
    />
  </div>
</template>

<script>
import SButton from "@/components/common/button.vue";
export default {
  components: {
    SButton,
  },
  methods: {
    goIndex() {
      this.$router.push({ path: "/" });
    },
    logout() {
      this.$logoutDialog(() => {
        this.$store.dispatch("user/logout").then((res) => {
          if (res.type == 10)
            window.location.href = `${window.location.origin}/adminEntry`;
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .button {
    margin-top: 50px;
    padding: 7px 17px;
  }
  .button + .button {
    margin-top: 12px;
  }
}
</style>