<template>
  <!--账务-->
  <div class="warp-main">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick" class="warp-tab">
      <el-tab-pane label="未结单" name="no_statement">
        <div>
          <el-row style="height: 130px;margin-bottom: 10px">
            <el-col :span="22">
              <el-row>
                <el-col :span="24">
                  <span @click="check_All_Change">全选</span>
                  <span @click="check_Null_Change">全不选</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-checkbox-group v-model="type_of_cost" @change="condition_inquire">
                    <el-checkbox v-for="(item_type_of_cost,index) in item_type_of_costs"  :label="item_type_of_cost.id" :key="item_type_of_cost.code">{{item_type_of_cost.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-col>
            <el-col :span="2">
              <ul>
                  <li style="padding-top: 40px" @click="dialog_settle = true"><img src="@/assets/images/pms/accountsReceivable/goods.png"/></li>
                  <li style="margin-top: -30px" @click="dialog_settle = true;open_goods()"><label style="margin-left: -10px;cursor: pointer">待结账栏:</label><label>{{to_check_out}}</label></li>
              </ul>
            </el-col>
          </el-row>
          <!--这里是筛选条件-->
          <el-row :gutter="16" style="background: #EEEEEE;margin-top: 10px">
            <el-col :span="2.5">
              <el-date-picker
                v-model="check_in_date"
                type="date"
                size="mini"
                style="width: 140px"
                value-format="yyyy-MM-dd"
                placeholder="入住日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <el-date-picker
                v-model="leave_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="离店日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <el-date-picker
                v-model="settle_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="结账营业日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <input placeholder="姓名" v-model="guest_name"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="手机号" v-model="guest_phone"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="房间号" v-model="guest_room_num"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="团队名称" v-model="team_name"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="主账编号" type="number" v-model="bill_num"/>
            </el-col>
            <el-col :span="1.5">
              <button @click="accounting_query">查询</button>
            </el-col>
            <el-col :span="1.5">
              <button>打印</button>
            </el-col>
            <el-col :span="1.5">
              <button>导出Excel</button>
            </el-col>
          </el-row>
        </div>
        <div class="main-table">
          <el-table
            ref="multipleTable"
            @selection-change="handleSelectionChange"
            :data="tableData_no_statement"
            stripe
            size="mini"
            :row-key="getRowKeys"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="selection"
              :selectable="selectable"
              :reserve-selection="true"
              width="55">
            </el-table-column>
            <el-table-column
              prop="account_id.id"
              label="主账id">
            </el-table-column>
            <el-table-column
              prop="create_user.real_name"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="code_income_type_id.name"
              width="140"
              label="入账代码">
            </el-table-column>
            <el-table-column
              prop="account_id.account_type"
              label="账户类型">
              <template slot-scope="scope">
                <span v-if="scope.row.account_id.account_type === 0" style="color: green">正常账户</span>
                <span v-else-if="scope.row.account_id.account_type === 1">AR账户</span>
                <span v-else-if="scope.row.account_id.account_type === 2">临客账</span>
                <span v-else style="color: orange">异常</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_id.close_flag"
              label="平帐标记">
              <template slot-scope="scope">
                <span v-if="scope.row.account_id.close_flag === 'a'">冲账</span>
                <span v-else-if="scope.row.account_id.close_flag === 't'">转账</span>
                <span v-else-if="scope.row.account_id.close_flag === 'c'">结账</span>
                <span v-else style="color: green">未平账</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_id.pay_amount"
              label="总付款">
            </el-table-column>
            <el-table-column
              prop="account_id.total_consumption"
              label="总消费">
            </el-table-column>
            <el-table-column
              prop="account_id.balance"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="account_id.total_invoice"
              label="开票总计">
            </el-table-column>
            <el-table-column
              prop="biz_date"
              label="营业日期">
            </el-table-column>
            <el-table-column
              prop="charge_amount"
              label="消费金额">
            </el-table-column>
            <el-table-column
              prop="master_guests"
              width="100"
              label="入住宾客" type="expand">
              <template slot-scope="scope">
                <el-form>
                  <el-form-item label="姓名:">
                    <span v-for="(col,index) in scope.row.master_guests">{{col.name}}、</span>
                  </el-form-item>
                  <el-form-item label="手机号:">
                    <span v-for="(col,index) in scope.row.master_guests">{{col.telephone}}、</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="reserve_base_id.name"
              label="预订人姓名">
            </el-table-column>
            <el-table-column
              prop="code_income_type_id.in_or_out"
              label="收/支">
              <template slot-scope="scope">
                <span v-if="scope.row.code_income_type_id.in_or_out === 'in'" style="color: green">收</span>
                <span v-else-if="scope.row.code_income_type_id.in_or_out === 'out'" style="color: darkorange">支出</span>
                <span v-else>异常</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="master_base_id.team_name"
              label="团队名">
             <!-- <template slot-scope="scope">
                <span>{{ scope.row.master_base_id.team_name || '暂无' }}</span>
              </template>-->
            </el-table-column>
            <el-table-column
              prop="master_base_id.arr_time"
              label="抵达时间">
            </el-table-column>
            <el-table-column
              prop="master_base_id.leave_time"
              label="离开时间">
            </el-table-column>
            <el-table-column
              prop="pay_status"
              label="支付状态">
              <template slot-scope="scope">
                <span v-if="scope.row.pay_status === 0" style="color: red">未支付</span>
                <span v-else-if="scope.row.pay_status === 1" style="color: green">已支付</span>
                <span v-else-if="scope.row.pay_status === 2" style="color: orange">异常</span>
                <span v-else>无数据</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange_page"
            :current-page="currentPage"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
        <el-row>
          <el-col :span="24">
            <button style="float: right" @click="add_goods">加入结账栏</button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="已结单" name="statement">
        <div>
          <el-row style="height: 130px">
            <el-col :span="24">
              <el-row>
                <el-col :span="24">
                  <span @click="check_All_Change">全选</span>
                  <span @click="check_Null_Change">全不选</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-checkbox-group v-model="type_of_cost" @change="condition_inquire">
                    <el-checkbox v-for="(item_type_of_cost,index) in item_type_of_costs"  :label="item_type_of_cost.id" :key="item_type_of_cost.code">{{item_type_of_cost.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--这里是筛选条件-->
          <el-row :gutter="16" style="background: #EEEEEE;margin-top: 10px">
            <el-col :span="2.5">
              <el-date-picker
                v-model="check_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="入住日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <el-date-picker
                v-model="leave_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="离店日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <el-date-picker
                v-model="settle_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="结账营业日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <input placeholder="姓名" v-model="guest_name"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="手机号" v-model="guest_phone"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="房间号" v-model="guest_room_num"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="团队名称" v-model="team_name"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="主账编号" type="number" v-model="bill_num"/>
            </el-col>
            <!--<el-col :span="1.5">
              仅欠费单<el-checkbox v-model="checked"></el-checkbox>
            </el-col>-->
            <el-col :span="1.5">
              <button @click="accounting_query">查询</button>
            </el-col>
            <el-col :span="1.5">
              <button>打印</button>
            </el-col>
            <el-col :span="1.5">
              <button>导出Excel</button>
            </el-col>
          </el-row>
        </div>
        <div class="main-table">
          <el-table
            :data="tableData_statement"
            stripe
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
            style="width: 100%">
            <el-table-column
              prop="account_id.id"
              label="主账id">
            </el-table-column>
            <el-table-column
              prop="create_user.real_name"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="code_income_type_id.name"
              width="140"
              label="入账代码">
            </el-table-column>
            <el-table-column
              prop="account_id.account_type"
              label="账户类型">
              <template slot-scope="scope">
                <span v-if="scope.row.account_id.account_type === 0" style="color: green">正常账户</span>
                <span v-else-if="scope.row.account_id.account_type === 1">AR账户</span>
                <span v-else-if="scope.row.account_id.account_type === 2">临客账</span>
                <span v-else style="color: orange">异常</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_id.close_flag"
              label="平帐标记">
              <template slot-scope="scope">
                <span v-if="scope.row.account_id.close_flag === 'a'">冲账</span>
                <span v-else-if="scope.row.account_id.close_flag === 't'">转账</span>
                <span v-else-if="scope.row.account_id.close_flag === 'c'">结账</span>
                <span v-else style="color: green">未平账</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_id.pay_amount"
              label="总付款">
            </el-table-column>
            <el-table-column
              prop="account_id.total_consumption"
              label="总消费">
            </el-table-column>
            <el-table-column
              prop="account_id.balance"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="account_id.total_invoice"
              label="开票总计">
            </el-table-column>
            <el-table-column
              prop="biz_date"
              label="营业日期">
            </el-table-column>
            <el-table-column
              prop="charge_amount"
              label="消费金额">
            </el-table-column>
            <el-table-column
              prop="master_guests"
              width="100"
              label="入住宾客" type="expand">
              <template slot-scope="scope">
                <el-form>
                  <el-form-item label="姓名:">
                    <span v-for="(col,index) in scope.row.master_guests">{{col.name}}、</span>
                  </el-form-item>
                  <el-form-item label="手机号:">
                    <span v-for="(col,index) in scope.row.master_guests">{{col.telephone}}、</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="reserve_base_id.name"
              label="预订人姓名">
            </el-table-column>
            <el-table-column
              prop="code_income_type_id.in_or_out"
              label="收/支">
              <template slot-scope="scope">
                <span v-if="scope.row.code_income_type_id.in_or_out === 'in'" style="color: green">收</span>
                <span v-else-if="scope.row.code_income_type_id.in_or_out === 'out'" style="color: darkorange">支出</span>
                <span v-else>异常</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="master_base_id.team_name"
              label="团队名">
              <!-- <template slot-scope="scope">
                 <span>{{ scope.row.master_base_id.team_name || '暂无' }}</span>
               </template>-->
            </el-table-column>
            <el-table-column
              prop="master_base_id.arr_time"
              label="抵达时间">
            </el-table-column>
            <el-table-column
              prop="master_base_id.leave_time"
              label="离开时间">
            </el-table-column>
            <el-table-column
              prop="pay_status"
              label="支付状态">
              <template slot-scope="scope">
                <span v-if="scope.row.pay_status === 0" style="color: red">未支付</span>
                <span v-else-if="scope.row.pay_status === 1" style="color: green">已支付</span>
                <span v-else-if="scope.row.pay_status === 2" style="color: orange">异常</span>
                <span v-else>无数据</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange_page"
            :current-page="currentPage"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已付款" name="payment" class="three">
        <div>
          <el-row style="height: 130px">
            <el-col :span="24">
              <el-row>
                <el-col :span="24">
                  <span @click="check_All_Change">全选</span>
                  <span @click="check_Null_Change">全不选</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-checkbox-group v-model="type_of_cost" @change="condition_inquire">
                    <el-checkbox v-for="(item_type_of_cost,index) in item_type_of_costs"  :label="item_type_of_cost.id" :key="item_type_of_cost.code">{{item_type_of_cost.name}}</el-checkbox>
                  </el-checkbox-group>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--这里是筛选条件-->
          <el-row :gutter="16" style="background: #EEEEEE;margin-top: 10px">
            <el-col :span="2.5">
              <el-date-picker
                v-model="check_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="入住日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <el-date-picker
                v-model="leave_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="离店日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <el-date-picker
                v-model="settle_in_date"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                style="width: 140px"
                placeholder="结账营业日期">
              </el-date-picker>
            </el-col>
            <el-col :span="2.5">
              <input placeholder="姓名" v-model="guest_name"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="手机号" v-model="guest_phone"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="房间号" v-model="guest_room_num"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="团队名称" v-model="team_name"/>
            </el-col>
            <el-col :span="1.5">
              <input placeholder="主账编号" type="number" v-model="bill_num"/>
            </el-col>
            <!--<el-col :span="1.5">
              仅欠费单<el-checkbox v-model="checked"></el-checkbox>
            </el-col>-->
            <el-col :span="1.5">
              <button @click="accounting_query">查询</button>
            </el-col>
            <el-col :span="1.5">
              <button>打印</button>
            </el-col>
            <el-col :span="1.5">
              <button>导出Excel</button>
            </el-col>
          </el-row>
        </div>
        <div class="main-table">
          <el-table
            :data="tableData_payment"
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
            tooltip-effect="dark"
            style="width: 100%">
            <el-table-column
              prop="account_id.id"
              label="主账id">
            </el-table-column>
            <el-table-column
              prop="create_user.real_name"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="code_income_type_id.name"
              width="140"
              label="入账代码">
            </el-table-column>
            <el-table-column
              prop="account_id.account_type"
              label="账户类型">
              <template slot-scope="scope">
                <span v-if="scope.row.account_id.account_type === 0" style="color: green">正常账户</span>
                <span v-else-if="scope.row.account_id.account_type === 1">AR账户</span>
                <span v-else-if="scope.row.account_id.account_type === 2">临客账</span>
                <span v-else style="color: orange">异常</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_id.close_flag"
              label="平帐标记">
              <template slot-scope="scope">
                <span v-if="scope.row.account_id.close_flag === 'a'">冲账</span>
                <span v-else-if="scope.row.account_id.close_flag === 't'">转账</span>
                <span v-else-if="scope.row.account_id.close_flag === 'c'">结账</span>
                <span v-else style="color: green">未平账</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_id.pay_amount"
              label="总付款">
            </el-table-column>
            <el-table-column
              prop="account_id.total_consumption"
              label="总消费">
            </el-table-column>
            <el-table-column
              prop="account_id.balance"
              label="余额">
            </el-table-column>
            <el-table-column
              prop="account_id.total_invoice"
              label="开票总计">
            </el-table-column>
            <el-table-column
              prop="biz_date"
              label="营业日期">
            </el-table-column>
            <el-table-column
              prop="charge_amount"
              label="消费金额">
            </el-table-column>
            <el-table-column
              prop="master_guests"
              width="100"
              label="入住宾客" type="expand">
              <template slot-scope="scope">
                <el-form>
                  <el-form-item label="姓名:">
                    <span v-for="(col,index) in scope.row.master_guests">{{col.name}}、</span>
                  </el-form-item>
                  <el-form-item label="手机号:">
                    <span v-for="(col,index) in scope.row.master_guests">{{col.telephone}}、</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="reserve_base_id.name"
              label="预订人姓名">
            </el-table-column>
            <el-table-column
              prop="code_income_type_id.in_or_out"
              label="收/支">
              <template slot-scope="scope">
                <span v-if="scope.row.code_income_type_id.in_or_out === 'in'" style="color: green">收</span>
                <span v-else-if="scope.row.code_income_type_id.in_or_out === 'out'" style="color: darkorange">支出</span>
                <span v-else>异常</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="master_base_id.team_name"
              label="团队名">
              <!-- <template slot-scope="scope">
                 <span>{{ scope.row.master_base_id.team_name || '暂无' }}</span>
               </template>-->
            </el-table-column>
            <el-table-column
              prop="master_base_id.arr_time"
              label="抵达时间">
            </el-table-column>
            <el-table-column
              prop="master_base_id.leave_time"
              label="离开时间">
            </el-table-column>
            <el-table-column
              prop="pay_status"
              label="支付状态">
              <template slot-scope="scope">
                <span v-if="scope.row.pay_status === 0" style="color: red">未支付</span>
                <span v-else-if="scope.row.pay_status === 1" style="color: green">已支付</span>
                <span v-else-if="scope.row.pay_status === 2" style="color: orange">异常</span>
                <span v-else>无数据</span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @current-change="handleCurrentChange_page"
            :current-page="currentPage"
            :page-size="page_size"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
        <div></div>
      </el-tab-pane>
    </el-tabs>
    <!--结账栏-->
    <el-dialog
    title="待结账栏"
    :visible.sync="dialog_settle"
    width="40%">
    <el-table
      :data="tableData_check_out"
      height="400px"
      size="mini"
      :cell-style="{textAlign:'center'}"
      :header-cell-style="{background:'#303A41',color:'#fff',fontSize:'x-small',textAlign:'center'}"
      style="width: 100%">
      <el-table-column
        prop="account_id"
        type="index"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="account_id.id"
        label="主账id">
      </el-table-column>
      <el-table-column
        prop="code_income_type_id.name"
        label="入账代码">
      </el-table-column>
      <el-table-column
        prop="biz_date"
        label="营业日期">
      </el-table-column>
      <el-table-column
        prop="charge_amount"
        label="消费金额">
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="支付状态">
        <template slot-scope="scope">
          <span v-if="scope.row.pay_status === 0">未支付</span>
          <span v-else-if="scope.row.pay_status === 1">已支付</span>
          <span v-else-if="scope.row.pay_status === 2">异常</span>
          <span v-else>无数据</span>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="removeRow(scope.$index, scope.row,tableData_check_out)"
            type="text"
            size="small">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
      <el-row>
        <el-col :span="24">
          <label>总金额:￥</label><label>{{count_settle}}</label><button style="float: right;margin-top: 10px" @click="settle_account">结账</button>
        </el-col>
      </el-row>
    </el-dialog>
    <!--付钱页面-->
    <el-dialog title="付钱" :visible.sync="fuAccountDialog" width="42%">
      <ul style="display: inline-block;">
        <li>
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支类型：</span>
          <el-radio v-model="collect_pay" label="in">收</el-radio>
          <el-radio v-model="collect_pay" label="out">支</el-radio>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>支付方式：</span>
          <el-select size="mini" v-model="pay_mode" clearable placeholder="请选择付款方式" @change="payment_method">
            <el-option v-for="item in pay_data" :key="item.value" :label="item.model_name" :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li v-show="scan_code_show">
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>扫码方式：</span>
          <el-radio v-model="scan_code" label="0">扫码枪扫描</el-radio>
          <el-radio v-model="scan_code" label="1">客户扫码</el-radio>
        </li>
        <li v-if="collect_pay === 'in'">
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>业务种类：</span>
          <el-select size="mini" v-model="pay_reason" clearable placeholder="请选择">
            <el-option v-for="item in pay_income_list" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li v-if="collect_pay === 'out'">
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>业务种类：</span>
          <el-select size="mini" v-model="pay_reason_one" clearable placeholder="请选择">
            <el-option v-for="item in pay_income_data" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li v-if="collect_pay === 'in'">
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收款金额：</span>
          <el-input size="mini"   v-model="pay_amount_money" clearable placeholder="请输入内容" style="width: 193px;"></el-input>
        </li>
        <li v-if="collect_pay === 'out'">
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>支付金额：</span>
          <el-input size="mini" v-model="pay_amount_money" clearable placeholder="请输入内容" style="width: 193px;"></el-input>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>入账代码：</span>
          <el-select size="mini" v-model="enter_list" clearable placeholder="请选择入账代码">
            <el-option v-for="item in enter_lists" :key="item.value" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <span style="vertical-align: top">摘要：</span>
          <textarea cols="30" rows="8" v-model="abstract" style="width: 193px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"></textarea>
        </li>
      </ul>
      <div slot="footer" class="dialog-footer">
        <button @click="fuAccountDialog = false">取消</button>
        <button v-if="scan_code_show " @click="article_number()" type="primary">结算</button>
        <button v-else @click="pay_them_money()" type="primary">结算</button>
      </div>
    </el-dialog>
    <!--弹出支付宝页面-->
    <el-dialog title="结账" :visible.sync="dialog_alipay" width="40%">
      <ul>
        <li>
          <span>结账金额：</span>
          <span>￥{{pay_amount_money}}</span>
        </li>
        <li style="margin-top: 20px">
          <span>请使用扫码枪扫描二维码：</span>
          <el-input v-model="pay_amount_money_code" onkeydown="if(event.keyCode==13){return false;}" size="small" clearable id="inputId" placeholder="请扫码" style="width: 320px;"></el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
              <button @click="dialog_alipay = false">取 消</button>
              <button type="primary" @click="payment_ensure ">确 定</button>
       </span>
    </el-dialog>
    <!--支付成功后显示的页面-->
    <el-dialog :visible.sync="dialog_succeed" width="40%">
      <ul>
        <li style="text-align: center;width: 100%" v-if="ihatetheqrcode">
          <img src="@/assets/images/pms/accountsReceivable/triumph.png" alt="" style="width: 46px;height: 46px;">
          <span style="display: inline-block;height: 40px;line-height: 40px;margin-top:5px;vertical-align: top;margin-left: 10px;font-size: 20px;width: 15%">支付成功！</span>
        </li>
        <li style="text-align: center" v-else>
          <img src="@/assets/images/pms/accountsReceivable/fault.png" alt="" style="width: 46px;height: 46px;">
          <span style="display: inline-block;height: 40px;line-height: 40px;margin-top:5px;vertical-align: top;margin-left: 10px;font-size: 20px;width: 28%">支付失败！请点击重试</span>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
              <button type="primary" @click="succeed_failed">确 定</button>
      </span>
    </el-dialog>
    <!--弹出微信二维码-->
    <el-dialog
      title="请扫描二维码"
      :visible.sync="dialog_img"
      width="40%">
          <img :src="img_src" alt="" style="margin-left: 24%">
    </el-dialog>
  </div>
</template>
<script>
  export default {
    components: {},
    data: function(){
      return {
        url : 'http://47.98.113.173:9519',
        dialog_settle : false,//待结账栏
        state_of_account: 'no_statement',//判断当前点击的账务状态
        activeName: 'no_statement', //用户默认进来的时候显示的tab栏
        currentPage: 1,//当前页码
        page_size: 10,//每页显示数量
        total: 0,//总数
        tableData_no_statement : [], //未结单的table
        tableData_statement : [],  //已结单的table
        tableData_payment : [], //已付款的table
        tab_flag : '', //
        check_in_date : '',//入住时间
        leave_in_date : '',//离店时间
        settle_in_date : '',//结账营业日期
        guest_name : '',//姓名
        guest_phone : '',//手机号
        guest_room_num : '',//房间号
        team_name : '',//团队名称
        bill_num  : '',//账单编号
        checked : false,//欠费单
        type_of_cost : [],//用户选择的筛选条件
        item_type_of_costs : [],
        to_check_out : 0,//待结账栏
        tableData_check_out : [],//待结账栏
        the_flag : '0',//判断账务类型
        tableData_check_out_transit : [],//加入结账栏的过渡数组
        getRowKeys(row) {
          return row.id;
        },
        count_settle : 0,//结账金额
        /**
         * 付钱的内容 pay_them
         */
        dialog_alipay:false,//支付宝支付页面
        fuAccountDialog:false,
        pay_income_list:[],//支付款原因
        pay_income_data:[],//收付款原因
        collect_pay:"in",//收支种类
        pay_amount_money:'',//支付金额
        pay_mode:'',  //付款方式
        scan_code:'0',//扫码方式
        scan_code_show:false,//扫码方式出现
        dialog_succeed:false,//支付成功或者失败显示的页面
        ihatetheqrcode:true,//扫码成功后的提示
        pay_amount_money_code:'',//扫码得到的码
        pay_reason:'', // 业务种类
        pay_reason_one:"", // 业务种类
        abstract:'',//摘要
        pay_data:[],//支出方式
        pay_status_data:[
          {
            value:0 ,
            label: '正常'
          },
          {
            value:1 ,
            label: '已取消'
          },
          {
            value:2 ,
            label: '已退款'
          },
          {
            value:3 ,
            label: '异常'
          },
        ],
        /**付钱的详细信息*/
        source:'',//入账来源
        room_mark:'',//房间号
        settle_accounts:'',//账户id
        cope_with_money:'',//应付金额
        img_src:'',//微信的二维码
        separate_id : [],//用户选中行的id
        dialog_img : false,//微信二维码
        timer : 0,//付款的计时器
        enter_list : '',//入账代码
        enter_lists : [],//入账代码绑定的返回值
      };
    },
    created:function () {
      let that = this;
      that.search_created(); //获取页面的未结单的数据
      that.get_account_code(); //获取入账代码
      that.income_expend();//获取支付方式
    },
    /**
     * 方法层
     */
    methods: {
      /**
       * 结账
       */
      /**获取收支方式*/
      income_expend(){
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/get_list_by_hotel",
          method: "get",
        }).then((res)=>{
            console.info(res);
            if (res.data.message === "success"){
              that.pay_data=res.data.data.list
            }
            else{
              that.error_message(res.data.message)
            }
        }).catch((err)=>{
            console.error(err);
          });
      },
      /**封装获取付款原因*/
      pay_enter_code(){
        let that=this;
        that.$axios({
          url: that.url+"/v1/finance/code_pay_for/info_list",
          method: "get",
        })
          .then(res=>{
            if (res.data.message === 'success'){
              console.log(res.data.data)
              // that.pay_income_list=res.data.data.list;
              that.pay_income_list=[];
              that.pay_income_data=[];
              for( let item of res.data.data.list){
                if (item.in_or_out==="in"){
                  that.pay_income_list.push(item);
                }else {
                  that.pay_income_data.push(item);
                }
              }
              // that.total=res.data.data.total_count;
            }
            else{
              that.error_message(res.data.message)
            }
          })
          .catch(error=>{
            console.log(error);
          });
      },
      /**主帐上的付钱的确定*/
      pay_them_money(){
        let that = this;
        that.pay_amount_money_code="";
        //先判断是否为空
        if(that.pay_amount_money===""  || that.pay_mode===""   ||that.pay_reason==='' ){
          that.hintInfo("warning", "*为必填项")
        }
        //如果不为空
        else {
          //在判断是不是支付宝或者微信
          if (that.pay_mode === 1 || that.pay_mode === 38) {
            //判断是不是选择扫码枪
            if (that.scan_code === "0") {
              that.dialog_alipay = true;
            }
            //如果不是扫码枪
            else {
              that.dialog_alipay = false;
              //判断是微信还是支付宝
              if(that.pay_mode === 38){
                // 首先请求微信或者支付宝的接口，获取动态的二维码
                that.kindle_dxg();
              }
              // that.fu_money();//付钱的结算
            }
          }
          //如果不是支付宝或者微信
          else {
              that.fu_money();
          }
        }
      },
      /** 封装获取微信的二维码*/
      kindle_dxg(){
        let that = this;
        let transform = that.pay_amount_money*100;
        let code_pay_for_id="";
        if(that.collect_pay === "out"){
          code_pay_for_id=that.pay_reason_one
        }else {
          code_pay_for_id=that.pay_reason
        };
        that.$axios({
          url: "http://47.98.113.173:9503/v1/payment/weixin/native",
          method: "post",
          data:{
            out_trade_no:that.order_form,
            total_fee:transform,
            product_id:5,//商品id现在是写死数据，后期改
            body:code_pay_for_id+"",
            spbill_create_ip:58548487,//	生成订单的IP地址现在是写死数据，后期改
          },
        })
          .then(res=>{
            if (res.data.message === "success"){
              console.log(res.data.data.qr_img_b64);
              that.img_src=res.data.data.qr_img_b64;
            }
            else{
              that.error_message(res.data.message)
            }
          })
          .catch(error=>{
            console.log(error);
          });
      },
      //封装付钱的结算
      fu_money(){
        console.info("pass");
        let that = this;
        let code_pay_for_id = '';
        code_pay_for_id = that.collect_pay === 'out' ? that.pay_reason_one : that.pay_reason;
        let order_from_id = '';
        //如果扫码方式没有出现说明不会有订单号
        order_from_id = that.scan_code_show ? that.order_form : "";
        that.$axios({
          url: that.url+"/v1/finance/pay_detail/pay_by_charges",
          method: "post",
          data:{
            //account_id: that.separate_id, //传入分帐前的账号  //主账的id
            charge_ids:JSON.stringify( that.separate_id),
            pay_amount:parseFloat(that.pay_amount_money).toFixed(2),//支付金额
            pay_mode_id:that.pay_mode,//付款方式
            code_pay_for_id :code_pay_for_id,//付款原因
            in_or_out:that.collect_pay,//收支种类
            original_pay_id:order_from_id,//订单号
            code_income_type_id : that.enter_list,//入账代码
          },
        })
          .then(res=>{
            if (res.data.message === "success"){
              that.fuAccountDialog = false;
              //请求页面table的数据-进行数据的刷新
              that.search_created();
              //将用户选择框清空
              that.$refs.multipleTable.clearSelection();
              //that.major_account();
            }
            else{
            }
          })
          .catch(error=>{
            console.log(error);
          });
      },
      /**
       *@income_code 封装获取入账代码
       */
      income_code(){
        let that=this
        that.$axios({
          url: that.url+"/v1/finance/incoming_account_code/info_list",
          method: "get",
          params:{
            page_size:1000
          },
        })
          .then(res=>{
            if (res.data.message === "success"){
              console.log(res.data.data);
              that.enter_lists = res.data.data.list
            }
            else{
              that.error_message(res.data.message)
            }

          })
          .catch(error=>{
            console.log(error);
          });

      },
      /***付款方式*/
      payment_method(value){
        console.log(value);
        let that = this;
        if(value===1 ||value===38){
          that.scan_code_show=true;
        }else {
          that.scan_code_show=false;
        }
      },
      /**扫码后确定*/
      payment_ensure(){
        let that = this;
        //如果微信扫码后确定
        if(that.pay_mode === 38){
          let that = this;
          let transform = that.pay_amount_money*100;
          let code_pay_for_id="";
          if(that.collect_pay === "out"){
            code_pay_for_id=that.pay_reason_one
          }else {
            code_pay_for_id=that.pay_reason
          };
          that.$axios({
            url: "http://47.98.113.173:9503/v1/payment/weixin/micropay",
            method: "post",
            data:{
              out_trade_no:that.order_form,//付钱的订单
              total_fee:transform,
              product_id:5,//商品id现在是写死数据，后期改
              body:code_pay_for_id,
              spbill_create_ip:58548487,// 生成订单的IP地址现在是写死数据，后期改
            },
          })
            .then(res=>{
              //如果扫码成功
              if (res.data.message === "success"){
                // that.dialog_alipay = false;
                that. check_paid();//查看扫码是否成功
              }
              else{
                that.hintInfo("warning", "扫码错误请重新扫码")
              }
            })
            .catch(error=>{
              console.log(error);
            });
        }
        //如果支付宝扫码后确定
        else {
          that.$axios({
            url: 'http://pay.crowncrystalhotel.com/v1/alipay/trade_pay/',
            method: "post",
            data:{
              out_trade_no:that.order_form+"",//付钱的订单
              auth_code:that.pay_amount_money_code,//授权码
              total_amount:that.pay_amount_money ,//支付金额
              // pay_mode_id:that.pay_mode,//付款方式
              // subject :that.pay_reason,//付款原因
              subject :that.pay_reason,//付款原因
            },
          })
            .then(res=>{
              //如果扫码成功
              if (res.data.message === "success"){
                // that.dialog_alipay = false;
                that.syntony_function()
              }
              else{
                that.hintInfo("warning", "扫码错误请重新扫码")
              }
            })
            .catch(error=>{
              console.log(error);
            });
        }
      },
      /***查询支付宝支付成功与否的回调*/
      syntony_function(){
        let that = this;
        clearInterval(that.timer_r);
        that.$axios({
          url: "http://pay.crowncrystalhotel.com/v1/alipay/query_result/",
          method: "post",
          data:{
            out_trade_no:that.order_form+"",
          },
        })
          .then(res=>{
            if (res.data.data.pay_status === "TRADE_SUCCESS"){
              console.log(res.data.data.pay_status)
              that.dialog_alipay=false;//扫码页面消失
              that.dialog_succeed=true;//成功或者失败的页面
              that.ihatetheqrcode=true;
              clearInterval(that.timer_r);
            }
            else{
              console.log(res.data.data.pay_status);
              that.timer_r=setInterval(function()   //开启循环：
              {
                console.log(that.a++);
                that.syntony_function();
                if(that.a>5){
                  clearInterval(that.timer_r);
                  console.log(that.a);
                }
              },1000);
            }
          })
          .catch(error=>{
            console.log(error);
          });
      },
      /**封装获取商品订单号*/
      article_number(){
        let that = this;
        let pay_reason = '';
        that.timer= 0;
        if(that.collect_pay ==='in' ){
          pay_reason = that.pay_reason;
        }else {
          pay_reason=that.pay_reason_one;
        };
        //判断支付方式和收款金额是否为空
        if(pay_reason==="" || that.pay_amount_money===""){
          that.hintInfo("warning", "*为必填项")
        }else {
          //判断付款金额是否小于等于0
          if(that.pay_amount_money<=0){
            that.hintInfo("warning", "付款金额不能小于等于0")
          }else {
            that.$axios({
              url: that.url+'/v1/finance/extend_pay/get_order_number',
              method: "post",
              data:{
                amount:that.pay_amount_money,
              },
            })
              .then(res=>{
                if (res.data.message === "success"){
                  console.log(res.data._id);
                  that.order_form = res.data._id;
                    that. pay_them_money()//主帐付钱
                }
              })
              .catch(error=>{
                console.log(error);
              });
          }
        }
      },
      /** 成功页面或者失败页面的确定按钮*/
      succeed_failed(){
        let that = this;
        if(that.ihatetheqrcode===true){
          that.scan_code = "1";
          that.dialog_succeed=false;//成功或者失败的页面
          that.dialog_alipay = false;//扫码支付的页面
          that.fu_money();//付钱的确定
        }else {
          if(that.img_src !== "" ){
            that.dialog_succeed=false;//成功或者失败的页面
            that.dialog_alipay = false;//扫码支付的页面
          }else {
            that.dialog_succeed=false;//成功或者失败的页面
            that.dialog_alipay = true;//扫码支付的页面
          }
        }
      },
      /**
       * @removeRow 待结账栏移除操作
       */
      removeRow(index, row, TableData){
        let that = this;
        TableData.splice(index, 1);
        if(that.to_check_out > 0){
           that.to_check_out -- ;
           that.hintInfo('success', '移除成功！');
           that.calculate();//将数据重新计算
           that.toggleSelection(row); //移除需要的移除的元素
        }else{
           that.hintInfo('warning', '没有数据！');
        }
      },
      /**
       * @selectable 设置不可点击的状态
       * @param row.pay_status === 0 是未支付的状态，这样的状态是可以选择的。
       * row.code_income_type_id.in_or_out === 'in' 是支出的状态  这样的状态也是可以选择的  两种情况同时保证才可以被选择
       */
      selectable(row,index){
        if(row.pay_status === 0 && row.code_income_type_id.in_or_out === 'in'){
           return true;
        }else{
           return false;
        }
      },
      /**
       * @handleSelectionChange 未结单的多选操作
       */
      handleSelectionChange(val){
        let that = this;
        console.info(val);
        that.tableData_check_out_transit = val;
        //return that.tableData_check_out_transit;
      },
      /**
       * @check_selection  检查当前的数据是不是被选中,进行相反的操作
       */
      toggleSelection(rows) {
        this.$refs.multipleTable.toggleRowSelection(rows);
      },
      /**
       * @add_goods 加入结账栏
       */
      add_goods(){
        let that = this;
        if(that.tableData_check_out_transit.length === 0){
          that.hintInfo('warning','您还未选择任何账单！');
        }else{
          that.hintInfo('success','添加成功！');
          that.tableData_check_out = that.tableData_check_out_transit;
          that.to_check_out = that.tableData_check_out.length;
        }
      },
      /**
       * @open_goods 打开结账栏  用于计算需要支付的账单
       */
       open_goods(){
        let that = this;
        that.calculate();
      },
      /**
       * @calculate 计算总金额
       */
       calculate(){
        let that = this;
        let count = 0;
        that.separate_id = [];
        that.tableData_check_out.map((res)=>{
          count = count + res.charge_amount;
          that.separate_id.push(res.id); //将用户选择的当前行的id拿到，作为参数
          console.info(res.charge_amount);
        });
        that.count_settle = count;
        console.info(that.count_settle);
        console.info(that.separate_id);
      },
      /**
       * @settle_account 结账
       */
       settle_account(){
         let that = this;
         that.fuAccountDialog = true;
         //that.pay_them();//收付款原因
         that.pay_amount_money = that.count_settle;//将金额传到需要付款的金额上面
         that.pay_enter_code();//收付款原因
         that.income_code();//入账代码
      },
      /**
       * @get_account_code 获取入账代码
       */
       get_account_code(){
        let that = this;
        let url = that.url + '/v1/finance/incoming_account_code/info_list?only_system=0&page_size=100';
        that.$axios({
             method : 'post',
             url : url
        }).then((res)=>{
          that.item_type_of_costs = res.data.data.list;
             console.info(res);
        }).catch((err)=>{
             console.error(err);
        })
      },
      /**
       * @accounting_query  点击查询的时候，将所有的数据拿到
       */
       accounting_query(){
          let that = this;
          console.info(that.type_of_cost);
          let url;
          url = that.url + '/v1/finance/charge_detail/info_list';
          that.$axios({
           method : 'post',
           url : url,
           data : {
             code_income_type_ids : that.type_of_cost.length === 0  ?  undefined : JSON.stringify(that.type_of_cost), //费用类型 这里的参数需要json序列化
             check_in_date : that.check_in_date ? that.check_in_date : undefined, //入住时间
             check_out_date : that.leave_in_date ? that.leave_in_date : undefined, //离店时间
             close_biz_date : that.settle_in_date ? that.settle_in_date : undefined, //结账营业日期
             name : that.guest_name ? that.guest_name : undefined, //姓名
             phone : that.guest_phone ? that.guest_phone : undefined, //手机号
             room_number : that.guest_room_num ? that.guest_room_num : undefined, //房间号
             team_name : that.team_name ? that.team_name : undefined, //团队名称
             account_id : that.bill_num ? that.bill_num : undefined, //主账编号
             the_flag : that.the_flag,//判断当前属于哪一种账务类型
           }
        }).then((res)=>{
          console.info(res);
          if(that.state_of_account === 'no_statement'){
             that.tableData_no_statement = res.data.data.list;
             that.total = res.data.data.total_count;
          }else if(that.state_of_account === 'statement'){
             that.tableData_statement = res.data.data.list;
             that.total = res.data.data.total_count;
          }else{
             that.tableData_payment = res.data.data.list;
             that.total = res.data.data.total_count;
          }
        }).catch((err)=>{
           console.error(err);
        });
      },
      /**
       * @search_created 页面创建的时候查询的数据
       */
       search_created(){
         let that = this;
         let url = that.url + '/v1/finance/charge_detail/info_list';
         that.$axios({
           method: 'post',
           url : url,
           data: {
             the_flag : that.the_flag
           }
         }).then((res)=>{
           console.log(res);
           that.tableData_no_statement = res.data.data.list;
           that.total = res.data.data.total_count;
         }).catch((err)=>{
           console.error(err);
         })
      },
      /**
       * @handleClick tab切换
       * @params tab 切换的参数
       */
        handleClick(tab){
        let that = this;
        let url;
        url = that.url + '/v1/finance/charge_detail/info_list';
        that.state_of_account = tab.name; //将用户点击的tab的状态name绑定给判断值
        if(tab.name === 'no_statement'){
          that.the_flag = '0'; //未结单
        }else if(tab.name === 'statement'){
          that.the_flag = '1'; //已结单
        }else{
          that.the_flag = '2'; //已付款
        }
         that.$axios({
            method: 'post',
            url : url,
            data: {
             the_flag : that.the_flag
            }
         }).then((res)=>{
            console.info(res);
           if(tab.name === 'no_statement'){
             that.tableData_no_statement = res.data.data.list;
             that.total = res.data.data.total_count;
           }else if(tab.name === 'statement'){
             that.tableData_statement = res.data.data.list;
             that.total = res.data.data.total_count;
           }else{
             that.tableData_payment = res.data.data.list;
             that.total = res.data.data.total_count;
           }
         }).catch((err)=>{
            console.error(err);
         })
      },
       /**
       *handleCurrentChange_page 分页操作
       */
        handleCurrentChange_page(currentPage){
        let that = this;
        let url = that.url + '/v1/finance/charge_detail/info_list';
        that.$axios({
           method : 'post',
           url : url,
           data : {
             code_income_type_ids : that.type_of_cost.length === 0 ? undefined :  JSON.stringify(that.type_of_cost), //费用类型
             check_in_date : that.check_in_date ? that.check_in_date : undefined, //入住时间
             check_out_date : that.leave_in_date ? that.leave_in_date : undefined, //离店时间
             close_biz_date : that.settle_in_date ? that.settle_in_date : undefined, //结账营业日期
             name : that.guest_name ? that.guest_name : undefined, //姓名
             phone : that.guest_phone ? that.guest_phone : undefined, //手机号
             room_number : that.guest_room_num ? that.guest_room_num : undefined, //房间号
             team_name : that.team_name ? that.team_name : undefined, //团队名称
             account_id : that.bill_num ? that.bill_num : undefined, //主账编号
             the_flag : that.the_flag,//判断当前属于哪一种账务类型
             page_num : currentPage,//页码
           }
        }).then((res)=>{
            console.info(res);
          if(that.state_of_account === 'no_statement'){
            that.tableData_no_statement = res.data.data.list;
            that.total = res.data.data.total_count;
          }else if(that.state_of_account === 'statement'){
            that.tableData_statement = res.data.data.list;
            that.total = res.data.data.total_count;
          }else{
            that.tableData_payment = res.data.data.list;
            that.total = res.data.data.total_count;
          }
        }).catch((err)=>{
           console.error(err);
        })
      },
      /**
       * @check_All_Change 全选操作
       */
        check_All_Change() {
        let that = this;
        /**
         * 将全部的信息添加到绑定的数组里面去，这样可以实现一个全选的效果
         * @type {any[]}
         */
        that.type_of_cost = that.item_type_of_costs.map((res)=>{
             return res.id; //返回的必须是一个唯一的标识码  进行选中状态的标记
        });
        console.info(that.type_of_cost);
      },
      /**
       * @check_Nll_Change 全不选操作
       */
        check_Null_Change(){
        let that = this;
        that.type_of_cost = [];
      },
      /**
       * @condition_inquire  用户点击的时候直接进行查询，如果不需要这个业务的话，那么就不用实现这个函数
       */
        condition_inquire(){
        let that = this;
      },
      /**
       *  封装获取微信的二维码
       */
      kindle_dxg(){
        let that = this;
        let transform = that.pay_amount_money*100;
        let code_pay_for_id="";
        if(that.collect_pay === "out"){
          code_pay_for_id=that.pay_reason_one
        }else {
          code_pay_for_id=that.pay_reason
        };
        that.$axios({
          url: "http://47.98.113.173:9503/v1/payment/weixin/native",
          method: "post",
          data:{
            out_trade_no:that.order_form,
            total_fee:transform,
            product_id:5,//商品id现在是写死数据，后期改
            body:code_pay_for_id,
            spbill_create_ip:58548487,//	生成订单的IP地址现在是写死数据，后期改
          },
        }).then(res=>{
            if (res.data.message === "success"){
              console.log(res.data.data);
              that.img_src= "data:image/png;base64,"+res.data.data.qr_img_b64;

              that.dialog_img=true;
              that.check_paid();//查询二维码支付是否成功
            }
            else{
              that.error_message(res.data.message)
            }
          })
          .catch(error=>{
            console.log(error);
          });
      },

      /**
       * @timing 封装扫描二维码后触发的定时器
       */
      timing(){
        let that = this;
        that.timer_src=setInterval(function()   //开启循环：
        {
          that.timer++;
          console.log(that.timer++);
          that.check_paid();
          if(that.timer >=10){
            clearInterval(that.timer_src);
            console.log(that.timer);
            return;
            //判断res
          }
        },1000);
      },
      /**
       * @check_paid 封装查看微信二维码或者扫码枪扫描支付是否成功
       */
      check_paid(){
        let that = this;
        clearInterval(that.timer_src);
        that.$axios({
          url: "http://47.98.113.173:9503/v1/payment/weixin/check_paid",
          method: "post",
          data:{
            out_trade_no : that.order_form
          },
        })
          .then(res=>{
            if(res.data.data === "yes"){
              that.dialog_img=false;
              that.dialog_succeed=true;//成功或者失败的页面
              that.ihatetheqrcode=true;
              clearInterval(that.timer_src);
            }else{
              if(that.timer >= 10){
                clearInterval(that.timer_src);
                if (res.data.data === "yes"){
                  that.dialog_img=false;
                  that.dialog_succeed=true;//成功或者失败的页面
                  that.ihatetheqrcode=true;
                }else {
                  that.dialog_img=false;
                  that.dialog_succeed=true;//成功或者失败的页面
                  that.ihatetheqrcode=false;
                }
                return;
              }
              that.timing();
            }

          })
          .catch(error=>{
            console.log(error);
          });
      },
      /**
       * @hintInfo 操作提示信息
       * @param hint  成功提示
       * @param info 警告信息
       */
      hintInfo: function(hint, info) {
        let that = this;
        if(hint === "success") {
          that.$message({
            message: info,
            type: 'success'
          });
        } else if(hint === "warning") {
          that.$message({
            message: info,
            type: 'warning'
          });
        } else {
          this.$message.error('出错了！');
        }
      },
    },
    /**
     * @beforeDestroy 将计时器清空
     */
    beforeDestroy() {
      // 清除定时器
      let that = this;
      clearInterval(that.timer_src)
      this.timer = 0;
    },
  }
</script>
<style lang="less" scoped>
  .warp-main{
    .btn{
      width: 80px;
      height: 27px;
      background: #4488E9;
      color: #FFFFFF;
      line-height: 27px;
      border: none;
      border-radius: 3px;
    }
    width: calc(100% - 58px);
    .el-row{
      .el-col{
        height: 50px;
        line-height: 50px;
        span{
          color: #4488E9;
          margin-right: 20px;
        }
        span:hover{
          cursor: pointer;
          color: #000000;
        }
        input{
          width: 100px;
          height: 27px;
          border: none;
          border-radius: 3px;
          line-height: 27px;
          padding-left: 10px;
        }
        input::placeholder{
          color: RGB(192 202 227);
        }
        button{
          .btn
        }
        .el-checkbox{
          margin-left: 10px;
        }
      }
    }
    .el-dialog {
       ul{
          li{
            height: 30px;
            margin-top: 20px;
            span{
              display: inline-block;
              width: 120px;
              text-align: right;
            }
          }
       }
      .dialog-footer{
        button{
          .btn
        }
      }
    }
  }
  .main-table{
    margin-top: 10px;
  }
  .el-tabs--top.el-tabs--border-card .el-tabs__item.is-active{
    //border: none;
    border-top: 2px solid #4488E9;
  }
</style>
