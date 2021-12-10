export default {
  provide: function () { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量
    return {
      reload: this.reload
    }
  },
  data: function () {
    return {
      isReload: true,
    }
  },
  methods: {
    reload() {
      this.isReload = false;
      this.$nextTick(() => {
        this.isReload = true;
      });
    }
  }
}