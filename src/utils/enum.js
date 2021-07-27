export default {
  // 服务端/本地 枚举值转换，避免改动时散乱，便于统一管理
  getLocalUserType(userType) {
    switch (userType) {
      case 1: return 1;
      case 2: return 2;
      case 3: return 3;
      case 4: return 4;
      case 10: return 10;
      case 11: return 11;
      default: return null;
    }
  },
  getServerUserType(userType) {
    switch (userType) {
      case 1: return 1;
      case 2: return 2;
      case 3: return 3;
      case 4: return 4;
      case 10: return 10;
      case 11: return 11;
      default: return null;
    }
  },
  getLocalStage(stage) {
    switch (stage) {
      case 11: return 11;
      case 12: return 12;
      case 13: return 13;
      case 21: return 21;
      default: return null;
    }
  },
  getServerStage(stage) {
    switch (stage) {
      case 11: return 11;
      case 12: return 12;
      case 13: return 13;
      case 21: return 21;
      default: return null;
    }
  },
  getLocalNodeType(nodeType) {
    switch (nodeType) {
      case 0: return 0;
      case 11: return 11;
      case 12: return 12;
      case 21: return 21;
      case 31: return 31;
      case 32: return 32;
      case 41: return 41;
      case 42: return 42;
      case 43: return 43;
      case 88: return 88;
      case 99: return 99;
      default: return -1;
    }
  },
  getServerNodeType(nodeType) {
    switch (nodeType) {
      case 0: return 0;
      case 11: return 11;
      case 12: return 12;
      case 21: return 21;
      case 31: return 31;
      case 32: return 32;
      case 41: return 41;
      case 42: return 42;
      case 43: return 43;
      case 88: return 88;
      case 99: return 99;
      default: return -1;
    }
  },
  getLocalLiveStatus(status) {
    switch (status) {
      case 1: return 1;
      case 0: return 0;
      case -1: return -1;
      default: return -2;
    }
  },
  getServerLiveStatus(status) {
    switch (status) {
      case 1: return 1;
      case 0: return 0;
      case -1: return -1;
      default: return -2;
    }
  },
}