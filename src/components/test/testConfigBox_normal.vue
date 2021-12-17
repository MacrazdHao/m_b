<template>
  <div
    :class="['TestConfigBox', menuToggle ? '' : 'TestConfigBox--hiding']"
    v-if="env == 'development'"
  >
    <div class="TestConfigInBox">
      <div class="menuToggle" @click="menuToggle = !menuToggle">
        <img
          :class="[
            'menuToggleIcon',
            menuToggle ? 'menuToggleIcon--opening' : 'menuToggleIcon--closing',
          ]"
          src="@/assets/index/icon_menu_toggle.svg"
        />
      </div>
      <div class="statusBox">
        <div class="statusItem">
          <p
            class="searchButton"
            v-show="!showSearch"
            @click="showSearch = true"
          >
            搜索
          </p>
          <input
            class="searchInput"
            placeholder="输入关键词快捷搜索"
            v-model="searchKey"
            v-show="showSearch"
          />
          <span class="closeSearchButton" v-show="showSearch" @click="showSearch = false">x</span>
        </div>
        <div class="statusItem" v-show="searchAim(0)">
          <img class="icon" src="@/assets/testmenu/icon_server.svg" />
          <p>
            <span>{{
              `${labels[0]}：${status.requestObject.title}(${status.requestObject.value})`
            }}</span>
          </p>
        </div>
        <div class="statusItem" v-show="searchAim(1)">
          <img class="icon" src="@/assets/testmenu/icon_server.svg" />
          <p>
            <span>{{
              `${labels[1]}：${status.ossObject.title}(${status.ossObject.value})`
            }}</span>
          </p>
        </div>
        <div class="statusItem" v-show="searchAim(2)">
          <img class="icon" src="@/assets/testmenu/icon_version.svg" />
          <p>
            <span>{{ `${labels[2]}：${routerMode}` }}</span>
          </p>
        </div>
        <div class="statusItem" v-show="searchAim(3)">
          <img class="icon" src="@/assets/testmenu/icon_version.svg" />
          <p>
            <span>{{ `${labels[3]}：${loginMode}` }}</span>
          </p>
        </div>
        <div class="statusItem" v-show="searchAim(4)">
          <img class="icon" src="@/assets/testmenu/icon_language.svg" />
          <p>
            <span>{{ `${labels[4]}：${languageText}` }}</span>
          </p>
        </div>
        <div class="statusItem" v-show="searchAim(5)">
          <img class="icon" src="@/assets/testmenu/icon_version.svg" />
          <p>
            <span>{{ `${labels[5]}：${version}` }}</span>
          </p>
        </div>
      </div>
      <div class="menu" v-clickoutside="closeAllMenu">
        <div class="settingBox">
          <div class="coverBox" @click="toggleSetting">
            <img class="icon" src="@/assets/testmenu/icon_setting.svg" />
            <p class="title">设置</p>
          </div>
          <div class="settingItems" v-show="settingMenu">
            <div
              :class="['optionItem', item.show ? 'optionItem--selected' : '']"
              v-for="(item, index) in settingItems"
              :key="index"
            >
              <div class="coverBox" @click="toggleOptions(index)">
                <img class="icon" :src="item.icon" />
                <p class="title">
                  <span>{{ item.title }}</span>
                </p>
              </div>
              <div class="optionItems" v-if="item.options" v-show="item.show">
                <div
                  class="optionItem"
                  v-for="(item2, index2) in item.options"
                  :key="index2"
                  @click="item2.callback"
                >
                  <p>
                    <span
                      >{{ item2.title
                      }}{{ item2.attach ? `(${item2.attach})` : "" }}</span
                    >
                  </p>
                </div>
                <div
                  class="optionItem"
                  v-if="item.customize"
                  @click="item.others.customClick"
                >
                  <p>
                    <span>自定义</span>
                  </p>
                </div>
              </div>
            </div>
            <!-- more menuItem -->
          </div>
        </div>
      </div>
      <div
        class="customUrlBox"
        v-if="customUrlBoxShow"
        v-clickoutside="closeCustomUrl"
      >
        <div class="header"><p>自定义服务器IP</p></div>
        <div class="content">
          <p class="agreement" @click="changeAgreement">
            {{ requestAgreement }}
          </p>
          <input
            v-model="customUrl"
            placeholder="请输入服务器IP:PORT"
            @keydown="enterUrlInput"
          />
        </div>
        <div class="buttonBox">
          <p @click="confirmCustomUrl">确定</p>
          <p @click="closeCustomUrl">取消</p>
        </div>
      </div>
      <div
        class="customUrlBox"
        v-if="customOssUrlBoxShow"
        v-clickoutside="closeCustomOssUrl"
      >
        <div class="header"><p>自定义OSS服务器IP</p></div>
        <div class="content content--row">
          <p class="agreement" @click="changeOssAgreement">
            {{ ossAgreement }}
          </p>
          <input
            v-model="customOssUrl"
            placeholder="请输入OSS服务器IP:PORT"
            @keydown="enterOssUrlInput"
          />
        </div>
        <div class="buttonBox">
          <p @click="confirmCustomOssUrl">确定</p>
          <p @click="closeCustomOssUrl">取消</p>
        </div>
      </div>
      <div
        class="customUrlBox"
        v-if="languageDuplicateBoxShow"
        v-clickoutside="closeLanguageDuplicateBox"
      >
        <div class="header"><p>选择查重方案</p></div>
        <div class="content content--column">
          <!-- <p class="agreement" @click="changeOssAgreement">{{ ossAgreement }}</p>
        <input
          v-model="customOssUrl"
          placeholder="请输入OSS服务器IP:PORT"
          @keydown="enterOssUrlInput"
        /> -->
          <div class="languages">
            <p>基准语言：</p>
            <div class="items">
              <template v-for="(item, index) in $i18n.languages">
                <div
                  class="itemBox"
                  v-if="item.value != languageDuplicateOptions.checkLang"
                  :key="index"
                  @click="selectDuplicateStandardLang(item.value)"
                >
                  <div class="item">
                    <div class="radio">
                      <div
                        :class="[
                          item.value == languageDuplicateOptions.standardLang
                            ? 'selected'
                            : '',
                        ]"
                      ></div>
                    </div>
                    <p>{{ item.cname }}</p>
                  </div>
                </div>
                {{ "" }}
              </template>
            </div>
          </div>
          <div class="languages">
            <p>排查语言：</p>
            <div class="items">
              <template v-for="(item, index) in $i18n.languages">
                <div
                  class="itemBox"
                  v-if="item.value != languageDuplicateOptions.standardLang"
                  :key="index"
                  @click="selectDuplicateCheckLang(item.value)"
                >
                  <div class="item">
                    <div class="radio">
                      <div
                        :class="[
                          item.value == languageDuplicateOptions.checkLang
                            ? 'selected'
                            : '',
                        ]"
                      ></div>
                    </div>
                    <p>{{ item.cname }}</p>
                  </div>
                </div>
                {{ "" }}
              </template>
            </div>
          </div>
          <div class="filters">
            <div
              class="item"
              @click="
                languageDuplicateOptions.withPath =
                  !languageDuplicateOptions.withPath
              "
            >
              <div class="checkbox">
                <div
                  :class="[languageDuplicateOptions.withPath ? 'selected' : '']"
                ></div>
              </div>
              <p>携带I18N路径</p>
            </div>
            <div
              class="item"
              @click="
                languageDuplicateOptions.twoVersionFilter =
                  !languageDuplicateOptions.twoVersionFilter
              "
            >
              <div class="checkbox">
                <div
                  :class="[
                    languageDuplicateOptions.twoVersionFilter ? 'selected' : '',
                  ]"
                ></div>
              </div>
              <p>只显示存在两种或以上译文的项</p>
            </div>
            <div
              class="item"
              @click="
                languageDuplicateOptions.noRepeat =
                  !languageDuplicateOptions.noRepeat
              "
            >
              <div class="checkbox">
                <div
                  :class="[languageDuplicateOptions.noRepeat ? 'selected' : '']"
                ></div>
              </div>
              <p>排除译文相同的项</p>
            </div>
          </div>
        </div>
        <div class="buttonBox">
          <p @click="downloadLanguageDuplicate">下载</p>
          <p @click="closeLanguageDuplicateBox">取消</p>
        </div>
      </div>
      <div
        class="customUrlBox"
        v-if="languageNoTranslateBoxShow"
        v-clickoutside="closeLanguageNoTranslateBox"
      >
        <div class="header"><p>选择筛选方案</p></div>
        <div class="content content--column">
          <!-- <p class="agreement" @click="changeOssAgreement">{{ ossAgreement }}</p>
        <input
          v-model="customOssUrl"
          placeholder="请输入OSS服务器IP:PORT"
          @keydown="enterOssUrlInput"
        /> -->
          <div class="languages">
            <p>基准语言：</p>
            <div class="items">
              <template v-for="(item, index) in $i18n.languages">
                <div
                  class="itemBox"
                  v-if="item.value != languageNoTranslateOptions.checkLang"
                  :key="index"
                  @click="selectNoTranslateStandardLang(item.value)"
                >
                  <div class="item">
                    <div class="radio">
                      <div
                        :class="[
                          item.value == languageNoTranslateOptions.standardLang
                            ? 'selected'
                            : '',
                        ]"
                      ></div>
                    </div>
                    <p>{{ item.cname }}</p>
                  </div>
                </div>
                {{ "" }}
              </template>
            </div>
          </div>
          <div class="languages">
            <p>排查语言：</p>
            <div class="items">
              <template v-for="(item, index) in noTranslateSelections">
                <div
                  class="itemBox"
                  v-if="item.value != languageNoTranslateOptions.standardLang"
                  :key="index"
                  @click="selectNoTranslateCheckLang(item.value)"
                >
                  <div class="item">
                    <div class="radio">
                      <div
                        :class="[
                          item.value == languageNoTranslateOptions.checkLang
                            ? 'selected'
                            : '',
                        ]"
                      ></div>
                    </div>
                    <p>{{ item.cname }}</p>
                  </div>
                </div>
                {{ "" }}
              </template>
            </div>
          </div>
        </div>
        <div class="buttonBox">
          <p @click="downloadLanguageNoTranslate">下载</p>
          <p @click="closeLanguageNoTranslateBox">取消</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from "../common/utilsFromElement/clickoutside";
