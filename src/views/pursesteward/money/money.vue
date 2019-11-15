<template>
  <div class="money">
    <div class="navigation">
      <div>
        <p style="padding: 10px;">酒店名称</p>
        <el-select v-model="hotel_group" placeholder="请选择" style="width: 220px;margin: 10px" size="mini">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;">
        <p style="padding: 10px 0 10px 10px; background: #68819EFF;color: white" @click="all_cashiers">收银点</p>
        <el-tree
          :data="register_list"
          node-key="node.id"
          :expand-on-click-node="false"
          node-contextmenu
          @node-click="handleNodeClick">
               <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.desc}}</span>
               </span>
        </el-tree>
      </el-col>
    </div>
    <div class="router">
      <div class="ini">
        <money-task></money-task>
      </div>
      <!--<router-view  :branch_id="branch_id"></router-view>-->
      <div class="cash">
        <!--头部的搜索-->
        <ul class="title">
          <li>
            <span class="demonstration">营业日期起 :</span>
            <el-date-picker
              style="width: 150px;"
              v-model="biz_start"
              type="date"
              size="mini"
              @change="closing_click"
              :picker-options="pickerOptionsStart"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span class="demonstration">营业日期止 :</span>
            <el-date-picker
              style="width: 150px;"
              size="mini"
              v-model="closing_date"
              @change="closing_click"
              type="date"
              :picker-options="pickerOptionsEnd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>付款方式 : </span>
            <el-select v-model="register" placeholder="请选择" clearable @change="cashier" style="width: 150px;"
                       size="mini">
              <el-option
                v-for="item in pay_data"
                :key="item.value"
                :label="item.model_name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span>房间号 : </span>
            <el-select v-model="room_number" placeholder="请选择"  filterable  clearable  @change="closing_click" style="width: 150px;"
                       size="mini">
              <el-option
                v-for="item in room_list"
                :key="item.value"
                :label="item.room_no"
                :value="item.room_no">
              </el-option>
            </el-select>
          </li>
        </ul>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" style="margin: 10px 0 0 10px">
          <el-tab-pane label="实时到账付款" name="first">
            <!--支付方式 -->
            <div class="shopping">
              <!--7-23因为要改成付款类型的table，所以注释掉原来的付款方式的table-->
              <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" size="mini">-->
              <!--<el-tab-pane  v-for="(item ,index) in pay_data "  :key="item.id"  :label="item.model_name" :name="item.id+''" >-->
              <!--账户种类 状态 ... -->
              <div class="status">
                <el-table
                  :data="detail_all"
                  size="mini"
                  :cell-style="{textAlign:'center'}"
                  @cell-dblclick="dblhandleCurrentChange"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  style="width: 100%;">
                  <el-table-column
                    prop="in_or_out"
                    label="收/支"
                    fixed="left"
                    width="100"
                    column-key="in_or_out"
                    :filters="account_data"
                    :filter-method="filterHandler"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.in_or_out === 'in'">收</span>
                      <span v-else>支</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="account_type"
                    label="账户种类"
                    width="100"
                    column-key="name"
                    :filters="[{ value: 0,text: '正常账户'},{value: 1, text: 'AR账户' }]"
                    :filter-method="filterHandlers">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_type === 1">AR账户</span>
                      <span v-else>正常账户</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="code_pay_for_id.desc"
                    label="收支原因">
                  </el-table-column>
                  <el-table-column
                    prop="cashier.desc"
                    width="180"
                    label="收银点">
                  </el-table-column>
                  <el-table-column
                    prop="pay_status"
                    label="收支状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pay_status === 0">正常</span>
                      <span v-else-if="scope.row.pay_status === 1">已取消</span>
                      <span v-else-if="scope.row.pay_status === 2">已退款</span>
                      <span v-else>异常</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="pay_mode_id.model_name"
                    label="付款方式">
                  </el-table-column>
                  <el-table-column
                    prop="pay_amount"
                    label="收支金额">
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="address"-->
                  <!--label="币种">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="biz_date"
                    width="120"
                    label="营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="gen_time"
                    width="150"
                    label="支付时间">
                  </el-table-column>
                  <el-table-column
                    prop="check_status"
                    label="审核状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.check_status === 0">未审核</span>
                      <span v-else>已审核</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="check_user.real_name"
                    label="审核人">
                  </el-table-column>
                  <el-table-column
                    width="150"
                    prop="check_time"
                    fixed="right"
                    label="审核时间">
                  </el-table-column>
                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               :current-page="cur_page"
                               @current-change="handleCurrentChange_real"
                               :total="total">
                </el-pagination>
              </div>
              <!--</el-tab-pane>-->
              <!--</el-tabs>-->

            </div>
          </el-tab-pane>
          <el-tab-pane label="信用付款" name="second">
            <!--支付方式 -->
            <div class="shopping">
              <!--7-23因为要改成付款类型的table，所以注释掉原来的付款方式的table-->
              <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" size="mini">-->
              <!--<el-tab-pane  v-for="(item ,index) in pay_data "  :key="item.id"  :label="item.model_name" :name="item.id+''" >-->
              <!--账户种类 状态 ... -->
              <div class="status">
                <el-table
                  :data="credibility_pay"
                  size="mini"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  style="width: 100%;">
                  <el-table-column
                    prop="in_or_out"
                    label="收/支"
                    fixed="left"
                    width="100"
                    column-key="in_or_out"
                    :filters="account_data"
                    :filter-method="filterHandler"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.in_or_out === 'in'">收</span>
                      <span v-else>支</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="account_type"
                    label="账户种类"
                    width="100"
                    column-key="name"
                    :filters="[{ value: 0,text: '正常账户'},{value: 1, text: 'AR账户' }]"
                    :filter-method="filterHandlers">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_type === 1">AR账户</span>
                      <span v-else>正常账户</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="code_pay_for_id.desc"
                    label="收支原因">
                  </el-table-column>
                  <el-table-column
                    prop="cashier.desc"
                    width="180"
                    label="收银点">
                  </el-table-column>
                  <el-table-column
                    prop="pay_status"
                    label="收支状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pay_status === 0">正常</span>
                      <span v-else-if="scope.row.pay_status === 1">已取消</span>
                      <span v-else-if="scope.row.pay_status === 2">已退款</span>
                      <span v-else>异常</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="pay_mode_id.model_name"
                    label="付款方式">
                  </el-table-column>
                  <el-table-column
                    prop="pay_amount"
                    label="收支金额">
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="address"-->
                  <!--label="币种">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="biz_date"
                    width="120"
                    label="营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="gen_time"
                    width="150"
                    label="支付时间">
                  </el-table-column>
                  <el-table-column
                    prop="check_status"
                    label="审核状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.check_status === 0">未审核</span>
                      <span v-else>已审核</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="check_user.real_name"
                    label="审核人">
                  </el-table-column>
                  <el-table-column
                    width="150"
                    prop="check_time"
                    fixed="right"
                    label="审核时间">
                  </el-table-column>
                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="handleCurrentChange"
                               :total="credibility_total">
                </el-pagination>
              </div>
              <!--</el-tab-pane>-->
              <!--</el-tabs>-->

            </div>
          </el-tab-pane>
          <el-tab-pane label="优惠付款" name="third">
            <!--支付方式 -->
            <div class="shopping">
              <!--7-23因为要改成付款类型的table，所以注释掉原来的付款方式的table-->
              <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" size="mini">-->
              <!--<el-tab-pane  v-for="(item ,index) in pay_data "  :key="item.id"  :label="item.model_name" :name="item.id+''" >-->
              <!--账户种类 状态 ... -->
              <div class="status">
                <el-table
                  :data="discounts_pay"
                  size="mini"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  style="width: 100%;">
                  <el-table-column
                    prop="in_or_out"
                    label="收/支"
                    fixed="left"
                    width="100"
                    column-key="in_or_out"
                    :filters="account_data"
                    :filter-method="filterHandler"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.in_or_out === 'in'">收</span>
                      <span v-else>支</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="account_type"
                    label="账户种类"
                    width="100"
                    column-key="name"
                    :filters="[{ value: 0,text: '正常账户'},{value: 1, text: 'AR账户' }]"
                    :filter-method="filterHandlers">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_type === 1">AR账户</span>
                      <span v-else>正常账户</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="code_pay_for_id.desc"
                    label="收支原因">
                  </el-table-column>
                  <el-table-column
                    prop="cashier.desc"
                    width="180"
                    label="收银点">
                  </el-table-column>
                  <el-table-column
                    prop="pay_status"
                    label="收支状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pay_status === 0">正常</span>
                      <span v-else-if="scope.row.pay_status === 1">已取消</span>
                      <span v-else-if="scope.row.pay_status === 2">已退款</span>
                      <span v-else>异常</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="pay_mode_id.model_name"
                    label="付款方式">
                  </el-table-column>
                  <el-table-column
                    prop="pay_amount"
                    label="收支金额">
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="address"-->
                  <!--label="币种">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="biz_date"
                    width="120"
                    label="营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="gen_time"
                    width="150"
                    label="支付时间">
                  </el-table-column>
                  <el-table-column
                    prop="check_status"
                    label="审核状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.check_status === 0">未审核</span>
                      <span v-else>已审核</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="check_user.real_name"
                    label="审核人">
                  </el-table-column>
                  <el-table-column
                    width="150"
                    prop="check_time"
                    fixed="right"
                    label="审核时间">
                  </el-table-column>
                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="handleCurrentChange"
                               :total="discounts_total">
                </el-pagination>
              </div>
              <!--</el-tab-pane>-->
              <!--</el-tabs>-->

            </div>
          </el-tab-pane>
          <!--详情-->
          <el-dialog
            title="详情"
            :visible.sync="dialogVisible"
            width="25%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
             <ul class="dialog_style">
               <li>
                 <span>房间号</span>
                 <div>{{particulars_room}}</div>
               </li>
               <li>
                 <span>收支金额</span>
                 <div style="color: red">￥{{particulars_pay_amount}}</div>
               </li>
               <li>
                 <span>付款方式</span>
                 <div>{{particulars_pay_mode_id}}</div>
               </li>
               <li>
                 <span>收支原因</span>
                 <div>{{particulars_code_pay_for}}</div>
               </li>
               <li>
                 <span>支付时间</span>
                 <div>{{particulars_biz_date}}</div>
               </li>
               <li>
                 <span></span>
               </li>

             </ul>
            <span slot="footer" class="dialog-footer">
              <!--<el-button @click="dialogVisible = false" size="mini">取 消</el-button>-->
              <el-button type="danger" plain @click="dialogVisible = false" size="mini">退出 </el-button>
          </span>
          </el-dialog>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "money",
    data() {
      return {
        url: this.api.api_9022_9519,
        activeIndex: '1',
        hotel_list: [],//酒店
        hotel_group: '',//酒店
        branch_id: '',//所选择的收银点
        /**详情*/
        dialogVisible:false,//详情页面
        title:'',//详情页面的title
        particulars_room:'', //房间号
        particulars_pay_mode_id :'',//付款方式
        particulars_pay_amount:'',//金额
        particulars_code_pay_for:'',//收支原因
        particulars_biz_date:'',//支付时间
        /**详情结束*/
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        //表头的选择--收支
        account_data: [
          {
            value: 'in',
            text: '收'
          },
          {
            value: 'out',
            text: '支'
          }
        ],
        //分页
        total: 10,
        credibility_total:10,//信用付款
        discounts_total:10,//优惠付款
        pagesize: 10,
        cur_page: 1,
        /*
        * 筛选条件
        * */
        biz_start: '',//筛选条件起始时间
        closing_date: '',//筛选条件营业日期止
        register: '',//筛选条件收银点
        room_number: '',
        room_list: [],//房间号
        //消费清单
        activeName2: '',
        register_list: [],//收银点列表
        branch_data: '',//部门id
        detail_all: [],//实时到账
        credibility_pay:[],//信用付款
       discounts_pay:[],//优惠付款
        tabvelue: '',//选中的tab项
        pay_data: [],//支付方式
        activeName: "first",
        pickerOptionsStart: {
          disabledDate: time => {
            let endDateVal = this.closing_date;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let beginDateVal = this.biz_start;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              );
            }
          }
        },

      }
    },
    created: function () {
      let that = this;
      that.hotel();//获取酒店
      that.cash_register();//获取收银点
      that.income_expend();//获取收支方式
      that.room_data();//获取所有房间号
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      /**表格双击事件*/
      dblhandleCurrentChange(value){
        console.log(value);
       let  that =this;
       let row = value;
       that.dialogVisible=true;
       that.title = row.account_id.room_num+"房"+"付款详情";
       that.particulars_room = row.account_id.room_num;//房间号
        that.particulars_pay_mode_id = row.pay_mode_id.model_name;//付款方式
        that.particulars_pay_amount = row.pay_amount;//金额
        that.particulars_code_pay_for = row.code_pay_for_id.desc;//收支原因
        that.particulars_biz_date = row.biz_date;//收支时间
      },
      //封装获取酒店的信息
      hotel() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/dept/get_tree",
          "method": "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.hotel_list = res.data.data;
              that.hotel_group = that.hotel_list[0].name;
              that.id = that.hotel_list[0].id;

            }
            else {
              that.error(res.data.message);
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //收银点事件
      handleNodeClick(data) {
        console.log(data.id);
        let that = this;
        that.branch_id=data.id;
        that.detail_list()
        // that.hintInfo("warning", "此收银点暂未开放")
      },
      /**点击收银点all_cashiers 得到所有收银点下的账务*/
      all_cashiers(){
        let that =this;
        that.branch_id = undefined;
        that.detail_list();
      },
      //消费清单的table
      handleClick(tab, event) {
        console.log(tab, event);
        let that = this;
        // that.tabvelue = parseInt(tab.name);
        console.log(that.tabvelue);
        // that.detail_list();
      },
      /**
       *表头的事件
       * */
      //账户种类的筛选
      filterHandlers(value, row, column) {
        console.log(value, row, column);
        const property = column['property'];
        console.log(property, value, row['property'] === value);
        return row.account_id[property] === value;
      },
      //收支的筛选
      filterHandler(value, row, column) {
        console.log(value, row, column);
        const property = column['property'];
        return row[property] === value;
      },
      /**
       * 封装获取收银点
       * */
      cash_register() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/cash_register/info_list",
          method: "post",
          data: {
            page_size:999
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.register_list = res.data.data.list;

            }
            else {
              console.log(res.data.message);
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },

      //营业日期的筛选
      closing_click() {
        let that = this;
        console.log(that.room_number);
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/info_list",
          method: "post",
          data: {
            // pay_mode_id:that.tabvelue,
            //这里需要传一个收银点
            cashier_id:that.branch_id,
            end_date: that.closing_date,
            begin_date: that.biz_start,
            room_num:that.room_number
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              console.log(res.data.data);
              that.detail_all=[];//实时到账
              that.credibility_pay=[];//信用付款
              that.discounts_pay=[];//优惠付款
              for(let item of res.data.data.list){
                if(item.pay_mode_id.pay_model_type==='实时到账'){
                  that.detail_all.push(item)
                }else if(item.pay_mode_id.pay_model_type==='信用付款'){
                  that.credibility_pay.push(item)
                }else if(item.pay_mode_id.pay_model_type==='优惠付款') {
                  that.discounts_pay.push(item)
                }
              }
              // that.detail_all = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //付款方式的筛选
      cashier() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/info_list",
          method: "post",
          data: {
            pay_mode_id: that.register,
            //这里需要传一个收银点
            cashier_id:that.branch_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              console.log(res.data.data);
              that.detail_all=[];//实时到账
              that.credibility_pay=[];//信用付款
              that.discounts_pay=[];//优惠付款
              for(let item of res.data.data.list){
                if(item.pay_mode_id.pay_model_type==='实时到账'){
                  that.detail_all.push(item)
                }else if(item.pay_mode_id.pay_model_type==='信用付款'){
                  that.credibility_pay.push(item)
                }else if(item.pay_mode_id.pay_model_type==='优惠付款') {
                  that.discounts_pay.push(item)
                }
              }
              // that.detail_all = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**
       * 封装获取表格选择
       * */
      /**获取f付款方式*/
      income_expend() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/get_list_by_hotel",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.pay_data = res.data.data.list;
              that.detail_list();//获取钱
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /** 封装获取所有钱*/
      detail_list() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/info_list",
          method: "get",
          params: {
            page_num: that.cur_page,
            //这里需要传一个收银点
            cashier_id:that.branch_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              console.log(res.data.data);
              that.detail_all=[];//实时到账
              that.credibility_pay=[];//信用付款
              that.discounts_pay=[];//优惠付款
              for(let item of res.data.data.list){
                if(item.pay_mode_id.pay_model_type==='实时到账'){
                  that.detail_all.push(item)
                }else if(item.pay_mode_id.pay_model_type==='信用付款'){
                  that.credibility_pay.push(item)
                }else if(item.pay_mode_id.pay_model_type==='优惠付款') {
                  that.discounts_pay.push(item)
                }
              }
              // that.detail_all = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      /**获取房间号*/
      room_data() {
        let that = this
        that.$axios({
          url: that.api.api_price_9101 + '/v1/room/room_status/get_room_map_list/',
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.room_list = res.data.data.results;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //点击实时到账分页上的页数
      handleCurrentChange_real(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page=curPage;
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            room_num:that.room_number,
            pay_mode_id: that.register,
            begin_data: that.biz_start,
            end_data: that.closing_date,
            //这里需要传一个收银点
            cashier_id:that.branch_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.detail_all = res.data.data.list;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
      //信用付款分页
      handleCurrentChange(){

      },
      /**Dialog 对话框的消失*/
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
  .money {
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation {
      float: left;
      width: 249px;
      height: 100%;
      background: white;
      overflow-y: scroll;
    }
    .router {
      width: calc(100% - 249px);
      height: 100%;
      float: left;
      .cash {
        width: 95%;
        height: 95%;
        margin: 1%;
        background: white;
        overflow: scroll;
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
          margin-top: 20px;

          .shopping_title {
            li {
              display: inline-block;
              margin-left: 10px;
            }
          }
        }
        .dialog_style{
          li{
            margin-bottom: 10px;
            span{
              width: 80px;
              display: inline-block;
              text-align: left;
              vertical-align: top;
            }
            div{
              display: inline-block;
              width: 200px;
              height: 28px;
              border: 1px solid #ebeef5;
              border-radius: 4px;
              line-height: 28px;
              padding-left: 10px;
            }
          }
        }
      }
      .ini {
        height: calc(100% - 60px);
        position: absolute;
        right: 0;
        top: 60px;
        z-index: 10;
      }
    }
  }
</style>
<style scoped>
  .cash>>> .el-tabs__header {
    margin: 0;
  }
  .shopping >>> .el-table__column-filter-trigger i {
    color: white;
    font-size: 16px;
  }
</style>
