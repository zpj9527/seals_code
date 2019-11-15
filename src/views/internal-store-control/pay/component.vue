<template>
  <div class="component">
    <div class="head">
      <span style="margin-right: 20px">薪酬分项设置</span>
      <el-button type="primary" size="mini" @click="add_program" style="width: 80px;">添加</el-button>
    </div>
    <!--模块列表-->
    <div class="paging_table">
      <el-table
        :data="newlists"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        size="mini"
        @cell-dblclick="tableDbEdit"
        style="width: 100%;"
      >
        <el-table-column
          prop="name"
          fixed
          label="名称">
        </el-table-column>
        <el-table-column
          prop="income_or_deduct"
          label="类型">
          <template slot-scope="scope">
            <span v-if="scope.row.income_or_deduct===1">扣减项</span>
            <span v-else-if="scope.row.income_or_deduct===0">收入项</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建日期日期">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="address"-->
        <!--width="190"-->
        <!--fixed="right"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="cancel(scope.row.id,scope.$index, newlists)"type="danger" size="mini" disabled>删除</el-button>-->
        <!--<el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

      </el-table>
      <!--分页-->
      <el-pagination style="float: right;"
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
    <!--添加薪酬分项设置的页面-->
    <el-dialog
      :visible.sync="dialog"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <ul class="mask_information">
        <li>
          <span><i style="color: red;font-size: 18px">*</i>名称：</span>
          <el-input v-model="name" placeholder="请输入名称" size="mini" style="width: 210px;"></el-input>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px">*</i>类型：</span>
          <el-radio v-model="income_or_deduct" label="0">收入项</el-radio>
          <el-radio v-model="income_or_deduct" label="1">扣减项</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel()" type="danger" size="mini">删除</el-button>
        <el-button @click="dialog = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="preserve_keep()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "component_payment",
    data() {
      return {
        url: this.api.api_9530_9503,
        newlists: [],
        pagesize: 10,
        total: 10,
        title: '',
        id: '',
        mark: false,//标志位
        dialog: false,
        name: '',//名称
        income_or_deduct: '',//类型
      }
    },
    created() {
      let that = this;
      that.ascertain();
    },
    methods: {
      /**添加薪酬分项*/
      add_program() {
        let that = this;
        that.title = "新增薪酬分项"
        that.dialog = true;
        that.name = '';//名称
        that.income_or_deduct = 0 + "";//类型
        that.mark = false;
      },
      /**添加或者修改薪酬分项的确定*/
      preserve_keep() {
        let that = this;
        let symbol = that.mark ? (that.url + "/v1/salary/item/update/" + that.id) : (that.url + "/v1/salary/item/add");
        if (that.name === "") {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: symbol,
            method: "post",
            data: {
              name: that.name,
              income_or_deduct: that.income_or_deduct + "",
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.ascertain();
                that.dialog = false;
                if (that.mark) {
                  that.hintInfo("success", "修改薪酬分项设置成功")
                } else {
                  that.hintInfo("success", "新增薪酬分项设置成功")
                }
              }
              else {
                console.log(res.data.message);
              }

            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /**获取薪酬方案*/
      ascertain() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/salary/item/list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.newlists = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      /**双击表格进入修改*/
      tableDbEdit(row, column, cell, event) {
        let that = this;
        console.log(row, column, cell, event);
        that.id = row.id;
        that.mark = true;
        that.title = "修改薪酬分项"
        that.dialog = true;
        that.name = row.name;
        that.income_or_deduct = row.income_or_deduct + "";
      },
      /**删除薪酬分项设置*/
      cancel() {
        let that = this;
        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          that.newlists.splice(that.index, 1);
          that.$axios({
            url: that.url + "/v1/salary/item/delete/" + that.id,
            method: "get",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                that.ascertain();
                that.dialog = false
              }

            })
            .catch(error => {
              console.log(error);
            })

        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      /**点击分页上的页数*/
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.$axios({
          url: that.url + "/v1/salary/item/list",
          method: "get",
          params: {
            page_num: curPage,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.newlists = res.data.data.list;
              // that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //新增的显示与隐藏
      handleClose(done) {
        done();
      },
      /**
       * @hintInfo 操作提示信息
       * @param hint  成功提示
       * @param info 警告信息
       */
      hintInfo: function (hint, info) {
        let that = this;
        if (hint === "success") {
          that.$message({
            message: info,
            type: 'success'
          });
        } else if (hint === "warning") {
          that.$message({
            message: info,
            type: 'warning'
          });
        } else {
          this.$message.error('出错了！');
        }
      },
    },

  }
</script>

<style lang="less" scoped>
  .component {
    width: 96%;
    height: 97%;
    margin-left: 10px;
    overflow-y: scroll;
    background: white;
    .head {
      margin: 10px;
    }
    .paging_table {
      margin-left: 10px;
      background: white;
    }
    .mask_information {
      li {
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 60px;
        }
      }
    }
  }
</style>
