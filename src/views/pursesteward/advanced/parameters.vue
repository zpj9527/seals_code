<template>
  <div class="parameters">
    <header style="margin: 10px">
      <i class="el-icon-setting" style="font-size:30px;"></i>
      <p style="font-size: 18px;display: inline-block;vertical-align: top" >参数设置</p>
      <!--<el-button type="primary" size="mini" style="width: 80px;margin-left: 10px" @click="add">新增</el-button>-->
    </header>
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
          <span>中文描述 ：</span>
          <el-input v-model="desc" placeholder="请输入中文描述" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <span>英文描述 ：</span>
          <el-input v-model="desc_en" placeholder="请输入英文描述" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <span>设置值 ：</span>
          <el-radio v-model="set_value" label="T">是</el-radio>
          <el-radio v-model="set_value" label="F">否</el-radio>
        </li>
        <li>
          <span>停用 ：</span>
          <el-radio v-model="is_halt" label="T">是</el-radio>
          <el-radio v-model="is_halt" label="F">否</el-radio>

        </li>
        <li>
          <span>备注 ：</span>
          <el-input v-model="remark" placeholder="请输入缺损值" style="width: 200px;" size="mini"></el-input>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
    </el-dialog>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="AR账务Q-1（钱管家）" name="first">
        <div class="content ">
          <el-table
            :data="arguments_list"
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;">
            <el-table-column
              prop="desc"
              width="300"
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
      </el-tab-pane>
      <el-tab-pane label="扫码支付Q-2(钱管家）" name="third">
        <div class="content ">
          <el-table
            :data="arguments_code"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;overflow-y: scroll">
            <el-table-column
              prop="desc"
              width="300"
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
                           @click="amend_code(scope.row,scope.row.id,scope.$index, arguments_code) "
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
                         :total="total_code">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账单Q-3（钱管家）" name="fourth">
        <div class="content ">
          <el-table
            :data="arguments_bill"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;overflow-y: scroll">
            <el-table-column
              prop="desc"
              width="300"
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
                           @click="amend_bill(scope.row,scope.row.id,scope.$index, arguments_bill) "
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
                         :total="total_bill">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
  export default {
    name: "parameters",
    data(){
      return{
        url: this.api.api_9022_9519,
        arguments_list:[],//参数list
        arguments_code:[],//扫码list
        arguments_bii:[],
        total_bill: 10,
        total_code:10,
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
        activeName:'first',
        button_text:'first',//点击的哪个标签
      }
    },
    created(){
      let that =this;
      that.parameter_list()
    },
    methods:{
      //新增参数
      /**获取z账务所有的参数*/
      parameter_list(){
        let that =this;
        that.$axios({
          url:that.url+"/v1/common/parameter/info_list",
          method:"get",
          params:{
            page_size:10,
            page_num:that.cur_page,
            owner:"AR账务Q-1（钱管家）"
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
      /**获取z扫码所有的参数*/
      parameter_code(){
        let that =this;
        that.$axios({
          url:that.url+"/v1/common/parameter/info_list",
          method:"get",
          params:{
            page_size:10,
            page_num:that.cur_page,
            owner:"扫码支付Q-2(钱管家）"
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
              that.arguments_code = res.data.data.list;
              that.total_code = res.data.data.total_count;
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      /**获取账单所有的参数*/
      parameter_bill(){
        let that =this;
        that.$axios({
          url:that.url+"/v1/common/parameter/info_list",
          method:"get",
          params:{
            page_size:10,
            page_num:that.cur_page,
            owner:"账单Q-3（钱管家）"
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
              that.arguments_bill = res.data.data.list;
              that.total_bill = res.data.data.total_count;
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      /**账务修改参数*/
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
      /**扫码支付修改*/
      amend_code(srow,id,index,list){
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
      /**扫码支付修改*/
      amend_bill(srow,id,index,list){
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
              if(that.button_text==="first"){
                that.parameter_list();
              }else  if(that.button_text==="third"){
                that.parameter_code();
              } if(that.button_text==="fourth"){
                that.parameter_bill();
              }

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
        let name='';
        if(that.button_text==="first"){
          name="AR账务Q-1（钱管家）"
        }else  if(that.button_text==="third"){
          name="扫码支付Q-2(钱管家）"
        } if(that.button_text==="fourth"){
          name="账单Q-3（钱管家）"
        }
        that.cur_page = curPage;
        that.$axios({
          url:that.url+"/v1/common/parameter/info_list",
          method:"get",
          params:{
            page_size:10,
            page_num:curPage,
            owner:name
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
              if(that.button_text==="first"){
                that.arguments_list = res.data.data.list;
                that.total = res.data.data.total_count;
              }else  if(that.button_text==="third"){
                that.arguments_code = res.data.data.list;
                that.total_code = res.data.data.total_count;
              } if(that.button_text==="fourth"){
                that.arguments_bill = res.data.data.list;
                that.total_bill = res.data.data.total_count;
              }
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
      /**标签事件*/
      handleClick(tab, event){
        let that =this;
        that.cur_page=1;
        console.log(tab, event);
        that.button_text=tab.name
        if(tab.name==="first"){
         that.parameter_list();
        }else if(tab.name==="third"){
          that.parameter_code();
        }else if(tab.name==="fourth"){
          that. parameter_bill();
        }
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
  .parameters{
    width: 96%;
    height: 98%;
    background: white;
    padding-left: 10px;
    padding-top: 10px;
    .content{
      height: 90%;
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
