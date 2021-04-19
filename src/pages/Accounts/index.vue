<template>
  <div class="Personal">
    <div class="menu">
      <div
        :class="[
          'menu-item',
          pageId == item.meta.id ? 'menu-item--active' : '',
        ]"
        v-for="(item, index) in menu"
        :key="index"
        @click="toOtherSetting(item)"
      >
        <p>{{ language == "zh" ? item.meta.title : item.meta.enTitle }}</p>
      </div>
    </div>
    <div class="content">
      <transition name="slide-fade2">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: [],
      pageId: -1,
    };
  },
  computed: {
    language() {
      return this.$store.state.global.language;
    },
  },
  mounted() {
    this.$store.state.global.menu.children.forEach((item) => {
      if (item.name == "accounts") {
        item.children.forEach((item2, index2) => {
          if (index2 == 0) return;
          this.menu.push(item2);
        });
      }
    });
    this.pageId = this.$route.meta.id;
  },
  methods: {
    toOtherSetting(route) {
      this.pageId = route.meta.id;
      this.$router.push({ path: `/index/accounts/${route.path}` });
    },
  },
};
</script>

<style lang="scss" scoped>
.Personal {
  display: flex;
  flex-direction: row;
  width: 100%;
  min-height: 673px;
  box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
  background: #fff;
  margin-bottom: 24px;
  p {
    margin: 0;
  }
  .menu {
    display: flex;
    flex-direction: column;
    width: 224px;
    padding-top: 12px;
    border-right: 1px solid #d3d3d3;
    .menu-item {
      width: 100%;
      padding-left: 24px;
      box-sizing: border-box;
      border-left: 2px solid #fff;
      margin-top: 8px;
      transition: all 0.1s;
      cursor: pointer;
      p {
        text-align: left;
        line-height: 40px;
        font-size: 14px;
        color: #666666;
      }
    }
    .menu-item:hover {
      border-left: 2px solid rgba(75, 118, 246, 0.2);
      background-color: rgba(241, 244, 255, 0.4);
      p {
        color: rgba(75, 119, 246, 0.8);
      }
    }
    .menu-item--active,
    .menu-item--active:hover {
      border-left: 2px solid rgb(75, 119, 246);
      background-color: rgb(241, 244, 255);
      p {
        color: rgb(75, 119, 246);
      }
    }
  }
  .content {
    padding: 24px 40px;
    flex: 1;
  }
}
</style>