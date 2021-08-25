export default {
  schoolList: (index, size, keyword) => `/admin/org/school/list?pageIndex=${index}&pageSize=${size}&keyword=${keyword}`,
  schoolInfo: (orgId) => `/admin/org/${orgId}/list/getOrgAdmin`,
  studentList: (schoolId, index, size, nodeType, keyword) => `/admin/student/${schoolId}/listCecp?pageIndex=${index}&pageSize=${size}&nodeType=${nodeType}&keyword=${keyword}`,
  deleteSchool: (orgId) => `/admin/org/${orgId}/list/deleteOrgAdmin`,
  deleteStudent: (userId) => `/admin/student/${userId}/tenantId`,
  getSchoolTemplate: (schoolId) => `/admin/auth/school/${schoolId}/getSchoolAuth`,
  updateSchoolTemplate: "/admin/auth/school/updateSchoolAuth",
  schoolTemplateList: (schoolId) => `/admin/auth/school/${schoolId}/getSchoolAuth`,
  schoolTemplateAllocateList: (schoolId) => `/admin/auth/school/${schoolId}/getSchoolAuthAllTemplate`,
  saveSchoolTemplateAllocate: '/admin/auth/school/updateSchoolAuth',
  studentReportList: (userId) => `/admin/cecp/${userId}/profileList`,
  studentReport: (userId, nodeId) => `admin/cecp/${userId}/profile?nodeId=${nodeId}`,
}