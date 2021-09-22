export default {
  liveList: (index, size, keyword) => `/admin/admin/list/listAdminLive?pageIndex=${index}&pageSize=${size}&${keyword?`query=${keyword}`:''}`,
  recordList: (studentId) => `/admin/admin/list/listAdminLiveRecord/${studentId}`,
}