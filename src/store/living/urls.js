export default {
  startLive: (liveId) => `/live/liveroom/${liveId}/start`,
  stopLive: (liveId) => `/live/liveroom/${liveId}/stop`,
  getAgoraToken: (liveId) => `/live/liveroom/${liveId}/getToken`,
  getLiveInfo: (liveId) => `/live/liveroom/${liveId}/info`,
  changeMode: (liveId) => `/live/liveroom/${liveId}/mode`,
  editUserSilence: (liveId) => `/live/liveroom/${liveId}/silentStatus`,
  editMySilence: (liveId) => `/live/liveroom/${liveId}/myself/silentStatus`,
}