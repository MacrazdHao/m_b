export default {
  counselingList: (index, size, keyword, nodeType) => `/consultant/cecp/profileList?pageIndex=${index}&pageSize=${size}&nodeStage=${nodeType}&keyword=${keyword}`,
  studentDetail: (userId) => `/cecp/asteroid/${userId}/dataCollection`,
  studentSchedule: (userId) => `/admin/consultor/update/listConsultorLiveSchedule?studentId=${userId}`,
  // saveStudentDetail: () => '/cecp/asteroid/addDataCollection',
  saveStudentSchedule: (userId) => `/admin/consultor/update/updateConsultorLiveScheduleList?studentId=${userId}`,
  studentProfile: (data) => `/consultant/cecp/${data.userId}/profile?nodeId=${data.nodeId}`,
  studentProfileList: (userId) => `/consultant/cecp/${userId}/profileList`,
  saveStudentProfile: (userId) => `/consultant/cecp/${userId}/profile`,
  endLiveNode: (studentId) => `/cecp/onion/endOnionLiveNode/${studentId}`,
  studentCurrentLiveInfo: (studentId) => `/admin/consultor/getStudentOnionLiveInfo/${studentId}`,
  studentHistoryLiveList: (studentId) => `/cecp/instance/getStudentCecpInstantStatusAll/${studentId}`,
}