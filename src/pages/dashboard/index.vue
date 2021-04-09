<template>
  <div class="Dashboard">
    <div class="infoBox" v-if="userType==0">
      <div class="info-item">
        <p class="title">关于我</p>
        <div class="progress">
          <p>进度</p>
          <el-progress :color="customColor"></el-progress>
        </div>
        <div class="content">
          <div class="content-item content-">
            <p>基本信息</p>
            <img :src="require(`@/assets/index/icon_pull.svg`)" />
          </div>
          <div>
            <p>学术表现</p>
            <img :src="require(`@/assets/index/icon_pull.svg`)" />
          </div>
          <div>
            <p>个性爱好</p>
            <img :src="require(`@/assets/index/icon_pull.svg`)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userType: 0
    }
  }
};
</script>

<style lang="scss" scoped>
.Dashboard {
  .infoBox {
    .info-item {
      
    }
  }
}
</style>