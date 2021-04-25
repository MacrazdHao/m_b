<template>
  <div class="Dashboard">
    <StudentBoard v-if="userType == 0" />
    <SchoolBoard v-if="userType == 1" />
    <AdminBoard v-if="userType == 2" />
  </div>
</template>

<script>
import StudentBoard from "./board/student";
import SchoolBoard from "./board/school";
import AdminBoard from "./board/admin";
export default {
  components: {
    StudentBoard,
    SchoolBoard,
    AdminBoard
  },
  data() {
    return {
      userType: 2,
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