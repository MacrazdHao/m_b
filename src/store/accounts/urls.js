export default {
  adminList: (index, size) => `/admin/adminUser/account/list?pageIndex=${index}&pageSize=${size}`,
  editAdminPassword: (userId) => `/admin/adminUser/account/${userId}/password`,
  deleteAdminAccount: (userId) => `/admin/adminUser/account/${userId}`,
  deleteAdminAccounts: '/admin/adminUser/account/batch',
  createAdminAccount: '/admin/register/account/create',
  createSchoolAccount: '/userAdmin/register/account/create',
  schoolList: (index, size) => `/admin/userAdmin/account/list?pageIndex=${index}&pageSize=${size}`,
  editSchoolPassword: (userId) => `/admin/userAdmin/account/${userId}/password`,
  deleteSchoolAccount: (userId) => `/admin/userAdmin/account/${userId}`,
  deleteSchoolAccounts: '/admin/userAdmin/account/batch',
  inviteCode: '/admin/consultor/inviteCodes',
}