<template>
  <div class="surveillance">
    <!--支付方式 -->
    <div class="shopping">
      <div class="title">
        <h4 style="padding: 10px;display: inline-block">监控</h4>
        <ul style="margin-bottom: 10px">
          <li>
            <span>起始时间:</span>
            <el-date-picker
              v-model="from_time"
              clearable
              size="mini"
              style="width: 180px;"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              @change="screen"
              value-format="yyyy-MM-dd HH:mm:ss"
              :picker-options="pickerOptions">
            </el-date-picker>
          </li>
          <li>
            <span>终止时间:</span>
            <el-date-picker
              v-model="to_time"
              clearable
              size="mini"
              style="width: 180px;"
              type="datetime"
              placeholder="选择日期时间"
              align="right"
              value-format="yyyy-MM-dd HH:mm:ss"
              @change="screen"
              :picker-options="pickerOptions">
            </el-date-picker>
          </li>
          <li>
            <span>图像类别：</span>
            <el-radio-group v-model="event_type"  @change="screen" clearable>
              <el-radio :label="4">全部</el-radio>
              <el-radio :label="0">登记</el-radio>
              <el-radio :label="1">陌生人</el-radio>
              <el-radio :label="2">访客</el-radio>
              <el-radio :label="3">其它</el-radio>
            </el-radio-group>
          </li>
        </ul>
      </div>
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
            width="150"
            label="摄像头名称">
          </el-table-column>
          <el-table-column
            prop="camera_num"
            label="摄像头编号">
          </el-table-column>
          <el-table-column
            prop="event_type"
            label="图像类别">
            <template slot-scope="scope">
              <span v-if="scope.row.event_type===0">登记</span>
              <span v-else-if="scope.row.event_type===1">陌生人</span>
              <span v-else-if="scope.row.event_type===2">访客</span>
              <span v-else-if="scope.row.event_type===3">其它</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="person_name"
            label="识别出的人员姓名">
          </el-table-column>
          <el-table-column
            prop="photo_list"
            label="图片">
            <template slot-scope="scope">
              <el-popover placement="right" title="" trigger="hover">
                <img v-for="item in scope.row.photo_list" :src="item" style="width: 500px;height: auto">
                <img slot="reference"  v-for="item in scope.row.photo_list" :src="item" alt="" style="max-height: 50px;max-width: 130px">
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="event_time"
            label="事件日期">
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
  </div>
</template>

<script>
  export default {
    name: "surveillance",
    data() {
      return {
        url: this.api.api_9530_9503,
        title: '',
        //分页
        total: 10,
        pagesize: 10,
        cur_page: 1,
        monitoring_list:[],//获取监控
        //筛选
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        from_time: '',
        to_time: '',
        event_type:4//图像类别

      }
    },
    created: function () {
      let that =this;
      that.monitoring_data();
    },
    methods: {
      /**
       * 获取监控*/
      monitoring_data(){
        let that = this;
        that.$axios({
          url: that.url + "/v1/camera/face_event/list",
          method: "get",
          params:{
            cur_page:that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              for(let i=0;i<res.data.data.list.length;i++){
                let photo_arr=[];
                let arr=[];
                res.data.data.list[i].photo_ids = res.data.data.list[i].photo_ids+","
                if(res.data.data.list[i].photo_ids!==null){
                  photo_arr=res.data.data.list[i].photo_ids.split(',');
                }
                for(let item of photo_arr){
                  arr.push("https://image.eloadspider.com/resource/camera_face_event?id="+item)
                }
                res.data.data.list[i].photo_list = arr;
              }
              that.monitoring_list = res.data.data.list;
              that.total=res.data.data.total_count
              console.log(that.monitoring_list);

            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**筛选*/
      screen(){
        let that =this;
        that.cur_page=1;
        let event_type = that.event_type;
        if(event_type===4){
          event_type=""
        };

        that.$axios({
          url: that.url + "/v1/camera/face_event/search_by_time",
          method: "post",
          data:{
            page_num:that.cur_page,
            from_time:that.from_time,
            to_time:that.to_time,
            event_type:event_type,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              for(let i=0;i<res.data.data.list.length;i++){
                let photo_arr=[];
                let arr=[];
                res.data.data.list[i].photo_ids = res.data.data.list[i].photo_ids+",";
                if(res.data.data.list[i].photo_ids!==null){
                  photo_arr=res.data.data.list[i].photo_ids.split(',');
                }
                for(let item of photo_arr){
                  arr.push("https://image.eloadspider.com/resource/camera_face_event?id="+item)
                }
                res.data.data.list[i].photo_list = arr;
              }
              that.monitoring_list = res.data.data.list;
              that.total=res.data.data.total_count
              console.log(that.monitoring_list);
            }
            else {
              console.log(res.data.message);
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
        that.cur_page = curPage;
        let event_type = that.event_type;
        if(event_type===4){
          event_type=""
        }
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/camera/face_event/list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            from_time:that.from_time,
            to_time:that.to_time,
            event_type:event_type,
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              for(let i=0;i<res.data.data.list.length;i++){
                let photo_arr=[];
                let arr=[];
                res.data.data.list[i].photo_ids = res.data.data.list[i].photo_ids+","
                if(res.data.data.list[i].photo_ids!==null){
                  photo_arr=res.data.data.list[i].photo_ids.split(',');
                }
                for(let item of photo_arr){
                  arr.push("https://image.eloadspider.com/resource/camera_face_event?id="+item)
                }
                res.data.data.list[i].photo_list = arr;
              }
              that.monitoring_list = res.data.data.list;
              console.log(that.monitoring_list);
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
    }
  }
</script>

<style lang="less" scoped>
  .surveillance {
    width: 96%;
    margin-left: 10px;
    background: white;
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
