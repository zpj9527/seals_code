<template>
  <div class="crew_calendar">
    <div class="title">
      <h4 style="margin: 10px">排班日历列表</h4>
      <ul class="calendar" style="margin-left: 10px">
        <span>选择排班日期：</span>
        <li>
          <span>起始日期 ：</span>
          <el-date-picker
            style="width: 150px;"
            v-model="start_date"
            size="mini"
            type="date"
            @change="set_time"
            :picker-options="pickerOptionsStart"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span>终止日期 ：</span>
          <el-date-picker
            style="width: 150px;"
            v-model="end_date"
            size="mini"
            type="date"
            @change="get_diff"
            :picker-options="pickerOptionsEnd"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span>部门 ：</span>
          <el-select v-model="department" placeholder="请选择" size="mini" style="width: 150px;" @change="section" clearable @focus="exhibition">
            <el-option
              v-for="item in dept_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
      </ul>
    </div>
    <div class="content">
      <el-table
        :data="circulation_arr"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        size="mini"
        height="97%"
        style="width: 100%;overflow-x: scroll;">
        <el-table-column
          prop="user_real_name"
          fixed="left"
          width="90"
          label="人员">
        </el-table-column>
        <el-table-column
          prop="dept_name"
          width="90"
          label="部门">
        </el-table-column>
        <template v-if="end_star">
          <el-table-column v-for="(col,index)   in base_title" :prop="col.prop" :label="col.label" :key="index"
                           width="120">
            <template slot-scope="scope">
              <el-select v-model="scope.row.shifts[index][col.label].id" placeholder="休息" clearable size="mini">
                <el-option
                  v-for="item in scheduling_list"
                  :key="item.id"
                  :label="item.desc_cn"
                  :value="item.id">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </template>
        <!--res.data.data.list[0].shifts[0]['2019-09-19'].id-->
        <template v-else>
          <el-table-column v-for="(col,index)   in base_title" :prop="col.prop" :label="col.label" :key="index">
            <template slot-scope="scope">
              <el-select  v-model="scope.row.shifts[index][col.label].id" placeholder="休息" clearable size="mini">
                <el-option
                  v-for="item in scheduling_list"
                  :key="item.id"
                  :label="item.desc_cn"
                  :value="item.id">
                </el-option>
              </el-select>

            </template>
          </el-table-column>
        </template>

        <!--这个是生成动态表头，并且取到后台数据相对应的值渲染页面，-->

      </el-table>
      <div class="foot" style="float: right;margin: 10px">
        <el-button size="mini" type="primary" @click="confirm"> 确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Template from "../../pursesteward/advanced/template";
  import ElTabPane from "element-ui/packages/tabs/src/tab-pane";

  export default {
    components: {
      ElTabPane,
      Template
    },
    name: "crew_calendar",
    data() {
      return {
        url: this.api.api_9530_9503,
        base_title: [],//动态修改表头
        base_title_future: [],//动态修改未来房情的表头
        start_date: '',//开始日期
        end_date: '',//终止日期
        prop: '',
        end_star: false,
        circulation_arr: [
          // {
          //   cycle_days:'财务',
          //   man:'zzz',
          //   "2019-06-05" : 3,
          //   "2019-06-06" : 2,
          //   "2019-06-07" : 1,
          //   "2019-06-08" : 3,
          //   "2019-06-09" : 1,
          //   "2019-06-10" : 2,
          //   "2019-06-11" : 1,
          // },
          // {
          //   cycle_days:'安保',
          //   man:'9527',
          //   "2019-06-05" : 3,
          //   "2019-06-06" : 2,
          //   "2019-06-07" : 1,
          //   "2019-06-08" : 1,
          //   "2019-06-09" : 2,
          //   "2019-06-10" : 3,
          //   "2019-06-11" : 1,
          // },

        ],//列表
        department:'',//选择的部门
        dept_list:[],//部门
        /**这个是控制时间--终止时间要大于开始时间*/
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
        scheduling_list: [],//班次
        count_days: 0,
        duty_cycle_id: '',
        to_date: '',//终止时间
        from_date: '',//起始时间
      }
    },
    created() {
      let that = this;
      that.enter_code();//获取班次选择
      that.change_days();//table的表头数量
    },
    watch:{
      base_title(val){
        console.log(val);
        let start_time = val[0].label;
        let end_time = val[val.length - 1].label;
        console.log(start_time, end_time);
        this.kalendar(start_time,end_time);//后端请求数据
      }
    },
    methods: {
      /**
       * @set_time 重置用户选择的时间
       */
      set_time() {
        let that = this;
        console.info(that.start_date);
        that.change_days();

      },
      /**
       * @getTime 获取当前日期
       */
      getTime() {
        let that = this;
        let date = '';
        that.start_date ? date = that.start_date : date = new Date();
        let year = date.getFullYear(); //获取年
        let month = date.getMonth() + 1;//获取月
        let day = date.getDate(); //获取当日
        let time = year + "-" + month + "-" + day; //组合时间
        return time;
      },

      /**
       * @change_days 改变table的表头数量
       */
      change_days() {
        let that = this;
        console.info(that.count_days);
        that.base_title = [];
        that.base_title_future = [];
        let Max_length = that.count_days === 0 ? 7 : that.count_days + 1;
        console.info(Max_length);
        if(Max_length>=31){
          that.hintInfo("warning", "间隔时间不能大于31天")
          that.end_date = ""
        }
        for (let i = 0; i <Max_length; i++) {
          //that.value_date =  that.value_dateVal;
          /**
           * 右侧的未来七天的信息
           */
          let param = {
            label: that.getDay(i),
            prop: that.getDay(i)
          };
          that.base_title.push(param);
        }
        console.info(that.base_title);
        //给了一个默认时间
        // that.start_date = that.base_title[0].label;
        // that.end_date = that.base_title[4].label;
        // //默认时间赋值
        // that.from_date = that.base_title[0].label;
        // that.to_date = that.base_title[4].label;
        // //调取默认时间段内的数据
        // that.kalendar();
      },

      get_diff() {
        let that = this;
        if (that.start_date === "") {
          that.hintInfo("warning", "请选择开始时间");
          that.end_date = ""
        } else {
          let start_year = that.start_date.getFullYear(); //获取年
          let start_month = that.start_date.getMonth() + 1;//获取月
          let start_day = that.start_date.getDate(); //获取当日
          let start_time = start_year + "-" + start_month + "-" + start_day + " 00:00:00";
          let end_year = that.end_date.getFullYear(); //获取年
          let end_month = that.end_date.getMonth() + 1;//获取月
          let end_day = that.end_date.getDate(); //获取当日
          let end_time = end_year + "-" + end_month + "-" + end_day + " 00:00:00";
          console.info(start_time);
          console.info(end_time);
          that.from_date = start_year + "-" + start_month + "-" + start_day;
          that.to_date = end_year + "-" + end_month + "-" + end_day;
          let end = end_time.split(" ")[0].split("-")[0] + end_time.split(" ")[0].split("-")[1] + end_time.split(" ")[0].split("-")[2];
          let start = start_time.split(" ")[0].split("-")[0] + start_time.split(" ")[0].split("-")[1] + start_time.split(" ")[0].split("-")[2];
          console.log(that.DateDiff(end_time,start_time));
          if (that.DateDiff(end_time,start_time) <= 0  ) {
            that.hintInfo("warning", "终止时间不能小于开始时间")
            that.end_date = '';
            return false;
          } else if (that.DateDiff(end_time, start_time) >= 31) {
            that.hintInfo("warning", "间隔时间不能大于31天")
            that.end_date = ""
          }
          else {
            console.log(end, start);
            console.log(end - start);
            that.DateDiff(end_time, start_time);
            that.change_days();
            that.kalendar(that.from_date,that.to_date);//后端请求数据
          }
          if (that.DateDiff(end_time,start_time) > 10 ) {
            that.end_star = true
          } else {
            that.end_star = false
          }

        }

      },
      /**
       * @getTime 获取当前日期
       */

      /**封装起始时间和终止时间传给后台，获取相对应的数据*/
      kalendar(from_date,to_date) {
        let that = this;
        that.$axios({
          url: that.url + "/v1/manage/duty_schedule/hotel_schedules",
          method: "post",
          data: {
            from_date: from_date,
            to_date: to_date,
            dept_id:that.department,
            page_size:999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.info(res);
              // that.base_title = res.data.data.list[0].shifts;
              that.circulation_arr = res.data.data.list;
              if (that.circulation_arr.length === 0) {
                that.hintInfo("warning", "选取时间段暂时没有排班")
              }
            } else {

            }
          })
          .catch(error => {
            console.error(error)
          })
      },
      exhibition(){
         let that =this;
        that.examine();//获取部门
      },
      /**根据部门查询数据*/
      section(){
        let that = this;
        console.log(that.base_title);
        if(that.from_date===""|| that.to_date===""){
            that.from_date=that.base_title[0].label;
            that.to_date = that.base_title[that.base_title.length - 1].label
        }
        that.$axios({
          url: that.url + "/v1/manage/duty_schedule/hotel_schedules",
          method: "post",
          data: {
            dept_id:that.department,
            from_date: that.from_date,
            to_date: that.to_date,
            page_size:999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              // console.info(res.data.data.list[0].shifts);
              // that.base_title = res.data.data.list[0].shifts;
              that.circulation_arr = res.data.data.list;
              if (that.circulation_arr.length === 0) {
                that.hintInfo("warning", "选取时间段暂时没有排班")
              }
            } else {

            }
          })
          .catch(error => {
            console.error(error)
          })
      },
      /**
       * @getDay 获取日期
       * @doHandleMonth
       * @getWeek 获取当前星期
       */
      getDay(day) {
        let that = this;
        let curr_data = new Date();
        let target_day_milliseconds = '';
        that.start_date ? target_day_milliseconds = that.start_date.getTime() + 1000 * 60 * 60 * 24 * day : target_day_milliseconds = curr_data.getTime() + 1000 * 60 * 60 * 24 * day;//判断时间是不是存在的
        curr_data.setTime(target_day_milliseconds); //将时间戳转为正常的时间格式
        let tYear = curr_data.getFullYear();
        let tMonth = curr_data.getMonth();
        let tDate = curr_data.getDate();
        tMonth = that.doHandleMonth(tMonth + 1);
        tDate = that.doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
      },
      /**
       * @getDay_week 获取日期 这里重写一次是为了不给用户选择日期的时候更新星期
       *              如果需要根据用户的选择的时间来更新星期的话，那么是需要将该函数删除的
       * @doHandleMonth
       * @getWeek 获取当前星期
       */
      getDay_week(day) {
        let that = this;
        let curr_data = new Date();
        let target_day_milliseconds = curr_data.getTime() + 1000 * 60 * 60 * 24 * day;
        curr_data.setTime(target_day_milliseconds); //将时间戳转为正常的时间格式
        let tYear = curr_data.getFullYear();
        let tMonth = curr_data.getMonth();
        let tDate = curr_data.getDate();
        tMonth = that.doHandleMonth(tMonth + 1);
        tDate = that.doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
      },
      /**
       *  @get_date  未来七天的房情信息，这里是不可以直接根据用户选择的日期进行一个调整的，所以是直接拿到的未来七天的信息
       *  @type {{ day ：*}}
       */
      get_date(day) {
        let that = this;
        let curr_data = new Date();
        let target_day_milliseconds = curr_data.getTime() + 1000 * 60 * 60 * 24 * day;//判断时间是不是存在的
        curr_data.setTime(target_day_milliseconds); //将时间戳转为正常的时间格式
        let tYear = curr_data.getFullYear();
        let tMonth = curr_data.getMonth();
        let tDate = curr_data.getDate();
        tMonth = that.doHandleMonth(tMonth + 1);
        tDate = that.doHandleMonth(tDate);
        return tYear + "-" + tMonth + "-" + tDate;
      },
      /**
       * @DateDiff 计算相差的天数
       * @param Date_end 结束时间
       * @param Date_start 开始时间
       * @returns {number} 相差天数
       */
      DateDiff(Date_end, Date_start) {
        let that = this;
        let aDate, oDate1, oDate2, iDays;
        Date_end = Date_end.split(" "); //将时间以空格划分为两个数组  第一个数组是 2019-05-20 第二个数组是 00：00：00
        aDate = Date_end[0].split("-"); //获取第一个数组的值
        oDate1 = new Date(aDate[0], aDate[1], aDate[2]);  //将前半个数组以-拆分，每一个是一个数值
        Date_start = Date_start.split(" ");
        aDate = Date_start[0].split("-");
        oDate2 = new Date(aDate[0], aDate[1], aDate[2]);
        iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24);    //把相差的毫秒数转换为天数
        console.info(iDays);
        that.count_days = iDays;
        return iDays;
      },
      /**获取班次列表*/
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/manage/duty_shift/hotel_shifts",
          method: "get",
          params:{page_size:999}
        })
          .then(res => {
            console.log(res.data.message)
            if (res.data.message === "success") {
              console.log(res)
              this.scheduling_list = res.data.data.list;

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
      /**确定排班日历表*/
      confirm() {
        let that = this;
        console.log(that.circulation_arr);
        that.$axios({
          url: that.url + "/v1/manage/duty_schedule/update_schedules",
          method: "post",
          data: {
            data: JSON.stringify(that.circulation_arr)
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.hintInfo("success", "更新排班成功");
              that.kalendar();
            } else {
              that.hintInfo("warning", "更新排班失败")
            }
          })
          .catch(error => {

          })

      },

      /**
       *  @getWeek 获取星期
       */

      doHandleMonth(month) {
        let m = month;
        if (month.toString().length === 1) {
          m = "0" + month;
        }
        return m;
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
            if (res.data.message === "success") {
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
  .crew_calendar {
    width: 96%;
    height: 96%;
    margin-left: 10px;
    background: white;
    .title {
      .calendar {

        li {
          display: inline-block;
        }
      }
    }
    .content {
      width: 100%;
      height: 90%;
      margin-top: 10px;
      table {
        width: 100%;
        thead {
          tr {
            /*display: flex;*/
            width: 100%;
            background: rgb(104, 129, 158);
            td {
              /*flex-grow:1;*/
              text-align: center;

              height: 40px;
              line-height: 40px;
              color: white;
            }
          }
        }
        tbody {
          tr {
            /*display: flex;*/
            width: 100%;
            td {
              /*flex-grow:1;*/
              width: 25%;
              text-align: center;
              line-height: 23px;
              padding: 10px 0;
              margin-bottom: 10px;
              border-bottom: 1px solid #ebeef5;
            }
          }
        }
      }
    }
  }
</style>
