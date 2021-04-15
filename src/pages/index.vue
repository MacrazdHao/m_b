<template>
  <div class="Index">
    <div class="menu">
      <img class="logo" src="@/assets/index/logo.svg" />
      <div class="route">
        <div
          class="menu-item"
          v-for="(item, index) in $store.state.global.menu.children"
          :key="index"
        >
          <div class="menu-item-inbox" v-if="menuFilter(item.name)">
            <div
              :class="[
                'button',
                pageName == item.meta.id ? 'button--selected' : '',
              ]"
              v-if="index > 0"
              @click="selectItem([item], `/index/${item.path}`)"
            >
              <div class="button-title">
                <img
                  :src="
                    require(`@/assets/index/${item.meta.icon}${
                      pageName == item.meta.id ? '_selected' : ''
                    }.svg`)
                  "
                />
                <p>
                  {{ language == "zh" ? item.meta.title : item.meta.enTitle }}
                </p>
              </div>
              <img
                :class="[
                  'cmenuIcon',
                  pChildrenIsShow == item.meta.id
                    ? 'cmenuIcon--open'
                    : 'cmenuIcon--close',
                ]"
                v-if="item.children"
                :src="require(`@/assets/index/icon_pull.svg`)"
              />
            </div>
            <div class="children" :id="`/index/${item.path}`">
              <div v-for="(item2, index2) in item.children" :key="index2">
                <div
                  :class="[
                    'button',
                    pageName == item2.meta.id ? 'button--selected' : '',
                  ]"
                  v-if="index2 > 0"
                  @click="
                    selectItem(
                      [item, item2],
                      `/index/${item.path}/${item2.path}`
                    )
                  "
                >
                  <div class="button-title">
                    <img />
                    <p>
                      {{
                        language == "zh" ? item2.meta.title : item2.meta.enTitle
                      }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="interface">
      <div class="header">
        <div class="titleBox">
          <p class="title">{{ pageTitle }}</p>
          <div
            class="suffixMenu"
            v-for="(item, index) in suffixMenu"
            :key="index"
          >
            <img src="@/assets/index/icon_arrow.svg" />
            <p>{{ item }}</p>
          </div>
        </div>
        <div class="toolsBar">
          <!-- <p @click="logout">登出</p> -->
          <div class="messageIconBox" @click="goMessages">
            <img class="messages" src="@/assets/index/icon_news.svg" />
            <p class="num">999</p>
          </div>
          <div
            class="userMenu"
            @mouseenter="userMenuShow = true"
            @mouseleave="userMenuShow = false"
          >
            <img class="avatar" src="@/assets/index/anna.jpg" />
            <p class="nickname">梁湛霞</p>
            <transition name="slide-fade">
              <div class="drawerBox" v-show="userMenuShow">
                <div class="drawer">
                  <div
                    class="drawer-item"
                    @click="goPersonal"
                    @mouseenter="userMenuHover = 'center'"
                    @mouseleave="userMenuHover = ''"
                  >
                    <img
                      v-show="userMenuHover != 'center'"
                      src="@/assets/index/icon_personal.svg"
                    />
                    <img
                      v-show="userMenuHover == 'center'"
                      src="@/assets/index/icon_personal_selected.svg"
                    />
                    <p>{{ $t("home.header.personal") }}</p>
                  </div>
                  <div
                    class="drawer-item"
                    @click="logout"
                    @mouseenter="userMenuHover = 'logout'"
                    @mouseleave="userMenuHover = ''"
                  >
                    <img
                      v-show="userMenuHover != 'logout'"
                      src="@/assets/index/icon_logout.svg"
                    />
                    <img
                      v-show="userMenuHover == 'logout'"
                      src="@/assets/index/icon_logout_selected.svg"
                    />
                    <p>{{ $t("home.header.logout") }}</p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <img class="language" src="@/assets/index/icon_language.svg" />
        </div>
      </div>
      <div class="content">
        <transition name="slide-fade2">
          <router-view @setSuffixMenu="setSuffixMenu" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import redirectMixin from "@/mixins/redirect";
export default {
  // mixins: [redirectMixin],
  data() {
    return {
      initial: true,
      pageName: "Dashboard",
      pChildrenIsShow: "",
      pagePath: [],
      userMenuShow: false,
      userMenuHover: "",
      suffixMenu: [],
    };
  },
  computed: {
    language() {
      return this.$store.state.global.language;
    },
    pageTitle() {
      if (this.$route.matched[1].name == "personal") {
        return "个人中心";
      }
      return this.language == "zh"
        ? this.$route.meta.title
        : this.$route.meta.enTitle;
    },
    navigation() {
      // console.log(this.pagePath);
      return this.pagePath.length == 0
        ? ""
        : this.pagePath[this.pagePath.length - 1].name;
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        this.routeChanged();
      },
      immediate: true,
    },
    pChildrenIsShow: {
      handler(val, oldVal) {
        // mounted阶段内无法获取dom节点，因此需要异步
        if (this.initial) {
          setTimeout(() => {
            if (this.pagePath[0]) {
              this.menuAnimate(
                document.getElementById(`/index/${this.pagePath[0].name}`),
                oldVal ? oldVal == this.pagePath[0].meta.id : false
              );
            }
            this.initial = false;
          }, 300);
        } else {
          if (this.pagePath[0]) {
            this.menuAnimate(
              document.getElementById(`/index/${this.pagePath[0].name}`),
              oldVal == this.pagePath[0].meta.id
            );
          }
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.routeChanged();
  },
  methods: {
    menuFilter(pageName) {
      switch (pageName) {
        case "messages":
          return false;
        case "personal":
          return false;
        default:
          return true;
      }
    },
    routeChanged() {
      this.pageName = this.$route.meta.id;
      this.suffixMenu = [];
      if (
        this.$route.matched.length > 2 &&
        this.menuFilter(this.$route.matched[1].name)
      ) {
        this.pagePath = this.$route.matched.slice(
          1,
          this.$route.matched.length
        );
        this.pChildrenIsShow = this.$route.matched[
          this.$route.matched.length - 1
        ].parent.meta.id;
      }
    },
    setSuffixMenu(arr) {
      // console.log("设置后缀", arr);
      this.suffixMenu = [...arr];
    },
    menuAnimate(element, hide) {
      element.style.height = "auto";
      let targetHeight = window.getComputedStyle(element).height;
      element.style.height = hide ? targetHeight : "0";
      setTimeout(() => {
        element.style.height = hide ? "0" : targetHeight;
      }, 0);
    },
    selectItem(items, path) {
      this.suffixMenu = [];
      if (items[0].children && items.length == 1) {
        this.pagePath = items;
        this.pChildrenIsShow =
          this.pChildrenIsShow == items[0].meta.id ? "" : items[0].meta.id;
      } else {
        this.pageName = items[items.length - 1].meta.id;
        this.$router.push({ path });
      }
    },
    logout() {
      this.$store.dispatch("user/logout").then((res) => {
        this.$router.push({ path: "/" });
      });
    },
    goMessages() {
      this.$router.push({ path: "/index/messages" });
    },
    goPersonal() {
      this.$router.push({ path: "/index/personal/base" });
    },
  },
};
</script>

<style lang="scss" scoped>
.Index {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  background-color: #f1f2f6;
  p {
    margin: 0;
  }
  .menu {
    background-color: #191a23;
    width: 240px;
    height: 100%;
    display: flex;
    flex-direction: column;
    .logo {
      width: 149px;
      margin: 14px 20px 14px;
      cursor: pointer;
    }
    .route {
      height: 100%;
      .menu-item {
        .menu-item-inbox {
          display: flex;
          flex-direction: column;
          .button {
            // max-height: 100px;
            width: 100%;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 11px 20px;
            cursor: pointer;
            transition: all 0.3s;
            .button-title {
              display: flex;
              flex-direction: row;
              p {
                margin-left: 8px;
                font-size: 14px;
                color: #cccccc;
                line-height: 20px;
              }
            }
            .cmenuIcon {
              width: 14px;
              transition: all 0.3s;
            }
            .cmenuIcon--open {
              // 调转箭头动画
              transform: rotate(0deg);
            }
            .cmenuIcon--close {
              // 调转箭头动画
              transform: rotate(180deg);
            }
          }
          .button:hover {
            background-color: #242531;
          }
          .button--selected,
          .button--selected:hover {
            background-color: #4b78f6;
            .button-title {
              p {
                color: #fff;
              }
            }
          }
          .children {
            height: 0;
            transition: 0.3s height ease-in-out;
            overflow: hidden;
            background: #1f212c;
          }
          .hide {
          }
        }
      }
    }
  }
  .interface {
    width: calc(100% - 264px);
    display: flex;
    flex-direction: column;
    .header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      background: #fff;
      box-shadow: 0px 2px 6px 0px rgba(224, 224, 224, 0.5);
      padding: 18px 24px;
      box-sizing: border-box;
      .titleBox {
        display: flex;
        flex-direction: row;
        .title {
          font-size: 18px;
          line-height: 25px;
          color: #333333;
        }
        .suffixMenu {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 8px;
          img {
            width: 5px;
          }
          p {
            font-size: 18px;
            line-height: 25px;
            color: #333333;
            margin-left: 8px;
          }
        }
      }
      .toolsBar {
        display: flex;
        flex-direction: row;
        .messageIconBox {
          position: relative;
          display: flex;
          cursor: pointer;
          .messages {
            width: 20px;
          }
          .num {
            position: absolute;
            background-color: #ff4d4f;
            border-radius: 10px;
            padding: 1px 6px;
            font-size: 16px;
            color: #ffffff;
            // line-height: 22px;
            top: -11px;
            left: 11px;
          }
        }
        .userMenu {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 24px;
          margin-left: 34px;
          cursor: pointer;
          position: relative;
          .avatar {
            width: 24px;
            height: 24px;
            border-radius: 12px;
          }
          .nickname {
            margin-left: 8px;
            font-size: 14px;
            color: #333333;
            line-height: 20px;
          }
          .drawerBox {
            position: absolute;
            left: -78px;
            bottom: 0;
            padding-top: 24px;
            transform: translate(0, 100%);
            cursor: default;
            .drawer {
              display: flex;
              flex-direction: column;
              padding: 4px 0;
              background-color: #fff;
              box-shadow: 0px 4px 8px 0px #e0e0e0;
              border-radius: 2px;
              min-width: 138px;
              overflow: hidden;
              .drawer-item {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 7px 12px;
                transition: all 0.1s;
                cursor: pointer;
                img {
                  width: 12px;
                }
                p {
                  color: #666666;
                  line-height: 20px;
                  font-size: 14px;
                  margin-left: 12px;
                }
              }
              .drawer-item + .drawer-item {
                border-top: 1px solid #d3d3d3;
              }
              .drawer-item:hover {
                background-color: #f1f4ff;
                p {
                  color: #4b77f6;
                }
              }
            }
          }
        }
        .language {
          width: 24px;
          margin-left: 24px;
          cursor: pointer;
        }
      }
    }
    .content {
      margin-top: 24px;
      margin-right: 24px;
    }
  }
}
</style>