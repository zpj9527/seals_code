<template>
  <div class="crew">
    <!--支付方式 -->
    <div class="shopping">
      <div class="shopping_title">
        <h4 style="padding: 10px 0 10px 10px;display: inline-block">人员排班列表</h4>
        <!--<span style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">人员排班列表</span>-->
        <!--<el-button type="text" >-->
        <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
        <!--</el-button>-->
        <!--<button @click="dialogVisible = true; flush()" style="width: 80px;height: 27px;line-height: 27px;background: #4488e9;border:none;border-radius: 3px;color:white ;margin-top: 14px">新增</button>-->
        <router-link to="/composing/all_crew" style="display: inline-block;margin-top: 14px">
          <el-button type="primary" size="mini" style="margin-bottom: 10px;margin-left: 12px">查看所有排班列表</el-button>
        </router-link>
        <div style="margin-bottom: 10px;">
          <span style="margin-left: 10px ;margin-right: 10px">排班部门</span>
          <el-select v-model="dept_name" clearable placeholder="请选择部门搜索" size="mini" @change="search"
                     style="width: 150px;">
            <el-option
              v-for="item in dept_list"
              :key="item.value"
              :label="item.name"
              size="mini"
              style="margin-top: 20px;"
              :value="item.id">
            </el-option>
          </el-select>
          <!--<button style="width:80px;-->
          <!--height:28px;-->
          <!--background:rgba(68,136,233,1);-->
          <!--border: none;-->
          <!--border-radius:4px;-->
          <!--color: white;-->
          <!--margin-left: 20px;"  @click="search">搜索</button>-->
          <el-button type="primary" size="mini" style="float: right;margin-right: 20px;width: 80px;"
                     @click="crew_rostering()">排班
          </el-button>
        </div>
      </div>


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
            prop="dept_name"
            label="所属部门">
          </el-table-column>
          <el-table-column
            prop="user_real_name"
            label="人员">
          </el-table-column>
          <el-table-column
            prop="duty_cycle_id"
            label="排班方式">
            <!--<el-table-colum  v-for="(col,index)   in   duty_cycles"    :key="index">-->
            <!--<span>{{col}}</span>-->
            <!--<template   slot-scope="scope" >-->
            <!--<el-select    v-model="scope.row.duty_style" placeholder="请选择" clearable style="width: 217px;" size="mini"  >-->
            <!--<el-option-->
            <!--v-for="item in  scope.row.duty_cycles"-->
            <!--:key="item.id"-->
            <!--:label="item.name"-->
            <!--:value="item.id">-->
            <!--</el-option>-->
            <!--</el-select>-->
            <!--</template>-->
            <!--</el-table-colum>-->
            <template slot-scope="scope">
              <el-select v-model="scope.row.duty_cycle_id" placeholder="请选择" clearable style="width: 217px;"
                         size="mini">
                <el-option
                  v-for="item in scheduling_list "
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>

        </el-table>

        <!--&lt;!&ndash;分页&ndash;&gt;-->
        <!--<el-pagination style="float: right;margin-right: 2%"-->
        <!--layout="prev, pager, next"-->
        <!--:page-size="pagesize"-->
        <!--@current-change="handleCurrentChange"-->
        <!--:total="total">-->
        <!--</el-pagination>-->
      </div>
      <!--点击排班显示的页面-->
      <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        title="选择日期"
        width="26%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>起始日期 ：</span>
            <el-date-picker
              v-model="start_date"
              size="mini"
              value-format="yyyy-MM-dd"
              type="date"
              :picker-options="pickerOptionsStart"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <!--<li >-->
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <!--<span>终止日期 ：</span>-->
          <!--<el-date-picker-->
          <!--v-model="end_date"-->
          <!--size="mini"-->
          <!--value-format="yyyy-MM-dd"-->
          <!--type="date"-->
          <!--:picker-options="pickerOptionsEnd"-->
          <!--placeholder="选择日期">-->
          <!--</el-date-picker>-->
          <!--</li>-->

        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "crew",
    data() {
      return {
        // "http://47.98.113.173:9530"
        url: this.api.api_9530_9503,
        //分页
        total: 10,
        pagesize: 10,
        dialogVisible: false,//修改页面的显示和隐藏
        duty_cycles: '',
        //工作天数
        in_out: [
          {
            value: '1',
            label: '七 天'
          }, {
            value: '2',
            label: '六 天'
          },
          {
            value: '3',
            label: '五 天'
          },
          {
            value: '4',
            label: '四 天'
          },
          {
            value: '5',
            label: '三 天'
          },
          {
            value: '6',
            label: '二 天'
          },
          {
            value: '7',
            label: '一 天'
          },

        ],
        income_list: [],//人员排班列表
        scheduling_list: [],//排班方式
        dept_list: [],//部门
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        number_list: [],//获取班次
        param: {},//新增入账代码里的内容
        dept_name: '',//筛选部门搜索
        //  人员排班
        dept_id: '',//归属部门
        start_date: '',//开始时间
        end_date: '',//结束时间
        user_id: '',//人员
        shift_id: '',//班次
        list: [],
        pickerOptionsStart: {
          disabledDate: time => {
            let endDateVal = this.end_date;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let beginDateVal = this.start_date;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              );
            }
          }
        },
        duty_arr: [],//拿到后台给的私有排班
      }
    },

    created: function () {
      let that = this;
      that.enter_code();//获取人员排班列表
      that.examine();
      // that.employee();//获取人员列表
      that.scheduling();//排班方式；
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
        that.param = {}
        that.dept_id = '',//归属部门
          that.start_date = '',//开始时间
          that.end_date = '',//结束时间
          that.user_id = '',//人员
          that.shift_id = ''//班次

      },
      //封装获取排班方式
      scheduling() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/list",
          method: "get",
          params: {
            page_size: 999,
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
      /**排班*/
      crew_rostering() {
        let that = this;
        console.log(that.income_list);
        // that.dialogVisible=true;
        that.flush();
        that.ensure();
      },

      //查看部门信息
      examine() {
        let that = this;
        that.$axios({
          // http://47.98.113.173:9022
          url: that.api.api_9022_9519 + "/v1/common/dept/info_list",
          method: "get",
          params: {
            page_size: 999,
          }
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
      //封装获取人员排班列表
      enter_code() {
        let that = this;
        let arr = [];
        let a = [];
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/hotel_cycles",
          method: "post",
          async: false,
          data: {
            page_size: 999,
          }

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list);
              // arr = JSON.stringify(res.data.data.list) ;
              // that.total=res.data.data.total_count;

              for (let i in res.data.data.list) {
                // console.log(res.data.data.list[i].duty_cycles[0] == null);
                // if(!(res.data.data.list[i].duty_cycles[0].id == null)){
                //   res.data.data.list[i].duty_style = ""
                // }else{
                //   res.data.data.list[i].duty_style =  res.data.data.list[i].duty_cycles[0].id
                // }

              }
              that.income_list = res.data.data.list;
              // console.log(JSON.parse(arr));
              console.log(that.income_list)
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
        //获取信息列表
        that.$axios({
          url: "" + that.url + "/v1/manage/duty_cycle/hotel_cycles",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize
          },

        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              that.income_list = res.data.data.list;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
      //  点击删除
      cancel(id, index, list) {
        console.log(id);
        console.log(index);
        console.log(list);
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
          list.splice(index, 1);
          that.$axios({
            url: "" + that.url + "/v1/manage/duty_schedule/delete/" + id,
            method: "get",
            params: {
              remark: 0,
            },
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                that.enter_code();
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
      //点击修改
      amend(srow, id, index, list) {
        let that = this;
        that.Edite = true;
        that.id = id;
        console.log(srow);
        //  入账代码的内容
        that.dept_id = srow.dept_id.id,//归属部门
          that.start_date = srow.start_date,//开始时间
          that.end_date = srow.end_date,//结束时间
          that.user_id = srow.user_id.id,//人员
          that.shift_id = srow.shift_id.id//班次
      },
      //点击排班后的保存
      ensure() {
        let that = this;
        let arr = [];
        console.log(that.income_list);
        for (let item  of that.income_list) {
          arr.push({
            // init_date :that.start_date,
            // end_date : that.end_date,
            // dept_id:item.dept_id,
            // dept_name:item.dept_name,
            // user_name:item.user_name,
            duty_cycle_id: item.duty_cycle_id,
            user_id: item.user_id,
          })

        }
        that.income_list = arr;
        console.log(that.income_list);
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/add_user",
          method: "post",
          data: {
            data: JSON.stringify(that.income_list),
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              that.enter_code();
              that.hintInfo("success", "排班成功")
              that.dialogVisible = false;
              that.dept_name = "";
              that.$router.push({path: '/composing/all_crew'});
            }
            else {
              that.hintInfo("warning", "排班失败")
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },

      //排班部门的筛选
      search() {
        let that = this
        that.$axios({
          url: that.url + "/v1/manage/duty_schedule/hotel_employees",
          method: "post",
          data: {
            dept_id: that.dept_name,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res)
              that.income_list = res.data.data.list
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },

      //修改页面的显示和隐藏
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
    }
  }
</script>

<style lang="less" scoped>
  .crew {
    width: 96%;
    height: 96%;
    margin-left: 10px;
    background: white;
    /*overflow-y: scroll;*/
    .title {
      margin-top: 23px;
      min-width: 1200px;
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
        min-width: 1000px;
      }
    }
    .dialog_style {
      /*overflow: hidden;*/
      li {
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 100px;
        }
      }
    }
  }
</style>
<style>
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
  /*z-index: 0;*/
  /*}*/
  /*.el-date-editor.el-input{*/
  /*width: 220px;*/
  /*}*/
</style>

