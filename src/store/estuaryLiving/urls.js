export default {
  startLive: (liveId) => `/consultant/cecp/estuary/${liveId}/start`,
  startRecord: `/admin/live/record/updateLayoutLiveRecordVideo`,
  stopLive: (liveId) => `/consultant/cecp/estuary/${liveId}/end`,
  getAgoraToken: (liveId) => `/live/liveroom/${liveId}/getToken`,
  getLiveInfo: (liveId) => `/consultant/cecp/estuary/${liveId}/info`,
  changeMode: (liveId) => `/consultant/cecp/estuary/${liveId}/mode`,
  editUserSilence: (liveId) => `/consultant/cecp/estuary/${liveId}/silentStatus`,
  editMySilence: (liveId) => `/consultant/cecp/estuary/${liveId}/myself/silentStatus`,
}