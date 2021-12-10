<template>
  <div class="Index" id="index">
    <div :class="['menu', showMenu ? 'menu--show' : 'menu--hide']">
      <img class="logo" v-if="showMenu" src="@/assets/index/logo.svg" />
      <div class="miniLogoBox" v-else>
        <img class="" src="@/assets/index/logo_mini.svg" />
      </div>
      <div class="route">
        <div
          class="menu-item"
          v-for="(item, index) in $store.state.global.menu.children.slice(1)"
          :key="index"
        >
          <div class="menu-item-inbox" v-if="!item.meta.notShowInMenu">
            <div
              :class="[
                'button',
                pageName == item.meta.id ? 'button--selected' : '',
                childrenMenu[item.meta.id] ? 'cmenu--selected' : '',
                showMenu ? '' : 'button--miniMenu',
              ]"
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
                <p :class="[showMenu ? '' : 'button-title--menuHiding']">
                  {{ language == "zh" ? item.meta.title : item.meta.enTitle }}
                </p>
              </div>
              <img
                :class="[
                  'cmenuIcon',
                  childrenMenu[item.meta.id]
                    ? 'cmenuIcon--open'
                    : 'cmenuIcon--close',
                  showMenu ? '' : 'cmenuIcon--menuHiding',
                ]"
                v-if="item.children && !item.meta.notShowChildren && showMenu"
                :src="require(`@/assets/index/icon_pull.svg`)"
              />
              <div
                class="fixedChildren"
                :data-routeid="item.meta.id"
                :id="`/index/${item.path}`"
                v-if="!showMenu && !item.meta.notShowChildren"
              >
                <div class="fixedChildrenInbox">
                  <div v-for="(item2, index2) in item.children" :key="index2">
                    <div
                      :class="[
                        'fixedChildrenButton',
                        pageName == item2.meta.id
                          ? 'fixedChildrenButton--selected'
                          : '',
                      ]"
                      v-if="index2 > 0 && !item2.meta.notShowThisChild"
                      @click="
                        selectItem(
                          [item, item2],
                          `/index/${item.path}/${item2.path}`
                        )
                      "
                    >
                      <div class="fixedChildrenButton-title">
                        <p>
                          {{
                            language == "zh"
                              ? item2.meta.title
                              : item2.meta.enTitle
                          }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="children"
              :data-routeid="item.meta.id"
              :id="`/index/${item.path}`"
              v-show="showMenu"
              v-if="!item.meta.notShowChildren"
            >
              <div v-for="(item2, index2) in item.children" :key="index2">
                <div
                  :class="[
                    'button',
                    pageName == item2.meta.id ? 'button--selected' : '',
                  ]"
                  v-if="index2 > 0 && !item2.meta.notShowThisChild"
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
          <img
            :class="['menuToggle', showMenu ? '' : 'menuToggle--hiding']"
            src="@/assets/index/icon_menu_toggle.svg"
            @click="miniMenuToggle"
          />
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
        <div class="toolsBar" v-if="isHasLoginMode">
          <div class="messageIconBox" @click="goMessages">
            <img class="messages" src="@/assets/index/icon_news.svg" />
            <div class="num" v-if="$store.state.user.unreadNum > 0">
              <p>{{ $store.state.user.unreadNum }}</p>
            </div>
          </div>
          <div
            class="userMenu"
            @mouseenter="userMenuShow = true"
            @mouseleave="userMenuShow = false"
          >
            <img class="avatar" :src="toolbarAvatar" />
            <p class="nickname">{{ toolbarNickName }}</p>
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
          <img
            class="language"
            src="@/assets/index/icon_language.svg"
            @click="changeLanguage"
          />
        </div>
      </div>
      <div class="content">
        <transition name="slide-fade2">
          <router-view v-if="isReload" @setSuffixMenu="setSuffixMenu" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
