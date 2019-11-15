<template>
    <div>
        <el-dialog width="70%" class="enter-dialog" title="新建入住单"  :visible.sync="enterFormVisible"
            @close="$emit('update:show', false);closeAndFlushData()"
            :show="show">
            <el-row>
                <el-col :span="5">
                入住类型:
                <el-select  v-model="preBillParam.master_base[0].master_from_lable " style="width: 65%"  placeholder="请选择">
                    <el-option
                    v-for="item in previewTypeList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="8" class="elColMiddle">
                    <el-input v-model="infoShow"  @focus="queryCardPop" placeholder="请输入客户手机号/会员卡号/身份证号"></el-input>
                </el-col>
                <el-col :span="8">
                    <el-button style="margin-left: 10px" type="primary">搜索</el-button>
                </el-col>
            </el-row>
            <!-- <hr/> -->
            <el-row style="margin-top: 10px">
            </el-row>
            <el-row style="margin-top: 10px; margin-left: -10px;">
                <el-col :span="18" class="elColMiddle" >
                <!-- 预抵时间:<el-date-picker style="width: 10vw" v-model="preBillParam.master_base.arr_time" type="date" placeholder="选择日期"> -->
                <!-- </el-date-picker>&nbsp;&nbsp; -->
                入离时间:
                <el-date-picker style="width: 18vw" :picker-options="rangeDate"  :clearable ="false"
                    v-model="preBillParam.master_base[0].leave_time" type="daterange" range-separator="~" start-placeholder="开始日期" end-placeholder="结束日期" placeholder="选择日期">
                </el-date-picker>
                共 <span style="width: 80px">{{countDateRange}}</span> 晚
                <!-- 保留至:<el-date-picker style="width: 10vw" v-model="value2" type="date" placeholder="选择日期"></el-date-picker> -->
                </el-col>
            </el-row>
            <el-row style="margin-top: 10px">
               <el-col :span="5">
                客户来源:
                <el-select @focus="getMarket('src')"  v-model="srcValue" style="width: 65%"  placeholder="请选择">
                    <el-option
                    v-for="item in marketSrcList"
                    :key="item.id"
                    :label="item.descript"
                    :value="item.code">
                    </el-option>
                </el-select>
                </el-col>
                <el-col :span="5">
                <span style="margin-left: 10px">市场来源:</span>
                <el-select @focus="getMarket('market')"  v-model="marketValue" style="width: 65%"  placeholder="请选择">
                    <el-option
                    v-for="item in marketSrcList"
                    :key="item.id"
                    :label="item.descript"
                    :value="item.code">
                    </el-option>
                </el-select>
                </el-col>
            </el-row>
            <!-- 选择房型一行 -->
            <el-row  style="margin-top: 10px">
              <div v-for="(item,index) in preBillParam.master_base" :key="index">
                <div  style="margin-top: 10px">
                    选择房型:
                    <el-popover placement="bottom-start" width="300" trigger="click" v-model="item.visible">
                    <!-- 选择房型名称 input框的在对应值 ex:大床房 -->
                    <el-input @focus="getRoomInfo()"  style="width: 9.0vw" slot="reference" v-model="item.room_type"></el-input>
                    <!-- 选出房型弹出框=》右边弹出框 -->
                    <div v-show="showPop_right" class="romm_pop_right">
                        <div>
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; margin-top: 12px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">{{houseType_HeadValue}}</span>
                        </div>
                        <div style="height: 30px">
                            <!-- 右边展开项的数值 -->
                            <div @click="getHouseTypePrice(item,index); item.visible = false" class="romm_pop_right_behind">
                            <span>门市价</span>
                            <span>首日: <span style="color: #f3565d">{{item.fix_rate}}</span></span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <!-- 选出房型弹出框=》左边 -->
                    <div class="room_pop">
                        <div style="width: 100%; background-color: #bfcad1; height: 30px; line-height: 30px; padding-left: 5px">
                            <span style="color: #fff">房型选择</span>
                        </div>
                        <ul class="popSelect_class">
                            <li v-for="(itemm,index) of roomInfoList" :key="itemm.id" @click="showPop_right=true; getHouseTypeNextValue(item,index,itemm)">
                              <span>{{itemm.room_type_name}}</span>
                              <div style="line-height: 20px;">
                                <span style="display: block">可售: {{itemm.can_live_num}}</span>
                                <span>超预留:</span>
                              </div>
                            </li>
                        </ul>
                    </div>
                    </el-popover>
                    <span style="padding-left: 10px;">房间数:</span> <el-input-number  @change="mountMoney"  v-model="item.room_amount" :min="0"></el-input-number>
                    <!-- 入住单=>选房号 -->
                    <img @click="chooseNo(item,index)" style="margin-left: 2px; cursor: pointer;  position: relative; top: 15px;"  src="../../../assets/images/pms/houseStatus/chooseNumm.png">
                    <!-- 标签组=》即为房间数 -->
                    <div style="display: inline-block; width: 260px; height: 40px;">
                    <el-tag  :show-overflow-tooltip="true" :key="tag"  v-for="tag in item.dynamic_roomNumber" closable :disable-transitions="false" @close="handleClose(item,tag)">
                      {{tag}}
                    </el-tag>
                    <el-popover placement="right-start" width="200" trigger="click">
                      <div>
                        <el-tag  :show-overflow-tooltip="true" :key="tag" v-for="tag in item.dynamic_roomNumber">
                          {{tag}}
                        </el-tag>
                      </div>
                      <!-- 溢出的tag则显示在popover里面 -->
                      <span v-if="item.dynamic_roomNumber.length>3 ? showPoint = true : showPoint =false"  slot="reference" style="cursor: pointer; line-height: 40px;color: #378ff6; margin-left: 10px">...</span>
                    </el-popover>
                    </div>
                    <div style="position: relative; top: 20px; float: right; height: 30px">
                    <!-- 房间首日价 -->
                    <span style="margin-right: 20px">
                      首日价 <span style="color: #f3565d">{{houseType_priceValue_1}}</span> /间
                      <el-popover
                        placement="bottom-end"
                        width="650"
                        trigger="click"
                      >
                        <ul>
                          <li  style="display: inline-block;background-color: #303A41; color: #FFFFFF;" v-for="item of rateDateList" :key="item.id">
                            <span style="margin-left: 10px">{{item}}</span>
                          </li><br/>
                          <li style="display: inline-block; width: 85px; margin-top: 10px" v-for="item of rateValueList" :key="item.id">
                            <span  style="color: red; margin-left: 38px">{{item}}</span>
                          </li>
                        </ul>
                        <i  slot="reference" @click="getRateInfo(item)" class="el-icon-caret-bottom" style="background-color: #5bbbf5!important"></i>
                      </el-popover>
                    </span>
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showDeleteButton" @click="deleteSelect(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                    <img style="cursor: pointer; display: inline-block;margin-bottom: -5px;" v-show="showAddButton" @click="addSelect" src="../../../assets/images/pms/houseStatus/add.png">
                    </div>
                </div>
              </div>
            </el-row>
            <!-- 入住人一行 -->
            <el-row style="margin-top: 10px">
                <div  v-for="(item,index) in preBillParam.check_guest" :key="index" style="margin-top: 10px">
                <div style="diplay: inline-block">
                    <span style="padding-left: 14px">入住人:</span>
                    <el-select @change="selectLive" @focus="getEnter_RommNumber" v-model="item.room_number" style="width: 9.8vw"  placeholder="房间">
                      <el-option  v-for="itemm in liveoptions_Value" :key="itemm.roomNo" :label="itemm.roomNo" :value="itemm.roomNo">
                        <span style="float: left">{{ itemm.roomNo }}</span>
                        <!-- <span style="float: right; color: #8492a6; font-size: 13px">已住:{{ itemm.liveCount }}</span> -->
                      </el-option>
                    </el-select>
                    <el-input  v-model="item.name" style="width: 9.8vw" placeholder="请输入姓名"></el-input>
                    <el-select v-model="item.sex " style="width: 5.8vw"  placeholder="性别">
                      <el-option v-for="item in sexOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="item.id_code " style="width: 8.8vw"  placeholder="证件">
                      <el-option v-for="itemm in idCodeOptions" :key="itemm.value" :label="itemm.label" :value="itemm.value"></el-option>
                    </el-select>
                    <el-input  v-model="item.id_no " :class="{errorClass: isErrorClass}"  placeholder="证件号码"  style="width: 12vw"></el-input>
                    <el-input  v-model="item.telephone "  placeholder="联系方式"  style="width: 9.8vw"></el-input>
                </div>
                <div style="display: inline-block">
                    <el-input  v-model="item.street_add "  placeholder="请输入联系地址"  style="width: 40vw; margin-left: 15vw; margin-top: 10px"></el-input>
                </div>
                <!-- 入住房间入住人多选 +-->
                <!-- <img style="cursor: pointer; float: right; position: relative; top: 10px" src="../../../assets/images/pms/houseStatus/add.png"> -->
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showAddButton_2" @click="addSelect_2" src="../../../assets/images/pms/houseStatus/add.png">
                <img style="cursor: pointer; position: relative; top: 20px; float: right" v-show="showDeleteButton_2" @click="deleteSelect_2(index)" src="../../../assets/images/pms/houseStatus/delete2x.png">
                </div>
            </el-row>
            <el-row style="margin-top: 120px">
                <img style="cursor: pointer; display: inline-block; margin-bottom: -19px" @click="cardImport" src="../../../assets/images/pms/houseStatus/cardImport.png">
                <!-- <el-button style="height: 50px; width: 150px; margin-left: 12px" type="info">物品</el-button> -->
                <el-button style="height: 50px; width: 100px" type="info" @click="remarkDialog = true; resolveRemarkList()">备注</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="preview_billDialog = true">预约发票</el-button>
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="consumeDialog = true">消费</el-button> -->
                <el-button style="height: 50px; width: 100px" type="info" @click="settingDialog = true">服务设置</el-button>
                <!-- <el-button style="height: 50px; width: 100px" type="info" @click="breakfastDialog = true; getBreakfastList()">早餐</el-button> -->
                <el-button style="height: 50px; width: 100px" type="info" @click="pictureImportDialog = true;">图像导入</el-button>
                <el-button style="height: 50px; width: 100px" type="info" @click="policeDialog = true;">上传公安</el-button>
                <div style="float: right">
                    应收总额:<span style="margin-right: 10px">{{countMoney}}</span>
                    <el-popover
                      placement="top-end"
                      width="200"
                      height="300"
                      trigger="click">
                      <div>
                        房费:{{countMoney}}
                      </div>
                     <el-button slot="reference" style="margin-right: 10px;">明细</el-button>
                    </el-popover>
                <el-button style="height: 50px; width: 100px;" type="success" @click="senToParent();confirmEnter()">确认入住</el-button>
                </div>
            </el-row>
        </el-dialog>
         <!--卡查询-->
        <el-dialog class="houseTypeClass deletePadding_Class" :title="changeTitle" :visible.sync="cardQueryDialog" :modal="true">
          <div v-if="changeTitle === '卡查询'" style="height: 400px; width: 100%;">
            <el-row style="margin: 10px;10px;10px;10px">
              智能搜索 <el-input style="width: 20vw"></el-input>
              <span style="margin-left: 10px">模糊搜索</span> <el-checkbox></el-checkbox>
              <el-button type="primary" style="float: right">读卡</el-button>
              <el-button type="primary" style="float: right;margin-right: 10px" @click="getCardMemberList">查询</el-button>
            </el-row>
            <div>
                <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}"  :data="cardBaseList" style="width: 100%;height: 300px;overflow: auto">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="card_name" label="姓名"></el-table-column>
                <el-table-column prop="card_no" label="卡号"></el-table-column>
                <el-table-column label="性别">
                  <template slot-scope="scope">
                    {{scope.row.sex==='1' ? '男' : '女'}}
                  </template>
                </el-table-column>
                <el-table-column prop="id_no" label="证件号码"></el-table-column>
                <el-table-column  label="积分余额">
                   <template slot-scope="scope">
                    {{scope.row.point_pay - scope.row.point_charge}}
                  </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="card_type" label="会员计划"></el-table-column>
                <el-table-column prop="card_level" label="卡等级"></el-table-column>
                <el-table-column prop="date_end" label="有效期"></el-table-column>
                <el-table-column prop="status" label="卡状态"></el-table-column>
                <el-table-column prop="iss_hotel" label="发行酒店"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                </el-table>
            </div>
          </div>
          <!--v-if判断-->
          <div v-if="changeTitle === '订房中心查询'" style="height: 400px; width: 100%;">
            <div>
              <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}"  :data="centerRoomList" style="width: 100%;height: 300px;">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
              </el-table>
            </div>
          </div>
           <div v-if="changeTitle === '协议单位查询'" style="height: 400px; width: 100%;">
            <div>
              <el-table @row-click="selectCard" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}"  :data="centerRoomList" style="width: 100%;height: 300px;">
                <el-table-column  type="index" label="序号" fixed></el-table-column>
                <el-table-column prop="name" label="姓名"></el-table-column>
                <el-table-column prop="phone" label="手机"></el-table-column>
              </el-table>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              <span style="margin-left: 10px">记录总数:<span style="color: #23c608"></span></span>
            </div>
            <el-button  type="primary">打卡主单</el-button>
            <el-button  type="primary" @click="setCardInfo">预订</el-button>
            <el-button  type="primary" @click="setCardInfo">确定</el-button>
            <el-button  type="info" @click="cardQueryDialog=false">取消</el-button>
          </div>
        </el-dialog>
        <!-- 选房号 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="选房号" :visible.sync="switchNumberDialog" :modal="true">
          <div style="height: 400px; width: 100%; background-color: #EBEDF1">
            <!-- <div style="float: left; width:25%">
              <ul class="choose_no_class">
                <li v-for="(item,index) of this.preBillParam.master_base" :key="item.room_type" @click="selectHouseType(item,index)">
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
              自动排房<el-switch style="margin-left: 5px"  @change="selfSelectHouse"  v-model="switchValue" active-color="#13ce66" active-text="是" inactive-text="否" active-value="1" inactive-value="0" inactive-color="#EAECF0"></el-switch>
              <span style="margin-left: 10px">排房结果: <span>{{this.sortNumber}}</span></span>
              <span style="margin-left: 10px">未排房总数:<span style="color: #f3565d">{{this.noSortNumber}}</span></span>
              <span style="margin-left: 10px">已排房总数:<span style="color: #23c608">{{this.sortNumber}}</span></span>
            </div>
            <el-button @click="switchNumberDialog = false; getRoomNumber()" type="danger">提交</el-button>
          </div>
        </el-dialog>
        <!-- 入预收操作 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="入预收操作" :visible.sync="enterPreviewDialog" :modal="true">
          <div style="width: 100%; height: 400px">
            <ul class="enter_pre_ul">
              <!-- <li><span>&nbsp;&nbsp;订单号:</span> <span>{{this.returnEnterParam.order_no}}</span></li> -->
              <li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应收: </span><span style="color: #f3565d;">{{countMoney}}</span>(预收款总计: <span style="color: #f3565d;">{{countMoney}}</span>已收:  <span>{{payMoney}}</span>预计消费总计: {{countMoney}})</li>
              <!-- <li><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;应收: </span><span style="color: #f3565d;">{{payMoney}}</span>(预收款总计: <span style="color: #f3565d;">{{payMoney}}</span>已收:  <span>{{payMoney}}</span>预计消费总计: {{payMoney}})</li> -->
              <li><span>付款方式:</span>
                <el-select clearable style="width: 12vw" @focus="getPayMode()" placeholder="付款方式"  v-model="payModeValue">
                    <el-option
                      v-for="item in payModeList"
                      :key="item.id"
                      :label="item.model_name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                <span>入住房号:</span>
                <el-select clearable style="width: 12vw"  placeholder="入住房号"  v-model="room_no_value">
                    <el-option
                      v-for="item in roomNumberList"
                      :key="item.id"
                      :label="item"
                      :value="item">
                      <span style="float: left">{{ item }}</span>
                      <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{item.isPay}}</span> -->
                    </el-option>
                  </el-select>
                  <!-- <el-button size="small" v-if="isAccout" @click="openAccount()"  type="danger" round>开账</el-button>   -->
              </li>
              <li>
                <span>付款原因:</span>
                <el-select clearable style="width: 12vw" @focus="getPayReason()" placeholder="付款原因"  v-model="payReasonValue">
                  <el-option
                    v-for="item in this.payInfoList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
                <span>消费明细:</span>
                <el-select clearable  @focus="getIncomingAccount"  v-model="collectionCharge"  style="width: 12vw"  placeholder="请选择">
                  <el-option
                    v-for="item in incomingAccoutList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span>付款金额:</span>
                <el-input  style="width: 12vw"  v-model="payMoney"></el-input><span style="color: red">(付款金额必须大于预计消费总计!)</span>
              </li>
            </ul>
            <div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button type="danger"  @click="enterPreviewDialog=false;enterFormVisible = false;">打印关闭</el-button> -->
            <el-button size="small"  @click="getMoney()"  type="danger">入账</el-button>
          </div>
        </el-dialog>
        <!-- 聚合支付 -->
        <el-dialog class="houseTypeClass deletePadding_Class" title="聚合支付" :visible.sync="prePayDialog" :modal="true">
          <div style="width: 100%; height: 400px">
            <ul class="enter_pay_ul">
              <li><span>本次扫码支付金额:</span> <span style="color: #38cb25;">￥200</span></li>
              <li><span>请使用扫码枪扫码:</span>
                  <el-input size="small" style="width: 8vw"></el-input>
                  <el-button size="small" type="danger" round>提交</el-button>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="prePayDialog=false">关闭</el-button>
          </div>
        </el-dialog>
        <!--新建入住单=>早餐-->
        <el-dialog class="houseTypeClass deletePadding_Class" width="70%"   title="新增早餐" :visible.sync="breakfastDialog" :modal="true">
          <div style="height: 400px; width: 100%;">
            <div style="float: left;width: 20%;height: 400px; border-right: 1px solid #c8c8c8; background-color: #eaedf2;">
              <div style="width: 100%; background-color: #bfcad1; height: 47px; line-height: 47px; padding-left: 5px">
                早餐分类
              </div>
              <ul class="breakfast_class">
                <li v-for="item of this.breakfastAllList" :key="item.id">
                  <span>{{item.descript}}</span>
                  <span>
                    {{item.price}}
                    <el-button  circle size='mini' type="danger" @click="addbreakfastItem(item,'买')">买</el-button>
                    <el-button  circle size='mini' type="success" @click="addbreakfastItem(item,'赠')" style="margin-left: -2px;">赠</el-button>
                  </span>
                </li>
              </ul>
            </div>
            <div style="float: right;width: 80%">
              <el-table :data="preBillParam.breakfastInfoList" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" style="width: 100%; height:400px">
                <el-table-column prop="descript" label="早餐类型"></el-table-column>
                <el-table-column prop="date" label="周期"></el-table-column>
                <el-table-column prop="isBuy" label="买/赠"></el-table-column>
                <el-table-column prop="rangeTime" width="180" label="有效期"></el-table-column>
                <el-table-column prop="number"  width="150" label="数量">
                  <template slot-scope="scope">
                    <el-input-number size="mini" v-model="scope.row.number"></el-input-number>
                  </template>
                </el-table-column>
                <el-table-column prop="price" label="单价(元)"></el-table-column>
                <el-table-column prop="count" label="总计(元)">
                  <template>
                  <span>{{sumBreakfastMoney.toFixed(2)}}</span>
                </template>
                </el-table-column>
                <el-table-column  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="deleteBreakfastInfo(scope.row)" type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              <el-button type="info" @click="preBillParam.breakfastInfoList = []">清空早餐</el-button>
              <span style="margin-left: 30px">选购商品总数:<span></span></span>
            </div>
            <span style="margin-right: 20px;">消费总计:<span></span></span>
            <el-button type="success"  @click="breakfastDialog=false">确定</el-button>
          </div>
        </el-dialog>
           <!--新建入住单=>上传公安-->
        <el-dialog class="houseTypeClass" width="50%"   title="上传公安" :visible.sync="policeDialog" :modal="true">
          <div style="height: 400px">
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" style="float: left">拍照</el-button>
            <el-button type="info" style="float: left">重拍</el-button>
            <el-button type="primary" >确定上传</el-button>
          </div>
        </el-dialog>
        <!--新建入住单=>图像导入-->
        <el-dialog class="houseTypeClass" width="50%"   title="图像导入" :visible.sync="pictureImportDialog" :modal="true">
          <div style="height: 400px">
              <div class="block" style="height: 300px; border: 1px solid #CCCCCC;">
                <el-image style="height: 300px;width:100%" :src="imageUrl"></el-image>
              </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button type="info" style="float: left">选择本地文件</el-button> -->
              <el-upload class="el-button el-button--text el-button--small"
                ref="upload"
                :action = 'uploadUrl'
                :show-file-list="false"
                :before-upload="beforeUpload"
                :on-success="handlePicturlSucess">
                <el-button slot="trigger"  type="primary">确定上传</el-button>
                <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">确定上传</el-button> -->
              </el-upload>
            <el-button @click="pictureImportDialog = false" type="info">关闭</el-button>
          </div>
        </el-dialog>
        <!--新建入住单=>设置-->
        <el-dialog class="houseTypeClass" width="50%"   title="设置" :visible.sync="settingDialog" :modal="true">
          <div style="height: 400px">
            <ul style="text-align: right; float:left;">
              <li>
                是否固定房价<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_fix_rate " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <li style="margin-top: 10px">
                是否保密订单<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_secrete  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <li style="margin-top: 10px">
                是否房价保密<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_secret_rate  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
              <!-- <li style="margin-top: 10px">
                是否walkin<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.is_walkin  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li> -->
              <li style="margin-top: 10px">
                是否允许记账<el-switch style="margin-left: 5px"  v-model="preBillParam.master_base.allowed_AR  " active-color="#13ce66" active-text="开" inactive-text="关" active-value=1 inactive-value=0 inactive-color="#EAECF0"></el-switch>
              </li>
            </ul>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="danger"  @click="settingDialog=false">保存</el-button>
          </div>
        </el-dialog>
          <!--新建入住单=>消费-->
        <c-dialog :show.sync= consumeDialog :parentParam='preBillParam'  v-on:listenTochildEvent="getConsumeData"></c-dialog>
          <!--新建入住单=>发票-->
        <el-dialog class="houseTypeClass" width="20%" title="预约发票" :visible.sync="preview_billDialog" :modal="true">
          <div style="height: 400px">
            <el-input  placeholder="请输入公司名称"></el-input>
            <el-input style="margin-top: 10px"  placeholder="请填写纳税人识别号"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写开户银行名称"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写开户银行账户"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写公司地址"></el-input>
            <el-input style="margin-top: 10px" placeholder="请填写公司电话"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="info" @click="preview_billDialog=false">保存</el-button>
          </div>
        </el-dialog>
        <!--新建入住单=>备注-->
        <el-dialog class="houseTypeClass deletePadding_Class" title="备注" :visible.sync="remarkDialog" :modal="true">
          <div style="height: 400px">
            <el-table :data="preBillParam.remarkList" :header-cell-style="{background:'#BFCAD1', color: '#3e608a'}" style="width: 100%">
              <el-table-column prop="remarkContent" label="备注内容"></el-table-column>
              <el-table-column prop="remarkType" label="备注类型"></el-table-column>
              <el-table-column prop="status" label="订单状态"></el-table-column>
              <el-table-column prop="time" label="操作时间"></el-table-column>
              <el-table-column prop="operationPeople" label="操作人"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button @click="addAndUpdate_remarkDialog = true; addAndUpdate = false; handleRemarkInfo(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="deleteRemarkInfo(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div slot="footer" class="dialog-footer">
            <div style="float: left;">
              <el-button type="info" @click="addAndUpdate_remarkDialog=true; addAndUpdate = true; remarkContent_value = ''">新增备注</el-button>
            </div>
            <el-button type="info" plain  @click="remarkDialog=false">关闭</el-button>
          </div>
        </el-dialog>
        <!-- 新建/编辑入住单备注=》新建编辑备注 -->
        <el-dialog class="houseTypeClass" width="30%" title="新增备注" :visible.sync="addAndUpdate_remarkDialog" :modal="true">
          <div style="height: 200px">
            <el-input v-model="remarkContent_value" placeholder="请输入备注信息" type="textarea" :rows="10"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="info"   @click="addAndUpdateRemarkInfo();addAndUpdate_remarkDialog=false">保存</el-button>
          </div>
        </el-dialog>
    </div>
</template>
<script>
import _ from 'lodash'
import util from '../../../common/util.js'
import moment from 'moment'
import cDialog from './consumeDialog'
export default {
    data(){
        return {
          imageUrl: '',//图片地址
          uploadUrl: 'http://47.97.178.98:9500/resource/employee/head_image/upload',
          isErrorClass: false,
          infoShow: '',
          changeTitle: '',//入住类型变动，不同的title
          cardBaseList: [],//会员信息
          centerRoomList: [],//订房中心list
          cardQueryDialog: false,
          collectionCharge: '',
          collectionChargeData: [],//收款要选择的数据
          incomingAccoutList: [],//入账代码list
          rateCodeValue: 'RAC',
          rateDateList: [],//房价时间与价钱对应数组
          rateValueList: [],
          accoutInfoById_param: {},
          return_accountParam_1: {},
          isAccout: true,
          billUrl: 'http://bill.crowncrystalhotel.com/v1/',
          roomUrL:'http://price.crowncrystalhotel.com/v1/',
          accountUrl: 'http://47.98.113.173:9519/v1/',
          roomUrL_2: 'http://code.crowncrystalhotel.com/v1/',
          marketValue: '',
          srcValue: '',
          marketSrcList: [],//市场码来源码数据
          pictureImportDialog: false,
          policeDialog: false,
          selfSortArray: [],
          payMoney: 0,
          roomNumberList: [],//已选的入住房间
          returnEnterParam: {},
          payReasonValue: '',//付款原因对应值
          payModeValue: '',//付款方式对应值
          payModeList: [],//支付方式接口
          payInfoList: [],//付款原因接口
          payDetail_param:{
            account_ids: [],//需要序列化
            pay_amount: null,//	支付金额.可正负.负代表支出
            pay_status: null,
            pay_reason_id: null,
            biz_date:	moment(new Date()).format('YYYY-MM-DD'),
            gen_time:		moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            pay_mode_id	: null,//以上都是必填 付款方式id, 目前已知 0. 现金 1. POS 2. 支付宝 3. 微信 4. AR 5. 预授权
            check_status: null,
            check_time: '',
            cashier: null,
            create_user_id: 0,
            original_pay_dict: {},
            charge_details: [],
          },
          return_accountParam:{},
          //账户param
          account_param: {
            account_type: 0,//int 默认为正常账户 	账户类型:0:正常账户 1：AR账户
            reference_link_label: 0,//	关联方标志，0：预定账户，1：入住单，2：已分帐的单独客人账户
            reference_id: '12345',//int 此时测试数据
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
            noSortNumber: 0,
            sortNumber: 0,
            countMoney: 0,
            roomTagList: [],
            flag: false,
            liveoptions_Value: [],
            liveoptions_NoChange: [],
            liveoptions: [],//入住人一行下拉
            _room_type: '',//房型
            rowIndex: [],//行数数组
            pre_live_number: '',//准备入住数
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
            enterFormVisible: this.show,
            selectParam: '',//小方块选择参数全局定义
            is_addlive: true,//是否添加入住人
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
            showPop_right: false,//是否显示入住单选择房型右边弹框
            //入住单大对象
            preBillParam: {
              room_list: [], //入住人房间号
              //选择房型一行及其他
              master_base: [{
                room_amount: '0',//房间数量几件=add=
                fix_rate: '',//房价码
                master_from_lable: '',//入住类型
                arr_time: '',//预抵时间
                leave_time: [ new Date(), new Date(new Date().getTime() + 24*60*60*1000)],//离开时间
                can_live_num: '',//add
                room_type_value: '',//房型名称对应ID
                dynamic_roomNumber: [],//动态房间号=》应是一个数组
                roomPrice: '', //总价钱=add= 前面都是自己加的===========
                room_type: '',//房型名称
                room_number: '',//房间数几间 数组变字符串 // ['111', '222', '333','444', '555','666', '777']
                account_id: null,
                team_id: 2,
                team_name: '2',
                biz_date: '2018-12-01 10:10:01',
                rsv_type_id: 22,
                from_rsv_label: 2,
                order_no: '123',
                sales_person_id: 2,
                code_occ_id: 2,
                extra_flag: '2',
                adult_num: 2,
                children_num: 2,
                is_fix_rate: 1,
                is_secrete: 1,
                is_secret_rate: 1,
                allowed_AR: 1,
                AR_id: 1,
                code_commision_id: '1',
                code_market_id: '1',
                code_src_id: '1',
                reference_id: '123456',
                master_status_lable: null,
                total_chartge: 0,
                total_pay: 0,
                last_account_id: null,
                last_pay_id: null,
                account_num: null,
                pay_num: 0,
                MASTER_ID: null,
                sub_lable: null,
                is_room_posted: false,
                building_name: null,
                room_facility_ids: '11',
                extra_person_num: null,
                extra_person_price: null,
                EXTRA_BED_NUM: null,
                EXTRA_BED_price: null,
                EXP_STA: '11',
                RM_OCC_ID: null,
              }],
              //入住人一行
              check_guest:[{
                arr_time: '2019-04-08 12:20:20',//预抵时间
                leave_time: '2019-04-10 12:20:20',//离开时间
                liveCount: 0,//可选数
                room_number: '',//房间号
                id_code: '01',//证件类型
                id_no: '',//证件号码
                name: '', //姓名
                sex: '0',//性别
                telephone: '',//手机号
                street_add: '',//街道地址
                // code: '123',
                // code_name: '77777',
                // descript: null,
                // descript_en: null,
                list_order: 1,
                last_name: null,
                first_name: null,
                name2: null,
                name_combi: null,
                is_save: false,
                language: '2',
                title: null,
                salutation: null,
                race: null,
                religion: null,
                career: '122',
                nation: null,
                visa_no: null,
                visa_grant: null,
                enter_port: null,
                where_from: null,
                where_to: null,
                salary: null,
                education: null,
                marital: null,
                company_id: null,
                company_na: '222',
                pic_photo: null,
                pic_sign: null,
                remark: '222',
                is_anonymo: false,
                weixin: '2',
                mobile: null,
                email: '1016068291@qq.com',
                country_id: null,
                division_id: null,
                state_id: null,
                city_id: null,
                zipcode: null,
                // master_base_id: 1231231231,
                guest_id: 123456
              }],
              //早餐
              breakfastInfoList: [],
              settingInfo: {},//设置
              //入住=》消费
              consumeInfoList: [{
                  name: '',
                  number: '',
                  price: '',
                  count: ''
              }],
              billInfo: {},//发票
              remarkList: [{
                  remarkContent: '',
                  remarkType: '',
                  status: '',
                  time: '',
                  operationPeople: '',
              }],//备注
              //选择房型list=》动态多选框
              // master_base: [{
              //     room_type: '',//房间类型
              //     room_amount : '',//房间数量
              //     roomPrice: '', //单价价钱
              //     dynamic_roomNumber: ['111', '222', '333','444', '555','666', '777'],//动态房间号=》应是一个数组
              //     mayCount: '2', //可入住数
              // }],
            },
            temp_value: '',
            showPoint: false,//入住=>多余部分
            activeNames: ['1'],
            consumeData: [],//入住=》消费数组
            remarkData: [],//备注数组
            breakfastDialog: false,//入住=》早餐dialog
            settingDialog: false,//入住=》设置dialog
            consumeDialog:false,//入住=》消费dialog
            preview_billDialog: false,//预约发票
            addAndUpdate_remarkDialog: false,//入住=>备注dialog=>新增备注
            remarkDialog: false,//入住=>备注dialog
            previewTypeList: [{
              label: '非会员/会员',
              value: 0
              },{
              label: '散客入住',
              value: 1
              },{
              label: '团队入住',
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
            consumptionDialog: false,
            borrowingDialog: false,
            billDialog: false,
            leaveDialog: false,
            houseTypeDialog: false,
            switchNumberDialog: false,
            enterPreviewDialog: false,//入预收操作
            prePayDialog: false, //聚合支付
            editPriceDialog: false,
            addPersonDialog: false,
            continueLiveDialog: false,
        }
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        parentParam: {
            type: Object,
            required: true
        }
    },
     components: {
      'cDialog': cDialog,
    },
    watch: {
      show () {
        this.srcValue = '',
        this.marketValue = '',
        this.imageUrl = ''
        this.enterFormVisible = this.show
        this.getRoomType() //准备:循环得到匹配的房型中文名
      },
      parentParam(){
        // 此种就是进来子组件 得到相应房型房间价格 然后可选房号
        for(var item of this.preBillParam.master_base){
          item.room_type = this.parentParam.roomType
          item.room_type_value = this.parentParam.roomType_code
          // item.roomCount = 0
          item.dynamic_roomNumber.push(this.parentParam.roomNo)
        }
        let param = {
          room_type: this.parentParam.room_type_name
        }
        this.getRateCode(item,param) //====下面没有用
        console.log('watch',param.room_type,param)
        this.getCanLiveRoom(param.room_type) //根据房型选未占用房间
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
      //计算入离时间差天数
      countDateRange(){
        let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
        let end = moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
        return this.datedifference(start, end)
      }
    },
    created(){
      // this.enterPreviewDialog = true
      // this.getRoomOccupy()
      // this.getRoomType() //准备:循环得到匹配的房型中文名
    },
    methods: {
      //手动上传
      submitUpload(){
        console.log('111')
        this.$refs.upload.submit()
      },
      //上传之后
      handlePicturlSucess(response,file){
        console.log('response',response)
        console.log('file',file)
        if(response.message == 'success'){
          this.imageUrl = 'http://47.97.178.98:9500/' +  response.url
          this.$message.success('上传成功!')
        }else{
          this.$message.error('上传失败!')
        }
      },
      //上传之前
      beforeUpload(){

      },
      //证件导入功能 自动填充入住人信息
      cardImport(){
        let that = this
        let resUrl = `http://127.0.0.1:32727/?startTime=2019-04-18%2009:12:49&endTime=2019-4-19%2012:00:00&type=5&IDC_Factory=HuaShiDianZi_IDC_Card&IDC_ComPort=1001&roomNo=undefined&lockNo=undefined&guestNum=undefined&Lock_EnableLock=True&Lock_Factory=LockSDK_Card&Lock_ComPort=USB&Lock_ReaderType=RF50&Lock_SysCode=&Lock_HotelCode=1703936&Lock_CancelCard=True&Lock_WriteCardNum=10&Lock_ElevatorlsTrue=True&Lock_BeforeHour=0&Lock_AfterHour=0&jsonp=angular.callbacks._0`
        that.$http.jsonp(resUrl, {
        }).then(function (res) {
          console.log(res)
        }).catch(error=>{
          console.error(error)
        })
      },
      //卡查询 注意当为会员入住的时候
        queryCardPop(){
          if(this.preBillParam.master_base[0].master_from_lable === 0){
            this.cardQueryDialog = true
            this.changeTitle = '卡查询'
            this.getCardMemberList()
            setTimeout(() => {
              // this.get_code_list()//请求字典项
            }, 300);
          }else if(this.preBillParam.master_base[0].master_from_lable === 3){
            this.cardQueryDialog = true
            this.changeTitle = '订房中心查询'
            this.getCenterRoomList()
          }else if(this.preBillParam.master_base[0].master_from_lable === 4){
            this.cardQueryDialog = true
            this.changeTitle = '协议单位查询'
            this.getUnitList()
          }
        },
        //入住人塞入值
        setCardInfo(){
          this.cardQueryDialog = false
        },
        //点击选中行数据 并查询该条的房价码
        selectCard(row, column, event){
            //        id_code: '0',//证件类型
            // id_no: '411521199612205367',//证件号码
            // name: 'haxx', //姓名
            // sex: '0',//性别
            // telephone: '15026864009',//手机号
            // street_add: '12312',//街道地址
          this.$message.info('已选择该条数据!')
          if(this.preBillParam.master_base[0].master_from_lable === 0){
            this.rateCodeValue = row.rate_code
            this.infoShow = row.card_name
          }else if(this.preBillParam.master_base[0].master_from_lable === 3 || 4){
            this.rateCodeValue = row.rate_code
            this.infoShow = row.name
          }
          // this.get_card_code(row)
          console.log('row1111',row)
          console.log('this,',this.preBillParam.check_guest)
          for(var item of this.preBillParam.check_guest){
            item.id_code = row.id_code
            item.id_no = row.id_no
            item.name = row.card_name
            item.telephone = row.phone
          }
          this.cardQueryDialog = false
        },
        //获取指定会员计划，会员等级的价码信息
        get_card_code(row){
          let that = this
          let url = `http://47.98.113.173:9102/v1/customer/member/get_card_code/`
          let scopeParam ={
            card_type:  row.card_type,
            card_level: row.card_level,
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('res,会员信息返回房价码',res.data.data.results)
            let temp = res.data.data.results
            let rateValue = temp.find(item=>item.extra_item === 'rate_code')
            console.log('rateValue,',rateValue)
            console.log('rateValue[extra_item_value]',rateValue.extra_item_value)
            if(this.preBillParam.master_base[0].master_from_lable === 0){
              this.rateCodeValue = rateValue.extra_item_value
            }
            console.log('this.rateCodeValue',this.rateCodeValue)
            }).catch(error=>{
          })
        },
        //订房中心查询(OTA)
        getCenterRoomList(){
          let that= this
          let url = 'http://47.98.113.173:9102/v1/customer/company/get_company_base_list/'
          let param = {
            sys_cat: 'S'
          }
          that.$axios({
            method: 'get',
            url: url,
            params: param
          }).then(res=>{
            util.hintInfo(this,'success', '查询成功！');
            that.centerRoomList = res.data.data.results
          })
        },
        //协议单位查询
        getUnitList(){
          let that= this
          let url = 'http://47.98.113.173:9102/v1/customer/company/get_company_base_list/'
          let param = {
            sys_cat__in: 'A,C'
          }
          that.$axios({
            method: 'get',
            url: url,
            params: param
          }).then(res=>{
            util.hintInfo(this,'success', '查询成功！');
            that.centerRoomList = res.data.data.results
          })
        },
        //卡查询
        getCardMemberList(){
          let _this = this
          let url = `http://47.98.113.173:9102/v1/customer/member/get_card_base_list/`
          _this.$axios({
            method: 'get',
            url: url
          }).then(res=>{
            if (res.data.message == "success") {
              if (res.data.data.results.length) {
                 _this.cardBaseList = res.data.data.results;
                 console.log('llll11111111111',_this.cardBaseList)
                 console.log('222222222因该开始',_this.CardTypeTree)
                  // 数据转换---
                  for (let i in _this.cardBaseList) {
                    // 状态转换
                    for (let j in _this.statusArr) {
                      if (_this.cardBaseList[i].status == _this.statusArr[j].code) {
                        _this.cardBaseList[i].status = _this.statusArr[j].descript;
                      }
                    }
                    // 会员计划转换
                    for (let m in _this.CardTypeTree) {
                      if (
                        _this.cardBaseList[i].card_type ==
                        _this.CardTypeTree[m].code
                      ) {
                        _this.cardBaseList[i].card_type =
                          _this.CardTypeTree[m].descript;
                        //会员等级转换
                        for (let n in _this.CardTypeTree[m].children) {
                          if (
                            (_this.cardBaseList[i].card_level =
                              _this.CardTypeTree[m].children[n].code)
                          ) {
                            _this.cardBaseList[i].card_level =
                              _this.CardTypeTree[m].children[n].descript;
                          }
                        }
                      }
                    }
                  }
                }
              }else{
                _this.$message.error("请求服务器失败，稍后重试");
              }
          }).catch(error => {});
        },
        //清空重置对象或数组的数据
        flushData(){
          this.preBillParam.master_base = [{
                room_amount: '0',//房间数量几件=add=
                fix_rate: '',//房价码
                master_from_lable: 0,//入住类型
                arr_time: '',//预抵时间
                leave_time: [ new Date(), new Date(new Date().getTime() + 24*60*60*1000)],//离开时间
                can_live_num: '',//add
                room_type_value: '',//房型名称对应ID
                dynamic_roomNumber: [],//动态房间号=》应是一个数组
                roomPrice: '', //总价钱=add= 前面都是自己加的===========
                room_type: '',//房型名称
                room_number: '',//房间数几间 数组变字符串 // ['111', '222', '333','444', '555','666', '777']
                // room_class: '',
                // code: '12',
                // code_name: '13',
                // create_user_id: 0,
                // descript: '11',
                // descript_en: '123',
                // hotel_group_id: 123,
                // hotel_id: 123,
                // list_order: 123,
                // modify_user_id: 0,
                account_id: null,
                team_id: 2,
                team_name: '2',
                biz_date: '2018-12-01 10:10:01',
                rsv_type_id: 22,
                from_rsv_label: 2,
                order_no: '123',
                sales_person_id: 2,
                code_occ_id: 2,
                extra_flag: '2',
                adult_num: 2,
                children_num: 2,
                is_fix_rate: 1,
                is_secrete: 1,
                is_secret_rate: 1,
                allowed_AR: 1,
                AR_id: 1,
                code_commision_id: '1',
                code_market_id: '1',
                code_src_id: '1',
                reference_id: '123456',
                master_status_lable: null,
                total_chartge: 0,
                total_pay: 0,
                last_account_id: null,
                last_pay_id: null,
                account_num: null,
                pay_num: 0,
                MASTER_ID: null,
                sub_lable: null,
                is_room_posted: false,
                building_name: null,
                room_facility_ids: '11',
                extra_person_num: null,
                extra_person_price: null,
                EXTRA_BED_NUM: null,
                EXTRA_BED_price: null,
                EXP_STA: '11',
                RM_OCC_ID: null,
          }]
        },
        //刷新入住人
        flush_reserveGurst(){
          this.preBillParam.check_guest = [{
            arr_time: '2019-04-08 12:20:20',//预抵时间
            leave_time: '2019-04-10 12:20:20',//离开时间
            liveCount: 0,//可选数
            room_number: '',//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // code_name: '77777',
            // descript: null,
            // descript_en: null,
            list_order: 1,
            last_name: null,
            first_name: null,
            name2: null,
            name_combi: null,
            is_save: false,
            language: '2',
            title: null,
            salutation: null,
            race: null,
            religion: null,
            career: '122',
            nation: null,
            visa_no: null,
            visa_grant: null,
            enter_port: null,
            where_from: null,
            where_to: null,
            salary: null,
            education: null,
            marital: null,
            company_id: null,
            company_na: '222',
            pic_photo: null,
            pic_sign: null,
            remark: '222',
            is_anonymo: false,
            weixin: '2',
            mobile: null,
            email: '1016068291@qq.com',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            // master_base_id: 1231231231,
            guest_id: 123456
          }]
        },
         closeAndFlushData (){
          this.preBillParam.master_base.rsv_from = '',//预定类型
          this.flushData()
          this.flush_reserveGurst()
        },
        senToParent(){
          this.$emit('listenToPreview', '已经入住了')
        },
        //计算价钱总数
        mountMoney(){
          this.countMoney = 0 //此处必须重新申明值为0避免全局变量的影响
          for(var item of this.preBillParam.master_base){
            this.countMoney = this.countMoney  + this.houseType_priceValue_1 * item.room_amount
          }
        },
        /**
         * 新建预定不用 这个接口放弃
         * 付钱的时候
         * 增加支付记录
         */
        addPayDetail(){
          // this.account_param.charge_details = [{
          //   code_income_type_id: 15,
          //   reference_id: 121,
          //   charge_amount: 100,
          // }]
          //开始处理数据
          this.payDetail_param.account_ids = [1]
          this.payDetail_param.account_ids = JSON.stringify(this.payDetail_param.account_ids)
          this.payDetail_param.charge_details = JSON.stringify(this.payDetail_param.charge_details)
          this.payDetail_param.pay_amount = this.countMoney
          this.payDetail_param.pay_mode_id = this.payModeValue
          this.payDetail_param.pay_status = 0//	支付状态 ,0:正常、1：已取消、2、已退款 3：异常
          this.payDetail_param.pay_reason_id = this.payReasonValue

          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/pay_detail/add`
          // let url = that.roomUrL + 'room_status/manual_change_room_status/'
          let scopeParam = that.payDetail_param
          that.$axios.post(url,scopeParam).then(res=>{
            this.$message.success('增加支付记录成功!')
          }).catch(error=>{

          })
        },
        /**新建入住的时候先开帐 只把消费明细传进去 */
        openAccount(){
          this.isAccout = false
          this.addAccount() //先开帐
          // this.getIncomingAccount()//入账代码
          // setTimeout(() => {
          //   this.getInfoByAccount()
          // }, 500);
        },
        /**
         * reference_link_label是关联方标志，0：预定单账户，1：入住单，2：分账后的账户 3：购物, 4. 餐饮 ......
          reference_link_label 会随着业务范围的变更不断扩充/调整. 一般认为 reference_link_label >= 3 的都是哑房账
         */
         //增加一个(主)账户 需要消费的时候等
        addAccount(){
          //消费明细 暂时这样
          // this.account_param.charge_details = [{
          //   // code_income_type_id: this.preBillParam.consumeInfoList[0].code_income_type_id,
          //   code_income_type_id: 11,//入账代码=>代表食品
          //   reference_id: '121',
          //   // charge_amount: this.preBillParam.consumeInfoList[0].price,
          //   charge_amount: this.countMoney,//此处应该是预计收款总额
          // }]
          // this.account_param.charge_details = JSON.stringify(this.account_param.charge_details)
          //支付明细 开帐的时候传的值为空
          // this.account_param.pay_detail = {
          //   // pay_amount: this.payMoney, //支付金额
          //   pay_mode_id: this.payModeValue, //支付方式
          //   account_type: 0,
          //   code_pay_for_id: 5,
          //   in_or_out: 'in',
          //   cashier: 9, //	收银点id某些类型的付款没有这一项.
          // }
          // this.account_param.pay_detail = JSON.stringify(this.account_param.pay_detail)
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/account/add`
          // let url = that.roomUrL + 'room_status/manual_change_room_status/'
          // let batch_account_param = {
          //   reference_link_label: 1,
          //   reference_ids: [],
          // }
          that.account_param.reference_id = '1'
          that.account_param.reference_link_label = 1  //入住单为1 预订单为0
          let scopeParam = that.account_param
          that.$axios.post(url,scopeParam).then(res=>{
            this.return_accountParam_1 = res.data.data
            // this.getInfoByAccount()  //查询账户信息 版本1
            console.log('this.return_accountParam_1',this.return_accountParam_1)
            console.log('this.return_accountParam',this.return_accountParam)
            this.$message.success('创建账户成功')
          }).catch(error=>{
          })
        },
          /**
       * 根据账务id得到主账信息(查询预定的时候负的钱以及其他)
       */
        getInfoByAccount(){
          console.log('this.return_accountParam_1',this.return_accountParam_1)
            let id = this.return_accountParam_1.id
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
              this.accoutInfoById_param = res.data.data
              console.log('this.accoutInfoById_param.charge_details11==标记1',this.accoutInfoById_param)
              console.log('this.incomingAccoutList22===标记2',this.incomingAccoutList)
              for(var item of this.accoutInfoById_param.charge_details){
                for(var itemm of this.incomingAccoutList){
                  if(item.code_income_type_id === itemm.id){
                    item.name = itemm.name
                  }
                }
              }
            }).catch(error=>{
            })
        },
        //计算收款的时候根据消费明细得到的钱
        moutedPayMoney(row){
          let number = 0
          this.payMoney = 0
          for(var item of this.collectionChargeData){
            for(var itemm of this.accoutInfoById_param.charge_details){
              if(item === itemm.id){
                number = itemm.charge_amount
              }
            }
            this.payMoney =  Number(this.payMoney) + Number(number)
          }
        },
        /**
         * 当没有收款的时候 信息 总金额总付款等的默认值要规范
         */
        /**@000000002
         * 携带创建账户的信息然后传递给   入住相关的表<===============
         */
        toCarryPayInfo(param){
          console.log('运行toCarryPayInfo')
          console.log('param携带',param)
          let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/update_master_base/`
          let url= `http://bill.crowncrystalhotel.com/v1/checkin/update_master_base/`
          let master_base = {}
          let scopeParam = {
            master_base : {
              account_opened: 1,
              order_no: param,
              total_chartge: this.payMoney,//总消费return_accountParam.total_consumption
              total_pay:  this.payMoney,//总付款
              account_id: this.return_accountParam_1.id,
              last_account_id:  this.return_accountParam_1.id,
              last_pay_id:  null,
            }
          }
          console.log('scopeParam 创建账户后=>param',scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            }).catch(error=>{
          })
        },
        /**
         * 不同形式下的收款
         * 收钱时<===>前提没有主账户的时候就创建一个主账户
         */
        getMoney(){
          console.log('payModeList',this.payModeList)
          console.log('payMoney加的值',this.payMoney)
          console.log('this.payModeValue',this.payModeValue)
          // if(this.payModeValue === 0){
            if(!this.validateEnterPay()){
              return false
            }
            this.addSomePay()
            // this.addPayDetail() 此时需要调用吗?
            // let paramValue = ''
            // for(var item of this.returnEnterParam){
            //   if(item.room_number === this.room_no_value){
            //     paramValue = item.order_no
            //   }
            // }
            // console.log('paramValue',paramValue)
            // setTimeout(() => {
            //   this.toCarryPayInfo(paramValue) //把数据更新到入住单那里
            // }, 500);
            this.enterPreviewDialog = false   //关闭界面
            this.enterFormVisible = false
            // this.$router.go(0) //刷新当前界面
          // }else{
            // this.prePayDialog = true;
          // }
        },
        //创建账户根据消费记录选择然后支付
        addSomePay(){
          let that = this
          let url= `http://47.98.113.173:9519/v1/finance/pay_detail/pay_by_charges`
          // let url= `http://192.168.5.96:9519/v1/finance/pay_detail/pay_by_charges`
          console.log('collectionChargeDatavalue========',this.collectionCharge)
          let array_collectionCharge = [{
            code_income_type_id: this.collectionCharge,   //入账类型代码id
            reference_id: 1232,   // 关联消费单id
            // biz_date: moment(new Date()).format('YYYY-MM-DD'),  // 营业日期
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),    // 业务发生的实际时间
            // pay_status: 0,//enterBill.payMode,   // 支付状态 0：未付，1：结清，2：挂账/AR支付，3：部分支付 4: 异常
            is_fixed: 0,  // 是否固定消费. 0 不是,1 是.
            fixed_name: '0',   // 固定消费名称.可空
            rate_code: 'ddf',   // 房价码, 不一定有
            charge_amount: this.countMoney,  // 消费金额 负的 ===>应该是房价码
            pay_amount: 0,   // 已支付的部分,一般是0,
            desc:  '',  // 说明===>此时为摘要
          }]
          array_collectionCharge = JSON.stringify(array_collectionCharge)
          this.returnEnterParam = {
            1074: 1036
          }
          let accountId = Object.values(this.returnEnterParam)[0] //数组转int数组
          console.log('hhhh',accountId)
          let scopeParam = {
            account_id: accountId, //创建主账
            charges: array_collectionCharge,//组装的
            // charge_ids: this.collectionChargeData,
            pay_amount: this.payMoney,
            code_pay_for_id: this.payReasonValue,
            biz_date: moment(new Date()).format('YYYY-MM-DD'),
            gen_time: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
            cashier_id:	9,
            pay_mode_id: this.payModeValue,
            // original_pay_dict: {}
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('this.returnEnterParam',this.returnEnterParam)
            // let paramValue = ''
            // for(var item of this.returnEnterParam){
            //   if(item.room_number === this.room_no_value){
            //     paramValue = item.order_no
            //   }
            // }
            // console.log(paramValue,'paramValue')
            // that.toCarryPayInfo(paramValue) //把数据更新到入住单那里
            }).catch(error=>{
          })
        },
        //入住单=>确认入住
        confirmEnter(){
          if(!this.validatePreviewData() || !this.validatePreData() || !this.validateEnterData()){
            // this.isErrorClass=true
            return false
          }
          // this.isErrorClass=false
          // this.getIncomingAccount()//入账代码 版本1 此时不调用
          this.postEnter()
          // this.openAccount() //直接开帐
          // this.enterPreviewDialog = true
          // this.enterFormVisible=false
          let array_1 = []
          for(var item of this.preBillParam.master_base){
            item.code_market_id = this.marketValue
            item.code_src_id = this.srcValue
            item.room_number = item.dynamic_roomNumber
            array_1.push(item.room_number)//把循环所有项的值拼接为一个数组便于构造room_list
          }
          this.roomNumberList = this.handleDynamicNumber(array_1)
        },
        // getRoomNumberList(){
        //   let array = []
        //   for(var item of this.roomNumberList){
        //     array.push({
        //        number: item,
        //        isPay: '未收款',
        //      })
        //   }
        //   this.roomNumberList = _.cloneDeep(array)
        //   console.log('this.roomNumberList',this.roomNumberList)
        // },
        //入住单入住方法
        postEnter(){
          let that = this
          // let url= `http://192.168.2.224:9005/v1/checkin/nobooking_checkin/`
          let url= `http://bill.crowncrystalhotel.com/v1/checkin/nobooking_checkin/`
          that.preBillParam.pic_photo = that.imageUrl
          let scopeParam = _.cloneDeep(that.preBillParam)
          scopeParam = this.handleDeleteAttribute(scopeParam)
          that.$axios.post(url,scopeParam).then(res=>{
            // if(res.data.message === 'fail'){
            //   this.$message.warning('已有在住的人身份证号为')
            // }
            if(res.data.message === 'success'){
              // this.openAccount() //入住成功直接开帐
              this.enterFormVisible = false
              // this.enterPreviewDialog = true //打开入预收界面 版本3===>此时不收房费
              this.returnEnterParam = res.data.data.data
              console.log('this.returnEnterParam=====入住单返回',this.returnEnterParam)
              // this.getCardList()
            }
            // this.enterPreviewDialog = true
            }).catch(error=>{
              console.log('error',error)
          })
        },
        //传入后台去掉多余属性 更改值
        handleDeleteAttribute(param){
          let scopeParam = _.cloneDeep(param)//深拷贝
          // scopeParam.master_base[0].arr_time = moment(scopeParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          // scopeParam.master_base[0].leave_time = moment(scopeParam.master_base[0].leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          for(var item of scopeParam.master_base){
            item.arr_time = moment(item.leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
            item.leave_time = moment(item.leave_time[1]).format('YYYY-MM-DD HH:mm:ss')
          }
          // master_base
          for(var item of scopeParam.check_guest){
              delete item.liveCount
          }
          let array_1 = []
          for(var item of scopeParam.master_base){
            item.room_number = item.dynamic_roomNumber
            array_1.push(item.room_number)//把循环所有项的值拼接为一个数组便于构造room_list
            item.room_number = item.dynamic_roomNumber.join(',')//传入后台说需
            // item.room_number = 1//传入后台说需此时为int
            delete item.can_live_num
            delete item.room_type_value
            delete item.dynamic_roomNumber
            delete item.roomPrice
            delete item.visible
          }
          let array_2 = []
          //key value 对象的数组取value变为一个新的数组
          for(let item in array_1){
            array_2.push(array_1[item])
          }
          let str = array_1.join(',') //数组变为字符串
          scopeParam.room_list = str.split(',') //字符串变为数组
          // scopeParam.room_list = this.handleDynamicNumber(array_1)
          return scopeParam
        },
        handleDynamicNumber(array){
           let array_2 = []
          //key value 对象的数组取value变为一个新的数组
          for(let item in array){
            array_2.push(array[item])
          }
          let str = array.join(',') //数组变为字符串
          return str.split(',')
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
        //选择房型一行房型相关信息
        getRoomInfo(){
          // this.getRoomType() //准备:循环得到匹配的房型中文名
          console.log('roomTypeList==1=',this.roomTypeList)
          let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD')
          let end = moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD')
          let that = this
          let url =  that.roomUrL + 'room_status/get_room_type_occupy_list/'
          that.$axios({
            url : url,
            method : 'get',
            params:{
              biz_data__gte: start,
              biz_data__lt: end
            },
          }).then(res=>{
          if(res.data.message === 'success'){
              that.roomInfoList = res.data.data.results
              console.log('that.roomInfoList',that.roomInfoList)
              // let start = '2019-04-06'
              // let end =  '2019-04-09'
              for(var item of that.roomInfoList){
                for(var itemm of that.roomTypeList){
                  if(item.room_type === itemm.code){
                    item.room_type_name = itemm.room_type_name
                  }
                }
              }
          }else{
              that.$message.error('获取房型信息列表失败!')
          }
          }).catch(error=>{
          })
        },
        //获取code对应房型数据
        getRoomType(){
          let that = this
          let url = `http://room.crowncrystalhotel.com/v1/room/get_roomtype_list/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                  that.roomTypeList = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        getCanLiveRoom(param){
          console.log('paramwatch',param)
          let start = moment(this.preBillParam.master_base[0].leave_time[0]).format('YYYY-MM-DD HH:mm:ss')
          let end = moment(this.preBillParam.master_base[0].leave_time[1]).format('YYYY-MM-DD 14:00:00')
          let that = this
          let url= `http://price.crowncrystalhotel.com/v1/room_status/can_live_room_list/`
          let scopeParam = {
            room_type: param,
            start_time: start,
            end_time: end
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let array
            array = res.data.data.data
            console.log('array房间',res.data.data.data)
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
          let that = this
          let url = `http://room.crowncrystalhotel.com/v1/room/get_roomfeatures_list_tree/`
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                console.log('res.data.data',res.data.data)
                  that.roomTagList = res.data.data
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
        //得到房间占用
        getRoomOccupy(){
          let that = this
          let url = that.roomUrL + 'room_status/get_room_occupy_list/'
          that.$axios.get(url).then(res=>{
              if(res.data.message == 'success'){
                  that.roomOccupyList = res.data.data.results
              }else{
                  that.message.error('获取数据失败，请重试')
              }
          }).catch((error)=>{
          })
        },
         //选房号 =>不同房型展示不同的tabel
        chooseNo(item,index){
          console.log('preBillParam.master_base watch',this.preBillParam.master_base)
          // if(!this.validatePreviewData()){
          //   return false
          // }
          console.log('item一行数据enter',item)
          if(item.room_type === ''){
            this.$message.warning('请先选择房型!')
            return false
          }else{
            this.getCanLiveRoom(item.room_type_value) //根据房型选未占用房间
            // this.getSelectRoomInfo(item) //此处可改变颜色标记哪个类型的房间
            // this.getRoomOccupy()//得到房间占用
            this.getTagByRoom()//得到房间对应标签
            this.can_live_number = item.can_live_num//可预定数
            this.pre_live_number = item.room_amount//选择的数
          }
          this.sortNumber = 0; this.noSortNumber = 0
          this.switchNumberDialog = true;
          this._room_type = item.room_type_value
        },
        //切换是否状态
        toggleSelection(rows) {
          // toggleSelection([tableData[1], tableData[2]])
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        //单=》右边全选房号dialogtabel 并控制不可选房间号
         handleselectAll(selection){
          // if(this.can_live_number > this.pre_live_number){
            if(selection.length > this.pre_live_number){
              let indexNumber = selection.length - this.pre_live_number
              selection.splice(this.pre_live_number,indexNumber)//截取最大可选数的房间从数组可选数最大长度开始截取
              this.multipleSelection = selection //截取后的值
            }
          // }
        },
        //单=》右边选房号dialogtabel 并控制不可选房间号
        handleselect(selection, row){
          this.multipleSelection = selection;
          //可订数大于自选的入住数
          let index = _.findIndex(this.roomNo_data_list,function(o) { return o.room_no == row.room_no}) //扎到索引 即行数
          if(this.can_live_number > this.pre_live_number){
            if(this.multipleSelection.length > this.pre_live_number){
              this.$refs.multipleTable.toggleRowSelection(this.roomNo_data_list[index],false)
              this.$message.warning('不能超过该房间类型的可选数!')
            }
          }
        },
        //选房号dialog=》提交得到相应房号
        getRoomNumber(){
          this.switchValue = '0'
          let _room_type = this._room_type
          let index = _.findIndex(this.preBillParam.master_base,function(o){return o.room_type_value == _room_type})
          console.log('index',index)
          let array = []
          for(var item of this.multipleSelection){
            array.push(item.room_no)
          }
          this.preBillParam.master_base[index].dynamic_roomNumber = array
        },
        //入住人可选房间号==>基于选择房型的
        getEnter_RommNumber(){
          let array = []
          let array3 = []
          if(this.liveoptions_NoChange.length > 0){
            this.flag = true
            this.liveoptions = this.liveoptions_NoChange
          }else{
            this.flag = false
            for(var item of this.preBillParam.master_base){
              array.push(item.dynamic_roomNumber)
            }
            let array2 = array.reduce(function (a, b) { return a.concat(b)}) //二维数组变为一组
            //组装数组
            for(var item of array2){
             array3.push({
               roomNo: item,
               liveCount: '0',
             })
            }
          }
          this.liveoptions = array3
          this.flag === true ? this.liveoptions_Value = this.liveoptions_NoChange : this.liveoptions_Value = this.liveoptions
          console.log('下拉时',this.liveoptions)
        },
        //重复属性个数计算
        getWordCnt(arr){
          var obj = {};
          for(var i= 0, l = arr.length; i< l; i++){
            var item = arr[i];
            obj[item] = (obj[item] +1 ) || 1;
          }
          return obj;
        },
        //入住行下拉选中后change
        selectLive(row){
          // this.liveoptions.filter(item=>item.roomNo = row)
          let array = []
          for(var item of this.preBillParam.check_guest){
            array.push(item.room_number)
          }
          let array_1 = []//构造数组:选中的房间号 以及选中房间号的数量
          let a = this.getWordCnt(array)//obj
          for (let i in a) {
            array_1.push({
              roomNumber: i,
                count: a[i]
              }); //属性
          }
          for(var item of this.liveoptions){
            for(var itemm of array_1){
              if(item.roomNo === itemm.roomNumber){
                item.liveCount = itemm.count
              }
            }
          }
          this.liveoptions_NoChange = this.liveoptions
          console.log('点击行时this.liveoptions',this.liveoptions)
          console.log('点击行时this.liveoptions_NoChange',this.liveoptions_NoChange)
          // let index = _.findIndex(this.preBillParam.check_guest,function(o){return o.room_number == row})
          // console.log('index',index)
        },
        //自动排房
     selfSelectHouse(val){
        this.selfSortArray = []
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
        }else{
          this.sortNumber = 0
          this.noSortNumber = 0
          this.$refs.multipleTable.clearSelection();
        }
        },
        //获取楼层列表option
        //增加入住人
        addSelect_2(){
          let enterValue = {
            arr_time: '2019-04-08 12:20:20',//预抵时间
            leave_time: '2019-04-10 12:20:20',//离开时间
            liveCount: 0,//可选数
            room_number: '',//房间号
            id_code: '01',//证件类型
            id_no: '',//证件号码
            name: '', //姓名
            sex: '0',//性别
            telephone: '',//手机号
            street_add: '',//街道地址
            // code: '123',
            // code_name: '77777',
            // descript: null,
            // descript_en: null,
            list_order: 1,
            last_name: null,
            first_name: null,
            name2: null,
            name_combi: null,
            is_save: false,
            language: '2',
            title: null,
            salutation: null,
            race: null,
            religion: null,
            career: '122',
            nation: null,
            visa_no: null,
            visa_grant: null,
            enter_port: null,
            where_from: null,
            where_to: null,
            salary: null,
            education: null,
            marital: null,
            company_id: null,
            company_na: '222',
            pic_photo: null,
            pic_sign: null,
            remark: '222',
            is_anonymo: false,
            weixin: '2',
            mobile: null,
            email: '1016068291@qq.com',
            country_id: null,
            division_id: null,
            state_id: null,
            city_id: null,
            zipcode: null,
            // master_base_id: 1231231231,
            guest_id: 123456
          }
          this.preBillParam.check_guest.push(enterValue)
          this.showDeleteButton_2 = true
        },
       //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect_2(index){
          if(this.preBillParam.check_guest.length>1){
            if(this.preBillParam.check_guest.length ===2){
              this.showDeleteButton_2 = false
            }
            this.preBillParam.check_guest.splice(index, 1)
          }else{
            this.showDeleteButton_2 = false
            return
          }
        },
        //增加选择框新建入住单里
        addSelect(){
          let room_type = {
            room_amount: '0',
            master_from_lable: 0,//入住类型
            arr_time: '',//预抵时间
            leave_time: [ new Date(), new Date(new Date().getTime() + 24*60*60*1000)],//离开时间
            can_live_num: '',//add
            room_type_value: '',//房型名称对应ID
            dynamic_roomNumber: [],//动态房间号=》应是一个数组
            roomPrice: '', //总价钱=add= 前面都是自己加的===========
            room_type: '',//房型名称
            room_number: '',//房间数几间 数组变字符串 // ['111', '222', '333','444', '555','666', '777']
            // room_class: '',
            fix_rate: '',//房价码
            account_id: null,
            team_id: 2,
            team_name: '2',
            biz_date: '2018-12-01 10:10:01',
            rsv_type_id: 22,
            from_rsv_label: 2,
            order_no: '123',
            sales_person_id: 2,
            code_occ_id: 2,
            extra_flag: '2',
            adult_num: 2,
            children_num: 2,
            is_fix_rate: 1,
            is_secrete: 1,
            is_secret_rate: 1,
            allowed_AR: 1,
            AR_id: 1,
            code_commision_id: '1',
            code_market_id: '1',
            code_src_id: '1',
            reference_id: '123456',
            master_status_lable: null,
            total_chartge: 0,
            total_pay: 0,
            last_account_id: null,
            last_pay_id: null,
            account_num: null,
            pay_num: 0,
            MASTER_ID: null,
            sub_lable: null,
            is_room_posted: false,
            building_name: null,
            room_facility_ids: '11',
            extra_person_num: null,
            extra_person_price: null,
            EXTRA_BED_NUM: null,
            EXTRA_BED_price: null,
            EXP_STA: '11',
            RM_OCC_ID: null,
          }
          this.preBillParam.master_base.push(room_type)
          this.showDeleteButton = true
        },
        //删除选择框=>当只剩下一个的时候不能在删除
        deleteSelect(index){
          if(this.preBillParam.master_base.length>1){
            if(this.preBillParam.master_base.length ===2){
                this.showDeleteButton = false
            }
            this.preBillParam.master_base.splice(index, 1)
          }else{
            this.showDeleteButton = false
            return
          }
        },
        //关闭tag
        handleClose(item,tag) {
          item.dynamic_roomNumber.splice(item.dynamic_roomNumber.indexOf(tag), 1);
        },
        //验证入住数据
        validatePreviewData(){
            //判断选择房型为空时
          for(var item of this.preBillParam.master_base){
            if(item.room_type === ''){
                this.$message.warning('请选择房型!')
                return false
            }
            if(item.room_amount === 0){
              this.$message.warning('请选择房间数!')
              return false
            }
            else{
              return true
            }
          }
        },
        /**
         * 判断入住人信息数据=====>身份证不能重复
         */
        validateEnterData(){
          //有入住人的时候
          let array = []
          for(var item of this.preBillParam.check_guest){
            array.push(item.id_no)
          }
          if(new Set(array).size != array.length){
            this.$message.warning('不能有重复的身份证号!')
            return false
          }
          for(var item of this.preBillParam.check_guest){
            if(item.telephone !=''){
              return util.validateTelNumber(item.telephone,'请输入正确手机格式',this)
            }
            return(
              // util.validateBlank(item.telephone,'入住人中联系电话是必填项',this)&&
              // util.validateTelNumber(item.telephone,'请输入正确手机格式',this)&&
              util.validateBlank(item.id_no,'身份证是必填项',this)&&
              util.validateBlank(item.room_number,'房间号是必填项',this)&&
              util.validateCardNumber(item.id_no,'请输入正确身份证格式',this)
            )
          }
        },
        validatePreData(){
          return (
            util.validateBlank(this.preBillParam.master_base[0].master_from_lable,'请选择入住类型',this)&&
            util.validateBlank(this.srcValue,'请选择客户来源',this)&&
            util.validateBlank(this.marketValue,'请选择市场来源',this)
          )
        },
        /**
         * 入账收款的时候验证
         */
        validateEnterPay(){
          if(this.payMoney < this.countMoney){
            this.$message.warning('付款金额必须大于预计消费总计！')
            return false
          }
          return (
            util.validateBlank(this.collectionCharge,'请选择消费明细',this)&&
            util.validateBlank(this.payReasonValue,'请选择付款原因',this)&&
            util.validateBlank(this.room_no_value,'请选择入住房号',this)&&
            util.validateBlank(this.payModeValue,'请选择付款方式',this)
          )
        },
        //入住=》获取早餐list
        getBreakfastList(){
          let that = this
          let url = that.roomUrL + 'rate_code/get_breakfast_list/'
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
        //入住单 早餐=》添加早餐项
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
        //入住单编辑详情备注
        handleRemarkInfo(row){
          this.addAndUpdate = false //标记
          this.remarkContent_value = row.remarkContent
          this.middle_remarkRow = row //接收
        },
        //入住单=》删除备注
        deleteRemarkInfo(row){
          let index = _.findIndex(this.preBillParam.remarkList,function(o) { return o.time == row.time}) //扎到索引
          this.preBillParam.remarkList.splice(index,1)//删除指定索引
        },
        //入住单=》新增备注
        addAndUpdateRemarkInfo(){
          //  remarkContent: '',
          //     remarkType: '订单备注',
          //     status: '入住',
          //     time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
          //     operationPeople: '',
          if(this.addAndUpdate === true){
              let remarkValue={
                  remarkContent: this.remarkContent_value,
                  remarkType: '订单备注',
                  status: '入住',
                  time: moment(new Date).format('YYYY-MM-DD HH:mm:ss'),
                  operationPeople: '',
              }
              if(remarkValue.remarkContent){
                  this.preBillParam.remarkList.push(remarkValue)
              }else{
                  this.$message.warning('请输入备注信息')
              }
          }else{
              this.middle_remarkRow.remarkContent =  this.remarkContent_value
          }
        },
        //获取入住单房型右边弹出内容
        getHouseTypeNextValue(item,index, param){
          //点击时判断不能重复选择房型
          let indexs = _.findIndex(this.preBillParam.master_base,function(o){return o.room_type_value == param.room_type})
            if(indexs >= 0){
              this.$message.warning('请不要重复选择!')
              return
            }
          this.getRateCode(item,param)
          item.can_live_num = param.can_live_num
          item.room_type = param.room_type_name
          item.room_type_value = param.room_type
        },
         /**
         * 根据房型获得未来一周之内的房型
         * @1构造未来七天的时间为一个数组dataArray
         * @2构造相应时间的对应房价也为一个数组rateArray
         * @3可合并为一个数组
         */
        getRateInfo(item){
          console.log('进入reteinfo',item)
          let dateArray = []
          for(var i = 0; i < 7; i++){
            dateArray.push(moment(new Date()).add(i,'days').format('YYYY-MM-DD'))
          }
          this.getRateCodeMore(item)
          console.log('dateArray',dateArray)
          // moment(new Date()).add(1,'days').format('YYYY-MM-DD')
        },
        getRateCodeMore(item){
          console.log('item',item)
          let that = this
          let url = that.roomUrL +  `rate_code/get_rate_code/`
          let scopeParam ={
            rate_code: this.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(7,'days').format('YYYY-MM-DD'),
            room_type_list: [item.room_type_value]
          }
          that.$axios.post(url,scopeParam).then(res=>{
            let temprate = res.data.data.room_type_price
            console.log('temprate7天数据',temprate)
            let key1 = item.room_type_value
            let temprateValue = temprate[key1]
            let rateObj = temprateValue
            let keys = []
            let values = []
            for(var key in rateObj){
              keys.push(key)
            }
            for(var key in rateObj){
              values.push(rateObj[key])
            }
            keys.splice(0,1)
            values.splice(0,1)
            console.log('keys',keys)
            console.log('values',values)
            this.rateDateList = keys
            this.rateValueList = values
            }).catch(error=>{
          })
        },
          //根据房型得到对应房价码
        getRateCode(item,param){
          let that = this
          let url = that.roomUrL +  `rate_code/get_rate_code/`
          // let temp = []
          // temp.push(param.room_type)
          let scopeParam ={
            rate_code: this.rateCodeValue,
            begin_date:  moment(new Date()).format('YYYY-MM-DD'),
            end_date: moment(new Date()).add(1,'days').format('YYYY-MM-DD'),
            room_type_list: [param.room_type]
          }
          that.$axios.post(url,scopeParam).then(res=>{
            console.log('房价码',res.data.data.room_type_price)
            let temprate = res.data.data.room_type_price
            let key1 = param.room_type
            let temprateValue = temprate[key1]
            let key2 = moment(new Date()).format('YYYY-MM-DD') //对象嵌套对象里的key值
            this.houseType_priceValue_1 = temprateValue[key2]
            item.fix_rate = this.houseType_priceValue_1
            console.log('temprateValue',temprateValue)
            console.log('111',temprateValue[key2])
            }).catch(error=>{
          })
        },
        //入住单获取对应房类型
        getHouseTypePrice(item,index){
          // item.room_type = value
          console.log('item',item)
          console.log('index',index)
          item.roomPrice = this.houseType_priceValue_1 //赋值给首日价
          // this.preBillParam.master_base[index].room_type = value//替换
          // console.log('this.preBillParam.master_base',this.preBillParam.master_base)
        },
        //入账代码
        getIncomingAccount(param){
          let that = this
          let url =  that.accountUrl + 'finance/incoming_account_code/info_list?page_size=999'
          that.$axios({
            method : 'get',
                url : url,
            }).then(res=>{
              that.incomingAccoutList = res.data.data.list
              console.log('that.incomingAccoutList',that.incomingAccoutList)
            }).catch(error=>{
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
        //市场码
        getMarket(param){
          let that = this
          let url =  that.roomUrL_2 + 'system/settings/get_code_base_list'
          let params = {
           parent_code: param == 'market' ? 'market_code' : 'src_code'
          }
          that.$axios({
            method : 'get',
                url : url,
                params: params
            }).then(res=>{
              that.marketSrcList = res.data.data.results
            }).catch(error=>{
          })
        },
        //进入房态=>块状平铺展示//获取cardList
        getCardList(){
          let that = this
          // let url = that.UrLHeader_2 + 'room/get_roomnumber_list_tree/'
          // let url = that.UrLHeader + 'room/get_roomnumber_list/'
          let scopeParams = {
            page : 1,
            page_size : 300,
            room_state: this.selectParam,
            building_name: that.building_value,
            floor_number: that.floor_value,
            room_type_name: that.roomType_value, //ex:大床房暂时
            room_no: that.room_no_value
          }
          let params = util.deleteNullParam(scopeParams)//删除对象里属性值为空的属性
          let url = `http://price.crowncrystalhotel.com/v1/room_status/get_room_map_list`
          that.$axios({
            method : 'get',
              url : url,
              params: params
          }).then(res=>{
            if(res.data.message === 'success'){
              that.cardList = res.data.data.results
            }else{
              that.$message.error('获取房态列表失败!')
            }
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
  //入预收操作ul
  .enter_pre_ul{
    li{
      margin-top: 15px;
      margin-left: 20px;
      margin-bottom: 5px;
      span{
        margin-left: 10px;
        margin-right: 10px;
      }
    }
  }
  //聚合支付
  .enter_pay_ul{
    margin: 0 auto;
    margin-top: 100px;
    width: 100%;
    margin-left: 30%;
    li{
      margin-top: 20px;
      span{
        margin-left: 5px;
        margin-right: 10px;
      }
    }
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
  .enter-dialog .elColMiddle{
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
  .errorClass>>> .el-input__inner{
    border-color: #e07163!important;
    background-color: #ffcbcb;
    color:  #e07163;
    opacity: 0.5;
  }
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
  /* 消费 */
  .houseTypeClass>>> .el-collapse-item__content {
    padding-bottom: 10px
  }
  .houseTypeClass>>> .el-collapse-item__header{
    background-color: transparent;
    height: 40px;
    padding-left:10px;
  }
  .enter-dialog>>> .el-dialog__header{
    background-color: #00a3df;
  }
  .room_pop>>> .el-popover{
    padding: 0;
  }
  .enter-dialog>>>.el-dialog__title {
    color: white;
    font-size: 14px;
  }
  .enter-dialog>>> .el-dialog__headerbtn .el-dialog__close{
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
