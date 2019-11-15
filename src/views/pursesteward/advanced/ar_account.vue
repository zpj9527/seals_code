<template>
  <div class="ar_account">
    <!--支付方式 -->
    <div class="shopping">
      <div style="position: relative">
        <span
          style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">AR账户设置</span>
        <el-button type="primary" @click="flush();add_title()" size="mini"
                   style="margin-top: 14px;width: 80px;">
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          新增
        </el-button>
        <div style="position: absolute;top: 18px;left: 200px">
          <el-checkbox v-model="is_groups" @change="screen">永久账户</el-checkbox>
          <el-checkbox v-model="is_halts" @change="screen_halt">停用</el-checkbox>
        </div>
      </div>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            fixed="left"
            prop="name"
            width="150"
            label="账户名称">
          </el-table-column>
          <el-table-column
            prop="is_group"
            label="集团码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_group === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_permanent"
            width="150"
            label="永久账户">
            <template slot-scope="scope">
              <span v-if="scope.row.is_permanent === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="posting_flag"-->
          <!--label="结账周期">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="reminder_msg"-->
          <!--label="催账文字">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="msg_num"
            label="催账次数">
          </el-table-column>
          <el-table-column
            prop="reference_id"
            label="档案编号">
          </el-table-column>
          <el-table-column
            prop="ar_status"
            label="账户状态">
            <template slot-scope="scope">
              <span v-if="scope.row.ar_status === 0">有效</span>
              <span v-else-if="scope.row.ar_status === 1">结清账户</span>
              <span v-else-if="scope.row.ar_status === 2">限制使用账户</span>
              <span v-else-if="scope.row.ar_status === 3">黑名单账户</span>
              <span v-else>异常</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="credit_limit"
            label="信用限额">
          </el-table-column>
          <el-table-column
            prop="guarantor_type.desc"
            label="担保类型">
          </el-table-column>
          <el-table-column
            prop="guarantor_id"
            label="担保人">
          </el-table-column>
          <el-table-column
            prop="sales_id.real_name"
            label="销售员">
          </el-table-column>
          <el-table-column
            prop="contact"
            label="联系人">
          </el-table-column>
          <el-table-column
            prop="charge_need_pay"
            label="未结帐单">
          </el-table-column>
          <el-table-column
            prop="pay_sum_after_last "
            label="未结付款">
          </el-table-column>
          <el-table-column
            prop="reference_type"
            label="客户类型">
            <template slot-scope="scope">
              <span v-if="scope.row.reference_type === 0">协议公司</span>
              <span v-else-if="scope.row.reference_type === 1">客人</span>
              <span v-else-if="scope.row.reference_type === 2">团队</span>
              <span v-else>临时客帐</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_user.real_name"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="150"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="modify_time"
            width="150"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="modify_user.real_name"
            label="修改用户">
          </el-table-column>

          <el-table-column
            prop="address"
            width="230 "
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="cancel(scope.row,scope.row.id,scope.$index, income_list)">删除
              </el-button>
              <el-button size="mini"
                         @click="amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
              </el-button>
              <el-button size="mini" type="primary"
                         @click="payment_dialogVisible = true;paying(scope.row,scope.row.id,scope.$index, income_list) ">付款
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
        :close-on-click-modal='false'
        width="46%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name">{{ title }}</span>
        </div>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="新增AR账户" name="first" size="mini">
            <ul class="dialog_style" style="margin-top: 10px">
              <li>
                <span><i style="color: red;font-size: 18px">*</i>AR账户名称 ：</span>
                <el-input v-model="param.name" placeholder="请输入账户名称" style="width: 200px;" size="mini"></el-input>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px">*</i>信用限额 ：</span>
                <el-input v-model="param.credit_limit" placeholder="请输入信用限额" style="width: 200px;" size="mini"
                          oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px">*</i>客户类型 ：</span>
                <el-select v-model="reference_type" placeholder="请选择客户类型" style="width: 200px;" @change="options_type"
                           clearable size="mini">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span> <i style="color: red;font-size: 18px">*</i>担保类型 ：</span>
                <el-select v-model="guarantor_type" placeholder="请选择担保类型" style="width: 200px;" @change="assure_type"
                           clearable size="mini">
                  <el-option
                    v-for="item in assure"
                    :key="item.value"
                    :label="item.descript"
                    :value="item.id +','+ item.code">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>档案编号 ：</span>
                <el-select v-model="reference_id" placeholder="请选择档案编号" style="width: 200px;" clearable size="mini"
                           @focus="focus_type">
                  <el-option
                    v-for="item in file_number"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>

              <li>
                <span>担保人 ：</span>
                <el-select v-model="guarantor_id" filterable placeholder="请选择担保人" style="width: 200px;" clearable
                           size="mini" @focus="guarantor_value">
                  <el-option
                    v-for="item in bondsman"
                    :key="item.value"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>

              <li>
                <span>销售员 ：</span>
                <el-select v-model="sales_id" placeholder="请选择销售员" style="width: 200px;" clearable size="mini">
                  <el-option
                    v-for="item in bonds_list"
                    :key="item.value"
                    :label="item.real_name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px">*</i>账户状态 ：</span>
                <el-select v-model="ar_status" placeholder="请选择账户状态" style="width: 200px;" clearable size="mini">
                  <el-option
                    v-for="item in condition"
                    :key="item.value"
                    :label="item.label"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>联系人 ：</span>
                <el-input v-model="param.contact" placeholder="请输入联系人" style="width: 200px;" size="mini"></el-input>
              </li>
              <li>
                <span>联系人电话 ：</span>
                <el-input v-model="param.contact_phone" placeholder="请输入联系人电话" maxlength="11" size="mini"
                          oninput="value=value.replace(/[^\d]/g,'')" style="width: 200px;"></el-input>
              </li>
              <li>
                <span>是否永久账户 ：</span>
                <el-radio v-model="is_permanent" label="1">是</el-radio>
                <el-radio v-model="is_permanent" label="0">否</el-radio>
              </li>
              <li v-if="group">
                <span>是否集团账户 ：</span>
                <el-radio v-model="is_group" label="1">是</el-radio>
                <el-radio v-model="is_group" label="0">否</el-radio>
              </li>
              <li>
                <span>是否周期性结帐 ：</span>
                <el-radio v-model="is_cycled" label="1">是</el-radio>
                <el-radio v-model="is_cycled" label="0">否</el-radio>
              </li>
              <li>
                <span>是否停用 ：</span>
                <el-radio v-model="is_halt" label="1">是</el-radio>
                <el-radio v-model="is_halt" label="0">否</el-radio>
              </li>

              <li v-if="is_cycled==='1'">
                <span><i style="color: red;font-size: 18px">*</i>结账周期：</span>
                <el-input v-model="param.ar_cycle" placeholder="结账周期，单位月" style="width: 200px;"
                          @blur.prevent="changeCount()" size="mini" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              </li>
              <li v-if="is_cycled==='1'">
                <span><i style="color: red;font-size: 18px">*</i>周期结账日：</span>
                <el-input v-model="param.ar_cycle_day" placeholder="每个周期最后一个月的几号" style="width: 200px;"
                          @blur.prevent="changeBlur()" size="mini" oninput="value=value.replace(/[^\d]/g,'')"></el-input>
              </li>
              <li v-else>

                <span><i style="color: red;font-size: 18px">*</i>结账日：</span>
                <el-date-picker
                  size="mini"
                  style="width: 200px;"
                  v-model="close_date"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder="请选择结账日">
                </el-date-picker>
              </li>
            </ul>
            <div class="dialog-footer" style="float: right;margin: 10px">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="允许记账" name="second">
            <ul class="dialog_style" style="margin-top: 10px">
              <el-tree
                :data="keep_accounts"
                ref="tree"
                node-key="pid"
                :default-checked-keys="checked_arr"
                show-checkbox
                :expand-on-click-node="true"
                node-contextmenu
                highlight-current
                @getCheckedKeys="getCheckedKeys(arrayId)"
                @check-change="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="position: absolute;right: 20px">
                    </span>
                 </span>
              </el-tree>
            </ul>
            <div class="dialog-footer" style="float: right;margin: 10px">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>

      </el-dialog>
      <!--点击付款显示的页面-->
      <el-dialog
        :visible.sync="payment_dialogVisible"
        :close-on-click-modal='false'
        width="55%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name" >{{ title }}</span>
        </div>
        <ul class="dialog_style" style="margin-left: 10px">
          <el-container>
            <el-aside width="260px" style="background: white;border-right:1px solid #dcdfe6 ">
              <ul style="overflow: hidden;width: 330px;margin-top: 10px">
                <li style="width: 100%;margin-bottom: 20px">
                  <span style="width: 80px;text-align: right;vertical-align: top">账户名称:</span>
                  <div style="width: 160px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px">{{account_name}}</div>
                </li>
                <li style="width: 100%;margin-bottom: 20px">
                  <span style="width: 80px;text-align: right;vertical-align: top">账户总消费:</span>
                  <div style="width: 160px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px">￥{{account_consume}}</div>
                </li>
                <li style="width: 100%;margin-bottom: 20px">
                  <span style="width: 80px;text-align: right;vertical-align: top">总付款:</span>
                  <div style="width: 160px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px;">￥{{account_payment}}</div>
                </li>
                <li style="width: 100%;margin-bottom: 20px">
                  <span style="width: 80px;text-align: right;vertical-align: top">账户余额:</span>
                  <div style="width: 160px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px;color: orange">￥{{account_balance}}</div>
                </li>

                <li style="width: 100%;margin-bottom: 20px">
                  <span style="width: 80px;text-align: right;vertical-align: top">总开票金额:</span>
                  <div style="width: 160px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px;">￥{{account_ticket}}</div>
                </li>

                <li style="width: 100%;margin-bottom: 20px">
                  <span style="width: 80px;text-align: right;vertical-align: top">可开票金额:</span>
                  <div style="width: 160px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px;color: #a4da89">￥{{account_surplus_ticket}}</div>
                </li>
                <li style="width: 100%;">
                  <span style="width: 80px;text-align: right;vertical-align: top">应支付:</span>
                  <div style="width: 160px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px;color: red">￥{{account_negation}}</div>
                </li>
              </ul>
            </el-aside>
            <!--右侧的列表-->
            <el-main style="padding: 10px">
              <div class="status" style="height: 50%">
                <div style="overflow: hidden;margin-bottom: 10px">
                  <span>账户消费明细</span>
                  <el-button type="info" plain size="mini" style="float: right;margin-right: 10px" @click="drawer">开票</el-button>
                  <el-button  plain size="mini" style="float: right;margin-right: 10px" @click="transfer_accounts">转账</el-button>
                  <el-button type="primary" size="mini" style="float: right;" @click="payment_click">付款</el-button>
                </div>
                <el-table
                  ref="multipleTable"
                  :row-class-name="tableRowClassName"
                  :data="particulars_list"
                  tooltip-effect="dark"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                  size="mini"
                  :row-key="getRowKeys"
                  height="300px"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    fixed="left"
                    type="selection"
                    :selectable="handleDisable"
                    :reserve-selection="true">
                  </el-table-column>
                  <el-table-column
                    prop="id"
                    fixed="left"
                    label="账户id">
                  </el-table-column>
                  <el-table-column
                    prop="desc"
                    width="230"
                    label="来源">
                  </el-table-column>
                  <el-table-column
                    prop="biz_date"
                    width="120"
                    label="建账营业日期">
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

                  <el-table-column
                    prop="account_id.team_id"
                    label="是否团队"
                    width="100"
                    column-key="name">
                    <template slot-scope="scope">
                      <span v-if="scope.row.account_id.team_id ===null">非团队账户</span>
                      <span v-else>团队账户</span>
                    </template>
                  </el-table-column>
                  <!-- :filters="account_data"-->
                  <el-table-column
                    prop="account_id.team_id"
                    label="团队号"
                    width="100">
                  </el-table-column>
                  <el-table-column
                    prop="pay_status"
                    fixed="right"
                    width="100"
                    label="支付状态">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pay_status === 1 && ! scope.row.related_transfer_detail">结清</span>
                      <!--/挂账-->
                      <span v-else-if="scope.row.pay_status === 2">转账</span>
                      <!--<span v-else-if="scope.row.pay_status === 1 ">部分支付</span>-->
                      <span v-else>未付清</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="charge_amount"
                    fixed="right"
                    label="消费金额">
                  </el-table-column>
                  <el-table-column
                    prop="can_arrange"
                    fixed="right"
                    label="待支付金额">
                  </el-table-column>
                  <!-- 账户中的可用余额 = 总付款 + 总退款 + 广义消费统计  负数代表客户的付款有盈余, 正数代表客户的付款不足.-->
                </el-table>
                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next,jumper"
                               :page-size="pagesize_advocate"
                               @current-change="handle_advocate"
                               :total="total_advocate">
                </el-pagination>

              </div>
            </el-main>
          </el-container>

        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="payment_dialogVisible = false" type="danger" plain  size="mini">退出</el-button>
             </span>
      </el-dialog>
      <!--选择多个消费清单的付钱页面-->
      <el-dialog
        :visible.sync="pointAccountDialog_all"
        :close-on-click-modal='false'
        width="26%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul class="dialog_" style="margin-left: 10px">
          <el-container>
            <el-aside width="100%" style="background: white">
              <ul style="margin-top: 20px;margin-left: 50px">
                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支类型：</span>
                  <el-radio-group v-model="collect_pay" @change="in_out__type" disabled>
                    <el-radio :label="'in'">收</el-radio>
                    <el-radio :label="'out'">支</el-radio>
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

                <li>
                  <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>收支金额：</span>
                  <el-input v-model="pay_amount_money" clearable placeholder="请输入支付金额" style="width: 220px;" size="mini"
                            onkeyup="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')" disabled></el-input>
                </li>
                <li>
                  <span style="vertical-align: top;padding-left: 20px;width: 100px;">摘要：</span>
                  <textarea cols="30" rows="8" v-model="abstract"
                            style="width: 220px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                            size="mini"></textarea>
                </li>
              </ul>
            </el-aside>
          </el-container>

        </ul>
        <div slot="footer" class="dialog-footer">
          <el-button @click="pointAccountDialog_all = false" size="mini">取消</el-button>
          <el-button v-if="scan_code_show " @click="article_number()" type="primary" size="mini">结算</el-button>
          <el-button v-else  @click="pay_money_all()" type="primary" size="mini">结算</el-button>
        </div>
      </el-dialog>
      <!--开票页面-->
      <el-dialog
        title="开票"
        :visible.sync="invoice_dialogVisible"
        :close-on-click-modal='false'
        width="26%"
        :before-close="handleClose">
        <ul class="dialog_" style="margin-left: 10px;margin-top: 10px">
          <li>
            <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票编号：</span>
            <el-input v-model="invoice_number" clearable placeholder="请输入内容" style="width: 220px;"
                      size="mini"></el-input>
          </li>
          <li>

            <span> <i style="color: red;font-size: 18px;margin-right: 10px">*</i>开票金额：</span>
            <el-input v-model="invoice_amount" clearable placeholder="请输入内容" style="width: 220px;"
                      @blur="opinion"
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
            <span style="vertical-align: top;padding-left: 20px">备注：</span>
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
        <ul class="dialog_" style="margin-left: 10px;margin-top: 10px">
          <li>
            <span>结账金额：</span>
            <span>￥{{pay_amount_money}}</span>
          </li>
          <li style="margin-top: 20px">
            <span style="width:168px ">请使用扫码枪扫描二维码：</span>
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
          <li style="width: 100% ;margin-top: 20px">
            <img :src="img_src" alt="" style="margin-left: 24%">
          </li>
        </ul>
        <ul v-else>
          <li>
            <!--<canvas id="canvas"></canvas>-->
            <div id="qrcode" ref="qrcode" style="margin-left: 25%;margin-top: 20px"></div>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <!--<el-button @click="dialog_alipay = false">取 消</el-button>-->
          <!--<el-button type="primary" @click="payment_ensure ">确 定</el-button>-->
            </span>
      </el-dialog>
      <!--支付成功后显示的页面-->
      <el-dialog
        :visible.sync="dialog_succeed"
        :close-on-click-modal='false'
        width="40%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul style="margin-top: 40px">
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
      <!--transfer_dialogVisible-->
      <!--转账显示的页面-->
      <el-dialog
        :visible.sync="transfer_dialogVisible"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul >
          <li >
            <span>转出账账户：</span>
            <div style="width: 200px;height: 28px;line-height: 28px;padding-left: 10px;border: 1px solid rgb(220, 223, 230) ;border-radius: 4px;display: inline-block">{{account_name}}</div>
          </li>
          <li style="margin-top: 10px">
          <span>转入账账户：</span>
          <el-select v-model="shift_to" placeholder="请选择" size="mini" style="width: 200px;">
            <el-option
              v-for="item in income_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
          <li style="margin-top: 10px">
            <span>操作收银点：</span>
            <el-select v-model="register_data" placeholder="请选择" size="mini" style="width: 200px;">
              <el-option
                v-for="item in register_list"
                :key="item.id"
                :label="item.desc"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li style="margin-top: 10px">
            <span style="width: 80px;text-align: right;vertical-align: top">转出金额：</span>
            <div style="width: 200px;height: 28px;border-bottom: 1px solid #dcdfe6;display: inline-block;padding-left: 10px;color: red;margin-left: 10px">￥{{charge_allamount}}</div>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
              <el-button @click="transfer_dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click=" succeed_transfer" size="mini">确 定</el-button>
            </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcodejs2'
  export default {
    name: "ar_account",
    data() {
      return {
        url: this.api.api_9022_9519,
        title: '',
        //分页
        total: 10,
        pagesize: 10,
        dialogVisible: false,//修改页面的显示和隐藏
        income_list: [],//AR账户列表
        //客户类型
        options: [
          {
            id: 0,
            label: '协议公司'
          }, {
            id: 1,
            label: '客人'
          }, {
            id: 2,
            label: '团队'
          }
          , {
            id: 3,
            label: '临时客帐'
          }
        ],
        //担保类型
        assure: [],

        //状态
        condition: [
          {
            id: 0,
            label: '有效'
          }, {
            id: 1,
            label: '结清账户'
          }, {
            id: 2,
            label: '限制使用账户'
          }, {
            id: 3,
            label: '黑名单账户'
          }
          , {
            id: 4,
            label: '异常'
          }
        ],

        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        bonds_list: [],//销售员
        param: {},//新增入账代码里的内容

        //  账户设置的内容
        reference_id: '',//档案编号
        credit_limit: '',//信用限额
        sales_id: '',//销售员
        guarantor_id: '',//担保人
        reference_type: '',//客户类型
        guarantor_type: '',//担保类型
        ar_status: '',//账户状态
        is_permanent: 0,//是否永久账户
        is_cycled: '',//是否结账周期客户
        ar_cycle: '',//结账周期
        ar_cycle_day: '',//周期结账日
        close_date: '',//非周期结账日
        is_halt: 0,//是否停用
        is_group: '',//是否集团账户
        group:false,//判断是否显示是否集团码
        name: '',//账户名称
        contact_phone: '',//联系人电话
        contact: '',//联系人
        //筛选条件
        is_groups: false,//是否集团码
        is_halts: false,//是否停用

        /*
        * 客户类型选择
        * */
        file_number: [],//档案编号后台获取
        url_api: '',//请求档案编号的url

        /*
        * 担保类型
        *
        * */

        bondsman: [], //担保人后台获取
        assure_api: '',
        dataarr: [],
        /**table*/
        activeName: 'first',
        /**判断客户类型是否选择了*/
        value_data: '',
        /**判断担保类型是否选择*/
        guarantor_data: '',
        /**付款显示的页面*/
        payment_dialogVisible:false,
        particulars_list:[],//AR帐下的消费明细
        major_account_id:'',//AR帐的主帐id
        //保存选中的id;
        getRowKeys(row) {
          return row.id;
        },
        pagesize_advocate:8,
        total_advocate:8,
        account_name:'',//账户名称
        account_consume:'',//账户消费
        account_balance:'',//账户余额
        account_payment:'',//账户总付款
        account_negation:'',//应支付
        account_ticket:'',//总开票金额
        account_surplus_ticket:'',//可开票金额
        keep_accounts:[],//记账
        routing_id: [],//选中的消费清单id
        routing_money_id:[],//所选中的账户金额
        pointAccountDialog_all:false,//选中的消费明细点击付款显示的页面
        collect_pay:'in',//收支种类
        settle_accounts: '',//账户id
        cope_with_money: '',//应付金额
        pay_mode: '',  //付款方式
        pay_data: [],//支出方式
        scan_code: '0',//扫码方式
        source: '',//入账来源
        abstract: '',//摘要
        pay_reason: '', // 业务种类
        pay_income_list: [],//支付款原因
        code_income_data:'',//入账代码
        pay_amount_money: '',//支付金额
        code_incoming_list: [],//查询收支类型为out的入账代码
        details:[],//选中的消费
        checked_arr:[],
        //开票内容
        invoice_dialogVisible: false,
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
        /**开票页面*/
        invoice_number: '',
        invoice_type: '',
        issued_date: '',
        invoice_amount: '',
        invoice_title: '',
        invoice_desc: '',
        /**支付宝，微信页面*/
        dialog_alipay:false,
        scan_code_show: false,//扫码方式出现
        dialog_succeed: false,//支付成功或者失败显示的页面
        ihatetheqrcode: true,//扫码成功后的提示
        pay_amount_money_code: '',//扫码得到的码
        img_wz: true,//微信和支付宝的二维码
        img_src: '',//微信的二维码
        dialog_img:false,
        timer_r: '',//定时器
        timer_src: "",//开启循环
        p_id : "",//父级id
        /**转账*/
        transfer_dialogVisible:false,
        shift_to:'',//转入账户id,
        charge_allamount:'',//转账总额
        register_list:[],//所有收银点
        register_data:'',//选择的收银点
      }
    },
    created: function () {
      let that = this;
      that.enter_code();//获取AR账户设置
      that.employ();//获取销售人员
      // that.employee();//获取担保人

    },
    components: {QRCode},
    methods: {
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      //封装获取人员列表
      employee() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/employee/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              that.bondsman = res.data.data.list;
              that.dataarr = that.bondsman.map((res, index) => {
                return {
                  name: res.real_name,
                  id: res.id,
                }
              })
              console.info(that.dataarr);
              that.bondsman = that.dataarr;
              // that.guarantor_id = that.bondsman[0].id;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取销售人员列表
      employ() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/employee/info_list",
          method: "get",
          params:{
            page_size:999,
            // include_root:1,
            // include_self:1,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.bonds_list = res.data.data.list;
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
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          credit_limit: '',//信用限额
          ar_cycle: '',//结账周期
          ar_cycle_day: '',//周期结账日
          name: '',
          contact: '',
          contact_phone: '',

        }
        that.reference_type = '',//客户类型
          that.reference_id = '',//档案编号
          that.guarantor_type = '',//担保类型
          that.guarantor_id = '',//担保人
          that.sales_id = '',//销售员
          that.ar_status = '',//账户状态
          that.is_permanent = "1",//是否永久账户
          that.is_halt = '0',//是否停用
          that.is_cycled = '1',
          that.close_date = ''//非周期结账日
        that.is_group = ''//是否集团

      },
      //筛选条件--是否永久账户
      screen() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/ar_account/info_list",
          method: "post",
          data: {
            is_permanent: that.is_groups ? 1 : 0,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
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
      //筛选条件--是否停用
      screen_halt() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/ar_account/info_list",
          method: "post",
          data: {
            is_halt: that.is_halts ? 1 : 0
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(that.is_halts);
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
      /**判断时不是大于12小于1*/
      changeCount() {
        let that = this;
        console.log(that.param.ar_cycle);
        if (parseInt(that.param.ar_cycle) > 12 || parseInt(that.param.ar_cycle) < 1) {
          that.hintInfo("warning", "结账周期不能大于12或者小于1")
        }
      },
      /**判断周期结账日不能大于31或者小于1*/
      changeBlur() {
        let that = this;
        if (parseInt(that.param.ar_cycle_day) > 31 || parseInt(that.param.ar_cycle_day) < 1) {
          that.hintInfo("warning", "周期结账日不能大于31或者小于1")
        }
      },
      //封装获取AR账户设置
      enter_code() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/finance/ar_account/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list);
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
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/ar_account/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            is_halt: that.is_halts ? 1 : 0,
            is_permanent: that.is_groups ? 1 : 0,
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.income_list=res.data.data.list
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
      cancel(srow,id, index, list) {
        console.log(srow,id);
        let that = this;
        // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if(srow.is_group===1){
          if( root_level===2){
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
                url: "" + that.url + "/v1/finance/ar_account/remove/" + id,
                method: "get",
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
          }else {
            that.hintInfo("warning", "权限不足")
          }
        }else if(srow.is_group===0) {
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
              url: "" + that.url + "/v1/finance/ar_account/remove/" + id,
              method: "get",
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
        }

      },
      //点击修改
      amend(srow, id, index, list) {
        let that = this;
        // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if(srow.is_group===1){
          if( root_level===2){
            that.group=true;
            that.Edite = true;
            that.dialogVisible = true;
          }else {
            that.hintInfo("warning", "权限不足")
          }
        }else if(srow.is_group===0) {
          that.group=false;
          that.Edite = true;
          that.dialogVisible = true;
        }
        that.id = id;
        console.log(srow);
        that.title = "修改AR账户设置";
        that.options= [
          {
            id: 0,
            label: '协议公司'
          }, {
            id: 1,
            label: '客人'
          }, {
            id: 2,
            label: '团队'
          }
          , {
            id: 3,
            label: '临时客帐'
          }
        ];
        that. recorded();//获取入账代码树状
          that.allow_accounts(id);//拿到AR账户的允许记账的id
        let code = srow.guarantor_type.code+"",code_id= srow.guarantor_type.id+"";
        //  账户设置的内容
         that.param.name = srow.name,
          that.reference_id = srow.reference_id;//档案编号
          that.param.credit_limit = srow.credit_limit;//信用限额
           if(srow.sales_id){
             that.sales_id = srow.sales_id.id//销售员
           }

        that.reference_type = srow.reference_type;//客户类型;
        that.options_type(srow.reference_type);//客户类型
        if(srow.reference_type){
          that.guarantee_type();
        }
        console.log(that.reference_type);
          that.guarantor_type = code_id+','+code;//担保类型
        that.assure_type(that.guarantor_type);//担保类型
        that.guarantor_id = srow.guarantor_id;//担保人
          that.ar_status = srow.ar_status;//账户状态
          that.is_permanent = srow.is_permanent + "";//是否永久账户
          that.is_halt = srow.is_halt + "";//是否停用
        that.is_cycled = srow.is_cycled + "";
        that.param.contact_phone = srow.contact_phone;
        that.param.contact = srow.contact;
        that.is_group = srow.is_group + "";
        if (that.is_cycled === '1') {
          that.param.ar_cycle = srow.ar_cycle;
          that.param.ar_cycle_day = srow.ar_cycle_day;
        } else {
          that.close_date = srow.close_date;
        }
      },
      /**封装获取AR账户下的允许记账*/
      allow_accounts(item_id){
        let that =this;
        that.$axios({
          url:that.url+"/v1/finance/ar_account/get_info/"+item_id,
          method:"get",
        })
          .then(res=>{
            if(res.data.message==="success")
            console.log(res);
            let checked_data = res.data.data.allowed_codes;
            let arr =[];
            for(let item of checked_data){
              arr.push(item.code_pay_for+"_"+item.id)
            }
            // console.log(arr);
            that.checked_arr = arr;
            that.$refs.tree.setCheckedKeys(that.checked_arr);
            that.flag=false;   //为了避免一进来就调节点选中状态变化的函数  。先让他为false这样就不走下面的函数访问接口啦
            setTimeout(
              function(){
                that.flag=true;
              },
              500)   
          })
          .catch(error=>{
            console.log(error);
          })
      },
      /**点击新增ar账户设置*/
      add_title() {
        let that = this;
        // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if(root_level===2){
          that.group=true;
          that.is_group="1";
          that.dialogVisible = true;
          that.title = "新增AR账户设置";
          that.guarantee_type();//获取担保类型
          that. recorded();//获取入账代码树状
        }else {
          that.group=false;
          that.is_group="0";
          that.dialogVisible = true;
          that.title = "新增AR账户设置";
          that.guarantee_type();//获取担保类型
          that. recorded();//获取入账代码树状
        }
      },
      //点击AR帐新增和修改后的保存
      ensure() {
        let that = this;
        let arr = [],checked_arr=[];
        checked_arr=this.$refs.tree.getCheckedKeys(that.checked_arr);
        for(let item of checked_arr){
          item = item.split("_")[1];
          arr.push(parseInt(item));
        }
        console.log(arr);
        let guarantor_type = that.guarantor_type.split(",")[0];
        if (that.is_cycled === '1' ) {
          if (that.param.credit_limit === '' || that.reference_type === ''  || that.guarantor_type === ''
             || that.ar_status === '' || that.param.ar_cycle === ''
            || that.param.ar_cycle_day === '' || that.param.name === ''
          ) {
            that.hintInfo("warning", "*为必填项")
          }
          else {
            // if(that.param.contact_phone!==""){
            //   let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            //   if (!tel.test(that.param.contact_phone)) {
            //     that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
            //   }
            // }else

            if (parseInt(that.param.ar_cycle_day) > 31 || parseInt(that.param.ar_cycle_day) < 1) {
              that.hintInfo("warning", "周期结账日不能大于31或者小于1")
            } else if (parseInt(that.param.ar_cycle) > 12 || parseInt(that.param.ar_cycle) < 1) {
              that.hintInfo("warning", "结账周期不能大于12或者小于1")
            } else {
              let urldata = that.Edite ? (that.url + "/v1/finance/ar_account/update/" + that.id) : (that.url + "/v1/finance/ar_account/add");
              console.info(urldata);
              that.$axios({
                url: urldata,
                method: "post",
                data: {
                  //  入账代码的内容
                  reference_id: that.reference_id,//档案编号
                  credit_limit: that.param.credit_limit,//信用限额
                  sales_id: that.sales_id,//销售员
                  guarantor_id: that.guarantor_id,//担保人
                  reference_type: that.reference_type,//客户类型
                  guarantor_type: parseInt(guarantor_type),//担保类型
                  ar_status: that.ar_status,//账户状态
                  is_permanent: that.is_permanent + "",//是否永久账户
                  is_halt: that.is_halt + "",//是否停用
                  is_group: that.is_group + "",//是否集团码
                  name: that.param.name,//账户名称
                  is_cycled: that.is_cycled + "",//是否周期性结帐客户
                  ar_cycle: that.param.ar_cycle,//结账周期
                  ar_cycle_day: that.param.ar_cycle_day,//周期结账日
                  contact_phone: that.param.contact_phone,
                  contact: that.param.contact,
                  allowed_codes:JSON.stringify(arr),
                },

              })
                .then(res => {
                  if (res.data.message === "success") {
                    that.enter_code();
                    that.dialogVisible = false;
                    if (that.Edite) {
                      that.hintInfo("success", "修改AR账户设置成功")
                    } else {
                      that.hintInfo("success", "新增AR账户设置成功")
                    }
                  }
                  else {
                    if (that.Edite) {
                      that.hintInfo("warning", "修改AR账户设置失败---" + res.data.message)
                    } else {
                      that.hintInfo("warning", "新增AR账户设置失败--" + res.data.message)
                    }
                  }
                })
                .catch(error => {
                  console.log(error);

                });
            }
          }
        }
        else {
          console.log(2);
          if (that.param.credit_limit === '' || that.reference_type === ''
            || that.guarantor_type === ''  || that.ar_status === ''
            || that.close_date === '' || that.param.name === ''
          ) {
            that.hintInfo("warning", "*为必填项")
          } else {
             if (parseInt(that.param.ar_cycle_day) > 31 || parseInt(that.param.ar_cycle_day) < 1) {
              that.hintInfo("warning", "周期结账日不能大于31或者小于1")
            } else if (parseInt(that.param.ar_cycle) > 12 || parseInt(that.param.ar_cycle) < 1) {
              that.hintInfo("warning", "结账周期不能大于12或者小于1")
            } else {
              let urldata = that.Edite ? ("" + that.url + "/v1/finance/ar_account/update/" + that.id) : ("" + that.url + "/v1/finance/ar_account/add");
              console.info(urldata);
              that.$axios({
                url: urldata,
                method: "post",
                data: {
                  //  入账代码的内容
                  reference_id: that.reference_id,//档案编号
                  credit_limit: that.param.credit_limit,//信用限额
                  sales_id: that.sales_id,//销售员
                  guarantor_id: that.guarantor_id,//担保人
                  reference_type: that.reference_type,//客户类型
                  guarantor_type: guarantor_type,//担保类型
                  ar_status: that.ar_status,//账户状态
                  is_group: that.is_group + "",//是否集团码
                  name: that.param.name,//账户名称
                  is_permanent: that.is_permanent + "",//是否永久账户
                  is_halt: that.is_halt + "",//是否停用
                  is_cycled: that.is_cycled + "",//是否周期性结帐客户
                  close_date: that.close_date,
                  contact_phone: that.param.contact_phone,
                  contact: that.param.contact,
                  allowed_codes:JSON.stringify(arr),
                },

              })
                .then(res => {
                  if (res.data.message === "success") {
                    that.enter_code();
                    that.dialogVisible = false;
                    if (that.Edite) {
                      that.hintInfo("success", "修改AR账户设置成功")
                    } else {
                      that.hintInfo("success", "新增AR账户设置成功")
                    }
                  }
                  else {
                    that.error("新增失败")
                    console.log(res.data.message);
                  }
                })
                .catch(error => {
                  console.log(error);
                  if (that.Edite) {
                    that.hintInfo("warning", "修改AR账户设置失败")
                  } else {
                    that.hintInfo("warning", "新增AR账户设置失败")
                  }
                });
            }
          }
        }
      },
      /*
      * 客户类型
      * */
      //options_type  客户类型的选择
      options_type(value) {
        let that = this;
        console.log(value);
        that.value_data = value;
        if (value === 0) {
          that.url_api = that.api.api_member_9102 + '/v1/customer/company/get_company_base_list/';
          that.archives_type();//获取档案编号
        } else if (value === 1) {
          that.url_api = that.api.api_member_9102 + '/v1/customer/guest/get_guest_base_list/?sys_cat=F';
          that.archives_type();//获取档案编号
        } else if (value === 2) {
          that.url_api = that.api.api_member_9102 + '/v1/customer/guest/get_guest_base_list/?sys_cat=G';
          that.archives_type();//获取档案编号
        } else {
          that.url_api = '';
          that.full_name = '';
          that.file_number = [];
          that.reference_id = '';
        }
      },
      //获取档案编号
      archives_type() {
        let that = this
        that.$axios({
          url: that.url_api,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              // console.log(res.data.data.results)
              that.file_number = res.data.data.results
              if (res.data.data.count !== 0) {
                that.reference_id = res.data.data.results[0].id
              } else {
                that.reference_id = ''
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
      /**
       * 担保类型*/
      /**获取担保类型*/
      guarantee_type() {
        let that = this;
        that.$axios({
          url: that.api.api_code_9103 + "/v1/system/settings/get_code_base_list/?parent_code=guarantee",
          method: "get",
          params: {
            page_size: 999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.assure = res.data.data.results;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //担保类型的选择
      assure_type(value) {
        let that = this;
        let code;
        that.guarantor_data = value;
        console.log(value);
        if(typeof value ==="string"){
          code = value.split(",")[1];
        }
        if (code === '002') {
          //宾客信息的api
          that.assure_api = that.api.api_member_9102 + '/v1/customer/guest/get_guest_base_list/';
          that.archives_number();//获取担保人
        } else if (code === '001') {
          //团队信息到的api
          that.assure_api = that.api.api_member_9102 + '/v1/customer/guest/get_guest_base_list/?sys_cat=G';
          that.archives_number();//获取担保人
        } else if (code === '004') {
          //协议单位的api
          that.assure_api = that.api.api_member_9102 + '/v1/customer/company/get_company_base_list/';
          that.archives_number();//获取担保人
        } else if (code === '005') {
          //员工的api
          that.employee()
          // that.archives_number();//获取担保人
        }

      },
      //获取担保人
      archives_number() {
        let that = this
        that.$axios({
          url: that.assure_api,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.results)
              that.bondsman = res.data.data.results;
              if (res.data.data.count !== 0) {
                that.guarantor_id = res.data.data.results[0].id;
              } else {
                that.guarantor_id = ''
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
      //判断客户类型是否选择
      focus_type() {
        let that = this;
        if (that.value_data === '') {
          that.hintInfo("warning", "请先选择客户类型")
        }
      },
      //判断担保类型是否选择
      guarantor_value() {
        let that = this;
        if (that.guarantor_data === "") {
          that.hintInfo("warning", "请先选择担保类型")
        }
      },
      //修改页面的显示和隐藏
      handleClose(done) {
        let that =this;
        done();
        clearInterval(that.timer_r);
        clearInterval(that.timer_src);
        this.timer = 0;
      },
      /**table*/
      handleClick(tab, event) {
        console.log(tab, event);
      },
      /**组合树状图
       *
       * 首先获取入账代码，从里面拿到收付款原因，当作父级
       * 入账代码 当作子级
       * */
      //封装获取付款原因和入账代码组成的二级的树形结构
      recorded() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/incoming_account_code/get_tree",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              for(let item of res.data.data){
                for(let checked of item.children){
                  checked.pid = item.id +"_"+checked.id;
                  //children_arr.push(checked.id)
                }
              }
              that.keep_accounts = res.data.data;
              let arr= [];
              for(let i of that.keep_accounts){
                for(let s of i.children){
                  arr.push(s.pid);
                }
              }
              that.checked_arr = arr;
              // console.log(that.checked_arr);
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },

      /**树状数据点击事件*/
      handleNodeClick(data, e){
        // console.log(data);
      },

      defaultProps(){

      },
      /**付款*/
      /**获取AR帐的消费明细*/
      detail_data(){
        let that =this;
        let arr=[];
        arr.push( that.major_account_id);
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids",
          method:"post",
          data:{
            account_ids:JSON.stringify(arr),
            page_size:8,
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message="success") {
              that.particulars_list = res.data.data.list;
              that.total_advocate = res.data.data.total_count;
              that.detail_entire();//获取总消费
            }
          })
          .catch(error=>{
            console.log(error);
          })
      },
      //获取总消费，总付款，总开票
      detail_entire(){
        let that =this;
        let arr=[];
        arr.push( that.major_account_id);
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids",
          method:"post",
          data:{
            account_ids:JSON.stringify(arr),
            page_size:999,

          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message="success"){
              // that.particulars_list=res.data.data.list;
              // that.total_advocate = res.data.data.total_count;
              let account_consume=0,account_payment=0;
              /**计算总付款*/
              for(let i=0;i<res.data.data.list.length;i++){
                account_consume += res.data.data.list[i].charge_amount;
                if(res.data.data.list[i].pay_status===1){
                  console.log(res.data.data.list[i].charge_amount);
                  account_payment += res.data.data.list[i].charge_amount
                }
              }
              console.log(account_payment);
              that.account_consume= parseFloat(account_consume).toFixed(2)   ;//账户消费
              that.account_payment=parseFloat(account_payment).toFixed(2);//账户总付款
              that.account_balance= parseFloat(that.account_payment - that.account_consume).toFixed(2) ;//账户余额
              that.account_negation = -(that.account_balance);
              that.account_ticket =that.particulars_list[0].account_id.total_invoice;//已开票金额
              //可开金额
              if((that.account_payment - that.account_ticket)>0){
                that.account_surplus_ticket = parseFloat(that.account_payment - that.account_ticket).toFixed(2)
              }else {
                that.account_surplus_ticket=0
              }
            }
          })
          .catch(error=>{
            console.log(error);
          })
      },
      /**点击开票*/
      drawer(){
        let that =this;
        let item_arr=[];
        for(let item of that.details ){
          if(item.pay_status===0){
            item_arr.push(item);
          }
        }
        if(that.routing_id .length>0 && item_arr.length===0){
          console.log("成功");
         that.invoice_dialogVisible=true;
        }else {
          that.hintInfo("warning", "请正确选择需要开票的消费，禁止选择未结账户")
        }
        console.log(item_arr);
      },
      /**判断是否超出了可开票金额*/
      opinion(){
        let that = this;
        if(that.invoice_amount>that.account_surplus_ticket){
          that.hintInfo("warning", "已超出可开票金额")
        }
      },
      /**开票确定*/
      invoice_ticket() {
        let that =this;
        if (that.invoice_number === '' || that.invoice_type === '' || that.invoice_amount === '' || that.invoice_title === '' || that.issued_date === '') {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.url + "/v1/finance/invoice_detail/add",
            method: "post",
            data: {
              account_id: that.major_account_id,//被查的账户id
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
                that.detail_data();
                that.invoice_dialogVisible = false;
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
      /**选择了业务种类以后，要根绝选择的业务种类去筛选入账代码*/
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
      /** 多选消费清单付款*/
      payment_click() {
        let that = this;
        //用来刷新数据的
        that.pay_mode='';
        that.pay_reason="";
        that.code_income_data="";
        /**这里要判断是不是选中了已结清账户*/
        let item_arr=[];
        console.log(that.details);
        for(let item of that.details ){
          if(item.pay_status===1 ||item.pay_status===2){
            item_arr.push(item);
          }
        }
        console.log(item_arr);
        if(that.routing_id .length>0 && item_arr.length===0){
          that.title = "付钱";
          that.income_expend();//获取支付方式
          that.pointAccountDialog_all = true;
          that.cope_with_money = that.gross_amount;//应付金额
          that.pay_amount_money = that.gross_amount;//应收支金额
          let details = that.details[0];

          that.collect_pay = details.in_or_out;
          if (that.collect_pay) {
            that.pay_enter_code();//业务种类
          }
          let pay_string = details.code_income_type_id.code_pay_for + ""
          that.pay_reason = pay_string + ',' + details.code_income_type_id.in_or_out;//业务种类
          if(that.pay_reason!==""){
            that.get_by_hotel();//查询入账代码
            that.code_income_data = details.code_income_type_id.id ; //入账代码
          }
        }else {
          that.hintInfo("warning", "请正确选择需要付款的消费，禁止选择已结清账户")
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
              console.log(res.data.data.alipay_trade_precreate_response.qr_code);
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
            spbill_create_ip: "47.98.113.173",//	生成订单的IP地址现在是写死数据，后期改
          },
        })
          .then(res => {
            if (res.data.message == "success") {
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
                  }
                  // else if (that.pointAccountDialog === true) {
                  //   that.point_pay_money();//单个消费清单
                  // } else {
                  //   that.pay_them_money()//主帐付钱
                  // }

                }

              })
              .catch(error => {
                console.log(error);
              });
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
            console.log(12);
            that.consumption_list_all();
          }
          // else if (that.pointAccountDialog === true) {
          //   that.consumption_list();
          // } else {
          //   that.fu_money();//付钱的确定
          // }
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
      //多个消费清单的付款接口
      consumption_list_all() {
        let that = this;
        console.log("成功");
        let code_pay_for_id = "";
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
            account_id: that.major_account_id,
            charge_ids: JSON.stringify(that.routing_id), //传入分帐前的账号
            pay_amount: parseFloat(that.pay_amount_money).toFixed(2),//支付金额 0
            in_or_out: that.collect_pay,//收支种类
            pay_mode_id: that.pay_mode,//付款方式
            code_pay_for_id: code_pay_for_id,//付款原因
            original_pay_id: order_from_id,//订单号
            code_income_type_id: that.code_income_data,//查询收支类型为out的入账代码
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.pointAccountDialog_all = false;
              // that.payment_dialogVisible = false;
             that.detail_data();//
             that.enter_code();//刷新AR帐
              that.hintInfo("success", "付款成功")
              /**初始化选中的内容，使其全部取消选中的状态*/
              if(that.details.length>0){
                that.toggleSelection();//初始化选中的内容，使其全部取消选中的状态
              }
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
      //点击AR帐的付款
      paying(srow, id, index, list){
         let that =this;
        console.log(srow);
        that.account_name = srow.name;
        that.major_account_id = srow.account_id.id;
        that.title="账户详情";
        that.detail_data();
        /**初始化选中的内容，使其全部取消选中的状态*/
          if(that.details.length>0){
            that.toggleSelection();//初始化选中的内容，使其全部取消选中的状态
          }
      },
      //初始化选中的内容
      toggleSelection(rows) {
        console.log(rows);
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      /**用来判断什么账户，显示不同颜色*/
      tableRowClassName({row, rowIndex}) {
       if (row.pay_status === 1 ) {
         return 'routing-row';
        }else if( row.pay_status === 2){
         return 'routing-zhuan';
       }
        return '';
      },
      /***选中某一项的消费明细*/
      handleSelectionChange(val) {
        console.log(val);
        let that = this;
        that.details = val;
        let routing_arr = [];
        let routing_money = [];
        let num_arr = [];
        let arr=[];

        for (let item  in val) {
          if (val[item].id) {
            routing_arr.push(val[item].id);
            routing_money.push(val[item].charge_amount);
            num_arr.push(val[item].pay_amount);
            // console.log(val[item].account_id.id);

          }

        };
        let add=0;
        for(let money of val){
          add+=money.charge_amount
        }
        that.charge_allamount =add;
        console.log(that.charge_allamount);
        for (let i = 0; i < val.length; i++) {
          console.log(val[i].id);
         arr.push(val[i].id)
        }
        that.routing_id = arr;
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
        console.log(sum, that.routing_id);
        //应支付总金额)
        that.gross_amount = parseFloat(sum).toFixed(2);
      },
      /** 多选消费清单的确定*/
      pay_money_all() {
        let that = this;
        //判断是不是为空
        if (that.pay_amount_money === "" || that.pay_mode === "" || that.pay_reason === '' || that.code_income_data === '') {
          that.hintInfo("warning", "*为必填项")
        }
        //如果不为空
        else {
          //判断是不是支付宝或者微信支付
          if (that.pay_mode === 1 || that.pay_mode === 38) {
            //判断是不是扫码枪支付
            if (that.scan_code === "0") {
              that.dialog_alipay = true;
              // that.scan_code_show = false
            }
            //如果不是扫码枪
            else {
              that.scan_code_show = true
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
      /***多选消费清单的转账*/
      transfer_accounts(){
        let that =this;
        /**这里要判断是不是选中了已结清账户*/
        let item_arr=[];
        console.log(that.details);
        that. cash_register();//收银点
        that.title="转账"
        for(let item of that.details ){
          if(item.pay_status===1){
            item_arr.push(item);
          }
        }
        console.log(item_arr);
        if(that.routing_id .length>0 && item_arr.length===0){
          console.log("成功");
          that.transfer_dialogVisible=true;
        }else {
          that.hintInfo("warning", "请正确选择需要转账的消费，禁止选择未结账户")
        }
        console.log(item_arr);
      },
      /**转账的确定*/
      succeed_transfer(){
         let that =this;
         that.$axios({
           method:"post",
           url:that.url+"/v1/finance/ar_account/batch_transfer",
           data:{
             ar_id:that.shift_to,
             charge_ids:JSON.stringify(that.routing_id),
             cashier:that.register_data
           }
         })
           .then(res=>{
             console.log(res);
             that.transfer_dialogVisible=false;
             that.detail_data();//消费明细
             that.hintInfo("success","转账成功")
           })
           .catch(err=>{
             console.log(err);
           })
      },
      /**封装获取收银点设置*/
      cash_register() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/cash_register/info_list",
          method: "get",
          params:{
            page_size:999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res)
              that.register_list = res.data.data.list

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

      /***
       * 消费明细设置不可选择
       *
       * */
      handleDisable(row, index) {
        console.log(row);
        // row.locked ===1   代表结账的
        if (row.pay_status===2  ) {
          return false;
        } else {
          return true;
        }
      },
      /**付款消费明细的分页*/
      handle_advocate(curPage){
        let that =this;
        let arr=[];
        arr.push( that.major_account_id);
        that.$axios({
          url: that.url + "/v1/finance/charge_detail/get_by_account_ids",
          method:"post",
          data:{
            account_ids:JSON.stringify(arr),
            page_size:8,
            page_num:curPage,
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message="success"){
              that.particulars_list=res.data.data.list;
            }
          })
          .catch(error=>{
            console.log(error);
          })
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
  .ar_account {
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow: hidden;
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
        li {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .dialog_style {
      margin-left: 20px;
      overflow: hidden;
      li {
        float: left;
        width: 50%;
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 120px;
        }
      }
    }
    .dialog_{
      margin-left: 20px;
      li {
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 100px;
          text-align: left;
        }
      }
    }

  }
</style>
<style >
  .ar_account>>> .el-dialog__body{
    padding: 0;
  }
  .el-table .routing-row {
    /*background: dimgrey;*/
    background: #C0B6B6;
  }
  .el-table .routing-zhuan {
    /*background: dimgrey;*/
    background:#97CBFF;
  }
</style>
