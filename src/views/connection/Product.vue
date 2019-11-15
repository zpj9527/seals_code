<template>
  <div class="product">
    <div class="title" >
      <h3 style="padding: 10px;display: inline-block">产品</h3>
      <el-button size="mini"  type="primary" style="width: 80px;" >新增</el-button>
       <div style="float: right;margin-right: 50px">
         <span>OTA平台：</span>
         <el-select v-model="ota" placeholder="请选择" size="mini">
           <el-option
             v-for="item in ota_list"
             :key="item.value"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
       </div>
    </div>
    <div class="status" style="margin-top: 10px">
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
          label="名称">
        </el-table-column>
        <el-table-column
          prop="camera_num"
          fixed="left"
          label="房型">
        </el-table-column>
        <el-table-column
          prop="event_type"
          label="房价码">
          <template slot-scope="scope">
            <span v-if="scope.row.event_type===0">登记</span>
            <span v-else-if="scope.row.event_type===1">陌生人</span>
            <span v-else-if="scope.row.event_type===2">访客</span>
            <span v-else-if="scope.row.event_type===3">其它</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="person_name"
          label="起始时间">
        </el-table-column>
        <el-table-column
          prop="photo_list"
          label="终止时间">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img v-for="item in scope.row.photo_list" :src="item" style="width: 500px;height: auto">
              <img slot="reference"  v-for="item in scope.row.photo_list" :src="item" alt="" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="event_time"
          label="佣金">
        </el-table-column>
        <el-table-column
          prop="event_time"
          label="备注">
        </el-table-column>

        <el-table-column
          prop="event_time"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button  @click="cancel(scope.row.id,scope.$index, employee_list)"
                        type="danger" size="mini" data-code="/v1/common/employee/remove">删除
            </el-button>
            <el-button  size="small"
                        @click="submit(scope.row,scope.row.id,scope.$index, employee_list)"
                        data-code="/v1/common/employee/update">修改
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
  </div>
</template>

<script>
    export default {
        name: "product",
      data() {
        return {
          url: this.api.api_9530_9503,
          title: '',
          //分页
          total: 10,
          pagesize: 10,
          cur_page: 1,
          ota_list:[],//ota平台
          ota:'',//ota
          monitoring_list:[],//获取监控
          event_type:4,//图像类别

        }
      },
      created: function () {
        let that =this;
      },
      methods: {
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
 .product{
   width: 100%;
   .title{
     margin: 10px  0;
   }
   .status{
     width: 97%;
   }
 }
</style>
