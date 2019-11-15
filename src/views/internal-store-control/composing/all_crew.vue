<template>
  <div class="all_crew">
    <div class="title">
      <h4 style="padding: 10px 0 10px 10px;display: inline-block">所有排班列表</h4>
      <el-button type="primary" size="mini" @click="" style="margin-bottom: 10px;margin-left: 12px" @click="back">
        返回排班列表
      </el-button>
      <ul>
        <li>
          <span>起始日期筛选：</span>
          <el-date-picker
            v-model="from_data"
            size="mini"
            style="width: 150px;"
            type="date"
            value-format="yyyy-MM-dd"
            @change="screen"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span>部门筛选：</span>
          <el-select v-model="dept_name" clearable placeholder="请选择部门搜索" size="mini" style="width: 150px;"
                     @change="screen">
            <el-option
              v-for="item in dept_list"
              :key="item.value"
              :label="item.name"
              size="mini"
              style="margin-top: 20px"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span style="margin-right: 10px">筛选所有未排班：</span>
          <el-checkbox v-model="scheduled" @change="screen"></el-checkbox>
        </li>
        <li style="float: right">
          <!--<el-button type="primary" size="mini" style="width: 80px;">自动排班</el-button>-->
        </li>
      </ul>
    </div>
    <div class="status">
      <el-table
        :data="income_list"
        size="mini"
        :cell-style="{textAlign:'center'}"
        max-height="700"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <!--<el-table-column-->
        <!--prop="init_date"-->
        <!--label="起始日期">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="dept_name"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="user_real_name"
          label="员工">
        </el-table-column>
        <el-table-column
          prop="duty_cycle_name"
          label="排班方式">
          <template slot-scope="scope">
            <span v-if="scope.row.duty_cycle_name ">{{scope.row.duty_cycle_name}}</span>
            <span v-else>未排班</span>
          </template>
        </el-table-column>

      </el-table>

      <!--分页-->
      <el-pagination style="float: right;margin-right: 2%"
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
    name: "all_crew",
    data() {
      return {
        // "http://47.98.113.173:9530",
        url: this.api.api_9530_9503,
        total: 10,
        pagesize: 10,
        value1: '',
        income_list: [],//所有排班列表
        scheduling_list: [],//排版方式
        dept_list: [],//获取部门
        dept_name: '',//部门
        checked: false,
        from_data: '',//起始日期
        scheduled: false,//所有未排班
      }
    },
    created() {
      let that = this;
      that.examine();//获取部门
      that.scheduling();
      that.schedu_type();//所有排版方式
    },
    methods: {
      /**封装获取部门*/
      examine() {
        let that = this;
        that.$axios({
          url: that.api.api_9022_9519 + "/v1/common/dept/info_list",
          method: "post",
          data:{
            page_size:999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.dept_list = res.data.data.list;

            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取排班方式
      schedu_type() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/list",
          method: "get",
          params: {
            user_id: "",
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.scheduling_list = res.data.data.list;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //获取所有排班列表
      scheduling() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/hotel_cycles",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.income_list = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //返回上一级
      back() {
        this.$router.go(-1);//返回上一层
      },
      //筛选
      screen() {
        let that = this;
        let scheduled;
        if (that.scheduled === true) {
          scheduled = 0
        } else {
          scheduled = 1
        }
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/hotel_cycles",
          method: "post",
          data: {
            dept_id: that.dept_name,
            from_date: that.from_data,
            scheduled: scheduled + "",//所有未排班
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.income_list = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },

      //点击分页上的页数
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        let scheduled;
        if (that.scheduled === true) {
          scheduled = 0
        } else {
          scheduled = 1
        }
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/hotel_cycles",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            dept_id: that.dept_name,
            from_date: that.from_data,
            scheduled: scheduled + "",//所有未排班
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.income_list = res.data.data.list
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


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
  .all_crew {
    width: 96%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow-y: scroll;
    .title {
      min-width: 1200px;
      ul {
        overflow: hidden;
        li {
          float: left;
          margin-left: 10px;
        }
      }
    }
    .status {
      margin-top: 10px;
    }
  }
</style>
