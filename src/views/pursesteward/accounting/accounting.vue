<template>
  <div class="accounting">
    <div class="navigation">
      <div>
        <p style="padding: 10px;">酒店名称</p>
        <el-select v-model="hotel_group" placeholder="请选择" style="width: 229px;" size="mini">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;margin-top: 10px">
        <p style="padding: 10px 0 10px 10px; background: #68819EFF;color: white" @click="all_cashiers">收银点</p>
        <!--<el-tree :data="register_list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
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
      <div class="curtain">
        <!--头部的搜索-->
        <ul class="title">
          <li>
            <span>房间号 : </span>
            <el-select v-model="sub_account" clearable placeholder="请选择"  filterable   @change="begin" style="width: 150px;"
                       size=mini>
              <el-option
                v-for="item in room_number"
                :key="item.value"
                :label="item.room_no"
                :value="item.room_no">
              </el-option>
            </el-select>
          </li>
          <li>
            <div class="block">
              <span class="demonstration">营业日期起 :</span>
              <el-date-picker
                clearable
                v-model="business_date"
                size=mini
                type="date"
                style="width: 150px;"
                value-format="yyyy-MM-dd"
                @change="begin"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </li>
          <li>
            <div class="block">
              <span class="demonstration">营业日期止 :</span>
              <el-date-picker
                clearable
                @change="begin"
                size=mini
                v-model="closing_date"
                type="date"
                style="width: 150px;"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </li>
          <li>
            <!--<el-checkbox v-model="normal"  @change="begin">正常账户</el-checkbox>-->
            <!--<el-checkbox v-model="ar_checked"  @change="begin">AR帐</el-checkbox>-->
            <!--<el-checkbox v-model="temporary"  @change="begin">临客帐</el-checkbox>-->
            <el-checkbox-group v-model="checkList" @change="begin">
              <el-checkbox label="0">正常账户</el-checkbox>
              <el-checkbox label="1">AR帐</el-checkbox>
              <el-checkbox label="2">临客帐</el-checkbox>
            </el-checkbox-group>

          </li>
          <li>
            <el-checkbox v-model="only_closed" :disabled="disabled_equal" @change="begin">已平帐户</el-checkbox>
          </li>
          <li>
            <button @click="combine(); " style="width: 80px;height: 24px;line-height: 24px">并账</button>
          </li>
          <li style="float: right;margin-right: 20px">
            <span style="display: inline-block;width: 16px;height: 16px; background: #8FC8D6;;cursor: pointer "></span>
            <span style="vertical-align: top;cursor: pointer">已平帐户</span>
            <!--<el-checkbox v-model="only_closed"  @change="begin">已平帐户</el-checkbox>-->
          </li>
          <li style="float: right;margin-right: 10px">
            <span style="display: inline-block;width: 16px;height: 16px;background: #C0B6B6;cursor: pointer "></span>
            <span style="vertical-align: top;cursor: pointer">并账后的分帐户</span>
          </li>
        </ul>
        <!--账户种类 状态 ... -->
        <div class="status" style="height: 50%">
          <el-table
            ref="multipleTable"
            :row-class-name="tableRowClassName"
            :data="major_list"
            tooltip-effect="dark"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px"
            size="mini"
            :row-key="getRowKeys"
            height="100%"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              :selectable="handleDisable"
              :reserve-selection="true">
            </el-table-column>
            <el-table-column
              prop="source_name"
              fixed="left"
              label="入账来源">
            </el-table-column>
            <el-table-column
              prop="market_name"
              label="对应市场"
              fixed="left"
              width="100">
            </el-table-column>
            <el-table-column
              prop="room_num"
              fixed="left"
              label="房间号">
            </el-table-column>
            <el-table-column
              prop="cashier_id.desc"
              fixed="left"
              label="收银点">
            </el-table-column>
            <el-table-column
              prop="id"
              label="账户id">
            </el-table-column>
            <el-table-column
              prop="sub_account_count"
              label="子账户数量">
            </el-table-column>
            <el-table-column
              prop="account_type"
              label="账户种类"
              width="100"
              column-key="name"
              :filters="[
            {
              value: 0,
              text: '正常账户'
            },
            {
              value: 1,
              text: 'AR账户'
            },
            {
              value: 2,
              text: '临客帐'
            },
            {
              value: 3,
              text: '其它'
            }
          ]"
              :filter-method="filterHandler"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.account_type === 1">AR账户</span>
                <span v-else-if="scope.row.account_type === 0">正常账户</span>
                <span v-else-if="scope.row.account_type === 2">临客帐</span>
                <span v-else-if="scope.row.account_type === 3">其它</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="reference_link_label"
              width="100"
              label="业务主体">
              <template slot-scope="scope">
                <span v-if="scope.row.reference_link_label ===0">预定单账户</span>
                <span v-else-if="scope.row.reference_link_label ===1">入住单</span>
                <span v-else-if="scope.row.reference_link_label ===2">分账后的账户</span>
                <span v-else-if="scope.row.reference_link_label ===3">购物</span>
                <span v-else>餐饮</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="account_status"
              label="账户状态"
              width="100"
              column-key="name"
              :filters="account_major_data"
              :filter-method="filterHandler"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.account_status ===0">正常进行中</span>
                <span v-else-if="scope.row.account_status ===1">已平帐</span>
                <span v-else-if="scope.row.account_status ===2">已取消</span>
                <span v-else>异常</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="close_id"
              label="平帐">
              <template slot-scope="scope">
                <span v-if="scope.row.close_id">平账</span>
                <span v-else>未平帐</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="combined_flag"
              width="120"
              label="并帐">
              <template slot-scope="scope">
                <span v-if="scope.row.combined_flag ===0">未并账</span>
                <span v-else-if="scope.row.combined_flag ===1">并账后的分帐户</span>
                <span v-else>并账后的主帐户</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="split_flag"
              width="120"
              label="分帐">
              <template slot-scope="scope">
                <span v-if="scope.row.split_flag ===0">未分账</span>
                <span v-else-if="scope.row.split_flag ===1">分账后的主帐户</span>
                <span v-else>分账后的分帐户</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="arrange_accounts_count"
              label="调帐">
              <template slot-scope="scope">
                <span v-if="scope.row.arrange_accounts_count===0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="biz_date"
              width="120"
              label="建账营业日期">
            </el-table-column>

            <el-table-column
              prop="gen_time"
              width="140"
              label="业务时间">
            </el-table-column>
            <el-table-column
              prop="team_id"
              label="是否团队"
              width="100"
              column-key="name">
              <template slot-scope="scope">
                <span v-if="scope.row.team_id ===null">非团队账户</span>
                <span v-else>团队账户</span>
              </template>
            </el-table-column>
            <!-- :filters="account_data"-->
            <el-table-column
              prop="team_id"
              label="团队号"
              width="100">
            </el-table-column>

            <el-table-column
              prop="name"
              label="摘要">
            </el-table-column>

            <el-table-column
              prop="total_consumption"
              label="总消费"
              fixed="right">
            </el-table-column>
            <el-table-column
              prop="general_consumption"
              label="待支付消费"
              fixed="right">
            </el-table-column>
            <el-table-column
              prop="pay_amount"
              fixed="right"
              label="总付款">
            </el-table-column>
            <!-- 账户中的可用余额 = 总付款 + 总退款 + 广义消费统计  负数代表客户的付款有盈余, 正数代表客户的付款不足.-->
            <el-table-column
              prop="balance"
              label="余额"
              fixed="right">
            </el-table-column>
            <el-table-column
              prop="negation"
              label="应支付"
              fixed="right">
              <template slot-scope="scope">
                 <span v-if="scope.row.negation>0" style="color: #F56C6C" title="应收金额">
                   {{scope.row.negation}}
                 </span>
                <span v-else-if="scope.row.negation<0" style="color: #E6A23C" title="剩余金额">
                   {{scope.row.negation}}
                 </span>
                <span v-else="scope.row.negation===0" style="color: #67C23A" >
                   {{scope.row.negation}}
                 </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="total_invoice"
              label="总开票"
              fixed="right">
            </el-table-column>
            <!--<el-table-column-->
            <!--prop="name"-->
            <!--label="早餐"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
            <!--prop="check_record.is_deleted"-->
            <!--label="查帐记录"-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <el-table-column
              prop="address"
              fixed="right"
              width="120"
              label="操作"
            >
              <template slot-scope="scope">

                <div v-if="scope.row.close_id || scope.row.combined_flag ===1 ">
                  <!--<span style="color: green;cursor:not-allowed">账户已平</span>-->
                  <span style="color: #4488E9;cursor:pointer"
                        @click="open_ticket_data(scope.row,scope.row.id,scope.$index, major_list);">开票</span>
                  <span style="color: #4488E9;cursor:pointer"
                        @click="audit_accounts_data(scope.row,scope.row.id,scope.$index, major_list);dialog_accounts=true"
                        v-if="scope.row.check_record && scope.row.check_record.is_deleted!==0">查账</span>
                </div>
                <div v-else-if="scope.row.account_type === 1">
                  <span style="color: #a4da89;cursor: not-allowed">已挂AR账户</span>
                </div>
                <div v-else>
                  <!--v-if="scope.row.locked!==1 && !scope.row.close_id"-->
                  <span v-if=" !scope.row.close_id && scope.row.account_type !== 1" style="color: #4488E9;cursor:pointer"
                        @click="pay_them(scope.row,scope.row.id,scope.$index, major_list);fuAccountDialog=true">付款</span>
                  <span v-if="!scope.row.close_id || scope.row.locked!==1 " style="color: #4488E9;cursor:pointer"
                        @click="flat_screen(scope.row,scope.row.id,scope.$index, major_list);pingAccountDialog=true">平帐</span>
                  <!--<span v-if="!close_flag"   style="color: #4488E9;cursor:default">平帐</span>-->
                  <br>
                  <span style="color: #4488E9;cursor:pointer" v-if="scope.row.can_transfer>0 &&scope.row.account_type === 0 "
                        @click="suspend_AR(scope.row,scope.row.id,scope.$index, major_list);">挂AR</span>
                  <span style="color: #4488E9;cursor:pointer" v-if="scope.row.locked!==1"
                        @click="open_ticket_data(scope.row,scope.row.id,scope.$index, major_list);">开票</span>
                  <span style="color: #4488E9;cursor:pointer" v-if="scope.row.check_record===null "
                        @click="audit_accounts_data(scope.row,scope.row.id,scope.$index, major_list);dialog_accounts=true">
                     <span style="color: #4488E9;cursor:pointer">查账</span>
                    </span>
                  <span style="color: #4488E9;cursor:pointer"
                        v-else-if="scope.row.check_record && scope.row.check_record.is_deleted!==0"
                        @click="audit_accounts_data(scope.row,scope.row.id,scope.$index, major_list);dialog_accounts=true">
                       <span style="color: #4488E9;cursor:pointer">
                         查账
                       </span>
                    </span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!--并账页面-->
          <el-dialog
            :visible.sync="bingAccountDialog"
            :close-on-click-modal='false'
            width="35%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul class="open_ticket">
              <li>
                <span style="width: 200px;"><i
                  style="color: red;font-size: 18px;margin-right: 10px">*</i>请选择并入的主账户ID：</span>
                <el-select v-model="main_account" placeholder="请选择" size="mini" style="width: 220px;">
                  <el-option
                    v-for="item in advocate_id"
                    :key="item.value"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </li>
              <li v-for="item in merge_arr">
                <span style="width: 200px;">并账房间号 / 并账账户id ：</span>
                <div
                  style="display: inline-block;width: 220px;border:1px solid #DCDFE6;height: 24px;line-height: 24px; padding-left: 10px;border-radius: 4px"
                  v-if="item.master_base_id">房间号：{{item.room_num}}/ 账户ID ：{{item.id}}
                </div>
                <div
                  style="display: inline-block;width: 220px;border:1px solid #DCDFE6;height: 24px;line-height: 24px; padding-left: 10px;border-radius: 4px"
                  v-else>{{item.id}}
                </div>
                <!--<span style="width: 130px;">并账房间号：</span>-->
                <!--<div style="display: inline-block;width: 70px;border:1px solid #DCDFE6;height: 40px;line-height: 40px;padding-left: 10px;border-radius: 4px">{{item.master_base_id.id}}</div>-->
              </li>

            </ul>
            <div slot="footer" class="dialog-footer">
              <el-button @click="bingAccountDialog = false" size="mini">取消</el-button>
              <el-button @click="merge_money()" type="primary" size="mini">确定</el-button>
            </div>
          </el-dialog>
          <!--开票页面-->
          <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal='false'
            width="30%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul class="open_ticket">
              <!--<li>-->
              <!--<span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>票据种类：</span>-->
              <!--<el-select v-model="invoice_type"  clearable  placeholder="请选择开票类型" size="mini" style="width: 220px;">-->
              <!--<el-option-->
              <!--v-for="item in open_ticket_type"-->
              <!--:key="item.value"-->
              <!--:label="item.label"-->
              <!--:value="item.value">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</li>-->
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票编号：</span>
                <el-input v-model="invoice_number" clearable placeholder="请输入开票编号" style="width: 220px;"
                          size="mini"></el-input>
              </li>
              <li>

                <span> <i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票金额：</span>
                <el-input v-model="invoice_amount" clearable placeholder="请输入开票金额"
                          onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" style="width: 220px;"
                          size="mini"></el-input>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票抬头：</span>
                <el-input v-model="invoice_title" clearable placeholder="请输入开票抬头" style="width: 220px;"
                          size="mini"></el-input>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票类型：</span>
                <el-select v-model="invoice_type" clearable placeholder="请选择开票类型" size="mini" style="width: 220px;">
                  <el-option
                    v-for="item in open_ticket_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票时间：</span>
                <el-date-picker
                  clearable
                  v-model="issued_date"
                  type="date"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </li>
              <li>
                <span style="vertical-align: top">备注：</span>
                <textarea cols="30" rows="8" v-model="invoice_desc"
                          style="width: 220px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                          size="mini"></textarea>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="determine_ticket()" size="mini">确 定</el-button>
            </span>
          </el-dialog>
          <!--查账dialog_accounts-->
          <el-dialog
            :visible.sync="dialog_accounts"
            :close-on-click-modal='false'
            width="30%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul class="open_ticket">
              <li>
                <span>所查账户ID：</span>
                <el-input v-model="examine_id" :disabled="true" placeholder="请输入内容" style="width: 220px;"
                          size="mini"></el-input>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>查账原因：</span>
                <el-select v-model="examine_type" clearable placeholder="请选择查账原因" size="mini" style="width: 220px;">
                  <el-option
                    v-for="item in audit_list"
                    :key="item.value"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>查账结果：</span>
                <el-radio v-model="check_result" label="0">未操作</el-radio>
                <el-radio v-model="check_result" label="1">通过</el-radio>
                <el-radio v-model="check_result" label="2">不通过</el-radio>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_accounts = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="examine_ensure()" size="mini">确 定</el-button>
            </span>
          </el-dialog>
          <!--平帐页面-->
          <el-dialog
            :visible.sync="pingAccountDialog"
            :close-on-click-modal='false'
            width="25%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul class="open_ticket">
              <li>
                <span>房间号：</span>
                <p
                  style="width: 220px;height: 24px;border:1px solid #DCDFE6;border-radius: 4px;display: inline-block;line-height: 24px;padding-left: 10px;">
                  {{room_mark}}房</p>
              </li>
              <li>
                <span>金额：</span>
                <p
                  style="width: 220px;height: 24px;border:1px solid #DCDFE6;border-radius: 4px;display: inline-block;line-height: 24px;padding-left: 10px;color: red">
                  {{need_pay_data}}元</p>
              </li>
              <li>
                <span style="vertical-align: top">备注：</span>
                <!--<el-input v-model="remark_data" clearable placeholder="请输入内容" style="width: 220px;"-->
                          <!--size="mini"></el-input>-->
                <textarea cols="29" rows="10"  v-model="remark_data" style="resize:none;">介绍一下自己</textarea>
              </li>
              <!--<li>-->
                <!--<span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>平帐类型：</span>-->
                <!--<el-select v-model="close_flag" placeholder="请选择" size="mini" style="width: 220px;">-->
                  <!--<el-option-->
                    <!--v-for="item in flat_data"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</li>-->
            </ul>
            <div slot="footer" class="dialog-footer">
              <el-button @click="pingAccountDialog = false" size="mini">取消</el-button>
              <el-button @click="flat_regulation()" type="primary" size="mini">确定</el-button>
            </div>
          </el-dialog>
          <!--付钱页面-->
          <el-dialog
            title="付钱"
            :visible.sync="fuAccountDialog"
            :close-on-click-modal='false'
            width="34%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul class="open_ticket" style="float: left ;">
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支类型：</span>
                <!--<el-radio v-model="collect_pay" label="in" >收</el-radio>-->
                <!--<el-radio v-model="collect_pay" label="out" >支</el-radio>-->

                <el-radio-group v-model="collect_pay" @change="in_out__type">
                  <el-radio :label="'in'">收</el-radio>
                  <el-radio :label="'out'">支</el-radio>
                  <!--<el-radio :label="'in/out'">收/支</el-radio>-->
                </el-radio-group>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>支付方式：</span>
                <el-select v-model="pay_mode" clearable placeholder="请选择付款方式" size="mini" @change="payment_method"
                           style="width: 220px;">
                  <el-option
                    v-for="item in pay_data"
                    :key="item.value"
                    :label="item.model_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li v-show="scan_code_show">
                <span>扫码方式：</span>
                <el-radio v-model="scan_code" label="0">扫码枪扫描</el-radio>
                <el-radio v-model="scan_code" label="1">客户扫码</el-radio>
              </li>
              <!--业务种类就是收付款原因-->
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>业务种类：</span>
                <el-select v-model="pay_reason" clearable placeholder="请选择业务种类" size="mini" style="width: 220px;"
                           @change="acquire_kind">
                  <el-option
                    v-for="item in pay_income_list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id +','+ item.in_or_out">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>入账代码：</span>
                <el-select v-model="code_income_data" clearable placeholder="请选择入账代码" size="mini" style="width: 220px;"
                           @focus="acquire_code">
                  <el-option
                    v-for="item in code_incoming_list"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li  >
                <span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收银点：</span>
                <el-select v-model="cashier_id"  clearable      placeholder="请选择业务种类" size="mini" style="width: 220px;">
                  <el-option
                    v-for="item in register_list"
                    :key="item.id"
                    :label="item.desc"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支金额：</span>
                <el-input v-model="pay_amount_money" clearable placeholder="请输入支付金额" style="width: 220px;" size="mini"
                          onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"></el-input>
              </li>

              <li>
                <span style="vertical-align: top">摘要：</span>
                <textarea cols="30" rows="8" v-model="abstract"
                          style="width: 220px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                          size="mini"></textarea>
              </li>
            </ul>
            <div class="open_ticket_type" style="display: inline-block;margin-left: 20px">

              <ul>
                <h3 style="margin-bottom: 30px">账务信息</h3>
                <li>
                  <span>入账来源：</span>
                  <span>{{source}}</span>
                </li>
                <li>
                  <span>房间号：</span>
                  <span>{{room_mark}}</span>
                </li>
                <li>
                  <span>账户id：</span>
                  <span>{{settle_accounts}}</span>
                </li>
                <li>
                  <span style="vertical-align: top">应付总金额：</span>
                  <span style="color: red">￥{{cope_with_money}}</span>
                </li>
              </ul>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="fuAccountDialog = false" size="mini">取消</el-button>
              <el-button v-if="scan_code_show " @click="article_number()" type="primary" size="mini">结算</el-button>
              <el-button v-else @click="pay_them_money()" type="primary" size="mini">结算</el-button>
            </div>
          </el-dialog>
          <!--弹出微信二维码-->
          <el-dialog
            title="请扫描二维码"
            :close-on-click-modal='false'
            :visible.sync="dialog_img"
            width="40%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul v-if="img_wz">
              <li style="width: 100%">
                <img :src="img_src" alt="" style="margin-left: 24%">
              </li>
            </ul>
            <ul v-else>
              <li>
                <!--<canvas id="canvas"></canvas>-->
                <div id="qrcode" ref="qrcode" style="margin-left: 25%"></div>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <!--<el-button @click="dialog_alipay = false">取 消</el-button>-->
              <!--<el-button type="primary" @click="payment_ensure ">确 定</el-button>-->
            </span>
          </el-dialog>
          <!--弹出支付宝或者微信的扫码枪页面-->
          <el-dialog
            title="结账"
            :visible.sync="dialog_alipay"
            :close-on-click-modal='false'
            width="40%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul>
              <li>
                <span>结账金额：</span>
                <span>￥{{pay_amount_money}}</span>
              </li>
              <li style="margin-top: 20px">
                <span>请使用扫码枪扫描二维码：</span>
                <!--<input type="text" id="inputId" v-model="pay_amount_money_code" v-focus     placeholder="请扫码" style="width: 320px;border-radius: 4px">-->
                <el-input v-model="pay_amount_money_code" size="small" clearable id="inputId" placeholder="请扫码"
                          style="width: 320px;"></el-input>
              </li>
            </ul>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_alipay = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="payment_ensure " size="mini">确 定</el-button>
            </span>
          </el-dialog>
          <!--支付成功后显示的页面-->
          <el-dialog
            :visible.sync="dialog_succeed"
            :close-on-click-modal='false'
            :show-close='false'
            width="40%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul>
              <li style="text-align: center" v-if="ihatetheqrcode">
                <img src="@/assets/images/pursesteward/accounting/triumph.png" alt="" style="width: 46px;height: 46px;">
                <span
                  style="display: inline-block;height: 40px;line-height: 40px;vertical-align: top;margin-left: 10px;font-size: 20px">支付成功！</span>
              </li>
              <li style="text-align: center" v-else>
                <img src="@/assets/images/pursesteward/accounting/fault.png" alt="" style="width: 46px;height: 46px;">
                <span
                  style="display: inline-block;height: 40px;line-height: 40px;vertical-align: top;margin-left: 10px;font-size: 20px">支付失败！请返回重试</span>
              </li>
            </ul>

            <span slot="footer" class="dialog-footer">
              <!--<el-button @click="dialog_succeed = false">取 消</el-button>-->
              <el-button type="primary" @click=" succeed_failed" size="mini">确 定</el-button>
            </span>
          </el-dialog>


          <!--分页-->
          <el-pagination style="float: right;margin-right: 2%"
                         layout="prev, pager, next,jumper"
                         :page-size="pagesize_advocate"
                         @current-change="handle_advocate"
                         :total="total_advocate">
          </el-pagination>

        </div>
        <!--消费清单 ,收支记录-->
        <div class="shopping">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" size="mini">
            <!--消费清单-->
            <el-tab-pane label="消费清单" name="first">
              <!--头部的搜索-->
              <ul class="shopping_title">
                <li>
                  <span>入账代码 : </span>
                  <el-select v-model="harvest_type" clearable placeholder="请选择" @change="filtrate" style="width: 140px"
                             size=mini  @focus="get_by_hotel">
                    <el-option
                      v-for="item in code_incoming_list"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <div class="block">
                    <span class="demonstration">营业日期起 :</span>
                    <el-date-picker
                      clearable
                      size=mini
                      v-model="business_time"
                      value-format="yyyy-MM-dd"
                      type="date"
                      style="width: 136px;"
                      @change="filtrate"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <div class="block">
                    <span class="demonstration">营业日期止 :</span>
                    <el-date-picker
                      clearable
                      size=mini
                      @change="filtrate"
                      v-model="stop_time"
                      style="width: 136px;"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <el-radio-group v-model="finished" @change="filtrate">
                    <el-radio :label="'all'">全部</el-radio>
                    <el-radio :label="'in'">收</el-radio>
                    <el-radio :label="'out'">支</el-radio>
                    <el-radio :label="'closed'">已结</el-radio>
                    <el-radio :label="'hang_up'">已挂</el-radio>
                    <el-radio :label="'other'">其它</el-radio>
                  </el-radio-group>
                </li>
                <li v-if="routing_length">
                  <button @click="payment_click();">付款</button>
                </li>
                <li style="float: right;margin-top: 4px;margin-right: 20px">
                  <span
                    style="display: inline-block;width: 16px;height: 16px; background: #999999;cursor: pointer "></span>
                  <span style="vertical-align: top">已结清</span>
                </li>
              </ul>
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  ref="multipleTable"
                  :data="recorded_list"
                  tooltip-effect="dark"
                  :row-class-name="tableconsume"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  height="400"
                  size="mini"
                  :row-key="getRowKeys"
                  @selection-change="routingChange"
                  style="width: 100%;">
                  <el-table-column
                    type="selection"
                    :selectable="selectable"
                    :reserve-selection="true"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="id"
                    label="账户">
                  </el-table-column>
                  <el-table-column
                    prop="account_id.id"
                    label="主帐ID">
                  </el-table-column>
                  <el-table-column
                    prop="biz_date"
                    label="营业日期">
                  </el-table-column>

                  <el-table-column
                    prop="in_or_out"
                    label="收/支"
                    column-key="name">
                    <!--:filters="break_data"-->
                    <!--:filter-method="filterHandler"-->
                    <template slot-scope="scope">
                      <span v-if="scope.row.in_or_out === 'in'">收</span>
                      <span v-else>支</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="code_income_type_id.name"
                    label="入账代码">
                  </el-table-column>

                  <!--<el-table-column-->
                  <!--prop="desc"-->
                  <!--label="收支详情">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="pay_status"
                    label="支付状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pay_status === 1 && ! scope.row.transfer_out_detail">结清</span>
                      <!--/挂账-->
                      <span v-else-if="scope.row.pay_status === 1&& scope.row.transfer_out_detail">转账/AR支付</span>
                      <span v-else-if="scope.row.pay_status === 2 ">挂AR</span>
                      <span v-else>未付清</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="charge_amount"
                    label="消费金额">
                  </el-table-column>
                  <el-table-column
                  prop="pay_amount"
                  label="实际支付">
                  </el-table-column>
                  <el-table-column
                    prop="can_arrange"
                    label="待支付金额">
                    <template  slot-scope="scope">
                       <span style="color: red">{{scope.row.can_arrange}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                      <!--v-if="scope.row.pay_status !== 1"-->
                      <div>
                        <!--<span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px"  v-if="scope.row.code_income_type_id.name === '分帐转出'" ></span>-->
                        <!--<span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px" v-else-if="scope.row.account_id.need_pay === 0"  @click="point_money(scope.row,scope.row.id,scope.$index, recorded_list);pointAccountDialog=true"></span>-->
                        <span style="color: #4488E9;cursor:pointer" v-if="scope.row.pay_status===0  "
                              @click="lord(scope.row,scope.row.id,scope.$index, recorded_list);fenAccountDialog=true">分账</span>
                        <span style="color: #4488E9;cursor:default; ">
                          <span style="color: #4488E9;cursor:default"
                                @click="point_money(scope.row,scope.row.id,scope.$index, recorded_list);pointAccountDialog=true"
                                v-if="scope.row.pay_status === 0 && ! scope.row.transfer_out_detail ">付款</span>
                        </span>
                        <span style="color: #4488E9;cursor:default"
                              @click="bank_transfer(scope.row,scope.row.id,scope.$index, recorded_list);"
                              v-if="scope.row.pay_status === 0 && !scope.row.transfer_out_detail ">转账</span>

                      </div>
                      <div>
                        <!--v-if="scope.row.pay_status === 0 || ! scope.row.related_transfer_detail  "-->
                        <span style="color: #4488E9;cursor:pointer"
                              @click="consumption_ar(scope.row,scope.row.id,scope.$index, recorded_list)"
                              v-if="scope.row.pay_status === 0 && ! scope.row.transfer_out_detail">挂AR</span>
                        <!--v-if="scope.row.locked!==1"-->
                        <span style="color: #4488E9;cursor:pointer"
                              @click="account_regulation(scope.row,scope.row.id,scope.$index, recorded_list);tiaoAccountDialog=true"
                              v-if="scope.row.pay_status === 0 && ! scope.row.transfer_out_detail">调账</span>
                        <span style="color: #4488E9;cursor:pointer"
                              v-if="scope.row.pay_status === 1 &&  !scope.row.transfer_out_detail"
                              @click="invoice_recorded(scope.row,scope.row.id,scope.$index, recorded_list)">开票</span>
                        <span v-if="scope.row.pay_status === 2 "style="color: #66DD00;cursor:not-allowed">已挂AR</span>
                        <span v-if="scope.row.pay_status === 1 && scope.row.transfer_out_detail "style="color: #66DD00;cursor:not-allowed">已转帐</span>
                              <!--@click="bank_transfer(scope.row,scope.row.id,scope.$index, recorded_list);change_account=true"-->
                        <!--<span v-if="scope.row.pay_status === 1 && !scope.row.transfer_out_detail "style="color: #66DD00;cursor:not-allowed">结清</span>-->
                      </div>
                    </template>
                  </el-table-column>

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute_expense"
                               :total="total_two">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!--消费清单的操作-->
            <!--单个付钱页面-->
            <el-dialog
              :visible.sync="pointAccountDialog"
              :close-on-click-modal='false'
              width="34%"
              style=" overflow: hidden"
              :before-close="handleClose">
              <div slot="title" class="dialog_style_header-title">
                <span class="dialog_style_title-name"> {{ title }}</span>
              </div>
              <ul class="open_ticket" style="float: left ;">
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支类型：</span>
                  <!--<el-radio v-model="collect_pay" label="in" >收</el-radio>-->
                  <!--<el-radio v-model="collect_pay" label="out" >支</el-radio>-->

                  <el-radio-group v-model="collect_pay" @change="in_out__type" disabled>
                    <el-radio :label="'in'">收</el-radio>
                    <el-radio :label="'out'">支</el-radio>
                    <!--<el-radio :label="'in/out'">收/支</el-radio>-->
                  </el-radio-group>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>支付方式：</span>
                  <el-select v-model="pay_mode" clearable placeholder="请选择付款方式" size="mini" @change="payment_method"
                             style="width: 220px;">
                    <el-option
                      v-for="item in pay_data"
                      :key="item.value"
                      :label="item.model_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li v-show="scan_code_show">
                  <span>扫码方式：</span>
                  <el-radio v-model="scan_code" label="0">扫码枪扫描</el-radio>
                  <el-radio v-model="scan_code" label="1">客户扫码</el-radio>
                </li>
                <!--业务种类就是收付款原因-->
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>业务种类：</span>
                  <el-select v-model="pay_reason" clearable placeholder="请选择业务种类" size="mini" style="width: 220px;"
                             @change="acquire_kind" disabled>
                    <el-option
                      v-for="item in pay_income_list"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id +','+ item.in_or_out">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>入账代码：</span>
                  <el-select v-model="code_income_data" clearable placeholder="请选择入账代码" size="mini"
                             style="width: 220px;" @focus="acquire_code" disabled>
                    <el-option
                      v-for="item in code_incoming_list"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li  >
                  <span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收银点：</span>
                  <el-select v-model="cashier_id"  clearable      placeholder="请选择业务种类" size="mini" style="width: 220px;">
                    <el-option
                      v-for="item in register_list"
                      :key="item.id"
                      :label="item.desc"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支金额：</span>
                  <el-input v-model="pay_amount_money" clearable placeholder="请输入支付金额" style="width: 220px;" size="mini"
                            onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" disabled></el-input>
                </li>
                <li>
                  <span style="vertical-align: top">摘要：</span>
                  <textarea cols="30" rows="8" v-model="abstract"
                            style="width: 220px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                            size="mini"></textarea>
                </li>
              </ul>
              <div class="open_ticket_type" style="display: inline-block;margin-left: 20px">

                <ul>
                  <h3 style="margin-bottom: 30px">账务信息</h3>
                  <li>
                    <span>入账来源：</span>
                    <span>{{source}}</span>
                  </li>
                  <li>
                    <span>房间号：</span>
                    <span>{{room_mark}}</span>
                  </li>
                  <li>
                    <span>账户id：</span>
                    <span>{{settle_accounts}}</span>
                  </li>
                  <li>
                    <span style="vertical-align: top">应付总金额：</span>
                    <span style="color: red">￥{{cope_with_money}}</span>
                  </li>
                </ul>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="pointAccountDialog = false" size="mini">取消</el-button>
                <el-button v-if="scan_code_show " @click="article_number()" type="primary" size="mini">结算</el-button>
                <el-button v-else @click="point_pay_money()" type="primary" size="mini">结算</el-button>
              </div>
            </el-dialog>
            <!--多个消费清单的付钱页面-->
            <el-dialog
              :visible.sync="pointAccountDialog_all"
              :close-on-click-modal='false'
              width="34%"
              :before-close="handleClose">
              <div slot="title" class="dialog_style_header-title">
                <span class="dialog_style_title-name"> {{ title }}</span>
              </div>
              <ul class="open_ticket" style="float: left ;">
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支类型：</span>
                  <!--<el-radio v-model="collect_pay" label="in" >收</el-radio>-->
                  <!--<el-radio v-model="collect_pay" label="out" >支</el-radio>-->

                  <el-radio-group v-model="collect_pay" @change="in_out__type" disabled>
                    <el-radio :label="'in'">收</el-radio>
                    <el-radio :label="'out'">支</el-radio>
                    <!--<el-radio :label="'in/out'">收/支</el-radio>-->
                  </el-radio-group>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>支付方式：</span>
                  <el-select v-model="pay_mode" clearable placeholder="请选择付款方式" size="mini" @change="payment_method"
                             style="width: 220px;">
                    <el-option
                      v-for="item in pay_data"
                      :key="item.value"
                      :label="item.model_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li v-show="scan_code_show">
                  <span>扫码方式：</span>
                  <el-radio v-model="scan_code" label="0">扫码枪扫描</el-radio>
                  <el-radio v-model="scan_code" label="1">客户扫码</el-radio>
                </li>
                <!--业务种类就是收付款原因-->
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>业务种类：</span>
                  <el-select v-model="pay_reason" clearable placeholder="请选择业务种类" size="mini" style="width: 220px;"
                             @change="acquire_kind">
                    <el-option
                      v-for="item in pay_income_list"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id +','+ item.in_or_out">
                    </el-option>
                  </el-select>
                </li>
                <!--<li  >-->
                <!--<span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>业务种类：</span>-->
                <!--<el-select v-model="pay_reason_one"  clearable      placeholder="请选择业务种类" size="mini" style="width: 220px;">-->
                <!--<el-option-->
                <!--v-for="item in pay_income_data"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</li>-->
                <!--<li v-if="collect_pay === 'in/out'" >-->
                <!--<span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>业务种类：</span>-->
                <!--<el-select v-model="pay_reason_one"  clearable      placeholder="请选择业务种类" size="mini" style="width: 220px;">-->
                <!--<el-option-->
                <!--v-for="item in pay_income_data"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</li>-->
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>入账代码：</span>
                  <el-select v-model="code_income_data" clearable placeholder="请选择入账代码" size="mini"
                             style="width: 220px;" @focus="acquire_code">
                    <el-option
                      v-for="item in code_incoming_list"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <!--<li  v-if="collect_pay === 'out'">-->
                <!--<span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>入账代码：</span>-->
                <!--<el-select v-model="code_income_data"  clearable      placeholder="请选择入账代码" size="mini" style="width: 220px;">-->
                <!--<el-option-->
                <!--v-for="item in code_list"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</li>-->
                <!--<li  v-if="collect_pay === 'in/out'">-->
                <!--<span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>入账代码：</span>-->
                <!--<el-select v-model="code_income_data"  clearable      placeholder="请选择入账代码" size="mini" style="width: 220px;">-->
                <!--<el-option-->
                <!--v-for="item in code_in_out"-->
                <!--:key="item.value"-->
                <!--:label="item.name"-->
                <!--:value="item.id">-->
                <!--</el-option>-->
                <!--</el-select>-->
                <!--</li>-->


                <!--<li v-if="collect_pay === 'in'">-->
                <!--<span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收款金额：</span>-->
                <!--<el-input v-model.number="pay_amount_money" clearable  placeholder="请输入收款金额" style="width: 220px;" size="mini" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" ></el-input>-->
                <!--</li>-->
                <!--<li v-if="collect_pay === 'out'">-->
                <!--<span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>支付金额：</span>-->
                <!--<el-input v-model="pay_amount_money" clearable  placeholder="请输入支付金额" style="width: 220px;" size="mini" onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" ></el-input>-->
                <!--</li>-->
                <li  >
                  <span ><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收银点：</span>
                  <el-select v-model="cashier_id"  clearable      placeholder="请选择业务种类" size="mini" style="width: 220px;">
                    <el-option
                      v-for="item in register_list"
                      :key="item.id"
                      :label="item.desc"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支金额：</span>
                  <el-input v-model="pay_amount_money" clearable placeholder="请输入支付金额" style="width: 220px;" size="mini"
                            onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" disabled></el-input>
                </li>
                <li>
                  <span style="vertical-align: top">摘要：</span>
                  <textarea cols="30" rows="8" v-model="abstract"
                            style="width: 220px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                            size="mini"></textarea>
                </li>
              </ul>
              <div class="open_ticket_type" style="display: inline-block;margin-left: 20px">

                <ul>
                  <h3 style="margin-bottom: 30px">账务信息</h3>
                  <li>
                    <span>入账来源：</span>
                    <span>{{source}}</span>
                  </li>
                  <li>
                    <span>房间号：</span>
                    <span>{{room_mark}}</span>
                  </li>
                  <li>
                    <span>账户id：</span>
                    <span>{{settle_accounts}}</span>
                  </li>
                  <li>
                    <span style="vertical-align: top">应付总金额：</span>
                    <span style="color: red">￥{{cope_with_money}}</span>
                  </li>
                </ul>
              </div>
              <div slot="footer" class="dialog-footer">
                <el-button @click="pointAccountDialog_all = false" size="mini">取消</el-button>
                <el-button v-if="scan_code_show " @click="article_number()" type="primary" size="mini">结算</el-button>
                <el-button v-else  @click="pay_money_all()" type="primary" size="mini">结算</el-button>

              </div>
            </el-dialog>
            <!--分账页面-->
            <el-dialog
              :visible.sync="fenAccountDialog"
              :close-on-click-modal='false'
              width="30%"
              :before-close="handleClose">
              <div slot="title" class="dialog_style_header-title">
                <span class="dialog_style_title-name"> {{ title }}</span>
              </div>
              <ul class="open_ticket">
                <li>
                  <span>可分账金额：</span>
                  <p
                    style="width: 220px;height: 24px;border:1px solid #DCDFE6;border-radius: 4px;display: inline-block;line-height: 24px;padding-left: 10px;color: red">
                    {{need_pay}}元</p>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>分账方式：</span>
                  <el-select v-model="splitAccountParam.split_method_id" style="width: 220px;" size="mini">
                    <el-option v-for="item in splitOptions"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span>描述：</span>
                  <el-input v-model="comment" clearable placeholder="请输入内容" style="width: 220px;" size="mini"></el-input>
                </li>
                <!--<li>-->
                <!--<span>营业日期</span>-->
                <!--<el-date-picker-->
                <!--clearable-->
                <!--v-model="biz_date_day"-->
                <!--type="date"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--@change="begin"-->
                <!--placeholder="选择日期">-->
                <!--</el-date-picker>-->
                <!--</li>-->

                <!--<li>-->
                <!--<span >备注：</span>-->
                <!--<el-input v-model="comment"  clearable  placeholder="请输入内容" style="width: 220px;"></el-input>-->
                <!--</li>-->
                <li v-if="splitAccountParam.split_method_id === 0">
                  <span style="display: inline-block;width: 140px;">请输入拆分后的金额：</span>
                  <el-input placeholder="请输入金额" v-model="splitAccountParam_split_amount" clearable style="width: 220px;"
                            size="mini"></el-input>
                </li>
                <li v-if="splitAccountParam.split_method_id === 1">
                  <span style="display: inline-block;width: 120px;">请输入拆分数量：</span>
                  <el-input placeholder="请输入拆分数量" v-model="splitAccountParam_num" clearable style="width: 220px;"
                            size="mini"></el-input>
                </li>

              </ul>
              <div slot="footer" class="dialog-footer">
                <el-button @click="fenAccountDialog = false" size="mini">取消</el-button>
                <el-button @click="splitAccount()" type="primary" size="mini">确定</el-button>
              </div>
            </el-dialog>
            <!--普通账户转帐页面-->
            <el-dialog
              title="转账"
              :visible.sync="change_account"
              :close-on-click-modal='false'
              width="30%"
              :before-close="handleClose">
              <ul class="open_ticket">
                <li>
                  <span style="display: inline-block;width: 130px;margin-left: 10px">转出账户：ID/房间号</span>
                  <el-input v-model="roll_out"  style="width: 220px;" size="mini" disabled></el-input>
                </li>
                <li>
                  <i style="color: red;font-size: 18px;">*</i>
                  <span style="display: inline-block;width: 130px;">转入账户：ID/房间号</span>
                  <el-select v-model="shift_to" placeholder="请选择转入账户:ID/房间号" size="mini" style="width: 220px;" filterable clearable>
                    <el-option
                      v-for="item in principal_account"
                      :key="item.value"
                      :label="item.label"
                      :value="item.id+'/'+item.room_num">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span style="display: inline-block;width: 130px;margin-left: 10px"> 转账金额：</span>
                  <el-input v-model="roll_money" clearable placeholder="请输入内容" style="width: 220px;"
                            disabled
                            size="mini"></el-input>
                </li>
              </ul>
              <span slot="footer" class="dialog-footer">
              <el-button @click="change_account = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="normal_ensure()" size="mini">确 定</el-button>
            </span>
            </el-dialog>
            <!--AR账户转账页面-->
            <el-dialog
              title="AR转账"
              :visible.sync="turn_account"
              :close-on-click-modal='false'
              width="30%"
              :before-close="handleClose">
              <ul class="open_ticket">
                <li>
                  <span style="display: inline-block;width: 130px;">转出AR账户：</span>
                  <el-select v-model="rotate_account"   size="mini" style="width: 220px;" disabled>
                    <el-option
                      v-for="item in ar_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span style="display: inline-block;width: 130px;"><i style="color: red;font-size: 18px;margin-right: 10px">*</i>转入AR账户：</span>
                  <el-select v-model="join_account" clearable placeholder="请选择AR账户" size="mini" style="width: 220px;">
                    <el-option
                      v-for="item in ar_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span style="display: inline-block;width: 130px;">转帐金额：</span>
                  <el-input v-model="transfer_amount" clearable placeholder="请输入内容" style="width: 220px;" disabled
                            size="mini"></el-input>
                </li>
              </ul>
              <span slot="footer" class="dialog-footer">
              <el-button @click="turn_account = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ar_ensure()" size="mini">确 定</el-button>
            </span>
            </el-dialog>
            <!--调账页面-->
            <el-dialog
              :visible.sync="tiaoAccountDialog"
              :close-on-click-modal='false'
              width="25%"
              :before-close="handleClose">
              <div slot="title" class="dialog_style_header-title">
                <span class="dialog_style_title-name"> {{ title }}</span>
              </div>
              <ul class="open_ticket">
                <li>
                  <span>调账ID：</span>
                  <el-input v-model="separate_id" :disabled="true" placeholder="请输入内容" style="width: 220px;"
                            size="mini"></el-input>
                </li>
                <li>
                <span style="vertical-align: top"><i
                  style="color: red;font-size: 18px;margin-right: 10px">*</i>调账原因：</span>
                  <el-select v-model="reason_id" placeholder="请选择调账原因" size="mini" style="width: 220px;">
                    <el-option
                      v-for="item in adjustment_list"
                      :key="item.value"
                      :label="item.desc"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>金额：</span>
                  <el-input v-model="arranged_amount" clearable placeholder="请输入金额" style="width: 220px;"
                            size="mini"></el-input>
                </li>
                <!--<li>-->
                <!--<span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>调后余额：</span>-->
                <!--<el-input v-model="balance_after_arranged"  clearable  placeholder="请输入内容" style="width: 220px;"></el-input>-->
                <!--</li>-->
                <!--<li>-->
                <!--<span >完成标志：</span>-->
                <!--<el-input v-model="done_flag"  clearable  placeholder="请输入内容" style="width: 220px;"></el-input>-->
                <!--</li>-->
                <!--<li>-->
                <!--<span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>营业日期</span>-->
                <!--<el-date-picker-->
                <!--clearable-->
                <!--v-model="biz_date"-->
                <!--type="date"-->
                <!--value-format="yyyy-MM-dd"-->
                <!--placeholder="选择日期">-->
                <!--</el-date-picker>-->
                <!--</li>-->

              </ul>
              <div slot="footer" class="dialog-footer">
                <el-button @click="tiaoAccountDialog = false" size="mini">取消</el-button>
                <el-button @click="regulation()" type="primary" size="mini">确定</el-button>
              </div>
            </el-dialog>
            <!--收支记录-->
            <el-tab-pane label="收支记录" name="second">
              <!--头部的搜索-->
              <ul class="shopping_title">
                <li>
                  <span>入账代码 : </span>
                  <el-select v-model="harvest_account" placeholder="请选择" clearable style="width: 150px;" size="mini"
                             @change="harvest" @focus="get_by_hotel">
                    <el-option
                      v-for="item in code_incoming_list"
                      :key="item.value"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <div class="block">
                    <span class="demonstration">营业日期起 :</span>
                    <el-date-picker
                      style="width: 150px;"
                      size="mini"
                      @change="harvest"
                      value-format="yyyy-MM-dd"
                      v-model="harvest_time"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <div class="block">
                    <span class="demonstration">营业日期止 :</span>
                    <el-date-picker
                      style="width: 150px;"
                      size="mini"
                      @change="harvest"
                      value-format="yyyy-MM-dd"
                      v-model="harvest_stop_time"
                      type="date"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                </li>
                <li>
                  <el-radio-group v-model="harvest_finished" @change="harvest">
                    <el-radio :label="''">全部</el-radio>
                    <el-radio :label="'in'">收入</el-radio>
                    <el-radio :label="'out'">支出</el-radio>
                  </el-radio-group>
                </li>
              </ul>
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="income_and_expenses"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  size="mini"
                  height="400"
                  style="width: 100%;">
                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="account_id.id"
                    label="主帐ID">
                  </el-table-column>
                  <el-table-column
                    prop="code_income_type_id.in_or_out"
                    label="收/支"
                    column-key="name">
                    <template slot-scope="scope">
                      <span v-if="scope.row.in_or_out === 'in'">收</span>
                      <span v-else>支</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="code_income_type_id.name"
                    label="收支原因">
                    <!--<template slot-scope="scope">-->
                    <!--<el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.address}}</el-tag>-->
                    <!--</template>-->
                  </el-table-column>

                  <!--&lt;!&ndash;收支原因&ndash;&gt;-->
                  <!--<el-table-column type="expand">-->
                  <!--<template slot-scope="props">-->
                  <!--<el-form label-position="left" inline class="demo-table-expand">-->
                  <!--<el-form-item label="收支原因">-->
                  <!--<span>{{ props.row.name }}</span>-->
                  <!--</el-form-item>-->

                  <!--</el-form>-->
                  <!--</template>-->
                  <!--</el-table-column>-->
                  <!--判断主帐有没有结清-->
                  <el-table-column
                    prop="pay_status"
                    label="收支状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pay_status === 1">已付</span>
                      <span v-else>未付</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="charge_amount"
                    label="收支金额">
                  </el-table-column>
                  <el-table-column
                    prop="biz_date"
                    width="120"
                    label="营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="create_time"
                    label="时间">
                  </el-table-column>

                  <el-table-column
                    prop="name"
                    width="120"
                    fixed="right"
                    label="操作">
                    <template slot-scope="scope">
                      <div style=" height:44px;display: inline-block; ">
                        <span style="color: #4488E9;cursor:default;display: inline-block;height: 44px;line-height: 44px"
                              @click="invoice_income(scope.row,scope.row.id,scope.$index, income_and_expenses)"
                              v-if="scope.row.pay_status === 1">开票</span>
                        <!--<span style="color: #4488E9;cursor:default">核实</span>-->
                        <span style="color: #4488E9;cursor:default"
                              @click="hang_AR(scope.row,scope.row.id,scope.$index, income_and_expenses)"
                              v-if="scope.row.pay_status === 0">挂AR</span>
                      </div>
                    </template>
                  </el-table-column>

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute_fen"
                               :total="total_in">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!--收支记录/消费清单的开票页面-->
            <el-dialog
              title="开票"
              :visible.sync="invoice_dialogVisible"
              :close-on-click-modal='false'
              width="30%"
              :before-close="handleClose">
              <ul class="open_ticket">
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票编号：</span>
                  <el-input v-model="invoice_number" clearable placeholder="请输入内容" style="width: 220px;"
                            size="mini"></el-input>
                </li>
                <li>

                  <span> <i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票金额：</span>
                  <el-input v-model="invoice_amount" clearable placeholder="请输入内容" style="width: 220px;"
                            onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" size="mini"></el-input>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票抬头：</span>
                  <el-input v-model="invoice_title" clearable placeholder="请输入内容" style="width: 220px;"
                            size="mini"></el-input>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票类型：</span>
                  <el-select v-model="invoice_type" clearable placeholder="请选择" size="mini" style="width: 220px;">
                    <el-option
                      v-for="item in open_ticket_type"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票时间：</span>
                  <el-date-picker
                    clearable
                    v-model="issued_date"
                    type="date"
                    size="mini"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </li>
                <li>
                  <span style="vertical-align: top">备注：</span>
                  <textarea cols="30" rows="8" v-model="invoice_desc"
                            style="width: 220px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                            size="mini"></textarea>
                </li>
              </ul>
              <span slot="footer" class="dialog-footer">
              <el-button @click="invoice_dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="invoice_ticket()" size="mini">确 定</el-button>
            </span>
            </el-dialog>
            <!--收支记录/消费清单的挂AR-->
            <el-dialog
              title="挂AR"
              :visible.sync="AR_dialogVisible"
              :close-on-click-modal='false'
              width="30%"
              :before-close="handleClose">
              <ul class="open_ticket">
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>AR账户：</span>
                  <el-select v-model="ar_account" clearable placeholder="请选择AR账户" size="mini" style="width: 220px;">
                    <el-option
                      v-for="item in ar_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span> 挂AR金额：</span>
                  <el-input v-model="ar_money" clearable placeholder="请输入内容" style="width: 220px;" disabled
                            size="mini"></el-input>
                </li>
              </ul>
              <span slot="footer" class="dialog-footer">
              <el-button @click="AR_dialogVisible = false" size="mini">取 消</el-button>
              <el-button v-if="sign" type="primary" @click="ar_ticket()" size="mini">确 定</el-button>
              <el-button v-else type="primary" @click="ar_ticket_host()" size="mini">确 定</el-button>
            </span>
            </el-dialog>
            <!--分账记录-->
            <el-tab-pane label="分账记录" name="routing">
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="general_list"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  height="400"
                  size="mini"
                  style="width: 100%;">
                  <el-table-column
                    prop="parent.id"
                    label="被分帐户id">
                  </el-table-column>
                  <el-table-column
                    prop="account_type"
                    label="账户种类">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_type === 1">AR账户</span>
                      <span v-else>正常账户</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="sub_account_count"
                    label="子账户数量">
                  </el-table-column>
                  <el-table-column
                    prop="biz_date"
                    label="操作时间">
                  </el-table-column>
                  <el-table-column
                    prop="dept_id.name"
                    label="操作部门">
                  </el-table-column>
                  <el-table-column
                    prop="create_user.real_name"
                    label="操作用户">
                  </el-table-column>
                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute"
                               :total="total_fen">
                </el-pagination>
              </div>

            </el-tab-pane>
            <!--冲调帐-->
            <el-tab-pane label="冲调帐记录" name="brew">
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="brew_list"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  size="mini"
                  height="400"
                  style="width: 100%;">
                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="account_id.id"
                    label="主帐id">
                  </el-table-column>
                  <el-table-column
                    prop="arrange_flag"
                    label="操作类型"
                    column-key="name"
                    :filters="brew_data"
                    :filter-method="filterHandler"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.arrange_flag === 'x'">调账</span>
                      <span v-else>冲账</span>
                    </template>

                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="balance_after_arranged"-->
                  <!--label="余额">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="arranged_amount"
                    width="140"
                    label="冲调金额（可正可负）">
                  </el-table-column>

                  <el-table-column
                    prop="reason"
                    label="冲调原因">
                    <template slot-scope="scope">
                      <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.reason}}
                      </el-tag>
                    </template>
                  </el-table-column>

                  <!--冲调原因-->
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="冲调原因 : ">
                          <span>{{ props.row.reason }}</span>
                        </el-form-item>

                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="gen_user.real_name"
                    label="调账人">
                  </el-table-column>

                  <el-table-column
                    prop="biz_date"
                    width="130"
                    label="营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="gen_time"
                    width="150"
                    label="时间">
                  </el-table-column>

                  <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--width="120"-->
                  <!--fixed="right"-->
                  <!--label="操作">-->
                  <!--<template slot-scope="scope">-->
                  <!--<div style=" height:44px;display: inline-block; ">-->
                  <!--<span style="color: #4488E9;cursor:default;display: inline-block;height: 44px;line-height: 44px" >通过</span>-->
                  <!--<span style="color: #4488E9;cursor:default">不通过</span>-->
                  <!--</div>-->
                  <!--</template>-->
                  <!--</el-table-column>-->

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute"
                               :total="total_chong">
                </el-pagination>
              </div>

            </el-tab-pane>
            <!--转账-->
            <el-tab-pane label="转帐记录" name="transfer_accounts ">
              <!--头部的搜索-->
              <!--<ul class="shopping_title">-->
              <!--<li >-->
              <!--<span>入账代码 : </span>-->
              <!--<el-select v-model="sub_account" placeholder="请选择"  style="width: 150px;" size="mini">-->
              <!--<el-option-->
              <!--v-for="item in enter_list"-->
              <!--:key="item.value"-->
              <!--:label="item.name"-->
              <!--:value="item.id">-->
              <!--</el-option>-->
              <!--</el-select>-->
              <!--</li>-->
              <!--<li>-->
              <!--<div class="block">-->
              <!--<span class="demonstration">营业日期起 :</span>-->
              <!--<el-date-picker-->
              <!--style="width: 150px;"-->
              <!--size="mini"-->
              <!--v-model="business_time"-->
              <!--type="date"-->
              <!--placeholder="选择日期">-->
              <!--</el-date-picker>-->
              <!--</div>-->
              <!--</li>-->
              <!--<li>-->
              <!--<div class="block">-->
              <!--<span class="demonstration">营业日期止 :</span>-->
              <!--<el-date-picker-->
              <!--style="width: 150px;"-->
              <!--size="mini"-->
              <!--v-model="stop_time"-->
              <!--type="date"-->
              <!--placeholder="选择日期">-->
              <!--</el-date-picker>-->
              <!--</div>-->
              <!--</li>-->
              <!--<li>-->
              <!--<el-radio-group v-model="finished"  @change="filtrate">-->
              <!--<el-radio :label="-1">全部</el-radio>-->
              <!--<el-radio :label="1">已结</el-radio>-->
              <!--<el-radio :label="3">已转未结</el-radio>-->
              <!--<el-radio :label="4">已冲账</el-radio>-->
              <!--</el-radio-group>-->
              <!--</li>-->
              <!--&lt;!&ndash;<li>&ndash;&gt;-->
              <!--&lt;!&ndash;<span style="margin-right: 10px">已结</span>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-checkbox v-model="finished"></el-checkbox>&ndash;&gt;-->
              <!--&lt;!&ndash;</li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li>&ndash;&gt;-->
              <!--&lt;!&ndash;<span style="margin-right: 10px">已转未结 : </span>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-checkbox ></el-checkbox>&ndash;&gt;-->
              <!--&lt;!&ndash;</li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li>&ndash;&gt;-->
              <!--&lt;!&ndash;<span style="margin-right: 10px">已冲账 : </span>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-checkbox v-model="balance"></el-checkbox>&ndash;&gt;-->
              <!--&lt;!&ndash;</li>&ndash;&gt;-->
              <!--&lt;!&ndash;<li><button>搜索</button></li>&ndash;&gt;-->
              <!--</ul>-->
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="transfer_list"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  size="mini"
                  height="400"
                  style="width: 100%;">
                  <el-table-column
                    prop="from_id.room_num"
                    fixed="left"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="from_id.id"
                    label="转出账户">
                  </el-table-column>
                  <el-table-column
                    prop="to_id.id"
                    label="转入账户">
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="do_flag"-->
                  <!--label="转账结果">-->
                  <!--<template slot-scope="scope">-->
                  <!--<span v-if="scope.row.do_flag === 0">结账</span>-->
                  <!--<span v-else-if="scope.row.do_flag === 1">转账</span>-->
                  <!--<span v-else-if="scope.row.do_flag === 2">冲账</span>-->
                  <!--<span v-else>其它</span>-->
                  <!--</template>-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="amount"
                    label="转账金额">
                  </el-table-column>
                  <el-table-column
                    prop="transfer_type"
                    width="130"
                    label="转账类型"
                    column-key="name"
                    :filters="[
                          {
                            value: 0,
                            text: '普通'
                          },
                          {
                            value: 1,
                            text: '分账转账'
                          },
                        ]"
                    :filter-method="filterHandler">
                    <template slot-scope="scope">
                      <span v-if="scope.row.transfer_type=== 0">普通</span>
                      <span v-else>分账转账</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    width="150"
                    prop="submit_biz_date"
                    label="提交转账的营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="submit_user.real_name"
                    label="提交者">
                  </el-table-column>
                  <el-table-column
                    prop="submit_time"
                    width="150"
                    label="转账提交时间">
                  </el-table-column>
                  <el-table-column
                    prop="cashier.desc"
                    width="150"
                    label="提交转账的收银点">
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="cancel_biz_date"-->
                  <!--width="140"-->
                  <!--label="撤销转账的营业日期">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                  <!--prop="cancel_reason_id"-->
                  <!--width="150"-->
                  <!--label="撤销转账的原因">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                  <!--prop="cancel_time"-->
                  <!--width="150"-->
                  <!--label="撤销转账的操作时间">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                  <!--prop="cancel_user"-->
                  <!--label="撤销者">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                  <!--fixed="right"-->
                  <!--prop="cancel_cashier"-->
                  <!--width="150"-->
                  <!--label="撤销转账的收银点">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->

                  <!--prop="cancel_cashier"-->
                  <!--widrh="170"-->
                  <!--label="备注">-->
                  <!--</el-table-column>-->

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute"
                               :total="total_zhuan">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!--并账-->
            <el-tab-pane label="并账记录" name="booked">
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="and_curtain_list"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  height="400"
                  size="mini"
                  style="width: 100%;">
                  <el-table-column
                    prop="main_combine_account_id.id"
                    label="主帐id">
                  </el-table-column>

                  <el-table-column
                    prop="account_type"
                    label="账户状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_type === 1">AR账户</span>
                      <span v-else>正常账户</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="before_combine_account_count"
                    label="子账户数量">
                  </el-table-column>

                  <el-table-column
                    prop="modify_time"
                    label="操作时间">
                  </el-table-column>
                  <el-table-column
                    prop="dept_id.name"
                    label="操作部门">
                    <!--<template slot-scope="scope">-->
                      <!--<span v-if="scope.row.dept_id===null">管理层</span>-->
                      <!--<span v-else>{{scope.row.dept_id.name}}</span>-->
                    <!--</template>-->
                  </el-table-column>
                  <el-table-column
                    prop="modify_user.real_name"
                    label="操作用户">
                  </el-table-column>

                  <!--<el-table-column-->
                    <!--prop="name"-->
                    <!--width="120"-->
                    <!--fixed="right"-->
                    <!--label="操作">-->
                    <!--<template slot-scope="scope">-->
                      <!--<div style=" height:44px;display: inline-block; ">-->
                        <!--<span-->
                          <!--style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px">付款</span>-->
                        <!--<span style="color: #4488E9;cursor:default">开票</span>-->
                        <!--&lt;!&ndash;<span style="color: #4488E9;cursor:default">挂AR</span>&ndash;&gt;-->
                      <!--</div>-->
                    <!--</template>-->
                  <!--</el-table-column>-->

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute"
                               :total="total_bing">
                </el-pagination>
              </div>

            </el-tab-pane>
            <!--催账-->
            <el-tab-pane label="催账记录" name="payment ">
              <!--催账 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="payment_list"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  size="mini"
                  height="400"
                  style="width: 100%;">
                  <el-table-column
                    prop="account_id"
                    label="主帐">
                  </el-table-column>
                  <!--:filters=""-->
                  <el-table-column
                    prop="send_time"
                    label="催账日期"
                    width="150"
                    column-key="name"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="receive_name"
                    label="催账对象">
                  </el-table-column>
                  <el-table-column
                    prop="balance"
                    label="欠款金额">
                  </el-table-column>
                  <el-table-column
                    prop="code_msg_by_id.name"
                    label="通知方式">
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="msg_to_phone"
                    label="手机号码">
                  </el-table-column>
                  <el-table-column
                    width="130"
                    prop="msg_to_tel"
                    label="电话号码">
                  </el-table-column>
                  <el-table-column
                    prop="msg_to_wx"
                    width="130"
                    label="微信号码">
                  </el-table-column>

                  <el-table-column
                    prop="msg_to_mail"
                    width="130"
                    label="电子邮件">
                  </el-table-column>

                  <el-table-column
                    prop="msg"
                    label="通知信息">
                    <template slot-scope="scope">
                      <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.msg}}
                      </el-tag>
                    </template>
                  </el-table-column>

                  <el-table-column type="expand">

                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="通知信息 : ">
                          <span>{{ props.row.msg }}</span>
                        </el-form-item>

                      </el-form>
                    </template>
                  </el-table-column>


                  <el-table-column
                    prop="send_result"
                    label="发送结果">
                  </el-table-column>

                  <el-table-column
                    prop="send_user.user_name"
                    label="催账人">
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="send_time"-->
                  <!--width="150"-->
                  <!--label="催账时间">-->
                  <!--</el-table-column>-->
                  <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--label="催账次数">-->
                  <!--</el-table-column>-->
                  <el-table-column
                    prop="create_user.user_name"
                    label="创建者">
                  </el-table-column>
                  <el-table-column
                    prop="create_time"
                    width="150"
                    label="创建时间">
                  </el-table-column>
                  <el-table-column
                    prop="modify_user.user_name"
                    label="修改人">
                  </el-table-column>
                  <el-table-column
                    prop="modify_time"
                    width="150"
                    label="修改时间">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    width="120"
                    fixed="right"
                    label="备注">
                  </el-table-column>

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute"
                               :total="total_cui">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!--查帐记录-->
            <el-tab-pane label="查账记录" name="third">
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="examine_accounts"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  height="400"
                  size="mini"
                  style="width: 100%;">
                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="account_id.id"
                    label="被检查账户ID">
                  </el-table-column>

                  <el-table-column
                    prop="biz_date"
                    width="120"
                    label="查账时的营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="check_time"
                    width="180"
                    label="查账时间">
                  </el-table-column>
                  <el-table-column
                    prop="check_user.real_name"
                    label="账务检查者">
                  </el-table-column>
                  <el-table-column
                    prop="check_reason_id.name"
                    label="查账原因">
                  </el-table-column>
                  <el-table-column
                    width="300"
                    prop="desc"
                    label="查账说明">
                  </el-table-column>
                  <el-table-column
                    prop="check_result"
                    label="查账操作状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.check_result ===0">未操作</span>
                      <span v-else-if="scope.row.check_result ===1">通过</span>
                      <span v-else>不通过</span>
                    </template>
                  </el-table-column>
                  <!--<el-table-column-->
                  <!--prop="name"-->
                  <!--width="120"-->
                  <!--fixed="right"-->
                  <!--label="操作">-->
                  <!--<template slot-scope="scope">-->
                  <!--<div style=" height:44px;display: inline-block; ">-->
                  <!--<span style="color: #4488E9;cursor:default; display: inline-block;height: 44px;line-height: 44px" >付款</span>-->
                  <!--<span style="color: #4488E9;cursor:default">开票</span>-->
                  <!--<span style="color: #4488E9;cursor:default">挂AR</span>-->
                  <!--</div>-->
                  <!--</template>-->
                  <!--</el-table-column>-->

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute"
                               :total="total_cha">
                </el-pagination>
              </div>
            </el-tab-pane>
            <!--平账-->
            <el-tab-pane label="平帐记录" name="accounts">
              <!--头部的搜索-->
              <ul class="shopping_title">
                <li>
                  <span>账户类型 : </span>
                  <el-select v-model="account_genre " clearable placeholder="请选择" @change="filtrate_balance"
                             style="width: 150px;" size=mini>
                    <el-option
                      v-for="item in account_data"
                      :key="item.value"
                      :label="item.text"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </li>
              </ul>
              <!--账户种类 状态 ... -->
              <div class="status" style="margin-top: 10px">
                <el-table
                  :data="income_list"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  size="mini"
                  height="400"
                  style="width: 100%;">
                  <el-table-column
                    prop="account_id.room_num"
                    label="房间号">
                  </el-table-column>
                  <el-table-column
                    prop="account_id.id"
                    label="主帐id">
                  </el-table-column>

                  <el-table-column
                    prop="account_id.account_type"
                    label="账户类型"
                    width="100"
                    column-key="name">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_id.account_type === 0">普通账户</span>
                      <span v-else>AR账户</span>
                    </template>

                  </el-table-column>
                  <el-table-column
                    prop="biz_date"
                    width="150"
                    label="营业日期">
                  </el-table-column>
                  <el-table-column
                    prop="charge_sum"
                    label="总消费">
                  </el-table-column>
                  <el-table-column
                    prop="charge_sum"
                    label="总付款">
                  </el-table-column>
                  <el-table-column
                    prop="balance"
                    label="余额">
                  </el-table-column>
                  <el-table-column
                    prop="status"
                    width="120"
                    label="平帐完成标志">
                    <template slot-scope="scope">
                      <span v-if="scope.row.status === 0">支付未完成</span>
                      <span v-else-if="scope.row.status === 1">成功</span>
                      <span v-else-if="scope.row.status === 2">撤销</span>
                      <span v-else>异常</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="cashier"
                    label="平帐点">
                  </el-table-column>
                  <el-table-column
                    prop="close_time"
                    width="150"
                    label="平帐时间">
                  </el-table-column>
                  <el-table-column
                    prop="gen_user.real_name"
                    label="平帐人">
                  </el-table-column>
                  <el-table-column
                    prop="remark"
                    width="120"
                    fixed="right"
                    label="备注">
                  </el-table-column>

                </el-table>
                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="pagesize"
                               @current-change="general_minute_flat "
                               :total="total_ping">
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'

  export default {
    name: "accounting",
    data() {
      return {
        currentPage4: 4,
        url: this.api.api_9022_9519,
        title: '',
        activeIndex: '1',
        hotel_list: [],//获取酒店
        branch_list: [],//部门
        register_list: [],//收银点
        defaultProps: {
          children: 'children',
          label: 'desc'
        },
        branch_id: '',//所选择的部门收银点
        hotel_group: '',
        id: '',
        Edite: true, //标志位 判断的是新增还是更新
        api_data: '',//子账户的分页url
        //主账户状态
        account_major_data: [
          {
            value: 0,
            text: '正常进行中'
          },
          {
            value: 1,
            text: '已平帐'
          },
          {
            value: 2,
            text: '已取消'
          },
          {
            value: 3,
            text: '异常'
          },
        ],
        //保存选中的id;
        getRowKeys(row) {
          return row.id;
        },
        branch_data: '',//父组件传递的id
        advocate_id: [], //主账户点击后选中的id
        activeName: 'first',
        //账户类型
        account_data: [
          {
            value: 0,
            text: '普通账户'
          },
          {
            value: 1,
            text: 'AR账户'
          }
        ],
        //操作类型
        handle: [
          {
            value: 0,
            text: '结账'
          },
          {
            value: 1,
            text: '转账'
          },
          {
            value: 2,
            text: '冲账'
          },
          {
            value: 3,
            text: '其它'
          },
        ],
        //冲调帐操作类型
        brew_data: [
          {
            value: "x",
            text: '调账'
          },
          {
            value: "y",
            text: '冲账'
          },
        ],
        //主账户/子账户
        reference_link: [

          {
            value: 0,
            text: '主帐户'
          },
          {
            value: 1,
            text: '子账户'
          }
        ],
        //分账并账
        points_data: [
          {
            value: 1,
            text: '分账'
          },
          {
            value: 0,
            text: '并账'
          },
        ],
        //分账上的收支
        break_data: [
          {
            value: 'in',
            text: '收'
          },
          {
            value: 'out',
            text: '支'
          },
        ],
        //转账类型
        do_flag_data: [
          {
            value: 0,
            text: '普通'
          },
          {
            value: 1,
            text: '分账转账'
          },
        ],
        get_in_out: '',//付钱时选择的收支类型
        /** 主帐的筛选*/
        // net_code: '',//主帐的入账代码的筛选
        business_date: '',//主帐营业日期起
        closing_date: '',//主帐营业日期止
        disabled_equal: false,//是否平帐置灰
        // ar_checked:false,//ar帐
        only_closed: false,//已平帐户
        // temporary:false,//临客帐
        // normal:true,//正常账户
        checkList: ['0'],
        room_number: [],//房间号
        /** 分账的筛选
         * 消费清单/收支记录/结转平帐记录    用过以后清空*/
        sub_account: '',//分账的入账代码的筛选
        business_time: '',//分账的营业日期起
        stop_time: '',//分账的营业日期止
        finished: 'all',//分账的删选
        harvest_type: '',//入账代码

        /**收支记录筛选*/
        harvest_account: '',//入账代码
        harvest_time: '',//营业日期
        harvest_stop_time: '',//营业日期止
        harvest_finished: '',//收入或者支出
        /**平帐记录的筛选*/
        balance: '',
        account_genre: '',
        //分页
        total: 10,
        pagesize: 10,
        //消费清单
        total_two: 10,
        //收支记录
        total_in: 10,
        total_zhuan: 10,
        total_cha: 10,
        total_fen: 10,
        total_bing: 10,
        total_chong: 10,
        total_cui: 10,
        total_ping: 10,
        //主帐分页
        total_advocate: 10,
        pagesize_advocate: 10,
        cur_page: 1,//主帐上的默认页
        cur_pages: 1,//分账上的默认页
        //消费清单
        activeName2: 'first',
        content: '账户种类',//表头下拉
        search: '',//收支记录里的输入框
        /*
          * 子账户表头对应的数据
          * */
        recorded_list: [],//消费清单记录
        income_and_expenses: [], //收支记录
        examine_accounts: [],//查账记录
        general_list: [],//分账记录
        and_curtain_list: [],//并账记录
        brew_list: [],//冲调帐记录
        payment_list: [],//催账记录
        income_list: [],//平帐记录
        transfer_list: [],//转账记录
        do_flag: "",
        major_list: [],//主帐信息列表
        module_list: [],//获取模块
        dataarr: [],
        qr_w: '',
        /**并账显示的内容*/
        bingAccountDialog: false,
        account_and: [],//选择并账的账户
        /**开票显示的内容*/
        dialogVisible: false,
        invoice_number: '',
        invoice_type: '',
        issued_date: '',
        invoice_amount: '',
        invoice_title: '',
        invoice_desc: '',
        //开票类型
        open_ticket_type: [
          {
            value: 0,
            label: '普票'
          },
          {
            value: 1,
            label: '增值税专用发票'
          },
        ],
        /**查账的内容  dialog_accounts*/
        dialog_accounts: false,//查账的页面
        audit_list: [],
        examine_id: '',//查账id
        examine_type: '',//查账原因
        check_result: '0',//未操作
        /**分账的内容*/
        fenAccountDialog: false,
        need_pay: '',//可分账金额
        need_pay_data: '',
        separate_id: '',//分账时的主帐id
        account_separate_id: '',//调账时的主帐id;
        splitOptions: [
          {
            label: '按金额分',
            value: 0
          },
          {
            label: '按数量分',
            value: 1
          }
        ],
        //分账对象
        splitAccountParam: {
          split_method_id: 0
        },
        comment: '',
        biz_date_day: "",
        splitAccountParam_num: "",
        splitAccountParam_split_amount: "",
        /**调账内容*/
        adjustment_list: [],//获取调账原因
        tiaoAccountDialog: false,
        reason_id: '',//原因
        arranged_amount: "",//金额
        // balance_after_arranged:'',//调后余额
        // done_flag:'',//完成标志
        biz_date: "",//营业日期
        /**平帐的内容*/
        pingAccountDialog: false,
        biz_date_ping: '',//平帐营业日期
        close_flag: '',//平帐类型
        remark_data: "",//备注
        //平帐选择的类型
        flat_data: [
          {
            value: "a",
            label: '冲账'
          },
          {
            value: "t",
            label: '转账'
          },
          {
            value: "c",
            label: '结账'
          },
        ],
        /**付钱的内容 pay_them*/
        dialog_alipay: false,//支付宝支付页面
        fuAccountDialog: false,
        pay_income_list: [],//支付款原因
        pay_income_data: [],//收付款原因
        collect_pay: "in",//收支种类
        pay_amount_money: '',//支付金额
        pay_mode: '',  //付款方式
        scan_code: '0',//扫码方式
        scan_code_show: false,//扫码方式出现
        dialog_succeed: false,//支付成功或者失败显示的页面
        ihatetheqrcode: true,//扫码成功后的提示
        pay_amount_money_code: '',//扫码得到的码
        pay_reason: '', // 业务种类
        pay_reason_one: "", // 业务种类
        abstract: '',//摘要
        pay_data: [],//支出方式
        pay_status_data: [
          {
            value: 0,
            label: '正常'
          },
          {
            value: 1,
            label: '已取消'
          },
          {
            value: 2,
            label: '已退款'
          },
          {
            value: 3,
            label: '异常'
          },
        ],
        acquire_id: '',//业务种类的id
        acquire_in_or_out: '',//业务种类的in_or_out
        /**付钱的详细信息*/
        source: '',//入账来源
        room_mark: '',//房间号
        cashier_id:'',//收银点
        settle_accounts: '',//账户id
        cope_with_money: '',//应付金额
        img_src: '',//微信的二维码
        timer_src: "",//开启循环
        dialog_img: false,//二维码页面
        code_incoming_list: [],//查询收支类型为out的入账代码
        code_list: [],//查询收支类型为in的入账代码
        code_in_out: [],//收支类型的入账代码
        code_income_data: '',
        img_wz: true,//微信和支付宝的二维码
        /**子帐消费清单的付款内容*/
        pointAccountDialog: false,
        difference: '',//应收金额
        main_account: '',//并账的主帐
        merge_arr: [],
        break_fu: false,//判断是不是同一个主帐的消费清单
        /**子帐消费清单*/
        routing_id: [],//选中的消费清单id
        routing_length: false,//判断选中的消费清单的id从而展示付款
        routing_money_id: [],//所选中的账户金额
        gross_amount: '',//所选中的账户总金额
        pointAccountDialog_all: false,//消费清单的显示
        arr: [],
        sub_sum: "",//应收-实际收
        parent_consume: '',//消费清单的备选中的账户的主账户id
        num_room: '',//房间号
        timer_r: '',//定时器
        order_form: '',//订单id
        timer: 0,
        separate_account: '',//消费清单的主帐id；
        ite_obj: {},//代表选择同一主帐下的消费清单的数据
        /**消费清单的开票*/
        invoice_dialogVisible: false,
        /**pi*/
        /**挂AR*/
        AR_dialogVisible: false,
        ar_account: '',
        ar_money: '',
        ar_list: [],//ar账户
        consumption_ar_id: '',//选中消费清单的id
        sign: false,//判断是否是主帐啊hi是消费明细
        /**普通账户转账*/
        change_account:false,
        roll_out:'',//转出
        shift_to:'',//转入
        roll_money:'',//转账金额
        principal_account:[],//正常的转账
        /**AR账户的转账*/
        turn_account:false,
        rotate_account:'',//转出账户
        join_account:'',//转入
        transfer_amount:'',//转账金额

      }
    },
    components: {QRCode},
    created: function () {
      let that = this;
      that.hotel();
      that.module_list_methods();//获取模块
      that.major_account();
      that.cash_register();//获取收银点
      that.room_list();//获取房间号
      that.income_expend();//获取收支方式


    },
    directives: {
      focus: {
        inserted: function (el) {
          console.log(el);
          el.querySelector('input').focus();
        }
      }
    },
    watch: {
      advocate_id(newVal) {
        console.log(newVal);
        let that = this;
        that.advocate_id = newVal;
        console.log(that.advocate_id);
        that.enter_code();////获取消费清单
        that.api_data = that.url + '/v1/finance/charge_detail/get_by_account_ids'
        //获取查账记录
        that.audit_accounts();
        //获取分账记录
        that.general_ledger();
        //  获取并账记录
        that.and_curtain();
        //  获取冲调帐记录
        that.brew_account();//冲调帐
        //  获取催账记录
        that.urge_payment();//催账记录
        //  获取平帐记录
        that.flat_curtain();//平帐记录
        //获取转账记录
        that.transfer_voucher();
      }
    },
    methods: {
      /**
       * @selectable 设置不可点击的状态
       * @param row.pay_status === 0 是未支付的状态，这样的状态是可以选择的。
       * row.code_income_type_id.in_or_out === 'in' 是支出的状态  这样的状态也是可以选择的  两种情况同时保证才可以被选择
       */
      selectable(row, index) {
        // console.log(row);
        if (row.pay_status === 1 || row.transfer_out_detail) {
          // return false;
        } else if (row.code_income_type_id.name === '分帐转出') {
          // return false;
        }
        else {
          return true;
        }
      },
      /***
       * 主帐上的设置不可选择
       *
       * */
      handleDisable(row, index) {
        // console.log(row);
        // row.locked ===1   代表结账的
        if (row.combined_flag === 1) {
          return false;
        } else {
          return true;
        }
      },
      //收银点事件
      handleNodeClick(data) {
        let that = this;
        console.log(data.id);
        that.branch_id = data.id;
        that.major_account()
        // that.hintInfo("warning", "此收银点暂未开放")

      },
      /**点击收银点all_cashiers 得到所有收银点下的账务*/
      all_cashiers(){
        let that =this;
        that.branch_id = undefined;
        that.major_account()
      },
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        that.pay_amount_money = '';//支付金额
        that.pay_status_id = ''; //支付状态
        that.pay_reason = '';// 付款原因
        that.collect_pay = "in";//收支种类
        that.pay_mode = "";  //付款方式
        that.scan_code = '0';//扫码方式
        that.pay_reason_one = "";
        that.code_income_data = '';
        that.scan_code_show = false;//扫码方式出现
        // that.biz_date_fu=''; // 营业日期
        that.abstract = '';
        that.invoice_number = "";
        that.invoice_type = '';
        that.issued_date = '';
        that.invoice_amount = '';
        that.invoice_title = '';
        that.invoice_desc = '';
        // that.arr=[];
      },
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      //封装获取酒店的信息
      hotel() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/dept/get_tree",
          "method": "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              that.hotel_list = res.data.data;
              that.hotel_group = that.hotel_list[0].name;
              that.id = that.hotel_list[0].id;
              // that.examine();//获取部门

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
      /*** 封装获取收银点* */
      cash_register() {
        let that = this;
        console.log(123);
        that.$axios({
          url: that.url + "/v1/finance/cash_register/info_list",
          method: "post",
          data:{
            page_size:999
          }
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
      //收银点
      examine() {
        console.log(this.id);
        this.$axios({
          url: this.url + "/v1/common/dept/info_list",
          method: "post",
          data: {
            hotel_id: this.id,
          },

        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              //循环取出attr=1 =有账的部门
              for (let item of res.data.data.list) {
                // console.log(item.attr);
                if (item.attr === 1) {
                  this.branch_list.push(item);
                  // this.branch_id=this.branch_list[0].id;
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
      //封装获取房间号
      room_list() {
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
              that.room_number = res.data.data.results;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**获取收支方式*/
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
              that.pay_data = res.data.data.list
            }
            else {
             console.log(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //账户状态
      toggleRowSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      //选中某一项的主帐展示分账
      handleSelectionChange(val) {
        this.multipleSelection = val;
        let advocate_arr = [], account_and = [];
        let that = this;
        console.info(val);
        that.merge_arr = val;
        console.info(that.merge_arr);
        /* let merge_arr = [];
          merge_arr = this.multipleSelection;
          console.log(merge_arr);
          that.merge_arr= merge_arr;*/
        for (let item  of val) {
          if (item.id) {
            advocate_arr.push(item.id);
            account_and.push(item);
          }
        }
        ;
        console.log(advocate_arr);
        that.advocate_id = advocate_arr;
        that.account_and = account_and;
        if (that.advocate_id.length > 0) {

        } else {
          that.recorded_list = [];//消费清单记录
          that.income_and_expenses = []; //收支记录
          that.examine_accounts = [];//查账记录
          that.general_list = [];//分账记录
          that.and_curtain_list = [];//并账记录
          that.brew_list = [];//冲调帐记录
          that.payment_list = [];//催账记录
          that.income_list = [];//平帐记录
          that.transfer_list = [];//转账记录
        }

      },
      //选中某一项消费清单
      routingChange(val) {
        console.log(val);
        let that = this;
        let routing_arr = [];
        let routing_money = [];
        let num_arr = [];
        for (let item  in val) {
          if (val[item].id) {
            routing_arr.push(val[item].id);
            routing_money.push(val[item].charge_amount);
            num_arr.push(val[item].pay_amount);
            // console.log(val[item].account_id.id);
          }

        }
        ;
        for (let i = 0; i < val.length.length; i++) {
          console.log(val[i]);

        }

        that.routing_id = new Set(routing_arr);
        that.routing_money_id = new Set(routing_money);
        if (val.length > 1 && val[0].charge_amount > 0) {
          that.routing_length = true;

        } else {
          that.routing_length = false;
        }
        //选中的所有金额
        let sum = 0;
        for (let i = 0; i < routing_money.length; i++) {

          sum += routing_money[i];//通过for循环，去除数组中的元素，累加到sum中
        }
        console.log(sum);
        //应支付总金额)
        that.gross_amount = parseFloat(sum).toFixed(2);
        /** 选中的所有实际收支
         * 这一块当时是因为牵扯到实际收到的金额，现在改为，直接全款支付了所以这一块没有用了
         *
         *
         * */
        let num_money = 0;
        let arr = [];
        let arr_break;
        for (let i = 0; i < num_arr.length; i++) {
          num_money += num_arr[i];//通过for循环，去除数组中的元素，累加到sum中
        }
        // console.log(num_money);
        that.sub_sum = (sum - num_money).toFixed(2);
        /**到这里上面的结束*/

        // console.log(that.sub_sum);
        for (let i of val) {
          if (i.account_id) {
            that.parent_consume = i.account_id.id;
            that.num_room = i.account_id.market_code
            console.log(that.parent_consume);
            arr.push(i);
            arr_break = arr[0].account_id.id;
            console.log(arr[0]);
            // console.log(arr_break);
          } else {
            that.parent_consume = '';
            that.num_room = '';
          }
        }
        /**判断数组是否都是相同的的，如果不同，break_fu为true*/
        for (let ite of arr) {
          if (ite.account_id.id !== arr_break) {
            that.break_fu = true;
            break;
          } else {
            console.log(ite);
            that.ite_obj = ite;
            that.break_fu = false;
          }
        }

      },
      //消费清单的table
      handleClick(tab, event) {
        console.log(tab, event);
        let that = this;
        that.tab_index = tab.index;
        if (tab.index === "0") {
          //获取消费清单
          that.api_data = that.url + '/v1/finance/charge_detail/get_by_account_ids'
        } else if (tab.index === "1") {
          //获取收支记录
          that.income_expenses();
          that.api_data = that.url + '/v1/finance/charge_detail/get_by_account_ids2';

        }  else if (tab.index === "2") {

          //获取分账记录
          that.api_data = that.url + '/v1/finance/split_charge_operation/info_list'
        } else if (tab.index === "3") {
          //  获取冲调帐记录
          that.api_data = that.url + '/v1/finance/arrange_account_operation/get_by_account_ids'
        }else if (tab.index === "4") {
          //获取转账记录
          that.api_data = that.url + '/v1/finance/transfer_accounts_detail/get_by_account_ids'
        } else if (tab.index === "5") {
          //  获取并账记录
          that.api_data = that.url + '/v1/finance/combine_account_operation/get_by_account_ids'
        } else if (tab.index === "6") {
          //  获取催账记录

          that.api_data = that.url + '/v1/finance/account_message/get_by_account_ids'
        }else if (tab.index === "7") {
          //获取查账记录
          that.api_data = that.url + '/v1/finance/check_account_operation/get_by_account_ids'
        } else if (tab.index === "8") {
          //  获取平帐记录
          that.api_data = that.url + '/v1/finance/account_close_operation/get_by_account_ids'
        }


      },
      //表头下拉框
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        console.log(value, row, column);
        const property = column['property'];
        return row[property] === value;
      },

      /**封装主帐信息列表**/
      major_account() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/account/get_list_by_cashier",
          method: "post",
          data: {
            cashier_id: that.branch_id,
            page_num: that.cur_page,
            account_types: JSON.stringify(that.checkList),
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.total_advocate = res.data.data.total_count;
              for (let i  of   res.data.data.list) {
                i.balance = -(i.balance)
                i.negation = -(i.balance);
              }
              that.major_list = res.data.data.list;
              console.log(that.major_list);
            }
            else {
              console.log(res);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //点击主帐上分页上的页数
      handle_advocate(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page = curPage;
        let only_closed;
        if (that.only_closed === true) {
          only_closed = 1;
        } else {
          only_closed = 0;
        }
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/account/get_list_by_cashier",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize_advocate,
            room_num: that.sub_account,
            begin_time: that.business_date,
            end_time: that.closing_date,
            account_types: JSON.stringify(that.checkList),
            only_closed: only_closed,
            cashier_id:that.branch_id,//收银机id
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              for (let i  of   res.data.data.list) {
                i.balance = -(i.balance)
                i.negation = -(i.balance);
              }
              that.major_list = res.data.data.list
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
      /**封装获取调账原因*/
      adjustment_codes() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/arrange_account_reason/info_list",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.adjustment_list = res.data.data.list
            }


          })
          .catch(error => {
            console.log(error);
          });
      },
      /**封装获取付款原因*/
      pay_enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/code_pay_for/info_list",
          method: "get",
          params: {
            page_size: 999,
            in_or_out: that.collect_pay,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.pay_income_list = res.data.data.list;
              // that.get_by_hotel()
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      /**
       * 选择了业务种类以后，要根绝选择的业务种类去筛选入账代码
       * */
      acquire_kind(value) {
        console.log(value);
        let that = this;
        if (that.pay_reason === "") {
          that.code_income_data = "";
        }
        let arr = value.split(",");
        that.acquire_id = parseInt(arr[0]);
        that.acquire_in_or_out = arr[1];
        that.get_by_hotel();
      },

      /**
       * 点击获取入账代码，首先查询是否已经选中了收付款原因，如果选了付款原因，就开始获取入账代码，
       * 根据所选择的收付款原因，筛选入账代码
       * */
      acquire_code() {
        let that = this;
        if (that.pay_reason === "") {
          that.hintInfo("warning", "请选择业务种类")
        } else {
          that.get_by_hotel();//查询入账代码
        }
      },
      /**封装获取查账原因*/
      audit_accounts_list() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/check_account_reason/info_list",
          method: "get",
          page_size: 999,
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.audit_list = res.data.data.list
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //封装获取模块信息
      module_list_methods() {
        let that = this;
        //获取树形结构数据
        that.$axios({
          url: that.url + "/v1/common/module/get_tree",
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data)
              that.dataarr = res.data.data.map((res, index) => {
                return {
                  text: res.name,
                  value: res.id,
                }
              })
              console.info(that.dataarr);
              that.module_list = that.dataarr;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });


      },
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      //封装获取消费清单
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_size: 10,
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.recorded_list = res.data.data.list;
              that.total_two = res.data.data.total_count;
              for (let item of that.recorded_list) {
                if (item.code_income_type_id.name === '分帐转出') {
                  item.pay_status = "5";
                }
              }

            }
            else {
              console.log(res.data.message);
              that.recorded_list = [];
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //封装获取收支记录----暂时不写，不知道写什么
      income_expenses() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids2",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
            page_size: that.pagesize,//显示条数
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data)
              that.income_and_expenses = res.data.data.list;
              that.total_in = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装查账记录
      audit_accounts() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/check_account_operation/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data)
              that.examine_accounts = res.data.data.list;
              that.total_cha = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装分账记录
      general_ledger() {
        let that = this;
        // /v1/finance/account/get_sub_accounts
        that.$axios({
          url: that.url + "/v1/finance/split_charge_operation/info_list",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list)
              that.general_list = res.data.data.list;
              that.total_fen = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装并账记录
      and_curtain() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/combine_account_operation/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data)
              that.and_curtain_list = res.data.data.list;
              that.total_bing = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装冲调帐记录
      brew_account() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/arrange_account_operation/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.brew_list = res.data.data.list;
              that.total_chong = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装催账记录
      urge_payment() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/account_message/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.payment_list = res.data.data.list;
              that.total_cui = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      // 封装平帐记录
      flat_curtain() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/account_close_operation/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list;
              that.total_ping = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //转账记录
      transfer_voucher() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/transfer_accounts_detail/get_by_account_ids",
          method: "post",
          data: {

            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.transfer_list = res.data.data.list;
              that.total_zhuan = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });

      },

      /**分页*/
      //子账记录的分页
      general_minute(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_pages = curPage;
        //获取信息列表
        that.$axios({
          url: that.api_data,
          method: "get",
          params:{
            account_ids: JSON.stringify(that.advocate_id),
            page_num: that.cur_pages,
            page_size: that.pagesize,//显示条数
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              //分账记录
              if (that.api_data === that.url + '/v1/finance/split_charge_operation/info_list') {
                console.log("分账记录");
                that.general_list = res.data.data.list;
              } else
              //并账记录

              if (that.api_data === that.url + '/v1/finance/combine_account_operation/get_by_account_ids') {
                console.log("并账记录");
                that.and_curtain_list = res.data.data.list;
              } else
              //冲调帐

              if (that.api_data === that.url + '/v1/finance/arrange_account_operation/get_by_account_ids') {
                console.log("冲调帐");
                that.brew_list = res.data.data.list;
              } else
              //催账记录

              if (that.api_data === that.url + '/v1/finance/account_message/get_by_account_ids') {
                console.log("催账记录");
                that.payment_list = res.data.data.list;
              } else
              //转账记录

              if (that.api_data === that.url + '/v1/finance/transfer_accounts_detail/get_by_account_ids') {
                console.log("转账记录");
                that.transfer_list = res.data.data.list;
              }
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
      /**消费清单的分页*/
      general_minute_expense(curPage){
        let that = this
        console.log(curPage) // 当前页}
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids",
          method: "get",
          params:{
            account_ids: JSON.stringify(that.advocate_id),//主帐上选择的数组
            begin_date: that.business_time,//营业日期起
            code_income_type_id: that.harvest_type,//
            // join_code  入账代码     harvest_type  收支种类
            page_num:curPage,
            end_date: that.stop_time,//营业日期止
            page_size: that.pagesize,//显示条数
            filter_cond: that.finished,//已结已挂
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.recorded_list = res.data.data.list;
              that.total_two = res.data.data.total_count;
              if (that.recorded_list.length === 0) {
                that.hintInfo("warning", "暂无数据")
              }
            } else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**收支记录的分页*/
      general_minute_fen(curPage){
        let that = this
        console.log(curPage) // 当前页}
        //获取信息列表
        that.$axios({
          url: that.url + '/v1/finance/charge_detail/get_by_account_ids2',
          method: "get",
          params:{
            account_ids: JSON.stringify(that.advocate_id),
            page_num: curPage,
            page_size: that.pagesize,//显示条数
            in_or_out: that.harvest_finished,
            begin_date: that.harvest_time,
            end_date: that.harvest_stop_time,
            code_income_type_id: that.harvest_account,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
                console.log("收支记录");
                that.income_and_expenses = res.data.data.list;
                console.log(res.data.data.list);
              } else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**平帐记录的分页*/
      general_minute_flat(curPage){
        let that = this
        console.log(curPage) // 当前页}
        //获取信息列表
        that.$axios({
          url: that.url + '/v1/finance/account_close_operation/get_by_account_ids',
          method: "get",
          params:{
            account_ids: JSON.stringify(that.advocate_id),
            page_size: that.pagesize,//显示条数
            close_flag: that.balance,
            is_ar: that.account_genre + "",
            page_num:curPage
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list;
              that.total = res.data.data.total_count;
            } else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },

      /**主帐的筛选*/
      begin() {
        let that = this;
        console.log(that.checkList);
        if (that.checkList.length === 0) {
          that.checkList.push('0')
        } else if (that.checkList.indexOf('1') > -1 || that.checkList.indexOf('2') > -1) {
          that.disabled_equal = true;
          that.only_closed = false;
        } else {
          that.disabled_equal = false;
        }
        let only_closed;
        if (that.only_closed === true) {
          only_closed = 1;
        } else {
          only_closed = 0;
        }
        that.$axios({
          url: that.url + "/v1/finance/account/get_list_by_cashier",
          method: "post",
          data: {
            cashier_id:that.branch_id,//收银机id
            only_closed: only_closed,
            room_num: that.sub_account,
            begin_time: that.business_date,
            end_time: that.closing_date,
            account_types: JSON.stringify(that.checkList),
            page_size: that.pagesize,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              for (let i  of   res.data.data.list) {
                i.balance = -(i.balance)
                i.negation = -(i.balance);
              }
              that.major_list = res.data.data.list;
              console.log(that.major_list);
              that.total_advocate = res.data.data.total_count;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**
       * 主帐的操作
       *
       * */
      /**用来判断什么账户，显示不同颜色*/
      tableRowClassName({row, rowIndex}) {
        if (row.close_id) {
          return 'success-row';
        } else if (row.combined_flag === 1) {
          return 'routing-row';
        }
        return '';
      },
      /**消费明细里判断什么账户，显示不同颜色*/
      tableconsume({row, rowIndex}) {
        if (row.pay_status === 1 && !row.transfer_out_detail) {
          return 'paid-row';
        } else if (row.combined_flag === 1) {
          return 'routing-row';
        }
        return '';
      },
      /**主帐上的并账*/
      combine() {
        let that = this;
        // console.log(that.account_and);
        let arr = [];
        //判断是否是平帐的账户
        for (let i of that.account_and) {
          if (i.close_id) {
            arr.push(i);
          }
        }
        // console.log(arr);
        if (that.account_and.length < 2) {
          that.hintInfo("warning", "请选择2个以上的账户操作")
        } else if (arr.length > 0) {
          that.hintInfo("warning", "请选择未平帐的账户")
        }
        else {
          that.bingAccountDialog = true;
          that.title = "并账"
        }
      },
      /**主帐上的并账的确定*/
      merge_money() {
        let that = this;
        if (that.main_account === "") {
          that.hintInfo("warning", "请选择合并的主帐户的房间号")
        } else {
          that.$axios({
            url: that.url + "/v1/finance/combine_account_operation/combine_accounts",
            method: "post",
            data: {
              main_account: that.main_account,
              members: JSON.stringify(that.advocate_id), //传入分帐前的账号
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.bingAccountDialog = false;
                that.hintInfo("success", "并账成功");
                that.major_account();
                that.and_curtain();//并账记录

              }
              else {
                that.error_message(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /**开票*/
      open_ticket_data(row, id, index, list) {
        let that = this;
        console.log(row);
        that.flush();
        let invoice_money;
        // invoice_money=row.pay_amount-row.total_invoice;
        if (row.pay_amount <= 0) {
          that.hintInfo("warning", "暂无可开票金额")
        } else {
          that.separate_id = id;
          that.need_pay_data = row.need_pay;
          console.log(row, id);
          that.dialogVisible = true;
          that.title = "开票"
        }
      },
      /**开票确定*/
      determine_ticket() {
        let that = this;
        that.determine_ticket_all();
      },
      /**封装开票后的确定*/
      determine_ticket_all() {
        let that = this;
        if (that.invoice_number === '' || that.invoice_type === '' || that.invoice_amount === '' || that.invoice_title === '' || that.issued_date === '') {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.url + "/v1/finance/invoice_detail/add",
            method: "post",
            data: {
              account_id: that.separate_id,//被查的账户id
              invoice_number: that.invoice_number,
              invoice_type: that.invoice_type,
              issued_date: that.issued_date,
              amount: that.invoice_amount,
              invoice_title: that.invoice_title,
              desc: that.invoice_desc,
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.invoice_mark = true;
                that.hintInfo("success", "开票成功");
                that.major_account();
                that.invoice_dialogVisible = false;
                that.dialogVisible = false;
              }
              else {
                that.invoice_mark = false;
                that.error_message(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            });
        }

      },
      /** 查账*/
      audit_accounts_data(row, id, index, list) {
        let that = this;
        console.log(row);
        that.title = "查账"
        that.audit_accounts_list();
        that.examine_id = '';//查账id
        that.examine_type = '';//查账原因
        that.check_result = '0';//未操作
        that.examine_id = row.id;
      },
      /**查账的确定*/
      examine_ensure() {
        let that = this;
        if (that.examine_id === '' || that.examine_type === '') {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.url + "/v1/finance/check_account_operation/add",
            method: "post",
            data: {
              account_id: that.examine_id,//被查的账户id
              check_reason_id: that.examine_type, //查账原因
              check_result: parseInt(that.check_result),//查账操作

            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.dialog_accounts = false;
                that.major_account();
                that.hintInfo("success", "查帐成功");
                that.audit_accounts();//查帐记录
              }
              else {
                that.error_message(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /**分账*/
      lord(row, id, index, list) {
        console.log(row, id, index, list);
        let that = this;
        that.title = "分账"
        that.separate_id = id;
        // that.need_pay = row.general_consumption;
        that.need_pay=row.can_arrange;
        that.comment = '';
        that.biz_date_day = "";
        that.splitAccountParam_num = "";
        that.splitAccountParam_split_amount = "";
      },
      /**分账点击的确定 */
      splitAccount() {
        let that = this;
        if (that.splitAccountParam_split_amount >= that.need_pay) {
          that.hintInfo("warning", "拆分金额不能大于等于可分金额")
        } else {
          that.$axios({
            url: that.url + "/v1/finance/charge_detail/split",
            method: "post",
            data: {
              desc: that.comment,
              charge_id:that.separate_id,//消费id
              main_account: that.separate_id, //传入分帐前的账号
              split_method_id: that.splitAccountParam.split_method_id,//分账方法
              // biz_date:that.biz_date_day,
              num: that.splitAccountParam_num,//数量
              split_amount: that.splitAccountParam_split_amount//拆分金额
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.fenAccountDialog = false;
                // that.major_account();
                that.general_ledger();
                that. enter_code()
                that.hintInfo("success", "分帐成功")
              }
              else {
                that.error_message(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /**
       *
       *
       * 写道正常账户的转账，需要写AR转账 接口是一样的 AR帐转的是主主张的id
       *
       *
       * */
      /**消费上的bank_transfer  转账*/
      bank_transfer(row, id, index, list){
        let that =this;
        console.log(row);
        that.roll_out=row.id +"/"+row.account_id.room_num;
        that.all_account();
        that.ar_code();//ar账户
        that.transfer_amount = row.charge_amount;//AR帐里的金额
        if(row.transfer_out_detail==null){
          that.change_account=true
        }else {
          that.turn_account =true;
        }
        that.roll_money = row.charge_amount
      },
      /**转帐里选择的所有账户*/
      all_account(){
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/account/get_list_by_cashier",
          method: "post",
          data: {
            cashier_id: that.branch_id,
           page_size:999,
            account_types: JSON.stringify(that.checkList),
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.principal_account=res.data.data.list;//主帐

            }
            else {
              console.log(res);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**正常账户的转账确定*/
      normal_ensure(){
        let that =this ,arr=[];
        //转入账户
        let shift_to = parseInt(that.shift_to.split("/")[0]);

        //转出账户
       let  roll_out = parseInt(that.roll_out.split("/")[0]);
       arr.push(roll_out);
        that.$axios({
          url:that.url+"/v1/finance/transfer_accounts_detail/batch_add",
          method:"post",
          data:{
            to_id:shift_to,
            charge_ids:JSON.stringify(arr),
            // cashier:"",
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
              that.change_account=false;
              that.enter_code();//消费清单
              that. major_account();//主帐
            }
          })
          .catch(error=>{
            console.error(error)
          })
      },

      /**消费上的调账*/
      account_regulation(row, id, index, list) {
        let that = this;
        console.log(row);
        that.account_separate_id = row.account_id.id
        that.separate_id = id;
        that.need_pay_data = row.need_pay;
        that.title = "调账"
        that.adjustment_codes();
        that.reason_id = '';//原因
        that.arranged_amount = "";//金额
        that.biz_date = '';//调后余额
        that.done_flag = '';//完成标志
      },
      /**消费上的调账的确定*/
      regulation() {
        let that = this;
        if (that.reason_id === "" || that.arranged_amount === "") {
          that.hintInfo("warning", "*为必填项")
        } else {
          // if(that.arranged_amount<0.01){
          //   that.hintInfo("warning", "调账金额不能小于0.01")
          // }
          // else {
          that.$axios({
            url: that.url + "/v1/finance/arrange_account_operation/add",
            method: "post",
            data: {
              account_id: that.account_separate_id, //调账id的主id
              reason_id: that.reason_id,//原因
              charge_id: that.separate_id,//需要调账的id
              // biz_date:that.biz_date,
              amount:Number(parseFloat(that.arranged_amount).toFixed(2)) ,//金额
              // balance_after_arranged:that.balance_after_arranged,//调后余额
              // do_flag:that.done_flag,//完成标志
            },

          })
            .then(res => {
              if (res.data.message === "success") {
                that.tiaoAccountDialog = false;
                that.major_account();
                that.brew_account();//调账记录
                that.enter_code();//消费清单
                that.hintInfo("success", "调账成功")
              }
              else {
                that.error_message(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            });
        }
        // }
      },
      /** 主帐上的平帐*/
      flat_screen(row, id, index, list) {
        let that = this;
        console.log(row);
        that.title = "平账"
        that.need_pay_data = row.negation;
        that.separate_id = id;
        that.biz_date_ping = '';//平帐营业日期
        // that.close_flag = '';//平帐类型
        that.room_mark = row.room_num;
        that.remark_data = "";//备注
      },
      /**平帐的确定*/
      flat_regulation() {
        let that = this;
          if (that.negation > 0) {
            // that.hintInfo("warning", "金额未结清暂时不能平帐")
            //  提示框  是否强制平帐
            that.constraint_force();
          } else {
            that.$axios({
              url: that.url + "/v1/finance/account_close_operation/add",
              method: "post",
              data: {
                account_id: that.separate_id, //传入分帐前的账号
                remark: that.remark_data,//备注
                // biz_date:that.biz_date_ping,
                // close_flag: that.close_flag,//金额
                // force:1,
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  that.pingAccountDialog = false;
                  that.major_account();
                  that.flat_curtain();//平帐记录
                  that.hintInfo("success", "平帐成功")
                }
                else {
                  // that.error_message(res.data.message)
                  that.hintInfo("warning", "平帐失败")
                }

              })
              .catch(error => {
                console.log(error);
              });
          }
      },
      /**挂AR*/
      suspend_AR(row, id, index, list) {
        let that = this;
        console.log(row, id, index, list);
        that.AR_dialogVisible = true;
        that.ar_code();
        that.ar_money = row.general_consumption;
        that.sign = false;
        that.consumption_ar_id = id;
      },
      //挂AR 的确定
      ar_ticket_host() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/ar_account/batch_transfer",
          method: "post",
          data: {
            from_id: that.consumption_ar_id,
            ar_id: that.ar_account,//AR帐id
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.major_account();
              that.enter_code();//消费清单
              that.hintInfo("success", "挂AR帐成功");
              that.AR_dialogVisible = false;
            }
            else {
              console.log(res.data.message);
              that.hintInfo("warning", "挂AR帐失败");
            }

          })
          .catch(error => {
            console.log(error);
          });
      },


      /**
       * 封装一个函数：
       * 平帐的时候如果金额大于0；提示一下是否要平帐*/
      constraint_force() {
        let that = this;
        that.$confirm('此操作将金额大于0的账户平帐是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            url: that.url + "/v1/finance/account_close_operation/add",
            method: "post",
            data: {
              account_id: that.separate_id, //传入分帐前的账号
              remark: that.remark_data,//备注
              // biz_date:that.biz_date_ping,
              close_flag: that.close_flag,//金额
              force: 1,
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.$message({
                  type: 'success',
                  message: '平帐成功!'
                });
                that.pingAccountDialog = false;
                that.major_account();
                that.flat_curtain();//平帐记录
              }
              else {
                that.hintInfo("warning", res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            });

        }).catch(() => {
          that.$message({
            type: 'info',
            message: '已取消平帐'
          });
        });
      },
      /**主帐上的付钱*/
      pay_them(row, id, index, list) {
        let that = this;
        that.flush();
        console.log(row);
        that.title = "付钱"
        that.need_pay_data = row.need_pay;
        that.pay_amount_money = row.need_pay;
        that.separate_id = id;
        that.source = row.market_code;//入账来源
        if (that.collect_pay === 'in') {
          that.pay_enter_code()
        }
        if (row.master_base_id === null) {
          that.room_mark = ""
        } else {
          that.room_mark = row.room_num;//房间号
        }
        that.settle_accounts = row.id;//账户id
        that.cope_with_money = row.negation//应付金额
      },
      /**主帐上的付钱的确定*/
      pay_them_money() {
        let that = this;
        that.pay_amount_money_code = "";
        //先判断是否为空
        if (that.pay_amount_money === "" || that.pay_mode === "" || that.pay_reason === '' || that.code_income_data === "" ||that.cashier_id==="") {
          that.hintInfo("warning", "*为必填项")
        }
        //如果不为空
        else {
          //在判断是不是支付宝或者微信
          if (that.pay_mode === 38 || that.pay_mode === 1) {
            //判断是不是选择扫码枪
            if (that.scan_code === "0") {
              that.dialog_alipay = true;
            }
            //如果不是扫码枪
            else {
              that.dialog_alipay = false;
              //判断是微信还是支付宝
              if (that.pay_mode === 38) {
                // 首先请求微信或者支付宝的接口，获取动态的二维码
                that.kindle_dxg();
                console.log("微信");
              } else {
                that.alipay_dxg();
                console.log("支付宝");
              }
              // that.fu_money();//付钱的结算
            }
          }
          //如果不是支付宝或者微信
          else {
            //再判断金额是不是小于需要支付的金额
            if (parseFloat(that.pay_amount_money) < that.need_pay_data) {
              console.log(that.pay_amount_money);
              console.log(that.need_pay);
              that.hintInfo("warning", "付款金额不能小于应支付金额");
            }
            // 如果不小于需要支付的金额
            else {
              that.fu_money();
            }
          }

        }
      },
      /**封装获取支付宝二维码*/
      alipay_dxg() {
        let that = this;
        let code_pay_for_id;
        // if(that.collect_pay === "out"){
        //   code_pay_for_id=that.pay_reason_one
        // }else {
        //   code_pay_for_id=that.pay_reason
        // };
        code_pay_for_id = parseInt(that.pay_reason.split(",")[0]);
        that.$axios({
          url: that.api.api_pay_8094 + "/v1/alipay/trade_precreate/",
          method: "post",
          data: {
            out_trade_no: that.order_form,
            subject: code_pay_for_id,
            total_amount: parseFloat(that.pay_amount_money).toFixed(2),
          },
        })
          .then(res => {
            if (res.data.message = "success") {
              console.log(res);
              that.img_wz = false;
              that.qr_w = res.data.data.alipay_trade_precreate_response.qr_code;
              that.$nextTick(function () {
                that.qrcode();
              });
              //如果生成了二维码，就要调用查询付款成功
              if (that.qr_w) {
                console.log("成功");
                that.timer_qr()
              }
              that.dialog_img = true;
              that.$refs.qrcode.innerHTML = "";

            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**解析后端给的数据生成二维码*/
      qrcode() {
        let that = this;
        let qrcode = new QRCode('qrcode', {
          width: 370,  // 设置宽度
          height: 370, // 设置高度
          text: that.qr_w,
        })
        console.log(qrcode)
      },
      /** 封装获取微信的二维码*/
      kindle_dxg() {
        let that = this;
        let transform = that.pay_amount_money * 100;
        let code_pay_for_id = "";
        // if(that.collect_pay === "out"){
        //   code_pay_for_id=that.pay_reason_one
        // }else {
        //   code_pay_for_id=that.pay_reason
        // };
        code_pay_for_id = parseInt(that.pay_reason.split(",")[0]);
        that.$axios({
          url: that.api.api_9530_9503 + "/v1/payment/weixin/native",
          method: "post",
          data: {
            out_trade_no: that.order_form,
            total_fee: transform,
            product_id: 5,//商品id现在是写死数据，后期改
            body: code_pay_for_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.img_src = "data:image/png;base64," + res.data.data.qr_img_b64;
              console.log(that.img_src);
              that.dialog_img = true;
              that.img_wz = true;
              that.check_paid();//查询二维码支付是否成功
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装查看微信二维码或者扫码枪扫描支付是否成功
      check_paid() {
        let that = this;
        clearInterval(that.timer_src);
        that.$axios({
          // url: "http://47.98.113.173:9503/v1/payment/weixin/check_paid",
          url: that.api.api_9530_9503 + "/v1/payment/weixin/check_paid",
          method: "post",
          data: {
            out_trade_no: that.order_form
          },
        })
          .then(res => {
            if (res.data.data.paid === "yes") {
              console.log(res);
              that.dialog_img = false;
              that.dialog_succeed = true;//成功或者失败的页面
              that.ihatetheqrcode = true;
              clearInterval(that.timer_src);
            }
            else {
              console.log(that.timer);
              if (that.img_src) {
                that.timing_wx();
                if (that.timer >= 60) {
                  clearInterval(that.timer_src);
                  if (res.data.data === "yes") {
                    that.dialog_img = false;
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = true;
                  } else {
                    that.dialog_img = false;
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = false;
                  }
                  return;
                }
              } else {
                that.timing();
                if (that.timer >= 6) {
                  clearInterval(that.timer_src);
                  if (res.data.data === "yes") {
                    that.dialog_img = false;
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = true;
                  } else {
                    that.dialog_img = false;
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = false;
                  }
                  return;
                }
              }
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装扫描二维码后触发的定时器
      timing() {
        let that = this;
        // that.timer=0;
        that.timer_src = setInterval(function ()   //开启循环：
        {
          that.timer++;
          console.log(that.timer++);
          that.check_paid();
          if (that.timer >= 6) {
            clearInterval(that.timer_src);
            console.log(that.timer);
            return;
            //判断res

          }
        }, 2000);
      },
      //封装微信二维码后的定时器
      timing_wx() {
        let that = this;
        // that.timer=0;
        that.timer_src = setInterval(function ()   //开启循环：
        {
          that.timer++;
          console.log(that.timer++);
          that.check_paid();
          if (that.timer >= 60) {
            clearInterval(that.timer_src);
            console.log(that.timer);
            return;
            //判断res
          }
        }, 2000);
      },
      //封装支付宝二维码后的定时器
      timer_qr() {
        let that = this;
        // that.timer=0;

        that.timer_r = setInterval(function ()   //开启循环：
        {
          that.timer++;
          console.log(that.timer++);
          that.syntony_function();
          if (that.timer >= 60) {
            clearInterval(that.timer_r);
            console.log(that.timer);
            return;
          }
        }, 2000);
      },
      //封装扫码枪扫码后的定时器
      timer_incident() {
        let that = this;
        // that.timer=0;
        that.timer_r = setInterval(function ()   //开启循环：
        {
          that.timer++;
          console.log(that.timer++);
          that.syntony_function();

          if (that.timer >= 5) {
            clearInterval(that.timer_r);
            console.log(that.timer);
            return;
          }

        }, 1000);
      },
      //选择收支类型
      in_out__type(value) {
        let that = this;
        that.pay_reason = "";
        that.get_in_out = value;
        // console.log(that.collect_pay,value);
        that.pay_enter_code();//获取业务种类
        // if(value==="in"){
        //   that.get_in_out = "in"
        // }else if(value==="out"){
        //   that.get_in_out = "out"
        // }else {
        //   that.get_in_out = "in/out"
        // }
      },
      //封装获取收支类型的入账代码
      get_by_hotel() {
        let that = this;
        // let code_incoming_arr=[];
        // let code_arr=[],code_in_out=[];
        that.$axios({
          url: that.url + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_size: 999,
            in_or_out: that.acquire_in_or_out,//业务种类的in_or_out
            code_pay_for: that.acquire_id,//业务种类的id

          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list)
              let arr = [];
              for (let item = 0; item < res.data.data.list.length; item++) {
                if (res.data.data.list[item].name === "夜审房费") {
                  res.data.data.list.splice(item, 1);
                }
                arr = res.data.data.list;
              }
              that.code_incoming_list = arr;
            }
            else {
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装付钱的结算
      fu_money() {
        let that = this;
        let code_pay_for_id = "";
        let order_from_id;
        code_pay_for_id = parseInt(that.pay_reason.split(",")[0]);
        //如果扫码方式没有出现说明不会有订单号
        if (that.scan_code_show === true) {
          order_from_id = that.order_form
        } else {
          order_from_id = ""
        }
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/pay_by_charges",
          method: "post",
          data: {
            account_id: that.separate_id, //传入分帐前的账号
            pay_amount: parseFloat(that.pay_amount_money).toFixed(2),//支付金额
            pay_mode_id: that.pay_mode,//付款方式
            code_pay_for_id: code_pay_for_id,//付款原因
            in_or_out: that.collect_pay,//收支种类
            original_pay_id: order_from_id,//订单号
            code_income_type_id: that.code_income_data,//入帐代码
            need_charge: 0,
            cashier_id:that.cashier_id,//收银点
            // scan_code:'0',//扫码方式
            // pay_amount_money_code:'',//扫码得到的码

          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.fuAccountDialog = false;
              that.major_account();
              that.enter_code();//消费清单
              that.hintInfo("success", "付钱成功")
            }
            else {
              that.hintInfo("warning", res.data.message)
            }


          })
          .catch(error => {
            console.log(error);

          });
      },
      /***付款方式*/
      payment_method(value) {
        console.log(value);
        let that = this;
        console.log(that.pay_mode);
        if (value === 38 || value === 1) {
          that.scan_code_show = true;
        } else {
          that.scan_code_show = false;
        }
      },
      /**扫码后确定*/
      payment_ensure() {
        let that = this;
        console.log("确定");
        //http://47.98.113.173:8093
        //如果微信扫码后确定
        if (that.pay_mode === 38) {
          let that = this;
          let transform = that.pay_amount_money * 100;
          let code_pay_for_id = "";
          code_pay_for_id = parseInt(that.pay_reason.split(",")[0]);
          that.$axios({
            url: that.api.api_9530_9503 + "/v1/payment/weixin/micropay",
            method: "post",
            data: {
              out_trade_no: that.order_form,//付钱的订单
              auth_code: that.pay_amount_money_code,
              total_fee: transform,
              product_id: 5,//商品id现在是写死数据，后期改
              body: code_pay_for_id,
              spbill_create_ip: "47.98.113.173",//	生成订单的IP地址现在是写死数据，后期改
            },
          })
            .then(res => {
              //如果扫码成功
              if (res.data.message === "success") {
                // that.dialog_alipay = false;
                that.check_paid();//查看扫码是否成功
              }
              else {
                that.hintInfo("warning", "扫码错误请重新扫码")
              }

            })
            .catch(error => {
              console.log(error);
            });

        }
        //如果支付宝扫码后确定
        else {
          // http://pay.crowncrystalhotel.com
          that.$axios({
            url: that.api.api_pay_8094 + '/v1/alipay/trade_pay/',
            method: "post",
            data: {
              out_trade_no: that.order_form + "",//付钱的订单
              auth_code: that.pay_amount_money_code,//授权码
              total_amount: that.pay_amount_money,//支付金额
              // pay_mode_id:that.pay_mode,//付款方式
              // subject :that.pay_reason,//付款原因
              subject: that.pay_reason,//付款原因
            },

          })
            .then(res => {
              //如果扫码成功
              if (res.data.message === "success") {
                // that.dialog_alipay = false;
                that.syntony_function()
              }
              else {
                that.hintInfo("warning", "扫码错误请重新扫码")
              }

            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /***查询支付宝扫码支付成功与否的回调*/
      syntony_function() {
        let that = this;
        clearInterval(that.timer_r);
        // http://47.98.113.173:8094
        that.$axios({
          url: that.api.api_pay_8094 + "/v1/alipay/query_result/",
          method: "post",
          data: {
            out_trade_no: that.order_form + "",
          },
        })
          .then(res => {
            if (res.data.data.pay_status === "TRADE_SUCCESS") {
              console.log(res.data.data.pay_status)
              that.dialog_img = false;
              that.dialog_succeed = true;//成功或者失败的页面
              that.ihatetheqrcode = true;
              clearInterval(that.timer_r);
              // clearInterval(that.timer_qr);
            }
            else {
              if (that.qr_w) {
                clearInterval(that.timer_r);
                that.timer_qr();
                if (that.timer >= 60) {
                  clearInterval(that.timer_r);
                  if (res.data.data === "TRADE_SUCCESS") {
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = true;
                  } else {
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = false;
                  }
                  return;
                }
              } else {
                clearInterval(that.timer_r);
                that.timer_incident();
                console.log(that.timer);
                if (that.timer >= 6) {
                  clearInterval(that.timer_r);
                  if (res.data.data === "TRADE_SUCCESS") {
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = true;
                  } else {
                    that.dialog_succeed = true;//成功或者失败的页面
                    that.ihatetheqrcode = false;
                  }
                  return;
                }
              }


            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**封装获取商品订单号*/
      article_number() {
        let that = this;
        let pay_reason;
        that.timer = 0;
        pay_reason = parseInt(that.pay_reason.split(",")[0])
        //判断支付方式和收款金额是否为空
        if (pay_reason === "" || that.pay_amount_money === "") {
          that.hintInfo("warning", "*为必填项")
        } else {
          //判断付款金额是否小于等于0
          if (that.pay_amount_money < that.need_pay_data) {
            that.hintInfo("warning", "付款金额不能小于应支付金额")
          } else {
            that.$axios({
              url: that.url + '/v1/finance/extend_pay/get_order_number',
              method: "post",
              data: {
                amount: that.pay_amount_money,
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res.data._id);
                  that.order_form = res.data._id;
                  //判断是不是主帐的付款还是消费清单的结算
                  if (that.pointAccountDialog_all === true) {
                    that.pay_money_all()//多选的消费清单
                  } else if (that.pointAccountDialog === true) {
                    that.point_pay_money();//单个消费清单
                  } else {
                    that.pay_them_money()//主帐付钱
                  }

                }

              })
              .catch(error => {
                console.log(error);
              });
          }
        }


      },
      /** 成功页面或者失败页面的确定按钮*/
      succeed_failed() {
        let that = this;
        //如果付款成功
        if (that.ihatetheqrcode === true) {
          // that.scan_code = "1";
          if (that.scan_code) {
            that.dialog_succeed = false;//成功或者失败的页面
            that.dialog_img = false;//扫码支付的页面
            that.dialog_alipay = false;//扫码支付的页面
          }
          if (that.pointAccountDialog_all) {
            that.consumption_list_all();
          } else if (that.pointAccountDialog === true) {
            that.consumption_list();
          } else {
            that.fu_money();//付钱的确定
          }
        }
        //如果付钱失败
        else {
          if (that.img_src !== "") {
            that.dialog_succeed = false;//成功或者失败的页面
            that.dialog_alipay = false;//扫码支付的页面
          } else {
            if (that.qr_w) {
              that.dialog_succeed = false;//成功或者失败的页面
              that.dialog_img = false;
              that.pay_amount_money_code = "";
              that.hintInfo("warning", "扫码付钱失败，请重新扫码")
            } else {
              that.dialog_succeed = false;//成功或者失败的页面
              that.dialog_alipay = true;//扫码支付的页面
              that.pay_amount_money_code = "";
              that.hintInfo("warning", "扫码付钱失败，请重新扫码")
            }

          }

        }
      },
      /**
       * 分账的筛选
       *
       * */
      //消费清单筛选
      filtrate() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),//主帐上选择的数组
            begin_date: that.business_time,//营业日期起
            code_income_type_id: that.harvest_type,//
            // join_code  入账代码     harvest_type  收支种类
            end_date: that.stop_time,//营业日期止
            page_size: that.pagesize,//显示条数
            filter_cond: that.finished,//已结已挂
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.recorded_list = res.data.data.list;
              that.total = res.data.data.total_count;
              if (that.recorded_list.length === 0) {
                that.hintInfo("warning", "暂无数据")
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
      //收支记录的筛选
      harvest() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids2",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_size: that.pagesize,//显示条数
            in_or_out: that.harvest_finished,
            begin_date: that.harvest_time,
            end_date: that.harvest_stop_time,
            code_income_type_id: that.harvest_account,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data)
              that.income_and_expenses = res.data.data.list;
              that.total_in = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //平帐的筛选
      filtrate_balance() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/account_close_operation/get_by_account_ids",
          method: "post",
          data: {
            account_ids: JSON.stringify(that.advocate_id),
            page_size: that.pagesize,//显示条数
            close_flag: that.balance,
            is_ar: that.account_genre + "",
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list;
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

      /**
       * 分账的操作
       *
       * */
      /**消费清单的付款*/
      point_money(row, id, index, list) {
        let that = this;
        that.flush();
        that.need_pay_data = row.charge_amount;
        console.log(row);
        that.title = "付钱";
        // that.difference=row.charge_amount - row.pay_amount;
        console.log(that.difference);
        that.separate_account = row.account_id.id;
        that.separate_id = id;
        that.arr = [];
        that.arr.push(that.separate_id);
        console.log(that.arr);
        that.get_by_hotel();//查询收支类型为out的入账代码
        if (row.account_id.master_base_id) {
          if (row.account_id.master_base_id === null) {
            that.room_mark = ""
          } else {
            that.room_mark = row.account_id.room_num;//房间号
          }
          ;
        } else {
          that.room_mark = ""
        }
        //在这里判断是否是执行了函数，获取业务种类

        that.collect_pay = row.in_or_out;
        // that.collect_pay = row.code_income_type_id.in_or_out;
        that.code_income_data = row.code_income_type_id.id;
        if (that.collect_pay) {
          that.pay_enter_code();
        }

        let pay_string = row.code_income_type_id.code_pay_for + ""
        that.pay_reason = pay_string + ',' + row.code_income_type_id.in_or_out;
        that.settle_accounts = row.id;//账户id
        that.cope_with_money = row.can_arrange;//应付金额
        that.pay_amount_money = row.can_arrange;
        that.room_num = row.account_id.room_num;
        that.source = row.account_id.source_code;


      },
      /**消费清单的付款确定*/
      point_pay_money() {
        let that = this;
        //判断是不是为空
        if (that.pay_amount_money === "" || that.pay_mode === "" || that.pay_reason === '' || that.code_income_data === '' ||that.cashier_id==="") {
          that.hintInfo("warning", "*为必填项")
        }
        //如果不为空
        //   else if(that.pay_amount_money!==that.cope_with_money){
        //   that.hintInfo("warning", "*为必填项")
        // }
        else {
          //判断是不是支付宝或者微信支付
          if (that.pay_mode === 1 || that.pay_mode === 38) {
            //判断是不是扫码枪支付
            if (that.scan_code === "0") {
              //显示扫码的页面
              that.dialog_alipay = true;
            }
            //如果不是扫码枪
            else {
              that.dialog_alipay = false;
              //判断是微信还是支付宝
              if (that.pay_mode === 38) {
                // 首先请求微信或者支付宝的接口，获取动态的二维码
                that.kindle_dxg();
              } else {
                that.alipay_dxg();
              }

            }

          }
          // 如果不是第三方支付
          else {
            that.consumption_list()//付钱的结算

          }
        }
      },

      //消费清单的付款接口
      consumption_list() {
        let that = this;
        let code_pay_for_id = "";
        // if(that.collect_pay === "out"){
        //   code_pay_for_id=that.pay_reason_one
        // }else {
        //   code_pay_for_id=that.pay_reason
        // };
        code_pay_for_id = parseInt(that.pay_reason.split(",")[0]);

        let order_from_id;
        //如果扫码方式没有出现说明不会有订单号
        if (that.scan_code_show === true) {
          order_from_id = that.order_form
        } else {
          order_from_id = ""
        }
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/pay_by_charges",
          method: "post",
          data: {
            account_id: that.separate_account,
            charge_ids: JSON.stringify(that.arr), //传入分帐前的账号
            pay_amount: parseFloat(that.pay_amount_money).toFixed(2),//支付金额 0
            // biz_date:that.biz_date_fu,//营业日期 0
            // pay_status:that.pay_status_id,//支付状态
            in_or_out: that.collect_pay,//收支种类
            pay_mode_id: that.pay_mode,//付款方式
            code_pay_for_id: code_pay_for_id,//付款原因
            original_pay_id: order_from_id,//订单号
            cashier_id:that.cashier_id,//收银点
            code_income_type_id: that.code_income_data,//查询收支类型为out的入账代码
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.pointAccountDialog = false;
              that.enter_code();
              that.major_account();
              that.hintInfo("success", "付款成功")
            }
            else {

            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //多个消费清单的付款接口
      consumption_list_all() {
        let that = this;
        let code_pay_for_id = "";
        // if(that.collect_pay === "out"){
        //   code_pay_for_id=that.pay_reason_one
        // }else {
        //   code_pay_for_id=that.pay_reason
        // };
        code_pay_for_id = parseInt(that.pay_reason.split(",")[0]);
        let order_from_id;
        //如果扫码方式没有出现说明不会有订单号
        if (that.scan_code_show === true) {
          order_from_id = that.order_form
        } else {
          order_from_id = ""
        }
        that.$axios({
          url: that.url + "/v1/finance/pay_detail/pay_by_charges",
          method: "post",
          data: {
            account_id: that.parent_consume,
            charge_ids: JSON.stringify(that.routing_id), //传入分帐前的账号
            pay_amount: parseFloat(that.pay_amount_money).toFixed(2),//支付金额 0
            // biz_date:that.biz_date_fu,//营业日期 0
            // pay_status:that.pay_status_id,//支付状态
            in_or_out: that.collect_pay,//收支种类
            pay_mode_id: that.pay_mode,//付款方式
            cashier_id:that.cashier_id,//收银点
            code_pay_for_id: code_pay_for_id,//付款原因
            original_pay_id: order_from_id,//订单号
            code_income_type_id: that.code_income_data,//查询收支类型为out的入账代码
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.pointAccountDialog_all = false;
              that.enter_code();
              that.major_account();
              that.hintInfo("success", "付款成功")
            }
            else {
              // that.hintInfo("hintInfo", "请选择同一主帐户下的消费付款")
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },


      /** 多选消费清单*/
      payment_click() {
        let that = this;
        that.flush();
        if (that.break_fu) {
          that.hintInfo("warning", "请选择同一个主帐下的消费付款")
        } else {
          if (that.gross_amount === 0) {
            that.hintInfo("warning", "账务已经付款完毕")
            that.pointAccountDialog_all = false;
          } else {
            that.title = "付钱";
            that.settle_accounts = that.parent_consume;
            that.room_mark = that.num_room;
            that.pointAccountDialog_all = true;
            that.difference = that.sub_sum;
            that.cope_with_money = that.gross_amount;//应付金额
            // that.pay_enter_code();//获取付款原因
            that.get_by_hotel();//查询收支类型为out的入账代码
            console.log(that.ite_obj);
            let row = that.ite_obj;
            that.collect_pay = row.in_or_out;
            that.code_income_data = row.code_income_type_id.id; //入账代码
            console.log(that.code_income_data);
            if (that.collect_pay) {
              that.pay_enter_code();
            }
            let pay_string = row.code_income_type_id.code_pay_for + ""
            that.pay_reason = pay_string + ',' + row.code_income_type_id.in_or_out;//业务种类
            that.pay_amount_money = that.gross_amount;//应收支金额
          }
        }
      },
      /** 多选消费清单的确定*/
      pay_money_all() {
        let that = this;
        //判断是不是为空
        if (that.pay_amount_money === "" || that.pay_mode === "" || that.pay_reason === '' || that.code_income_data === '' || that.cashier_id==="") {
          that.hintInfo("warning", "*为必填项")
        }
        //如果不为空
        else {
          //判断是不是支付宝或者微信支付
          if (that.pay_mode === 1 || that.pay_mode === 38) {
            //判断是不是扫码枪支付
            if (that.scan_code === "0") {
              that.dialog_alipay = true;
              that.scan_code_show = false
            }
            //如果不是扫码枪
            else {
              that.scan_code_show = false
              that.dialog_alipay = false;
              //判断是微信还是支付宝
              if (that.pay_mode === 38) {
                // 首先请求微信或者支付宝的接口，获取动态的二维码
                that.kindle_dxg();
              } else {
                that.alipay_dxg();
              }

            }

          }
          // 如果不是第三方支付
          else {
            that.consumption_list_all()//付钱的结算
          }
        }
      },
      /**收支记录的开票*/
      invoice_income(row, id, index, list) {
        let that = this;
        console.log(row, id, index, list);
        that.flush();
        let invoice_money;
        invoice_money = row.account_id.pay_amount - row.account_id.total_invoice;
        if (invoice_money <= 0) {
          that.hintInfo("warning", "暂无可开票金额")
        } else {
          that.separate_id = row.account_id.id;
          that.need_pay_data = row.need_pay;
          that.title = "开票";
          // that.invoice_amount = row.charge_amount;
          that.invoice_dialogVisible = true;
        }
      },
      /**收支记录的开票的确定*/
      invoice_ticket() {
        let that = this;
        that.determine_ticket_all();
      },
      //封装获取AR账户设置
      ar_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/ar_account/info_list",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              let arr =[];
              for(let item of  res.data.data.list){
                  if(item.is_permanent===0){
                    arr.push(item)
                  }
              }
              that.ar_list = arr;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      /**s收支记录里的挂AR*/
      hang_AR(row, id, index, list) {
        let that = this;
        console.log(row, id, index, list);
        that.AR_dialogVisible = true;
        that.ar_code();
        that.ar_money = row.charge_amount;
        that.sign = true;
        that.consumption_ar_id = id;
      },
      /**收支记录/消费清单挂ar确定*/
      ar_ticket() {
        let that = this;
        let arr = [];
        arr.push(that.consumption_ar_id);
        that.$axios({
          url: that.url + "/v1/finance/ar_account/batch_transfer",
          method: "post",
          data: {
            charge_ids: JSON.stringify(arr),
            ar_id: that.ar_account,//AR帐id
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.enter_code();
              that.hintInfo("success", "挂AR帐成功");
              that.AR_dialogVisible = false;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**消费清单的挂AR*/
      consumption_ar(row, id, index, list) {
        let that = this;
        console.log(row, id, index, list);
        that.AR_dialogVisible = true;
        that.ar_code();
        that.sign = true;
        that.ar_money = row.charge_amount;
        that.consumption_ar_id = id;
      },
      /**消费清单的开票*/
      invoice_recorded(row, id, index, list) {
        let that = this;
        console.log(row, id, index, list);
        that.flush();
        let invoice_money;
        invoice_money = row.account_id.pay_amount - row.account_id.total_invoice;
        console.log(invoice_money);
        if (invoice_money <= 0) {
          that.hintInfo("warning", "暂无可开票金额")
        } else {
          that.separate_id = row.account_id.id;
          that.need_pay_data = row.need_pay;
          that.title = "开票";
          // that.invoice_amount = row.charge_amount;
          that.invoice_dialogVisible = true;
        }
      },


      //¶ Dialog的关闭
      handleClose(done) {
        let that = this;
        console.log("消失");
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        done();
        clearInterval(that.timer_r);
        clearInterval(that.timer_src);
        this.timer = 0;
        //   if(that.qr_w){
        //     clearInterval(that.timer_r);
        //   }else {
        //     clearInterval(that.timer_src);
        //   }
        // })
        // .catch(_ => {});
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
    beforeDestroy() {
      // 清除定时器
      let that = this;
      console.log("消失");
      clearInterval(that.timer_src)
      this.timer = 0;
    },

  }
</script>
<style lang="less" scoped>
  .accounting {
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
      overflow-y: scroll;
      float: left;
      .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }
      .curtain {
        width: 96%;
        height: 95%;
        margin: 1%;
        background: white;
        overflow: hidden;
        overflow-y: scroll;
        .title {
          margin-top: 10px;
          min-width: 1300px;
          overflow: hidden;
          li {
            display: inline-block;
            margin-left: 5px;
            button {
              width: 80px;
              height: 30px;
              background: rgba(68, 136, 233, 1);
              border: none;
              border-radius: 4px;
              color: white;
              margin-left: 10px;
            }
          }
        }
        .shopping {
          height: 60%;
          margin-top: 40px;
          min-width: 1200px;
          .shopping_title {
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
                margin-left: 10px;
              }
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
    .open_ticket {
      overflow: hidden;
      li {
        margin-bottom: 20px;
        span {
          display: inline-block;
          width: 102px;
          text-align: right;

        }
      }
    }
    .open_ticket_type {
      /*width: 40% ;*/
      p {
        font-size: 20px;
      }
      ul {
        height: 386px;
        margin-top: 20px;
        border: 1px solid rgb(220, 223, 230);
        border-radius: 4px;
        padding: 10px;
        li {
          height: 40px;
          margin-bottom: 30px;
          margin-top: 40px;
          span {
            display: inline-block;
            width: 100px;

          }
        }
      }
    }
  }
</style>
<style>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    /*background: darkgray;*/
    background: #8FC8D6;
  }

  .el-table .routing-row {
    /*background: dimgrey;*/
    background: #C0B6B6;
  }

  .el-table .paid-row {
    /*background: dimgrey;*/
    background: #999999;
  }
</style>
<style scoped>
  .status >>> .el-table__column-filter-trigger i {
    color: white;
    font-size: 16px;
  }
</style>
