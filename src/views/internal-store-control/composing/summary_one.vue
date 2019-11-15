<template>
  <div class="summary_one">
    <!--支付方式 -->
    <div class="shopping">
      <span
        style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">考勤一览表</span>
      <ul class="title">
        <li>
          <span>部门:</span>
          <el-select v-model="section" placeholder="请选择部门" size="mini" @change="filtrate" clearable
                     style="width: 130px;">
            <el-option
              v-for="item in dept_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>用户:</span>
          <el-select v-model="staff" placeholder="请选择用户" size="mini" style="width: 130px;" clearable @change="filtrate">
            <el-option
              v-for="item in man_list"
              :key="item.id"
              :label="item.real_name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>班次:</span>
          <el-select v-model="shift" placeholder="请选择班次" size="mini" style="width: 130px;" clearable @change="filtrate">
            <el-option
              v-for="item in income_data"
              :key="item.id"
              :label="item.desc_cn"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>打卡日期 :</span>
          <el-date-picker
            style="width: 150px;"
            v-model="date"
            @change="filtrate"
            size="mini"
            clearable
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </li>
      </ul>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          :cell-style="{textAlign:'center'}"
          max-height="700"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="user_id.real_name"
            label="人员">
          </el-table-column>
          <el-table-column
            prop="user_id.dept_name"
            label="部门">
          </el-table-column>
          <el-table-column
            prop="shift_id.desc_cn"
            label="班次代码">
          </el-table-column>
          <el-table-column
            prop="duty_date"
            width="130"
            label="轮值日期">
          </el-table-column>

          <el-table-column
            prop="checkin_time"
            width="230"
            label="考勤时间">
            <template slot-scope="scope">
              <span v-if="scope.row.check_in_or_out === 0">
                <span style="color: green">开始时间：</span> {{scope.row.duty_time}}
              </span>
              <span v-else-if="scope.row.check_in_or_out === 1">
                <span style="color: red">结束时间：</span>{{scope.row.duty_time}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="checkin_time"-->
          <!--width="130"-->
          <!--label="考勤开始">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="duty_place_id"
            width="180"
            label="考勤地点">
            <template slot-scope="scope">
              <span v-if="scope.row.duty_place_id">
                {{scope.row.duty_place_id.name}}
              </span>
              <span v-else-if="!scope.row.duty_place_id ">
                {{scope.row.duty_place}}</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
            <!--prop="duty_time"-->
            <!--width="130"-->
            <!--label="结束时间">-->
          <!--</el-table-column>-->

          <!--<el-table-column-->
          <!--prop="checkout_place"-->
          <!--width="130"-->
          <!--label="结束考勤地点">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="duty_type_id"
            width="130"
            label="考勤方式">
            <template slot-scope="scope">
              <span v-if="scope.row.duty_type_id === 0">手机</span>
              <span v-else-if="scope.row.duty_type_id === 1">指纹</span>
              <span v-else>面部识别</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="verified"
            label="是否查核">
            <template slot-scope="scope">
              <span v-if="scope.row.verified === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="verify_user.real_name"
            label="查核人">
          </el-table-column>

          <!--<el-table-column-->
          <!--prop="address"-->
          <!--width="150 "-->
          <!--fixed="right"-->
          <!--label="操作">-->
          <!--<template slot-scope="scope" >-->
          <!--<el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>-->
          <!--<el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

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
  </div>
</template>

<script>
  export default {
    name: "summary_one",
    data() {
      return {
        // 'http://47.98.113.173:9530'
        url: this.api.api_9530_9503,
        //分页
        total: 10,
        pagesize: 10,
        cur_page: 1,
        dept_list: [],//获取部门
        dialogVisible: false,//修改页面的显示和隐藏
        //收支
        in_out: [
          {
            value: '收',
            label: '收'
          }, {
            value: '支',
            label: '支'
          },
        ],
        income_list: [],//考勤一览表
        /**筛选里的内容*/
        section: '',//部门
        staff: '',//用户
        shift: '',//班次
        date: '',//时间
        man_list: [],//获取用户
        income_data: [],//获取班次
      }
    },
    created: function () {
      let that = this;
      // that.authorization = sessionStorage.getItem("authorization");
      console.info(that.authorization);
      that.enter_code();//获取考勤
      that.examine();//获取部门
      that.employee();//获取用户
      that.enter_data_type();//获取班次
    },
    methods: {
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          desc: '',//中文描述
          desc_en: '',//英文描述
          code: '',//代码
          create_time: '',//创建时间
          create_user: '',//创建用户
          modify_time: '',//修改时间
          modify_user: "",//修改用户
        };
           that.is_sys = '',//是否系统码
          that.is_group = "",//是否集团码
          that.belong_to_balance = '',//归属部门
          that.is_halt = '',//是否停用
          that.app_id = '',//所属模块
          that.in_or_out = ''//收支
      },
      //查看部门信息
      examine() {
        let that = this;
        that.$axios({
          // http://47.98.113.173:9022
          url: that.api.api_9022_9519 + "/v1/common/dept/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data);
              that.dept_list = res.data.data.list;
            }
            else {

            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取人员列表
      employee() {
        this.$axios({
          url: this.api.api_9022_9519 + "/v1/common/employee/info_list",
          method: "get",
          params: {
            page_size: 999,
          }

        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              // this.total=res.data.data.total_count;
              this.man_list = res.data.data.list;

            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            // console.log(error);
          });
      },
      //封装获取班次设置列表
      enter_data_type() {
        let that = this
        that.$axios({
          url: that.url + "/v1/manage/duty_shift/hotel_shifts",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            console.log(res.data.message)
            if (res.data.message === "success") {
              console.log(res)
              that.income_data = res.data.data.list
            }
            else {
              // that.error_message(res.data.message)
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //封装获取考勤列表
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/manage/duty_record/hotel_records",
          method: "get",
          params: {
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.income_list = res.data.data.list
              that.total = res.data.data.total_count;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      filtrate() {
        let that = this
        that.$axios({
          url: that.url + "/v1/manage/duty_record/hotel_records",
          method: "post",
          data: {
            dept_id: that.section,
            user_id: that.staff,
            shift_id: that.shift,
            duty_date: that.date,
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list
              that.total = res.data.data.total_count;
            }
            else {
              that.error_message(res.data.message)
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
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/manage/duty_record/hotel_records",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize
          },

        })
          .then(res => {
            if (res.data.message == "success") {
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

    }
  }
</script>

<style lang="less" scoped>
  .summary_one {
    width: 96%;
    height: 96%;
    margin-left: 10px;
    background: white;
    overflow-y:scroll;
    .title {
      min-width: 1200px;
      margin-bottom: 10px;
      li {
        display: inline-block;
        margin-left: 10px;
        button {
          width: 80px;
          height: 30px;
          background: rgba(68, 136, 233, 1);
          border: none;
          border-radius: 4px;
          color: white;
          margin-left: 20px;
        }
      }
    }
    .shopping {
      /*margin-top: 20px;*/
      .shopping_title {
        li {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .dialog_style {
      overflow: hidden;
      li {
        float: left;
        width: 50%;
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 130px;
        }
      }
    }
  }
</style>
<style>
  /*.el-table .cell{*/
  /*text-align:center;*/
  /*}*/
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
  /*z-index: 0;*/
  /*}*/
</style>
