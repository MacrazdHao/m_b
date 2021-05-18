<template>
  <div class="Living">
    <div class="header">
      <div class="statusBox">
        <LButton
          class="statusButton"
          theme="blue"
          :text="$tc('living.statusButton', status + 1)"
          @btnClick="startLive"
        />
        <div :class="['status', status == 1 ? 'status--start' : '']">
          <div class="dot"></div>
          <p>{{ $tc("living.statusText", status + 1) }}</p>
        </div>
      </div>
      <p class="title">职业发展咨询</p>
      <div class="userBox">
        <div class="userNum">
          <img src="@/assets/living/icon_user.svg" />
          <p>1</p>
        </div>
        <div class="user">
          <img src="@/assets/index/anna.jpg" />
          <p>
            纬英科技一手遮天一人之下万人之上财政大臣梁湛霞纬英科技一手遮天一人之下万人之上财政大臣梁湛霞纬英科技一手遮天一人之下万人之上财政大臣梁湛霞纬英科技一手遮天一人之下万人之上财政大臣梁湛霞
          </p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="menuBox">
        <div
          :class="['menuItem', mode == 1 ? 'menuItem--selected' : '']"
          @click="changeMode(1)"
        >
          <img
            :src="
              require(`@/assets/living/icon_camera${
                mode == 1 ? '_selected' : ''
              }.svg`)
            "
          />
          <p>{{ $t("living.menu.camera") }}</p>
        </div>
        <div
          :class="['menuItem', mode == 2 ? 'menuItem--selected' : '']"
          @click="changeMode(2)"
        >
          <img
            :src="
              require(`@/assets/living/icon_screen${
                mode == 2 ? '_selected' : ''
              }.svg`)
            "
          />
          <p>{{ $t("living.menu.screen") }}</p>
        </div>
        <div class="menuItem" @click="setting">
          <img :src="require(`@/assets/living/icon_setting.svg`)" />
          <p>{{ $t("living.menu.setting") }}</p>
        </div>
      </div>
      <div class="teacherLive">
        <div class="liveBox">
          <div class="openBox" v-show="!rtc.published">
            <p>{{ $t("living.cameraClosing") }}</p>
            <LButton
              class="cameraButton"
              theme="blue"
              :text="$t('living.cameraButton')"
            />
          </div>
          <div
            class="teacherVideo"
            id="teacherVideo"
            v-show="rtc.published"
          ></div>
        </div>
        <div class="voiceBox">
          <img src="@/assets/living/icon_volume.svg" />
          <div class="volume"></div>
        </div>
      </div>
      <div class="studentLive">
        <div class="liveBox">
          <div class="studentVideo" id="studentVideo"></div>
        </div>
        <div class="voiceBox">
          <img src="@/assets/living/icon_volume.svg" />
          <div class="volume"></div>
        </div>
      </div>
    </div>
    <check-box :visible="checkBoxShow" @checkFinish="checkFinish" />
    <setting-box
      :visible="settingBoxShow"
      @settingFinish="settingFinish"
      :curCamera="cameraId"
      :useCamera="useCamera"
      :useAudio="useAudio"
    />
  </div>
</template>

