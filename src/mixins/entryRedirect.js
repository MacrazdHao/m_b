export default {
  watch: {
    identity() {
      this.$router.push({ path: "/" });
    },
  },
  mounted() {
    console.log(this.$route)
    if (this.identity == 0 && this.$route.path !== '/login' && this.$route.path !== '/forget' && this.$route.path !== '/reset' && this.$route.path !== '/contact') this.$router.push({ path: "/" });
  },
}