<template>
  <div class="Living">
    <div class="header">
      <div class="statusBox">
        <LButton
          class="statusButton"
          theme="blue"
          :text="$tc('living.statusButton', status)"
        />
        <div :class="['status', status == 1 ? '' : 'status--start']">
          <div class="dot"></div>
          <p>{{ $tc("living.statusText", status) }}</p>
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
          <p>{{ $t("living.cameraClosing") }}</p>
          <LButton
            class="cameraButton"
            theme="blue"
            :text="$t('living.cameraButton')"
          />
        </div>
        <div class="voiceBox">
          <img src="@/assets/living/icon_volume.svg" />
          <div class="volume"></div>
        </div>
      </div>
      <div class="studentLive">
        <div class="liveBox">本地画面</div>
        <div class="voiceBox">
          <img src="@/assets/living/icon_volume.svg" />
          <div class="volume"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LButton from "@/components/common/button";
export default {
  components: {
    LButton,
  },
  data() {
    return {
      status: 1,
      mode: 1,
    };
  },
  methods: {
    changeMode(mode) {
      this.mode = mode;
    },
    setting() {},
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