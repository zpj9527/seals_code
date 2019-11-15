<template>
<div class="IntegralList">
  <!-- 积分列表 -->
  <p class="iconLogo">积分列表</p>
  <!-- 输入框 -->
  <div class="search">
      <div class="inputCell">
        协议卡号：
        <!-- 查询input -->
        <el-input v-model=" memberData.card_no " placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        持卡人 ：
        <!-- 查询input -->
        <el-input v-model=" memberData.name " placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        协议计划：
        <!-- 查询input -->
        <el-input v-model=" memberData.card_type " placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>

      <div class="inputCell">
        积分余额：
        <!-- 查询input -->
        <el-input v-model=" memberData.card_type " placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        所属酒店：
        <!-- 查询input -->
        <el-input v-model=" memberData.card_type " placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="inputCell">
        卡等级 ：
        <!-- 查询input -->
        <el-input v-model=" memberData.card_level " placeholder="请输入内容" style="width: 200px;margin: 0 16px;"></el-input>
      </div>
      <div class="btn-group">
        <div class="single-btn" @click="transferDialog = true">积分转移</div>
        <div class="single-btn" @click="changeDialog = true">积分调整</div>
        <div class="single-btn">积分兑换</div>
        <div class="single-btn">兑换撤销</div>
        <div class="single-btn">兑换账单</div>
        <div class="single-btn" @click="selfDialog = true, param ={}">手工录入</div>
      </div>
  </div>
  <!-- 列表清单部分 -->
  <!-- 表格 -->
      <div class="table" style="width: 100%;">
          <el-table :data="tableData" @row-click='handleInfoById' :height="300" :header-cell-style="{background:'#BFCAD1', color: '#68819E'}" style="width: 100%">
            <el-table-column type="index" width="55" label="编号" prop="id"></el-table-column>
            <el-table-column prop="biz_date" label="营业日期"></el-table-column>
            <el-table-column prop="iss_hotel" label="积分产生酒店"></el-table-column>
            <el-table-column prop="amount" label="产生金额"></el-table-column>
            <el-table-column prop="point" label="产生积分"></el-table-column>
            <el-table-column prop="balance" label="余额"></el-table-column>
            <el-table-column prop="order_no" label="结账单号"></el-table-column>
            <el-table-column prop="account_no" label="账号"></el-table-column>
            <el-table-column prop="src" label="状态">
              <template slot-scope="scope">
                <p>{{ srcDic[scope.row.src] }}</p>
              </template>
            </el-table-column>
            
            <el-table-column prop="invalid_date" label="失效时间"></el-table-column>
            <el-table-column prop="invalid_sta" label="失效状态"></el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
          </el-table>
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="getData"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, prev, pager, next, jumper"
              :total="total">
          </el-pagination>    
      </div>
      <!--积分转移-->
      <el-dialog class="houseTypeClass" title="积分转移" :visible.sync="transferDialog" :close-on-click-modal="false">
        <div style="height: 400px">
            <el-col :span="8">
              <el-row>
                <span>转出卡:</span><el-input style="width: 200px"></el-input>
              </el-row>
              <el-row class="secondClass">
                <span style="display: block; width: 50px;float: left;">卡信息:</span><el-input type="textarea" :rows="4" style="width: 200px"></el-input>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row style="margin-top: 10px">
                <span>转积分数量:</span>
              </el-row>
              <el-row style="margin-top: 30px">
                <el-input type="textarea" :rows="2"  style="width: 200px"></el-input>
              </el-row>
              <el-row style="margin-top: 15px">
                <el-button type="primary">重置</el-button>
                <el-button type="primary">保存</el-button>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <span>转入卡:</span><el-input style="width: 200px"></el-input>
              </el-row>
              <el-row class="secondClass">
                <span style="display: block; width: 50px;float: left;">卡信息:</span><el-input type="textarea" :rows="4" style="width: 200px"></el-input>
              </el-row>
            </el-col>
        </div>
      </el-dialog>
      <!--积分调整-->
      <el-dialog class="houseTypeClass" title="积分调整" :visible.sync="changeDialog" :close-on-click-modal="false">
        <div style="height: 400px">
          <el-col :span="8">
              <el-row>
                <span>转出卡:</span><el-input style="width: 200px"></el-input>
              </el-row>
              <el-row class="secondClass">
                <span style="display: block; width: 50px;float: left;">卡信息:</span><el-input type="textarea" :rows="6" style="width: 200px"></el-input>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <div><span style="margin-left: 28px;">调整方向:</span><el-select style="width: 200px"></el-select></div>
                <div style="margin-top: 15px"><span style="margin-left: 28px;">调整原因:</span><el-select style="width: 200px"></el-select></div>
                <div style="margin-top: 10px"><span>积分失效日期:</span><el-input style="width: 200px"></el-input></div>
                <div style="margin-top: 10px"><span>转移积分数量:</span><el-input style="width: 200px"></el-input></div>
              </el-row>
            </el-col>
            <el-col :span="8">
              <el-row>
                <span>备注:</span>
              </el-row>
              <el-row class="secondClass">
                <el-input type="textarea" :rows="7" style="width: 200px"></el-input>
              </el-row>
            </el-col>
        </div>
      </el-dialog>
      <!--手工录入-->
      <el-dialog class="houseTypeClass" title="手工录入" :visible.sync="selfDialog" :close-on-click-modal="false">
        <div style="height: 400px">
          <div class="search">
            <div class="inputCellBlock"  style="">
              消费金额：
              <!-- 查询input -->
              <el-input v-model.trim="param.charge" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
            </div>
            <div class="inputCellBlock">
              付款代码：
              <!-- 查询input -->
              <el-input v-model="param.ta_code" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
            </div>
            <div class="inputCellBlock">
              付款方式：
              <!-- 查询input -->
              <!-- <el-input v-model="param.pay_code" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input> -->
              <el-select v-model="param.pay_code " placeholder="请输入内容" style="width: 220px;margin: 0 16px;">
                <el-option
                  v-for="(item,index) in custom_wayArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div class="inputCellBlock">
              消费酒店：
              <!-- 查询input -->
              <el-input v-model="param.consume_hotel" placeholder="请输入内容" style="width: 220px;margin: 0 16px;"></el-input>
            </div>
            <div class="inputCellBlock">
              消费类型：
              <!-- 查询input -->
              <el-select v-model="param.cat_sum " placeholder="请输入内容" style="width: 220px;margin: 0 16px;">
                <el-option
                  v-for="(item,index) in custom_wayArr"
                  :key="index"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </div>
            <div class="pull-right" style="height: 100px; padding-top: 50px">
              <!-- 查询 -->
              <el-button type="primary" @click="param = {}">重置</el-button>
              <!-- 添加 -->
              <el-button type="primary" @click="addIntegral()" style="margin-right: 20px;">保存</el-button>
            </div>
        </div>
      </div>
    </el-dialog>

    <!-- 第一次进入如果没有携带协议单位信息 --> 
        <el-dialog title="协议单位选择" :visible.sync=" checkdialogVisible " width="70%">
            <div class="charge_detail">  
                <!-- 列表清单部分 -->
                <div class="table" style="width: 100%;">
                    <table>
                    <thead>
                        <tr>
                        <th>编号</th>
                        <th>姓名</th>
                        <th>卡号</th>
                        <th>协议单位计划</th>
                        <th>协议单位等级</th> 
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
                        <tr  v-for="(item,index) in memberList" :key="index" @click="get_memberData(item,index)" @dblclick=' get_memberData_confirm() ' :style="{ 'background-color':index == memberData_index? '#bbbbbb':''}">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.card_no }}</td>
                        <td>{{ item.card_type }}</td>
                        <td>{{ item.card_level }}</td> 
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
  </div>
