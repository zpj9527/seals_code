<template>
  <div class="operational">
    <div class="title" >
      <h3 style="padding: 10px;display: inline-block">运维</h3>
      <ul>
        <li>
          <span>自助机编号：</span>
          <el-select v-model="self_number" placeholder="请选择" size="mini" style="width: 150px;"  clearable>
            <el-option
              v-for="item in self_help_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>酒店：</span>
          <el-select v-model="hotel_id" placeholder="请选择" size="mini" style="width: 150px;"  clearable>
            <el-option
              v-for="item in hotel_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span>状态：</span>
          <el-select v-model="state" placeholder="请选择" size="mini" style="width: 150px;"  clearable>
            <el-option
              v-for="item in status"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
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
          label="自助机编号">
        </el-table-column>
        <el-table-column
          prop="camera_num"
          fixed="left"
          label="所在酒店">
        </el-table-column>
        <el-table-column
          prop="event_type"
          label="位置">
          <template slot-scope="scope">
            <span v-if="scope.row.event_type===0">登记</span>
            <span v-else-if="scope.row.event_type===1">陌生人</span>
            <span v-else-if="scope.row.event_type===2">访客</span>
            <span v-else-if="scope.row.event_type===3">其它</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="event_type"
          label="当前状态">
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
            <el-button  @click="repairs(scope.row.id,scope.$index, employee_list)"
                        type="danger" size="mini" data-code="/v1/common/employee/remove">报修
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
    <el-dialog
      :visible.sync="dialogVisible"
      width="26%"
      :close-on-click-modal='false'
      class="dialog_style"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <ul>
        <li>
          <span>报修人员：</span>
          <el-input v-model="input" placeholder="请输入内容" size="mini" style="width: 300px"></el-input>
        </li>
        <li>
          <span style="vertical-align: top">维修备注：</span>
          <el-input
            type="textarea" :rows="8" style="width: 300px;" placeholder="请输入内容" v-model="input">
          </el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="" size="mini">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "operational",
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
          hotel_id:'',//酒店
          hotel_list:[],//所有酒店
          state:'',//状态
          status:[
            {
              label:'正常',
              value:'1'
            },
            {
              label:'异常',
              value:'0'
            }
          ],//所有状态
          self_help_list:[],//所有自助机
          /**获取数据*/
          monitoring_list:[],//获取自助机操作日志
          event_type:4,//图像类别
          dialogVisible:false,//新增和修改展示的页面
          input:'',
          value:'',
          options:[],
          radio:3,

        }
      },
      created: function () {
        let that =this;
      },
      methods: {
        /**报修*/
        repairs(){
          let that = this;
          that.dialogVisible = true;
          that.title="报修"
        },


        //点击分页上的页数
        handleCurrentChange(curPage) {

        },
        /**dilog*/
        //修改页面的显示和隐藏
        handleClose(done) {
          done();
        },
      }
    }
</script>

<style scoped lang="less">
  .operational{
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
    .dialog_style{
      ul{
        overflow: hidden;
        li{
          float: left;
          margin-bottom: 10px;
          span{
            display: inline-block;
            width: 120px;
            text-align: right;
          }
        }
      }
    }
  }
</style>
