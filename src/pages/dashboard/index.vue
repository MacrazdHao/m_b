<template>
  <div class="Dashboard">
    <StudentBoard v-if="userType == 0" />
    <SchoolBoard v-if="userType == 1" />
  </div>
</template>

<script>
import StudentBoard from "./board/student";
import SchoolBoard from "./board/school";
export default {
  components: {
    StudentBoard,
    SchoolBoard
  },
  data() {
    return {
      userType: 1,
    };
  },
};
</script>

<style lang="scss" scoped>
.Dashboard {
  p {
    margin: 0;
  }
}
</style>