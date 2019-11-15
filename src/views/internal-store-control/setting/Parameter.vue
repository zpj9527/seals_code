<template>
  <div class="parameter">
     <header style="margin: 10px">
       <i class="el-icon-setting" style="font-size:30px;"></i>
       <p style="font-size: 18px;display: inline-block;" >参数设置</p>
       <!--<el-button type="primary" size="mini" style="width: 80px;margin-left: 10px" @click="add">新增</el-button>-->
     </header>
    <div class="content ">
      <el-table
        :data="arguments_list"
        size="mini"
        max-height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <el-table-column
          prop="desc"
          label="中文描述">
        </el-table-column>
        <el-table-column
          prop="desc_en"
          label="英文描述">
        </el-table-column>
        <el-table-column
          prop="setting_value"
          label="设置值">
        </el-table-column>
        <el-table-column
          prop="default_value"
          label="缺损值">
        </el-table-column>
        <el-table-column
          prop="is_halt"
          label="停用">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="modify_time"
          width="150"
          label="修改时间">
        </el-table-column>
        <el-table-column
          prop="modify_user"
          label="修改用户">
        </el-table-column>

        <el-table-column
          prop="address"
          width="180 "
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini"
                       @click="amend(scope.row,scope.row.id,scope.$index, arguments_list) "
                       >修改
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
    <!--点击新增修改显示的页面-->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name">{{ title }}</span>
      </div>
      <ul class="dialog_style">
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>中文描述 ：</span>
          <el-input v-model="desc" placeholder="请输入中文描述" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>英文描述 ：</span>
          <el-input v-model="desc_en" placeholder="请输入英文描述" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>设置值 ：</span>
          <el-radio v-model="set_value" label="T">是</el-radio>
          <el-radio v-model="set_value" label="F">否</el-radio>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>停用 ：</span>
          <el-radio v-model="is_halt" label="T">是</el-radio>
          <el-radio v-model="is_halt" label="F">否</el-radio>

        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>备注 ：</span>
          <el-input v-model="remark" placeholder="请输入缺损值" style="width: 200px;" size="mini"></el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "parameter",
      data(){
         return{
           url: this.api.api_9022_9519,
           arguments_list:[],//参数list
           pagesize:10,
           total:10,
           dialogVisible:false,
           Edite:true, //标志位 判断的是新增还是更新
         //  新增内容
           param:{},
           title:'',
           set_value:'',//设置值
          // defect_value:'',//缺损值
           desc:'',//中文描述
           desc_en:'',//英文描述
           is_halt:'',
           remark:'',//备注
           parameter_id:'',//修改点击的id
           cur_page:1,

         }
      },
      created(){
          let that =this;
          that.parameter_list()
      },
      methods:{
          //新增参数
        /**获取所有的参数*/
        parameter_list(){
           let that =this;
          that.$axios({
            url:that.url+"/v1/common/parameter/info_list",
             method:"get",
            params:{
              page_size:10,
              page_num:that.cur_page,
              owner:"（内控宝）"
            }
           })
             .then(res=>{
               console.log(res);
               if(res.data.message==="success"){
                 that.arguments_list = res.data.data.list;
                 that.total = res.data.data.total_count;
               }
             })
             .catch(err=>{
               console.log(err)
             })
        },
        /**修改参数*/
        amend(srow,id,index,list){
          let that =this;
          // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
          let root_level = parseInt(sessionStorage.getItem("root_level"));
          if(root_level!==0){
            that.dialogVisible = true;
            that.title="修改参数"
            that.desc=srow.desc;
            that.desc_en=srow.desc_en;
            that.set_value=srow.setting_value;//设置值
            that.remark = srow.remark;
            that.is_halt = srow.is_halt;
            that.parameter_id =id;
            console.log(srow);
          }else {
            that.hintInfo("warning","权限不足");
          }
        },
        /**x修改后的确定*/
        ensure(){
          let that =this;
          that.$axios({
            url:that.url+"/v1/common/parameter/update/"+that.parameter_id,
            method:"post",
            data:{
              desc:that.desc,
              desc_en:that.desc_en,
              setting_value:that.set_value,//设置值
              remark:that.remark ,
              is_halt:that.is_halt,
            }
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                that.hintInfo("success","修改成功");
                that.dialogVisible=false;
               that.parameter_list();
              }
            })
            .catch(err=>{
              console.log(err)
            })
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          console.log(curPage);
          let that =this;
          that.cur_page = curPage;
          that.$axios({
            url:that.url+"/v1/common/parameter/info_list",
            method:"get",
            params:{
              page_size:10,
              page_num:curPage,
              owner:"（内控宝）"
            }
          })
            .then(res=>{
              console.log(res);
              if(res.data.message==="success"){
                that.arguments_list = res.data.data.list;
                that.total = res.data.data.total_count;
              }
            })
            .catch(err=>{
              console.log(err)
            })
        },
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
      },
    }
</script>

<style lang="less"  scoped>
  .parameter{
    width: 99%;
    margin-left: 10px;
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