// import redirectMixin from "@/mixins/redirect";
import { getUsertype } from "@/utils/auth";
import languageMixin from "@/mixins/language";
import Cookies from "js-cookie";
import reloadMixin from "@/mixins/reload";
import LoginMode from "@/utils/loginMode";
const menuShowCookiesKey = "myfellasMenuStatus";
export default {
  mixins: [languageMixin, reloadMixin],
  data() {
    return {
      showMenu: true,
      initial: true,
      pageName: "Dashboard",
      // pChildrenIsShow: "",
      childrenMenu: {},
      pagePath: [],
      userMenuShow: false,
      userMenuHover: "",
      suffixMenu: [],
    };
  },
  computed: {
    toolbarNickName() {
      if (!this.$store.state.user.userinfo) {
        return this.$t("home.header.defaultName");
      }
      return (
        this.$store.state.user.userinfo.nickName ||
        this.$t("home.header.defaultName")
      );
    },
    toolbarAvatar() {
      if (!this.$store.state.user.userinfo) {
        return this.$_default.avatar;
      }
      return this.$store.state.user.userinfo.avatar
        ? this.$_default.ossUrl + this.$store.state.user.userinfo.avatar
        : this.$_default.avatar;
    },
    isHasLoginMode() {
      return (
        LoginMode.loginModeSetting.getLoginMode() ==
        LoginMode.loginModeSetting.loginModes.hasLoginMode
      );
    },
    // language() {
    //   return this.$store.state.global.language;
    // },
    pageTitle() {
      // 定制header标题
      let title = this.language == "zh" ? "title" : "enTitle";
      if (
        (this.$route.meta.showTopParentTitleInHeader ||
          this.$route.matched[1].meta.showTopParentTitleInHeader) &&
        this.$route.matched.length > 2
      ) {
        if (
          this.$route.meta.showChildTitleInHeaderWithParentTitle ||
          this.$route.matched[1].meta.showChildTitleInHeaderWithParentTitle
        ) {
          this.suffixMenu = [this.$route.meta[title]];
        }
        return this.$route.matched[1].meta[title];
      } else {
        return this.$route.meta[title];
      }
      // switch (this.$route.matched[1].name) {
      //   case "personal":
      //     return this.$route.matched[1].meta[title];
      //   case "accounts":
      //     return this.$route.matched[1].meta[title];
      //   case "management":
      //     this.suffixMenu = [this.$route.meta[title]];
      //     return this.$route.matched[1].meta[title];
      //   case "estuaryStudent":
      //     this.suffixMenu = [this.$route.meta[title]];
      //     return this.$route.matched[1].meta[title];
      //   default:
      //     return this.$route.meta[title];
      // }
    },
    navigation() {
      return this.pagePath.length == 0
        ? ""
        : this.pagePath[this.pagePath.length - 1].name;
    },
  },
  watch: {
    $route: {
      handler: function (route) {
        this.suffixMenu = [];
        if (
          document.getElementsByClassName("interface")[0] &&
          document.getElementsByClassName("interface")[0].scrollTop
        )
          document.getElementsByClassName("interface")[0].scrollTop = 0;
        this.routeChanged();
      },
      immediate: true,
    },
    showMenu(val) {
      Cookies.set(menuShowCookiesKey, val);
    },
  },
  mounted() {
    for (let i = 0; i < this.$store.state.global.menu.children.length; i++) {
      let item = this.$store.state.global.menu.children[i];
      if (item.children) {
        this.childrenMenu[item.meta.id] = false;
      }
    }
    this.routeChanged(true);
  },
  methods: {
    // menuFilter(pageName) {
    //   switch (pageName) {
    //     case "messages":
    //       return false;
    //     case "personal":
    //       return false;
    //     default:
    //       return true;
    //   }
    // },
    routeChanged(initial = false) {
      // console.log(this.$route);
      if (
        !this.$route.matched[this.$route.matched.length - 2].meta
          .notShowChildren
      ) {
        // 此处为左侧菜单的页面的处理逻辑
        if (
          this.$route.matched.length > 2 &&
          !this.$route.matched[1].meta.notShowInMenu
        ) {
          // 此处为左侧菜单的子页面的处理逻辑
          this.pagePath = this.$route.matched.slice(
            1,
            this.$route.matched.length
          );
          if (initial) {
            // 初次加载时，自动展开当前页面的父菜单
            setTimeout(() => {
              if (this.pagePath[0]) {
                this.childrenMenu[this.pagePath[0].meta.id] =
                  !this.childrenMenu[this.pagePath[0].meta.id];
                this.$forceUpdate();
                this.menuAnimate(
                  document.getElementById(`/index/${this.pagePath[0].name}`),
                  !this.childrenMenu[this.pagePath[0].meta.id]
                );
              }
            }, 0);
          }
        }
        if (this.$route.meta.notShowThisChild) {
          // 此处为左侧菜单的页面但并非其子菜单，而是内置页面的处理逻辑
          let group = this.$route.meta.group;
          let route = this.$route.matched;
          let menu = this.$store.state.global.menu;
          if (!this.$route.meta.groupParent) {
            // console.log("寻找groupParent", route, menu);
            for (let i = 1; i < route.length; i++) {
              for (let j = 0; j < menu.children.length; j++) {
                if (!menu.children[j].children) continue;
                if (route[i].meta.id == menu.children[j].meta.id) {
                  for (let k = 1; k < menu.children[j].children.length; k++) {
                    if (
                      menu.children[j].children[k].meta.groupParent &&
                      menu.children[j].children[k].meta.group == group
                    ) {
                      this.pageName = menu.children[j].children[k].meta.id;
                    }
                  }
                }
              }
            }
          }
          return;
        }
        this.pageName = this.$route.meta.id;
      } else {
        // 此处为非左侧菜单的页面的处理逻辑
        this.pageName =
          this.$route.matched[this.$route.matched.length - 2].meta.id;
      }
      setTimeout(() => {
        if (this.initial) {
          this.showMenu = JSON.parse(Cookies.get(menuShowCookiesKey));
          this.initial = false;
        }
      }, 100);
    },
    setSuffixMenu(arr, merge = false) {
      this.suffixMenu = merge ? [...this.suffixMenu, ...arr] : [...arr];
      this.$forceUpdate();
    },
    menuAnimate(element, hide) {
      element.style.height = "auto";
      let targetHeight = window.getComputedStyle(element).height;
      element.style.height = hide ? targetHeight : "0";
      setTimeout(() => {
        element.style.height = hide ? "0" : targetHeight;
      }, 0);
    },
    miniMenuToggle() {
      this.showMenu = !this.showMenu;
      // 切换回普通菜单时，恢复到切换为mini菜单时的普通菜单中所有子菜单伸缩状态
      this.routeChanged();
    },
    selectItem(items, path) {
      if (!items[0].meta.notShowChildren) {
        if (items[0].children && items.length == 1) {
          // 打开子菜单
          this.pagePath = items;
          // mini菜单时，不进行原子菜单伸缩动画
          if (this.pagePath[0] && this.showMenu) {
            this.childrenMenu[this.pagePath[0].meta.id] =
              !this.childrenMenu[this.pagePath[0].meta.id];
            this.$forceUpdate();
            this.menuAnimate(
              document.getElementById(`/index/${this.pagePath[0].name}`),
              !this.childrenMenu[this.pagePath[0].meta.id]
            );
          }
        } else {
          // 进入页面
          this.pageName = items[items.length - 1].meta.id;
          this.$router.push({ path });
          if (this.pageName != items[items.length - 1].meta.id) {
            this.suffixMenu = [];
          }
        }
      } else {
        this.pageName = items[items.length - 1].meta.id;
        this.$router.push({ path });
        if (this.pageName != items[items.length - 1].meta.id) {
          this.suffixMenu = [];
        }
      }
    },
    logout() {
      this.$logoutDialog(() => {
        this.$store.dispatch("user/logout").then((res) => {
          if (res.type == 10)
            window.location.href = `${window.location.origin}/adminEntry`;
        });
      });
    },
    goMessages() {
      console.log(this.$route);
      this.$router.push({
        path: "/index/messages",
        query: { timestamp: new Date().getTime() },
      });
    },
    goPersonal() {
      if (this.$route.path.indexOf("/index/personal") < 0) {
        this.$router.push({ path: "/index/personal/" });
      }
    },
    changeLanguage() {
      // this.$getPdf(document.getElementById("index"), "test");
      console.log("变更语言", this.language);
      // this.language = this.language == "zh" ? "en" : "zh";
      this.$store.dispatch(
        "global/setLanguage",
        this.language == "zh" ? "en" : "zh"
      );
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
  height: 100%;
  overflow: hidden;
  background-color: #f1f2f6;
  position: relative;
  p {
    margin: 0;
    user-select: none;
  }
  .menu--hide {
    width: 52px !important;
  }
  .menu {
    background-color: #191a23;
    width: 240px;
    height: 100%;
    overflow: auto initial;
    display: flex;
    flex-direction: column;
    transition: 0.3s all;
    .logo {
      width: 149px;
      margin: 14px 20px 14px;
      cursor: pointer;
    }
    .miniLogoBox {
      width: 100%;
      padding: 18px 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .logo--mini {
        width: 30px;
        height: 24px;
      }
    }
    .route {
      height: 100%;
      .menu-item {
        .menu-item-inbox {
          display: flex;
          flex-direction: column;
          .button--miniMenu {
            padding: 15px 19px !important;
          }
          .button {
            position: relative;
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
              align-items: center;
              img {
                width: 14px;
                // height: 14px;
              }
              .button-title--menuHiding {
                opacity: 0;
              }
              p {
                margin-left: 8px;
                font-size: 14px;
                color: #cccccc;
                line-height: 20px;
                white-space: nowrap;
                transition: 0.3s all;
                opacity: 1;
              }
            }
            .cmenuIcon--menuHiding {
              opacity: 0;
            }
            .cmenuIcon {
              opacity: 1;
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
            .fixedChildren {
              padding-left: 8px;
              position: absolute;
              top: 0;
              right: 0px;
              transform: translate(100%);
              opacity: 0;
              z-index: -10;
              transition: 0.2s all;
              .fixedChildrenInbox {
                width: 160px;
                background: #191a23;
                border-radius: 6px;
                overflow: hidden;
                .fixedChildrenButton:hover {
                  background-color: #4b78f6;
                  .fixedChildrenButton-title {
                    p {
                      color: #fff;
                    }
                  }
                }
                .fixedChildrenButton--selected:hover {
                  background-color: rgb(93, 134, 248);
                  .button-title {
                    p {
                      color: #fff;
                    }
                  }
                }
                .fixedChildrenButton--selected {
                  background-color: #4b78f6;
                  .fixedChildrenButton-title {
                    p {
                      color: #fff !important;
                    }
                  }
                }
                .fixedChildrenButton {
                  width: 100%;
                  padding: 12px 0;
                  .fixedChildrenButton-title {
                    p {
                      font-size: 14px;
                      color: #cccccc;
                      line-height: 20px;
                    }
                  }
                }
              }
            }
          }
          .button:hover {
            background-color: #20202c;
            .fixedChildren {
              z-index: 100;
              opacity: 0.9;
            }
          }
          .button--miniMenu:hover {
            background-color: #242531;
            .fixedChildren {
              z-index: 100;
              opacity: 0.9;
            }
          }
          .button--selected:hover {
            background-color: rgb(93, 134, 248);
            .button-title {
              p {
                color: #fff;
              }
            }
          }
          .button--selected {
            background-color: #4b78f6;
            .button-title {
              p {
                color: #fff;
              }
            }
          }
          .cmenu--selected {
            background-color: #101117;
            .button-title {
              p {
                color: #fff;
              }
            }
          }
          .cmenu--selected:hover {
            background-color: #13141b;
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
            .button:hover {
              background-color: rgb(39, 39, 53);
            }
            .button--selected:hover {
              background-color: rgb(93, 134, 248);
              .button-title {
                p {
                  color: #fff;
                }
              }
            }
            .button--selected {
              background-color: #4b78f6;
              .button-title {
                p {
                  color: #fff;
                }
              }
            }
          }
          .hide {
          }
        }
      }
    }
  }
  .interface {
    // width: calc(100% - 264px);
    margin-left: 24px;
    flex: 1;
    overflow: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    // transition: .3s all;
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
        align-items: center;
        .menuToggle--hiding {
          transform: rotate(180deg);
        }
        .menuToggle {
          width: 22px;
          height: 18px;
          margin-right: 20px;
          cursor: pointer;
        }
        .title {
          font-size: 18px;
          line-height: 25px;
          color: #333333;
          white-space: nowrap;
        }
        .suffixMenu {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 8px;
          white-space: nowrap;
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
        justify-content: flex-end;
        flex: 1;
        margin-left: 20px;
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
            border-radius: 100px;
            padding: 0 6px;
            top: -11px;
            left: 11px;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: row;
            // align-items: center;
            height: 22px;
            min-width: 22px;
            p {
              font-size: 16px;
              color: #ffffff;
              line-height: 20px;
            }
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
            max-width: 20vw;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            // flex: 1;
          }
          .drawerBox {
            position: absolute;
            left: -78px;
            bottom: 0;
            padding-top: 24px;
            padding-right: 100%;
            transform: translate(0, 100%);
            cursor: default;
            z-index: 900;
            .drawer {
              display: flex;
              flex-direction: column;
              padding: 6px 0;
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
      width: calc(100% - 24px);
      flex: 1;
    }
  }
}
</style>