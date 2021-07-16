<template>
  <div class="Radio">
    <p class="label">{{ label }}：</p>
    <div
      :class="[
        'content',
        direction == 'column' ? 'content--column' : 'content--row',
      ]"
    >
      <div
        class="item"
        v-for="(item, index) in items"
        :key="index"
        @click="setValue(index)"
      >
        <div :class="['button', index == selected ? 'button--selected' : '']">
          <div class="button-in">
            <div></div>
          </div>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  /*
    item: {
      value: any,
      name: string,
    }
  */
  props: ["label", "direction", "data", "value"],
  data() {
    return {
      items: [
        {
          name: "item1",
          value: "1",
        },
        {
          name: "item2",
          value: "2",
        },
        {
          name: "item3",
          value: "3",
        },
        {
          name: "item4",
          value: "4",
        },
        {
          name: "item5",
          value: "5",
        },
        {
          name: "item5",
          value: "5",
        },
        {
          name: "item6",
          value: "6",
        },
      ],
      selected: -1,
    };
  },
  watch: {
    value(val) {
      if (this.items.length == 0 || this.value < 0) return;
      if (typeof val == "number") this.setValue(val);
    },
    data(val) {
      this.items = val;
    },
  },
  mounted() {
    this.items = this.data;
    if (this.items.length == 0 || this.value < 0) return;
    if (typeof this.value == "number") this.setValue(this.value);
  },
  methods: {
    setValue(index) {
      this.selected = index;
      this.$emit("setValue", this.items[this.selected]);
    },
  },
};
</script>

<style lang="scss">
.Radio {
  display: flex;
  flex-direction: row;
  p {
    margin: 0;
    color: #333333;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
  }
  .content--row {
    flex-direction: row;
    .item + .item {
      margin-left: 30px;
    }
  }
  .content--column {
    flex-direction: column;
    .item + .item {
      margin-top: 28px;
    }
  }
  .content {
    margin-left: 29px;
    display: flex;
    flex-wrap: wrap;
    max-width: 620px;
    .item {
      margin-right: 16px;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 22px;
        box-sizing: border-box;
        border: 3px solid #fff;
        transition: all 0.1s;
        .button-in {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 16px;
          width: 16px;
          box-sizing: border-box;
          border-radius: 16px;
          border: 1px solid #d9d9d9;
          transition: all 0.1s;
          div {
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background: #fff;
            transition: all 0.1s;
          }
        }
      }
      .button--selected {
        border: 3px solid #eff6ff;
        .button-in {
          border: 1px solid #4b78f6;
          div {
            width: 8px;
            height: 8px;
            border-radius: 8px;
            background: #4b78f6;
          }
        }
      }
      p {
        margin-left: 9px;
      }
    }
  }
}
</style>