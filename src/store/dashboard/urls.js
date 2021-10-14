export default {
  adminDashboardData: '/admin/dashboard/info',
  studentDashboardData: '/admin/dashboard/info',
  schoolDashboardData: '/user/school/admin/dashboard/info',
  consultantDashboardData: (timestamp) => `/admin/consultor/dashboard/info/${timestamp}`,
}