<template>
  <div class="Index" id="index">
    <div class="menu">
      <img class="logo" src="@/assets/index/logo.svg" />
      <div class="route">
        <div
          class="menu-item"
          v-for="(item, index) in $store.state.global.menu.children.slice(1)"
          :key="index"
        >
          <div class="menu-item-inbox" v-if="menuFilter(item.name)">
            <div
              :class="[
                'button',
                pageName == item.meta.id ? 'button--selected' : '',
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
                <p>
                  {{ language == "zh" ? item.meta.title : item.meta.enTitle }}
                </p>
              </div>
              <img
                :class="[
                  'cmenuIcon',
                  childrenMenu[item.meta.id]
                    ? 'cmenuIcon--open'
                    : 'cmenuIcon--close',
                ]"
                v-if="item.children && !item.meta.notShowChildren"
                :src="require(`@/assets/index/icon_pull.svg`)"
              />
            </div>
            <div
              class="children"
              :data-routeid="item.meta.id"
              :id="`/index/${item.path}`"
              v-if="!item.meta.notShowChildren"
            >
              <div v-for="(item2, index2) in item.children" :key="index2">
                <div
                  :class="[
                    'button',
                    pageName == item2.meta.id ? 'button--selected' : '',
                  ]"
                  v-if="index2 > 0&&!item2.meta.notShowThisChildren"
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
            <div class="num">
              <p>96</p>
            </div>
          </div>
          <div
            class="userMenu"
            @mouseenter="userMenuShow = true"
            @mouseleave="userMenuShow = false"
          >
            <img class="avatar" src="@/assets/index/anna.jpg" />
            <p class="nickname">
              纬英科技一手遮天一人之下万人之上财政大臣梁湛霞纬英科技一手遮天一人之下万人之上财政大臣梁湛霞纬英科技一手遮天一人之下万人之上财政大臣梁湛霞纬英科技一手遮天一人之下万人之上财政大臣梁湛霞
            </p>
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
      // pChildrenIsShow: "",
      childrenMenu: {},
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
      // 定制header标题
      let title = this.language == "zh" ? "title" : "enTitle";
      switch (this.$route.matched[1].name) {
        case "personal":
          return this.$route.matched[1].meta[title];
        case "accounts":
          return this.$route.matched[1].meta[title];
        case "management":
          this.suffixMenu = [this.$route.meta[title]];
          return this.$route.matched[1].meta[title];
        default:
          return this.$route.meta[title];
      }
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
        this.routeChanged();
      },
      immediate: true,
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
    routeChanged(initial = false) {
      if (
        !this.$route.matched[this.$route.matched.length - 2].meta
          .notShowChildren
      ) {
        this.pageName = this.$route.meta.id;
        if (
          this.$route.matched.length > 2 &&
          this.menuFilter(this.$route.matched[1].name)
        ) {
          this.pagePath = this.$route.matched.slice(
            1,
            this.$route.matched.length
          );
          if (initial) {
            setTimeout(() => {
              if (this.pagePath[0]) {
                this.childrenMenu[this.pagePath[0].meta.id] = !this
                  .childrenMenu[this.pagePath[0].meta.id];
                this.$forceUpdate();
                this.menuAnimate(
                  document.getElementById(`/index/${this.pagePath[0].name}`),
                  !this.childrenMenu[this.pagePath[0].meta.id]
                );
              }
            });
          }
        }
      } else {
        this.pageName = this.$route.matched[
          this.$route.matched.length - 2
        ].meta.id;
      }
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
    selectItem(items, path) {
      if (!items[0].meta.notShowChildren) {
        if (items[0].children && items.length == 1) {
          // 打开子菜单
          this.pagePath = items;
          if (this.pagePath[0]) {
            this.childrenMenu[this.pagePath[0].meta.id] = !this.childrenMenu[
              this.pagePath[0].meta.id
            ];
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
          this.$router.push({ path: "/" });
        });
      });
    },
    goMessages() {
      this.$router.push({ path: "/index/messages" });
    },
    goPersonal() {
      this.$router.push({ path: "/index/personal/" });
    },
    changeLanguage() {
      this.$getPdf(document.getElementById("index"), "test");
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
              align-items: center;
              img {
                width: 14px;
                // height: 14px;
              }
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
    }
  }
}
</style>