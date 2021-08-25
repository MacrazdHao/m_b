<template>
  <div class="TemplateAllocate">
    <div class="content">
      <div class="content-item">
        <div class="title-box">
          <div class="leftline"></div>
          <p class="title">{{ $t("school.business.distributionTitle") }}</p>
        </div>
        <div class="form">
          <div class="form-item">
            <p class="item-label">
              {{ $t("school.business.peopleNumLabel") }}
            </p>
            <p class="item-content">
              <FormInput
                class="input"
                :placeholder="$t('school.business.peopleNumPlaceholder')"
                :value="authStudentCount"
                type="number"
                :minNumber="0"
                @input="
                  (text) => {
                    authStudentCount = text;
                  }
                "
              />
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :data="tableData"
        height="642"
        style="width: 100%"
        :empty-text="
          loading
            ? $t('school.list.emptyTips.loadingList')
            : error
            ? $t('school.list.errorTips.nolist')
            : $t('school.list.emptyTips.emptyList')
        "
      >
        <el-table-column width="55">
          <template slot="header" slot-scope="scope">
            <img
              class="tableRow-selector"
              :src="
                require(`@/assets/archives/icon_checkbox${
                  allSelected ? '_selected' : ''
                }.svg`)
              "
              @click="selectAllTemplate"
            />
          </template>
          <template slot-scope="scope">
            <img
              class="tableRow-selector"
              :src="
                require(`@/assets/archives/icon_checkbox${
                  scope.row.hasDistribute ? '_selected' : ''
                }.svg`)
              "
              @click="selectTemplate(scope.$index)"
            />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="tableHeader-text">
              {{ $t("modules.list.table.name") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="tableRow-text tableRow-name">
              {{ scope.row.name }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="tableHeader-text">
              {{ $t("modules.list.table.stage1") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="tableRow-text tableRow-name">
              {{ scope.row.initDiscussTimes }}
              {{ $t("modules.list.table.unit") }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="tableHeader-text">
              {{ $t("modules.list.table.stage2") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="tableRow-text tableRow-name">
              {{ scope.row.onionCircleTimes }}
              {{ $t("modules.list.table.unit") }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="tableHeader-text">
              {{ $t("modules.list.table.stage3") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="tableRow-text tableRow-name">
              {{ scope.row.estuaryCircleTimes }}
              {{ $t("modules.list.table.unit") }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="tableHeader-text">
              {{ $t("modules.list.table.stage4") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="tableRow-text tableRow-name">
              {{ scope.row.bayesTimes }}
              {{ $t("modules.list.table.unit") }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="tableHeader-text">
              {{ $t("school.templateAllocate.count") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p
              class="tableRow-text tableRow-name"
              v-if="!scope.row.hasDistribute"
            >
              {{ scope.row.authCount || 0 }}
            </p>
            <FormInput
              class="input"
              v-else
              :placeholder="$t('school.templateAllocate.countPlaceholder')"
              :value="scope.row.authCount || 0"
              type="number"
              :minNumber="0"
              @input="(text) => setAuthCount(text, scope.$index)"
            />
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        :text="$t('school.templateAllocate.cancelButton')"
        @btnClick="goBack()"
      />
      <CButton
        class="button"
        theme="blue"
        :text="$t('school.templateAllocate.saveButton')"
        @btnClick="submit"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
import FormInput from "../components/input.vue";
import defaultBackMixin from "@/mixins/defaultBack";
export default {
  mixins: [defaultBackMixin],
  components: {
    CButton,
    FormInput,
  },
  data() {
    return {
      loading: false,
      error: false,
      authStudentCount: 0,
      schoolAuthId: null,
      remainStudentCount: 0,
      schoolId: null,
      tableData: [],
      status: null,
      tenantId: null,
    };
  },
  computed: {
    allSelected() {
      for (let i = 0; i < this.tableData.length; i++) {
        if (!this.tableData[i].hasDistribute) return false;
      }
      return true;
    },
    form() {
      let templateDTOList = JSON.parse(JSON.stringify(this.tableData));
      return {
        authStudentCount: this.authStudentCount
          ? parseInt(this.authStudentCount)
          : 0,
        schoolAuthId: this.schoolAuthId,
        remainStudentCount: this.remainStudentCount,
        schoolId: this.schoolId,
        templateDTOList,
        status: this.status,
        tenantId: this.tenantId,
      };
    },
  },
  watch: {
    authStudentCount(val) {
      if (!val) return;
      if (val < 0) {
        this.authStudentCount = 0;
      }
    },
    loading(val) {
      if (val) {
        this.tableData = [];
      }
    },
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.$t("school.templateAllocate.title")]);
    this.initList();
  },
  methods: {
    initList() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("school/getSchoolTemplateAllocateList", this.$route.query.id)
        .then((res) => {
          this.tableData = res.data.templateDTOList;
          for (let key in res.data) {
            this[key] = res.data[key];
          }
          this.error = false;
          this.loading = false;
        })
        .catch((err) => {
          this.error = true;
          this.loading = false;
          this.$message.error({
            text: this.$t("school.templateList.errorTips.nolist") + err,
          });
        });
    },
    selectTemplate(index) {
      let hasDistribute = !this.tableData[index].hasDistribute;
      this.$set(this.tableData, index, {
        ...this.tableData[index],
        hasDistribute,
        authCount: hasDistribute ? 0 : null,
      });
    },
    selectAllTemplate() {
      let toggle = this.allSelected;
      this.tableData.forEach((item, index) => {
        this.$set(this.tableData, index, {
          ...this.tableData[index],
          hasDistribute: !toggle,
        });
      });
    },
    setAuthCount(count, index) {
      console.log(count, index);
      this.$set(this.tableData, index, {
        ...this.tableData[index],
        authCount: parseInt(count),
      });
    },
    submit() {
      console.log(this.form);
      this.$store
        .dispatch("school/saveSchoolTemplateAllocate", this.form)
        .then((res) => {
          this.$message.message({
            text: this.$t("school.templateAllocate.successTips.saveSuccess"),
          });
          this.goBack();
        })
        .catch((err) => {
          this.$message.error({
            text: this.$t("school.templateAllocate.errorTips.saveFail") + err,
          });
        });
    },
  },
};
</script>

<style lang="scss">
.TemplateAllocate {
  .table {
    .input {
      input {
        text-align: center;
      }
    }
    .el-table::before {
      height: 0;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #4b77f6;
      border-color: #4b77f6;
    }
    .el-table th > .cell {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
    }
    .el-table td {
      padding: 12px 0;
      vertical-align: top;
    }
    .el-table th.is-leaf {
      padding: 20px 0;
    }
    .el-table th {
      background-color: #f6f8fa;
    }
    .el-table .cell {
      overflow: initial;
    }
  }
}
</style>

<style lang="scss" scoped>
.TemplateAllocate {
  width: 100%;
  padding: 23px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  .content {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-content: flex-start;
    padding: 0 23px 28px 23px;
    .content-item {
      display: flex;
      flex-direction: column;
      align-content: flex-start;
      .title-box {
        display: flex;
        flex-direction: row;
        align-items: center;
        .leftline {
          width: 2px;
          height: 16px;
          background-color: #4b77f6;
        }
        .title {
          width: fit-content;
          padding-left: 8px;
          font-size: 16px;
          color: #333333;
          line-height: 22px;
          white-space: nowrap;
        }
      }
      .form {
        display: flex;
        flex-direction: column;
        margin-top: 22px;
        .form-item + .form-item {
          margin-top: 24px;
        }
        .form-item {
          display: flex;
          flex-direction: row;
          margin-left: 10px;
          .item-label {
            margin-right: 29px;
            font-size: 14px;
            color: #333333;
            line-height: 32px;
            white-space: nowrap;
          }
          .item-content {
            font-size: 14px;
            color: #333333;
            line-height: 20px;
            width: 100px;
          }
        }
      }
    }
  }
  .table {
    padding: 0 23px;
    width: 100%;
    box-sizing: border-box;
    .tableHeader-text {
      font-size: 14px;
      font-family: AlibabaPuHuiTiM;
      color: #333333;
      line-height: 20px;
      white-space: nowrap;
      width: fit-content;
    }
    .input {
      padding: 4px 5px;
      width: 68px;
    }
    .tableRow-text {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      width: fit-content;
      // white-space: nowrap;
    }
    .tableRow-selector {
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
    .statusBox {
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      .dotBox {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 20px;
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #d3d3d3;
          margin-right: 4px;
        }
        .dot--finish {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #53c41b;
          margin-right: 4px;
        }
        .dot--doing {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #ffbe3d;
          margin-right: 4px;
        }
      }
    }
    .tableRow-longText {
      white-space: normal;
    }
    .tableRow-name {
      color: #333333;
    }
    .tableRow-button {
      color: #4b77f6;
      cursor: pointer;
      white-space: nowrap;
    }
  }
  .buttonBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 12px 0;
    width: 100%;
    border-top: 1px solid #d3d3d3;
    margin-top: 14px;
    .button {
      width: 90px !important;
    }
    .button + .button {
      margin-left: 80px;
    }
  }
}
</style>