</template>
<script>
export default {
    name:'MemberList',
    data(){
        return{
          // http://47.98.113.173:9108/v1/customer/member/get_card_point_list/
          UrLHeader:'http://member.crowncrystalhotel.com/v1/',
          /* 从协议单位详情携带过来的数据 */
            memberData: '',
            // 如果没有携带数据
            checkdialogVisible: false,
            memberData_index:'',
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
            // 积分列表
          tableData: [],
          // 列表src状态
          srcDic:{
            'RP': "注册赠送",
            'PC':  "积分录入",
            'PA': "消费产生",
            'LF': "积分转入",
            'LT': "积分转出",
            'CH': "积分兑换",
            'PP': "充值赠送"
          } ,
          selfDialog: false,
          transferDialog: false,
          changeDialog: false,
          currentPage: 1,
          pagesize: 10,
          total: 0,
          checked:true,
          SearchContent:'',
          param: {}, //手工录入==积分录入对象
          // 消费类型
          custom_wayArr:[
            {
              code: 'point',
              descript: '积分'
            },
            {
              code: 'money',
              descript: '现金'
            },
          ],
        }
    },
    created(){ 
      if(this.$route.query.memberData && this.$route.query.memberData.id){
            this.memberData = this.$route.query.memberData; 
            this.get_point_list(); 
        }else{
            this.checkdialogVisible = true;
            this.get_card_list();
        }
    },
    methods: {
       /* 进入页面如果没有会员信息则选择一个 */
        get_memberData(data,index){
            let that = this;
            that.memberData = data;
            that.memberData_index = index;
        },
        get_memberData_confirm(){
            let that = this;
            if(that.memberData.card_no && that.memberData.id){
                that.checkdialogVisible = false; 
                that.get_certain_card_base_list(that.memberData.id);
                this.get_point_list(); 
            }else{
                that.$confirm("是否不选择会员卡进行操作?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }) 
                .then(() => { 
                    that.checkdialogVisible = false;
                 }) 
                .catch(() => { });
            } 
        },

      /* 获取会员列表 */ 
        get_card_list() {
        //设置请求路径
        let url = this.UrLHeader + "customer/company/get_company_base_list/?page=1&page_size=100",
                that = this; 
        that.$axios .get(url) .then(function(res) {
            console.log(res.data);
            if (res.data.message == "success") {
                if (res.data.data.results.length) {
                // 初始化渲染tabs导航项目
                that.memberList = res.data.data.results; 
                that.get_point_list(); 
                } 
            } else {
                that.$message.error("请求服务器失败，稍后重试");
            }
            }).catch(error => {});
        },
         // 获取单条列表
        get_certain_card_base_list(id) {
        //设置请求路径
        let url =
            this.UrLHeader + "customer/company/get_company_base_info/" + id + "/",
            that = this; 
        // 发送请求:将数据返回到一个回到函数中
        // 并且响应成功以后会执行then方法中的回调函数
        that.$axios
            .get(url)
            .then(function(res) {
            if (res.data.message == "success") {
                console.log(res.data.data);
                that.memberData = res.data.data.company_base;

            } else {
                that.$message.error("请求服务器失败，稍后重试");
            }
            })
            .catch(error => {});
        },
      /* 获取积分列表 */
      get_point_list(){
        let that = this, url = that.UrLHeader + 'customer/company/get_company_point_list/';
        if(that.memberData.id){
          that.$axios.post(url,{"company_id": that.memberData.id }).then((res)=>{
            console.log('积分列表',res.data.data)
            if(res.data.message = 'success'){
              that.tableData = res.data.data.results;
            }else{
              that.$message.error('获取数据失败!')
            }
            
          }).catch((error)=>{
            that.$message.error('获取数据失败!')
          }) 
        }
        
      },
      //积分录入方法
      addIntegral(){ 
        let that = this, url = that.UrLHeader + 'customer/member/entry_card_point/';
        if(!this.validateData()){
          return
        }
        that.param.charge = Number(that.param.charge);
        that.param.point_type = 'entering';
        that.param.card_id = that.memberData.id;
        that.param.card_no = that.memberData.card_no;
        that.param.biz_date = new Date();
        that.param.gen_date = new Date();

        this.$axios.post(url, that.param).then((res)=>{
          that.$message({
            message: '添加成功',
            type: 'success'
          })
          that.selfDialog = false
        }).catch((error)=>{
          that.$message.error('添加数据失败!')
        }) 
      },
      // 未填充函数
      handleInfoById(){

      },
      getData(){

      },
      handleSizeChange(){

      },
      //验证数据方法 返回值(boolean)
      validateData(){
        return (
          this.validateBlank(this.param.charge, '消费金额是必填项', this)&&
          this.validateNAN(this.param.charge, '消费金额必须是数字', this)
        )

      },
      //工具方法验证为空
      validateBlank: function(targetParam, warnMessage, VueInst, successMessage){
        if (!warnMessage) {
            return !(targetParam === '' || targetParam === null || targetParam === undefined)
            } else {
            if (targetParam === '' || targetParam === null || targetParam === undefined) {
                VueInst.$message({
                message: warnMessage,
                type: 'error'
                })
                return false
            } else {
                if (successMessage) {
                    VueInst.$message({
                        message: successMessage,
                        type: 'success'
                    })
                }
                return true
            }
        }
      },
      //工具方法验证为数字
      validateNAN: function (ce, warnMessage, VueInst, successMessage) {
        if (ce === '' || ce === null || ce === undefined) {
            return true
        }
        var reg = /^(\-|\+)?\d+(\.\d+)?$/;
        if (!warnMessage) {
            return reg.test(ce)
        } else {
            if (!reg.test(ce)) {
                VueInst.$message({
                message: warnMessage,
                type: 'error'
                })
                return false
            } else {
                if (successMessage) {
                VueInst.$message({
                    message: successMessage,
                    type: 'success'
                })
                }
                return true
            }
        }
      }
    }
}
</script>
<style lang="less" scoped>

.el-button--primary {
    color: #fff;
    background-color: #4488E9;
    border-color: #4488E9;
}
.el-checkbox{
   color: #ffffff; 
}
.IntegralList{
    padding: 10px;
    .iconLogo{
        color: #333333;
        font-size: 22px;
    }
    .iconLogo::before{
        content: " ";
        display: inline-block;
        width: 28px;
        height: 25px;
        background: url("../../assets/images/member/icon-logo.png") no-repeat center;
        background-size: 100%;
        vertical-align: -4px;
        margin-right: 10px; 
    }
    // 搜索栏
    .search{
        background-color: #F7F7F7;
        padding:0 0 0 20px;
        overflow: hidden;
        margin: 16px 0;
        font-size: 14px;
        .inputCell{
          width: 19%;
          display: inline-block;
          overflow: hidden;
          line-height: 30px;
          margin: 10px 0 10px 0;

          .el-input{ 
            float: right;
          }
        }
        // block
        .inputCellBlock{
          overflow: hidden;
          line-height: 30px;
          margin: 10px 20px 10px 0;
          p{
            width: 11%;
            text-align: left;
          }
        }
        
        // 按钮组合
        .btn-group{
          width: 80%;
          margin: 8px 0;
          float: right;
          // border: 1px red solid;
          padding-right: 70px;
        }
        .single-btn{
          float: right;
          padding: 0 30px;
          line-height: 40px;
          border-radius: 2px;
          color: #fff;
          background-color: #4488E9;
          margin-right: 10px;
          cursor: pointer;
        }
    }
    // 头部后台读取数据

    .secondClass{
      margin-top: 20px
    }
    // 分页
  .pagination{
    margin: 36px 0 14px 0;
    overflow: hidden;
    
    p{
      margin-left: 20px;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      background-color: #68819E;
      color: #fff;
    }
  }
}

</style>
<style scoped>
   .houseTypeClass>>> .el-dialog__header{
    background-color: #8895A8;
   }
   .houseTypeClass>>>.el-dialog__title {
    color: white;
  }
  .houseTypeClass>>> .el-dialog__headerbtn .el-dialog__close{
    color: white;
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



