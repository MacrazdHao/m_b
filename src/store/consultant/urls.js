export default {
  consultantList: (index, size, keyword) => `/admin/consultor/list/listAdminConsultor?pageIndex=${index}&pageSize=${size}&${keyword?`query=${keyword}`:''}`,
  deleteConsultant: (userId) => `/admin/consultor/${userId}/deleteAdminConsultor`,
}