<template>
  <div
    class="TestConfigBox"
    @mouseover="showMenu = true"
    @mouseleave="showMenu = false"
  >
    <div class="menuBox">
      <div
        class="menuItem"
        v-for="(item, index) in menuItems"
        :key="index"
        @mouseover="showMenu = true"
        @mouseleave="showMenu = false"
      >
        <div
          class="menuItemInBox"
          @mouseleave="toggleOptions(index, false)"
          @mouseover="toggleOptions(index, true)"
        >
          <div class="optionsBox" v-show="item.show">
            <div class="optionItem">
              <p>
                <span>{{
                  `当前URL：${status.requestObject.title}(${status.requestObject.value})`
                }}</span>
              </p>
            </div>
            <div
              class="optionItem"
              v-for="(item2, index2) in item.options"
              :key="index2"
              @click="item2.callback"
            >
              <p>
                <span>{{ `${item2.title}(${item2.ip_port})` }}</span>
              </p>
            </div>
          </div>
          <div class="coverBox">
            <img class="icon" :src="item.icon" />
            <p class="title">{{ item.title }}</p>
          </div>
        </div>
      </div>
      <div class="coverBox">
        <img class="icon" src="@/assets/testmenu/menu.png" />
        <p class="title">菜单</p>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from "../common/utilsFromElement/clickoutside";
import config from "@/utils/config";
export default {
  directives: { Clickoutside },
  data() {
    return {
      showMenu: false,
      menuItems: [
        {
          title: "服务器",
          icon: require("@/assets/testmenu/icon_server.svg"),
          click: () => {},
          show: false,
          options: this.serverOptions(),
        },
      ],
    };
  },
  computed: {},
  watch: {
    showMenu(val) {
      console.log("显示菜单", val);
    },
  },
  computed: {
    status() {
      let serverOptions = this.serverOptions();
      let requestObject = { title: "null" };
      for (let i = 0; i < serverOptions.length; i++) {
        if (serverOptions[i].value == config.URL) {
          requestObject = serverOptions[i];
        }
      }
      return {
        requestObject,
      };
    },
  },
  methods: {
    serverOptions() {
      return [
        {
          title: "罗焕",
          ip_port: this.getIP_PORT(config.urls.luohuanURL2),
          value: config.urls.luohuanURL2,
          callback: () => config.setURL(config.urls.luohuanURL2),
        },
        {
          title: "浩然",
          ip_port: this.getIP_PORT(config.urls.haoranURL),
          value: config.urls.haoranURL,
          callback: () => config.setURL(config.urls.haoranURL),
        },
        {
          title: "文杰",
          ip_port: this.getIP_PORT(config.urls.wenjieURL),
          value: config.urls.wenjieURL,
          callback: () => config.setURL(config.urls.wenjieURL),
        },
        {
          title: "测试",
          ip_port: this.getIP_PORT(config.urls.testURL2),
          value: config.urls.testURL2,
          callback: () => config.setURL(config.urls.testURL2),
        },
      ];
    },
    toggleOptions(index, show) {
      this.$set(this.menuItems, index, {
        ...this.menuItems[index],
        show,
      });
    },
    getIP_PORT(url) {
      return url.substring(url.lastIndexOf(".") + 1, url.length);
    },
  },
};
</script>

<style lang="scss" scoped>
.TestConfigBox {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
  opacity: 0.8;
  p {
    font-size: 14px;
    line-height: 20px;
    height: 20px;
    text-align: justify;
    flex: 1;
    // white-space: nowrap;
    span {
      white-space: nowrap;
    }
  }
  p::after {
    display: inline-block;
    width: 100%;
    content: "";
  }
  .menuBox:hover {
    height: fit-content;
  }
  .menuBox {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 0 6px 10px 6px;
    height: 28px;
    overflow: hidden;
    max-width: 100vw;
    width: fit-content;
    transition: 0.3s all;
    .coverBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: #ffffff;
      box-shadow: 0px 4px 8px 0px #e0e0e0;
      border-radius: 100px;
      padding: 4px 10px;
      cursor: pointer;
      // margin-top: 8px;
      width: 100px;
      box-sizing: border-box;
      .icon {
        width: 14px;
        height: 13px;
        margin-right: 8px;
      }
    }
    .menuItem {
      margin-bottom: 8px;
      transition: 0.3s all;
    }
    .menuItem {
      .menuItemInBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: fit-content;
        .coverBox {
          margin-top: 0;
        }
        .optionsBox {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 100%;
          margin-right: 10px;
          .optionItem {
            height: 100%;
            padding: 4px 10px;
            background: #ffffff;
            box-shadow: 0px 4px 8px 0px #e0e0e0;
            border-radius: 100px;
            cursor: pointer;
          }
          .optionItem + .optionItem {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>