<template>
  <div
    :class="[
      'Selector',
      border ? 'Selector--border' : '',
      border && menuFocus ? 'Selector--focus' : '',
    ]"
  >
    <FixedMenu
      class="dropper"
      :text="indexTmp < 0 ? placeholder : items[indexTmp || 0].text"
      :menu="optionsMenu"
      :showIcon="true"
      :iconUrl="require('@/assets/index/icon_pull_gray.svg')"
      :mouseMoveHide="false"
      :iconStyle="{
        width: '12px',
        height: '6px',
      }"
      :maxHeight="listItemNum * itemHeight + 4"
      :singleItemHeight="itemHeight"
      :overScroll="true"
      :minWidth="minWidth || 120"
      @focus="handleFocus"
      @blur="handleBlur"
    />
  </div>
</template>

<script>
import FixedMenu from "@/components/common/fixedMenu.vue";
/*
  optionsMenu: [{
    text: String
  }]
*/
export default {
  props: [
    "items",
    "border",
    "index",
    "placeholder",
    "singleItemHeight",
    "showNum",
    "minWidth",
  ],
  components: {
    FixedMenu,
  },
  data() {
    return {
      indexTmp: -1,
      optionsMenu: [],
      menuFocus: false,
    };
  },
  watch: {
    index(val) {
      if (val != this.indexTmp) {
        this.indexTmp = val;
      }
    },
  },
  computed: {
    listItemNum() {
      return this.showNum || 4;
    },
    itemHeight() {
      return this.singleItemHeight || 34;
    },
  },
  mounted() {
    this.indexTmp = this.index;
    for (let i = 0; i < this.items.length; i++) {
      let tmp = { text: "", callback: this.handleSelect };
      tmp.text = this.items[i].text;
      this.optionsMenu.push(tmp);
    }
  },
  methods: {
    handleSelect(info, index) {
      this.indexTmp = index;
      this.$emit("handleSelect", index);
    },
    handleFocus(e) {
      this.menuFocus = true;
    },
    handleBlur(e) {
      this.menuFocus = false;
    },
  },
};
</script>

<style lang="scss">
.Selector {
  .dropper {
    .titleBox {
      .title {
        color: #333333 !important;
      }
    }
    .coverBox {
      left: -13px;
      // left: 50%;
      // right: 0 !important;
      // transform: translate(-50%, 100%) !important;
      .menuBox {
        margin-top: 9px !important;
      }
    }
  }
}
.Selector--border {
  .dropper {
    width: 100% !important;
    .titleBox {
      display: flex;
      flex-direction: row;
      .title {
        flex: 1;
        text-align: left;
      }
    }
    .coverBox {
      // width: calc(100% + 24px) !important;
      .menuBox {
        width: 100% !important;
        // min-width: 100% !important;
        .menu-item {
          p {
            text-align: left;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.Selector {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #fff;
  p {
    margin: 0;
  }
  .pullIcon {
    margin-left: 8px;
  }
}
.Selector--border {
  padding: 5px 12px;
  max-width: 620px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  transition: all 0.1s;
  border-radius: 2px;
}
.Selector--focus {
  border: 1px solid #4b78f6;
}
</style>