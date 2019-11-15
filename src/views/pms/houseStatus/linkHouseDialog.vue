<template>
  <div>
    <el-dialog width="70%" class="previewInfo-dialog deletePadding_Class" title="联房列表"  :visible.sync="linkHouseFornVisible"
      @close="$emit('update:show', false)"
      :show="show">
      <el-row style="background-color: #fff; height: 450px">
        <el-col :span="7" style="background-color: #FFF; height: 100%">
            <el-row >
            <div style="margin-top: 10px;margin-bottom: 10px">
              <!-- <el-checkbox style="margin-left: 15px; float: left; height: 50px;" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
                预订共<span>4</span>间
              </el-checkbox> -->
              <!-- <input  type='checkbox' class='input-checkbox' disabled v-model='checked' v-on:click='checkedAll'>详情 -->
              <span style="margin-left: 20px">详情</span>
              <span style="float: right;margin-right: 10px">
                <span style="margin-right: 10px">预收:</span><span style="color: red;">¥{{preBillLinkParam.total_pay}}</span>
              </span>
              <div style="clear: both"></div>
            </div>
          </el-row>
          <el-row class="left-nav">
            <!-- <div v-for='item in orderHouseInfo' :key="item.room_number" style="margin-bottom: 10px"> -->
              <!--给每个复选按钮绑定同一个v-mode数组变量，数组里面有相应的value就被选中-->
              <!-- <input type='checkbox' disabled name='checkboxinput' class='input-checkbox' v-model='checkboxList' :value="item.room_number"> -->
              <!-- <div style="display: inline-block; width: 18vw" @click="chooseInfo(item)"> -->
              <div style="display: inline-block; width: 20vw">
                <div>
                  <el-tag style="margin-left: 14px"  :disable-transitions="false"><span style="color: #4488E9">{{preBillLinkParam.room_number}}</span></el-tag>
                  <span style="color: #7AAAEF; margin-left:10px">{{preBillLinkParam.room_type}}</span>
                  <el-button style="float: right" type="text"  circle size="mini">{{preBillLinkParam.total_chartge}}</el-button>
                </div>
              </div>
            <!-- </div> -->
          </el-row>
        </el-col>
        <el-col :span="16">
          <el-tabs  v-model="activeName" @tab-click='tabClick' type="card" style="margin-left: 20px; width: 100%;">
            <el-tab-pane :label="tabValue" name="1">
              <div>
                <el-row class="buttonStyle">
                  <el-button type="info" @click="switchNumberDialog = true;changeNo()" round  size="small">换房号</el-button>
                  <!-- <el-button type="info" @click="houseTypeDialog = true" round  size="small">换房型</el-button> -->
                  <el-button type="info" @click="editPriceDialog = true" round  size="small">修改价格</el-button>
                  <!-- <el-button type="info" round  size="small">转全天房</el-button> -->
                  <el-button type="info" @click="leaveDialog = true" round  size="small">提前离店</el-button>
                  <el-button type="info" @click="continueLiveDialog = true; handleDate()" round  size="small">续住</el-button>
                  <el-button type="info" round  size="small">无等待</el-button>
                  <el-button type="info" round @click="enterPersonVisible = true"  size="small">+入住人</el-button>
                </el-row>
                <!--转全天房-->
                <div>
                  <div class="inline-div">
                    <span style="width: 25%">订单状态：<span style="color: #9FBDF2 ">入住</span></span>
                    <!-- <span style="width: 25%">联系人:<span>{{preBillLinkParam.name}}</span></span> -->
                    <span style="width: 25%">房型：<span>{{preBillLinkParam.room_type}}</span></span>
                    <span style="width: 15%">当日价：<span style="color: #FC6784">¥{{preBillLinkParam.fix_rate}}</span></span>
                    <!-- <span style="width: 10%">
                      <img style="cursor: pointer"  src="../../../assets/images/pms/houseStatus/date2x.png">
                    </span> -->
                  </div>
                  <div class="inline-div">
                    <!-- <span style="width: 25%">入住类型：（共<span style="color: #FC6784 "></span>天)</span> -->
                    <span style="width: 25%">客源类型:<span>{{preBillLinkParam.master_from_lable}}</span></span>
                    <span style="width: 20vw">入住日期:<span>{{preBillLinkParam.arr_time}}</span></span>
                    <span style="width: 20vw">预计离店：<span>{{preBillLinkParam.leave_time}}</span></span>
                  </div>
                </div>
                <el-row style="height: 20px"></el-row>
                <div>
                  <el-table height="220" :data="preBillLinkParam.master_guest" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="member" label="会员"></el-table-column>
                    <el-table-column prop="telephone" label="联系方式"></el-table-column>
                    <el-table-column label="证件类型">
                       <template slot-scope="scope">
                        <span v-if="scope.row.id_code==='01'">身份证</span>
                        <span v-if="scope.row.id_code==='02'">户口簿</span>
                        <span v-if="scope.row.id_code==='03'">护照</span>
                        <span v-if="scope.row.id_code==='04'">台胞证</span>
                        <span v-if="scope.row.id_code==='05'">港澳通行证</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="id_no" label="证件号"></el-table-column>
                  </el-table>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="账户明细" name="2">
              <el-row>
                <span style="margin-right:5px">营业日:</span>
                <el-date-picker style="width: 15vw" v-model="charge_date" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
                <el-button type="primary"  @click="getpayInfoListByAccount">查询</el-button>
                <el-button type="info">校验预付款</el-button>
              </el-row>
              <el-table height="260px" @selection-change="handleChargeChange" :data="accountMaxInfoList" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column  label="项目代码">
                  <template slot-scope="scope">
                    {{scope.row.code_income_type_id.name}}
                  </template>
                </el-table-column>
                <el-table-column prop="charge_amount" label="消费总数"></el-table-column>
                <el-table-column prop="pay_amount" label="付款"></el-table-column>
                <!-- <el-table-column prop="number" label="房号"></el-table-column> -->
                <el-table-column prop="gen_time" label="时间"></el-table-column>
                <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button v-if="scope.row.pay_status === 1" type="text" @click="chongAccountDialog = true; getChongAccountRow(scope.row)" size="small">冲账</el-button>
                    <el-button v-if="scope.row.pay_status === 0" type="text" size="small">删除</el-button>
                    <!-- <el-button type="text" @click="transferAccountDialog = true; getTransferAccountRow(scope.row)" size="small">转账</el-button> -->
                  </template>
                </el-table-column>
              </el-table>
              <el-row class="pagination">
                <!-- <p class="pull-left">显示第1到第6条记录，共{{accoutInfoList.length}}条记录</p> -->
                <el-pagination @current-change="getpayInfoListByAccount" :current-page="currentPage" :page-size="page_size" layout="total, prev, pager, next, jumper" :total="total">
                </el-pagination>
              </el-row>
              <el-row style="margin-top: 80px">
                <span style="float: left;margin-top: 10px">
                  <span>消费: &nbsp;<span style="color: #FC6784">¥{{moneydesc.total_consumption}}</span></span>
                  <span style="margin-left: 5px">预收:&nbsp;(含预授权): &nbsp;<span style="color: #96BAF1">¥{{moneydesc.pay_amount}}</span></span>
                  <span style="margin-left: 5px">余额:&nbsp;: &nbsp;<span style="color: #96BAF1">¥{{moneydesc.balance}}</span></span>
                </span>
                <span style="float: right">
                  <span style="margin-right: 20px">应付: &nbsp;<span style="color: #FC6784">¥{{moneydesc.need_pay}}</span></span>
                  <el-button type="primary" plain @click="fenAccountDialog = true">分账</el-button>
                  <el-button type="info" v-if="transferMultipleSelection.length === 0"  disabled  plain>转账</el-button>
                  <el-button type="danger" @click="handleTransferData();transferAccountDialog = true" v-else>转账</el-button>
                  <el-button type="info"  v-if="moneydesc.balance == 0" disabled   @click="handleJieAccount();">结账</el-button>
                  <el-button type="primary" v-else  @click="handleJieAccount();">结账</el-button>
                  <!-- <el-button type="primary">平账</el-button>  -->
                </span>
              </el-row>
              <el-row style="height: 20px"></el-row>
              <!-- <hr style="width: calc(100% + 20px); margin-top: 20px; background-color: #D0D0D0"/> -->
            </el-tab-pane>
            <el-tab-pane label="早餐" name="3">
              <el-row style="background-color: #F4F4F4; padding: 10px;5px;10px;5px; border: 1px solid #E9E9E9">
                <div style="float: left;">
                  <span style="margin-right:5px">营业日:</span>
                  <el-date-picker style="width: 40%" v-model="value4" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
                  <el-button type="primary">查询</el-button>
                </div>
                <el-button type="info" style="float: right; background-color: #8895A8; color: #fff">+买早餐卷</el-button>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-button style="background-color: #CCCCCC; color: #fff">作废</el-button>
                <el-button style="background-color: #CCCCCC; color: #fff">使用</el-button>
              </el-row>
              <el-table :data="tableData_4" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
                  <el-table-column prop="code" label="备注内容"></el-table-column>
                  <el-table-column prop="price" label="备注类型"></el-table-column>
                  <el-table-column prop="number" label="状态"></el-table-column>
                  <el-table-column prop="enterTime" label="备注日期"></el-table-column>
                  <el-table-column prop="person" label="操作人"></el-table-column>
                  <el-table-column prop="person" label="操作"></el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="备注" name="4">
              <el-row style="background-color: #F4F4F4; padding: 10px;5px;10px;5px; border: 1px solid #E9E9E9">
                <div style="float: left;">
                  <span style="margin-right:5px">操作人:</span>
                  <el-select  v-model="temp_value" style="width: 60%"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
                  <el-button type="primary">查询</el-button>
                </div>
                <el-button type="info" style="float: right; background-color: #8895A8; color: #fff">+新增备注</el-button>
              </el-row>
              <el-row style="margin-top: 20px">
                <el-button style="background-color: #CCCCCC; color: #fff">作废</el-button>
                <el-button style="background-color: #CCCCCC; color: #fff">使用</el-button>
              </el-row>
              <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
                  <el-table-column prop="code" label="类型"></el-table-column>
                  <el-table-column prop="price" label="周期"></el-table-column>
                  <el-table-column prop="number" label="金额"></el-table-column>
                  <el-table-column prop="enterTime" label="有效日期"></el-table-column>
                  <el-table-column prop="person" label="状态"></el-table-column>
                  <el-table-column prop="person" label="操作时间"></el-table-column>
                  <el-table-column prop="person" label="操作人/操作"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <!--最后一行样式-->
      <div slot="footer" class="dialog-footer">
        <div style="float: left">
          <el-button type="info" size="small" @click="linkRoomDialog = true; getLinkRoomData()" style="background-color: #FDB754;border-color: #FDB754">编辑联房</el-button>
          <el-button type="info" size="small" style="background-color: #CCCCCC; border-color: #CCCCCC; ">欠离</el-button>
          <el-button type="danger" size="small"  @click="pingAccount('退房')">退房</el-button>
        </div>
        <el-button type="info" size="small">日志[1]</el-button>
        <el-button type="info" @click="billDialog = true" size="small">发票[0]</el-button>
        <el-button type="info" @click="consumptionDialog = true" size="small">消费</el-button>
        <el-button type="info" @click="borrowingDialog = true" size="small">借物</el-button>
        <el-button type="info" @click="activateCard()"  size="small">制卡</el-button>
        <el-button type="info" @click="settingDialog = true" size="small">设置</el-button>
        <el-button type="info" @click="handlePreviewEnterBill()" size="small">入预收</el-button>
        <el-button type="info" @click="enterBillDialog = true;handleEnterBill()" size="small">入账</el-button>
        <el-button type="info" size="small">打印单据</el-button>
      </div>
      </el-dialog>
      <!--新建预订单=>设置-->
      <el-dialog class="houseTypeClass" width="50%"   title="设置" :visible.sync="settingDialog" :modal="true">
        <div style="height: 400px">
          <ul style="text-align: right; float:left;">
            <li>
              是否固定房价<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.is_fix_rate" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
            <li style="margin-top: 10px">
              是否保密订单<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.is_secrete" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
            <li style="margin-top: 10px">
              是否房价保密<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.is_secret_rate" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
            <li style="margin-top: 10px">
              是否允许记账<el-switch style="margin-left: 5px"  v-model="preBillLinkParam.allowed_AR" active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
            </li>
          </ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger"  @click="settingDialog=false">保存</el-button>
        </div>
      </el-dialog>
      <!-- ==========================================================分割========================================================================================================= -->
        <!-- 添加入住人dialog -->
        <el-dialog class="houseTypeClass" width="70%" title="入住人" :visible.sync="enterPersonVisible" :modal="true">
          <div style="height: 400px">
             <div style="height: 400px;margin-top: 10px; overflow: auto">
                <div  v-for="(item,index) in preBillLinkParam.master_guest" :key="index" style="margin-top: 10px">
                  <div style="diplay: inline-block">
                      <span style="padding-left: 14px">入住人:</span>
                      <el-input  v-model="item.room_number" style="width: 9.8vw" disabled placeholder="房间号"></el-input>
                      <el-input  v-model="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                      <el-select v-model="item.sex " style="width: 5.8vw"  placeholder="性别">
                        <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                      <el-select v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                        <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>
                      </el-select>
                      <el-input  v-model="item.id_no "  placeholder="证件号码"  style="width: 12vw"></el-input>
                      <el-input  v-model="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                  </div>
                  <div style="display: inline-block">
                      <el-input  v-model="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 15vw; margin-top: 10px"></el-input>
                  </div>
                  <!-- 预定房间入住人多选 +-->
                  <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                  <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                  <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"   @click="enterPersonVisible=false">确定</el-button>
          </div>
        </el-dialog>
       <!--冲账-->
      <el-dialog class="houseTypeClass" title="冲账" :visible.sync="chongAccountDialog" :modal="false">
        <div style="height: 400px">
          <el-table :data="chongAccountRowTabel" :header-cell-style="{background:'#3d4a53', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
            <el-table-column  label="项目代码">
              <template slot-scope="scope">
                {{scope.row.code_income_type_id.name}}
              </template>
              </el-table-column>
              <el-table-column prop="charge_amount" label="消费总数"></el-table-column>
              <el-table-column prop="pay_amount" label="付款"></el-table-column>
              <!-- <el-table-column prop="number" label="房号"></el-table-column> -->
              <el-table-column prop="gen_time" label="时间"></el-table-column>
          </el-table>
        </div>
        <div slot="footer" class="dialog-footer">
          <!-- 冲账金额:<span style="color: red; margin-right: 10px">￥{{chongAccountRowTabel[0].charge_amount}}</span> -->
          <el-button  type="primary">确定</el-button>
        </div>
      </el-dialog>
       <!--转账 针对账户id-->
      <el-dialog class="houseTypeClass" title="转账" :visible.sync="transferAccountDialog" :modal="false">
        <div style="height: 400px">
            <el-table :data="transferTabel" :header-cell-style="{background:'#3d4a53', color: '#879AB4'}" style="width: 100%; margin-top: 20px">
              <el-table-column  label="项目代码">
                <template slot-scope="scope">
                  {{scope.row.code_income_type_id.name}}
                </template>
                </el-table-column>
                <el-table-column prop="charge_amount" label="消费总数"></el-table-column>
                <el-table-column prop="pay_amount" label="付款"></el-table-column>
                <!-- <el-table-column prop="number" label="房号"></el-table-column> -->
                <el-table-column prop="gen_time" label="时间"></el-table-column>
            </el-table>
            <div>
            <el-row style="height: 20px"></el-row>
            <el-row>
              转账目标:
              <el-select @focus="getTransferOption"  v-model="transferAccountId"  placeholder="请选择">
                <el-option
                  v-for="item in transferOptions"
                  :key="item.account_id"
                  :label="item.room_number"
                  :value="item.account_id">
                </el-option>
              </el-select>
            </el-row>
            <el-row style="height: 20px"></el-row>
            <el-row>
              转出金额:
              <el-input style="width: 14vw" v-model="transferMoneyValue"></el-input>
              <!-- (可转账金额<span style="color: red">{{transferNeedpayValue}}</span>)   -->
            </el-row>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="confirmTransfer">确定</el-button>
          </div>
      </el-dialog>
      <!--提前离店-->
      <el-dialog class="houseTypeClass" title="提前离店" :visible.sync="leaveDialog" :modal="false">
        <div style="height: 400px">
          <el-form>
            <el-form-item label="原入离日期:">
              <el-date-picker disabled style="width: 30%" v-model="before_leave_time" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="现离店日期:">
              <el-date-picker disabled type="date" v-model="after_leave_time_1"></el-date-picker>
              <span>-</span>
              <el-date-picker type="date" v-model="after_leave_time_2"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary"  @click="confirmContinueRoom">确定</el-button>
        </div>
      </el-dialog>
      <!--编辑联房-->
      <el-dialog class="houseTypeClass" width="70%" title="编辑联房" :visible.sync="linkRoomDialog">
        <div style="height: 400px;">
       <template>
          <!-- <el-transfer filterable :filter-method="filterMethod" filter-placeholder="请输入城市拼音" v-model="value" :data="data">
          </el-transfer> -->
            <transfer
              :transferData_left = "transferData_left"
              :transferData_right = "transferData_right"
              showFlied="room_number"
              showFlied2="zhulianValue"
              childFlid="children"
              titleleft="可联房间"
              titleright="已联房间"
              :callback="callback">
              <el-input
                      slot = "search1"
                      placeholder="请输入搜索内容"
                      icon="search"
                      v-model="search1"
                      >
              </el-input>
              <el-input
                      slot = "search2"
                      placeholder="请输入搜索内容"
                      icon="search"
                      v-model="search2"
                      >
              </el-input>
          </transfer>
        </template>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="confirmLinkRoom" type="primary">确定并打印</el-button>
        </div>
      </el-dialog>
      <!--分账-->
      <el-dialog class="houseTypeClass" title="拆分项目" :visible.sync="fenAccountDialog">
        <div style="height: 400px;">
          <el-form :label-position="labelPosition" label-width="160px" >
            <!-- <el-form-item label="营业项目:">
              <el-input style="width: 20vw"></el-input>
            </el-form-item> -->
            <el-form-item label="描述:">
              <el-input v-model="splitAccountParam.desc"  style="width: 20vw"></el-input>
            </el-form-item>
            <el-form-item label="分账方式:">
              <el-select style="width: 20vw" v-model="splitAccountParam.split_method_id">
                <el-option  v-for="item in splitOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="单号:">
               <el-input  style="width: 20vw"></el-input>
            </el-form-item> -->
            <el-form-item label="备注:">
              <el-input v-model="splitAccountParam.remark" style="width: 20vw"></el-input>
            </el-form-item>
            <el-form-item v-if="splitAccountParam.split_method_id === 0" label="请输入拆分后的金额:">
               <el-input placeholder="请输入金额" v-model="splitAccountParam.split_amount"  style="width: 20vw"></el-input>
            </el-form-item>
            <el-form-item v-if="splitAccountParam.split_method_id === 1" label="请输入拆分后的数量:">
               <el-input  placeholder="请输入拆分数量" v-model="splitAccountParam.num" style="width: 20vw"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button  type="info">取消</el-button>
          <el-button @click="splitAccount()" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <!--结账-->
      <el-dialog class="houseTypeClass" :title="jieAccountTitle" :visible.sync="jieAccountDialog">
        <div style="height: 650px; overflow: auto">
          <el-form>
            <!-- <el-form-item label="加收房费:">
              <el-radio>免加收</el-radio>
              <el-radio>加收全天</el-radio>
              <el-radio>加收半天</el-radio>
            </el-form-item> -->
            <el-form-item label="房间号:">
              <span>{{preBillLinkParam.room_number}}</span>
            </el-form-item>
            <el-form-item label="预收:">
              <span>{{moneydesc.pay_amount}}</span>
            </el-form-item>
            <el-form-item label="总消费:">
              <span>{{moneydesc.total_consumption}}</span>
            </el-form-item>
            <el-form-item label="余额:">
              <span>{{moneydesc.balance}}</span>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance > 0" label="总退款金额:">
              <span>{{moneydesc.balance}}</span>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance < 0" label="应收金额:">
              <span>{{Math.abs(moneydesc.balance)}}</span>
            </el-form-item>
            <el-form-item label="欠款离店:">
              <el-switch active-value="1" inactive-value="0" active-text="是" inactive-text="否"  v-model="isDebt"></el-switch>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance < 0" label="付款方式:">
              <el-input  placeholder="请输入金额" v-model="jieParam.jie_payValue" style="width: 12vw"></el-input>
              <el-select clearable  @focus="get_list_by_hotel" v-model="jieParam.jie_payModeValue"  style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                <el-option
                  v-for="item in payModelist_other"
                  :key="item.id"
                  :label="item.model_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance < 0">
              <span>付款原因:</span>
                <el-select clearable  style="width: 20vw; margin-top: 10px;margin-left:10px"  @focus="getPayReason()" placeholder="付款原因"  v-model="jieParam.jie_payReasonValue">
                  <el-option
                    v-for="item in this.payInfoList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="moneydesc.balance > 0" label="入账代码(退款):">
              <el-input  placeholder="请输入金额" v-model="jieParam.jie_payValue" style="width: 12vw"></el-input>
              <el-select clearable  @focus="getIncomingAccount('refund')" v-model="jieParam.jie_incomeValue"  style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                <el-option
                  v-for="item in incomingAccoutList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-else>
                 入账代码:
                  <el-select clearable  @focus="getIncomingAccount('pay')"  v-model="jieParam.jie_incomeValue"  style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                    <el-option
                      v-for="item in incomingAccoutList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
            </el-form-item>
            <!-- <el-form-item label="封账:">
              <el-switch active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item> -->
            <el-form-item label="备注:">
              <el-input type="textarea" :rows="4" style="width: 85%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <el-row style="height: 40px"></el-row>
        <div slot="footer" class="dialog-footer">
          <el-button @click="endJieAccount()"  type="primary">结账</el-button>
        </div>
      </el-dialog>
      <!--选择房号-->
      <el-dialog class="houseTypeClass deletePadding_Class" title="选房号" :visible.sync="switchNumberDialog" :modal="true">
          <div style="height: 400px; width: 100%; background-color: #EBEDF1">
            <!-- <div style="float: left; width:25%">
              <ul class="choose_no_class">
                <li v-for="(item,index) of this.preBillParam.rt_rate" :key="item.room_type" @click="selectHouseType(item,index)">
                  <span style="color: #5B97EB; ">{{item.room_type}}</span>
                  <span style=" margin-right: 20px">可订数:<span style="color: #FC6784">{{item.can_live_num}}</span></span>
                </li>
              </ul>
            </div> -->
            <div style="float: right;width: 100%;">
              <!-- <keep-alive> -->
                <el-table :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" ref="multipleTable"  :data="roomNo_data_list" style="width: 100%;height: 400px; overflow:scroll" @select-all="handleselectAll" @select="handleselect">
                <el-table-column  type="selection" width="55"></el-table-column>
                <el-table-column prop="room_no" label="房号"></el-table-column>
                <el-table-column prop="room_state" label="状态"></el-table-column>
                <el-table-column prop="floor_number" label="楼座/楼层">
                  <template slot-scope="scope">
                    {{scope.row.building_name}}/{{scope.row.floor_number}}
                  </template>
                </el-table-column>
                <el-table-column prop="tagName" label="标签"></el-table-column>
                </el-table>
              <!-- </keep-alive> -->
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              自动排房<el-switch style="margin-left: 5px" @change="selfSelectHouse" v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
              <span style="margin-left: 10px">排房结果: <span>{{this.sortNumber}}</span></span>
              <span style="margin-left: 10px">未排房总数:<span style="color: #f3565d">{{this.noSortNumber}}</span></span>
              <span style="margin-left: 10px">已排房总数:<span style="color: #23c608">{{this.sortNumber}}</span></span>
            </div>
            <el-button @click="switchNumberDialog = false; getRoomNumber()" type="danger">提交</el-button>
          </div>
        </el-dialog>
        <!--续住-->
      <el-dialog class="houseTypeClass" title="续住" :visible.sync="continueLiveDialog">
        <div style="height: 400px;">
          <el-form>
            <!-- <el-form-item label="是否原价换房(免费升级):">
              <el-switch  active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item> -->
            <el-form-item label="原入离日期:">
              <el-date-picker disabled style="width: 30%" v-model="before_leave_time" type="daterange" range-separator="-" start-placeholde="开始日期" end-placeholde="结束日期"></el-date-picker>
            </el-form-item>
            <el-form-item label="现离店日期:">
              <el-date-picker disabled type="date" v-model="after_leave_time_1"></el-date-picker>
              <span>-</span>
              <el-date-picker type="date" v-model="after_leave_time_2"></el-date-picker>
            </el-form-item>
            <!-- <el-form-item label="选择换房型:">
              <el-select  v-model="temp_value"  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </el-form-item> -->
            <el-form-item label="备注:">
              <el-input style="width: 85%" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary" @click="confirmContinueRoom">确定</el-button>
        </div>
      </el-dialog>
      <!--修改价格-->
      <el-dialog class="houseTypeClass" title="修改价格" :visible.sync="editPriceDialog" :modal="false">
        <div style="height: 400px">
          <el-form>
            <el-form-item label="是否换房源:">
              <el-switch active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item>
            <el-row style="background-color: #EFF5F7; color: #5B97EB; height: 30px;  margin-bottom: 15px">
              <span style="line-height: 32px; margin-left: 5px">客源:非会员</span>
            </el-row>
            <el-form-item label="房型首日价:">
              <span><span style="color: #FC6784">¥598.00</span>间</span>
              <el-button style="float: right" round type="primary">修改价格</el-button>
            </el-form-item>
            <el-form-item label="改价格理由:">
              <el-input type="textarea" :rows="4" style="width: 85%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary">确定</el-button>
        </div>
      </el-dialog>
      <!--换房型-->
      <el-dialog class="houseTypeClass" title="换房型" :visible.sync="houseTypeDialog" :modal="false">
        <div style="height: 400px">
          <el-form  label-width="180px">
            <el-form-item label="是否原价换房(免费升级):">
              <el-switch active-text="是" inactive-text="否"  v-model="switchValue"></el-switch>
            </el-form-item>
            <el-form-item label="选择换房型:">
              <el-select  v-model="temp_value"  placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
              <span style="margin-left: 10px">当前房价:<span style="color: #FC6784">¥598.00</span>每间</span>
            </el-form-item>
            <el-form-item label="选择房间号:">
                <img style="margin-left: 2px; cursor: pointer"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
            </el-form-item>
            <el-form-item label="换房理由:">
              <el-input type="textarea" :rows="4" style="width: 90%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div style="height: 40px">
          <el-button style="float: right" type="primary">确定</el-button>
        </div>
      </el-dialog>
        <!--商品消费-->
        <el-dialog class="houseTypeClass" title="商品消费" :visible.sync="consumptionDialog" :modal="false">
          <div style="height: 400px">
            <el-row>
              <div style="float: left; margin-top: 10px "><span style="text-align: center">账单编号: M1212324432</span></div>
              <div style="float: right; margin-bottom: 20px">
                商品名称: <el-select  v-model="temp_value"   placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                <el-button type="primary">查询</el-button></div>
            </el-row>
            <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="code" label="商品编码"></el-table-column>
              <el-table-column prop="name" label="商品名称"></el-table-column>
              <el-table-column prop="unit" label="单位"></el-table-column>
              <el-table-column prop="unitPrice" label="单价"></el-table-column>
              <el-table-column prop="number" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column prop="repertory" label="库存"></el-table-column>
              <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
            <el-row class="pagination">
              <p class="pull-left">显示第1到第6条记录，共6条记录</p>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="50" class="pull-right">
              </el-pagination>
            </el-row>
            <el-row>
              部门:<el-select  v-model="temp_value" style="width: 120px"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>  &nbsp;
              类别:<el-select  v-model="temp_value" style="width: 120px"  placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
            </el-row>
            <el-row style="margin-top: 20px; display: flex; justift-content: space-between">
              <span style="width: 35px">备注:</span>
              <el-input type="textarea" :rows="4" ></el-input>
            </el-row>
          </div>
          <div style="height: 40px; margin-top: 40px">
            <div style="float: left">
              <el-button  type="info">预约发票</el-button>
            </div>
            <div style="float: right">
              <el-button  type="primary">开具专票</el-button>
              <el-button  type="primary">开具普票</el-button>
            </div>
          </div>
        </el-dialog>
        <!--入预收-->
        <el-dialog class="houseTypeClass"  width="70%" title="入预收" :visible.sync="preview_enterBillDialog" :modal="false">
          <div style="display: flex; justify-content: space-between; margin-right: 50px">
            <div style="height: 400px;width: 45%;">
              <ul>
                <li>
                  账户信息:<el-input v-model="previewEnterBill.billInfo"  size="mini" style="width: 20vw;margin-left:10px"></el-input>
                </li>
                <li>
                  支付方式:<el-select clearable  @focus="get_list_by_hotel" v-model="previewEnterBill.payMode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in payModelist_other"
                              :key="item.id"
                              :label="item.model_name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li>
                <li>
                  <span>付款原因:</span>
                  <el-select clearable size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  @focus="getPayReason()" placeholder="付款原因"  v-model="previewEnterBill.payReasonValue">
                    <el-option
                      v-for="item in this.payInfoList"
                      :key="item.code"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  入账代码:
                  <el-select clearable  @focus="getIncomingAccount('pay')"  v-model="previewEnterBill.enterAccountCode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                    <el-option
                      v-for="item in incomingAccoutList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span style="margin-left: 28px">金额:</span><el-input v-model="previewEnterBill.moeny" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
                <li>
                  <span style="color: #4488E9;margin-top: 10px">附加信息</span>
                </li>
                <li>
                  <span style="margin-left: 28px">账户:</span><el-select clearable  v-model="previewEnterBill.accountData" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                </li>
                <li>
                  <span style="margin-left: 28px">摘要:</span>
                  <el-input  v-model="previewEnterBill.summary" type="textarea" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
              </ul>
            </div>
            <div style="width: 55%; margin-left:20px">
              <el-table :data="accountMaxInfoListCopy" :header-cell-style="{background:'#CCCCCC', color: '#222222'}" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="code_income_type_id.name" label="入账代码"></el-table-column>
              <el-table-column prop="charge_amount" label="金额"></el-table-column>
              <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="deleteEnterBill(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            </div>
          </div>
           <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="flushEnterAccount()" type="info">清空</el-button> -->
            <el-button type="primary" @click="payCharge()">付款</el-button>
          </div>
        </el-dialog>
        <!--入账-->
        <el-dialog class="houseTypeClass"  width="70%" title="入账收" :visible.sync="enterBillDialog" :modal="false">
          <div style="display: flex; justify-content: space-between; margin-right: 50px">
            <div style="height: 400px;width: 45%;">
              <ul>
                <li>
                  账户信息:<el-input v-model="enterBill.billInfo"  size="mini" style="width: 20vw;margin-left:10px"></el-input>
                </li>
                <!-- <li>
                  支付方式:<el-select clearable  @focus="get_list_by_hotel" v-model="enterBill.payMode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in payModelist_other"
                              :key="item.id"
                              :label="item.model_name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li> -->
                <li>
                  入账代码:<el-select clearable  @focus="getIncomingAccount('consume')"  v-model="enterBill.enterAccountCode" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in incomingAccoutList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                </li>
                <li>
                  <span style="margin-left: 28px">金额:</span><el-input v-model="enterBill.moeny" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
                <li>
                  <span style="color: #4488E9;margin-top: 10px">附加信息</span>
                </li>
                <li>
                  <span style="margin-left: 28px">账户:</span><el-select clearable  v-model="enterBill.accountData" size="mini" style="width: 20vw; margin-top: 10px;margin-left:10px"  placeholder="请选择">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                </li>
                <li>
                  <span style="margin-left: 28px">摘要:</span>
                  <el-input  v-model="enterBill.summary" type="textarea" style="width: 20vw; margin-top: 10px;margin-left:10px"></el-input>
                </li>
              </ul>
            </div>
            <div style="width: 55%; margin-left:20px">
              <el-table :data="accountMaxInfoListCopy" :header-cell-style="{background:'#CCCCCC', color: '#222222'}" style="width: 100%">
              <el-table-column type="index" label="序号"></el-table-column>
              <el-table-column prop="code_income_type_id.name" label="入账代码"></el-table-column>
              <el-table-column prop="charge_amount" label="金额"></el-table-column>
              <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="deleteEnterBill(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
            </el-table>
            </div>
          </div>
           <div slot="footer" class="dialog-footer">
            <el-button @click="flushEnterAccount()" type="info">清空</el-button>
            <el-button type="primary" @click="enterAccount_addChargeDetail()">入账</el-button>
          </div>
        </el-dialog>
        <!--发票-->
        <el-dialog class="houseTypeClass" title="发票" :visible.sync="billDialog" :modal="false">
          <div style="height: 400px">
            <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
              <el-table-column prop="billName" label="发票抬头"></el-table-column>
              <el-table-column prop="billType" label="发票类型"></el-table-column>
              <el-table-column prop="billPrice" label="发票金额"></el-table-column>
              <el-table-column prop="billNumber" label="发票编号"></el-table-column>
              <el-table-column prop="billStatus" label="发票状态"></el-table-column>
              <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
          </div>
          <div style="height: 40px">
            <div style="float: left">
              <el-button  type="info">预约发票</el-button>
            </div>
            <div style="float: right">
              <el-button  type="primary">开具专票</el-button>
              <el-button  type="primary">开具普票</el-button>
            </div>
          </div>
        </el-dialog>
        <!--借物-->
        <el-dialog class="houseTypeClass" title="借物" :visible.sync="borrowingDialog">
          <div style="height: 400px">
            <el-table :data="tableData_data" :header-cell-style="{background:'#BFCAD1', color: '#879AB4'}" style="width: 100%">
              <el-table-column prop="borrowing" label="租借物品"></el-table-column>
              <el-table-column prop="remark" label="备注内容"></el-table-column>
              <el-table-column prop="number" label="房号"></el-table-column>
              <el-table-column prop="status" label="状态"></el-table-column>
              <el-table-column prop="time" label="操作时间"></el-table-column>
              <el-table-column prop="operation" label="操作"></el-table-column>
            </el-table>
          </div>
          <div style="height: 40px">
            <div style="float: right">
              <el-button  type="primary">新增借物</el-button>
            </div>
          </div>
        </el-dialog>
    </div>
