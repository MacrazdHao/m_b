<template>
  <div class="Checkbox">
    <div class="content">
      <div
        class="item"
        v-for="(item, index) in items"
        :key="index"
        @click="setValue(index)"
      >
        <img
          :src="
            require(`@/assets/archives/icon_checkbox${
              item.selected ? '_selected' : ''
            }.svg`)
          "
        />
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
  props: ["data"],
  data() {
    return {
      items: [],
      selected: [],
    };
  },
  mounted() {
    this.data.forEach((item) => {
      this.items.push({
        ...item,
        selected: false,
      });
    });
  },
  methods: {
    setValue(index) {
      this.items[index].selected = !this.items[index].selected;
      this.$forceUpdate();
      let result = [];
      for (let i = 0; i < this.items.length; i++) {
        if (this.items[i].selected) {
          result.push(this.items[i].value);
        }
      }
      this.$emit("setValue", result);
    },
  },
};
</script>

<style lang="scss">
.Checkbox {
  display: flex;
  flex-direction: row;
  p {
    margin: 0;
    color: #333333;
    font-size: 14px;

    line-height: 20px;
    white-space: nowrap;
  }
  .content {
    // margin-left: 29px;
    display: flex;
    flex-direction: column;
    // flex-wrap: wrap;
    max-width: 620px;
    .item + .item {
      margin-top: 24px;
    }
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      img {
        margin-right: 3px;
        width: 14px;
      }
    }
  }
}
</style>