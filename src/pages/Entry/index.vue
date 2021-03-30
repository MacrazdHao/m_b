<template>
  <div class="LoginApp">
    登入页面
    <p @click="toLogin">登陆</p>
    <p @click="toRegister">注册</p>
    <p @click="toForget">忘记</p>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    toLogin() {
      this.$router.push({ path: "/" });
    },
    toRegister() {
      this.$router.push({ path: "register" });
    },
    toForget() {
      this.$router.push({ path: "forget" });
    },
  },
};
</script>

<style lang="scss" scoped>
.LoginApp {
}
</style>