</template>
<script>
const orderOptions = [
  {
    name: 8026,
    status: 1,
    price: 100
  }
];
import util from '../../../common/util.js'
import transfer from '@/components/transfer/transfer'
import moment from 'moment'
import cDialog from './consumeDialog'
export default {
    data(){
        const generateData = _ => {
          const data = [];
          const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
          const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
          cities.forEach((city, index) => {
            data.push({
              label: city,
              key: index,
              pinyin: pinyin[index]
            });
          });
          return data;
        };
        return {
          //所有金额米明细
          moneydesc: {
            pay_amount: 0,//预收
            balance: 0,//余额
            total_consumption: 0,//总消费
            need_pay: 0,//应付
            total_refund: 0,//总退款金额
          },
          accountMaxInfoListCopy: [],
          preview_enter_flag: '',
          charge_date: '',
          /**
           * 分页
           */
          currentPage: 1, //当前页码
          page_size: 10, //每页显示数量
          total: 0, //总数
          total_consumption_value: '0',//总消费
          need_pay_value: '0',//应付
          incomingAccoutList: [],//入账代码list
          payModelist_other: [],//支付方式===>第二种接口
          //入账收对象
          enterBill:{
            billInfo: '',
            enterAccountCode: '',
            moeny: '',
            accountData: '',
            summary: '',
          },
          //入预收对象
          previewEnterBill:{
            billInfo: '',
            payMode: '',
            payReasonValue: '',
            enterAccountCode: '',
            moeny: '',
            accountData: '',
            summary: '',
          },
          transferMoneyValue: 0,
          transferNeedpayValue: 0,
          transferAccountId: '',//to要转账的ID
          transferOptions: [],
          transferTabel: [],//转账tabel
          jieAccountTitle: '',//title
          isDebt: '0',//是否欠款离店
          collectionChargeData: [],//消费明细ID
          jie_payValue: null,//结账时要付的钱
          jieParam:{
            jie_payValue: '',
            jie_payModeValue: '',
            jie_payReasonValue: '',
            jie_incomeValue: '',
          },
          needpayValue: 0,//应收总额
          transferMultipleSelection: [],//多选=>从而转账
          chongAccountRowTabel: [],
          transferAccountRowTabel: [],
          chongAccountDialog: false,
          transferAccountDialog: false,
          search1:"",
          search2:"",
          transferData_left:[],
          transferData_right:[],
          // //可以在回调函数中进行提交操作以及数据操作。
          // callback:function () {
          //     console.log(this.transferData_left)
          //     console.log(this.transferData_right)
          // },
          countConsume: 0,
          countPay: 0,
          endPayListParam: {},
          room_pay: 0,
          sundry_pay: 0,//杂项统计
          deposit_pay: 0,//押金统计
          splitOptions: [{
            label: '按金额分',
            value: 0
          },{
            label: '按数量分',
            value: 1
          }],
          //分账对象
          splitAccountParam: {
            desc: '',
            remark: '',
            split_method_id: 0
          },
          charge_count: 0,//消费总数
          pay_count: 0,//预收总数
          accoutInfoList: [],
          accountMaxInfoList: [],//详细的账户明细
          data: generateData(),
          value: [],
          filterMethod(query, item) {
            return item.pinyin.indexOf(query) > -1;
          },
          linkRoomDialog: false,//编辑联房
          noSortNumber: 0,
          sortNumber: 0,
          labelPosition: 'right',//form排列房向
          fenAccountDialog: false,//分账
          jieAccountDialog: false,//结账
          tabValue: '',//tabs显示的值
          orderHouseInfo:[{
                id:'1',
                value:'苹果'
            },{
                id:'2',
                value:'荔枝'
            },{
                id:'3',
                value:'香蕉'
            },{
                id:'4',
                value:'火龙果'
            }],
            checkboxList:[],
            checked: false,
            orderHouseInfo: [{
              room_number: '123',
              room_type: '大床房'
            },{
              room_number: '11241',
              room_type: '大床房2'
            }],
            payReasonValue: '',//付款原因对应值
            payModeValue: '',//付款方式对应值
            incomeModeValue: '',//结账入账对应值
            payModeList: [],//支付方式接口
            payInfoList: [],//付款原因接口
            payDetail_param:{
              account_ids: [],//需要序列化
              pay_amount: null,//	支付金额.可正负.负代表支出
              pay_status: null,
              pay_reason_id: null,
              biz_date:	moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              gen_time:		moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              pay_mode_id	: null,//以上都是必填 付款方式id, 目前已知 0. 现金 1. POS 2. 支付宝 3. 微信 4. AR 5. 预授权
              check_status: null,
              check_time: '',
              cashier: null,
              create_user: null,
              original_pay_dict: {},
              charge_details: [],
            },
            return_accountParam:{},
            //账户param
            account_param: {
              account_type: 0,//int 默认为正常账户 	账户类型:0:正常账户 1：AR账户
              reference_link_label: 0,//	关联方标志，0：预定账户，1：入住单，2：已分帐的单独客人账户
              reference_id: 12345,//int 此时测试数据
              module_id: 1,//测试时填写
              charge_details: [], //消费明细必填
              pay_detail: {},//付款明细不是必填
              room_num: '',//房间号,有入住的情况下必填.
              biz_date: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
              hotel_id: '',
              hotel_group_id: '',
              account_status: '',
              check_flag: '',
              team_flag: '',
              team_id: '',
              market_id: '',
              market_code: '',
              remark: '',
            },
            payMoneyDialog: false,//预定转入住的时候 =>入住后可能存在付款现象
            tempPreBillparam: {},//办理入住 进入的时候的对象
            tempExpandEnter: [],
            changeTrue: true,//是否禁用（预定转入住）
            expandPreInfo: [],//展开时的数据=>prebillParam.ra_rate
            leave_time: '',
            arr_time: '',
            cancleAndEnter_button: true,
            // parentInfoParam: {},
            radio1: 1,
            enterPersonVisible: false,//入住人
            updateLinkInfoVisible: false,
            updateTimeVisible: false,
            updateOrderVisible: false,
            preInfoTitle: '',
            tableData_data: [],
            checkAll: false,
            isIndeterminate: true,
            orderHouseList: [],//默认进来全部选中
            previewOrders: [],
            tableData_4: [],
            switchValue: '',
            tableData_1: [{
              name: '李四',
              member: '',
              telphone: '13812345678',
              type: '身份证',
              cardNumber: '1531515315555454'
            }],
            tableData_2: [{
              code: '',
              price: '598.00',
              number: '1',
              enterTime: '2018/10/02 12:00',
              person: '管理员'
            }],
            num: 1,
            value1: '',
            value2: '',
            value3: '',
            value4: '',
            value5: '',
            value6: '',
            value7: '',
            before_leave_time: '',
            after_leave_time_1: '',
            after_leave_time_2: '',
          linkHouseFornVisible: this.show,
          countMoney: 0,
          roomTagList: [],
          flag: false,
          liveoptions_Value: [],
          liveoptions_NoChange: [],
          liveoptions: [],//入住人一行下拉
          _room_type: '',//房型
          rowIndex: [],//行数数组
          pre_live_number: '',//准备预定数
          can_live_number: '',//可订数
          roomList: [],//房间list
          roomInfoList: [],//其中一行数据房子
          switchValue: '',
          showAddButton: true,//选择房型右边初始化时显示add按钮
          showDeleteButton: false,
          options: [{
          value: '1',
          label: '是'
          },{
          value: '0',
          label: '否'
          },{
          value: '选项4',
          label: '龙须面'
          },{
          value: '选项5',
          label: '龙须面'
          }],
          selectParam: '',//小方块选择参数全局定义
          is_addlive: false,//是否添加入住人
          sexOptions:[{
          label: '男',
          value: '0'
          },{
          label: '女',
          value: '1'
          }],
          //证件类型
          idCodeOptions: [{
            label: '身份证',
            value: '01'
            },{
            label: '户口簿',
            value: '02'
            },{
            label: '护照',
            value: '03'
            },{
            label: '台胞证',
            value: '04'
            },{
            label: '港澳通行证',
            value: '05'
          }],
          breakfastAllList: [],//早餐列表
          countDate: '',//共几晚
          middle_remarkRow: '',
          addAndUpdate: true,//编辑新增标记
          remarkContent_value: '',//备注值
          showAddButton_2: true,//选择房型右边初始化时显示add按钮
          showDeleteButton_2: false,
          countChecked: 0,
          isDisabled: false,//是否禁选
          haveChecked: false,
          booleanChecked: '',
          multipleSelection: [],
          houseType_priceValue_1: '',//选择房型右边弹框价钱1
          houseType_priceValue_2: '',//选择房型右边弹框价钱2
          houseType_HeadValue: '',//选择房型右边弹框头部值
          showPop_right: false,//是否显示预定单选择房型右边弹框
          //此时入住单详情即联房大对象
          preBillLinkParam: {},
          temp_value: '',
          showPoint: false,//预定=>多余部分
          activeName: '1',
          activeNames: ['1'],
          consumeData: [],//预定=》消费数组
          remarkData: [],//备注数组
          breakfastDialog: false,//预定=》早餐dialog
          settingDialog: false,//预定=》设置dialog
          consumeDialog:false,//预定=》消费dialog
          preview_billDialog: false,//预约发票
          addAndUpdate_remarkDialog: false,//预定=>备注dialog=>新增备注
          remarkDialog: false,//预定=>备注dialog
          previewTypeList: [{
           label: '非会员/会员',
            value: 0
            },{
            label: '散客预定',
            value: 1
            },{
            label: '团队预定',
            value: 2
            },{
            label: '订房中心/OTA',
            value: 3
            },{
            label: '协议单位',
            value: 4
          }],//会员数组
          roomNo_data_list: [],//选房号数组
          building_value: '',
          floor_value: '',
          roomStatus_value: '',
          roomType_value: '',//房型
          room_no_value: '',//房间号
          floorList: [],//楼层
          buildingList: [],//楼栋
          roomTypeList: [],//房型option
          roomStatusList: [],//房态option
          roomOccupyList: [],
          lockCss_active: false,//锁定状态
          rangeDate:{
          disabledDate(time){
              return time.getTime() < Date.now() - 8.64e7
          }
          },
          isActive: false, // 样式true or false
          UrLHeader:'http://price.crowncrystalhotel.com/v1/',//http://member.crowncrystalhotel.com/,
          UrLHeader_2:'http://47.98.113.173:8092/v1/',
          UrLHeader_3: 'http://code.crowncrystalhotel.com/v1/',
          consumptionDialog: false,
          borrowingDialog: false,
          billDialog: false,
          enterBillDialog: false,//入账
          preview_enterBillDialog: false,
          leaveDialog: false,
          houseTypeDialog: false,
          switchNumberDialog: false,
          enterPreviewDialog: false,//入预收操作
          prePayDialog: false, //聚合支付
          editPriceDialog: false,
          addPersonDialog: false,
          continueLiveDialog: false,
          previewToEnterVisible: false,//预定转入住单
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        parentInfoParam: {
            type: Object,
            required: true
        }
    },
     components: {
      'cDialog': cDialog,
      'transfer': transfer
    },
     beforeMount(){
        //  let data = [
        //         {
        //             "children": [
        //             ],
        //             roomInfo: [],
        //             room_number: "1201",
        //             name: "张三",
        //         },
        //         {
        //             "children": [
        //             ],
        //             roomInfo: [],
        //             room_number: "1202",
        //             name: "李四",
        //         },
        //     ]

        //     this.transferData_left = data;
        },
    watch: {
      show () {
        this.linkHouseFornVisible = this.show;
        this.activeName = '1'
      },
      /**
       * 注意: 监听该父级传来的对象的时候,根据房间号得到相应的处理
       */
      parentInfoParam(){
        console.log('this.parentInfoParam 监听父级',this.parentInfoParam )
        // if(this.parentInfoParam.openChildDialog === '续住'){
        //   this.continueLiveDialog = true
        // }
        try {
          this.tabValue = this.parentInfoParam.room_number //tab房间号
          this.preBillLinkParam = _.cloneDeep(this.parentInfoParam)
          console.log(this.preBillLinkParam.master_guest,'this.preBillLinkParam')
          let guestValue = {
            room_number: this.preBillLinkParam.room_number,
            account_id: null,
            guest_id: 123456,
            id_code: "01",
            id_no: "",
            sex: '',
            master_base_id: "",
            name: "",
            reserve_base_id: null,
            telephone: "",
          }
          if(this.preBillLinkParam.master_guest.length ===0){
            this.preBillLinkParam.master_guest.push(guestValue)
          }
        } catch (error) {
          console.log(error)
        }
      },
      checkboxList: {
        handler: function (val, oldVal) {
          if (this.checkboxList.length === this.orderHouseInfo.length) {
            this.checked=true;
          } else {
            this.checked=false;
          }
        },
        deep: true
      }
    },
    computed:{
      // sumMoney(){
			// 	return this.preBillParam.consumeInfoList.map(
			// 		item=>item.number*item.price).reduce(
			// 		(acc, cur) => (parseFloat(cur) + acc), 0)
      //   },
      sumBreakfastMoney(){
        return this.preBillParam.breakfastInfoList.map(
					item=>item.number*item.price).reduce(
					(acc, cur) => (parseFloat(cur) + acc), 0)
        },
      //计算预离时间差天数
      countDateRange(){
        let start = moment(this.preBillParam.reserve_base.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.preBillParam.reserve_base.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        return this.datedifference(start, end)
      }
    },
    methods: {
      deleteEnterBill(row){
        console.log('删除入账',row)
        let that = this
        // let id = row.id
        let url = `http://47.98.113.173:9519/v1/finance/charge_detail/remove/` + id
        that.$axios.post(url).then(res=>{
          util.hintInfo(this,'success', '删除成功！');
        })
      },
      //清空入账内容
      flushEnterAccount(){
        this.enterBill.enterAccountCode = ''
        this.enterBill.moeny =  ''
        this.enterBill.summary = ''
        this.enterBill.accountData = ''
      },
      //入预收==>付款
      payCharge(){
         let that = this
        let url= `http://47.98.113.173:9519/v1/finance/pay_detail/pay_by_charges`
        // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
        console.log('collectionChargeDatavalue========',this.collectionCharge)
        // let array_collectionCharge = [{
        //   code_income_type_id: this.collectionCharge,   //入账类型代码id
        //   reference_id: 1232,   // 关联消费单id
        //   biz_date: moment(new Date()).format('YYYY-MM-DD'),  // 营业日期
        //   gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),    // 业务发生的实际时间
        //   // pay_status: 0,//enterBill.payMode,   // 支付状态 0：未付，1：结清，2：挂账/AR支付，3：部分支付 4: 异常
        //   is_fixed: 0,  // 是否固定消费. 0 不是,1 是.
        //   fixed_name: '0',   // 固定消费名称.可空
        //   rate_code: 'ddf',   // 房价码, 不一定有
        //   charge_amount: this.countMoney,  // 消费金额 负的 ===>应该是房价码
        //   pay_amount: 0,   // 已支付的部分,一般是0,
        //   desc:  '',  // 说明===>此时为摘要
        // }]
        // array_collectionCharge = JSON.stringify(array_collectionCharge)
        let scopeParam = {
          account_id: this.preBillLinkParam.account_id, //主账id
          // charges: array_collectionCharge,//组装的
          // charge_ids: this.collectionChargeData,
          pay_amount: this.previewEnterBill.moeny,
          code_pay_for_id: this.previewEnterBill.payReasonValue,
          code_income_type_id: this.previewEnterBill.enterAccountCode,   //入账类型代码id
          // biz_date: moment(new Date()).format('YYYY-MM-DD'),
          gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          cashier_id:	9,
          pay_mode_id: this.previewEnterBill.payMode,
          // original_pay_dict: {}
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('aa',res.data.message)
          if(res.data.message != 'success'){
            this.$message.warning('调用后台接口失败')
          }else{
            this.$message.warning('操作成功!')
            that.getpayInfoListByAccount()//根据账户查询消费明细
          }
          }).catch(error=>{
        })
      },
      //入账=>增加消费记录
      enterAccount_addChargeDetail(){
        let scopeParam = {
          // cashier_id: 9,//	收银点id
          account_id: this.preBillLinkParam.account_id,//主账户id
          charges: [{
            code_income_type_id: this.enterBill.enterAccountCode,   //入账类型代码id
            reference_id: 1232,   // 关联消费单id
            biz_date: moment(new Date()).format('YYYY-MM-DD'),  // 营业日期
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),    // 业务发生的实际时间
            pay_status: 0,//enterBill.payMode,   // 支付状态 0：未付，1：结清，2：挂账/AR支付，3：部分支付 4: 异常
            is_fixed: 0,  // 是否固定消费. 0 不是,1 是.
            fixed_name: '0',   // 固定消费名称.可空
            rate_code: 'ddf',   // 房价码, 不一定有
            charge_amount: this.enterBill.moeny,  // 消费金额
            pay_amount: 0,   // 已支付的部分,一般是0,
            desc:  this.enterBill.summary,  // 说明===>此时为摘要
          }], //消费明细字典组成的数组
          // pay_mode_id: this.enterBill.payMode
        }
        scopeParam.charges = JSON.stringify(scopeParam.charges)
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/charge_detail/add_charges`
        that.$axios.post(url,scopeParam).then(res=>{
          that.getpayInfoListByAccount()//根据账户查询消费明细
          this.$message.success('入账(增加消费记录)成功!')
        }).catch(error=>{
        })
      },
      //打开入账单dialog的时候处理数据
      handleEnterBill(){
        this.preview_enter_flag = 1
        console.log('preBillLinkParam',this.preBillLinkParam,'master_guest[0].name')
        this.enterBill.billInfo = this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name
        this.getpayInfoListByAccount() //按主帐id批量查看消费明细 /v1/finance/charge_detail/get_by_account_ids
      },
      handlePreviewEnterBill(){
        this.preview_enter_flag = 0
        this.previewEnterBill.billInfo = this.preBillLinkParam.room_number + '-' + this.preBillLinkParam.master_guest[0].name
        this.getpayInfoListByAccount() //按主帐id批量查看消费明细 /v1/finance/charge_detail/get_by_account_ids
        this.preview_enterBillDialog = true;
        console.log('dadafilter=================',this.accountMaxInfoList)
      },
      //账务明细====>转账操作
      confirmTransfer(){
        // if(this.transferMoneyValue> this.transferNeedpayValue){
        //   this.$message.warning('请不要超出可转账金额!')
        // }
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/transfer_accounts_detail/add`
        let scopeParam = {
          from_id: this.preBillLinkParam.account_id,  //转出主帐id
          to_id: this.transferAccountId,  //转入主帐id addAccount得到的此时
          submit_biz_date: moment(new Date()).format('YYYY-MM-DD'),
          amount: this.transferMoneyValue, //转账金额
        }
        console.log('==============传入的值scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message === 'success'){
            that.$message.success('转账成功')
          }else{
            that.$message.warning('后台转账报错!')
          }
        }).catch(error=>{
        })
      },
      //针对账户进行转账(不是单一一条消费明细 总消费减去总付款?)
      handleTransferData(){
        console.log(',this.accountMaxInfoList',this.accountMaxInfoList)
        let value1 = 0
        let value2 = 0
        //转账 ====>此时默认全部转账完
        for(var item of this.accountMaxInfoList){
          value1 = item.charge_amount + value1 //房费统计
          value2 = item.pay_amount + value2
        }
        this.transferNeedpayValue = value1-value2 //需要转账的金额
        this.transferTabel = this.accountMaxInfoList
      },
      callback(){
        console.log(this.transferData_left,'callback1')
        console.log(this.transferData_right,'callback2')
      },
      //得到可选择的转账账户
      getTransferOption(){
        let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/get_combine_list/`
          let url= `http://bill.crowncrystalhotel.com/v1/checkin/get_combine_list/`
          that.$axios({
           method : 'get',
            url : url,
        }).then(res=>{
          console.log('res',this.transferOptions)
          if(res.data.message === 'success'){
            this.transferOptions = res.data.data
            }else{
              this.$message.warning('后台接口错误!')
            }
          })
      },
      //联房列表获取数据==>构造数据
      getLinkRoomData(){
        this.callback()
          this.transferData_left = []
          let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/get_combine_list/`
          let url= `http://bill.crowncrystalhotel.com/v1/checkin/get_combine_list/`
          that.$axios({
           method : 'get',
            url : url,
        }).then(res=>{
          console.log('res',res.data.data.results)
          let array = []
          for(var item of res.data.data.results){
            for(var itemm of item.master_guest){
              array.push({
                room_number: itemm.room_number,
                account_id: itemm.account_id,
                name: itemm.name
              })
            }
          }
          console.log('array_2',array)
          let arrayGet = this.concatData(array)
          let tempArray = arrayGet.map(item=>item.room_number+ '|' + item.name+ '|' + item.account_id)
          // this.transferData_left
          for(var item of tempArray){
            this.transferData_left.push({
              zhulianValue: '联',
              children: [],
              roomInfo: [],
              room_number: item,
              name: '',
            })
          }
          console.log('this.transferData_left',this.transferData_left)
          if(res.data.message === "success") {
            that.$message({
              message: '调用接口成功',
              type: 'success'
            });
          } else {
            that.$message({
              message: '调用接口失败',
              type: 'warning'
            });
          }
        }).catch(error=>{
        })
      },
      concatData(param){
        console.log('param',param)
        var map = {},
        array = [];
        for(var item of param){
            if(!map[item.room_number]){
              array.push({
                // id: item.id,
                // number: item.number
                name: item.name,
                room_number: item.room_number,
                account_id: item.account_id,
              })
              map[item.room_number] = item
            }else{
              for(var itemm of array){
                if(itemm.room_number == item.room_number){
                  itemm.name = item.name + ',' + itemm.name
                  break
                }
              }
            }
        }
        console.log('array组合，',array)
        return array
        },
      //tab切换选中事件
      tabClick(row){
        console.log(row,'tab')
        if(row.name==='2'){
          this.getpayInfoListByAccount()
          console.log('moneydesc',this.moneydesc)
        }
      },
      //账户明细===>处理转账
      handleChargeChange(val){
        this.transferMultipleSelection = val
        console.log('val',this.transferMultipleSelection)
      },
      getChongAccountRow(row){
        this.chongAccountRowTabel = []
        this.chongAccountRowTabel.push(row)
        console.log('this.chongAccountRowTabel',row)
      },
      getTransferAccountRow(row){

      },
      //制卡操作
      activateCard(){
        let that = this
        let url = `http://price.crowncrystalhotel.com/v1/room_lock/activate_card/`
        let scopeParam ={
          operate_type: 2,//1, "读卡"), (2, "写卡"), (4, "销卡"),
          start_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          end_time: this.preBillLinkParam.leave_time,
          room_no: this.preBillLinkParam.room_number,
          guest_no: 0,
        }
        that.$axios.post(url,scopeParam).then(res=>{
         if(res.data.message == 'success'){
            let resUrl = res.data.data.url
            //  that.$http.jsonp(resUrl, {
            //   }).then(function (res) {
            //     console.log(res);
            //   }).catch(error=>{
            //     console.error(error)
            //   })
            //  that.$http.jsonp(resUrl).success(function(data){
            //    console.log(data,'shuju')
            //  })
            this.zhicard(resUrl)
          }else{
            that.message.error('本地服务没开启!')
          }
        }).catch(error=>{
            console.error();
        })
      },
      zhicard(url){
        let new_url = "http://127.0.0.1:32727/?startTime=2019-04-26%2009:14:07&endTime=2019-04-27%2012:00:00&type=2&roomNo=501&lockNo=A0501&guestNum=null&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF57&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0&callback=func"
        this.$http.jsonp(new_url, callback).then(function(data){
          console.log(data.Data,'shuju');
          console.log(data)
        }).catch(error=>{
          console.error();
        })
      },
      //联房=>确定并打印
      confirmLinkRoom(){
        console.log('transferData_right==>选中的数据',this.transferData_right)
        let tempArray = _.cloneDeep(this.transferData_right)
        let zhuparam = this.transferData_right.find(item=>item.zhulianValue === '主')
        let main_account_param = zhuparam.room_number.split('|')[2]
        let lianParamArray = tempArray.filter(item=>item.zhulianValue != '主')
        let members_Param = []
        for(var item of lianParamArray){
          members_Param.push(item.room_number.split('|')[2])
        }
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/combine_account_operation/combine_accounts`
        let scopeParam = {
          cashier_id: 9,
          main_account: main_account_param,
          members: JSON.stringify(members_Param),
          // code_income_types: [] //入账类型代码的数组,为空表示合并账户所有类型的消费
        }
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message == "success"){
            this.$message.success('操作成功!')
          }else{
            this.$message.warning('调用后台失败或有账户已经并账了!')
          }
        }).catch(error=>{

        })
      },
      //平账=======>结账=======>不对此时不用 ===>退房 此时选c
      pingAccount(param){
        console.log('param形式 是否退房还是',param)
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/account_close_operation/add`
        let scopeParam = {
          account_id: this.preBillLinkParam.account_id, //传入平账(结账)前的账号
          biz_date: moment(new Date()).format('YYYY-MM-DD'),
          close_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          cashier: 9,//平帐点id
          close_flag: 'c', //平帐类型(以何种方式平帐的?): a=冲帐 t=转帐 c=结帐
          remark: '',//备注
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          if(res.data.message==='success'){
            this.linkHouseFornVisible = false //退房关闭页面 res.data.message 为已有平帐记录则表示退房
            this.$message.success('退房成功!')
          }else{
            this.$message.warning('关联账户收支未平衡，不能退房!')
          }
          }).catch(error=>{
        })
      },
    //结账==>退款
      jie_addChargeDetail(){
        let scopeParam = {
          account_id: this.preBillLinkParam.account_id,//主账户id
          charges: [{
            code_income_type_id: this.jieParam.jie_incomeValue,   //入账类型代码id
            reference_id: 1232,   // 关联消费单id
            biz_date: moment(new Date()).format('YYYY-MM-DD'),  // 营业日期
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),    // 业务发生的实际时间
            pay_status: 0,//enterBill.payMode,   // 支付状态 0：未付，1：结清，2：挂账/AR支付，3：部分支付 4: 异常
            is_fixed: 0,  // 是否固定消费. 0 不是,1 是.
            fixed_name: '0',   // 固定消费名称.可空
            rate_code: 'ddf',   // 房价码, 不一定有
            charge_amount: this.jieParam.jie_payValue,  // 消费金额
            pay_amount: 0,   // 已支付的部分,一般是0,
            desc:  '',  // 结账此时为空===>说明===>此时为摘要
          }], //消费明细字典组成的数组
          // pay_mode_id: this.enterBill.payMode
        }
        scopeParam.charges = JSON.stringify(scopeParam.charges)
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/charge_detail/add_charges`
        that.$axios.post(url,scopeParam).then(res=>{
          that.getpayInfoListByAccount()//根据账户查询消费明细
          this.$message.success('操作成功!')
        }).catch(error=>{
        })
      },
      //结账==>付款
      jie_payCharge(){
         let that = this
        let url= `http://47.98.113.173:9519/v1/finance/pay_detail/pay_by_charges`
        // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
        let scopeParam = {
          account_id: this.preBillLinkParam.account_id, //主账id
          pay_amount: this.jieParam.jie_payValue,
          code_pay_for_id: this.jieParam.jie_payReasonValue,
          code_income_type_id: this.jieParam.jie_incomeValue,   //入账类型代码id
          gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
          cashier_id:	9,
          pay_mode_id: this.jieParam.jie_payModeValue,
        }
        that.$axios.post(url,scopeParam).then(res=>{
          console.log('aa',res.data.message)
          if(res.data.message != 'success'){
            this.$message.warning('调用后台接口失败')
          }else{
            this.$message.warning('操作成功!')
            that.getpayInfoListByAccount()//根据账户查询消费明细
          }
          }).catch(error=>{
        })
      },
      //结账===>即为针对消费明细支付
      endJieAccount(){
        console.log('moneydesc.balance',this.moneydesc.balance)
        if(this.moneydesc.balance > 0){ //退款
          this.jie_addChargeDetail()
        }else{ //收钱
          this.jie_payCharge()
        }
      },
      /**进入结账dialog ==param */
      handleJieAccount(){
        this.jieAccountTitle = '全部结账'
        this.jieAccountDialog = true
        this.jieParam.jie_payValue = Math.abs(this.moneydesc.balance)
        //遍历然后得到杂项和房费统计
        //  that.total_consumption_value = that.accountMaxInfoList[0].account_id.total_consumption
      //   let value1 = 0
      //   let value2 = 0
      //   let value3 = 0
      //   let value4 = 0
      //   let value5 = 0
      //   let value6 = 0
      //   for(var item of this.accountMaxInfoList){
      //     if(item.code_income_type_id.id === 11 ||item.code_income_type_id.id === 13 || item.code_income_type_id.id === 14){
      //       value1 = item.charge_amount + value1 //房费统计
      //       value2 = item.pay_amount + value2
      //     }else if(item.code_income_type_id.id === 33){
      //       value3 = item.charge_amount + value3 //押金统计
      //       value4 = item.pay_amount + value4
      //     }else{
      //       value5 = item.charge_amount + value5 //杂项统计
      //       value6 = item.pay_amount + value6
      //     }
      // }
      //   this.needpayValue = this.accountMaxInfoList[0].account_id.need_pay//减法可能就会出现问题
      //   this.room_pay = value1 //房费统计 暂时这样 要改
      //   this.deposit_pay = value3 //押金统计
      //   this.sundry_pay = value5 //杂项统计
        // this.countConsume = this.endPayListParam.total_consumption //总消费
        // this.countPay =  this.endPayListParam.pay_amount//总付款
      },
      /**分账 */
      splitAccount(){
        let that = this
        let url= `http://47.98.113.173:9519/v1/finance/split_account_operation/add`
        let scopeParam = {
          main_account: this.preBillLinkParam.account_id, //传入分帐前的账号
          split_method_id: this.splitAccountParam.split_method_id,
          num: this.splitAccountParam.num,//暂时
          biz_date: moment(new Date()).format('YYYY-MM-DD'),
          cashier_id: 9,
          split_amount: this.splitAccountParam.split_amount,
          desc: this.splitAccountParam.desc
        }
        console.log('scopeParam',scopeParam)
        that.$axios.post(url,scopeParam).then(res=>{
          this.fenAccountDialog = false
          }).catch(error=>{
        })
      },
      /**
       * 续住或者提前离店
       */
      confirmContinueRoom(){
        let that = this
        let url= `http://bill.crowncrystalhotel.com/v1/checkin/extend_check/`
        // let url= `http://192.168.2.224:9005/v1/checkin/extend_check/`
        let scopeParam = {
          order_no: this.preBillLinkParam.order_no,
          chang_leave_time: moment(this.after_leave_time_2).format('YYYY-MM-DD 12:00:00'),
          total_continue_day: null,//暂时
          total_day: null,
          remark: null,
        }
        that.$axios.post(url,scopeParam).then(res=>{
          this.continueLiveDialog = false
          }).catch(error=>{
        })
      },
      //处理续住的时间
      handleDate(){
        this.before_leave_time = [new Date(this.preBillLinkParam.arr_time), new Date(this.preBillLinkParam.leave_time)]
        this.after_leave_time_1 = new Date(this.preBillLinkParam.arr_time)
        this.after_leave_time_2 = new Date(this.preBillLinkParam.leave_time)
      },
      /**
       * 根据账务id得到账务明细 ===>粗略
       */
      getpayListByAccount(){
        let array = []
        array.push(this.preBillLinkParam.account_id)
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/charge_detail/list_by_account`
          let param = {
            account_ids: array
          }
          param.account_ids = JSON.stringify(param.account_ids)
          let scopeParam = param
          that.$axios.post(url,scopeParam).then(res=>{
            this.accoutInfoList = res.data.data.list
            let charge_count = 0
            // let pay_count = 0
            for(var item of this.accoutInfoList){
              this.charge_count = item.charge_amount + charge_count
              // this.pay_count = item.pay_count + pay_count
            }
          }).catch(error=>{
        })
      },
      /**
       * 根据账户id查询消费及对应支付记录=>详细  /v1/finance/account/get_info/
       */
      getpayInfoListByAccount(interParam){
        console.log('charge_date',this.charge_date)
        let startTime = null
        let endTime = null
        if(this.charge_date != null && this.charge_date != ''){
          startTime =  moment(this.charge_date[0]).format('YYYY-MM-DD')
          endTime = moment(this.charge_date[1]).format('YYYY-MM-DD')
        }
        let testInt = Number.isInteger(interParam) //判断处理传入页码 分页
        let array = []
        array.push(this.preBillLinkParam.account_id)
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/charge_detail/get_by_account_ids `
          let param = {
            account_ids: array,
            pay_status: JSON.stringify([-1]),//	-1全部,1,已结,2已挂,-2其它.
            begin_time: startTime,//开始时间
            end_time: endTime,//结束时间
            code_income_type_id: null,//入账代码id
            page_num: testInt === true ? interParam : interParam = 1,//分页
            page_size: this.page_size
          }
          param.account_ids = JSON.stringify(param.account_ids)
          let scopeParam = param
          that.$axios.post(url,scopeParam).then(res=>{
            that.accountMaxInfoList = res.data.data.list
            console.log('that.preview_enter_flag',that.preview_enter_flag)
            if(that.preview_enter_flag === 0){
              that.accountMaxInfoListCopy = that.accountMaxInfoList.filter(item=>item.code_income_type_id.in_or_out === 'out')
            }else if(that.preview_enter_flag === 1){
              that.accountMaxInfoListCopy = that.accountMaxInfoList.filter(item=>item.code_income_type_id.in_or_out === 'in')
            }
            that.getEndpayInfoListByAccount()
            that.total = res.data.data.total_count
            that.total_consumption_value = that.accountMaxInfoList[0].account_id.total_consumption
            that.need_pay_value = that.accountMaxInfoList[0].account_id.need_pay
          }).catch(error=>{
          })
      },
       /**
       *高级权限=>查看账户最终消费情况  /v1/finance/account/get_info/
       */
        getEndpayInfoListByAccount(){
          console.log('this.preBillLinkParam.account_id值',this.preBillLinkParam)
            let id = this.preBillLinkParam.account_id
            let that = this
            let param ={
              with_collections: 1,
              related_objects: 1
            }
            let url= `http://47.98.113.173:9519/v1/finance/account/get_info/` + id
            that.$axios({
            method : 'get',
              url : url,
              params: param
          }).then(res=>{
              that.endPayListParam = res.data.data
              console.log('this.accoutInfoById_param=========最终账户',that.endPayListParam)
              that.moneydesc.pay_amount = that.endPayListParam.pay_amount
              that.moneydesc.total_consumption = that.endPayListParam.total_consumption
              that.moneydesc.need_pay = that.endPayListParam.need_pay
              that.moneydesc.balance = that.endPayListParam.balance
              // for(var item of this.endPayListParam.charge_details){
              //   for(var itemm of this.incomingAccoutList){
              //     if(item.code_income_type_id === itemm.id){
              //       item.name = itemm.name
              //     }
              //   }
              // }
            }).catch(error=>{
            })
      },
      /**已废弃 */
      // chooseInfo(item){
      //   this.tabValue = item.room_number
      //   console.log('点击',item.room_number)
      //   this.finRoomByNumber(item) //不一定适用方法
      // },
      checkedAll: function() {
        if (this.checked) {//实现反选
            this.checkboxList = [];
        } else { //实现全选
            this.checkboxList = [];
            this.orderHouseInfo.forEach( (item) => {
                this.checkboxList.push(item.room_number);
            });
        }
      },
      //清空重置对象或数组的数据
      flushData(){
        this.preBillParam.houseTypeInfoList = [{
            houseTypeValue: '',//房间类型
            roomCount: '',//房间数量
            roomPrice: '', //总价钱
            dynamic_roomNumber: [],
            mayCount: '2',
        }],
        this.preBillParam.check_guest = [{
            enterRoom: '',
            name: '',
            sex : '',
            id_code : '',
            id_no : '',
            telephone : '',
            street_add : ''
        }]
      },
        senToParent(){
          this.$emit('listenToPreview', '已经预定了')
        },
        //预订单=>确认预定
        confirmPreview(){
          // if(!this.validatePreviewData() && !this.validatePreData()){
          //   return false
          // }
          this.previewFormVisible=false
          console.log('preBillParam.consumeInfoList',this.preBillParam.consumeInfoList)
        },
        datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
            var dateSpan,
            tempDate,
            iDays;
            sDate1 = Date.parse(sDate1);
            sDate2 = Date.parse(sDate2);
            dateSpan = sDate2 - sDate1;
            dateSpan = Math.abs(dateSpan);
            iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
            return iDays
        },
        //验证预定数据
        validatePreviewData(){
            //判断选择房型为空时
            for(var item of this.preBillParam.houseTypeInfoList){
            if(item.houseTypeValue === ''){
                this.$message.warning('请选择房型!')
                return false
            }
            }
            //有入住人的时候
            if(this.is_addlive === true){
                for(var item of this.preBillParam.check_guest){
                    util.validateBlank(item.telephone,'联系电话是必填项',this)&&
                    util.validateTelNumber(item.telephone,'请输入正确手机格式',this)&&
                    util.validateBlank(item.id_no,'身份证是必填项',this)&&
                    util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
                }
            }
        },
        validatePreData(){
          return (
          util.validateBlank(this.preBillParam.reserve_base.rsv_person_name, '预定人是必填项', this)&&
          util.validateBlank(this.preBillParam.reserve_base.telephone_master,'联系电话是必填项',this)&&
          util.validateTelNumber(this.preBillParam.reserve_base.telephone_master,'请输入正确手机格式',this)
          )
        },
        //预定=》获取早餐list
        getBreakfastList(){
            let that = this
            // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
            // let url = that.UrLHeader + 'room/get_roomnumber_list/'
            let url = that.UrLHeader + 'rate_code/get_breakfast_list/'
            // let url = `http://price.crowncrystalhotel.com/v1/rate_code/get_breakfast_list/`
            that.$axios({
            method : 'get',
            url : url,
            }).then(res=>{
            if(res.data.message === 'success'){
                that.breakfastAllList = res.data.data.results
            }else{
                // that.$message.error('获取早餐列表失败!')
            }
            }).catch(error=>{
            })
        },
        getConsumeData(msg){
            this.preBillParam.consumeInfoList = msg
            console.log(msg,'msg')//获取消费子组件传来的值
        },
        //预定单 早餐=》添加早餐项
        addbreakfastItem(item,param){
          if(param === '买'){
          let breakfastInfoValue={
              descript: item.price,//早餐描述=》类型
              date: '按天',//周期
              isBuy: '买',//买/赠
              rangeTime: item.starting_days + '-' + item.closing_days,//有效期
              number: '',
              price: item.price,
              count: '',
          }
          //暂时
          if(this.preBillParam.breakfastInfoList.length>0){
              return false
          }else{
              this.preBillParam.breakfastInfoList.push(breakfastInfoValue)
          }
          }else{
          let breakfastInfoValue={
              descript: item.price,//早餐描述=》类型
              date: '按天',//周期
              isBuy: '赠',//买/赠
              rangeTime: item.starting_days + '-' + item.closing_days,//有效期
              number: '',
              price: item.price,
              count: '',
              }
          //暂时
          if(this.preBillParam.breakfastInfoList.length>0){
              return false
          }else{
              this.preBillParam.breakfastInfoList.push(breakfastInfoValue)
          }
          }
        },
        //删除早餐项
        deleteBreakfastInfo(row){
          let index = _.findIndex(this.breakfastAllList,function(o) { return o.id == row.id}) //扎到索引
          this.preBillParam.breakfastInfoList.splice(index,1)//删除指定索引
        },
        //处理备注数据 第一次进去传个空[]进去
        resolveRemarkList(){
          if(this.preBillParam.remarkList.length === 1 && this.preBillParam.remarkList[0].remarkContent === ''){
          this.preBillParam.remarkList = []
          console.log('this.preBillParam.remarkList',this.preBillParam.remarkList)
          }
        },
        //预订单编辑详情备注
        handleRemarkInfo(row){
          this.addAndUpdate = false //标记
          this.remarkContent_value = row.remarkContent
          this.middle_remarkRow = row //接收
        },
        //预订单=》删除备注
        deleteRemarkInfo(row){
          console.log('row',row)
          let index = _.findIndex(this.preBillParam.remarkList,function(o) { return o.time == row.time}) //扎到索引
          console.log('index',index)
          this.preBillParam.remarkList.splice(index,1)//删除指定索引
        },
        //预订单=》新增备注
        addAndUpdateRemarkInfo(){
          console.log('this.addAndUpdate',this.addAndUpdate)
          //  remarkContent: '',
          //     remarkType: '订单备注',
          //     status: '预定',
          //     time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
          //     operationPeople: '',
          if(this.addAndUpdate === true){
              let remarkValue={
                  remarkContent: this.remarkContent_value,
                  remarkType: '订单备注',
                  status: '预定',
                  time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
                  operationPeople: '',
              }
              if(remarkValue.remarkContent){
                  this.preBillParam.remarkList.push(remarkValue)
              }else{
                  this.$message.warning('请输入备注信息')
              }
              console.log(this.preBillParam.remarkList)
          }else{
              this.middle_remarkRow.remarkContent =  this.remarkContent_value
          }
        },
        //获取预订单房型右边弹出内容
        getHouseTypeNextValue(item,index, param){
            item.houseTypeValue = param
            switch (param) {
            case '大床房':
                this.houseType_HeadValue = '标准正价[大床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥100'
                break;
            case '标准双床房':
                this.houseType_HeadValue = '标准正价[标准双床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '特惠双床房':
                this.houseType_HeadValue = '标准正价[特惠双床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '特惠大床房':
                this.houseType_HeadValue = '标准正价[特惠大床房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '复式商务房':
                this.houseType_HeadValue = '标准正价[复式商务房]'
                this.houseType_priceValue_1= '￥100'
                this.houseType_priceValue_2= '￥80-￥95'
                break;
            case '商务大床房':
                this.houseType_HeadValue = '标准正价[商务大床房]'
                this.houseType_priceValue_1= '￥169'
                this.houseType_priceValue_2= '￥135-￥161'
                break;
            case '全新商务房B':
                this.houseType_HeadValue = '标准正价[全新商务房B]'
                this.houseType_priceValue_1= '￥169'
                this.houseType_priceValue_2= '￥135-￥161'
                break;
            default:
                break;
            }
        },
        //预订单获取对应房类型
        getHouseTypePrice(item,index){
          // item.houseTypeValue = value
          item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
          // this.preBillParam.houseTypeInfoList[index].houseTypeValue = value//替换
          // console.log('this.preBillParam.houseTypeInfoList',this.preBillParam.houseTypeInfoList)
        },
        //选房号 =>不同房型展示不同的tabel
        chooseNo(item,index){
          // if(!this.validatePreviewData()){
          //   return false
          // }
          if(item.houseTypeValue === ''){
          this.$message.warning('请先选择房型!')
          return false
          }else{
          this.getSelectRoomInfo(item) //此处可改变颜色标记哪个类型的房间
          }
          this.switchNumberDialog = true;
          // roomNo_data_list 根据item里的不同房型把数组更新
          console.log(item,'itemlist')
        },
        //选房号左边根据房型得到不同的房间信息
        selectHouseType(item){
            this.getSelectRoomInfo(item)
            console.log('itemxuanz',item)
        },
        //筛选相应房间信息
        getSelectRoomInfo(param){
            switch (param.houseTypeValue) {
            case '大床房':
                this.roomNo_data_list = [{
                room_no: 502,
                status: 'vc',
                },{
                room_no: 503,
                status: 'vc',
                },{
                room_no: 505,
                status: 'vc',
                }]
                break;
            case '标准双床房':
                this.roomNo_data_list = [{
                room_no: 508,
                status: 'vc',
                },{
                room_no: 509,
                status: 'vc',
                },{
                room_no: 501,
                status: 'vc',
                }]
                break;
            default:
                this.roomNo_data_list = []
                break;
            }
        },
        //选房号dialog=》提交得到相应房号
        getRoomNumber(){
            console.log('this.multipleSelectionget',this.multipleSelection)
        },
        //单=》选房号dialogtabel 并控制不可选房间号
        handleselect(selection, row){
          this.multipleSelection = selection;
          if(this.multipleSelection.length>2){
          let index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == row.room_no}) //扎到索引
          this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[index],false)
          this.$message.warning('不能超过该房间类型的可选数!')
          }
        },
        //增加入住人
        addSelect_2(){
          let enterValue = {
              room_number: this.preBillLinkParam.room_number,
              name: '',
              sex : '',
              id_code : '',
              id_no : '',
              telephone : '',
              street_add : '',
          }
          this.preBillLinkParam.master_guest.push(enterValue)
          this.showDeleteButton_2 = true
        },
       //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect_2(index){
          if(this.preBillLinkParam.master_guest.length>1){
            if(this.preBillLinkParam.master_guest.length ===2){
              this.showDeleteButton_2 = false
            }
            this.preBillLinkParam.master_guest.splice(index, 1)
          }else{
            this.showDeleteButton_2 = false
            return
          }
        },
        //增加选择框新建入住单里
        addSelect(){
          let houseTypeValue = {
            houseTypeValue: '',//房间类型
            roomCount: '',//房间数量
            roomPrice: '', //总价钱
            dynamic_roomNumber: [],
            mayCount: '2',
          }
          this.preBillParam.houseTypeInfoList.push(houseTypeValue)
          console.log(this.preBillParam.houseTypeInfoList,'this.preBillParam.houseTypeInfoList')
          this.showDeleteButton = true
        },
        //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect(index){
            if(this.preBillParam.houseTypeInfoList.length>1){
            if(this.preBillParam.houseTypeInfoList.length ===2){
                this.showDeleteButton = false
            }
            this.preBillParam.houseTypeInfoList.splice(index, 1)
            }else{
            this.showDeleteButton = false
            return
            }
        },
        //关闭tag
        handleClose(item,tag) {
            item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
        },
        //单=》右边全选房号dialogtabel 并控制不可选房间号
        handleselectAll(selection){
          console.log('selection1',selection)
          if(this.can_live_number > this.pre_live_number){
            if(selection.length > this.pre_live_number){
              let indexNumber = selection.length - this.pre_live_number
              selection.splice(this.pre_live_number,indexNumber)//截取最大可选数的房间从数组可选数最大长度开始截取
              this.multipleSelection = selection //截取后的值
              localStorage.setItem('selection',JSON.stringify(this.multipleSelection));
            }
          }
        },
        //自动排房
        selfSelectHouse(val){
          this.selfSortArray = []
          console.log('this.roomNo_data_list拍房',this.roomNo_data_list)
          console.log('val',val)
          if(val === '1'){
            let array = []
            this.sortNumber = this.roomNo_data_list.length - (this.roomNo_data_list.length - this.pre_live_number)
            this.noSortNumber = this.roomNo_data_list.length - this.pre_live_number
            var f = length => Array.from({length}).map((v, k) => k)
            array = f(this.sortNumber)
            for(var item in array){
              this.toggleSelection([this.roomNo_data_list[item]])
              this.selfSortArray.push(this.roomNo_data_list[item])
            }
            this.multipleSelection = this.selfSortArray
            console.log('排房选择', this.selfSortArray)
          }else{
            this.sortNumber = 0
            this.noSortNumber = 0
            this.$refs.multipleTable.clearSelection();
          }
        },
        changeNo(){
          this.getTagByRoom()
          this.getCanLiveRoom()
        },
        //获取房间号
        getCanLiveRoom(param){
          let that = this
          let url= `http://price.crowncrystalhotel.com/v1/room_status/can_live_room_list/`
          let scopeParam = {
            // room_type: param,
            start_time: this.preBillLinkParam.arr_time,
            end_time: this.preBillLinkParam.leave_time
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let array
            array = res.data.data.data
              //组装带标签的数组
              for(var item of array){
                for(var itemm of that.roomTagList){
                  if(item.room_no == itemm.room_no){
                    item.tagName = itemm.feature_name
                  }
                }
              }
              that.roomNo_data_list = array  //选房号tabel数组
          }).catch(error=>{

          })
        },
        //得到房间所对应的标签
        getTagByRoom(){
          console.log('enter tag')
          let that = this
          let url = `http://room.crowncrystalhotel.com/v1/room/get_roomfeatures_list_tree/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                  that.roomTagList = res.data.data
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        /**
         * 付款支付方式接口
         */
        getPayMode(){
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/pay_mode/info_list?page_size=999`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payModeList = res.data.data.list
            this.payModeList.push({
              id: 0,
              name: '现金'
            })
          }).catch(error=>{
          })
        },
        //入账代码
        getIncomingAccount(param){
          let that = this
          let url =  'http://47.98.113.173:9519' + '/v1/finance/incoming_account_code/info_list?page_size=999&subject=' + param
          that.$axios({
            method : 'get',
                url : url,
            }).then(res=>{
              console.log('res.data',res.data.data.list)
              that.incomingAccoutList = res.data.data.list
            }).catch(error=>{
          })
        },
        //以hotel_id获取支付方式的接口
        get_list_by_hotel(){
          let that = this
          let url =  'http://47.98.113.173:9519' + '/v1/finance/pay_mode/get_list_by_hotel?page_size=999'
          that.$axios({
            method : 'get',
                url : url,
            }).then(res=>{
              console.log('res.data支付',res.data.data.list)
              that.payModelist_other = res.data.data.list
            }).catch(error=>{
          })
        },
        /**
         * 付款原因接口
         */
        getPayReason(){
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/code_pay_for/info_list`
          that.$axios({
            method : 'get',
            url : url,
          }).then(res=>{
            that.payInfoList = res.data.data.list
          }).catch(error=>{
          })
        },
    }
}
</script>
<style lang="less" scoped>
  .houseTypeClass{
    .breakfast_class{
      li{
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        padding-right: 10px;
        padding-left: 10px;
      }
    }
  }
  //全选与单选框
  .input-checkbox{
    width: 2vw;
    height: 15px;
    background-color: #F2F6FC;
    border-color: #DCDFE6
  }
  .pop_bottom{
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    // color: #666
  }
  .pop_state{
    display: flex;
    justify-content: space-between;
    .setbtn{
        width: 60px;
        height: 20px;
        line-height: 10px;
        background-color: #f7f7f7;;
        border: none;
        border: 1px solid #ddd;
        color: #666;
        font-size: 12px;
        cursor: pointer;
        // border-radius: 4px;
      }
  }
  .pop_state button:nth-child(2n-1) {
    margin-right: 5px
  }
  .pop_state button:nth-child(2) {
    margin-right: 5px
  }
  .inline-div{
    display: flex;
    justify-content: space-between;
    color: #969696;
    margin-top: 40px
  }
  .inline-div span{
    margin-left: 5px;
  }
  //选房号左侧
  .choose_no_class{
    li{
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #b1bdbd;
      height: 47px;
      line-height: 47px;
      cursor: pointer;
    }
    background-color: #fff
  }
  .choose_no_class li:nth-child(n){
    margin-left: 5px
  }
  .imgStyle{
    margin-left: 10px;
  }
  // .right> .right-card{
  //   // display: inline-block;
  // }
  .right> .right-card2{
    width: 120px;
    height: 70px;
    margin-top: -10px;
    background-color: #3D92F1;
    display: flex;
    justify-content: space-between
  }
  .checkIn-dialog .elColMiddle{
    margin-left: 10px
  }
  .preview-dialog .elColMiddle{
    margin-left: 10px
  }
  //消费样式
  .cousume_class{
    display: flex;
    justify-content: space-between;
    margin: 10px 0px 0px 10px;
  }
  .room_pop{
    li{
        display: flex;
        justify-content: space-between;
        line-height: 35px;
        padding-right: 10px;
        padding-left: 10px;
        &:hover{
          background-color:#E5E5E5;
          cursor: pointer;
        }
    }
  }
  .romm_pop_right {
      position: absolute;
      display: block;
      width: 350px;
      border: 1px solid #EBEEF5;
      top: 0px;
      left: 300px;
      background-color: #fff;
      border-radius: 4px;
    .romm_pop_right_behind{
      display: flex;
      justify-content: space-between;
      line-height: 35px;
      padding-right: 10px;
      padding-left: 10px;
      &:hover{
        background-color:#E5E5E5;
        cursor: pointer;
      }
    }
  }
  #singleModel{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2;
    background-color: rgba(9, 9, 9, 0.46);
  }
  .singleModel_2{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: auto;
    margin: 0;
    z-index: 2;
    background-color: rgba(9, 9, 9, 0.46);
  }
  .dialog-header{
    background-color: #303A41;
    height: 10%;
    color: #fff;
    height: 54px;
    line-height: 54px;
  }
  .el-tag {
    border-radius: 24px
  }
  .pagination{
    margin: 36px 0 14px 0;
    overflow: hidden;
  }
  // .el-pagination.is-background .el-pager li:not(.disabled).active {
  //   background-color: #68819E;
  //   color: #fff;
  // }
</style>
<style scoped>
  .buttonStyle>>> .el-button{
      margin-left: 10px;
      width: 10%;
      background-color: #8895A8
   }
   .button-style_2>>> .el-button{
     width: 80px;
     background-color: #8895A8
   }
   .houseTypeClass>>> .el-dialog__header{
    background-color: #8895A8;
   }
   .houseTypeClass>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .houseTypeClass>>> .el-dialog__footer{
    background-color: #F5F5F5;
    line-height: 35px;
  }
  /* .houseTypeClass>>> .el-dialog__body{
    background-color: #eaedf2;
  } */
  .houseTypeClass.deletePadding_Class>>> .el-dialog__body{
    padding: 0px 0px;
  }
  .previewInfo-dialog.deletePadding_Class>>> .el-dialog__body{
    padding: 0px 0px;
  }
  .left-nav>>>.el-checkbox__label{
    width: 18vw;
    z-index: -1;
  }
  /* 消费 */
  .houseTypeClass>>> .el-collapse-item__content {
    padding-bottom: 10px
  }
  .houseTypeClass>>> .el-collapse-item__header{
    background-color: transparent;
    height: 40px;
    padding-left:10px;
  }
  .preview-dialog>>> .el-dialog__header{
    background-color: #ffb948;
  }
  .previewInfo-dialog>>> .el-dialog__header{
    background-color: #ffb948;
  }
  .room_pop>>> .el-popover{
    padding: 0;
  }
  .previewInfo-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .previewInfo-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .preview-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .preview-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .checkIn-dialog>>> .el-dialog__header{
    background-color: #303A41;
  }
  .checkIn-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .checkIn-dialog>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
  }
  .colClass>>> .el-input-number{
    width: 130px;
  }
</style>
