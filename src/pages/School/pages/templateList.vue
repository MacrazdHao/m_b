<template>
  <div class="TemplateList">
    <div class="table">
      <el-table
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
              {{ $t("school.templateList.totalNum") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="tableRow-text tableRow-name">
              {{ scope.row.authCount || 0 }}
            </p>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot="header" slot-scope="scope">
            <p class="tableHeader-text">
              {{ $t("school.templateList.remainNum") }}
            </p>
          </template>
          <template slot-scope="scope">
            <p class="tableRow-text tableRow-name">
              {{ scope.row.remainAuthCount || 0 }}
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="buttonBox">
      <CButton
        class="button"
        theme="blue"
        :text="$t('school.templateList.cancelButton')"
        @btnClick="goBack()"
      />
    </div>
  </div>
</template>

<script>
import CButton from "@/components/common/button.vue";
import defaultBackMixin from "@/mixins/defaultBack";
export default {
  mixins: [defaultBackMixin],
  components: {
    CButton,
  },
  data() {
    return {
      loading: false,
      error: false,
      tableData: [],
    };
  },
  mounted() {
    this.$emit("setSuffixMenu", [this.$t("school.templateList.title")]);
    this.initList();
  },
  methods: {
    initList() {
      this.error = false;
      this.loading = true;
      this.$store
        .dispatch("school/getSchoolTemplateList", this.$route.query.id)
        .then((res) => {
          this.tableData = res.data.templateDTOList;
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
  },
};
</script>

<style lang="scss">
.TemplateList {
  .table {
    .el-table::before {
      height: 0;
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
.TemplateList {
  width: 100%;
  padding: 23px 0 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
    .tableRow-text {
      font-size: 14px;
      color: #666666;
      line-height: 20px;
      width: fit-content;
      // white-space: nowrap;
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
    .button {
      width: 90px !important;
    }
    .button + .button {
      margin-left: 80px;
    }
  }
}
</style>