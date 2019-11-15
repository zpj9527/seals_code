<template>
  <div class="program">
    <div class="head">
      <span style="margin-right: 20px">薪酬方案</span>
      <el-button type="primary" size="mini" @click="add_program">添加</el-button>
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
          prop="time_type"
          label="工时制">
          <template slot-scope="scope">
            <span v-if="scope.row.time_type===1">5天工作制</span>
            <span v-else-if="scope.row.time_type===2">6天工作制</span>
            <span v-else-if="scope.row.time_type===3">7天工作制</span>
            <span v-else>21.75天计薪制</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="effect_date"
          label="生效日期">
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
  </div>
</template>

<script>
  export default {
    name: "program",
    data() {
      return {
        url: this.api.api_9530_9503,
        newlists: [],
        pagesize: 10,
        total: 10,
      }
    },
    created() {
      let that = this;
      that.ascertain();
    },
    methods: {
      /**添加薪酬方案----跳转路由*/
      add_program() {
        let that = this;
        that.$router.push({
          path: `/pay/establish`,
        });
        sessionStorage.setItem("operation", "0")
      },
      /**获取薪酬方案*/
      ascertain() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/salary/plan/list",
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
        sessionStorage.setItem("operation", "1")
        sessionStorage.setItem("row_id", row.id)
        console.log(row, column, cell, event);
        that.$router.push({
          path: `/pay/establish`,
        });

      },
      /**点击分页上的页数*/
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.$axios({
          url: that.url + "/v1/salary/plan/list",
          method: "get",
          params: {
            page_num: curPage
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
      }
    },

  }
</script>

<style lang="less" scoped>
  .program {
    width: 96%;
    height: 100%;
    margin-left: 10px;
    background: white;
    overflow-y: scroll;
    .head {
      margin: 10px;
    }
    .paging_table {
      margin-left: 10px;
      background: white;
    }
  }
</style>
