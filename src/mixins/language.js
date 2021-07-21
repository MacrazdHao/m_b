export default {
  data() {
    return {
      language: this.$i18n.locale,
    }
  },
  watch: {
    language: {
      handler: function (val) {
        try {
          // console.log(val);
          this.$i18n.locale = val;
          console.log(this.$i18n.locale)
          this.$store.dispatch('global/setLanguage', val);
          document.title = this.$t('global.title');
          this.languageChangeCallback();
        } catch (e) {
          // 页面languageChangeCallback未定义
        }
      },
      deep: true
    }
  }
}