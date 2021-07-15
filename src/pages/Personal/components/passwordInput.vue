<template>
  <div class="PasswordInput">
    <div :class="['inputBox', focus ? 'inputBox--focus' : '']">
      <input type="text" autocomplete="new-password" hidden />
      <input
        v-model="valueTmp"
        :placeholder="placeholder"
        :disabled="disabled"
        autocomplete="new-password"
        :style="{
          '-webkit-text-security': hide && passwordMode ? 'disc' : '',
          'text-security': hide && passwordMode ? 'disc' : '',
        }"
        @focus="focus = true"
        @blur="focus = false"
      />
      <img
        class="viewer"
        :src="require(`@/assets/entry/${hide ? 'icon_hide' : 'icon_view'}.svg`)"
        v-if="viewer"
        @click="hide = !hide"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["value", "placeholder", "disabled", "passwordMode", "viewer"],
  data() {
    return {
      valueTmp: "",
      hide: true,
      focus: false,
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
.PasswordInput {
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
  .inputBox {
    width: 100%;
    max-width: 620px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    border-radius: 2px;
    border: 1px solid #d9d9d9;
    padding: 8px 13px;
    transition: all 0.1s;
    input {
      padding: 0;
      background: none;
      outline: none;
      border: none;
      margin: 0;
      width: 100%;
      font-size: 14px;
      line-height: 20px;
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
}
</style>