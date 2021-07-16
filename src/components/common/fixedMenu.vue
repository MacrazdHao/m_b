<template>
  <div
    class="FixedMenu"
    ref="menuBox"
    @mouseleave="mouseMoveHide ? closeMenu : () => {}"
    v-clickoutside="closeMenu"
  >
    <div class="titleBox" @click="toggleMenu">
      <p class="title">{{ text }}</p>
      <img
        :class="['pull', showMenu ? 'pull--show' : 'pull--hide']"
        :style="iconStyle"
        v-if="showIcon"
        :src="iconUrl"
      />
    </div>
    <div
      class="coverBox"
      :style="{ height: showMenu ? this.height + 20 + 'px' : '0' }"
    >
      <div
        class="menuBox"
        :style="{
          'max-height': height + 'px',
          'overflow-x': 'hidden',
          'overflow-y': overScroll && menuContentHeight > maxHeight ? 'scroll' : 'hidden',
        }"
        ref="menu"
        v-show="showMenu"
      >
        <div
          class="menu-item"
          :id="`menuItem${index}`"
          v-for="(item, index) in menu"
          :key="index"
          @click="handleSelect(index, item)"
        >
          <p :id="`menuItemp${index}`">{{ item.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from "./utilsFromElement/clickoutside";
export default {
  directives: { Clickoutside },
  props: {
    text: {
      default: "",
      type: String,
    },
    menu: {
      defaultStatus: [],
      type: Array,
    },
    mouseMoveHide: {
      default: true,
      type: Boolean,
    },
    extra: {
      default: null,
    },
    iconUrl: {
      default: require("@/assets/index/icon_pull_blue.svg"),
    },
    showIcon: {
      default: true,
      type: Boolean,
    },
    iconStyle: {
      default: () => {
        return {};
      },
      type: Object,
    },
    maxHeight: {
      default: null,
      type: Number,
    },
    overScroll: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    height() {
      if (34 * this.menu.length + 8 < this.maxHeight)
        return 34 * this.menu.length + 8;
      else return this.maxHeight || 34 * this.menu.length + 8;
    },
    menuContentHeight() {
      return 34 * this.menu.length + 8;
    },
  },
  watch: {
    showMenu(val) {
      this.$emit("handleOpen", val);
      if (val) this.$emit("focus", val);
      else this.$emit("blur", val);
    },
  },
  mounted() {
    document.addEventListener(
      "mousedown",
      function (e) {
        if (e.target.id.match(/menuItem/)) {
          e.preventDefault();
        }
      },
      false
    );
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
        this.menuAnimate(this.$refs["menu"]);
      }, 0);
    },
    closeMenu() {
      if (!this.showMenu) return;
      this.menuAnimate(this.$refs["menu"], true);
      setTimeout(() => {
        this.showMenu = false;
      }, 100);
    },
    menuAnimate(element, hide) {
      if (!element) return;
      element.style.padding = "4px 0";
      let targetHeight = this.height + "px";
      element.style.height = hide ? targetHeight : "0";
      element.style.padding = hide ? "4px 0" : "0";
      setTimeout(() => {
        element.style.height = hide ? "0" : targetHeight;
        element.style.padding = hide ? "0" : "4px 0";
      }, 0);
    },
    handleSelect(index, item) {
      item.callback(this.extra, index);
      this.closeMenu();
    },
  },
};
</script>

<style lang="scss" scoped>
.FixedMenu {
  position: relative;
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  p {
    margin: 0;
  }
  .titleBox {
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
    width: 100%;
    .title {
      font-size: 14px;
      color: #4b77f6;
      line-height: 20px;
      white-space: nowrap;
    }
    .pull {
      margin-left: 8px;
      width: 14px;
      transition: 0.4s;
    }
    .pull--show {
      transform: rotate(180deg);
    }
    .pull--hide {
      transform: rotate(360deg);
    }
  }
  .coverBox {
    width: fit-content;
    display: flex;
    flex-direction: row;
    justify-content: center;
    position: absolute;
    bottom: 0;
    transform: translate(0%, 100%);
    right: -22px;
    z-index: 100;
    // overflow: scroll;
    .menuBox {
      margin-top: 6px;
      min-width: 120px;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px #e0e0e0;
      border-radius: 2px;
      // padding: 4px 0;
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