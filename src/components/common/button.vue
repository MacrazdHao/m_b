<template>
  <div
    :class="['Button', disable ? 'disable' : theme]"
    :style="{ width, height, fontFamily, fontSize, lineHeight }"
    @click="btnClick"
  >
    <img v-if="icon" :src="icon" />
    <p>{{ text }}</p>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      default: "",
      type: String,
    },
    width: {
      default: "fit-content",
      type: String,
    },
    height: {
      default: "fit-content",
      type: String,
    },
    fontSize: {
      default: "14px",
      type: String,
    },
    fontFamily: {
      default: "AlibabaPuHuiTiR",
      type: String,
    },
    lineHeight: {
      default: "20px",
      type: String,
    },
    theme: {
      default: "white",
      type: String,
    },
    disable: {
      default: false,
      type: Boolean,
    },
    icon: {
      default: null,
      type: String,
    },
  },
  methods: {
    btnClick() {
      if (this.disable) return;
      this.$emit("btnClick");
    },
  },
};
</script>

<style lang="scss" scoped>
.Button {
  box-sizing: border-box;
  padding: 7px 30px;
  border-radius: 2px;
  transition: all 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  img {
    margin-right: 4px;
    width: 12px;
  }
  p {
    margin: 0;
    padding: 0;
    // font-size: 14px;
    // line-height: 20px;
    user-select: none;
    white-space: nowrap;
  }
}
.disable {
  border: 1px solid #999999;
  background-color: #999999;
  color: #fff;
}
.white {
  border: 1px solid #d9d9d9;
  background-color: #fff;
  color: #333333;
}
.white:hover {
  background-color: rgb(250, 250, 250);
}
.white:active {
  background-color: rgb(240, 240, 240);
}
.blue {
  border: 1px solid rgb(75, 119, 246);
  background-color: rgb(75, 119, 246);
  color: #ffffff;
}
.blue:hover {
  background-color: rgb(70, 114, 241);
}
.blue:active {
  background-color: rgb(60, 104, 231);
}
.wathat {
  border: 1px solid rgb(75, 119, 246);
  background-color: rgb(241, 244, 255);
  color: #4b77f6;
}
.wathat:hover {
  background-color: rgb(236, 239, 250);
}
.wathat:active {
  background-color: rgb(226, 229, 240);
}
.gray {
  border: 1px solid #eeeeee;
  background-color: rgb(250, 251, 252);
  color: #666666;
}
.gray:hover {
  background-color: rgb(245, 246, 247);
}
.gray:active {
  background-color: rgb(235, 236, 237);
}
.red {
  border: 1px solid rgb(255, 77, 79);
  background-color: rgb(255, 77, 79);
  color: #ffffff;
}
.red:hover {
  background-color: rgb(245, 72, 74);
}
.red:active {
  background-color: rgb(235, 62, 64);
}
</style>