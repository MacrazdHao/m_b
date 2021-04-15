<template>
  <div class="Textarea">
    <p>{{ label }}：</p>
    <div :class="['textareaBox', focus ? 'textareaBox--focus' : '']">
      <textarea
        v-model="valueTmp"
        :placeholder="placeholder"
        @focus="tFocus"
        @blur="tBlur"
      />
      <p>{{ valueTmp.length }}/{{ maxLength }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["label", "value", "placeholder", "maxLength"],
  data() {
    return {
      valueTmp: "",
      focus: false,
    };
  },
  watch: {
    valueTmp(val, oldVal) {
      if (this.valueTmp > this.maxLength) {
        this.valueTmp = oldVal;
        return;
      }
      this.$emit("input", val);
    },
  },
  mounted() {
    this.valueTmp = this.value;
  },
  methods: {
    tFocus() {
      this.focus = true;
    },
    tBlur() {
      this.focus = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.Textarea {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  p {
    margin: 0;
    color: #333333;
    font-size: 14px;
    
    line-height: 20px;
    white-space: nowrap;
  }
  .textareaBox {
    border: 1px solid #d9d9d9;
    transition: all 0.1s;
    border-radius: 2px;
    padding: 6px 12px;
    max-width: 620px;
    min-height: 134px;
    width: 100%;
    margin-left: 29px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    p {
      text-align: right;
      font-size: 14px;
      
      color: #999999;
      line-height: 20px;
    }
    textarea {
      background: none;
      outline: none;
      border: none;
      resize: none;
      margin: 0;
      padding: 0;
      width: 100%;
      flex: 1;
      // background: #000;
      font-size: 14px;
      
      line-height: 20px;
      font-family: Arial;
    }
    textarea:focus {
      border: 0;
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
  .textareaBox--focus {
    border: 1px solid #537cf7;
  }
}
</style>