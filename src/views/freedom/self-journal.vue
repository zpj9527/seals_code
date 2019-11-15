<template>
  <div class="self-journal">
    <div class="title" >
      <h3 style="padding: 10px;display: inline-block">自助机卡日志</h3>
      <ul>
        <li>
          <span>自助机编号：</span>
          <el-select v-model="self_number" placeholder="请选择" size="mini" style="width: 150px;"clearable>
            <el-option
              v-for="item in self_help_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>时间筛选：</span>
          <el-date-picker
            v-model="screen_time"
            type="date"
            size="mini"
            clearable
            style="width: 150px;"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span>发卡：</span>
          <el-select v-model="issuing" placeholder="请选择" size="mini" style="width: 150px;"   clearable>
            <el-option
              v-for="item in card_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <el-button size="mini"  type="primary" style="width: 80px;" >查找</el-button>
      </ul>
    </div>
    <div class="status" style="margin-top: 10px">
      <el-table
        :data="monitoring_list"
        size="mini"
        max-height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
      >
        <el-table-column
          prop="camera_name"
          fixed="left"
          label="日期/时间">
        </el-table-column>
        <el-table-column
          prop="camera_num"
          fixed="left"
          label="发卡/取卡/别卡">
        </el-table-column>
        <el-table-column
          prop="event_type"
          label="功能模块">
          <template slot-scope="scope">
            <span v-if="scope.row.event_type===0">登记</span>
            <span v-else-if="scope.row.event_type===1">陌生人</span>
            <span v-else-if="scope.row.event_type===2">访客</span>
            <span v-else-if="scope.row.event_type===3">其它</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="person_name"
          label="操作房间">
        </el-table-column>
        <el-table-column
          prop="event_type"
          label="是否成功">
          <template slot-scope="scope">
            <span v-if="scope.row.event_type===0">登记</span>
            <span v-else-if="scope.row.event_type===1">陌生人</span>
            <span v-else-if="scope.row.event_type===2">访客</span>
            <span v-else-if="scope.row.event_type===3">其它</span>
          </template>
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
        name: "self-journal",
      data() {
        return {
          url: this.api.api_9530_9503,
          title: '',
          //分页
          total: 10,
          pagesize: 10,
          cur_page: 1,
          /**筛选*/
          self_number:'',//自助机编号
          screen_time:'',//时间筛选
          issuing:'',//发卡
          card_list:[],//所有卡
          self_help_list:[],//所有自助机
          /**获取数据*/
          monitoring_list:[],//获取自助机操作日志
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
  .self-journal{
    width: 100%;
    margin-left: 10px;
    .title{
      margin: 10px  0;
      ul{
        float: right;
        overflow: hidden;
        margin-right: 60px;
        margin-top: 10px;
        li{
          float: left;
          margin-right: 10px;
          span{
            vertical-align: center;
          }
        }
      }
    }
    .status{
      width: 96%;
    }
  }
</style>
