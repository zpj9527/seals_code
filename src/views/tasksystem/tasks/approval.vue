<template>
  <div class="approval">
    <header style="margin: 10px">
      <!--<p style="font-size: 16px;display: inline-block;" >审批</p>-->
      <!--<el-button type="primary" size="mini" style="width: 80px;margin-left: 10px" @click="add">新增</el-button>-->
    </header>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="调价" name="first">
        <ul class="cephalosome">
          <li>
            <span>起始日期：</span>
            <el-date-picker
              v-model="value1"
              size="mini"
             style="width: 150px;"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>终止日期：</span>
            <el-date-picker
              v-model="value1"
              type="date"
              size="mini"
              style="width: 150px;"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>发起人：</span>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 150px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="content ">
          <el-table
            :data="arguments_list"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;">
            <el-table-column
              prop="descript"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="code"
              label="发起人">
            </el-table-column>
            <el-table-column
              prop="code"
              label="审核人">
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="结果">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc "
              label="备注">
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="create_datetime"
              width="150"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
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
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)"
                           v-if="scope.row.is_sys === 1" disabled>删除
                </el-button>
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)" v-else>删除
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) "
                           v-if="scope.row.is_sys === 1" disabled>修改
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) " v-else>修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;margin-right: 2%"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="销售单" name="second">
        <ul class="cephalosome">
          <li>
            <span>起始日期：</span>
            <el-date-picker
              v-model="value1"
              size="mini"
              style="width: 150px;"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>终止日期：</span>
            <el-date-picker
              v-model="value1"
              type="date"
              size="mini"
              style="width: 150px;"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>发起人：</span>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 150px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="content ">
          <el-table
            :data="arguments_list"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;">
            <el-table-column
              prop="descript"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="code"
              label="发起人">
            </el-table-column>
            <el-table-column
              prop="code"
              label="审核人">
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="结果">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc "
              label="备注">
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="create_datetime"
              width="150"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
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
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)"
                           v-if="scope.row.is_sys === 1" disabled>删除
                </el-button>
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)" v-else>删除
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) "
                           v-if="scope.row.is_sys === 1" disabled>修改
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) " v-else>修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;margin-right: 2%"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="采购" name="third">
        <ul class="cephalosome">
          <li>
            <span>起始日期：</span>
            <el-date-picker
              v-model="value1"
              size="mini"
              style="width: 150px;"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>终止日期：</span>
            <el-date-picker
              v-model="value1"
              type="date"
              size="mini"
              style="width: 150px;"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>发起人：</span>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 150px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="content ">
          <el-table
            :data="arguments_list"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;">
            <el-table-column
              prop="descript"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="code"
              label="发起人">
            </el-table-column>
            <el-table-column
              prop="code"
              label="审核人">
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="结果">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc "
              label="备注">
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="create_datetime"
              width="150"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
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
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)"
                           v-if="scope.row.is_sys === 1" disabled>删除
                </el-button>
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)" v-else>删除
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) "
                           v-if="scope.row.is_sys === 1" disabled>修改
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) " v-else>修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;margin-right: 2%"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="人事" name="fourth">
        <ul class="cephalosome">
          <li>
            <span>起始日期：</span>
            <el-date-picker
              v-model="value1"
              size="mini"
              style="width: 150px;"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>终止日期：</span>
            <el-date-picker
              v-model="value1"
              type="date"
              size="mini"
              style="width: 150px;"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>发起人：</span>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 150px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="content ">
          <el-table
            :data="arguments_list"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;">
            <el-table-column
              prop="descript"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="code"
              label="发起人">
            </el-table-column>
            <el-table-column
              prop="code"
              label="审核人">
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="结果">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc "
              label="备注">
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="create_datetime"
              width="150"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
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
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)"
                           v-if="scope.row.is_sys === 1" disabled>删除
                </el-button>
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)" v-else>删除
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) "
                           v-if="scope.row.is_sys === 1" disabled>修改
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) " v-else>修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;margin-right: 2%"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="报销" name="reimburse">
        <ul class="cephalosome">
          <li>
            <span>起始日期：</span>
            <el-date-picker
              v-model="value1"
              size="mini"
              style="width: 150px;"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>终止日期：</span>
            <el-date-picker
              v-model="value1"
              type="date"
              size="mini"
              style="width: 150px;"
              placeholder="选择日期">
            </el-date-picker>
          </li>
          <li>
            <span>发起人：</span>
            <el-select v-model="value" placeholder="请选择" size="mini" style="width: 150px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
        </ul>
        <div class="content ">
          <el-table
            :data="arguments_list"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;">
            <el-table-column
              prop="descript"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="code"
              label="发起人">
            </el-table-column>
            <el-table-column
              prop="code"
              label="审核人">
            </el-table-column>
            <el-table-column
              prop="is_sys"
              label="结果">
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc "
              label="备注">
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建者">
            </el-table-column>
            <el-table-column
              prop="create_datetime"
              width="150"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
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
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)"
                           v-if="scope.row.is_sys === 1" disabled>删除
                </el-button>
                <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, mission_list)" v-else>删除
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) "
                           v-if="scope.row.is_sys === 1" disabled>修改
                </el-button>
                <el-button size="mini"
                           @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, mission_list) " v-else>修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;margin-right: 2%"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

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
          <el-input v-model="param.desc" placeholder="请输入中文描述" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>英文描述 ：</span>
          <el-input v-model="param.desc_en" placeholder="请输入英文描述" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>设置值 ：</span>
          <el-input v-model="param.set_value" placeholder="请输入设置值" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>缺损值 ：</span>
          <el-input v-model="param.defect_value" placeholder="请输入缺损值" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>系统码 ：</span>
          <el-radio v-model="is_sys" label="1">是</el-radio>
          <el-radio v-model="is_sys" label="0">否</el-radio>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>集团码 ：</span>
          <el-radio v-model="is_group" label="1">是</el-radio>
          <el-radio v-model="is_group" label="0">否</el-radio>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>停用 ：</span>
          <el-radio v-model="is_halt" label="1">是</el-radio>
          <el-radio v-model="is_halt" label="0">否</el-radio>

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
        name: "approval",
      data(){
        return{
          activeName: 'first',
          arguments_list:[],//参数list
          pagesize:10,
          total:10,
          dialogVisible:false,
          Edite:true, //标志位 判断的是新增还是更新
          //  新增内容
          param:{},
          title:'',
          set_value:'',//设置值
          defect_value:'',//缺损值
          desc:'',//中文描述
          desc_en:'',//英文描述
          is_sys:'',
          is_halt:'',
          is_group:'',
         /**调价的筛选*/
         value1:'',
         value:'',
          options:[
            {
            label:"张三",
             value:1
           }
         ]
        }
      },
      methods:{
        //刷新数据
        flush(){
          let that = this;
          //第一件事    将标志位改为false
          that.Edite = false;
          that.param = {
            desc: '',//中文描述
            desc_en: '',//英文描述
            set_value:'',//设置值
            defect_value:'',//缺损值
          };
          that.is_sys = '1';//是否系统码
          that.is_group = "1";//是否集团码
          that.is_halt = '0';//是否停用
        },
        //新增参数
        add(){
          let that =this;
          that.dialogVisible = true;
          that.title="新增参数设置"
          that.flush();
        },
        //标签的选择
        handleClick(tab, event) {
          console.log(tab, event);
        },
        //点击分页上的页数
        handleCurrentChange(curPage) {
          console.log(curPage);
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
  .approval{
    width: 96%;
    height: 98%;
    background: white;
    margin-left: 10px;
    .cephalosome{
      overflow: hidden;
      margin-bottom: 10px;
      li{
        float: left;
        margin-left: 10px;
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
