<template>
  <div class="Input">
    <p>{{ label }}：</p>
    <input v-model="valueTmp" :placeholder="placeholder" :disabled="disabled" />
  </div>
</template>

<script>
export default {
  props: ["label", "value", "placeholder", "disabled"],
  data() {
    return {
      valueTmp: "",
    };
  },
  watch: {
    valueTmp(val) {
      this.$emit("input", val);
    },
  },
  mounted() {
    this.valueTmp = this.value;
  },
};
</script>

<style lang="scss" scoped>
.Input {
  display: flex;
  flex-direction: row;
  align-items: center;
  p {
    margin: 0;
    color: #333333;
    font-size: 14px;
    
    line-height: 20px;
    white-space: nowrap;
  }
  input {
    background: none;
    outline: none;
    border: none;
    padding: 5px 12px;
    margin: 0;
    width: 100%;
    max-width: 620px;
    box-sizing: border-box;
    // background: #000;
    font-size: 14px;
    
    line-height: 20px;
    margin-left: 29px;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    transition: all 0.1s;
  }
  input:focus {
    border: 1px solid #4B78F6;
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