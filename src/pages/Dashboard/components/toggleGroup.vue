<template>
  <div class="ToggleGroup">
    <div
      :class="['item', toggle == index ? 'item--selected' : '']"
      v-for="(item, index) in items"
      :key="index"
      @click="itemClick(item.callback, index)"
    >
      <p>{{ item.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0,
    },
    items: {
      // {text,callback}
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      toggle: 0,
    };
  },
  watch: {
    toggle(val) {
      this.$emit("toggleChanged", val);
    },
  },
  mounted() {
    this.toggle = this.value;
  },
  methods: {
    itemClick(callback, index) {
      this.toggle = index;
      callback();
    },
  },
};
</script>

<style lang="scss" scoped>
.ToggleGroup {
  display: flex;
  flex-direction: row;
  border-radius: 2px;
  border: 1px solid #dddfe6;
  overflow: hidden;
  width: fit-content;
  p {
    margin: 0;
  }
  .item {
    padding: 6px 16px;
    cursor: pointer;
    transition: all 0.2s;
    p {
      font-size: 12px;
      line-height: 17px;
      color: #333333;
      white-space: nowrap;
    }
  }
  .item:hover {
    background: rgb(252, 252, 255);
  }
  .item--selected:hover,
  .item--selected {
    background: #f1f4ff;
    p {
      color: #4b77f6;
    }
  }
  .item + .item {
    border-left: 1px solid #dddfe6;
  }
}
</style>