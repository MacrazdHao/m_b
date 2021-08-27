export default {
  studentList: (index, size, keyword, nodeStage) => `userAdmin/cecp/studentList?pageIndex=${index}&pageSize=${size}&nodeStage=${nodeStage}&keyword=${keyword}`,
  templateList: '/user/admin/auth/school/listAuthSchoolTemplate',
  setStudentTemplate: '/user/admin/auth/school/addStudentCecpTemplate',
}