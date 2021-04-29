<template>
  <div :class="['Input', focus ? 'Input--focus' : '']">
    <input
      :style="customStyle || {}"
      :id="`input${time}`"
      v-model="valueTmp"
      :placeholder="placeholder"
      :disabled="disabled"
      :type="type"
      @focus="focus = true"
      @blur="focus = false"
    />
    <img v-if="copy" src="@/assets/archives/icon_copy.svg" @click="copy_info" />
  </div>
</template>

<script>
export default {
  props: [
    "value",
    "placeholder",
    "disabled",
    "copy",
    "copyTips",
    "copyErrTips",
    "customStyle",
    "type"
  ],
  data() {
    return {
      valueTmp: "",
      focus: false,
      time: Math.random().toString(36).slice(2),
    };
  },
  watch: {
    value(val) {
      this.valueTmp = val;
    },
    disabled(val) {
      if (!val) {
        setTimeout(() => {
          document.getElementById(`input${this.time}`).focus();
        });
      }
    },
    valueTmp(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    this.valueTmp = this.value;
  },
  methods: {
    copy_info() {
      let text = document.getElementById(`input${this.time}`);
      text.disabled = false;
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        window.getSelection().removeAllRanges();
        let range = document.createRange();
        range.selectNode(text);
        window.getSelection().addRange(range);
        if (document.execCommand("Copy")) {
          this.$message.message(this.copyTips);
        } else {
          this.$message.error(this.copyErrTips);
          this.showDownloadUrl = true;
        }
      } else {
        text.select();
        if (document.execCommand("Copy")) {
          this.$message.message(this.copyTips);
        } else {
          this.$message.error(this.copyErrTips);
          this.showDownloadUrl = true;
        }
        text.blur();
      }
      text.disabled = true;
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
  p {
    margin: 0;
    color: #333333;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }
  img {
    width: 14px;
    margin-left: 12px;
    cursor: pointer;
  }
  input {
    background: none;
    outline: none;
    border: none;
    margin: 0;
    width: 100%;
    // background: #000;
    font-size: 14px;
    line-height: 20px;
    // margin-left: 29px;
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
.Input--focus {
  border: 1px solid #4b78f6;
}
</style>