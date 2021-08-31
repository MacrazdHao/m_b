<template>
  <div class="ScopeDate">
    <el-date-picker
      v-model="time"
      type="datetime"
      :disabled="disabled"
      :readonly="readonly"
      :placeholder="placeholder"
      :editable="false"
      @change="handleChange"
    >
    </el-date-picker>
  </div>
</template>

<script>
export default {
  props: ["value", "placeholder", "readonly", "disabled"],
  data() {
    return {
      time: "",
    };
  },
  watch: {
    value(val) {
      if (this.value) {
        this.time = new Date(this.value);
      }
    },
  },
  mounted() {
    if (this.value) {
      this.time = "";
    }
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e);
    },
  },
};
</script>

<style lang="scss">
.ScopeDate {
  .el-date-editor {
    padding: 0;
    height: 32px;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
    border-radius: 2px;
    // border: 1px solid #d9d9d9;
    .el-input__inner {
      text-align: left;
      padding-left: 12px;
      padding-right: 12px;
      flex: 1;
      height: 32px;
      border-radius: 2px;
      border: 1px solid #d9d9d9;
      // border: 0;
    }
    .el-input__inner:hover,
    .el-input__inner:active {
      border-color: #4b77f6;
    }
    .el-input__icon {
      display: none;
    }
    .separatorIcon {
      display: flex;
      flex-direction: row;
      align-items: center;
      img {
        width: 14px;
        height: 6px;
      }
    }
  }
}
</style>