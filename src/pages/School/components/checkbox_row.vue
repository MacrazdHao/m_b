<template>
  <div class="Checkbox">
    <div class="content">
      <template v-for="(item, index) in items">
        <div class="itemBox" :key="index" @click="setValue(index)">
          <div class="item">
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
        {{ "" }}
      </template>
    </div>
  </div>
</template>

<script>
export default {
  /*
    item: {
      value: any,
      name: string,
      selected: false,
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
        selected: false,
        ...item,
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
  width: 100%;
  p {
    margin: 0;
    color: #333333;
    font-size: 14px;
    line-height: 20px;
    white-space: nowrap;
    letter-spacing: 0;
    user-select: none;
  }
  .content {
    width: 100%;
    text-align: left;
    letter-spacing: 60px;
    .itemBox {
      display: inline-block;
      .item {
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        img {
          margin-right: 10px;
          width: 14px;
        }
      }
    }
  }
}
</style>