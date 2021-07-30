export default {
  schoolList: (index, size, keyword) => `/admin/org/school/list?pageIndex=${index}&pageSize=${size}&keyword=${keyword}`,
  schoolInfo: (orgId) => `/admin/org/${orgId}/list/getOrgAdmin`,
  studentList: (schoolId, index, size, nodeType, keyword) => `/admin/student/${schoolId}/listCecp?pageIndex=${index}&pageSize=${size}&nodeType=${nodeType}&keyword=${keyword}`,
  deleteSchool: (orgId) => `/admin/org/${orgId}/list/deleteOrgAdmin`,
  deleteStudent: (userId) => `/admin/user/student/${userId}/tenantId`,
}