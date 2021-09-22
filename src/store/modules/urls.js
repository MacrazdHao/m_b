export default {
  moduleList: (index, size, keyword) => `/admin/cecp/template/listCecpTemplate?pageIndex=${index}&pageSize=${size}&${keyword?`query=${keyword}`:''}`,
  deleteModule: (templateId) => `/admin/cecp/template/${templateId}/deleteCecpTemplate`,
  moduleInfo: (templateId) => `/admin/cecp/template/${templateId}/getCecpTemplate`,
  editModuleInfo: '/admin/cecp/template/updateCecpTemplate',
  createTemplate: '/admin/cecp/template/addCecpTemplate',
}