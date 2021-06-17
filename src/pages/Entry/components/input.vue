<template>
  <div class="input">
    <img
      class="label"
      :src="require(`@/assets/entry/${iconName}.svg`)"
      v-if="iconName"
    />
    <input
      v-model="valueTmp"
      :placeholder="placeholder"
      :type="hide && passwordMode ? 'password' : ''"
      :autocomplete="autocomplete"
    />
    <img
      class="viewer"
      :src="require(`@/assets/entry/${hide ? 'icon_hide' : 'icon_view'}.svg`)"
      v-if="viewer"
      @click="hide = !hide"
    />
  </div>
</template>

<script>
export default {
  props: ["iconName", "placeholder", "passwordMode", "viewer", "autocomplete"],
  data() {
    return {
      valueTmp: "",
      hide: true,
    };
  },
  watch: {
    valueTmp(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.input {
  width: 100%;
  height: 2.083vw;
  min-height: 21px;
  // padding-top: 0.625vw;
  // padding-bottom: 0.625vw;
  padding-left: 1.042vw;
  padding-right: 1.042vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0.2083vw;
  border: 1px solid #d3d3d3;
  img {
    width: 0.625vw;
    min-width: 12px;
  }
  .label {
    margin-right: 0.625vw;
  }
  .viewer {
    margin-left: 0.625vw;
    cursor: pointer;
  }
  input {
    background: none;
    outline: none;
    border: none;
    padding: 0;
    margin: 0;
    width: 100%;
    // background: #000;
    font-size: 0.625vw;
  }
  input:focus {
    border: none;
  }
}
</style>