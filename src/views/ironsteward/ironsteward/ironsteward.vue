<template>
  <div class="ironsteward">
    <el-container>
      <!--左侧-->
      <el-aside  class="left"  style="width: 300px" >
        <el-tabs v-model="activeName2" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="房态筛选" name="first">
            <div class="f-one">客房信息</div>
            <div class="f-two">
              <el-input placeholder="请输入房间号" clearable v-model="room_num_input">
                <template slot="append"><span  @click="get_certain_room_status(hotel_id,room_num_input)">搜索</span> </template>
              </el-input>
            </div>
            <div class="f-three">
              <label>楼层：</label>
              <el-select v-model="form.floor" placeholder="请选择" size="mini" @change="get_check_status()">
                <el-option
                  v-for="item in room_floor"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="f-three">
              <label>房态：</label>
              <el-select v-model="form.status" placeholder="请选择" size="mini" @change="get_check_status()">
                <el-option
                  v-for="item in room_status_dict"
                  :key="item.call"
                  :label="item.describe"
                  :value="item.call">
                </el-option>
              </el-select>
            </div>
            <div class="f-three">
              <label>房型：</label>
              <el-select v-model="form.type" placeholder="请选择" size="mini" @change="get_check_status()">
                <el-option
                  v-for="item in room_type_name"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
            <div class="f-one">
              设备房态信息<label>[{{ room_status.length }}]</label>
              <a @click="get_all_room_status()">全部</a>
            </div>
            <div v-for="(item,index) in color_base" :key="index" class="f-fore">
              <div :style="{ 'background-color': color_base[index] }"></div>{{ index }}
            </div>
            <div class="f-one">
              图例说明
              <a>全部</a>
            </div>
            <div class="f-seven">
              <img src="@/assets/images/ironsteward/cateye.png"/>
              <img src="@/assets/images/ironsteward/RCU.png"/>
              <img src="@/assets/images/ironsteward/door.png"/>
            </div>
            <div class="f-eight">
              <img src="@/assets/images/ironsteward/equipment.png"/>
              <img src="@/assets/images/ironsteward/editroom.png"/>
            </div>
            <div class="f-eight">
              <img style="margin-left: 35px" src="@/assets/images/ironsteward/floorlook.png"/>
              <img style="margin-left: 68px" src="@/assets/images/ironsteward/printroom.png"/>
            </div>
          </el-tab-pane>
          
        </el-tabs>
      </el-aside>
      <!--右侧-->
      <el-main  class="right" >
        <el-tabs type="card">
          <el-tab-pane label="设备房态图">
            <!--设备房态图-->
            <ul >
              <li v-for="(item,index) in room_status" :key="index" class="self_inline_block eqItem color_fff" :style="{'background-color': color_base[item.room_status]}" @click="get_certain_room_status(hotel_id,item.room_number)">
                <div style="margin: 10px 0;">{{ item.room_number }}</div>
                <span class="self_inline_block" >{{ item.room_status }}</span>
              </li>
            </ul>

          </el-tab-pane>
          <!-- <el-tab-pane label="设备/房态对比表">
            <el-table
              :data="tableData"
              size="mini"
              style="width: 100%"
              :header-cell-style="{background:'#68819E',color:'#FFF'}">
              <el-table-column
                label="房间号码">
                <template slot-scope="scope">
                  <span>{{ scope.row.roomnum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="设备房态">
                <template slot-scope="scope">
                  <span>{{ scope.row.equroomtype }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="房态">
                <template slot-scope="scope">
                  <span>{{ scope.row.roomtype }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="不一致预警">
                <template slot-scope="scope">
                  <span>{{ scope.row.inconformity }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="通知预警">
                <template slot-scope="scope">
                  <span>{{ scope.row.informwarn }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="通知次数">
                <template slot-scope="scope">
                  <span>{{ scope.row.informnum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="通知人">
                <template slot-scope="scope">
                  <span>{{ scope.row.inforperson }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注信息">
                <template slot-scope="scope">
                  <span>{{ scope.row.remarkinfo }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="备注">
                <template slot-scope="scope">
                  <span>{{ scope.row.remark }}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <a v-if="!scope.row.isEgdit" style="cursor: pointer"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</a>
                  <a v-if="scope.row.isEgdit" style="cursor: pointer"
                    size="mini"
                    @click="handleSuccessEdit(scope.$index, scope.row)">保存</a>
                  <a
                    size="mini" style="cursor: pointer"
                    @click="handleDelete(scope.$index)">删除</a>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane> -->
        </el-tabs>
      </el-main>

    </el-container>
    <!-- 单个房间的设备详情 -->
    <el-dialog title="设备详情" :visible.sync="dialogVisible" width="30%" >
      <p class="dialogText" v-for="(item,index) in room_certain_status" :key="index"><span class="self_inline_block" style="width: 30%;">{{ item.name }}</span> {{ item.time }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click=" dialogVisible = false ">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: 'ironsteward',
    data(){
      return {
        // 47.98.113.173:8002
        // equipments.crowncrystalhotel.com
        UrLHeader: 'http://equipments.crowncrystalhotel.com/v2/',
        hotel_id: JSON.parse(localStorage.getItem('userInfo')).hotel_id,
        room_num_input :'',//搜索
        activeName2: 'first',
        tableData: [
          {
            roomnum: '8301',
            equroomtype: 'RCU',
            roomtype: '房态',
            inconformity : 'rcu',
            informwarn : 'rcu',
            informnum :'rcu',
            inforperson : 'mr wang',
            remarkinfo : '断线',
            remark : '无'
          }
        ],
        /* 
         房态图信息数据 
         
         */
        // 查询到的所有设备态
        room_status:[],
        // 楼层信息
        room_floor:[],
        // 房态字典
        room_status_dict:[],
        // 房型信息
        room_type_name:[],
        // 单个房间的具体信息
        room_certain_status:[],
        dialogVisible: false,
        // 设备状态颜色数据
        color_base:{
            'cleaning': '#245196',
            'not bother': '#7d2e2a',
            "maintaining": '#f8b37d',
            'dirty' : '#eeeeee',
            "inuse people in" : '#99608c',
            "inuse not in" : '#306a38'
          },
        /* 表单查询房态图 */
        form:{
          floor: '',
          status: '',
          type:''
        }
      }
    },

    mounted (){
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //编辑
      handleEdit(index, row) {
          this.$set(row,'isEgdit',true)
      },
      //删除
      handleDelete(index) {
          this.tableData.splice(index,1)
      },
      //编辑成功
      handleSuccessEdit(index, row) {
          this.$set(row,'isEgdit',false)
      },

      /* 获取设备态图接口 */ 
      get_room_status(){
        let that = this, url = this.UrLHeader+'equipment/ht/room/get_room_status/' ;
          that.$axios.post(url, {"hid":that.hotel_id} ).then(function(res) {
            console.log(res.data)
            // 判断返回数据是否有数据
            if(res.data.message =='success'){ 
               that.room_status  = res.data.data;
    
            }else{ that.$message.error('读取信息失败'); }
          }).catch((error) => { });
      },

      /* 全部 */
      get_all_room_status(){
        this.form = {
          floor: '',
          status: '',
          type:''
        }
        this.get_room_status();
      },
      /* 获取单个设备接口 */ 
      get_certain_room_status(hotel_id,room_num){
        let that = this, url = this.UrLHeader+'equipment/ht/room/get_room_detail_status/' ;
        that.room_certain_status  = [];
        if(room_num){
          that.dialogVisible = true;
          that.$axios.post(url,{"hotel_id":hotel_id,"room_number": room_num}).then(function(res) {
            console.log(res.data)
            // 判断返回数据是否有数据
            if(res.data.message =='success'){ 
               
               that.room_certain_status  = res.data.data.result;
    
            }else{ 
              that.room_certain_status  = [];
              that.$message.error('读取信息失败'); }
          }).catch((error) => { });
        }
          
      },
      /* 获取筛选条件数据 */ 
      get_check(){
        let that = this, url = this.UrLHeader+'equipment/ht/room/get_room_status_parameter/?hotel_id='+that.hotel_id;
          that.$axios.get(url).then(function(res) {
            console.log(res.data)
            // 判断返回数据是否有数据
            if(res.data.message =='success'){
               console.log(res.data);
               that.room_floor  = res.data.data.floor;
               that.room_status_dict  = res.data.data.room_status;
               that.room_type_name  = res.data.data.room_type_name;
    
            }else{ that.$message.error('读取信息失败'); }
          }).catch((error) => { });
      },

      /* 查询指定房态 */ 
      get_check_status(){
        let that = this, url = this.UrLHeader+'equipment/ht/room/get_room_status/?floor='+that.form.floor+'&room_type_name='+that.form.type+'&room_status=' +that.form.status;
          that.$axios.post(url,{"hid":that.hotel_id}).then(function(res) {
            console.log(res.data)
            // 判断返回数据是否有数据
            if(res.data.message =='success'){
              that.room_status  = res.data.data;
            }else{ that.$message.error('读取信息失败'); }
          }).catch((error) => { });
      },
    },
    created(){
      this.get_room_status();
      this.get_check();
    }
  }
</script>
<style lang="less" scoped>
  @left-rgba:rgba(234,237,241,1);
  .self_inline_block{
    display: inline-block;
  }
  .color_fff{
    color: #FFFFFF;
  }
  .dialogText{
    padding: 10px 20px;
    font-size: 18px;
  }
  //图例说明的公共样式
  .common-legend{
    margin-top: 10px;
    margin-left: 30%;
    width: 30px;
    height: 30px;
  }
  .f-style{
    margin-top: 10px;
  }
  .ironsteward{
    width: 100%;
    .left{
      background:@left-rgba;
      #tab-first,#tab-second{
        width: 151px;
        line-height: 32px;
      }
      .f-one{
        width: 100%;height: 30px;background: #EEEEEE;margin-top: 10px;
        color: #777777;line-height: 30px;padding-left: 10px;font-size: small;
        a{
          margin-right: 10px;
          float: right;
        }
      }
      .f-two{
        margin-top: 10px;
        input{
            height: 30px;
        }
        .el-input-group__append, .el-input-group__prepend{
          background-color: #4488E9;
          color: #FFFFFF;
          vertical-align: middle;
          display: table-cell;
          position: relative;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          padding: 0 20px;
          width: 1px;
          white-space: nowrap;
        }
      }
      .f-three{
        margin-top: 15px;
        label{
          font-size: 14px;
        }
        .el-select{
          margin-left: 20px;
          height: 30px;
        }
      }
      .f-fore{
        margin-top: 10px;

        div{
          .common-legend;
          display: inline-block;
          background: RGB(81 199 131);
        }
      }
      .f-five{
        margin-top: 10px;
        div{
          .common-legend;
          background: RGB(58 141 245);
        }
      }
      .f-six{
        margin-top: 10px;
        div{
          .common-legend;
          background: RGB(213 70 108);
        }
      }
      .f-seven{
        margin-top: 10px;
        img{
          margin-left: 15px;
        }
      }
      .f-eight{
        margin-top: 15px;
        img{
          margin-left: 20px;
        }
      }
    }
    .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
      border-top: none;
      border-top: 2px solid #4488E9;
    }
    //右侧导航栏
    .el-main{
      display: block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      -ms-flex-preferred-size: auto;
      flex-basis: auto;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      padding: 0px;
    }
  }

  .eqItem{
    width: 120px;
    height: 120px;
    margin: 1px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
  }

</style>
