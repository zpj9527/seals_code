<template>
  <div  class="order-form">
    <div class="shopping">
      <div class="title">
        <h3 style="padding: 10px;display: inline-block">订单</h3>
        <!--<i class="el-icon-mobile"></i>-->
        <div style="float: right;margin-right: 50px;margin-top: 10px">
          <span>OTA平台：</span>
          <el-select v-model="ota" placeholder="请选择" size="mini" @focus="terrace" @change="search" clearable>
            <el-option
              v-for="item in terrace_list"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="预订单" name="first">
          <!--账户种类 状态 ... -->
          <div class="status">
            <el-table
              :data="ota_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="ota_company_id.name"
                fixed="left"
                label="OTA平台">
              </el-table-column>
              <el-table-column
                prop="camera_num"
                fixed="left"
                label="产品">
              </el-table-column>
              <el-table-column
                prop="city_id"
                label="城市">
                <template slot-scope="scope">
                  <span v-if="scope.row.city_id===1">上海</span>
                  <span v-else>其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="order_no"
                width="130"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="order_type"
                label="类型">
              </el-table-column>
              <el-table-column
                prop="book_no"
                label="预定号">
              </el-table-column>
              <el-table-column
                prop="source"
                label="来源号">
              </el-table-column>
              <el-table-column
                prop="confirmed"
                label="是否确定">
                <template slot-scope="scope">
                   <span v-if="scope.row.confirmed===0">未确认</span>
                  <span v-else-if="scope.row.confirmed===1">已确认</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="confirm_type"
                label="确认类型">
              </el-table-column>
              <el-table-column
                prop="order_status"
                label="订单状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.order_status===0">已取消</span>
                  <span v-else-if="scope.row.order_status===1">已预定</span>
                  <span v-else-if="scope.row.order_status===2">已确认</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reside_people"
                label="客人信息">
              </el-table-column>
              <el-table-column
                prop="book_time"
                width="150"
                label="预定时间">
              </el-table-column>
              <el-table-column
                prop="event_time"
                width="160"
                label="入住/离店时间">
                <template slot-scope="scope">
                   <span>{{scope.row.check_in_date}} / {{scope.row.check_out_date}} </span>
                </template>
              </el-table-column>
              <el-table-column
                prop="time_span"
                label="入住天数">
              </el-table-column>
              <el-table-column
                prop="prepaid"
                label="是否预付">
              </el-table-column>
              <el-table-column
                prop="ota_price"
                label="OTA价格">
              </el-table-column>
              <el-table-column
                prop="net_price"
                label="净价">
              </el-table-column>
              <el-table-column
                prop="room_type"
                width="150"
                label="房型">
              </el-table-column>
              <el-table-column
                prop="room_count"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="可售数量">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="评价/恢复">
              </el-table-column>
              <el-table-column
                prop="event_time"
                fixed="right"
                width="120"
                label="操作">
                <template slot-scope="scope">
                  <el-button  @click="cancel(scope.row.id,scope.$index, employee_list)"
                              type="primary" size="mini" data-code="/v1/common/employee/remove">转入PMS
                  </el-button>
                </template>
              </el-table-column>

            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           :current-page="cur_page"
                           @current-change="handleCurrentChange"
                           :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="应到未到" name="two">
          <!--账户种类 状态 ... -->
          <div class="status">
            <el-table
              :data="ota_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="ota_company_id.name"
                fixed="left"
                label="OTA平台">
              </el-table-column>
              <el-table-column
                prop="camera_num"
                fixed="left"
                label="产品">
              </el-table-column>
              <el-table-column
                prop="city_id"
                label="城市">
                <template slot-scope="scope">
                  <span v-if="scope.row.city_id===1">上海</span>
                  <span v-else>其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="order_no"
                width="130"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="order_type"
                label="类型">
              </el-table-column>
              <el-table-column
                prop="book_no"
                label="预定号">
              </el-table-column>
              <el-table-column
                prop="source"
                label="来源号">
              </el-table-column>
              <el-table-column
                prop="confirmed"
                label="是否确定">
                <template slot-scope="scope">
                  <span v-if="scope.row.confirmed===0">未确认</span>
                  <span v-else-if="scope.row.confirmed===1">已确认</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="confirm_type"
                label="确认类型">
              </el-table-column>
              <el-table-column
                prop="order_status"
                label="订单状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.order_status===0">已取消</span>
                  <span v-else-if="scope.row.order_status===1">已预定</span>
                  <span v-else-if="scope.row.order_status===2">已确认</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reside_people"
                label="客人信息">
              </el-table-column>
              <el-table-column
                prop="book_time"
                label="预定时间">
              </el-table-column>
              <el-table-column
                prop="event_time"
                width="100"
                label="入住/离店时间">
              </el-table-column>
              <el-table-column
                prop="time_span"
                label="入住天数">
              </el-table-column>
              <el-table-column
                prop="prepaid"
                label="是否预付">
              </el-table-column>
              <el-table-column
                prop="ota_price"
                label="OTA价格">
              </el-table-column>
              <el-table-column
                prop="net_price"
                label="净价">
              </el-table-column>
              <el-table-column
                prop="room_type"
                width="150"
                label="房型">
              </el-table-column>
              <el-table-column
                prop="room_count"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="可售数量">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="评价/恢复">
              </el-table-column>
              <!--<el-table-column-->
                <!--prop="event_time"-->
                <!--fixed="right"-->
                <!--width="120"-->
                <!--label="操作">-->
                <!--<template slot-scope="scope">-->
                  <!--<el-button  @click="cancel(scope.row.id,scope.$index, employee_list)"-->
                              <!--type="primary" size="mini" data-code="/v1/common/employee/remove">-->
                  <!--</el-button>-->
                <!--</template>-->
              <!--</el-table-column>-->

            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           :current-page="cur_page"
                           @current-change="handleCurrentChange"
                           :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="历史订单" name="second">
          <!--账户种类 状态 ... -->
          <div class="status">
            <el-table
              :data="monitoring_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="camera_name"
                fixed="left"
                label="OTA平台">
              </el-table-column>
              <el-table-column
                prop="camera_num"
                fixed="left"
                label="产品">
              </el-table-column>
              <el-table-column
                prop="event_type"
                label="城市">
                <template slot-scope="scope">
                  <span v-if="scope.row.event_type===0">登记</span>
                  <span v-else-if="scope.row.event_type===1">陌生人</span>
                  <span v-else-if="scope.row.event_type===2">访客</span>
                  <span v-else-if="scope.row.event_type===3">其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="person_name"
                label="订单号">
              </el-table-column>
              <el-table-column
                prop="photo_list"
                label="类型">
                <template slot-scope="scope">
                  <el-popover placement="right" title="" trigger="hover">
                    <img v-for="item in scope.row.photo_list" :src="item" style="width: 500px;height: auto">
                    <img slot="reference"  v-for="item in scope.row.photo_list" :src="item" alt="" style="max-height: 50px;max-width: 130px">
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="预定号">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="来源号">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="是否确定">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="确认类型">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="订单状态">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="客人信息">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="预定时间">
              </el-table-column>
              <el-table-column
                prop="event_time"
                width="100"
                label="入住/离店时间">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="入住天数">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="是否预付">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="OTA价格">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="进价">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="房型">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="数量">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="可售数量">
              </el-table-column>
              <el-table-column
                prop="event_time"
                label="评价/恢复">
              </el-table-column>
              <el-table-column
                prop="event_time"
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button  @click="cancel(scope.row.id,scope.$index, employee_list)"
                              type="danger" size="mini" data-code="/v1/common/employee/remove">转入PMS
                  </el-button>
                  <el-button  size="small"
                              @click="submit(scope.row,scope.row.id,scope.$index, employee_list)"
                              data-code="/v1/common/employee/update">转入PMS
                  </el-button>
                </template>
              </el-table-column>

            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           :current-page="cur_page"
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
        name: "order-form",
      data() {
        return {
          url: this.api.api_9530_9503,
          title: '',
          //分页
          total: 10,
          pagesize: 10,
          cur_page: 1,
          terrace_list:[],//所有平台
          ota_list:[],//ota平台
          ota:'',//ota
          monitoring_list:[],//获取订单
          event_type:4,//图像类别
          activeName:"first",//tab

        }
      },
      created: function () {
        let that =this;
        that.order_data();//获取所有订单
      },
      methods: {
          /**获取所有订单*/
          order_data(){
            let that =this;
            that.$axios({
              url:that.url+"/v1/ota/order/list",
              method:"get"
            })
              .then(res=>{
                //console.log(res.data.data.total_count);
                if(res.data.message==="success"){
                  that.ota_list = res.data.data.list;
                  that.total =res.data.data.total_count ;
                }
              })
              .catch(err=>{
                console.log(err);
              })
          },
          /**获取所有平台Z*/
          terrace(){
            let that =this;
            that.$axios({
              url:that.url+"/v1/ota/company/list",
              method:"get",
              params:{
                page_size:999
              }
            })
              .then(res=>{
                //console.log(res.data.data.total_count);
                if(res.data.message==="success"){
                  that.terrace_list = res.data.data.list;
                }
              })
              .catch(err=>{
                console.log(err);
              })
          },
          /**筛选*/
          search(){
            let that =this;
            that.$axios({
              url:that.url+"/v1/ota/order/list",
              method:"post",
              data:{
                ota_company_id:that.ota,
              }
            })
              .then(res=>{
                //console.log(res.data.data.total_count);
                if(res.data.message==="success"){
                  that.ota_list = res.data.data.list;
                  that.total = res.data.data.total_count;
                }
              })
              .catch(err=>{
                console.log(err);
              })
          },
          /**tab点击事件*/
          handleClick(tab, event) {
            console.log(tab, event);
          },
        /**s删除*/
        cancel(){

        },
        /**修改*/
        submit(){

        },
        //点击分页上的页数
        handleCurrentChange(curPage) {

        }
      }
    }
</script>

<style scoped lang="less">
  .order-form {
    width: 97%;
    margin-left: 4px;
    .title {
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
      .shopping_title {
        li {
          display: inline-block;
          margin-left: 10px;
        }
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
</style>
