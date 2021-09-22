export default {
  studentList: (index, size, keyword) => `/admin/estuary/list/listEstuaryStudent?pageIndex=${index}&pageSize=${size}&${keyword?`query=${keyword}`:''}`,
  studentConsultInfo: (recordId) => `/admin/estuary/${recordId}/getEstuaryStudent`,
  setConsultant: '/admin/estuary/updateEstuaryConsultor',
  setConsultTimes: '/admin/estuary/updateEstuaryConsultCount',
  setConsultInfo: '/admin/estuary/updateEstuaryStudent',
  playbackList: (index, size, keyword) => `/admin/estuary/list/listEstuaryStudent?pageIndex=${index}&pageSize=${size}&${keyword?`query=${keyword}`:''}`,
  studentPlayback: (recordId) => `/admin/estuary/list/${recordId}/listEstuaryRecordDetail`,
  studentLiveList: '/student/cecp/estuary/estuaryRecord',
  consultantLiveList: (index, size, status, keyword) => `/consultant/cecp/estuary/listStudent?pageIndex=${index}&pageSize=${size}&liveStatus=${status}&${keyword?`query=${keyword}`:''}`,
  consultantList: (index, size, keyword) => `/admin/consultor/list/listAdminConsultor?pageIndex=${index}&pageSize=${size}&${keyword?`query=${keyword}`:''}`,
  estuaryRecordDetail: (recordId) => `/admin/estuary/${recordId}/getEstuaryRecordDetail`,
}