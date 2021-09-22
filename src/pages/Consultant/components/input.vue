<template>
  <div :class="['inputBox', focus ? 'inputBox--focus' : '']">
    <img class="icon" :src="icon" v-if="icon" @click="hide = !hide" />
    <input
      v-model="valueTmp"
      :placeholder="placeholder"
      :disabled="disabled || timer"
      :type="hide && passwordMode ? 'password' : ''"
      @focus="focus = true"
      @blur="focus = false"
    />
    <img
      class="viewer"
      :src="require(`@/assets/entry/${hide ? 'icon_hide' : 'icon_view'}.svg`)"
      v-if="viewer"
      @click="hide = !hide"
    />
    <el-date-picker
      class="timepicker"
      v-if="!disabled && timer"
      v-model="time"
      type="datetime"
      :picker-options="pickerOptions"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: [
    "value",
    "placeholder",
    "disabled",
    "passwordMode",
    "viewer",
    "icon",
    "timer",
  ],
  data() {
    return {
      valueTmp: "",
      hide: true,
      focus: false,
      time: "",
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
  watch: {
    valueTmp(val) {
      this.$emit("input", val);
    },
    time(val) {
      this.valueTmp = val;
      this.$emit("input", val);
    },
  },
  mounted() {
    this.valueTmp = this.value;
  },
};
</script>

<style lang="scss" scoped>
.inputBox {
  width: 100%;
  max-width: 620px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  padding: 7px 12px;
  transition: all 0.1s;
  position: relative;
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
  .icon {
    margin-right: 8px;
  }
  input {
    padding: 0;
    background: none;
    outline: none;
    border: none;
    margin: 0;
    width: 100%;
    font-size: 14px;
    color: #333333;
    line-height: 18px;
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
.inputBox--focus {
  border: 1px solid #4b78f6;
}
</style>