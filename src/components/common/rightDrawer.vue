<template>
  <transition name="slide-fade">
    <div class="RightDrawer" v-if="show" @click="closeDrawer">
      <div class="drawerBox">
        <div
          :class="['menuBox', showDrawer ? 'menuBox--show' : '']"
          @click.stop
        >
          <div class="header">
            <p>{{ title }}</p>
            <img src="@/assets/index/icon_close.svg" @click="closeDrawer" />
          </div>
          <div class="content">
            <div class="contentBox">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["title"],
  data() {
    return {
      show: false,
      showDrawer: false,
    };
  },
  methods: {
    closeDrawer() {
      this.showDrawer = false;
      setTimeout(() => {
        this.show = false;
      }, 200);
    },
    openDrawer() {
      this.show = true;
      setTimeout(() => {
        this.showDrawer = true;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.RightDrawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  p {
    margin: 0;
  }
  .drawerBox {
    position: relative;
    width: 100%;
    height: 100%;
    .menuBox {
      position: absolute;
      top: 0;
      right: 0;
      width: 380px;
      height: 100%;
      background-color: #fff;
      transition: all 0.25s ease;
      transform: translate(100%, 0%);
      .header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        padding: 14px 24px 14px 30px;
        box-sizing: border-box;
        background: #fafbfc;
        border-bottom: 1px solid #d3d3d3;
        p {
          font-size: 18px;
          color: #333333;
          line-height: 25px;
        }
        img {
          width: 12px;
          cursor: pointer;
        }
      }
      .content {
        padding-top: 30px;
        height: calc(100% - 54px);
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        .contentBox {
          padding: 0 24px 0 30px;
          overflow: auto;
          flex: 1;
          box-sizing: border-box;
        }
        .contentBox::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .menuBox--show {
      transform: translate(0%, 0%);
    }
  }
}
</style>