<script>
import LButton from "@/components/common/button";
import CheckBox from "./components/CheckBox";
import SettingBox from "./components/SettingBox";
import AgoraRTC from "agora-rtc-sdk";
export default {
  components: {
    LButton,
    CheckBox,
    SettingBox,
  },
  data() {
    return {
      username: "",
      hostId: "",

      roomId: "",
      status: 0,
      mode: 1,
      members: [],
      loading: null,
      checkBoxShow: true,
      settingBoxShow: false,
      useCamera: true,
      useAudio: true,
      cameraId: "",

      changingStatus: false,

      desktopMode: false,
      option: {
        appID: "f8cbf7d6086f44d8a7b68b988b02c12c",
        channel: "",
        uid: null,
        token: "",
      },
      // 直播参数
      rtc: {
        client: null,
        joined: false,
        published: false,
        localStream: null,
        remoteStreams: [],
        params: {},
      },
      rtcCharacter: "host",
    };
  },
  mounted() {
    this.roomId = this.$route.query.roomId;
    this.username = this.$store.state.user.userinfo.id;
    this.option.uid = this.$store.state.user.userinfo.id;
    console.log("本用户", this.username);
  },
  methods: {
    setting() {
      this.settingBoxShow = true;
    },
    // 设备(摄像头、麦克风)检测完成
    async checkFinish(cameraId) {
      this.loading = this.$loading({
        text: "数据加载中...",
      });
      this.checkBoxShow = false;
      console.log("摄像头id", cameraId);
      this.cameraId = cameraId;
      this.getInitInfo(() => {
        if (this.status) {
          this.joinRTC();
        } else {
          this.loading.close();
        }
      });
    },
    async settingFinish(useCamera, useAudio, cameraId) {
      // this.loading = this.$loading({
      //   text: "数据加载中...",
      // });
      this.settingBoxShow = false;
      this.useCamera = useCamera;
      this.useAudio = useAudio;
      this.cameraId = cameraId;
      // if (this.detailInfo.userId == this.hostId) {
      //   if (this.rtc.published) {
      //     if (useAudio) this.rtc.localStream.enableAudio();
      //     else this.rtc.localStream.disableAudio();
      //     if (useCamera) this.rtc.localStream.enableVideo();
      //     else this.rtc.localStream.disableVideo();
      //   }
      //   // if (useCamera || useAudio) this.changeMode();
      // }
      // this.loading.close();
    },

    startLive() {
      if (this.username != this.hostId) {
        this.$message.warning("您不是老师，无法进行操作");
        return;
      }
      this.$store
        .dispatch("living/startLive", this.roomId)
        .then((res) => {
          console.log("开启成功", res);
          this.$message.message("开启成功");
        })
        .catch((err) => {
          console.log("开启失败", err);
        });
    },

    getInitInfo(callback = () => {}) {
      let errCallback = () => {
        this.loading.close();
        this.$dialog.message("获取直播间信息失败，点击确定刷新重试", () => {
          history.go(0);
        });
      };
      this.$store
        .dispatch("living/getLiveInfo", this.roomId)
        .then((res) => {
          console.log("获取直播间信息成功", res);
          this.status = res.liveStatus ? 1 : 0;
          this.members = res.memberList;
          this.mode = res.mode;
          for (let i = 0; i < res.memberList.length; i++) {
            if (res.memberList[i].hostFlag) {
              this.hostId = res.memberList[i].userId;
              break;
            }
          }
          callback();
        })
        .catch((err) => {
          errCallback();
        });
    },

    // 移除远程RTC窗口
    removeView(id) {
      let player = document.getElementById("player_" + id);
      if (player) {
        player.remove();
      }
    },

    initRTC(callback = () => {}) {
      // 初始化直播
      console.log("初始化直播中", AgoraRTC);
      this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
      this.rtc.client.init(
        this.option.appID,
        () => {
          console.log("初始化成功");
          // 房间有人退出
          this.rtc.client.on("peer-leave", (evt) => {
            console.log("peer-leave", evt);
            const id = evt.uid;
            if (id != this.rtc.params.uid) {
              this.removeView(id);
            }
          });
          this.rtc.params = this.option;
          // 获取房间的他人窗口（多人直播窗口，或获取主播窗口）
          // 订阅远程流事件回调（加入房间）
          this.rtc.client.on("stream-added", (evt) => {
            console.log("流增加");
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            if (id !== this.rtc.params.uid) {
              this.rtc.client.subscribe(remoteStream, (err) => {
                console.log("订阅流失败", err);
              });
            }
            console.log("加入房间的用户uid: ", id);
          });
          // 获取远程流事件回调（获取他人视口）
          this.rtc.client.on("stream-subscribed", (evt) => {
            // 待修改
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            this.rtc.remoteStreams.push(remoteStream);
            if (this.username == this.hostId)
              remoteStream.play("teacherVideo", { fit: "contain" });
            else remoteStream.play("studentVideo", { fit: "contain" });
            console.log("订阅远程端口uid: ", id);
          });
          // 移除远程流事件回调（退出房间）
          this.rtc.client.on("stream-removed", (evt) => {
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            if (remoteStream.isPlaying()) {
              remoteStream.stop();
            }
            this.rtc.remoteStreams = this.rtc.remoteStreams.filter((stream) => {
              return stream.getId() !== id;
            });
            this.removeView(id);
            console.log("离开房间的用户uid: ", id);
          });
          // 该回调报告本地用户的上下行网络质量
          // this.rtc.client.on("network-quality", (evt) => {
          //   this.downlinkNetworkQuality = evt.downlinkNetworkQuality;
          //   this.uplinkNetworkQuality = evt.uplinkNetworkQuality;
          // });
          this.rtc.client.on("stream-published", (evt) => {
            // this.rtc.localStream.setVideoEncoderConfiguration({
            //   resolution: {
            //     width: 480,
            //     height: 360,
            //   },
            //   frameRate: {
            //     min: 15,
            //     max: 30,
            //   },
            //   bitrate: {
            //     min: 1000,
            //     max: 5000,
            //   },
            // });
          });
          callback();
        },
        (err) => {
          console.error("初始化失败", err);
        }
      );
    },
    // 接入RTC流（房间）
    joinRTC() {
      this.option.channel = this.roomId;
      this.initRTC(() => {
        // 加载直播
        this.rtc.client.setClientRole(
          this.rtcCharacter,
          (res) => {
            this.$store
              .dispatch("living/getAgoraToken", this.roomId)
              .then((res) => {
                console.log("获取声网token", res);
                this.option.token = res;
                this.rtc.client.join(
                  this.option.token || null,
                  this.option.channel,
                  this.option.uid || null,
                  (uid) => {
                    console.log(
                      "加入频道: " +
                        this.option.channel +
                        " success, uid: " +
                        uid
                    );
                    this.rtc.joined = true;
                    this.rtc.params.uid = uid;
                    console.log("远程数量:", this.rtc.remoteStreams.length);
                    this.loading.close();
                    this.changeMode(this.mode);
                  },
                  (err) => {
                    console.error("加入频道失败", err);
                  }
                );
              })
              .catch((err) => {
                console.log(err);
                this.$dialog.message("进入直播间失败，点击确定刷新重试", () => {
                  history.go(0);
                });
              });
          },
          (err) => {
            console.log(err);
            this.$dialog.message("进入直播间失败，点击确定刷新重试", () => {
              history.go(0);
            });
          }
        );
      });
    },
    changeMode(mode, fromWindow = false) {
      if (fromWindow) {
        if (this.username != this.hostId) {
          this.$message.message("您不是讲师，无权进行操作");
          return;
        }
        if (!this.useCamera) {
          this.useCamera = true;
        }
      }
      if (!this.status) {
        this.$message.message("请先开始直播");
        return;
      }
      this.mode = mode;
      // this.loadingCamera = true;
      // this.loadingCameraError = false;
      if (this.rtc.published && this.username == this.hostId) {
        this.desktopMode = !this.desktopMode;
        // Stop playing the local stream
        this.rtc.localStream.stop();
        // Close the local stream
        this.rtc.localStream.close();
        this.rtc.published = false;
        this.rtc.client.unpublish(this.rtc.localStream, (err) => {
          console.log("取消推流失败");
          console.error(err);
        });
      }
      // 主播创建本地流
      this.rtc.localStream = AgoraRTC.createStream({
        cameraId: this.cameraId,
        streamID: this.rtc.params.uid,
        audio: true,
        video: !this.desktopMode,
        screen: this.desktopMode,
        screenAudio: false,
      });
      // 初始化本地流
      this.rtc.localStream.init(
        () => {
          console.log("初始化本流成功");
          this.rtc.localStream.play(
            this.username == this.hostId ? "teacherVideo" : "studentVideo",
            { fit: "contain" }
          );
          this.rtc.client.publish(this.rtc.localStream, (err) => {
            console.log("publish failed");
            console.error(err);
            // this.loadingCamera = false;
            // this.loadingCameraError = true;
            // this.$message.error(
            //   "推送直播画面失败，请尝试进入设置重新开启摄像头"
            // );
            this.settingFinish(this.useCamera, this.useAudio, this.cameraId);
            // this.loadingLive = false;
          });
          if (this.useAudio) this.rtc.localStream.enableAudio();
          else this.rtc.localStream.disableAudio();
          if (this.useCamera) this.rtc.localStream.enableVideo();
          else this.rtc.localStream.disableVideo();
          this.rtc.published = true;
          // this.loadingCamera = false;
          // this.loadingLive = false;
          if (this.desktopMode) {
            // this.rtc.localStream.setScreenProfile("1080p_2");
            // this.rtc.localStream.setVideoProfile("1080p_2");
          }
          this.loading.close();
        },
        (err) => {
          console.error("初始化本地流失败 ", err);
          // alert("打开直播失败");
          // this.loadingCameraError = true;
          // this.loadingCamera = false;
          this.rtc.published = true;
          this.loading.close();

          this.$message({
            message: "推送直播画面失败，请尝试进入设置重新开启摄像头或切换模式",
            iconClass: "none",
            customClass: "live-message-view live-message-view--error",
          });
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.Living {
  display: flex;
  flex-direction: column;
  background-color: black;
  p {
    margin: 0;
  }
  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: 12px 20px;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: #171a1f;
    .statusBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: 30%;
      .statusButton {
        padding: 5px 21px;
        border-radius: 100px;
      }
      .status {
        display: flex;
        flex-direction: row;
        align-items: center;
        .dot {
          margin-left: 22px;
          background: #6a6b6e;
          width: 4px;
          height: 4px;
          border-radius: 4px;
        }
        p {
          margin-left: 4px;
          font-size: 14px;
          font-weight: 500;
          color: #6a6b6e;
          line-height: 20px;
        }
      }
      .status--start {
        .dot {
          background-color: #53c41b;
        }
        p {
          color: #ffffff;
        }
      }
    }
    .title {
      font-size: 16px;
      color: #ffffff;
      line-height: 22px;
    }
    .userBox {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      width: 30%;
      .userNum {
        display: flex;
        flex-direction: row;
        align-items: center;
        img {
          width: 20px;
        }
        p {
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
          margin-left: 8px;
        }
      }
      .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 30px;
        // max-width: 100px;
        width: 100%;
        img {
          width: 28px;
          height: 28px;
          border-radius: 28px;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          color: #ffffff;
          line-height: 20px;
          margin-left: 8px;
        }
      }
    }
  }
  .content {
    display: flex;
    flex-direction: row;
    height: 100%;
    margin-top: 4px;
    .menuBox {
      display: flex;
      flex-direction: column;
      width: 100%;
      background-color: #171a1f;
      width: 78px;
      .menuItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 13px 0;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.2s ease;
        img {
          width: 18px;
        }
        p {
          font-size: 14px;
          color: #cccccc;
          line-height: 20px;
          margin-top: 4px;
        }
      }
      .menuItem--selected {
        background-color: #2b2f38;
        p {
          color: #ffffff;
        }
      }
      .menuItem:hover {
        background-color: rgb(33, 37, 46);
      }
    }
    .teacherLive {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 56px;
      box-sizing: border-box;
      .liveBox {
        .openBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 57.778vh;
          background-color: #333333;
          p {
            font-size: 14px;
            color: #ffffff;
            line-height: 20px;
          }
          .cameraButton {
            margin-top: 20px;
            padding: 6px 11px;
            border-radius: 100px;
          }
        }
        .teacherVideo {
          height: 100%;
          min-height: 57.778vh;
          div {
            video {
              position: inherit;
            }
          }
        }
      }
      .voiceBox {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        img {
          width: 24px;
        }
      }
    }
    .studentLive {
      width: 22.083%;
      .liveBox {
        width: 100%;
        height: 20vh;
        background-color: #333333;
      }
      .voiceBox {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        img {
          width: 24px;
        }
      }
    }
  }
}
</style>