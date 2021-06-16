<template>
  <div class="Living">
    <div class="header">
      <div class="statusBox">
        <LButton
          class="statusButton"
          theme="blue"
          :text="$tc('living.statusButton', status + 1)"
          @btnClick="toggleLive"
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
          <p>{{ userNum }}</p>
        </div>
        <div class="user">
          <img :src="$_default.avatar" />
          <p>
            {{ $store.state.user.userinfo.nickName }}
          </p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="menuBox">
        <div
          :class="['menuItem', mode == 1 ? 'menuItem--selected' : '']"
          @click="changeMode(1, true)"
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
          @click="changeMode(2, true)"
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
          <div
            class="openBox"
            v-show="
              (username == hostId && !rtc.published) ||
              (!useCamera && username == hostId && rtc.published)
            "
          >
            <p>{{ $t("living.cameraClosing") }}</p>
            <LButton
              class="cameraButton"
              theme="blue"
              :text="$t('living.cameraButton')"
              @btnClick="openCamera"
            />
          </div>
          <div
            class="openBox"
            v-show="rtc.remoteStreams.length == 0 && username != hostId"
          >
            <p>稍等片刻，导师正在赶来...</p>
          </div>
          <div
            class="openBox"
            v-show="
              rtc.remoteStreams.length > 0 &&
              username != hostId &&
              remoteMuteVideo
            "
          >
            <p>导师已关闭视频画面</p>
          </div>
          <div
            class="teacherVideo"
            id="teacherVideo"
            v-show="
              ((localVideoFinished && username == hostId) ||
                (remoteVideoFinished && username != hostId)) &&
              ((rtc.published && username == hostId && useCamera) ||
                (rtc.remoteStreams.length > 0 &&
                  username != hostId &&
                  !remoteMuteVideo))
            "
          ></div>
        </div>
        <div class="voiceBox">
          <img
            v-if="
              (hostId != username && !remoteMuteAudio) ||
              (hostId == username && !localMuteAudio)
            "
            src="@/assets/living/icon_volume.svg"
            @click="toggleAudio(0)"
          />
          <img
            v-else-if="
              (hostId != username && remoteMuteAudio) ||
              (hostId == username && localMuteAudio)
            "
            src="@/assets/living/icon_volume_closed.svg"
            @click="toggleAudio(0)"
          />
          <div
            class="volume"
            v-show="
              (hostId != username && rtc.remoteStreams.length > 0) ||
              (hostId == username && rtc.published)
            "
          >
            <div
              :class="[
                'volume-item',
                (hostId == username ? localVolume : remoteVolume) >= item
                  ? 'volume-item--green'
                  : '',
              ]"
              v-for="item in 10"
              :key="item"
            ></div>
          </div>
        </div>
      </div>
      <div class="studentLive">
        <div class="liveBox">
          <div
            class="openBox"
            v-show="
              (username != hostId && !rtc.published) ||
              (!useCamera && username != hostId && rtc.published)
            "
          >
            <p>{{ $t("living.cameraClosing") }}</p>
            <LButton
              class="cameraButton"
              theme="blue"
              :text="$t('living.cameraButton')"
              @btnClick="openCamera"
            />
          </div>
          <div
            class="openBox"
            v-show="rtc.remoteStreams.length == 0 && username == hostId"
          >
            <p>稍等片刻，学生马上到...</p>
          </div>
          <div
            class="openBox"
            v-show="
              rtc.remoteStreams.length > 0 &&
              username == hostId &&
              remoteMuteVideo
            "
          >
            <p>学生已关闭视频画面</p>
          </div>
          <div
            class="studentVideo"
            id="studentVideo"
            v-show="
              (((localVideoFinished && username != hostId) ||
                (remoteVideoFinished && username == hostId)) &&
                rtc.published &&
                username != hostId &&
                useCamera) ||
              (rtc.remoteStreams.length > 0 &&
                username == hostId &&
                !remoteMuteVideo)
            "
          ></div>
        </div>
        <div class="voiceBox">
          <img
            v-if="
              (hostId != username && !localMuteAudio) ||
              (hostId == username && !remoteMuteAudio)
            "
            src="@/assets/living/icon_volume.svg"
            @click="toggleAudio(1)"
          />
          <img
            v-else-if="
              (hostId != username && localMuteAudio) ||
              (hostId == username && remoteMuteAudio)
            "
            src="@/assets/living/icon_volume_closed.svg"
            @click="toggleAudio(1)"
          />
          <div
            class="volume"
            v-show="
              (hostId == username && rtc.remoteStreams.length > 0) ||
              (hostId != username && rtc.published)
            "
          >
            <div
              :class="[
                'volume-item',
                (hostId != username ? localVolume : remoteVolume) >= item
                  ? 'volume-item--green'
                  : '',
              ]"
              v-for="item in 10"
              :key="item"
            ></div>
          </div>
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
      userNum: 0,
      mode: 1,
      members: [],
      loading: null,
      checkBoxShow: true,
      settingBoxShow: false,
      useCamera: true,
      useAudio: true,
      cameraId: "",

      changingStatus: false,

      initingRTC: false,
      waitingPublish: false,
      loadingVideo: false,
      loadingLocalAudio: false,
      loadingRemoteAudio: false,
      desktopMode: false,
      option: {
        appID: "f8cbf7d6086f44d8a7b68b988b02c12c",
        channel: "",
        uid: null,
        token: "",
      },
      remoteVideoFinished: false,
      localVideoFinished: false,
      remoteMuteVideo: false,
      remoteMuteAudioActively: false,
      remoteMuteAudio: false,
      localMuteAudio: false,
      localAudioInterval: null,
      localVolume: 0,
      remoteVolume: 0,
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
  watch: {
    useAudio(val) {
      // 与画面的音频状态同步
      this.localMuteAudio = !val;
    },
    localMuteAudio(val) {
      // 与设置的音频状态同步
      this.useAudio = !val;
    },
  },
  mounted() {
    this.roomId = this.$route.query.roomId;
    this.username = this.$store.state.user.userinfo.id;
    this.option.uid = this.$store.state.user.userinfo.id;
    console.log("本用户", typeof this.option.uid);
    this.getInitInfo(() => {});
  },
  methods: {
    setting() {
      if (
        this.changingStatus ||
        this.initingRTC ||
        this.loadingVideo ||
        this.waitingPublish
      ) {
        this.$message.message("模式切换中或直播加载中，无法打开设置");
        return;
      }
      this.settingBoxShow = true;
    },
    // 设备(摄像头、麦克风)检测完成
    async checkFinish(cameraId) {
      this.loading = this.$loading({
        text: "数据加载中...",
      });
      this.userNum = 1;
      this.checkBoxShow = false;
      this.cameraId = cameraId;
      if (
        this.username != this.hostId ||
        (this.username == this.hostId && this.status)
      ) {
        // 未开始直播时，学生会先进入RTC房间，但老师不会，作用是利用stream-added事件实时监听何时开始直播
        this.joinRTC();
      } else {
        this.loading.close();
      }
    },
    async settingFinish(useCamera, useAudio, cameraId) {
      this.loading = this.$loading({
        text: "数据加载中...",
      });
      this.settingBoxShow = false;
      this.useCamera = useCamera;
      this.useAudio = useAudio;
      this.cameraId = cameraId;
      if (this.rtc.published) {
        if (useAudio) {
          this.rtc.localStream.enableAudio();
          this.localMuteAudio = false;
        } else {
          this.rtc.localStream.disableAudio();
          this.localMuteAudio = true;
        }
        if (useCamera) {
          this.rtc.localStream.enableVideo();
        } else this.rtc.localStream.disableVideo();
      }
      this.loading.close();
    },
    openCamera() {
      if (!this.status) {
        this.$message.error("还未开始直播，请在直播开始后再试");
        return;
      }
      this.setting();
    },

    toggleLive() {
      if (this.username != this.hostId) {
        this.$message.warning("您不是老师，无法进行操作");
        return;
      }
      if (
        this.changingStatus ||
        this.initingRTC ||
        this.loadingVideo ||
        this.waitingPublish
      ) {
        this.$message.warning("直播状态变更中，请稍后再试");
        return;
      }
      this.changingStatus = true;
      if (this.status) {
        this.$dialog.warning(
          "当前正在直播，确定结束直播？",
          () => {
            this.$store
              .dispatch(`living/stopLive`, this.roomId)
              .then((res) => {
                console.log(res);
                this.status = !this.status;
                if (!this.status && this.username == this.hostId) {
                  if (this.rtc.remoteStreams.length > 0) {
                    this.rtc.remoteStreams[0].stop();
                    this.rtc.remoteStreams[0].close();
                    this.rtc.remoteStreams = [];
                  }
                  this.rtc.localStream.stop();
                  this.rtc.localStream.close();
                  this.rtc.client.unpublish(this.rtc.localStream, (err) => {
                    console.log("unpublish失败", err);
                  });
                  this.rtc.published = false;
                  this.rtc.client.leave(
                    () => {
                      console.log("退出房间成功");
                    },
                    (err) => {
                      console.log("退出房间失败", err);
                    }
                  );
                  this.$message.message("直播已结束");
                  this.changingStatus = false;
                }
              })
              .catch((err) => {
                this.changingStatus = false;
                console.log("关闭失败", err);
              });
          },
          () => {
            this.changingStatus = false;
          }
        );
        return;
      }
      this.$store
        .dispatch(`living/startLive`, this.roomId)
        .then((res) => {
          console.log("开启成功", res);
          this.status = !this.status;
          if (this.status && this.username == this.hostId) {
            this.joinRTC();
            this.$message.message("直播已开始");
            this.changingStatus = false;
          }
        })
        .catch((err) => {
          this.changingStatus = false;
          console.log("开启失败", err);
        });
    },

    getInitInfo(callback = () => {}) {
      let errCallback = (err) => {
        this.loading.close();
        console.log("获取直播间信息失败", err);
        this.$dialog
          .message("获取直播间信息失败，点击确定刷新重试", () => {
            history.go(0);
          })
          .catch(() => {});
      };
      this.$store
        .dispatch("living/getLiveInfo", this.roomId)
        .then((res) => {
          console.log("获取直播间信息成功", res);
          this.status = res.liveStatus ? 1 : 0;
          this.members = res.memberList;
          // this.mode = res.mode;
          let matchUser = false;
          for (let i = 0; i < res.memberList.length; i++) {
            if (res.memberList[i].userId == this.username) {
              matchUser = true;
            }
            if (res.memberList[i].hostFlag) {
              this.hostId = res.memberList[i].userId;
            }
          }
          if (!matchUser) {
            this.$message.error("您不是该直播的成员，若有疑问请联系管理员");
            this.$router.push({ path: "index" });
            return;
          }
          callback();
        })
        .catch((err) => {
          errCallback(err);
        });
    },

    // 初始化直播
    initRTC(callback = () => {}) {
      console.log("初始化直播中", AgoraRTC);
      this.rtc.client = AgoraRTC.createClient({ mode: "live", codec: "h264" });
      this.rtc.client.init(
        this.option.appID,
        () => {
          console.log("初始化成功");
          this.rtc.params = this.option;
          // 房间有人退出
          this.rtc.client.on("peer-leave", (evt) => {
            console.log("peer-leave", evt);
            const id = evt.uid;
            if (id != this.username) {
              // this.removeView(id);
              this.userNum = 1;
              // 用户退出，检测直播间状态并更新信息
              this.getInitInfo(() => {
                if (!this.status) {
                  this.$message.message("直播已结束");
                  this.rtc.remoteStreams[0].stop();
                  this.rtc.remoteStreams[0].close();
                  this.rtc.remoteStreams = [];
                  this.rtc.localStream.stop();
                  this.rtc.localStream.close();
                  this.rtc.client.unpublish(this.rtc.localStream, (err) => {
                    console.log("unpublish失败", err);
                  });
                  this.rtc.published = false;
                } else {
                  if (this.rtc.remoteStreams.length > 0) {
                    // 仍在直播，但对方退出直播间，则清空远程流
                    this.rtc.remoteStreams[0].stop();
                    this.rtc.remoteStreams[0].close();
                    this.rtc.remoteStreams = [];
                  }
                }
              });
            }
          });
          // 获取房间的他人窗口（多人直播窗口，或获取主播窗口）
          // 订阅远程流事件回调（加入房间）
          this.rtc.client.on("stream-added", (evt) => {
            // 流增加，则表示对方进入房间
            this.userNum = 2;
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            if (id == this.hostId && !this.status) {
              // 当前状态为未开始直播，而新增的远程流是老师端，则意味着老师点击了开始直播按钮（对应checkFinish中的joinRTC判断）
              this.$message.message("直播已开始");
              this.status = true;
              this.changeMode(this.mode);
            }
            if (id !== this.rtc.params.uid) {
              this.rtc.client.subscribe(remoteStream, (err) => {
                console.log("订阅流失败", err);
              });
            }
            console.log("加入房间的用户uid: ", id);
          });
          this.rtc.client.on("first-video-frame-decode", (evt) => {
            // 对齐视频窗口
            this.remoteMuteVideo = false;
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            let videoBox = document.getElementById(
              id == this.hostId ? "teacherVideo" : "studentVideo"
            ).children[0];
            console.log("videoBox的内容", videoBox);
            videoBox.style.background = "#333333";
            let video = document.getElementById(
              id == this.hostId ? "teacherVideo" : "studentVideo"
            ).children[0].children[0];
            console.log("video的内容", video);
            video.style.left = "0";
            this.remoteVideoFinished = true;
          });
          // 获取远程流事件回调（获取他人视口）
          this.rtc.client.on("stream-subscribed", (evt) => {
            // 待修改
            let remoteStream = evt.stream;
            let id = remoteStream.getId();
            this.rtc.remoteStreams.push(remoteStream);
            this.remoteVideoFinished = false;
            remoteStream.play(
              id == this.hostId ? "teacherVideo" : "studentVideo",
              { fit: "contain" },
              (err) => {}
            );
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
            console.log("离开房间的用户uid: ", id);
          });
          // 该回调报告本地用户的上下行网络质量
          // this.rtc.client.on("network-quality", (evt) => {
          //   this.downlinkNetworkQuality = evt.downlinkNetworkQuality;
          //   this.uplinkNetworkQuality = evt.uplinkNetworkQuality;
          // });
          this.rtc.client.on("stream-published", (evt) => {
            if (this.useAudio) this.rtc.localStream.enableAudio();
            else this.rtc.localStream.disableAudio();
            if (this.useCamera) this.rtc.localStream.enableVideo();
            else this.rtc.localStream.disableVideo();
            // 本地流推送，检测本地音频屏蔽状态
            if (this.localMuteAudio) {
              this.rtc.localStream.muteAudio();
            }
            this.rtc.published = true;
            if (this.desktopMode) {
              // this.rtc.localStream.setScreenProfile("1080p_2");
              // this.rtc.localStream.setVideoProfile("1080p_2");
            }
            if (this.waitingPublish) {
              this.waitingPublish = false;
              this.loadingVideo = false;
            }
          });
          this.rtc.client.on("mute-video", (evt) => {
            console.log("对方关闭了摄像头", evt);
            this.$message.message("对方关闭了视频画面");
            this.remoteMuteVideo = true;
          });
          this.rtc.client.on("unmute-video", (evt) => {
            console.log("对方开启了摄像头", evt);
            this.remoteMuteVideo = false;
          });
          this.rtc.client.on("mute-audio", (evt) => {
            console.log("对方关闭了麦克风", evt);
            this.$message.message("对方关闭了视频声音");
            // 同步远端流的屏蔽状态
            this.rtc.remoteStreams[0].muteAudio();
            // 远端流主动屏蔽音频
            // 若本地对远端流的音频屏蔽状态为true，则不视为远端主动屏蔽（如果对方主动解开屏蔽，本地要保持本地用户的屏蔽操作）
            this.remoteMuteAudioActively = !this.remoteMuteAudio;
            this.remoteMuteAudio = true;
          });
          this.rtc.client.on("unmute-audio", (evt) => {
            console.log("对方开启了麦克风", evt);
            // 若为远端主动屏蔽的音频，则自动解开远端音频屏蔽
            if (this.remoteMuteAudioActively) {
              this.remoteMuteAudio = false;
              this.remoteMuteAudioActively = false;
            }
            if (this.remoteMuteAudio) this.rtc.remoteStreams[0].muteAudio();
            else this.rtc.remoteStreams[0].unmuteAudio();
          });
          this.rtc.client.enableAudioVolumeIndicator();
          this.rtc.client.on("volume-indicator", (evt) => {
            this.remoteVolume =
              evt.attr.length > 0 ? Math.ceil(evt.attr[0].level / 10) : 0;
          });
          this.localAudioInterval = setInterval(() => {
            if (!this.status) {
              clearInterval(this.localAudioInterval);
            }
            if (this.rtc.localStream) {
              this.localVolume =
                Math.ceil(this.rtc.localStream.getAudioLevel() * 10) || 0;
            }
          }, 1000);
          this.initingRTC = false;
          callback();
        },
        (err) => {
          console.error("初始化失败", err);
        }
      );
    },
    // 接入RTC流（房间）
    joinRTC() {
      if (this.initingRTC) {
        this.$message.warning("初始化直播中，请稍后再试");
        return;
      }
      this.initingRTC = true;
      this.option.channel = this.roomId;
      this.initRTC(() => {
        // 加载直播
        this.rtc.client.setClientRole(
          this.rtcCharacter,
          (res) => {
            console.log("加载直播client", res);
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
                    this.userNum += this.rtc.remoteStreams.length;
                    this.loading.close();
                    if (this.status) this.changeMode(this.mode);
                  },
                  (err) => {
                    console.error("加入频道失败", err, this.option);
                  }
                );
              })
              .catch((err) => {
                console.log(err);
                this.$dialog
                  .message("进入直播间失败，点击确定刷新重试", () => {
                    history.go(0);
                  })
                  .catch(() => {});
              });
          },
          (err) => {
            console.log(err);
            this.$dialog
              .message("进入直播间失败，点击确定刷新重试", () => {
                history.go(0);
              })
              .catch(() => {});
          }
        );
      });
    },
    async changeMode(mode, fromWindow = false) {
      if (this.loadingVideo) {
        this.$message.message("模式切换中或直播加载中，请稍后再试");
        return;
      }
      this.loadingVideo = true;
      // fromWindow表示从界面按钮直接操作调用，而非函数内调用
      if (fromWindow) {
        // 避免多次按摄像头按钮而导致直播模式和真实模式不匹配
        if (this.mode == mode && mode == 1) {
          this.loadingVideo = false;
          return;
        }
        // 从关闭摄像头的状态下，从其他模式切换到摄像头，认为用户同意打开摄像头，将自动打开摄像头
        if (!this.useCamera) {
          this.useCamera = true;
        }
      }
      if (!this.status) {
        this.$message.message("请先开始直播");
        this.loadingVideo = false;
        return;
      }
      if (this.rtc.published) {
        // 切换模式操作，则对desktopMode反转
        if (mode != this.mode) {
          let goon = true;
          if (mode == 2) {
            await this.$dialog.message(
              "切换成屏幕共享模式后，将关闭摄像头，是否继续？",
              () => {
                goon = true;
              },
              () => {
                goon = false;
              }
            );
          } else if (mode == 1) {
            await this.$dialog.message(
              "切换成摄像头后，将关闭屏幕共享模式，是否继续？",
              () => {
                goon = true;
              },
              () => {
                goon = false;
              }
            );
          }
          if (!goon) {
            this.loadingVideo = false;
            return;
          }
          this.desktopMode = !this.desktopMode;
        } else {
          let toCamera = false;
          let closeDialog = false;
          if (mode == 2) {
            await this.$dialog.message(
              "屏幕共享已暂停，请重新选择共享窗口或者切换为摄像头模式",
              () => {
                toCamera = false;
              },
              () => {
                toCamera = true;
              },
              "切换共享窗口",
              "切换摄像头模式",
              () => {
                closeDialog = true;
              }
            );
          }
          if (closeDialog) {
            this.loadingVideo = false;
            return;
          }
          if (toCamera) {
            console.log("切换视频2");
            this.loadingVideo = false;
            this.changeMode(1, true);
            // this.desktopMode = !this.desktopMode;
            return;
          }
        }
        // 关闭本地流，后续重新初始化并推送
        this.rtc.localStream.stop();
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
      this.mode = mode;
      // 初始化本地流
      this.rtc.localStream.init(
        () => {
          console.log("初始化本流成功");
          // 加载本地流
          this.localVideoFinished = false;
          this.rtc.localStream.play(
            this.username == this.hostId ? "teacherVideo" : "studentVideo",
            { fit: "contain" },
            (err) => {
              if (err) {
                if (err.reason) {
                  this.$message.error("直播流启动失败，原因：", err.reason);
                  this.loadingVideo = false;
                  return;
                }
              }
              // 对齐视频窗口
              let videoBox = document.getElementById(
                this.username == this.hostId ? "teacherVideo" : "studentVideo"
              ).children[0];
              videoBox.style.background = "#333333";
              let video = document.getElementById(
                this.username == this.hostId ? "teacherVideo" : "studentVideo"
              ).children[0].children[0];
              video.style.transform = "scaleX(1)";
              video.style.left = "0";
              this.localVideoFinished = true;
              this.rtc.client.publish(this.rtc.localStream, (err) => {
                // 本地流推送失败
                console.error(err);
                // ???待补充???
                this.settingFinish(
                  this.useCamera,
                  this.useAudio,
                  this.cameraId
                );
                this.loadingVideo = false;
              });
              this.loading.close();
              this.waitingPublish = true;
            }
          );
        },
        (err) => {
          console.error("初始化本地流失败 ", err);
          this.rtc.published = true;
          this.loading.close();
          this.$message.error(
            "推送直播画面失败，请尝试进入设置重新开启摄像头或切换模式"
          );
          this.loadingVideo = false;
        }
      );
    },

    toggleAudio(identity) {
      let stream = null;
      let flagStr = "";
      if (identity == 0) {
        if (
          (!this.rtc.localStream && this.username == this.hostId) ||
          (this.rtc.remoteStreams.length == 0 && this.username != this.hostId)
        ) {
          this.$message.message(
            `${
              this.username == this.hostId ? "" : "对方未进入直播间或"
            }暂未开启直播`
          );
          return;
        }
        stream =
          this.username == this.hostId
            ? this.rtc.localStream
            : this.rtc.remoteStreams[0];
        flagStr =
          this.username == this.hostId ? "localMuteAudio" : "remoteMuteAudio";
      } else {
        if (
          (!this.rtc.localStream && this.username != this.hostId) ||
          (this.rtc.remoteStreams.length == 0 && this.username == this.hostId)
        ) {
          this.$message.error(
            `${
              this.username != this.hostId ? "" : "对方未进入直播间或"
            }暂未开启直播`
          );
          return;
        }
        stream =
          this.username != this.hostId
            ? this.rtc.localStream
            : this.rtc.remoteStreams[0];
        flagStr =
          this.username != this.hostId ? "localMuteAudio" : "remoteMuteAudio";
      }
      if (flagStr == "remoteMuteAudio") {
        if (this.loadingRemoteAudio) {
          this.$message.warning("正在处理对方音频，请勿频繁操作");
          return;
        }
        this.loadingRemoteAudio = true;
      } else {
        if (this.loadingLocalAudio) {
          this.$message.warning("正在处理您的音频，请勿频繁操作");
          return;
        }
        this.loadingLocalAudio = true;
      }
      if (!this[flagStr]) {
        let success = stream.muteAudio();
        if (success) {
          this[flagStr] = true;
          this.$message.message("静音成功");
        } else {
          this.$message.error(
            flagStr == "remoteMuteAudio"
              ? "静音失败，对方可能未开启麦克风"
              : this.status
              ? "静音失败，请重试"
              : "暂未开启直播"
          );
        }
      } else {
        let success = stream.unmuteAudio();
        if (success) {
          this[flagStr] = false;
          this.$message.message("关闭静音成功");
        } else {
          this.$message.error(
            flagStr == "remoteMuteAudio"
              ? "关闭静音失败，对方可能未开启麦克风"
              : this.status
              ? "关闭静音失败，请重试"
              : "暂未开启直播"
          );
        }
      }
      if (flagStr == "remoteMuteAudio") {
        this.loadingRemoteAudio = false;
      } else {
        this.loadingLocalAudio = false;
      }
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
        min-height: 57.778vh;
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
          background-color: #333333;
        }
      }
      .voiceBox {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        img {
          width: 24px;
          cursor: pointer;
        }
        .volume {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 20px;
          .volume-item + .volume-item {
            margin-left: 10px;
          }
          .volume-item {
            width: 4px;
            height: 22px;
            border-radius: 2px;
            background: #fff;
          }
          .volume-item--green {
            background: #53c41b;
          }
        }
      }
    }
    .studentLive {
      width: 22.083%;
      .liveBox {
        width: 100%;
        height: 20vh;
        background-color: #333333;
        .openBox {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
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
        .studentVideo {
          height: 100%;
          background-color: #333333;
        }
      }
      .voiceBox {
        display: flex;
        flex-direction: row;
        margin-top: 30px;
        img {
          width: 24px;
          cursor: pointer;
        }
        .volume {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 20px;
          .volume-item + .volume-item {
            margin-left: 10px;
          }
          .volume-item {
            width: 4px;
            height: 22px;
            border-radius: 2px;
            background: #fff;
          }
          .volume-item--green {
            background: #53c41b;
          }
        }
      }
    }
  }
}
</style>