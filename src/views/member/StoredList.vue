<template>
    <div class="storedList">
        <!-- 上层button组 -->
        <div>
            <!-- 保存 -->
            <el-button type="primary" @click=" developeMessage() ">保存</el-button> 
            <!-- 充值 -->
            <el-button type="primary"  @click=" chargedialogVisible = true ">充值</el-button>
            <!-- 扫码支付 -->
            <el-button type="primary" @click=" developeMessage() ">扫码支付</el-button>
            <!-- 消费 -->
            <el-button type="primary" @click=" consumedialogVisible = true ">消费</el-button>
            <!-- 冻结  freezedialogVisible = true  -->
            <el-button type="primary" @click=" developeMessage() ">冻结</el-button>
            <!-- 转账 -->
            <el-button type="primary" @click=" exchangedialogVisible = true ">转账</el-button>
            <!-- 打印账单 -->
            <el-button type="primary" @click=" developeMessage() ">打印账单</el-button>

            <div class="pull-right">
                <!-- 发票 -->
                <el-button type="primary" @click=" get_card_invoice_detail_list()">发票</el-button>
                <!-- 刷新 -->
                <el-button type="primary" @click=" handleCurrentPageChange(1) ">刷新</el-button>
            </div>
        </div>

        <!-- 中部 -->
        <div class="mid_section">
            <div class="pull-left mid_left">
                <el-col :span="24">
                                <!-- 表格 -->
                                <el-table
                                    :data=" accountList "
                                    height="300"
                                    border
                                    style="width: 100%"
                                    :header-cell-style="{background:'#68819E',color:'#fff' }">
                                    <el-table-column prop="account" label="账号" >
                                    </el-table-column>
                                    <el-table-column prop="name" label="名称" >
                                    </el-table-column>

                                    <el-table-column prop="status" label="状态">
                                    </el-table-column>
                                    <el-table-column prop="banlance" label="余额">
                                    </el-table-column>
                                    <el-table-column prop="avaiableBan" label="可用余额(次)">
                                    </el-table-column> 
                                </el-table> 
                            </el-col>
            </div>
            <!-- 右边部分 -->
            <div class="pull-right mid_right">
                <div class="inputItems">
                    <p>会员卡号：</p>
                    <el-input v-if=" memberData.card_no " v-model=" memberData.card_no " size="mini"  placeholder="请输入内容" style="width: 60%;" disabled=""></el-input>
                    <el-input v-else v-model=" memberData.card_no " size="mini"  placeholder="请输入内容" style="width: 60%;" @focus=" checkdialogVisible = true "></el-input>
                </div>
                <div class="inputItems">
                    <p>持卡人：</p>
                    <el-input v-model=" memberData.card_name " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>会员计划：</p>
                    <el-input  v-model=" memberData.card_type " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>会员等级：</p>
                    <el-input  v-model=" memberData.card_level " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>状态：</p>
                    <el-input  v-model=" memberData.status " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>酒店：</p>
                    <el-input v-model=" memberData.iss_hotel " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <br>
                <div class="inputItems">
                    <p>缴费总额：</p>
                    <el-input  v-model=" memberData.money_payment " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>开票总额：</p>
                    <el-input v-model=" memberData.money_invoice " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>未开金额：</p>
                    <el-input :value=" memberData.money_payment - memberData.money_invoice " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <!-- <div class="inputItems">
                    <p>储值余额：</p>
                    <el-input   size="mini" v-model=" memberData.money_pay " style="width: 60%;" ></el-input>
                </div> -->
                <br>
                <div class="inputItems">
                    <p>信用：</p>
                    <el-input  v-model=" memberData.credit " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>冻结：</p>
                    <el-input  v-model=" memberData.money_freeze " size="mini" placeholder="请输入内容" style="width: 60%;" ></el-input>
                </div>
                <div class="inputItems">
                    <p>可用余额：</p>
                    <el-input  size="mini" :value=" memberData.money_pay -  memberData.money_charge -  memberData.money_freeze " style="width: 60%;" ></el-input>
                </div>
                <br>
                <div class="inputItems" style="width: 72%;" >
                    <p style="width: 12%">备注：</p>
                    <el-input  v-model=" memberData.remark " type="textarea" :autosize="{ minRows: 2, maxRows: 4}" size="mini" placeholder="请输入内容" style="width: 60%; " resize='none' ></el-input>
                </div> 
            </div>

        </div>

        <!-- 下方表格部分 -->
        <div class="bot_section">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border height="400" :header-cell-style="{background:'#68819E',color:'#fff'}">
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column prop="id" label="流水号"> 
                </el-table-column>
                <el-table-column prop="iss_hotel" label="酒店">
                </el-table-column>
               <el-table-column prop="biz_date" label="营业日期">
                </el-table-column>
                <el-table-column prop="payment" label="项目">
                </el-table-column>
                <el-table-column prop="payment" label="项目-EN">
                </el-table-column> 
                <el-table-column prop="amount" label="金额">
                        <!-- 正为充值（黑色）：负为消费（红色） --> 
                    <template slot-scope="scope">
                        <span v-if=" scope.row.amount< 0" style="color: red;">{{ scope.row.amount }}</span>
                        <span v-else style="color: green;"> {{ scope.row.amount }}</span>
                    </template>
                </el-table-column> 
                <el-table-column prop="balance" label="余额" >
                </el-table-column>
                <el-table-column prop="transfer_card_id" label="转账" >
                </el-table-column>
                <el-table-column prop="create_user" label="工号">
                </el-table-column>
                <el-table-column prop="create_datetime" label="时间" style="width: 200;">
                </el-table-column>
                <el-table-column prop="remark" label="备注" style="width: 200;">
                </el-table-column>
            </el-table>
            <div class="pagination">
            <el-pagination
                @current-change="handleCurrentPageChange"
                :current-page="currentPage"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
            </div>
        </div>
        
        <!-- 第一次进入如果没有携带会员信息 --> 
        <el-dialog title="会员选择" :visible.sync=" checkdialogVisible " width="70%">
            <div class="charge_detail">  
                <!-- 列表清单部分 -->
                <div class="table" style="width: 100%;">
                    <table>
                    <thead>
                        <tr>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>卡号</th>
                        <th>会员计划</th>
                        <th>会员等级</th>
                        <th>性别</th>
                        <th>证件号</th>
                        <th>手机</th>
                        <th>Email</th>
                        <th>积分累计</th>
                        <th>积分消耗</th>
                        <th>积分余额</th>
                        <th>付款</th>
                        <th>消费</th>
                        <th>储值余额</th>
                        <th>信用</th>
                        <th>有效期</th>
                        <th>卡状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(item,index) in memberList" :key="index" @click="get_memberData(item,index)" @dblclick='get_memberData_confirm()'  :style="{ 'background-color':index == memberData_index? '#bbbbbb':''}">
                        <td>{{ item.id }}</td>
                        <td>{{ item.card_name }}</td>
                        <td>{{ item.card_no }}</td>
                        <td>{{ item.card_type }}</td>
                        <td>{{ item.card_level }}</td>
                        <td>
                            <span v-if=" item.sex=='1'">男</span>
                            <span v-else>女</span>
                        </td>
                        <td>{{ item.id_no }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.point_pay }}</td>
                        <td>{{ item.point_charge }}</td>
                        <td>{{ item.point_pay-item.point_charge }}</td>
                        <td>{{ item.money_pay }}</td>
                        <td>{{ item.money_charge }}</td>
                        <td>{{ item.money_pay - item.money_charge - item.money_freeze }}</td>
                        <td>{{ item.credit }}</td>
                        <td>{{ item.date_end }}</td>
                        <td>{{ statusDict[item.status] }}</td>
                        </tr>
                    </tbody>
                    </table>
                    <p v-if="memberList.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
                    <!-- <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentPageChange"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                    </div> -->
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <span class="pull-left">记录总数： {{ memberList.length }}</span>  
                <el-button type="primary" @click=" get_memberData_confirm() ">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 充值弹窗 -->
        <el-dialog title="储值卡充值" :visible.sync=" chargedialogVisible " width="40%">
            <div class="charge_detail">
                <!-- 左部 -->
                <div class="charge_left pull-left">
                    <div class="Items">
                        <p>卡号：</p>
                        <el-input v-model=" memberData.card_no " size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p></p>
                        <el-input type="textarea" size="mini" resize='none' :value="'姓名：'+ memberData.card_name " style="width: 60%;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                    </div>
                </div>
                <!-- 右部 -->
                <div class="charge_right pull-right">
                    <div class="Items">
                        <p>付款方式：</p>
                        <el-input size="mini" value="9001" style="width: 80%;" ></el-input>
                    </div> 
                    <div class="Items">
                        <p>充值金额：</p>
                        <el-input v-model="charge_form.amount" size="mini"  placeholder="请输入内容" style="width: 80%;" ></el-input>
                    </div>
                </div>

                <!-- 摘要 -->
                <div class="remark pull-left">
                    <p>摘要：</p>
                    <el-input v-model="charge_form.remark" size="mini" type="textarea"  placeholder="请输入内容" resize='none' style="width: 90%;" :autosize="{ minRows: 6}"></el-input>
                </div> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="chargedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click=" add_card_deposit() ">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 消费弹窗 -->
        <el-dialog title="消费" :visible.sync="consumedialogVisible " width="40%">
            <div class="charge_detail">
                <!-- 左部 -->
                <div class="charge_left pull-left">
                    <div class="Items">
                        <p>卡号：</p>
                        <el-input v-model=" memberData.card_no " size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p></p>
                        <el-input type="textarea" size="mini" resize='none' :value="'姓名：'+ memberData.card_name " style="width: 60%;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                    </div>
                </div>
                <!-- 右部 -->
                <div class="charge_right pull-right">
                    <div class="Items">
                        <p>付款方式：</p>
                        <el-input size="mini" value="9001" style="width: 80%;" ></el-input>
                    </div> 
                    <div class="Items">
                        <p>消费金额：</p>
                        <el-input v-model="consume_form.amount" size="mini"  placeholder="请输入内容" style="width: 80%;" ></el-input>
                    </div>
                </div>

                <!-- 摘要 -->
                <div class="remark pull-left">
                    <p>摘要：</p>
                    <el-input v-model="consume_form.remark" size="mini" type="textarea"  placeholder="请输入内容" resize='none' style="width: 90%;" :autosize="{ minRows: 6}"></el-input>
                </div> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click=" consumedialogVisible = false ">取 消</el-button>
                <el-button type="primary" @click=" consume_card_deposit() ">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 冻结弹窗 -->
        <el-dialog title="储值卡冻结明细" :visible.sync=" freezedialogVisible " width="70%">
            <div class="charge_detail">
                <!-- 左部 -->
                <div class="freeze  pull-left">
                    <div class="Items">
                        <p>卡号：</p>
                        <el-input v-model=" memberData.card_no " size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div> 
                    <div class="Items">
                        <p>姓名：</p>
                        <el-input v-model=" memberData.card_name " size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p>有效期：</p>
                        <el-input  v-model=" memberData.biz_date " size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p>单号：</p>
                        <el-input size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p>金额：</p>
                        <el-input size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p>打印冻结单：</p>
                        <el-input size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                </div> 

                <!-- 摘要 -->
                <div class="remark pull-left">
                    <p>备注：</p>
                    <el-input size="mini" type="textarea"  placeholder="请输入内容" resize='none' style="width: 90%;" :autosize="{ minRows: 6}"></el-input>
                </div>

                <div class="pull-left" style="width: 100%;"> 
                    <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border height="300" :header-cell-style="{background:'#68819E',color:'#fff'}">
                        <el-table-column prop="id" label="酒店" > 
                        </el-table-column>
                        <el-table-column prop="iss_hotel" label="来源">
                        </el-table-column>
                    <el-table-column prop="biz_date" label="房号" >
                        </el-table-column>
                        <el-table-column prop="payment" label="前台账号" >
                        </el-table-column>
                        <el-table-column prop="payment" label="账单号" >
                        </el-table-column> 
                        <el-table-column prop="amount" label="金额">
                                <!-- 正为充值（黑色）：负为消费（红色） --> 
                        </el-table-column> 
                        <el-table-column prop="transfer_card_id" label="经办人" >
                        </el-table-column>
                        <el-table-column prop="create_user" label="失效日期">
                        </el-table-column>
                        <el-table-column prop="create_datetime" label="冻结日期" width="180">
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="180">
                        </el-table-column>
                    </el-table>
                    <!-- <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentPageChange"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                    </div> -->
                </div> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="freezedialogVisible = false">退 出</el-button>
                <el-button type="primary" @click="freezedialogVisible = false">打 印</el-button>
                <el-button type="primary" @click="freezedialogVisible = false">刷 新</el-button>
                <el-button type="primary" @click="freezedialogVisible = false">解 冻</el-button>
                <el-button type="primary" @click="freezedialogVisible = false">冻 结</el-button>
            </span>
        </el-dialog>

        <!-- 转账弹窗 -->
        <el-dialog title="储值转移明细" :visible.sync="exchangedialogVisible" width="50%">
            <div class="charge_detail">
                <!-- 左部 -->
                <div class="charge_left pull-left" style="width: 33%;">
                    <div class="Items">
                        <p>卡号：</p>
                        <el-input v-model=" memberData.card_no " size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p></p>
                        <el-input type="textarea" size="mini" resize='none'  :value=" '姓名' + memberData.card_name " style="width: 60%;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                    </div>
                </div>
                <!-- 左部 -->
                <div class="charge_left pull-left" style="width: 33%;">
                    <div class="Items" style="text-align: center;">
                        <p class="el-icon-arrow-right"></p> 
                    </div>
                    <div class="Items">
                        <p>代码：</p>
                        <el-input size="mini"  v-model=" exchange_form.code " placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                    <div class="Items">
                        <p>金额：</p>
                        <el-input v-model=" exchange_form.amount " size="mini"  placeholder="请输入内容" style="width: 60%;" ></el-input>
                    </div>
                </div>
                <!-- 右部 --> 
                <div class="charge_left pull-right" style="width: 33%;">
                    <div class="Items">
                        <p>输入卡：</p>
                        <el-input v-model=" exchange_form.card_no " size="mini"  placeholder="请输入内容" style="width: 60%;" @focus=" searchdialogVisible = true "></el-input>
                    </div>
                    <div class="Items">
                        <p></p>
                        <el-input type="textarea" size="mini" resize='none'  :value="'输入卡持卡者姓名：' + exchange_form.card_name " style="width: 60%;" :autosize="{ minRows: 4, maxRows: 6}"></el-input>
                    </div>
                </div>

                <!-- 摘要 -->
                <div class="remark pull-left">
                    <p>摘要：</p>
                    <el-input size="mini" type="textarea"  placeholder="请输入内容" resize='none' style="width: 90%;" :autosize="{ minRows: 6}"></el-input>
                </div> 
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="exchangedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="exchangedialogVisible = false">重 置</el-button>
                <el-button type="primary" @click="exchange_card_deposit()">确 定</el-button> 
            </span>
        </el-dialog>

        <!-- 卡查询 --> 
        <el-dialog title="卡查询" :visible.sync=" searchdialogVisible " width="70%">
            <div class="charge_detail"> 
                <!-- 左部 -->
                <div class="">
                    <div class="Items">
                        <p>智能搜索：</p>
                        <el-input size="mini"  placeholder="请输入内容" style="width: 40%;" ></el-input>

                        <el-button class="pull-right" type="primary" @click=" searchdialogVisible = false">读 卡</el-button>
                        <span class="pull-right">&nbsp;&nbsp;</span>
                        <el-button class="pull-right" type="primary" @click=" searchdialogVisible = false" >查 询</el-button>
                        
                        
                    </div> 
                </div>
                <!-- 列表清单部分 -->
                <div class="table" style="width: 100%;">
                    <table>
                    <thead>
                        <tr>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>卡号</th>
                        <th>会员计划</th>
                        <th>会员等级</th>
                        <th>性别</th>
                        <th>证件号</th>
                        <th>手机</th>
                        <th>Email</th>
                        <th>积分累计</th>
                        <th>积分消耗</th>
                        <th>积分余额</th>
                        <th>付款</th>
                        <th>消费</th>
                        <th>余额</th>
                        <th>信用</th>
                        <th>有效期</th>
                        <th>卡状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr  v-for="(item,index) in memberList" :key="index" @click="get_certain_member(item,index)" @dblclick=' check_card_confirm() ' :style="{ 'background-color':index==confirm_index? '#bbbbbb':''}">
                        <td>{{ item.id }}</td>
                        <td>{{ item.card_name }}</td>
                        <td>{{ item.card_no }}</td>
                        <td>{{ item.card_type }}</td>
                        <td>{{ item.card_level }}</td>
                        <td>
                            <span v-if=" item.sex=='1'">男</span>
                            <span v-else>女</span>
                        </td>
                        <td>{{ item.id_no }}</td>
                        <td>{{ item.phone }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ item.point_pay }}</td>
                        <td>{{ item.point_charge }}</td>
                        <td>{{ item.point_pay-item.point_charge }}</td>
                        <td>{{ item.money_pay }}</td>
                        <td>{{ item.money_charge }}</td>
                        <td>{{ item.money_pay - item.money_charge - item.money_freeze }}</td>
                        <td>{{ item.credit }}</td>
                        <td>{{ item.date_end }}</td>
                        <td>{{ statusDict[item.status] }}</td>
                        </tr>
                    </tbody>
                    </table>
                    <p v-if="memberList.length==0" style="padding: 20px 0;text-align:center;">当前暂无数据</p>
                    <!-- <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentPageChange"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                    </div> -->
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <span class="pull-left">记录总数： 0.00</span> 
                <el-button type="primary" @click=" searchdialogVisible = false ">打卡主单</el-button>
                <el-button type="primary" @click=" searchdialogVisible = false ">预 订</el-button>
                <el-button type="primary" @click=" check_card_confirm() ">确 定</el-button>
                <el-button type="primary" @click=" searchdialogVisible = false ">取 消</el-button>  
            </span>
        </el-dialog>

        <!-- 储值卡发票明细 --> 
        <el-dialog title="储值卡发票明细" :visible.sync=" detaildialogVisible " width="70%">
            <div class="charge_detail"> 
                    <el-table :data="invoiceTableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" border height="300" :header-cell-style="{background:'#68819E',color:'#fff'}">
                        <el-table-column type="selection" width="55">
                        </el-table-column>
                        <el-table-column prop="card_no" label="会员卡号" > 
                        </el-table-column>
                        <el-table-column prop="invoice_type" label="发票类型">
                            <template slot-scope="scope">
                                <span v-if='scope.row.invoice_type'>增值税专用发票</span>
                                <span v-else>普通发票</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="invoice_number" label="发票号码" >
                        </el-table-column>
                        <el-table-column prop="invoice_title" label="发票抬头" >
                        </el-table-column>
                        <el-table-column prop="amount" label="开票金额" >
                        </el-table-column>  
                        <el-table-column prop="create_user" label="创建人" >
                        </el-table-column> 
                        <el-table-column prop="create_datetime" label="创建日期"> 
                        </el-table-column> 
                    </el-table>
                    <!-- <div class="pagination">
                    <el-pagination
                        @current-change="handleCurrentPageChange"
                        :current-page="currentPage"
                        :page-size="pagesize"
                        layout="total, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                    </div>  -->
            </div>
            <span slot="footer" class="dialog-footer">
                <div class="pull-left">
                    <span>开票总额： 0.00 &nbsp;&nbsp; 缴费总额： 0.00 &nbsp;&nbsp;余额： 1200.00 &nbsp; &nbsp;显示作废记录 0.00</span>
                </div>
                
                <el-button type="primary" @click=" detaildialogVisible = false">关 闭</el-button>
                <el-button type="primary" @click=" detaildialogVisible = false">作 废</el-button>
                <el-button type="primary" @click=" detaildialogVisible = false">新 建</el-button> 
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name:'StoredList',
    data(){
        return{
            UrLHeader:'http://member.crowncrystalhotel.com/v1/',
            /* 从会员详情携带过来的数据 */
            memberData: '',
            // 如果没有携带数据
            checkdialogVisible: false,
            memberData_index:'',
            /* 上方表格数据 */
            accountList:[
                {
                    accountL:'',
                    name: '',
                    status: '',
                    banlance: '',
                    avaiableBan: ''
                }
            ],
            /* 下方表格数据 */
            tableData: [
            ],

            // 表格分页
            // 分页
            currentPage: 1,
            pagesize: 10,
            total: 0,
            multipleSelection: [],

            // 充值弹窗
            chargedialogVisible: false,
             /* 充值数据 */
            charge_form: {  
                "payment": "9001",//
                "amount":0,//正数充值；负数消费
                "remark": "",
                "code_type":0 //0： 充值；1：消费；2：转账
            },
            // 转账弹窗
            exchangedialogVisible: false,
            certain_member_data: null,
            memberList:[], 
            statusDict: {
                "O" : "初始",
                "E" : "有效", 
                "L" : "销卡", 
                "R" : "挂失", 
                "B" : "损坏", 
                "S" : "停用", 
                "D" : "休眠",
            },
            /* 转账数据 */
            exchange_form: {   
                "code":'',
                "amount":0 ,//正数充值；负数消费
                "remark": "",
                "transfer_card_id": "",
                "code_type":2, //0： 充值；1：消费；2：转账,
                'card_no': ''
            },
            // 选中那一条会员信息
            confirm_index: null,
            // 卡查询
            searchdialogVisible: false,
            // 冻结弹窗
            freezedialogVisible: false,
            // 消费弹窗
            consumedialogVisible: false,
            /* 消费数据 */
            consume_form: {   
                "amount":0 ,//正数充值；负数消费
                "remark": "",
                "code_type":1 //0： 充值；1：消费；2：转账
            },
            // 储值卡消费明细
            detaildialogVisible: false,
            invoiceTableData:[], 
        }
    },
    // 加载页面
    created(){  
        console.log(this.$route.query.memberData);
        if(this.$route.query.memberData && this.$route.query.memberData.id){
            this.memberData = this.$route.query.memberData; 
            console.log(this.memberData);
            this.handleCurrentPageChange(1);  
        }else{
            this.checkdialogVisible = true;
            this.get_card_list();
        }
  
    },
    methods:{
        // 正在开发中
        developeMessage(){
            const h = this.$createElement;
            this.$notify({
            title: '提示',
            message: h('i', { style: 'color: teal'}, '正在马不停蹄地开发中~~~')
            });
        },
        /* handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        }, */
        /* 下方多选表格 */
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        /* 进入页面如果没有会员信息则选择一个 */
        get_memberData(data,index){
            let that = this;
            that.memberData = data;
            that.memberData_index = index;
            console.log('单条数据',data);
        },
        get_memberData_confirm(){
            let that = this;
            if(that.memberData.card_no && that.memberData.id){
                that.checkdialogVisible = false; 
                that.get_certain_card_base_list(that.memberData.id)
                that.handleCurrentPageChange(1);
            }else{
                that.$confirm("是否不选择会员卡进行操作?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }) 
                .then(() => { 
                    that.checkdialogVisible = false;
                 }) 
                .catch(() => {
                     
                });
            }
            
        },
        // 获取单条会员所有列表
        get_certain_card_base_list(id) {
        //设置请求路径
        let url =
            this.UrLHeader + "customer/member/get_card_base_info/" + id + "/",
            that = this; 
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        that.$axios
            .get(url)
            .then(function(res) {
            if (res.data.message == "success") {
                that.memberData = res.data.data;
                
            } else {
                that.$message.error("请求服务器失败，稍后重试");
            }
            })
            .catch(error => {});
        },
        /* 最下方table表格数据 */
        get_card_deposit_list(){
            let that = this, url = that.UrLHeader + 'customer/member/get_card_deposit_list/';
            if(that.memberData.id){
                that.$axios.post(url,{"card_id": that.memberData.id }).then((res)=>{
                    console.log('储值列表',res.data)
                    if(res.data.message = 'success'){
                        that.tableData = res.data.data.results;
                    }else{
                        that.$message.error('获取数据失败!')
                    }
                
                }).catch((error)=>{
                
                }) 
            }
        },


        /* 充值相关函数 */ 
        add_card_deposit(){
            let that = this, url = that.UrLHeader + 'customer/member/add_card_deposit/',
            params = {
                "card_id": that.memberData.id,
                "card_no": that.memberData.card_no, 
                "iss_hotel": that.memberData.iss_hotel,
                "payment": "9001",//
                "amount": parseFloat(that.charge_form.amount),//正数充值；负数消费
                "remark": "充值 "+that.charge_form.amount,
                "code_type": 0 //0： 充值；1：消费；2：转账
            };
            that.$axios.post(url,params).then((res)=>{
            console.log('充值',res.data)
            if(res.data.message = 'success'){
                that.chargedialogVisible = false;
                that.$message({
                    message: "充值成功",
                    type: "success"
                });
                that.get_certain_card_base_list(that.memberData.id)
                that.get_card_deposit_list();
            }else{
                that.$message.error('充值数据失败!')
            }
            
            }).catch((error)=>{
            
            }) 
        },
        /* 消费相关函数 */ 
        consume_card_deposit(){
            let that = this, url = that.UrLHeader + 'customer/member/add_card_deposit/',
             params = {
                "card_id": that.memberData.id,
                "card_no": that.memberData.card_no, 
                "iss_hotel": that.memberData.iss_hotel,
                "payment": "9001",//
                "amount": -parseFloat(that.consume_form.amount),//正数充值；负数消费
                "remark": "消费 "+that.consume_form.amount,
                "code_type": 1 //0： 充值；1：消费；2：转账
            };
            let avaMoney =  that.memberData.money_pay -  that.memberData.money_charge -  that.memberData.money_freeze ;
            if(avaMoney>(parseFloat(that.consume_form.amount))){
                that.$axios.post(url,params).then((res)=>{
                        console.log('消费',res.data)
                    if(res.data.message = 'success'){
                        that.consumedialogVisible = false;
                        that.$message({
                            message: "消费成功",
                            type: "success"
                        });
                        that.get_certain_card_base_list(that.memberData.id)
                        that.get_card_deposit_list();
                    }else{
                        that.$message.error('消费失败!')
                    }
                    
                }).catch((error)=>{  }) 
            }else{
                that.$message.error('可用余额不足!')
            }
            
        },

        /* 转账相关函数 */ 
        exchange_card_deposit(){
            let that = this, url = that.UrLHeader + 'customer/member/add_card_deposit/',
            params = {
                "card_id": that.memberData.id,
                "card_no": that.memberData.card_no, 
                "iss_hotel": that.memberData.iss_hotel,
                "payment": "9001",//
                "amount": parseFloat(that.exchange_form.amount),//正数充值；负数消费
                "remark": "转账" + that.exchange_form.amount,
                "transfer_card_id": that.exchange_form.transfer_card_id,
                "code_type": 2 //0： 充值；1：消费；2：转账
            }; 
            let avaMoney =  that.memberData.money_pay -  that.memberData.money_charge -  that.memberData.money_freeze ;
            if(avaMoney>(parseFloat(that.consume_form.amount))){
                console.log(that.exchange_form)
                if(that.exchange_form.transfer_card_id){
                    that.$axios.post(url,params).then((res)=>{
                        console.log('转账',res.data)
                        if(res.data.message = 'success'){
                            that.exchangedialogVisible = false
                            that.$message({
                                message: "转账成功",
                                type: "success"
                            });
                            that.get_certain_card_base_list(that.memberData.id)
                            that.get_card_deposit_list();
                        }else{
                            that.$message.error('转账失败!')
                        }
                    }).catch((error)=>{ }) 
                }else{
                    that.$message({
                        message: "请选择输入卡的卡号",
                        type: "info"
                    });
                }
            }else{
                that.$message.error('可用余额不足!')
            }
            
            
        },
        /* 获取会员列表 */ 
        get_card_list() {
        //设置请求路径
        let url = this.UrLHeader + "customer/member/get_card_base_list/?page=1&page_size=100",
                that = this; 
        that.$axios .get(url) .then(function(res) {
            console.log('会员列表',res.data.data);
            if (res.data.message == "success") {
                if (res.data.data.results.length) {
                // 初始化渲染tabs导航项目
                that.memberList = res.data.data.results; 
                
                } 
            } else {
                that.$message.error("请求服务器失败，稍后重试");
            }
            }).catch(error => {});
        },
        /* 选中单个会员卡号 */
        get_certain_member(data,index){
            let that = this;
            that.certain_member_data = data;
            that.confirm_index = index;
        },
        /* 转账选择卡号确认 */
        check_card_confirm(){
            let that = this;
            console.log(that.certain_member_data)
            if(that.certain_member_data.card_no && that.certain_member_data.id){
                that.searchdialogVisible = false;
                that.exchange_form.card_no =  that.certain_member_data.card_no;
                that.exchange_form.card_name =  that.certain_member_data.card_name;
                that.exchange_form.transfer_card_id =  that.certain_member_data.id;
            }else{
                that.$confirm("是否取消转移?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }) 
                .then(() => { 
                    that.searchdialogVisible = false;
                 }) 
                .catch(() => {
                     
                });
            }
            
        },
        /* 发票明细函数 */
        get_card_invoice_detail_list(){
            let that = this, url = that.UrLHeader + 'customer/member/get_card_invoice_detail_list/?page_size=30';
            that.detaildialogVisible = true
            that.$axios.post(url,{"card_id": that.memberData.id }).then((res)=>{
            console.log('发票明细列表',res.data.data)
            if(res.data.message = 'success'){
                that.invoiceTableData = res.data.data.results;
            }else{
                that.$message.error('获取数据失败!')
            }
            
            }).catch((error)=>{
            
            }) 
        },
        /* 分页 */
        handleCurrentPageChange(currentPage) { 
            let that = this, url = that.UrLHeader + 'customer/member/get_card_deposit_list/?page='+ currentPage + '&page_size='+10,
            params = {
                "card_id": that.memberData.id
            };
            // that.currentPage = currentPage; 
            that.$axios.post(url,params).then((res)=>{
                console.log('储值列表',res.data)
                if(res.data.message = 'success'){
                    that.$message({
                        message: "获取数据成功",
                        type: "success"
                    });
                    that.tableData = res.data.data.results;
                    that.total = res.data.data.count;
                }else{
                    that.$message.error('获取数据失败!')
                }
            
            })
        },
    }
    
    
}
</script>

<style scoped>
input:-ms-input-placeholder,textarea:-ms-input-placeholder {
color: #ff0000;
}
input::-webkit-input-placeholder,textarea::-webkit-input-placeholder {
color: #ff0000; 
}
.storedList{
    padding: 10px;
}
/* 中间部分 */
.mid_section{
    overflow: hidden;
    margin: 20px auto; 
}
.mid_section .mid_left{
    width: 35%;
}
.mid_section .mid_right{
    width: 63%;
}
.mid_section .mid_right .inputItems{
    width: 24%;
    margin:0 0 20px 0;
    display: inline-block;
}
.mid_section .mid_right .inputItems p{
    width:35%;
    padding-left: 1%;
    overflow: hidden;
    display: inline-block;
}

/* 储值卡充值弹窗 */
.charge_detail{
    overflow: hidden;
}
.charge_detail .charge_left{
    width: 40%;
}
.charge_detail .charge_right{
    width: 55%;
}
.charge_detail .Items{
    margin-bottom: 20px;
}
.charge_detail p{
    width: 5em;
    display: inline-block;
}
.remark{
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    margin-bottom: 20px;
}

/* 冻结 */
.freeze{
    width: 100%;
}
.freeze .Items{
    width: 33%;
    display: inline-block;
}
.freeze .Items p{
    width: 6em;
}


</style>
<style lang="less" scoped>
// 头部后台读取数据
  .table {
    font-size: 14px;
    border: #cccccc 1px solid;
    max-height: 500px;
    overflow-y: scroll;
    table {
      width: 100%;
      border-collapse: collapse;
      border-spacing: 0;
      text-align: center;
      thead {
        line-height: 40px;
        background-color: #68819e;
        color: #ffffff;
        tr {
          th {
            font-weight: 400;
            font-size: 16px;
          }
        }
      }
      tbody {
        line-height: 40px;
        color: #333333;
        tr {
          cursor: pointer;
          td {
            border: 1px solid #cccccc;
          }
          span {
            color: #68819e;
            cursor: pointer;
          }
          .col {
            border: 1px #68819e solid;
            margin: 0 10px;
          }
        }
        tr:hover {
          background-color: #eeeeee;
        }
      }
    }
  }
  // 分页
  .pagination {
    margin: 36px 0 14px 0;
    overflow: hidden;
    p {
      margin-left: 20px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #68819e;
      color: #fff;
    }
  }
</style>

