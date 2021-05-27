<template>
  <div class="AcountList">
    <div class="list-content">
      <div class="table">
        <el-table
          :data="tableData"
          height="642"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          ><el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column fixed>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("accounts.accountlist.account") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text tableRow-name">
                {{ overline(scope.row.name) }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("accounts.accountlist.type") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">
                {{
                  overline(
                    $tc("accounts.accountlist.accountType", scope.row.type)
                  )
                }}
              </p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("accounts.accountlist.password") }}
              </p>
            </template>
            <template slot-scope="scope">
              <p class="tableRow-text">{{ overline(hidePassword) }}</p>
            </template>
          </el-table-column>
          <el-table-column>
            <template slot="header" slot-scope="scope">
              <p class="tableHeader-text">
                {{ $t("accounts.accountlist.options") }}
              </p>
            </template>
            <template slot-scope="scope">
              <div class="buttons">
                <p
                  class="tableRow-text tableRow-button"
                  @click="editAccount(scope.$index)"
                >
                  {{ $t("accounts.accountlist.editButton") }}
                </p>
                <p
                  class="tableRow-text tableRow-button"
                  @click="deleteAccount(scope.$index)"
                >
                  {{ $t("accounts.accountlist.deleteButton") }}
                </p>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="bottomTools">
      <div class="selection">
        <p class="num">
          {{ $t("accounts.accountlist.selectedNum", { num: selected.length }) }}
        </p>
        <p class="delete" @click="batchDelete">批量删除</p>
      </div>
      <div class="pagination">
        <p class="totalNum">
          {{ $t("global.pagination.totalNum", { num: page.dataNum }) }}
        </p>
        <el-pagination
          background
          layout="prev, pager, next"
          :pager-count="5"
          :page-count="page.total"
          :current-page="page.current"
        >
        </el-pagination>
        <div class="jumper">
          <p>{{ $t("global.pagination.goPage") }}</p>
          <div>
            <input
              v-model="pageNum"
              type="number"
              @focus="enterEvent"
              @blur="removeEnterEvent"
            />
          </div>
          <p>{{ $t("global.pagination.pageUnit") }}</p>
        </div>
      </div>
    </div>
    <EditBox
      :visible.sync="showEditBox"
      :data="tableData[editingAccount]"
      @confirmBtn="saveEdit"
      @closeBtn="closeEdit"
    />
  </div>
</template>