import config from "@/utils/config";
import RouterMode from "@/utils/routerMode";
import LoginMode from "@/utils/loginMode";
import {
  getLanguageJSONFile,
  getNoTranslateJSONFile,
  getDuplicateJSONFile,
} from "@/utils/languageJSON";
export default {
  directives: { Clickoutside },
  data() {
    return {
      labels: [
        "服务器",
        "OSS服务器",
        "路由模式",
        "登陆校验模式",
        "语言",
        "版本号",
      ],
      showSearch: false,
      searchKey: "",
      version: config.getShortVersion(),
      routerMode: RouterMode.routerSetting.getRouterMode(),
      loginMode: LoginMode.loginModeSetting.getLoginMode(),
      customUrl: "",
      customOssUrl: "",
      requestAgreement: "http://",
      ossAgreement: "http://",
      customUrlBoxShow: false,
      customOssUrlBoxShow: false,
      languageNoTranslateBoxShow: false,
      languageNoTranslateOptions: {
        standardLang: "",
        checkLang: "",
      },
      generatingLanguageNoTranslateList: false,
      languageDuplicateBoxShow: false,
      languageDuplicateOptions: {
        standardLang: "",
        checkLang: "",
        withPath: false,
        twoVersionFilter: false,
        noRepeat: false,
      },
      generatingLanguageDuplicateList: false,
      menuToggle: true,
      settingMenu: false,
      settingItems: [
        {
          title: "下载语言数据",
          icon: require("@/assets/testmenu/icon_language.svg"),
          click: () => {
            console.log(this.$i18n.languages);
            // getLanguageJSONFile();
          },
          show: false,
          customize: false,
          options: this.languageOptions(),
        },
        {
          title: "服务器",
          icon: require("@/assets/testmenu/icon_server.svg"),
          click: () => {},
          show: false,
          customize: true,
          options: this.serverOptions(),
          others: {
            customClick: this.showCustomUrl,
          },
        },
        {
          title: "OSS服务器",
          icon: require("@/assets/testmenu/icon_server.svg"),
          click: () => {},
          show: false,
          customize: true,
          options: this.ossServerOptions(),
          others: {
            customClick: this.showCustomOssUrl,
          },
        },
        {
          title: "切换路由模式",
          icon: require("@/assets/testmenu/icon_version.svg"),
          click: () => {},
          show: false,
          customize: false,
          options: this.routerModeOptions(),
        },
        {
          title: "切换登陆校验模式",
          icon: require("@/assets/testmenu/icon_version.svg"),
          click: () => {},
          show: false,
          customize: false,
          options: this.loginModeOptions(),
        },
      ],
    };
  },
  computed: {
    env() {
      return config.getEnv();
    },
    status() {
      let serverOptions = this.serverOptions();
      let requestObject = { title: "自定义IP", value: config.URL };
      for (let i = 0; i < serverOptions.length; i++) {
        if (serverOptions[i].value == config.URL) {
          requestObject = serverOptions[i];
        }
      }
      let ossServerOptions = this.ossServerOptions();
      let ossObject = { title: "自定义IP", value: config.ossURL };
      for (let i = 0; i < ossServerOptions.length; i++) {
        if (ossServerOptions[i].value == config.ossURL) {
          ossObject = ossServerOptions[i];
        }
      }
      return {
        requestObject,
        ossObject,
      };
    },
    languageText() {
      for (let i = 0; i < this.$i18n.languages.length; i++) {
        let item = this.$i18n.languages[i];
        if (item.value == this.$i18n.locale) {
          return item.cname;
        }
      }
      return "未检测到语言";
    },
    noTranslateSelections() {
      return [{ cname: "全部", value: "allLang" }, ...this.$i18n.languages];
    },
  },
  watch: {
    settingMenu(val) {
      if (!val) {
        for (let i = 0; i < this.settingItems.length; i++) {
          this.$set(this.settingItems, i, {
            ...this.settingItems[i],
            show: false,
          });
        }
      }
    },
  },
  methods: {
    searchAim(index) {
      if (!this.searchKey) return true;
      if (this.labels[index].indexOf(this.searchKey) != -1) return true;
      return false;
    },
    closeLanguageDuplicateBox() {
      this.languageDuplicateBoxShow = false;
    },
    downloadLanguageDuplicate() {
      if (this.generatingLanguageDuplicateList) {
        alert("正在生成上一个查重表，请稍后");
        return;
      }
      this.generatingLanguageDuplicateList = true;
      if (!this.languageDuplicateOptions.standardLang) {
        alert("请选择基准语言");
        return;
      }
      if (!this.languageDuplicateOptions.checkLang) {
        alert("请选择排查语言");
        return;
      }
      getDuplicateJSONFile(this.languageDuplicateOptions, () => {
        this.generatingLanguageDuplicateList = false;
      });
    },
    selectDuplicateStandardLang(lang) {
      this.$set(
        this.languageDuplicateOptions,
        "standardLang",
        this.languageDuplicateOptions.standardLang == lang ? "" : lang
      );
      if (this.languageDuplicateOptions.checkLang == lang) {
        this.$set(this.languageDuplicateOptions, "checkLang", "");
      }
    },
    selectDuplicateCheckLang(lang) {
      this.$set(
        this.languageDuplicateOptions,
        "checkLang",
        this.languageDuplicateOptions.checkLang == lang ? "" : lang
      );
      if (this.languageDuplicateOptions.standardLang == lang) {
        this.$set(this.languageDuplicateOptions, "standardLang", "");
      }
    },

    closeLanguageNoTranslateBox() {
      this.languageNoTranslateBoxShow = false;
    },
    downloadLanguageNoTranslate() {
      if (this.generatingLanguageNoTranslateList) {
        alert("正在生成上一个查重表，请稍后");
        return;
      }
      this.generatingLanguageNoTranslateList = true;
      if (!this.languageNoTranslateOptions.standardLang) {
        alert("请选择基准语言");
        return;
      }
      if (!this.languageNoTranslateOptions.checkLang) {
        alert("请选择排查语言");
        return;
      }
      getNoTranslateJSONFile(this.languageNoTranslateOptions, () => {
        this.generatingLanguageNoTranslateList = false;
      });
    },
    selectNoTranslateStandardLang(lang) {
      this.$set(
        this.languageNoTranslateOptions,
        "standardLang",
        this.languageNoTranslateOptions.standardLang == lang ? "" : lang
      );
      if (this.languageNoTranslateOptions.checkLang == lang) {
        this.$set(this.languageNoTranslateOptions, "checkLang", "");
      }
    },
    selectNoTranslateCheckLang(lang) {
      this.$set(
        this.languageNoTranslateOptions,
        "checkLang",
        this.languageNoTranslateOptions.checkLang == lang ? "" : lang
      );
      if (this.languageNoTranslateOptions.standardLang == lang) {
        this.$set(this.languageNoTranslateOptions, "standardLang", "");
      }
    },

    languageOptions() {
      let options = [
        {
          title: "未翻译的文案",
          icon: require("@/assets/testmenu/icon_language.svg"),
          callback: () => {
            console.log(this.$i18n.languages);
            this.languageNoTranslateBoxShow = true;
          },
        },
        {
          title: "文案查重",
          icon: require("@/assets/testmenu/icon_language.svg"),
          callback: () => {
            console.log(this.$i18n.languages);
            this.languageDuplicateBoxShow = true;
          },
        },
      ];
      for (let i = 0; i < this.$i18n.languages.length; i++) {
        let item = this.$i18n.languages[i];
        options.push({
          title: item.cname + "文案",
          attach: item.value,
          value: item.value,
          callback: () => getLanguageJSONFile(item.value),
        });
      }
      options.push({
        title: "全部语言文案",
        attach: "",
        value: "all",
        callback: () =>
          getLanguageJSONFile(
            this.$i18n.languages.map((item, index) => {
              return item.value;
            })
          ),
      });
      return options;
    },
    serverOptions() {
      return [
        {
          title: "罗焕",
          attach: this.getIP_PORT(config.urls.luohuanURL2),
          value: config.urls.luohuanURL2,
          callback: () => config.setURL(config.urls.luohuanURL2),
        },
        {
          title: "浩然",
          attach: this.getIP_PORT(config.urls.haoranURL),
          value: config.urls.haoranURL,
          callback: () => config.setURL(config.urls.haoranURL),
        },
        {
          title: "文杰",
          attach: this.getIP_PORT(config.urls.wenjieURL),
          value: config.urls.wenjieURL,
          callback: () => config.setURL(config.urls.wenjieURL),
        },
        {
          title: "豆豆",
          attach: this.getIP_PORT(config.urls.doudouURL),
          value: config.urls.doudouURL,
          callback: () => config.setURL(config.urls.doudouURL),
        },
        {
          title: "测试",
          attach: this.getIP_PORT(config.urls.testURL2),
          value: config.urls.testURL2,
          callback: () => config.setURL(config.urls.testURL2),
        },
      ];
    },
    ossServerOptions() {
      return [
        {
          title: "OSS_1",
          attach: this.getIP_PORT(config.urls.ossURL),
          value: config.urls.ossURL,
          callback: () => config.setOSSURL(config.urls.ossURL),
        },
      ];
    },
    routerModeOptions() {
      return [
        {
          title: "测试模式",
          attach: RouterMode.routerSetting.routerModes.testMode,
          value: RouterMode.routerSetting.routerModes.testMode,
          callback: () =>
            RouterMode.routerSetting.setRouterMode(
              RouterMode.routerSetting.routerModes.testMode
            ),
        },
        {
          title: "普通模式",
          attach: RouterMode.routerSetting.routerModes.permissionMode,
          value: RouterMode.routerSetting.routerModes.permissionMode,
          callback: () =>
            RouterMode.routerSetting.setRouterMode(
              RouterMode.routerSetting.routerModes.permissionMode
            ),
        },
      ];
    },
    loginModeOptions() {
      return [
        {
          title: "无登陆校验模式",
          attach: LoginMode.loginModeSetting.loginModes.noLoginMode,
          value: LoginMode.loginModeSetting.loginModes.noLoginMode,
          callback: () =>
            LoginMode.loginModeSetting.setLoginMode(
              LoginMode.loginModeSetting.loginModes.noLoginMode
            ),
        },
        {
          title: "登陆校验模式",
          attach: LoginMode.loginModeSetting.loginModes.hasLoginMode,
          value: LoginMode.loginModeSetting.loginModes.hasLoginMode,
          callback: () =>
            LoginMode.loginModeSetting.setLoginMode(
              LoginMode.loginModeSetting.loginModes.hasLoginMode
            ),
        },
      ];
    },
    toggleSetting() {
      this.settingMenu = !this.settingMenu;
    },
    closeAllMenu() {
      // 枚举置false
      this.settingMenu = false;
    },
    toggleOptions(index) {
      this.settingItems[index].click();
      for (let i = 0; i < this.settingItems.length; i++) {
        this.$set(this.settingItems, i, {
          ...this.settingItems[i],
          show: i == index && !this.settingItems[i].show,
        });
      }
    },

    enterUrlInput(event) {
      let e = event || window.event;
      if (e && e.keyCode == 13) {
        this.confirmCustomUrl();
      }
    },
    showCustomUrl() {
      this.customUrlBoxShow = true;
    },
    closeCustomUrl() {
      this.customUrl = "";
      this.customUrlBoxShow = false;
    },
    changeAgreement() {
      if (this.requestAgreement == "http://")
        this.requestAgreement = "https://";
      else if (this.requestAgreement == "https://")
        this.requestAgreement = "http://";
    },
    confirmCustomUrl() {
      config.setURL(this.requestAgreement + this.customUrl);
      this.closeCustomUrl();
    },

    enterOssUrlInput(event) {
      let e = event || window.event;
      if (e && e.keyCode == 13) {
        this.confirmCustomOssUrl();
      }
    },
    showCustomOssUrl() {
      this.customOssUrlBoxShow = true;
    },
    closeCustomOssUrl() {
      this.customOssUrl = "";
      this.customOssUrlBoxShow = false;
    },
    changeOssAgreement() {
      if (this.requestOssAgreement == "http://")
        this.requestOssAgreement = "https://";
      else if (this.requestOssAgreement == "https://")
        this.requestOssAgreement = "http://";
    },
    confirmCustomOssUrl() {
      config.setOSSURL(this.requestOssAgreement + this.customOssUrl);
      this.closeCustomOssUrl();
    },

    getIP_PORT(url) {
      return url.substring(url.lastIndexOf(".") + 1, url.length);
    },
  },
};
</script>

