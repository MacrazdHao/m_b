<template>
  <transition name="slide-fade">
    <div class="dialog-box" v-if="visible">
      <div class="checkBox">
        <div class="checkBox-header">
          <div class="checkBox-steps">
            <div class="checkBox-steps-line"></div>
            <div class="checkBox-steps-item">
              <div
                :class="[
                  'checkBox-steps-item-icon',
                  checkStep >= 1 ? 'checkBox-steps-item-icon-finished' : '',
                ]"
              >
                <img src="@/assets/living/icon_camera2.svg" />
                <div
                  class="checkBox-steps-item-icon-finished-icon"
                  v-if="checkStep > 1"
                >
                  <img src="@/assets/living/icon_success.svg" />
                </div>
              </div>
              <p>{{ checkStep == 1 ? "摄像头检测中..." : "摄像头" }}</p>
            </div>
            <div class="checkBox-steps-item">
              <div
                :class="[
                  'checkBox-steps-item-icon',
                  checkStep >= 2 ? 'checkBox-steps-item-icon-finished' : '',
                ]"
              >
                <img src="@/assets/living/icon_mike.svg" />
                <div
                  class="checkBox-steps-item-icon-finished-icon"
                  v-if="checkStep > 2"
                >
                  <img src="@/assets/living/icon_success.svg" />
                </div>
              </div>
              <p>{{ checkStep == 2 ? "麦克风检测中..." : "麦克风" }}</p>
            </div>
            <div class="checkBox-steps-item">
              <div
                :class="[
                  'checkBox-steps-item-icon',
                  checkStep >= 3 ? 'checkBox-steps-item-icon-finished' : '',
                ]"
              >
                <img src="@/assets/living/icon_detect.svg" />
              </div>
              <p>检测结果</p>
            </div>
          </div>
        </div>
        <div class="checkBox-content">
          <div class="checkBox-content-media" v-show="checkStep == 1">
            <p class="checkBox-content-media-tips">
              您是否能看到自己的摄像头画面？
            </p>
            <div class="checkBox-content-media-selector">
              <p class="checkBox-content-media-selector-label">摄像头</p>
              <el-select v-model="cameraInput" placeholder="未检测到摄像头">
                <el-option
                  v-for="(item, index) in cameraInputList"
                  :key="index"
                  :label="item.label"
                  :value="item.deviceId"
                >
                </el-option>
              </el-select>
            </div>
            <div class="checkBox-content-media-box checkBox-content-video-box">
              <video id="video" />
            </div>
          </div>
          <div class="checkBox-content-media" v-show="checkStep == 2">
            <p class="checkBox-content-media-tips">
              对着麦克风讲话，您是否能看到音量条波动？
            </p>
            <div class="checkBox-content-media-selector">
              <p class="checkBox-content-media-selector-label">麦克风</p>
              <el-select
                v-model="audioInput"
                placeholder="未检测到麦克风"
                disabled
              >
                <el-option
                  v-for="(item, index) in audioInputList"
                  :key="index"
                  :label="item.label"
                  :value="item.deviceId"
                >
                </el-option>
              </el-select>
            </div>
            <!-- <p style="color: black">{{ audioCheckVolumn }}</p> -->
            <div class="checkBox-content-media-box checkBox-content-audio-box">
              <div
                :class="[
                  'checkBox-content-audio-volumn',
                  index <= audioCheckVolumn
                    ? 'checkBox-content-audio-volumn-light'
                    : '',
                ]"
                v-for="(item, index) in 14"
                :key="index"
              ></div>
              <!-- <video id="audio" /> -->
              <!-- <canvas id="audioCanvas" /> -->
            </div>
          </div>
          <div class="checkBox-content-media" v-show="checkStep == 3">
            <table>
              <thead>
                <tr>
                  <th>检测项目</th>
                  <th>检测结果</th>
                </tr>
              </thead>
              <tr>
                <td>摄像头</td>
                <td>
                  <div class="checkBox-content-media-check-result">
                    <div>
                      <p
                        class="checkBox-content-media-check-light"
                        :style="{ color: cameraOk ? '#53C41B' : '#FF4D4F' }"
                      >
                        ●
                      </p>
                      <p class="checkBox-content-media-check-status">
                        {{ cameraOk ? "正常" : "不正常" }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>麦克风</td>
                <td>
                  <div class="checkBox-content-media-check-result">
                    <div>
                      <p
                        class="checkBox-content-media-check-light"
                        :style="{ color: audioOk ? '#53C41B' : '#FF4D4F' }"
                      >
                        ●
                      </p>
                      <p class="checkBox-content-media-check-status">
                        {{ audioOk ? "正常" : "不正常" }}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="checkBox-footer">
          <el-button @click="checkMediaNotOk" v-if="checkStep < 3"
            >不可以看到</el-button
          >
          <el-button
            @click="checkMediaOk"
            type="primary"
            :disabled="
              (checkStep == 1 && !playingCamera) ||
              (checkStep == 2 && !playingAudio)
            "
            v-if="checkStep < 3"
            >可以看到</el-button
          >
          <el-button @click="startCheckMedia" v-if="checkStep == 3"
            >重新检测</el-button
          >
          <el-button @click="checkFinish" type="primary" v-if="checkStep == 3"
            >检测完成</el-button
          >
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CheckBox",
  props: ["visible"],
  components: {},
  computed: {},
  data() {
    return {
      checkBoxShow: true,
      checkStep: 1,
      cameraStream: "",
      audioStream: "",
      cameraOk: false,
      audioOk: false,
      cameraInputList: [],
      audioInputList: [],
      cameraInput: "",
      audioInput: "",
      audioCheckVolumn: "",
      hasPermission: false,
      hasCameraPermission: false,
      hasAudioPermission: false,
      playingCamera: false,
      playingAudio: false,
    };
  },
  watch: {
    cameraInput(val) {
      console.log(val);
      this.changeCamera(val);
    },
    audioInput(val) {
      console.log(val);
      this.changeAudio(val);
    },
  },
  created() {
    this.startCheckMedia();
  },
  methods: {
    startCheckMedia() {
      this.checkStep = 1;
      this.cameraInput = "";
      this.audioInput = "";
      this.cameraInputList = [];
      this.audioInputList = [];
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((res) => {
          navigator.mediaDevices
            .enumerateDevices()
            .then((res) => {
              this.hasCameraPermission = true;
              console.log("获取摄像头设备id列表成功", res);
              for (let i = 0; i < res.length; i++) {
                if (res[i].kind == "videoinput")
                  this.cameraInputList.push(res[i]);
              }
              this.cameraInput =
                this.cameraInputList.length > 0
                  ? this.cameraInputList[0].deviceId
                  : "";
              this.$forceUpdate();
            })
            .catch((err) => {
              console.log("获取摄像头设备id列表失败", err);
              alert(
                "获取摄像头设备信息失败，请允许网页使用相应摄像头设备后重新进入直播间。"
              );
            });
        })
        .catch((err) => {
          Promise.resolve(null);
          console.log("获取摄像头设备列表失败", err);
          alert(
            "获取摄像头设备信息失败，请允许网页使用相应摄像头设备后，刷新或重新进入直播间。"
          );
        });

      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((res) => {
          navigator.mediaDevices
            .enumerateDevices()
            .then((res) => {
              this.hasAudioPermission = true;
              console.log("获取麦克风设备id列表成功", res);
              for (let i = 0; i < res.length; i++) {
                if (res[i].kind == "audioinput")
                  this.audioInputList.push(res[i]);
              }
              this.audioInput =
                this.audioInputList.length > 0
                  ? this.audioInputList[0].deviceId
                  : "";
              this.$forceUpdate();
            })
            .catch((err) => {
              console.log("获取麦克风设备id列表失败", err);
              alert(
                "获取麦克风设备信息失败，请允许网页使用相应麦克风设备后重新进入直播间。"
              );
            });
        })
        .catch((err) => {
          Promise.resolve(null);
          console.log("获取麦克风设备列表失败", err);
          alert(
            "获取麦克风设备信息失败，请允许网页使用相应麦克风设备后，刷新或重新进入直播间。"
          );
        });
    },
    changeCamera(cameraId) {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            deviceId: cameraId,
            width: 240,
            height: 135,
          },
        })
        .then((stream) => {
          console.log("调用摄像头成功", stream);
          let video = document.getElementById("video");
          this.cameraStream = stream;
          video.srcObject = stream;
          video.play();
          this.playingCamera = true;
        })
        .catch((err) => {
          console.log("调用摄像头失败", err);
        });
    },
    changeAudio(audioId) {
      let audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      let mediaStreamSource = null;
      let scriptProcessor = null;
      navigator.mediaDevices
        .getUserMedia({
          audio: true,
        })
        .then((stream) => {
          console.log("调用麦克风成功", stream);
          this.audioStream = stream;
          // 方案1：
          mediaStreamSource = audioContext.createMediaStreamSource(stream);
          // 创建一个音频分析对象，采样的缓冲区大小为4096，输入和输出都是单声道
          scriptProcessor = audioContext.createScriptProcessor(4096, 1, 1);
          // 将该分析对象与麦克风音频进行连接
          mediaStreamSource.connect(scriptProcessor);
          // 此举无甚效果，仅仅是因为解决 Chrome 自身的 bug
          scriptProcessor.connect(audioContext.destination);
          // 开始处理音频
          scriptProcessor.onaudioprocess = (e) => {
            // 获得缓冲区的输入音频，转换为包含了PCM通道数据的32位浮点数组
            let buffer = e.inputBuffer.getChannelData(0);
            // 获取缓冲区中最大的音量值
            let maxVal = Math.max.apply(Math, buffer);
            // 显示音量值
            this.audioCheckVolumn = Math.round(maxVal * 14);
          };
          this.playingAudio = true;
          // 方案2：三方组件
          // let audioCanvas = document.getElementById("audioCanvas");
          // let vudio = new Vudio(stream, audioCanvas, {
          //   width: 240,
          //   height: 135,
          //   accuracy: 16,
          //   waveform: {
          //     fadeSide: false,
          //     maxHeight: 200,
          //     verticalAlign: "bottom",
          //     horizontalAlign: "center",
          //     color: "#2980b9",
          //   },
          // });
          // vudio.dance();
        })
        .catch((err) => {
          console.log("调用麦克风失败", err);
        });
    },
    checkMediaNotOk() {
      switch (this.checkStep) {
        case 1:
          this.stopCheckCamera();
          this.cameraOk = false;
          break;
        case 2:
          this.stopCheckMicrophone();
          this.audioOk = false;
          break;
      }
      this.checkStep++;
    },
    checkMediaOk() {
      switch (this.checkStep) {
        case 1:
          this.stopCheckCamera();
          this.cameraOk = true;
          break;
        case 2:
          this.stopCheckMicrophone();
          this.audioOk = true;
          break;
      }
      this.checkStep++;
    },
    stopCheckCamera() {
      let video = document.getElementById("video");
      if (!this.hasCameraPermission || !video.getTracks) return;
      video.srcObject.getTracks().forEach((track) => {
        console.log("停止摄像头测试", track);
        track.stop();
      });
      this.playingCamera = false;
    },
    stopCheckMicrophone() {
      if (!this.hasAudioPermission || !this.audioStream.getTracks) return;
      this.audioStream.getTracks().forEach((track) => {
        console.log("停止麦克风测试", track);
        track.stop();
      });
      this.playingAudio = false;
    },
    checkFinish() {
      // this.checkBoxShow = false;
      // this.dialogShow = false;
      this.$emit("checkFinish", this.cameraInput);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-box {
  z-index: 1000;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
}
.checkBox {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: fit-content;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  p {
    margin: 0;
  }
  .checkBox-header {
    display: flex;
    background-color: #f1f4ff;
    justify-content: center;
    align-items: center;
    padding: 28px 92px;
    .checkBox-steps {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      width: 338px;
      position: relative;
      .checkBox-steps-line {
        border-top: 2px dashed #d5e3ff;
        position: absolute;
        width: calc(200% / 3);
        top: calc(50% - 12px);
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
      }
      .checkBox-steps-item {
        z-index: 1000;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
        .checkBox-steps-item-icon {
          background-color: #b2b2b2;
          width: 48px;
          height: 48px;
          border-radius: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 22px;
          }
        }
        .checkBox-steps-item-icon-finished {
          background-color: #4b77f6;
          position: relative;
          .checkBox-steps-item-icon-finished-icon {
            position: absolute;
            right: 0;
            bottom: 0;
            transform: translate(30%, 0);
            background-color: #fff;
            border-radius: 100px;
            width: 18px;
            height: 18px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        p {
          color: #666666;
          width: 100%;
          text-align: center;
          margin-top: 8px;
          line-height: 20px;
        }
      }
    }
  }
  .checkBox-content {
    margin-top: 22px;
    .checkBox-content-media {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .checkBox-content-media-tips {
        font-size: 16px;
        line-height: 22px;
        font-weight: bold;
        color: #333333;
        width: fit-content;
      }
      .checkBox-content-media-selector {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: fit-content;
        margin-top: 24px;
        .checkBox-content-media-selector-label {
          line-height: 20px;
          margin-right: 8px;
          color: #333333;
        }
      }
      .checkBox-content-media-box {
        width: 240px;
        height: 135px;
        margin: 0;
        border-radius: 4px;
        margin-top: 16px;
        overflow: hidden;
      }
      .checkBox-content-video-box {
        transform: rotateY(180deg);
        background-color: #000;
      }
      .checkBox-content-audio-box {
        display: flex;
        flex-direction: row;
        justify-content: center;
        .checkBox-content-audio-volumn + .checkBox-content-audio-volumn {
          margin-left: 10px;
        }
        .checkBox-content-audio-volumn {
          margin-top: 20px;
          width: 8px;
          height: 24px;
          background: #ececec;
          border-radius: 4px;
        }
        .checkBox-content-audio-volumn-light {
          background: #4b77f6;
        }
      }

      table {
        margin-top: 28px;
        margin-bottom: 89px;
        border-collapse: collapse;
        border-spacing: 0;
        empty-cells: show;
        border: 1px solid #eeeeee;
        width: 376px;
        height: 120px;
      }
      table td,
      table th {
        text-align: center;
        color: #333333;
        padding: 0;
        border-left: 1px solid #eeeeee;
        border-width: 0 0 0 1px;
        font-size: inherit;
        margin: 0;
        overflow: visible;
        padding: 0.5em 1em;
      }
      table thead {
        background-color: #f6f8fa;
        color: #333333;
        text-align: center;
        vertical-align: bottom;
      }
      table td {
        background-color: transparent;
        border-bottom: 1px solid #eeeeee;
        .checkBox-content-media-check-result {
          display: inline-block;
          div {
            display: flex;
            flex-direction: row;
            width: 100px;
            .checkBox-content-media-check-light {
              text-align: right;
              flex: 1;
            }
            .checkBox-content-media-check-status {
              color: #333333;
              margin-left: 8px;
              text-align: left;
              flex: 2;
            }
          }
        }
      }
      table tbody > tr:last-child > td {
        border-bottom-width: 0;
      }
    }
  }
  .checkBox-footer {
    margin-top: 24px;
    margin-bottom: 24px;
  }
}
</style>