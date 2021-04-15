<template>
  <div class="Testing">
    <router-view />
  </div>
</template>

<script>
export default {
  props: ['test'],
  mounted() {
    console.log(this.test)
  }
}
</script>

<style lang="scss" scoped>
.Testing {

}
</style>