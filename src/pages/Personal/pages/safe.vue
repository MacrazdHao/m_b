<template>
  <div class="Safe">
    <p class="title">{{ $t("personal.safe.title") }}</p>
    <div class="strengthBox">
      <p class="title">{{ $t("personal.safe.userTitle") }}</p>
      <div class="strength">
        <p class="tips">
          {{
            $t("personal.safe.strengthTips", {
              strength: $tc("personal.safe.strength", strengthLevel),
            })
          }}
        </p>
        <p class="edit" @click="showResetBox = true">修改</p>
      </div>
    </div>
    <ResetBox :visible="showResetBox" @closeBtn="showResetBox = false" />
  </div>
</template>

<script>
import ResetBox from "../components/resetBox";
export default {
  components: {
    ResetBox,
  },
  data() {
    return {
      strengthLevel: 1,
      showResetBox: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.Safe {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  p {
    margin: 0;
  }
  .title {
    font-size: 20px;
    color: #333333;
    line-height: 27px;
  }
  .strengthBox {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 30px;
    width: 100%;
    .title {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
    }
    .strength {
      margin-top: 10px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-bottom: 14px;
      width: 100%;
      min-width: 200px;
      max-width: 540px;
      border-bottom: 1px solid #d3d3d3;
      .tips {
        font-size: 14px;
        color: #999999;
        line-height: 20px;
      }
      .edit {
        font-size: 14px;
        color: #4b77f6;
        line-height: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>