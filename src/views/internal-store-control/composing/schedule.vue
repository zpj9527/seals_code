<template>
  <div class="schedule">
    <div class="schedule_list">
      <h4 style="padding: 10px 0">所有排班方式</h4>
      <el-table
        :data="scheduling_list"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        size="mini"
        style="width: 100%;">
        <el-table-column
          prop="name"
          label="排班方式名字">
        </el-table-column>
        <el-table-column
          prop="init_date"
          label="起始日期">
        </el-table-column>
        <el-table-column
          prop="cycle_days"
          label="几天一循环">
        </el-table-column>
        <el-table-column
          prop="address"
          width="240"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button @click="cancel(scope.row.id,scope.$index, scheduling_list)" type="danger" size="mini">删除
            </el-button>
            <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, scheduling_list)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="float: right;margin-right: 2%"
                     layout="prev, pager, next"
                     :page-size="pagesize"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
    <div class="schedule_add">
      <h4 style="padding: 10px  0 10px  10px;display: inline-block">排班方式</h4>
      <el-button size="mini" type="primary" style="width: 100px;" @click="flush(); primary_click()">新增排班方式</el-button>
      <ul class="title" v-show="primary_show">
        <li style="margin-left: 10px">
          <span>排班方式 </span>
          <el-input v-model="mode_select" placeholder="请输入内容" clearable style="width: 150px;" size="mini"></el-input>
        </li>
        <li style="margin-left: 10px">
          <span>几天一循环 </span>
          <el-select v-model="circulation" placeholder="请选择" clearable style="width: 150px;" size="mini"
                     @change="circulation_type">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li style="margin-left: 10px">
          <span>起始日期 ：</span>
          <el-date-picker
            v-model="init_date"
            style="width: 150px;"
            size="mini"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li style="float: right;margin-right: 20px" v-if="brands">
          <button
            style="border-radius: 3px;border: none;background: #4488e9;color:white ;height: 24px;line-height: 6px;padding: 10px"
            @click="submitTab()">确定新建排班方式
          </button>
        </li>
        <li style="float: right;margin-right: 20px" v-else>
          <button
            style="border-radius: 3px;border: none;background: #4488e9;color:white ;height: 24px;line-height: 6px;padding: 10px"
            @click="updateTab()">确定修改排班方式
          </button>
        </li>
      </ul>
      <div class="paging" v-show="primary_show">
        <table>
          <div v-if="circulation===''"
               style="width: 320%;height: 40px;text-align: center;line-height: 40px;color: #909399">暂无数据
          </div>
          <thead>
          <tr>
            <td>第几天</td>
            <td>休息日</td>
            <td>班次选择</td>
            <td>备注</td>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(item,index) in circulation_arr" :key="index">
            <td><span>{{ item.day }}</span></td>
            <td>
              <el-checkbox v-model="item.rest" @change="show_checked"></el-checkbox>
            </td>
            <td>
              <template v-if="add_show">
                <el-select v-model="item.shift" clearable placeholder="请选择班次信息" style="width: 217px;" size="mini"
                           v-if="item.rest===false">
                  <el-option
                    v-for="item in man_list"
                    :key="item.id"
                    :label="item.desc_cn"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-select v-model="item.shift" clearable placeholder="休息" style="width: 217px;" size="mini"
                           :disabled="true" v-else>
                  <el-option
                    v-for="item in man_list"
                    :key="item.id"
                    :label="item.desc_cn"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="add_show===false&&item.rest===false">
                <el-select v-model="item.shift_id" clearable placeholder="请选择班次信息" style="width: 217px;" size="mini">
                  <el-option
                    v-for="item in man_list"
                    :key="item.id"
                    :label="item.desc_cn"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
              <template v-else>
                <el-select v-model="item.shift" clearable placeholder="休息" style="width: 217px;" size="mini"
                           :disabled="true">
                  <el-option
                    v-for="item in man_list"
                    :key="item.id"
                    :label="item.desc_cn"
                    :value="item.id">
                  </el-option>
                </el-select>
              </template>
            </td>

            <td>
              <el-input v-model="item.desc" clearable placeholder="请输入备注内容" size="mini"
                        style="width: 217px;"></el-input>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "schedule",
    data() {
      return {
        // 'http://47.98.113.173:9530'
        url: this.api.api_9530_9503,
        options: [{
          value: 1,
          label: '1天'
        },
          {
            value: 2,
            label: '2天'
          },
          {
            value: 3,
            label: '3天'
          },
          {
            value: 4,
            label: '4天'
          },
          {
            value: 5,
            label: '5天'
          },
          {
            value: 6,
            label: '6天'
          },
          {
            value: 7,
            label: '7天'
          },
        ],
        pagesize: 10, //代表每页显示的条数
        total: 10,//代表总条数
        cur_page: 1,
        brands: true,//标志 --判断是修改还是新建
        sign: false,//判断是否可以新增
        circulation_show: true,//暂无数据是否显示
        id: '',//需要修改的id
        scheduling_list: [],//排班方式
        man_list: [],//班次设置列表
        circulation_arr: [],//循环的次数
        circulation_obj: {},
        circulation_length: '',//length;
        mode_select: '',//排榜方式
        circulation: '',//循环
        init_date: '',//起始日期
        primary_show: false,//新增排班方式的显示隐藏
        add_show: false,//判断是不是新增
      }

    },
    created() {
      let that = this;
      that.enter_code();
      that.scheduling();
    },
    methods: {
      /**
       *拿到表格所有数据
       */
      submitTab() {
        let that = this;
        let arr_obj = {};
        let shifts = [];
        if (that.mode_select === "" || that.circulation === "" || that.init_date === "") {
          that.hintInfo("warning", "排版方式或者几天一循环不能为空")
        } else {
          for (let item of that.circulation_arr) {
            // item.name = that.mode_select;
            // item.cycle_days = that.circulation;
            console.log(item);
            // shifts.push(item.shift)
            arr_obj.name = that.mode_select;
            arr_obj.cycle_days = that.circulation;
            arr_obj.init_date = that.init_date;
            arr_obj.shifts = shifts;
            if (item.rest === false) {
              if (item.shift === "") {
                that.hintInfo("warning", "请选择班次")
                that.sign = false;
              } else {
                that.sign = true;

              }
            }
          }
          for (let i = 0; i < that.circulation_arr.length; i++) {
            let test_obj = {
              day: '',
              rest: '',
              shift: '',
            };
            console.log(that.circulation_arr[i].shift);
            test_obj.day = that.circulation_arr[i].day;
            test_obj.rest = that.circulation_arr[i].rest;
            if (that.circulation_arr[i].shift) {
              console.log(that.circulation_arr[i].shift);
              test_obj.shift = that.circulation_arr[i].shift;
            } else {
              test_obj.shift = null;
            }
            arr_obj.shifts.push(test_obj);
            console.log(test_obj);
          }
          if (that.sign === true) {
            that.circulation_obj = arr_obj;
            console.log(arr_obj);
            that.new_scheduling();
          }
        }
      },
      //封装传给后台新建排班方式
      new_scheduling() {
        let that = this;
        console.log(that.circulation_obj);
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/add",
          method: "post",
          data: {
            data: JSON.stringify(that.circulation_obj)
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              that.circulation_arr = [];
              that.mode_select = '';
              that.init_date = "";
              that.circulation = "";
              that.scheduling();
              that.hintInfo("success", "新建班次成功")
              that.primary_show = false;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取排班方式
      scheduling() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/dept_cycles",
          method: "get",
          params: {
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.scheduling_list = res.data.data.list;
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
      //封装获取班次设置列表
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/manage/duty_shift/hotel_shifts",
          method: "get",
          params:{
            page_size:999
          }
        })
          .then(res => {
            console.log(res.data.message)
            if (res.data.message === "success") {
              console.log(res)
              this.man_list = res.data.data.list;

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
      /**点击新增清空所有数据*/
      flush() {
        let that = this;
        that.circulation_arr = [];
        that.mode_select = '';//排版方式名字
        that.init_date = '',//起始日期
          that.circulation = '';
        that.brands = true;
      },
      /** 几天一循环*/
      circulation_type(value) {
        let that = this;
        let arr = [];
        console.log(that.mode_select);
        for (let item = 1; item <= value; item++) {
          arr.push({
            day: item,//第几天
            rest: false,
            shift: '',//班次选择id
            desc: '',//备注
            name: that.mode_select,//排版方式名字
            cycle_days: that.circulation,
            init_date: that.init_date,
          });
        }
        that.circulation_arr = arr;
      },
      /**休息日选择/或者没有选择*/
      show_checked() {
        let that = this;
        for (let item of that.circulation_arr) {
          if (item.rest === true) {
            item.shift = ""
          }
        }
      },
      /**点击删除*/
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
            url: "" + that.url + "/v1/manage/duty_cycle/delete/" + id,
            method: "get",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                that.scheduling();
                that.circulation_arr = [];
                that.mode_select = '';//排版方式名字
                that.circulation = '';
                that.init_date = '';
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
      /**submit  修改*/
      submit(row, id, index, list) {
        let that = this;
        that.brands = false;
        that.add_show = false;
        that.id = id;
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/get/" + that.id,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              for (let item of res.data.data.shifts) {
                console.log(item);
                if (item.shift) {
                  item.shift_id = item.shift.id
                } else {
                  item.shift_id = null;
                }

              }
              that.circulation_arr = res.data.data.shifts;
              console.log(that.circulation_arr);
              that.circulation = res.data.data.cycle_days;
              that.mode_select = res.data.data.name;
              that.init_date = res.data.data.init_date;
              that.primary_show = true;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**updateTab  修改后的确定*/
      updateTab() {
        let that = this;
        console.log(that.circulation_arr);
        let arr_obj = {};
        let arr_shift = [];
        let shifts = [];
        if (that.mode_select === "" || that.circulation === "" || that.init_date === "") {
          that.hintInfo("warning", "排版方式或者几天一循环不能为空")
        } else {
          for (let item of that.circulation_arr) {
            // console.log(item);
            // item.name = that.mode_select;
            // item.cycle_days = that.circulation;
            // arr_shift.push(item.shift);
            // shifts.push(item.shift);
            arr_obj.name = that.mode_select;
            arr_obj.cycle_days = that.circulation;
            arr_obj.init_date = that.init_date;
            arr_obj.shifts = shifts;

            if (item.rest === false) {
              if (item.shift_id === "") {
                that.hintInfo("warning", "请选择班次")
                that.sign = false;
              } else {
                that.sign = true;

              }
            }

          }
          for (let i = 0; i < that.circulation_arr.length; i++) {
            let test_obj = {
              day: '',
              rest: '',
              shift: '',
              init_date: '',
            };
            console.log(that.circulation_arr[i].shift_id);
            test_obj.day = that.circulation_arr[i].day;
            test_obj.rest = that.circulation_arr[i].rest;
            test_obj.init_date = that.circulation_arr[i].init_date;
            if (that.circulation_arr[i].shift_id) {
              // console.log(that.circulation_arr[i].shift);
              test_obj.shift = that.circulation_arr[i].shift_id;
            } else {
              test_obj.shift = null;
            }
            arr_obj.shifts.push(test_obj);
            // console.log(test_obj);
          }
          console.log(arr_obj);
          if (that.sign === true) {
            console.log(that.circulation_arr);
            that.circulation_obj = arr_obj;
            // that.circulation_arr=arr_obj;
            that.get_update();
          }


        }

      },
      /**更改后的数据保存*/
      get_update() {
        let that = this;
        console.log(that.circulation_arr);
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/update/" + that.id,
          method: "post",
          data: {
            data: JSON.stringify(that.circulation_obj)
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              that.circulation_obj = {};
              that.circulation_arr = [];
              that.mode_select = '';
              that.circulation = "";
              that.scheduling();
              that.brands = true;
              that.hintInfo("success", "修改班次成功")
              that.primary_show = false;
            }
            else {
              console.log(res.data.message);
              that.hintInfo("warning", "修改班次失败")
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**分页*/
      //点击分页上的页数
      handleCurrentChange(curPage) {
        console.log(curPage) // 当前页}
        let that = this;
        that.cur_page = curPage;
        that.$axios({
          url: that.url + "/v1/manage/duty_cycle/dept_cycles",
          method: "get",
          params: {
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message == "success") {
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
      /**点击新增显示与否*/
      primary_click() {
        let that = this;
        that.add_show = true;
        that.primary_show = !that.primary_show;
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
  .schedule {
    width: 97%;
    height: 100%;
    overflow-y: scroll;
    .schedule_add {
      margin-top: 40px;
      background: white;
      ul {
        width: 100%;
        overflow: hidden;
        min-width: 1000px;
        margin-top: 10px;
        li {
          float: left;
        }
      }
      .paging {
        margin-top: 10px;
        overflow: hidden;
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
    .schedule_list {
      width: 100%;
      padding: 0 10px;
    }
  }
</style>
