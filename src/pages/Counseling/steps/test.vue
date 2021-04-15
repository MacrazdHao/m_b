<template>
  <div class="Test">
    <div class="content" v-if="!finished">
      <div class="total">
        <p class="title">{{ $t("counseling.step2.numTitle") }}：</p>
        <p class="num">{{ questions.length }}</p>
        <p class="unit">{{ $t("counseling.step2.numUnit") }}</p>
      </div>
      <div class="questions">
        <div
          class="question-item"
          v-for="(item, index) in questions"
          :key="index"
        >
          <p class="title">{{ index + 1 + "." + item.title }}</p>
          <div
            class="answer"
            v-for="(item2, index2) in item.answers"
            :key="index2"
            @click="selectAnswer(index, item2)"
          >
            <p>{{ orderLetter(index2) + " " + item2.text }}</p>
            <img
              :src="
                require(`@/assets/counseling/checkbox${
                  answers[index2]
                    ? answers[index].value == item2.value
                      ? '_selected'
                      : ''
                    : ''
                }.svg`)
              "
            />
          </div>
        </div>
      </div>
      <div class="buttonBox">
        <CButton
          class="button"
          :text="$t('counseling.step1.cancelButton')"
          @btnClick="cancel"
        />
        <CButton
          class="button"
          :text="$t('counseling.step1.submitButton')"
          theme="blue"
          @btnClick="submit"
        />
      </div>
    </div>
    <div class="finish" v-if="finished">
      <img src="@/assets/counseling/success.svg" />
      <p class="title">{{ $t("counseling.step2.finishTitle") }}</p>
      <p class="tips">{{ $t("counseling.step2.finishTips") }}</p>
      <CButton
        class="button"
        :text="$t('counseling.step2.reportButton')"
        :disable="!hasReport"
        theme="blue"
        @btnClick="getReport"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
export default {
  components: {
    CButton,
  },
  data() {
    return {
      questions: [
        {
          title:
            "这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长",
          answers: [
            {
              value: 1,
              text:
                "很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况很符合我的情况",
            },
            {
              value: 2,
              text: "比较符合我的情况",
            },
            {
              value: 3,
              text: "不能肯定",
            },
            {
              value: 4,
              text: "不太符合我的情况",
            },
            {
              value: 5,
              text: "根本不符合我的情况",
            },
          ],
        },
        {
          title:
            "这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长",
          answers: [
            {
              value: 1,
              text: "很符合我的情况",
            },
            {
              value: 2,
              text: "比较符合我的情况",
            },
            {
              value: 3,
              text: "不能肯定",
            },
            {
              value: 4,
              text: "不太符合我的情况",
            },
            {
              value: 5,
              text: "根本不符合我的情况",
            },
          ],
        },
        {
          title:
            "这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长",
          answers: [
            {
              value: 1,
              text: "很符合我的情况",
            },
            {
              value: 2,
              text: "比较符合我的情况",
            },
            {
              value: 3,
              text: "不能肯定",
            },
            {
              value: 4,
              text: "不太符合我的情况",
            },
            {
              value: 5,
              text: "根本不符合我的情况",
            },
          ],
        },
        {
          title:
            "这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长",
          answers: [
            {
              value: 1,
              text: "很符合我的情况",
            },
            {
              value: 2,
              text: "比较符合我的情况",
            },
            {
              value: 3,
              text: "不能肯定",
            },
            {
              value: 4,
              text: "不太符合我的情况",
            },
            {
              value: 5,
              text: "根本不符合我的情况",
            },
          ],
        },
        {
          title:
            "这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长",
          answers: [
            {
              value: 1,
              text: "很符合我的情况",
            },
            {
              value: 2,
              text: "比较符合我的情况",
            },
            {
              value: 3,
              text: "不能肯定",
            },
            {
              value: 4,
              text: "不太符合我的情况",
            },
            {
              value: 5,
              text: "根本不符合我的情况",
            },
          ],
        },
        {
          title:
            "这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长这是题目可以非常长",
          answers: [
            {
              value: 1,
              text: "很符合我的情况",
            },
            {
              value: 2,
              text: "比较符合我的情况",
            },
            {
              value: 3,
              text: "不能肯定",
            },
            {
              value: 4,
              text: "不太符合我的情况",
            },
            {
              value: 5,
              text: "根本不符合我的情况",
            },
          ],
        },
      ],
      answers: [],
      finished: true,
      hasReport: true,
    };
  },
  mounted() {
    this.$emit("setSuffixMenu", [
      this.$t("counseling.step1.title"),
      this.$t("counseling.step2.title"),
    ]);
    this.answers = Array.apply(null, Array(this.questions.length)).map(() => {
      return { text: "", value: -1 };
    });
  },
  methods: {
    orderLetter(num) {
      switch (num) {
        case 0:
          return "A";
        case 1:
          return "B";
        case 2:
          return "C";
        case 3:
          return "D";
        case 4:
          return "E";
        case 5:
          return "F";
        case 6:
          return "G";
        case 7:
          return "H";
        case 8:
          return "I";
        case 9:
          return "J";
        case 10:
          return "K";
        case 11:
          return "L";
        case 12:
          return "M";
        case 13:
          return "N";
        case 14:
          return "O";
        case 15:
          return "P";
        case 16:
          return "Q";
        case 17:
          return "R";
        case 18:
          return "S";
        case 19:
          return "T";
        case 20:
          return "U";
        case 21:
          return "V";
        case 22:
          return "W";
        case 23:
          return "X";
        case 24:
          return "Y";
        case 25:
          return "Z";
      }
    },
    selectAnswer(index, item) {
      this.answers[index] = item;
      console.log(this.answers);
      this.$forceUpdate();
    },
    cancel() {},
    submit() {},
    getReport() {},
  },
};
</script>

<style lang="scss" scoped>
.Test {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding-top: 174px;
  padding-bottom: 346px;
  p {
    margin: 0;
  }
  .content {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .total {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 22px 24px 22px 24px;
      .title {
        font-size: 14px;
        
        color: #333333;
        line-height: 20px;
      }
      .num {
        font-size: 14px;
        
        color: #999999;
        line-height: 20px;
        border-radius: 2px;
        border: 1px solid #999999;
        padding: 6px 12px;
        box-sizing: border-box;
        min-width: 60px;
        text-align: left;
        margin-left: 30px;
      }
      .unit {
        font-size: 14px;
        
        color: #333333;
        line-height: 20px;
        margin-left: 20px;
      }
    }
    .questions {
      display: flex;
      flex-direction: column;
      // padding-top: 60px;
      border-bottom: 1px solid #d3d3d3;
      .question-item:nth-child(even) {
        background-color: #fafafa;
      }
      .question-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 22px 24px 24px 24px;
        p {
          font-size: 14px;
          color: #333333;
          line-height: 20px;
          text-align: left;
        }
        .title {
          margin-bottom: 20px;
        }
        .answer {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: flex-start;
          width: 552px;
          cursor: pointer;
          img {
            margin-left: 24px;
          }
        }
        .answer + .answer {
          margin-top: 12px;
        }
      }
    }
    .buttonBox {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 12px 0;
      .button + .button {
        margin-left: 80px;
      }
    }
  }
  .finish {
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 60px;
      height: 60px;
    }
    .title {
      margin-top: 12px;
      font-size: 16px;
      color: #333333;
      line-height: 22px;
    }
    .tips {
      margin-top: 16px;
      font-size: 14px;
      color: #666666;
      line-height: 20px;
    }
    .button {
      margin-top: 34px;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
}
</style>