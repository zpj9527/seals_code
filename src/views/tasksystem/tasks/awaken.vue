<template>
  <div class="awaken">
    <div class="title">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="未叫醒" name="second">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="not_room" clearable placeholder="请选择" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in room_number"
                  :key="item.value"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>叫醒日期 ：</span>
              <el-date-picker
                v-model="reception_time"
                type="date"
                size="mini"
                style="width: 150px;"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <button @click="filtrate()">筛选</button>
          </div>
          <el-button type="primary" @click="dialogVisible = true;flush()" style="width: 80px;margin: 10px 0"
                     size="mini">
            新增
            <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          </el-button>
          <!--表格-->
          <div class="status">
            <el-table
              :data="income_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="room_phone_num"
                label="房间电话号码">
              </el-table-column>
              <el-table-column
                prop="wakeup_type"
                label="叫醒来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.wakeup_type === 0">微信</span>
                  <span v-else-if="scope.row.wakeup_type === 10">前台</span>
                  <span v-else>其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="wakeup_time"
                label="叫醒时间">
              </el-table-column>
              <el-table-column
                prop="status"
                label="当前状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">工作中</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="address"
                width="220 "
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)">删除
                  </el-button>
                  <el-button size="mini"
                             @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
                  </el-button>
                  <el-button size="mini"
                             @click="dialog_entertain = true;reception(scope.row,scope.row.id,scope.$index, income_list) ">
                    叫醒
                  </el-button>
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
          <!--点击新增修改显示的页面-->
          <el-dialog
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose">
            <ul class="dialog_style">
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>编号 ：</span>
                <el-input v-model="param.master_single_num" placeholder="请输入内容" style="width: 217px;"
                          size="mini"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>房间号 ：</span>
                <el-select v-model="room_no" placeholder="请选择" size="mini" style="width: 220px;">
                  <el-option
                    v-for="item in room_number"
                    :key="item.value"
                    :label="item.room_no"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>房间电话号码 ：</span>
                <el-input v-model="param.room_phone_num" placeholder="请输入内容" style="width: 217px;"
                          oninput="value=value.replace(/[^\d]/g,'')" size="mini"></el-input>
              </li>
              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>叫醒来源 ：</span>
                <el-select v-model="wakeup_type" placeholder="请选择" size="mini" style="width: 220px;">
                  <el-option
                    v-for="item in awaken_data"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>

              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>叫醒时间 ：</span>
                <el-date-picker
                  v-model=" wakeup_time"
                  type="datetime"
                  size="mini"
                  placeholder="选择日期时间">
                </el-date-picker>
              </li>

              <li>
                <i style="color: red;font-size: 18px">*</i>
                <span>当前状态 ：</span>
                <!--<el-input v-model="param.status" placeholder="请输入内容"  disabled ></el-input>-->
                <el-select v-model="status" placeholder="请选择" size="mini" style="width: 220px;">
                  <el-option
                    v-for="item in order_status"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
          </el-dialog>
          <!--点击叫醒-->
          <el-dialog
            title="请选择叫醒人"
            :visible.sync="dialog_entertain"
            width="30%"
            :before-close="handleClose">
            <ul class="dialog_style">
              <li>
                <span style="text-align: right">叫醒人 ：</span>
                <el-select v-model="awaken_man" placeholder="请选择" size="mini" style="width: 248px;">
                  <el-option
                    v-for="item in room_data"
                    :key="item.user_name"
                    :label="item.user_name"
                    :value="item.user_name">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_entertain = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="determine()" size="mini">确 定</el-button>
             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="待叫醒" name="third">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="reception_room" clearable placeholder="请选择" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>叫醒日期 ：</span>
              <el-date-picker
                v-model="reception_data"
                clearable
                size="mini"
                style="width: 150px;"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 10px">
              <span>叫醒人 ：</span>
              <el-select v-model="reception_man" clearable placeholder="请选择" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in room_data"
                  :key="item.user_name"
                  :label="item.user_name"
                  :value="item.user_name">
                </el-option>
              </el-select>
            </div>
            <button @click="reception_filtrate()">筛选</button>
          </div>
          <!--<el-button type="text" @click="dialog = true;flush()">-->
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          <!--</el-button>-->
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="receive_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="room_phone_num"
                label="房间电话号码">
              </el-table-column>
              <el-table-column
                prop="wakeup_type"
                label="叫醒来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.wakeup_type === 0">微信</span>
                  <span v-else-if="scope.row.wakeup_type === 10">前台</span>
                  <span v-else>其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="wakeup_time"
                label="叫醒时间">
              </el-table-column>
              <el-table-column
                prop="status"
                label="当前状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">工作中</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="address"
                width="220 "
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, receive_list)">删除
                  </el-button>
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
        </el-tab-pane>
        <el-tab-pane label="已完成" name="routing">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="achieve_room" clearable placeholder="请选择" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>叫醒日期 ：</span>
              <el-date-picker
                v-model="achieve_time"
                clearable
                size="mini"
                style="width: 150px;"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 10px">
              <span>叫醒人 ：</span>
              <el-select v-model="achieve_man" clearable placeholder="请选择" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in room_data"
                  :key="item.user_name"
                  :label="item.user_name"
                  :value="item.user_name">
                </el-option>
              </el-select>
            </div>
            <button @click="achieve_filtrate()">筛选</button>
          </div>
          <!--<el-button type="text" @click="dialogGrabble = true;flush()">-->
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          <!--</el-button>-->
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="had_done"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="complete_user_name"
                label="完成叫醒员工姓名">
              </el-table-column>

              <el-table-column
                prop="room_phone_num"
                label="房间电话号码">
              </el-table-column>
              <el-table-column
                prop="wakeup_type"
                label="叫醒来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.wakeup_type === 0">微信</span>
                  <span v-else-if="scope.row.wakeup_type === 10">前台</span>
                  <span v-else>其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="wakeup_time"
                label="叫醒时间">
              </el-table-column>
              <el-table-column
                prop="status"
                label="当前状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">工作中</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="address"
                width="220 "
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, had_done)">删除
                  </el-button>
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
        </el-tab-pane>
        <el-tab-pane label="已删除" name="delete">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model=" delete_room" clearable placeholder="请选择" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>叫醒日期 ：</span>
              <el-date-picker
                v-model="delete_time"
                clearable
                size="mini"
                style="width: 150px;"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 10px">
              <span>叫醒人 ：</span>
              <el-select v-model="delete_man" clearable placeholder="请选择" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in room_data"
                  :key="item.user_name"
                  :label="item.user_name"
                  :value="item.user_name">
                </el-option>
              </el-select>
            </div>
            <button @click="delete_filtrate()">筛选</button>
          </div>
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="delete_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="master_single_num"
                label="编号">
              </el-table-column>
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="complete_user_name"
                label="完成叫醒员工姓名">
              </el-table-column>

              <el-table-column
                prop="room_phone_num"
                label="房间电话号码">
              </el-table-column>
              <el-table-column
                prop="wakeup_type"
                label="叫醒来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.wakeup_type === 0">微信</span>
                  <span v-else-if="scope.row.wakeup_type === 10">前台</span>
                  <span v-else>其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="wakeup_time"
                label="叫醒时间">
              </el-table-column>
              <el-table-column
                prop="status"
                label="当前状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">工作中</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>

              <el-table-column
                prop="address"
                width="220 "
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, had_done)">删除
                  </el-button>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  export default {
    name: "awaken",
    data() {
      return {
        activeName2: 'second',//这个是默认头部
        url: this.api.api_code_9103,
        //分页
        total: 5,
        pagesize: 5,
        dialogVisible: false,//未送物的修改页面和新增页面的显示与隐藏
        dialog: false,//代送物的修改页面和新增页面的显示与隐藏
        dialogGrabble: false,//已完成的修改页面和新增页面的显示与隐藏
        dialog_entertain: false,//接待
        room_data: [],//叫醒人列表
        awaken_man: '',//点击叫醒的叫醒人
        income_list: [],//未叫醒的列表
        receive_list: [],//待叫醒列表
        delete_list: [],//已删除
        room_number: [], //这个是房间号
        had_done: [],//已完成
        dept_list: [],//部门
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新

        param: {},//新增入账代码里的内容
        //叫醒来源
        awaken_data: [
          {
            value: '0',
            label: '微信'
          },
          {
            value: '10',
            label: '前台'
          },
          {
            value: '20',
            label: '其它'
          },
        ],
        //订单状态
        order_status: [
          {
            value: 0,
            label: '初始'
          },

        ],

        /*
       * 未叫醒的筛选
       * */
        not_room: '',//未叫醒房间号
        reception_time: '',//未叫醒时间
        /*
       * 待叫醒的筛选
       * */
        reception_room: '',//待叫醒房间号
        reception_data: '',//待叫醒时间
        reception_man: '',//待叫醒人
        /*
        * 完成接待的筛选
        * */
        achieve_room: '',//完成房间号
        achieve_time: '',//完成叫醒日期
        achieve_man: '',//完成叫醒人

        /**
         * 已删除的筛选
         *
         * */
        delete_room: '',
        delete_time: '',
        delete_man: '',


        master_single_num: '', //编号
        room_no: '',//房间号
        room_phone_num: '',//房间电话号码
        wakeup_type: '',//叫醒来源
        wakeup_time: '',//叫醒时间
        status: '',//当前状态

      };
    },
    created: function () {
      let that = this;
      // that.enter_code();//获取未送物的list
      that.room_list();//获取房间号
      // that.examine();
    },
    methods: {
      //    这个是选择头部的方法
      handleClick(tab, event) {
        // console.log(tab, event);
      },
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      //查看部门信息
      examine() {
        let that = this;
        that.$axios({
          url: that.api.api_9022_9519 + "/v1/common/dept/info_list",
          method: "get",
          headers: {
            authorization: sessionStorage.getItem("authorization"),
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
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          master_single_num: '', //编号
          room_phone_num: '',//房间电话号码
        }

        that.room_no = '',//房间号
          that.status = '',//订单状态
          that.wakeup_time = '',//叫醒时间
          that.wakeup_type = ''//叫醒来源

      },
      //封装获取房间号
      room_list() {
        let that = this
        that.$axios({
          url: that.api.api_price_9101 + '/v1/room/room_status/get_room_map_list/',
          method: "get",
          params: {
            page_size: 999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              // console.log(res.data.data)
              that.room_number = res.data.data.results
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取叫醒人
      receiver() {
        let that = this
        that.$axios({
          url: that.url + '/v1/manage/duty_record/on_duty_employees',
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res)
              that.room_data = res.data.data
              if (res.data.data.length === 0) {
                console.log(111);
                that.hintInfo("warning", "暂时没有可选择的叫醒人")
              }
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },

      //封装获取未叫醒
      enter_code() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/task/room_service/wakeup/get_rs_wake_up_list/",
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data.results);
              let results = res.data.data.results
              that.total = res.data.data.count;
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.income_list = [];
              that.receive_list = [];
              that.had_done = [];
              for (let key in results) {
                if (results[key].status === 0) {
                  that.income_list.push(results[key])
                  console.info(that.income_list);
                } else if (results[key].status === 5) {
                  that.receive_list.push(results[key])
                } else if (results[key].status === 10) {
                  that.had_done.push(results[key])
                } else if (results[key].status === 20) {
                  that.delete_list.push(results[key])
                }
              }
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      //点击未叫醒分页上的页数
      handleCurrentChange(curPage) {
        let that = this
        //获取信息列表
        that.$axios({
          url: that.api + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize
          },

        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              // that.income_list=res.data.data.list
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
      //  点击未叫醒删除
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
            url: that.url + "/v1/task/room_service/wakeup/remove_rs_wake_up/" + id + '/',
            method: "post",
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
      //点击未叫醒修改
      amend(srow, id, index, list) {
        let that = this;
        that.Edite = true;
        that.id = id;
        console.log(srow);
        that.param.master_single_num = srow.master_single_num, //编号
          that.room_no = srow.room_no,//房间号
          that.status = srow.status,//订单状态
          that.param.room_phone_num = srow.room_phone_num,//房间电话号码
          that.wakeup_type = srow.wakeup_type + "",//叫醒来源
          that.wakeup_time = srow.wakeup_time//叫醒时间
      },
      //点击未叫醒新增和修改后的保存
      ensure() {
        let that = this;
        if (that.param.master_single_num === "" || that.room_no === "" || that.status === "" || that.param.room_phone_num === "" || that.wakeup_type === "" || that.wakeup_time === "") {
          that.hintInfo("warning", "*为必填项")
        } else {
          let tel = /0\d{2,3}-\d{7,8}/;
          if (!tel.test(that.param.room_phone_num)) {
            that.hintInfo("warning", "座机号码需以0开始,中间使用-分隔符")
          } else {
            let urldata = that.Edite ? (that.url + "/v1/task/room_service/wakeup/update_rs_wake_up/" + that.id + '/') : (that.url + "/v1/task/room_service/wakeup/add_rs_wake_up/");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                master_single_num: parseInt(that.param.master_single_num), //编号
                room_no: that.room_no,//房间号、
                status: that.status,//当前状态
                room_phone_num: that.param.room_phone_num,//房间电话号码
                wakeup_type: that.wakeup_type,//叫醒来源
                wakeup_time: that.wakeup_time,//叫醒时间
              },

            })
              .then(res => {
                if (res.data.message == "success") {
                  that.enter_code();
                  that.dialogVisible = false;
                }
                else {
                  that.error(res.data.message)
                  console.log(res.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }


      },
      //点击叫醒
      reception(srow, id, index, list) {
        let that = this;
        console.log(srow);
        that.id = id
        srow.status = 20;
        that.status = srow.status;
        that.receiver();//获取叫醒人

      },
      //点击叫醒后的保存
      determine() {
        let that = this;
        if (that.awaken_man === "") {
          that.hintInfo("warning", "请选择色叫醒人")
        } else {
          that.$axios({
            url: that.url + "/v1/task/room_service/wakeup/update_rs_wake_up/" + that.id + "/",
            method: "post",
            data: {
              status: parseInt(that.status),//订单状态
              regular_user_name: that.awaken_man,//叫醒人
            },

          })
            .then(res => {
              if (res.data.message === "success") {
                that.enter_code();
                that.dialog_entertain = false;
              }
              else {
                that.error(res.data.message)
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },

      /*
      * 刷选条件
      * */
      //点击未叫醒的筛选
      filtrate() {
        console.log(1);
        let that = this;
        if (that.not_room === "" && that.reception_time === "") {
          that.hintInfo("warning", "请选择筛选条件")
        } else {
          if (that.room_number === "") {
            that.hintInfo("warning", "请选择房间号")
          } else if (that.reception_time === "") {
            that.hintInfo("warning", "请选择时间")
          } else {
            that.$axios({
              url: that.url + "/v1/task/room_service/wakeup/get_rs_wake_up_list/?room_no=" + that.not_room + "&" + "plan_start_time=" + that.reception_time,
              method: "get",

            })
              .then(res => {
                if (res.data.message == "success") {
                  console.log(res.data.data.results);
                  let results = res.data.data.results
                  that.total = res.data.data.count;
                  //push 的时候要先清空数组，保证这个是一个空的数组
                  that.income_list = [];
                  // that.receive_list=[];
                  // that.had_done=[];
                  for (let key in results) {
                    if (results[key].status === 0) {
                      that.income_list.push(results[key])
                    }
                  }
                }
                else {
                  console.log(res.data.data.message);
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      },
      //点击待叫醒的筛选、
      reception_filtrate() {
        let that = this;
        if (that.reception_room === "" && that.reception_data === "" && that.reception_man === "") {
          that.hintInfo("warning", "请选择筛选条件")
        } else if (that.reception_room === "") {
          that.hintInfo("warning", "请选择房间号")
        } else if (that.reception_data === "") {
          that.hintInfo("warning", "请选择时间")
        } else if (that.reception_man === "") {
          that.hintInfo("warning", "请选择接待人")
        } else {
          that.$axios({
            url: that.url + "/v1/task/room_service/wakeup/get_rs_wake_up_list/?room_no=" + that.reception_room + "&" + "plan_start_time=" + that.reception_data + "&" + "complete_user_name=" + that.reception_man,
            method: "get",

          })
            .then(res => {
              if (res.data.message == "success") {
                console.log(res.data.data.results);
                let results = res.data.data.results
                that.total = res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.receive_list = [];
                // that.receive_list=[];
                // that.had_done=[];
                for (let key in results) {
                  if (results[key].status === 5) {
                    that.receive_list.push(results[key])
                  }
                }
              }
              else {
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      //点击已完成的筛选
      achieve_filtrate() {
        let that = this;
        if (that.achieve_room === "" && that.achieve_time === "" && that.achieve_man === "") {
          that.hintInfo("warning", "请选择筛选条件")
        } else if (that.reception_room === "") {
          that.hintInfo("warning", "请选择房间号")
        } else if (that.reception_data === "") {
          that.hintInfo("warning", "请选择时间")
        } else if (that.reception_man === "") {
          that.hintInfo("warning", "请选择接待人")
        } else {
          that.$axios({
            url: that.url + "/v1/task/room_service/wakeup/get_rs_wake_up_list/?room_no=" + that.achieve_room + "&" + "plan_start_time=" + that.achieve_time + "&" + "complete_user_name=" + that.achieve_man,
            method: "get",

          })
            .then(res => {
              if (res.data.message == "success") {
                console.log(res.data.data.results);
                let results = res.data.data.results
                that.total = res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.had_done = [];
                // that.receive_list=[];
                // that.had_done=[];
                for (let key in results) {
                  if (results[key].status === 10) {
                    that.had_done.push(results[key])
                  }
                }
              }
              else {
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      //点击已删除的筛选
      delete_filtrate() {
        let that = this;
        if (that.delete_room === "" && that.delete_time === "" && that.delete_man === "") {
          that.hintInfo("warning", "请选择筛选条件")
        } else if (that.delete_room === "") {
          that.hintInfo("warning", "请选择房间号")
        } else if (that.delete_time === "") {
          that.hintInfo("warning", "请选择时间")
        } else if (that.delete_man === "") {
          that.hintInfo("warning", "请选择接待人")
        } else {
          that.$axios({
            url: that.url + "/v1/task/room_service/wakeup/get_rs_wake_up_list/?room_no=" + that.achieve_room + "&" + "plan_start_time=" + that.achieve_time + "&" + "complete_user_name=" + that.achieve_man,
            method: "get",

          })
            .then(res => {
              if (res.data.message == "success") {
                console.log(res.data.data.results);
                let results = res.data.data.results
                that.total = res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.had_done = [];
                // that.receive_list=[];
                // that.had_done=[];
                for (let key in results) {
                  if (results[key].status === 20) {
                    that.had_done.push(results[key])
                  }
                }
              }
              else {
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
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
  .awaken {
    width: 97%;
    height: 100%;
    .title {
      width: 100%;
      height: 100%;
      background: white;
      padding-top: 16px;
      .grabble {
        div {
          display: inline-block;
        }
        button {
          width: 80px;
          height: 24px;
          background: rgba(68, 136, 233, 1);
          border: none;
          border-radius: 4px;
          color: white;
          margin-left: 20px;
        }
      }
      .dialog_style {
        margin-left: 20px;
        /*overflow: hidden;*/
        li {
          /*float: left;*/
          /*width: 50%;*/
          margin-bottom: 10px;
          span {
            display: inline-block;
            width: 110px;
          }
        }
      }

    }
  }
</style>
<style>
  /*.el-input{*/
  /*width: 220px;*/
  /*}*/
  /*.el-table .cell{*/
  /*text-align:center;*/
  /*}*/
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
  /*z-index: 0;*/
  /*}*/
  /*.el-table__column-filter-trigger i {*/
  /*color: white;*/
  /*font-size: 16px;*/
  /*}*/
</style>