<style lang="scss" scoped>
.TestConfigBox--hiding {
  transform: translate(0, 100%);
}
.TestConfigBox {
  position: fixed;
  bottom: 0;
  border-top: 1px solid gray;
  left: 0;
  width: 100%;
  height: 30px;
  z-index: 1999;
  // opacity: 0.8;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  // background: gray;
  box-sizing: border-box;
  background-color: #f8f8f8;
  transition: 0.2s all;
  p {
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    height: 20px;
    text-align: justify;
    flex: 1;
    // white-space: nowrap;
    span {
      white-space: nowrap;
    }
  }
  .TestConfigInBox {
    position: relative;
    padding: 0 12px;
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .menuToggle {
      height: 20px;
      width: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      transform: translate(0, calc(-100% - 1px));
      background-color: #f8f8f8;
      cursor: pointer;
      border: 1px solid gray;
      border-bottom: 0px;
      .menuToggleIcon {
        width: 14px;
        transition: 0.2s all;
      }
      .menuToggleIcon--opening {
        transform: rotate(90deg);
      }
      .menuToggleIcon--closing {
        transform: rotate(-90deg);
      }
    }
    .statusBox {
      width: calc(100% - 40px);
      overflow: auto;
      display: flex;
      flex-direction: row;
      .statusItem + .statusItem {
        margin-left: 12px;
      }
      .statusItem {
        display: flex;
        flex-direction: row;
        align-items: center;
        .icon {
          width: 14px;
          height: 13px;
          margin-right: 4px;
        }
        .searchButton {
          white-space: nowrap;
          cursor: pointer;
          user-select: none;
          border: 1px solid #333333;
          padding: 0 2px
        }
        .searchInput {
          width: 130px;
        }
        .closeSearchButton {
          white-space: nowrap;
          cursor: pointer;
          user-select: none;
          // border-radius: 50%;
          width: 18px;
          height: 18px;
          line-height: 16px;
          overflow: hidden;
          border: 1px solid #333333;
        }
      }
    }
    .menu {
      display: flex;
      flex-direction: row;
      height: 100%;
      .coverBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        height: 100%;
        .icon {
          width: 14px;
          height: 13px;
          margin-right: 4px;
        }
      }
      .coverBox:hover {
      }
      .settingBox {
        display: flex;
        flex-direction: column;
        position: relative;
        p {
          user-select: none;
          white-space: nowrap;
        }
        .settingItems {
          position: absolute;
          bottom: 31px;
          right: -12px;
          .optionItem {
            position: relative;
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 30px;
            padding: 0 8px;
            background-color: #f8f8f8;
            border: 1px solid #dddddd;
            box-sizing: border-box;
            cursor: pointer;
            .optionItems {
              position: absolute;
              right: calc(100% + 1px);
              bottom: -1px;
            }
          }
          .optionItem--selected,
          .optionItem:hover {
            background-color: #f3f3f3;
          }
        }
      }
    }
    .customUrlBox {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #f8f8f8;
      border-radius: 2px;
      border: 1px solid #333333;
      display: flex;
      flex-direction: column;
      z-index: 2000;
      .header {
        border-bottom: 1px solid #333333;
        padding: 4px 0;
        p {
          width: 100%;
          text-align: center;
        }
      }
      .content--row {
        flex-direction: row;
        align-items: center;
      }
      .content--column {
        flex-direction: column;
        justify-content: center;
      }
      .content {
        display: flex;
        padding: 24px 18px;
        width: 250px;
        .agreement {
          margin-right: 4px;
          cursor: pointer;
          user-select: none;
        }
        .languages {
          display: flex;
          flex-direction: column;
          width: 100%;
          .items {
            text-align: left;
            max-width: 250px;
            letter-spacing: 6px;
            .itemBox {
              display: inline-block;
              .item {
                display: flex;
                flex-direction: row;
                align-items: center;
                cursor: pointer;
                .radio {
                  width: 10px;
                  height: 10px;
                  background-color: #fff;
                  border-radius: 10px;
                  border: 1px solid gray;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  div {
                    width: 6px;
                    height: 6px;
                    border-radius: 6px;
                    background-color: white;
                  }
                  .selected {
                    background-color: rgb(67, 96, 194);
                  }
                }
                p {
                  white-space: nowrap;
                  margin-left: 4px;
                  user-select: none;
                  letter-spacing: 0px;
                }
              }
            }
          }
        }
        .filters {
          display: flex;
          flex-direction: column;
          margin-top: 12px;
          .item {
            display: flex;
            flex-direction: row;
            align-items: center;
            cursor: pointer;
            .checkbox {
              width: 10px;
              height: 10px;
              background-color: #fff;
              border: 1px solid gray;
              display: flex;
              justify-content: center;
              align-items: center;
              div {
                width: 6px;
                height: 6px;
                background-color: white;
              }
              .selected {
                background-color: rgb(67, 96, 194);
              }
            }
            p {
              user-select: none;
              margin-left: 4px;
            }
          }
        }
      }
      .buttonBox {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-bottom: 8px;
        p + p {
          margin-left: 18px;
        }
        p {
          max-width: 80px;
          text-align: center;
          border: 1px solid #333333;
          cursor: pointer;
          user-select: none;
        }
      }
    }
    input {
      background: none;
      outline: none;
      border: none;
      margin: 0;
      padding: 0;
      width: 100%;
      // background: #000;
      font-size: 14px;
      line-height: 20px;
      // margin-left: 29px;
      border-bottom: 1px solid #333333;
    }
    input:disabled {
      color: #999999;
    }
    ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #c7c7c7;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #c7c7c7;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #c7c7c7;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #c7c7c7;
    }
  }
}
</style>