export default {
  consultantList: (index, size, keyword) => `/admin/consultor/list/listAdminConsultor?pageIndex=${index}&pageSize=${size}&query=${keyword}`,
  deleteConsultant: (userId) => `/admin/consultor/${userId}/deleteAdminConsultor`,
}