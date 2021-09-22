<template>
  <div
    :class="['Input', focusStatus ? 'Input--focus' : '']"
    v-Clickoutside="handleBlur"
  >
    <img class="labelIcon" v-if="icon" :src="icon" @click="copy_info" />
    <input
      :class="[hasUnit ? 'inputWithUnit' : '']"
      :ref="`input${time}`"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly || false || timer"
      :maxlength="maxLength"
      :type="type || 'text'"
      :max="maxNumber"
      :min="minNumber"
      v-bind:value="value"
      @click="openDatePicker"
      @keydown="enterEvent"
      @input="inputHandler"
      @focus="handleFocus"
      @blur="handleInputBlur"
    />
    <div class="unitText" v-if="hasUnit">
      <p>{{ unitText }}</p>
    </div>
    <el-date-picker
      class="timepicker"
      v-if="timer"
      v-show="false"
      v-model="timerValue"
      type="datetime"
      :picker-options="pickerOptions"
      ref="datePicker"
    >
    </el-date-picker>
    <img
      class="copyButton"
      v-if="copy"
      src="@/assets/archives/icon_copy.svg"
      @click="copy_info"
    />
    <p class="length" v-if="showLength && maxLength">
      {{ value.length }}/{{ maxLength }}
    </p>
    <div
      class="associate"
      ref="associate"
      v-if="associate && showList"
      @scroll="associateLoadMore"
    >
      <p class="loadTips" v-show="!value && !hasInitData">
        {{ noKeyText }}
      </p>
      <p class="loadTips" v-show="loading">
        {{ loadingText }}
      </p>
      <p class="loadTips" v-show="error && value">
        {{ errorText }}
      </p>
      <p
        class="loadTips"
        v-show="associateList.length == 0 && !loading && !error && value"
      >
        {{ emptyText }}
      </p>
      <div
        class="associate-item"
        v-for="(item, index) in associateList"
        :key="index"
        @click="handleSelect(index, item)"
      >
        <p>{{ item[associateItemTextField] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Clickoutside from "@/components/common/utilsFromElement/clickoutside";
export default {
  directives: { Clickoutside },
  props: [
    "icon",
    "value",
    "placeholder",
    "disabled",
    "readonly",
    "copy",
    "copyTips",
    "copyErrTips",
    "associate",
    "associateList",
    "associatePageInfo",
    "associateItemTextField",
    "loading",
    "error",
    "hasInitData",
    "noKeyText",
    "loadingText",
    "errorText",
    "emptyText",
    "maxLength",
    "showLength",
    "type",
    "maxNumber",
    "minNumber",
    "timer",
    "hasUnit",
    "unitText",
  ],
  data() {
    return {
      focusStatus: false,
      time: Math.random().toString(36).slice(2),
      showList: false,
      timerValue: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 24 * 60 * 60 * 1000;
        },
        shortcuts: [
          {
            text: this.$t("global.date.today"),
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: this.$t("global.date.yesterday"),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: this.$t("global.date.aweekago"),
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  computed: {
    _value() {
      return this.value;
    },
  },
  watch: {
    associateList(val) {
      // console.log("数据变更");
      setTimeout(() => {
        this.menuAnimate(this.$refs["associate"], false);
      }, 0);
    },
    timerValue(val) {
      this.valueTmp = val;
      this.$emit("input", val);
    },
  },
  mounted() {
    // console.log("input内部", this.associateList);
  },
  methods: {
    openDatePicker() {
      if (!this.timer) return;
      console.log(this.$refs.datePicker);
      this.$refs.datePicker.showPicker();
    },
    focus() {
      this.$refs[`input${this.time}`].focus();
    },
    blur() {
      this.handleBlur();
    },
    enterEvent(event) {
      this.$emit("keydown", event);
    },
    inputHandler(e) {
      this.$emit("input", e.target.value);
      this.showList = true;
    },
    copy_info() {
      let text = this.$refs[`input${this.time}`];
      text.disabled = false;
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        window.getSelection().removeAllRanges();
        let range = document.createRange();
        range.selectNode(text);
        window.getSelection().addRange(range);
        if (document.execCommand("Copy")) {
          this.$message.message({ text: this.copyTips });
        } else {
          this.$message.error({ text: this.copyErrTips });
          this.showDownloadUrl = true;
        }
      } else {
        text.select();
        if (document.execCommand("Copy")) {
          this.$message.message({ text: this.copyTips });
        } else {
          this.$message.error({ text: this.copyErrTips });
          this.showDownloadUrl = true;
        }
        text.blur();
      }
      text.disabled = true;
    },
    openMenu() {
      if (this.showList) return;
      this.showList = true;
      setTimeout(() => {
        this.menuAnimate(this.$refs["associate"], false);
      }, 0);
    },
    closeMenu() {
      if (!this.showList) return;
      this.menuAnimate(this.$refs["associate"], true);
      setTimeout(() => {
        this.showList = false;
      }, 100);
    },
    menuAnimate(element, hide) {
      if (!element) return;
      let _height = 34 * (this.associateList.length || 1) + 8;
      element.style.padding = "4px 0";
      let targetHeight = (_height > 212 ? 212 : _height) + "px";
      element.style.height = hide ? targetHeight : "0";
      element.style.padding = hide ? "4px 0" : "0";
      setTimeout(() => {
        element.style.height = hide ? "0" : targetHeight;
        element.style.padding = hide ? "0" : "4px 0";
      }, 0);
    },
    handleSelect(index, item) {
      this.$emit("handleSelect", index, item);
      this.$refs[`input${this.time}`].focus();
      // this.closeMenu();
    },
    handleFocus(e) {
      if (this.associate) this.openMenu();
      this.focusStatus = true;
      this.$emit("focus", e);
    },
    handleInputBlur(e) {
      this.$emit("blur", e);
    },
    handleBlur() {
      this.$refs[`input${this.time}`].blur();
      if (this.associate) this.closeMenu();
      this.focusStatus = false;
    },
    associateLoadMore(e) {
      if (
        e.target.scrollTop / 34 >= this.associateList.length - 6 &&
        this.associateList.length < this.associatePageInfo.dataNum
      ) {
        this.$emit("associateLoadMore", e);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.Input {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 12px;
  max-width: 620px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  transition: all 0.1s;
  border-radius: 2px;
  position: relative;
  .unitText {
    position: absolute;
    right: 0;
    top: 0;
    width: 42px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    border-left: 1px solid #d9d9d9;
    p {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
    }
  }
  .timepicker {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  p {
    margin: 0;
    color: #333333;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }
  .labelIcon {
    width: 12px;
    height: 12px;
    margin-right: 8px;
  }
  .copyButton {
    width: 14px;
    margin-left: 12px;
    cursor: pointer;
  }
  .length {
    font-size: 14px;
    color: #999999;
    line-height: 20px;
    margin-left: 12px;
  }
  .inputWithUnit {
    width: calc(100% - 42px);
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
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  input[type="number"] {
    -moz-appearance: textfield;
  }
  .associate {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: fit-content;
    max-height: 212px;
    overflow-y: auto;
    background-color: #fff;
    margin-top: 6px;
    // min-width: 120px;
    background: #ffffff;
    box-shadow: 0px 4px 8px 0px #e0e0e0;
    border-radius: 2px;
    // padding: 4px 0;
    // overflow: hidden;
    transition: all 0.2s;
    // height: 0;
    box-sizing: border-box;
    .associate-item {
      box-sizing: border-box;
      padding: 7px 12px;
      cursor: pointer;
      width: 100%;
      transition: all 0.2s;
      p {
        width: 100%;
        font-size: 14px;
        line-height: 20px;
        height: 20px;
      }
    }
    .associate-item:hover {
      background: #f1f4ff;
      p {
        color: #4b77f6;
      }
    }
    .loadTips {
      font-size: 14px;
      color: #d3d3d3;
      line-height: 34px;
      letter-spacing: normal;
      text-align: center;
    }
  }
}
.Input--focus {
  border: 1px solid #4b78f6;
}
</style>