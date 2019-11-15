<template>
  <div class="self-set">
    <div class="title" >
      <h3 style="padding: 10px;display: inline-block">设置</h3>
        <el-button size="mini"  type="primary" style="width: 80px;" @click="add">新增</el-button>
    </div>
    <div class="status" style="margin-top: 10px">
      <el-table
        :data="self_help_list"
        size="mini"
        max-height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
      >
        <el-table-column
          prop="machine_name"
          fixed="left"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="machine_uuid"
          width="130"
          label="自助机uid">
        </el-table-column>
        <el-table-column
          prop="machine_type_des"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="oper_system_dec"
          label="操作系统">
        </el-table-column>
        <el-table-column
          prop="system_version"
          label="系统版本">
        </el-table-column>
        <el-table-column
          prop="code_version"
          label="代码版本">
        </el-table-column>
        <el-table-column
          prop="expire_data"
          width="150"
          label="自助机到期时间">
        </el-table-column>
        <el-table-column
          prop="environmental_state_dec"
          label="环境">
        </el-table-column>
        <el-table-column
          prop="pms_type_dec"
          label="pms接口类型">
        </el-table-column>
        <el-table-column
          prop="location"
          label="自助机位置描述">
        </el-table-column>
        <el-table-column
          prop="mac_uuid"
          width="130"
          label="mac地址1">
        </el-table-column>
        <el-table-column
          prop="mac_uuid_two"
          label="mac地址2">
        </el-table-column>
        <el-table-column
          prop="event_time"
          width="150"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button  @click="cancel(scope.row.id,scope.$index, self_help_list)"
                        type="danger" size="mini" data-code="/v1/common/employee/remove">删除
            </el-button>
            <el-button  size="small"
                        @click="submit(scope.row,scope.row.id,scope.$index, self_help_list)"
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
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>自助机名称：</span>
          <el-input v-model="machine_name" placeholder="请输入内容" size="mini" style="width: 300px"></el-input>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>自助机uid：</span>
          <el-input v-model="machine_uuid" placeholder="请输入内容" size="mini" style="width: 300px"></el-input>
        </li>
        <li>
          <span><i style="color: red;font-size: 18px;margin-right: 10px">*</i>自助机类型：</span>
          <el-select v-model="machine_type" placeholder="请选择" size="mini" style="width: 300px;">
            <el-option
              v-for="item in machine_type_list"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>

        <li>
          <span>mac地址1：</span>
          <el-input v-model="mac_uuid" placeholder="请输入内容" size="mini" style="width: 300px"></el-input>
        </li>
        <li>
          <span>mac地址2：</span>
          <el-input v-model="mac_uuid_two" placeholder="请输入内容" size="mini" style="width: 300px"></el-input>
        </li>
        <li>
          <span>系统版本：</span>
          <el-input v-model="system_version" placeholder="请输入内容" size="mini" style="width: 300px"></el-input>
        </li>
        <li>
          <span>代码版本：</span>
          <el-input v-model="code_version" placeholder="请输入内容" size="mini" style="width: 300px"></el-input>
        </li>
        <li>
          <span>自助机到期时间：</span>
          <el-date-picker
            v-model="expire_data"
            type="datetime"
            size="mini"
            style="width: 300px;"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </li>
        <li>
          <span>操作系统类型：</span>
          <el-radio v-model="oper_system" label="1">Android</el-radio>
          <el-radio v-model="oper_system" label="2">Windows</el-radio>
        </li>
        <li>
          <span>环境：</span>
          <el-radio v-model="environmental_state" label="1">正式</el-radio>
          <el-radio v-model="environmental_state" label="2">测试</el-radio>
        </li>
        <li>
          <span>PMS接口类型：</span>
          <el-select v-model="pms_type" placeholder="请选择" @focus="paramtype_data" style="width: 300px;" size="mini">
            <el-option
              v-for="item in paramtype_list"
              :key="item.value"
              :label="item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          <span style="vertical-align: top">自助机位置描述：</span>
          <el-input
            type="textarea" :rows="2" placeholder="请输入内容" v-model="location" style="width: 300px;">
          </el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="" size="mini" @click="ascertain">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "self-set",
      data() {
        return {
          url: "http://192.168.2.165:9006",
          title: '',
          Edite: true, //标志位 判断的是新增还是更新
          //分页
          total: 10,
          pagesize: 10,
          cur_page: 1,
          //自助机类型
          machine_type_list:[
            {
              label:"台式机",
              value:1
            },
            {
              label:"立式机",
              value:2
            },
            {
              label:"壁挂式",
              value:3
            },
            {
              label:"认证验证机",
              value:4
            }
          ],
          /**获取数据*/
          self_help_list:[],//自助机设置列表
          dialogVisible:false,//新增和修改展示的页面
          //新增/修改
          machine_name:'',//自助机名称
          machine_uuid:'',//自助机uid -唯一
          mac_uuid:'',//	mac地址
          mac_uuid_two:'',//	mac地址2
          system_version:'',//	系统版本
          code_version:'',//	代码版本
          location:'',//	自助机位置描述
          pms_type:'',//	pms接口类型
          machine_type:'',//自助机类型
          oper_system:'1',//操作系统类型
          expire_data:'',//自助机到期时间
          environmental_state:'1',//	环境
          paramtype_list:[],//所有接口类型
          id:''//修改点击的id
        }
      },
      created: function () {
        let that =this;
        that.self_help();//获取自助机设置列表
      },
      methods: {
       /**刷新数据*/
        flush(){
            let that = this;
            //第一件事    将标志位改为false
            that.Edite = false;
            that.machine_name='',//自助机名称
            that.machine_uuid='',//自助机uid -唯一
            that.mac_uuid='',//	mac地址
            that.mac_uuid_two='',//	mac地址2
            that.system_version='',//	系统版本
             that.code_version='',//	代码版本
            that.location='',//	自助机位置描述
            that.pms_type='';//	pms接口类型
            that.machine_type='';//自助机类型
            that.oper_system='1';//操作系统类型
            that.expire_data='';//自助机到期时间
            that.environmental_state='1';//	环境
          },
        /**获取pms接口类型*/
        paramtype_data(){
            let that =this;
            that.$axios({
              url:that.url+"/v1/manager_front/get_paramtype_list/?type=1",
              method:"get",
              params:{
                page_size:999
              }
            })
              .then(res=>{
                if(res.data.message==="success"){
                  that.paramtype_list = res.data.data.results;
                }
              })
              .catch(err=>{
                console.log(err);
              })
         },
       /**获取自助机设置列表*/
        self_help(){
           let that =this;
           that.$axios({
             url:that.url+"/v1/manager_back/get_main_list/",
             method:"get",
           })
             .then(res=>{

               if(res.data.message= "success"){
                 console.log(res);
                 that.self_help_list = res.data.data.results;
                 that.total = res.data.data.count;
               }
             })
             .catch(err=>{
               console.log(err);
             })
          },
        /**新增*/
        add(){
            let that = this;
            that. flush();
            that.dialogVisible = true;
            that.title="新增设置"
          },
        /**新增修改后的确定*/
        ascertain(){
          let that =this;
          if(that.machine_name==="" || that.machine_uuid==="" ||that.machine_type===""){
            that.hintInfo("warning", "*为必填项")
          }else {
            let urldata = that.Edite ? (that.url+"/v1/manager_back/update_main/" + that.id+"/") : ( that.url+"/v1/manager_back/add_main/");
            that.$axios({
              url:urldata,
              method:"post",
              data:{
                machine_name:that.machine_name,//自助机名称
                machine_uuid:that.machine_uuid,//自助机uid -唯一
                machine_type:that.machine_type,//自助机类型
                mac_uuid:that.mac_uuid,//mac地址1
                mac_uuid_two:that.mac_uuid_two,//mac地址2
                oper_system:that.oper_system,//操作系统类型
                system_version:that.system_version,//系统版本
                code_version:that.code_version,//代码版本
                expire_data:that.expire_data,//自助机到期时间
                environmental_state:that.environmental_state,//环境
                pms_type:that.pms_type,//pms接口类型
                location:that.location//自助机位置描述
              }
            })
              .then(res=>{
                console.log(res);
                if(res.data.message==="success"){
                  that.dialogVisible = false;
                  that.self_help();//获取自助机设置列表
                  if(that.Edite){
                    that.hintInfo("success", "修改成功")
                  }else {
                    that.hintInfo("success", "新增成功")
                  }
                }else {
                    that.hintInfo("warning", res.data.message)

                }
              })
              .catch(err=>{
                console.log(err);
              })
          }
        },
        /**s删除*/
        cancel(id,index,list){
          let that =this;
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            list.splice(index, 1);
            that.$axios({
              url:  that.url + "/v1/manager_back/remove_main/" + id+"/",
              method: "post",
            })
              .then(res => {
                console.log(res)
                if (res.data.message === "success") {
                  that.self_help();//获取自助机设置列表
                  that.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }

              })
              .catch(error => {
                console.log(error);
              })
          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
        /**修改*/
        submit(row,id,index,list){
          let that = this;
          that.dialogVisible = true;
          that.paramtype_data();//pms接口类型
          that.Edite = true;
          that.title="新增设置";
           that.machine_name=row. machine_name;//自助机名称
            that.machine_uuid= row.machine_uuid;//自助机uid -唯一
            that.machine_type=row.machine_type;//自助机类型
            that.mac_uuid=row.mac_uuid;//mac地址1
            that.mac_uuid_two=row.mac_uuid_two;//mac地址2
            that.oper_system=row.oper_system+"";//操作系统类型
            that.system_version=row.system_version;//系统版本
            that.code_version=row.code_version;//代码版本
            that.expire_data=row.expire_data;//自助机到期时间
            that.environmental_state=row.environmental_state+"";//环境
            that.pms_type=row.pms_type;//pms接口类型
            that.location=row.location;//自助机位置描述
            that.id =id;
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {

        },
        /**dilog*/
        //修改页面的显示和隐藏
        handleClose(done) {
          done();
        },
        /**
         * @hintInfo 操作提示信息
         * @param hint  成功提示
         * @param info 警告信息
         */
        hintInfo: function (hint, info) {
          let that = this;
          if (hint === "success") {
            that.$message({
              message: info,
              type: 'success'
            });
          } else if (hint === "warning") {
            that.$message({
              message: info,
              type: 'warning'
            });
          } else {
            this.$message.error('出错了！');
          }
        },
      }
    }
</script>

<style scoped lang="less">
  .self-set{
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
