<template>
  <div class="TestConfigBox" v-if="env == 'development'">
    <div class="statusBox">
      <div class="statusItem">
        <img class="icon" src="@/assets/testmenu/icon_server.svg" />
        <p>
          <span>{{
            `服务器：${status.requestObject.title}(${status.requestObject.value})`
          }}</span>
        </p>
      </div>
      <div class="statusItem">
        <img class="icon" src="@/assets/testmenu/icon_server.svg" />
        <p>
          <span>{{
            `OSS服务器：${status.ossObject.title}(${status.ossObject.value})`
          }}</span>
        </p>
      </div>
      <div class="statusItem">
        <img class="icon" src="@/assets/testmenu/icon_language.svg" />
        <p>
          <span>{{ `语言：${languageText}` }}</span>
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
        <p class="agreement" @click="changeAgreement">{{ requestAgreement }}</p>
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
        <p class="agreement" @click="changeOssAgreement">{{ ossAgreement }}</p>
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
                @click="selectStandardLang(item.value)"
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
                @click="selectCheckLang(item.value)"
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
  </div>
</template>

<script>
import Clickoutside from "../common/utilsFromElement/clickoutside";
import config from "@/utils/config";
import { getLanguageJSONFile, getDuplicateJSONFile } from "@/utils/languageJSON";
export default {
  directives: { Clickoutside },
  data() {
    return {
      customUrl: "",
      customOssUrl: "",
      requestAgreement: "http://",
      ossAgreement: "http://",
      customUrlBoxShow: false,
      customOssUrlBoxShow: false,
      languageDuplicateBoxShow: false,
      languageDuplicateOptions: {
        standardLang: "",
        checkLang: "",
        withPath: false,
        twoVersionFilter: false,
        noRepeat: false,
      },
      generatingLanguageDuplicateList: false,
      settingMenu: false,
      settingItems: [
        {
          title: "下载语言数据查重表",
          icon: require("@/assets/testmenu/icon_language.svg"),
          click: () => {
            console.log(this.$i18n.languages);
            // getLanguageJSONFile();
            this.languageDuplicateBoxShow = true;
          },
          show: false,
          customize: false,
          // options: this.languageOptions(),
        },
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
    selectStandardLang(lang) {
      this.$set(
        this.languageDuplicateOptions,
        "standardLang",
        this.languageDuplicateOptions.standardLang == lang ? "" : lang
      );
      if (this.languageDuplicateOptions.checkLang == lang) {
        this.$set(this.languageDuplicateOptions, "checkLang", "");
      }
    },
    selectCheckLang(lang) {
      this.$set(
        this.languageDuplicateOptions,
        "checkLang",
        this.languageDuplicateOptions.checkLang == lang ? "" : lang
      );
      if (this.languageDuplicateOptions.standardLang == lang) {
        this.$set(this.languageDuplicateOptions, "standardLang", "");
      }
    },

    languageOptions() {
      let options = [];
      for (let i = 0; i < this.$i18n.languages.length; i++) {
        let item = this.$i18n.languages[i];
        options.push({
          title: item.cname,
          attach: item.value,
          value: item.value,
          callback: () => getLanguageJSONFile(item.value),
        });
      }
      options.push({
        title: "全部语言",
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
  padding: 0 12px;
  box-sizing: border-box;
  background-color: #f8f8f8;
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
  .statusBox {
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
      }
      .settingItems {
        position: absolute;
        bottom: 30px;
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
</style>