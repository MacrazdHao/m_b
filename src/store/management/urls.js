export default {
  counselingList: (index, size, keyword, nodeType) => `/consultant/cecp/profileList?pageIndex=${index}&pageSize=${size}&nodeType=${nodeType}&keyword=${keyword}`,
  studentDetail: (userId) => `/cecp/asteroid/${userId}/dataCollection`,
  studentSchedule: (userId) => `/admin/consultor/update/getConsultorLiveScheduleList?studentId=${userId}`,
  // saveStudentDetail: () => '/cecp/asteroid/addDataCollection',
  saveStudentSchedule: (userId) => `/admin/consultor/update/updateConsultorLiveScheduleList?studentId=${userId}`,
}