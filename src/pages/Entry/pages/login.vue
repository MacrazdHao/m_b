<template>
  <div class="Login" @click="login">登陆</div>
</template>

<script>
import { redirectMixin } from "@/mixins";
export default {
  mixins: [redirectMixin],
  methods: {
    login() {
      this.$store.dispatch("user/login").then((res) => {
        if (this.redirect) {
          this.$router.push({
            path: this.redirect,
            query: this.otherQuery,
          });
        } else {
          this.$router.push({ path: "index" });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.Login {
}
</style>