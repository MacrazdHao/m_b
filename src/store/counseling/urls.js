export default {
  stateInfo: '/cecp/instance/getCecpInstantStatus',
  baseInfo: '/cecp/asteroid/addDataCollection',
  consultStatus: '/cecp/onion/getOnionLiveInfo',
  currentProfile: (nodeId) => `/student/cecp/profile?nodeId=${nodeId}`,
  allConsultStageInfo: '/cecp/instance/getCecpInstantStatusAll',
}