<script>
import EditBox from "../components/editBox";
export default {
  components: {
    EditBox,
  },
  data() {
    return {
      value: "",
      tableData: [
        {
          id: 888,
          name: "SuperAnna",
          type: 0,
          password: "123456",
        },
        {
          id: 123,
          name: "AdminAnna",
          type: 1,
          password: "123456",
        },
        {
          id: 999,
          name: "TeacherAnna",
          type: 2,
          password: "123456",
        },
      ],
      pageNum: 1,
      page: {
        dataNum: 100,
        total: 10,
        size: 10,
        current: 1,
      },
      selected: [],
      showEditBox: false,
      editingAccount: -1,
    };
  },
  computed: {
    hidePassword() {
      return "********";
    },
  },
  methods: {
    editAccount(index) {
      console.log(index);
      this.editingAccount = index;
      this.showEditBox = true;
    },
    saveEdit(info) {
      this.showEditBox = false;
      // this.tableData[index] = {
      //   ...info,
      // };
    },
    closeEdit() {
      this.showEditBox = false;
      this.editingAccount = -1;
    },
    overline(text = "") {
      return text.substring(0, 40) + (text.length > 30 ? "..." : "");
    },
    goPage() {
      this.page = {
        ...this.page,
        current: parseInt(this.pageNum),
      };
    },
    enterEvent() {
      document.onkeydown = (event) => {
        let e = event || window.event;
        if (e && e.keyCode == 13) {
          if (this.pageNum > this.page.total) this.pageNum = this.page.total;
          else if (this.pageNum <= 0 || this.pageNum == "") this.pageNum = 1;
          this.goPage();
        }
      };
    },
    removeEnterEvent() {
      document.onkeydown = () => {};
    },
    handleSelectionChange(val) {
      this.selected = [...val];
    },
    deleteAccount(index) {
      this.$dialog.warning([
        this.$t(`accounts.accountlist.deleteTips`),
        this.$t(`accounts.accountlist.deleteTips2`),
      ]).catch(()=>{});
    },
    batchDelete() {
      this.$dialog.warning([
        this.$t(`accounts.accountlist.deleteTips`),
        this.$t(`accounts.accountlist.deleteTips2`),
      ]).catch(()=>{});
    },
  },
};
</script>
<style lang="scss">
.AcountList {
  .toolsBar {
    .el-select .el-input.is-focus .el-input__inner {
      border-color: #4b78f6;
    }
    .el-input__inner {
      height: 36px;
      line-height: 36px;
      border-radius: 2px;
      font-size: 14px;
      color: #333333;
      padding: 0 12px;
      width: 120px;
    }
  }
  .table {
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #4b77f6;
      border-color: #4b77f6;
    }
    .el-table-column--selection .cell {
      padding-left: 12px;
      padding-right: 12px;
    }
    .el-table th > .cell {
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      padding-left: 12px;
      padding-right: 12px;
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
    .el-table th:nth-last-child(2) {
      .cell {
        justify-content: flex-end;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.AcountList {
  width: 100%;
  // padding: 22px 24px 14px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
  }
  .list-content {
    overflow: hidden;
    width: 100%;
    display: flex;
    flex-direction: column;
    .toolsBar {
      display: flex;
      flex-direction: row;
      width: 100%;
      align-items: center;
      .searchInput {
        width: 300px;
        // margin-left: 12px;
      }
      .button {
        padding: 7px 20px;
        margin-left: 12px;
      }
    }
    .table {
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
        align-items: center;
        .dot--finish {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #53c41b;
          margin-right: 4px;
        }
        .dot--waiting {
          width: 6px;
          height: 6px;
          border-radius: 6px;
          background: #d3d3d3;
          margin-right: 4px;
        }
      }
      .tableRow-longText {
        white-space: normal;
      }
      .tableRow-name {
        color: #333333;
      }
      .buttons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        .tableRow-button {
          color: #4b77f6;
          cursor: pointer;
          white-space: nowrap;
        }
        .tableRow-button + .tableRow-button {
          margin-left: 30px;
        }
      }
    }
  }
  .bottomTools {
    position: relative;
    margin-top: 14px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .selection {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      .num {
        font-size: 14px;
        color: #666666;
        line-height: 20px;
      }
      .delete {
        font-size: 14px;
        color: #4b77f6;
        line-height: 20px;
        border-radius: 2px;
        border: 1px solid #4b77f6;
        padding: 4px 14px;
        cursor: pointer;
        margin-left: 25px;
      }
    }
    .pagination {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      // margin-top: 24px;
      width: 100%;
      .totalNum {
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        margin-right: 18px;
        white-space: nowrap;
      }
      .jumper {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 18px;
        p {
          font-size: 14px;
          color: #666666;
          line-height: 20px;
          white-space: nowrap;
        }
        input {
          padding: 0;
          margin: 0;
          margin-left: 8px;
          margin-right: 8px;
          padding-left: 4px;
          padding-right: 4px;
          width: 46px;
          height: 28px;
          border-radius: 4px;
          border: 1px solid #dddfe6;
          box-sizing: border-box;
          transition: all 0.1s;
          background: none;
          outline: none;
          font-size: 14px;
          color: #666666;
          line-height: 20px;
          text-align: center;
        }
        input:focus {
          border: 1px solid #4b78f6;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      }
      // }
    }
  }
}
</style>