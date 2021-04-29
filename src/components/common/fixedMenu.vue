<template>
  <div class="FixedMenu" @mouseleave="closeMenu">
    <div class="titleBox" @click="toggleMenu">
      <p class="title">{{ text }}</p>
      <img
        class="pull"
        v-if="showIcon"
        src="@/assets/index/icon_pull_blue.svg"
      />
    </div>
    <div
      class="coverBox"
      :style="{ height: showMenu ? 34 * this.menu.length + 20 + 'px' : '0' }"
    >
      <div class="menuBox" :id="menuId" v-if="showMenu">
        <div
          class="menu-item"
          v-for="(item, index) in menu"
          :key="index"
          @click="item.callback(extra)"
        >
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuId: {
      type: String,
      required: true,
    },
    text: {
      default: "",
      type: String,
    },
    menu: {
      defaultStatus: [],
      type: Array,
      /*
        {
          text: String,
          callback: (extra)=>{}
        }
      */
    },
    extra: {
      default: null,
    },
    showIcon: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  mounted() {
    // console.log(this.extra);
  },
  methods: {
    toggleMenu() {
      if (this.showMenu) this.closeMenu();
      else this.openMenu();
    },
    openMenu() {
      if (this.showMenu) return;
      this.showMenu = true;
      setTimeout(() => {
        this.menuAnimate(document.getElementById(this.menuId), false);
      }, 200);
    },
    closeMenu() {
      if (!this.showMenu) return;
      this.menuAnimate(document.getElementById(this.menuId), true);
      setTimeout(() => {
        this.showMenu = false;
      }, 200);
    },
    menuAnimate(element, hide) {
      element.style.padding = "4px 0";
      let targetHeight = 34 * this.menu.length + 8 + "px";
      element.style.height = hide ? targetHeight : "0";
      element.style.padding = hide ? "4px 0" : "0";
      setTimeout(() => {
        element.style.height = hide ? "0" : targetHeight;
        element.style.padding = hide ? "0" : "4px 0";
      }, 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.FixedMenu {
  position: relative;
  width: fit-content;
  p {
    margin: 0;
  }
  .titleBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    .title {
      font-size: 14px;
      color: #4b77f6;
      line-height: 20px;
    }
    img {
      margin-left: 8px;
      width: 14px;
    }
  }
  .coverBox {
    position: absolute;
    bottom: 0;
    transform: translate(0%, 100%);
    right: -22px;
    z-index: 100;
    .menuBox {
      margin-top: 6px;
      min-width: 120px;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px #e0e0e0;
      border-radius: 2px;
      // padding: 4px 0;
      overflow: hidden;
      transition: all 0.2s;
      height: 0;
      box-sizing: border-box;
      .menu-item {
        box-sizing: border-box;
        padding: 7px 12px;
        cursor: pointer;
        width: 100%;
        transition: all 0.2s;
        p {
          width: 100%;
          font-size: 14px;
          line-height: 20px;
        }
      }
      .menu-item:hover {
        background: #f1f4ff;
        p {
          color: #4b77f6;
        }
      }
    }
  }
}
</style>