<template>
  <div class="Error">
    <transition name="slide-fade2">
      <router-view />
    </transition>
        <SButton
          class="button"
          :text="$t('global.goIndexButton')"
          theme="blue"
          @btnClick="goIndex"
        />
  </div>
</template>

<script>
import SButton from "@/components/common/button.vue";
export default {
  components: {
    SButton,
  },
  methods:{
    goIndex(){
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style lang="scss" scoped>
.Error {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  .button{
    margin-top: 50px;
    padding: 7px 17px;
  }
}
</style>