export default {
  beforeRouteEnter(to, from, next) {
    console.log(to, from);
    next((vm) => {
      console.log(vm.$router)
      if (from.path == "/" || to.params.noPrev) vm.noHistory = true;
    });
  },
  methods: {
    goBack(options) {
      options = {
        force: false,
        query: {},
        params: {},
        index: 0,
        // otherPath: null,
        otherName: null,
        ...options,
      }
      // let path = options.otherPath || ("/index" + (this.$route.meta.defaultPrevPath ? this.$route.meta.defaultPrevPath[options.index] : ''));
      let name = options.otherName || (this.$route.meta.defaultPrevName ? this.$route.meta.defaultPrevName[options.index] : 'index');
      if (this.noHistory || options.force) {
        this.$router.push({
          name, query: options.query, params: { ...options.params, noPrev: true },
        });
      } else {
        this.$router.go(-1);
      }
    }
  }
}