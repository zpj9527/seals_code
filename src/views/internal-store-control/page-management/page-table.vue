<template>
  <div class="page-table">
    <!--支付方式 -->
    <div class="shopping">
      <span
        style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold;cursor: pointer;"
        title="查看所有页面设置" @click="page_list">页面设置</span>
      <!--<el-button type="text" @click="page_add();flush()">-->
      <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
      <!--</el-button>-->
      <button @click="page_add();flush()"
              style=" width: 80px;height: 24px;line-height: 24px;background: #4488e9;border:none;border-radius: 3px;color:white ;margin-top: 16px">
        新增
      </button>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          width="100%">
          <el-table-column
            prop="name"
            label="页面名称">
          </el-table-column>
          <el-table-column
            prop="rule_groups"
            label="关联操作组">
            <template slot-scope="scope">
              <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.rule_groups}}
              </el-tag>
            </template>
          </el-table-column>
          <!--关联权限组-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="所关联的权限组 : ">
                  <span>{{ props.row.rule_groups }},</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            prop="url"
            label="页面地址">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="说明">
          </el-table-column>
          <el-table-column
            prop="address"
            width="240 "
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)" disabled>删除
              </el-button>
              <el-button size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
              </el-button>
              <el-button size="small" @click="compile(scope.row,scope.row.id,scope.$index, income_list)">编辑操作
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
      <!--点击新增修改显示的页面-->
      <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>页面名称 ：</span>
            <el-input v-model="param.name" placeholder="请输入页面名称" style="width: 280px;" size="mini"></el-input>
          </li>

          <li v-if="page_true">
            <i style="color: red;font-size: 18px">*</i>
            <span>页面地址 ：</span>
            <el-input v-model="param.url" placeholder="请输入页面地址" style="width: 280px;" size="mini"></el-input>
          </li>
          <li v-else>
            <i style="color: red;font-size: 18px">*</i>
            <span>页面地址 ：</span>
            <el-input v-model="param.url" placeholder="请输入页面地址" style="width: 280px;" disabled size="mini"></el-input>
          </li>
          <li v-if="page_true">
            <i style="color: red;font-size: 18px">*</i>
            <span>APP ：</span>
            <el-select v-model="department_hotel " placeholder="请选择模块" style="width: 280px" clearable size="mini">
              <el-option
                v-for="item in hotel_list"
                :key="item.value"
                :label="item.name"
                value-key="id"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </li>
          <li v-else>
            <i style="color: red;font-size: 18px">*</i>
            <span>APP ：</span>
            <el-select v-model="department_hotel " placeholder="请选择模块" style="width: 280px" disabled clearable
                       size="mini">
              <el-option
                v-for="item in hotel_list"
                :key="item.value"
                :label="item.name"
                value-key="id"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span style="vertical-align: top;">说明 ：</span>
            <textarea style="width: 280px; height: 100px;resize: none;border: 1px solid #dcdfe6;border-radius: 4px"
                      v-model="param.desc "></textarea>
          </li>

        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
      </el-dialog>
      <!--编辑权限出现的页面-->
      <!--<el-dialog-->
      <!--title="编辑权限"-->
      <!--:visible.sync="dialogVisibleurl"-->
      <!--width="60%"-->
      <!--style="overflow: hidden"-->
      <!--:before-close="handleClose" class="dialog-style" >-->
      <!--&lt;!&ndash;<span style="display: inline-block;width: 290px;">可选择的url</span>&ndash;&gt;-->
      <!--<p style="display: inline-block;width: 228px;margin-bottom: 10px">编辑页面权限名称 ：<span style="color:#4488e9">{{authority}}</span></p>-->
      <!--<ul style="overflow: hidden">-->
      <!--<el-transfer-->
      <!--v-model="checkedNames"-->
      <!--style="float: left;"-->
      <!--:props="{key: 'id',label: 'name'}"-->
      <!--:titles="['页面未有权限组', '页面已添加权限组']"-->
      <!--@change="handleChange"-->
      <!--:data="bind_list"-->
      <!--&gt;</el-transfer>-->

      <!--</ul>-->

      <!--<span slot="footer" class="dialog-footer">-->
      <!--<el-button @click="dialogVisibleurl = false ;">取 消</el-button>-->
      <!--<el-button type="primary" @click="dialogVisibleurl = false; saveInfo_url()">确 定</el-button>-->
      <!--</span>-->
      <!--</el-dialog>-->
      <el-dialog
        :visible.sync="dialogVisibleurl"
        :close-on-click-modal='false'
        width="55%"
        :before-close="handleClose" class="dialog-style">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name">为 <span style="color: #4488E9">{{authority}}</span> {{ title }}</span>
        </div>
        <!--<p style="display: inline-block;width: 228px;margin-bottom: 10px">编辑页面权限名称 ：<span style="color:#4488e9">{{authority}}</span></p>-->
        <div>
          <el-input v-model="permission_name" placeholder="请输入操作组名称" size="mini" style="width: 230px;"></el-input>
          <el-button type="primary" size="mini" @click="permission">查询</el-button>
        </div>

        <ul style="overflow: hidden">
          <el-transfer
            v-model="checkedNames"
            style="float: left"
            :props="{key: 'id',label: 'name'}"
            :titles="['页面未有操作组', '页面已添加操作组']"
            @change="handleChange"
            :data="bind_list"
          ></el-transfer>

        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleurl = false ;" size="mini">取 消</el-button>
          <el-button type="primary" @click=" saveInfo_url()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="foot">
      <p><span style="cursor: pointer;" title="查看页面所有操作" @click="all_list">页面操作</span>
        <button @click="rower_item();flush()"
                style=" width: 80px;height: 24px;line-height: 24px;background: #4488e9;border:none;border-radius: 3px;color:white;margin-left: 10px ;">
          新增操作
        </button>
        <!--<button  @click="all_list"  style=" width: 80px;height: 24px;line-height: 24px;background: #4488e9;border:none;border-radius: 3px;color:white;margin-left: 10px ;" >全部操作</button>-->

      </p>
      <div class="left">
        <div class="moduleTree"
             style="background: rgb(104, 129, 158);height: 34px;line-height: 34px;padding-left: 10px;color: white">页面操作组
        </div>
        <div class="content">
          <div class="control">
            <el-tree
              :data="permission_group"
              node-key="node.id"
              :expand-on-click-node="false"
              node-contextmenu
              @node-click="nodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="position: absolute;right: 20px">
                      <i class="el-icon-edit" style="margin-right: 10px " @click="() => amend_page(node, data)"
                         title="修改操作组"></i>
                      <i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 10px "
                         title="删除操作组"></i>
                      <!--<i class="el-icon-setting" @click="() => redact(data)" style="margin-right: 10px " title="绑定权限"></i>-->
                    </span>
                 </span>
            </el-tree>
            <!--<p @click="append();dialogVisible_role=true" style="font-size: 16px">新增权限组</p>-->
            <p @click="append();"
               style="margin-top: 10px;padding-left: 100px ; font-size: 16px;background: white ;border: 1px solid #eeeeee;color: #4488E9;padding: 5px 60px;line-height: 30px">
              <span style="font-size:18px;margin-right: 6px">+</span>新增页面操作组</p>
          </div>
        </div>
      </div>
      <div class="right">
        <!--列表-->
        <el-table
          :data="rulelists"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center',}"
          style="width:100%;height: 80%"
          size="mini"
          stripe>
          <el-table-column
            prop="name"
            fixed
            label="操作名称">
          </el-table-column>
          <el-table-column
            prop="rule_group.name"
            label="页面操作组">
          </el-table-column>

          <el-table-column
            prop="desc"
            width="190"
            label="中文备注">
          </el-table-column>
          <el-table-column
            prop="desc_en"
            label="英文备注">
          </el-table-column>
          <el-table-column
            prop="page_id.desc"
            label="关联页面">
          </el-table-column>
          <el-table-column
            width="240"
            prop="address"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button @click="cance(scope.row.id,scope.$index, rulelists)" type="danger" size="mini">删除</el-button>
              <el-button size="small" @click="revision(scope.row,scope.row.id,scope.$index, rulelists)">修改</el-button>
              <el-button size="small" @click="compile_api(scope.row,scope.row.id,scope.$index, rulelists)">编辑API
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页-->
        <el-pagination style="float: right;"
                       layout="prev, pager, next"
                       :page-size="page_size"
                       @current-change="permissionPage"
                       :total="power_total">
        </el-pagination>
        <!--新增权限出现的页面-->
        <el-dialog
          :visible.sync="dialogVisible_rower"
          :close-on-click-modal='false'
          width="30%"
          :before-close="handleClose" class="dialog-style">
          <div slot="title" class="dialog_style_header-title">
            <span class="dialog_style_title-name"> {{ title }}</span>
          </div>
          <ul class="mask_information">
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>操作名称 ：</span>
              <el-input v-model="param.name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>操作组 ：</span>
              <el-select v-model="rule_groups" placeholder="请选择" size="mini" style="width: 217px;">
                <el-option
                  v-for="item in permission_group"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>代码 ：</span>
              <el-input v-model="param.code " placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <!--<li style="width: 400px;">-->
            <!--<i style="color: red;font-size: 18px">*</i>-->
            <!--<span>状态：</span>-->
            <!--<el-radio v-model="normal" label="1">正常</el-radio>-->
            <!--<el-radio v-model="normal" label="0">停用</el-radio>-->
            <!--</li>-->
            <li>
              <span style="margin-left: 10px">中文备注 ：</span>
              <el-input v-model="param.desc" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
            </li>
            <li>
              <span style="margin-left: 10px">英文备注 ：</span>
              <el-input v-model="param.desc_en" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_rower = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" saveInfo_rower()" size="mini">确 定</el-button>
        </span>
        </el-dialog>
        <!--修改权限-->
        <el-dialog
          :visible.sync="revamp_rower"
          :close-on-click-modal='false'
          width="30%"
          :before-close="handleClose" class="dialog-style">
          <div slot="title" class="dialog_style_header-title">
            <span class="dialog_style_title-name"> {{ title }}</span>
          </div>
          <ul class="mask_information">
            <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>权限名称</span>
              <el-input v-model="permission_monicker" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>权限组</span>
              <el-select v-model="rule_groups" placeholder="请选择" size="mini" style="width: 217px;">
                <el-option
                  v-for="item in permission_group"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>

            <li>
              <span style="margin-left: 10px">中文备注</span>
              <el-input v-model="chinese_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <span style="margin-left: 10px">英文备注</span>
              <el-input v-model="english_name" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
            </li>
            <li>
              <span style="margin-left: 10px">关联页面</span>
              <el-input v-model=" associated" style="width: 217px;" :disabled="true" placeholder="请输入内容"
                        size="mini"></el-input>
            </li>
            <!--<li>-->
            <!--<span style="margin-left: 10px">状态</span>-->
            <!--<el-radio v-model="status_bar" label="1">可用</el-radio>-->
            <!--<el-radio v-model="status_bar" label="0">禁用</el-radio>-->
            <!--</li>-->

          </ul>
          <span slot="footer" class="dialog-footer">
          <el-button @click="revamp_rower = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" keep()" size="mini">确 定</el-button>
        </span>
        </el-dialog>
        <!--新增修改权限组出现的页面-->
        <el-dialog
          :visible.sync="dialogVisible_role"
          :close-on-click-modal='false'
          width="30%"
          :before-close="handleClose" class="dialog-style">
          <div slot="title" class="dialog_style_header-title">
            <span class="dialog_style_title-name"> {{ title }}</span>
          </div>
          <ul class="mask_information">
            <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>权限组名称：</span>
              <el-input v-model="groups_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <span style="margin-left: 10px">中文备注：</span>
              <el-input v-model="chinese_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <span style="margin-left: 10px">英文备注：</span>
              <el-input v-model="english_name" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
            </li>
            <!--<li>-->
            <!--<span style="margin-left: 10px">排序值：</span>-->
            <!--<el-input v-model="order"   type="number" style="width: 217px;ime-mode:Disabled"  min=1-->
            <!--onkeyup="value=(parseInt((value=value.replace(/\D/g,''))==''||parseInt((value=value.replace(/\D/g,''))==0)?'1':value,10))" onafterpaste="value=(parseInt((value=value.replace(/\D/g,''))==''||parseInt((value=value.replace(/\D/g,''))==0)?'1':value,10))"-->

            <!--placeholder="请输入内容排序值" size="mini"></el-input></li>-->


            <!--<li v-show="hotel_pub" style="margin-top:50px ;"><button @click="abolish">取消</button><button @click="keep">保存</button> </li>-->
            <!--<li v-show="pub_hotel" style="margin-top:50px;"><button @click="abolish">取消</button><button @click="keep_pub">保存</button> </li>-->
          </ul>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_role = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" keep_page()" size="mini">确 定</el-button>
        </span>
        </el-dialog>
        <!--编辑url-->
        <el-dialog
          title="编辑API"
          :visible.sync="dialog_url"
          :close-on-click-modal='false'
          width="57%"
          :before-close="handleClose">
          <div slot="title" class="dialog_style_header-title">
            <span class="dialog_style_title-name">为权限  <span
              style="color: #4488E9">{{authority}}</span> {{ title }}</span>
          </div>
          <!--<p style="display: inline-block;width: 198px;">编辑url权限名称 ：<span style="color:#4488e9"> {{authority}}</span></p>-->
          <ul style="overflow: hidden">
            <div style="float: left">
              <el-input v-model="arg" placeholder="请输入API名称" style="width:352px;float: left;margin-top: 10px"
                        size="mini"></el-input>
              <!--<el-radio v-model="the_type" label="0" style="margin-top: 20px;margin-left: 10px">名字</el-radio>-->
              <!--<el-radio v-model="the_type" label="1" style="margin-left: 6px">url</el-radio>-->
              <button @click="refer_type"
                      style=" width: 60px;height: 24px; border: none;outline: none; margin-right: 96px;background:rgba(68,136,233,1); border-radius:4px; color: white;margin-left: 6px;margin-top: 10px">
                查询
              </button>
              <el-select v-model="main_url" clearable placeholder="请选择主API" size="mini" style="width: 352px;">
                <el-option
                  v-for="item in check_url"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>

            <el-transfer
              v-model="checkedNames"
              style="float: left;"
              :props="{key: 'id',label: 'name'}"
              :titles="['权限未拥有API', '权限已添加API ']"
              @change="handleChange_api"
              :data="url_list"
            ></el-transfer>
          </ul>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialog_url = false ;" size="mini">取 消</el-button>
          <el-button type="primary" @click="saveInfo_api()" size="mini">确 定</el-button>
        </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "page-table",
    props: ['branch_id', 'conglomerate'],
    watch: {
      //  父级传过来的app
      branch_id: function (newData, oldData) {
        this.branch_data = newData
        console.log(newData);
        this.enter_code();
      },
      //选取APP
      // conglomerate(val){
      //   this.app_type();
      // }

    },
    data() {
      return {
        api: this.api.api_9022_9519,
        title: '',
        //分页
        total: 10,
        pagesize: 5,
        cur_page: 1,
        dialogVisible: false,//修改页面的显示和隐藏
        dialogVisibleurl: false,//编辑url显示隐藏
        url_list: [],//url列表
        authority: '',//所选中的页面名字
        permission_id: '',//选择到的权限的id
        checkedNames: [],//选中的所有权限的id
        bind_list: [],//获取权限组
        income_list: [],//页面
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        param: {},//新增入账代码里的内容

        //  入账代码的内容
        name: '',//名字
        desc: '',//说明
        url: '',//地址
        page_true: true,
        permission_name: '',//权限名称
        create_time: '',//创建时间
        create_user: '',//创建用户
        modify_time: '',//修改时间
        modify_user: "",//修改用户
        hotel_list: [],//app数组
        department_hotel: '',//选中的APP
        /***
         * 页面权限
         *
         * */
        permission_group: [],
        rulelists: [],//权限
        dialogVisible_role: false,//新增和修改权限组的页面
        /**权限组的字段*/
        groups_name: '',//权限组名称
        chinese_name: '',//中文描述
        english_name: '',//英文描述
        permission_name_id: '',//点击修改权限组的id
        /**权限的字段*/
        power_total: 10,//权限数量
        page_size: 10,
        dialogVisible_rower: false,//新增权限出现的页面
        // order:'',//排序值
        rule_groups: '',
        code: '',
        desc_en: "",
        revamp_rower: false,//修改权限出现的页面
        associated: '',//关联页面
        permission_monicker: "",//修改的权限的权限名称
        dialog_url: false,//编辑api的页面
        arg: "",//搜索api
        check_url: [],
        main_url: '',

      }
    },
    created: function () {
      let that = this;
      // that.authorization = sessionStorage.getItem("authorization");
      // that.enter_code();//获取入账代码
      that.app_type();
      that.enter_code();
      console.log(that.conglomerate);
      that.permission_list();//获取权限组
      that.power();//获取权限
    },
    methods: {
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          desc_cn: '',//说明
          name: '',//名字
          url: '',//地址
          code: '',
          desc: '',

        }
        that.department_hotel = "";
        that.rule_groups = "";//权限组

      },
      //查看页面
      enter_code() {
        let that = this;
        console.log(that.url);
        console.log(that.branch_data);
        that.$axios({
          url: that.api + "/v1/common/page/info_list",
          method: "post",
          data: {
            app_id: that.branch_data,
            page_num: that.cur_page,
            page_size: 5
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let pages = res.data.data.list;
              for (let page of pages) {
                let current_names = [];
                for (let rule of page.rule_groups) {
                  current_names.push(rule['name']);
                }
                //join() 方法用于把数组中的所有元素放入一个字符串。
                let str = current_names.join(" ，");
                page.rule_groups = str;
              }
              that.income_list = res.data.data.list;

              that.total = res.data.data.total_count;

            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**查看所有页面设置*/
      page_list() {
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/page/info_list",
          method: "post",
          data: {
            page_size: 5
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let pages = res.data.data.list;
              for (let page of pages) {
                let current_names = [];
                for (let rule of page.rule_groups) {
                  current_names.push(rule['name']);
                }
                //join() 方法用于把数组中的所有元素放入一个字符串。
                let str = current_names.join(" ，");
                page.rule_groups = str;
              }
              that.income_list = res.data.data.list;

              that.total = res.data.data.total_count;

            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //新增页面设置
      page_add() {
        let that = this;
        that.page_true = true;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        console.log(root_level);
        if (root_level === 1 || root_level === 3) {
          that.dialogVisible = true;
          that.title = "新增页面"
        } else {
          this.hintInfo("warning", "您没有此操作权限")

        }

      },
      //封装获取APP
      app_type() {
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/module/root_list",
          method: "post",
          // data:{
          //   hotel_group_id:that.conglomerate,
          // }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              that.hotel_list = res.data.data;
            }
            else {
              that.error(res.data.message);
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
        //获取信息列表
        that.$axios({
          url: that.api + "/v1/common/page/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize
          },

        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              let pages = res.data.data.list;
              for (let page of pages) {
                let current_names = [];
                for (let rule of page.rule_groups) {
                  current_names.push(rule['name']);
                }
                //join() 方法用于把数组中的所有元素放入一个字符串。
                let str = current_names.join(" ，");
                page.rule_groups = str;
              }
              that.income_list = res.data.data.list;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
      //  点击删除
      cancel(id, index, list) {
        console.log(id);
        console.log(index);
        console.log(list);
        let that = this;
        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          list.splice(index, 1);
          that.$axios({
            url: that.api + "/v1/common/page/remove/" + id,
            method: "get",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                that.enter_code();
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
      //点击修改
      amend(srow, id, index, list) {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        let that = this;
        that.Edite = true;
        that.page_true = false;
        that.title = "修改页面"
        that.id = srow.id;
        console.log(srow);
        //  入账代码的内容
        that.param.name = srow.name,//名字
          that.param.desc = srow.desc,//说明
          that.param.url = srow.url//地址:
        if (srow.app_id) {
          that.department_hotel = srow.app_id.id;
        } else {
          that.department_hotel = srow.app_id
        }

      },
      //点击页面设置新增和修改后的保存
      ensure() {
        let that = this;
        if (!that.param.name || !that.param.desc || !that.param.url || !that.department_hotel) {
          this.hintInfo("warning", "*为必填项")
        } else {
          let urldata = that.Edite ? (that.api + "/v1/common/page/update/" + that.id) : ("" + that.api + "/v1/common/page/add");
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              //  入账代码的内容
              name: that.param.name,
              desc: that.param.desc,//中文描述
              url: that.param.url,//url
              app_id: that.department_hotel,
            },

          })
            .then(res => {
              if (res.data.message == "success") {
                that.enter_code();
                that.dialogVisible = false;
                if (that.Edite) {
                  that.hintInfo("success", "修改页面信息成功")
                } else {
                  that.hintInfo("success", "新增页面信息成功")
                }
              }
              else {
                that.error(res.data.message);
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      //编辑页面的穿梭框
      handleChange(value, direction, movedKeys) {
        let that = this;
        console.log(value);
        console.log(direction);
        console.log(movedKeys);//发生移动数据的数组
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
        if (direction === "right") {
          that.direction_tf = "1";

        }
        if (direction === "left") {
          that.direction_tf = "2";
        }


      },
      //点击编辑权限出现的页面
      compile(id, index) {
        console.log(id);
        let that = this;
        that.title = "编辑操作"
        that.checkedNames = [];
        that.authority = id.name;
        that.permission_id = id.id;
        console.log(that.permission_id)
        that.rolePrivileges();
        that.bind_url();
        that.dialogVisibleurl = true;
      },
      //封装获取权限组
      rolePrivileges() {
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/rule_group/get_tree",
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              that.bind_list = res.data.data;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获得已有的权限
      bind_url() {
        let that = this;
        console.log(that.permission_id);
        that.$axios({
          url: that.api + "/v1/common/page/get_info/" + that.permission_id,
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data.rule_groups);
              // 遍历拿到所需要权限
              res.data.data.rule_groups.forEach(item => {
                that.checkedNames.push(item.id)
              });
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      //点击编辑权限后到的保存
      saveInfo_url() {
        console.log(this.checkedNames);
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/page/bind_access_rules",
          method: "post",
          data: {
            page_id: that.permission_id,//所点击的id
            rule_group_ids: JSON.stringify(that.checkedNames),//选中的url
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data);
              that.checkedNames = [];
              that.enter_code();
              that.dialogVisibleurl = false;
              this.hintInfo("success", "编辑权限成功")
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**查询权限名称*/
      permission() {
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/rule_group/get_tree",
          method: "post",
          data: {
            rule_group_name: that.permission_name,
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              that.bind_list = res.data.data;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**
       * 页面权限
       *
       * */
      //封装获取权限组的函数
      permission_list() {
        let that = this
        that.$axios({
          url: that.api + "/v1/common/rule_group/info_list",
          method: "post",
          data: {
            // only: JSON.stringify(['id', 'name','desc','desc_en','status','code',]),
            page_size: 999,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.permission_group = res.data.data.list
            }
            else {
              console.log(res.data.message);
            }

            // that.newlists=res.data.data
          })
          .catch(error => {
            console.log(error);
          });
      },
      //获取所有操作
      all_list() {
        let that = this;
        that.rule_index = null;
        that.power();
      },
      //封装获取权限列表
      power() {
        let that = this;
        that.$axios({
          "url": that.api + "/v1/common/rule/info_list",
          "method": "get",
          params: {
            page_num: that.cur_page,
            rule_group_id: that.rule_index,
            page_size: 10,
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.rulelists = res.data.data.list;
              that.power_total = res.data.data.total_count;
              console.log(that.rulelists)
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //新增权限组
      append() {
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        console.log(root_level);
        let that = this;
        that.Edite = false;
        if (root_level === 1) {
          that.sys_group = true;

        } else {
          that.sys_group = false;
        }
        that.title = "新增页面操作组";
        that.dialogVisible_role = true;
        that.groups_name = "",//权限组名称
          // that.order = 1,//排序值
          that.chinese_name = "",
          that.english_name = "",
          that.permission_hotel = ""

      },
      //点击新增权限或者修改后的保存
      // ||!this.permission_hotel
      keep_page() {
        let that = this;
        if (!that.groups_name) {
          that.hintInfo("warning", "*为必填项")
        } else {
          console.log("保存");
          console.log(that.creator);
          let urldata = that.Edite ? (that.api + "/v1/common/rule_group/update/" + that.permission_name_id) : ("" + that.api + "/v1/common/rule_group/add");
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              name: that.groups_name,
              desc: that.chinese_name,
              desc_en: that.english_name,
              // order:that.order,
              // hotel_id: this.permission_hotel
              // url:this.url,

            },
          })
            .then(res => {
              console.log(res);
              if (res.data.message === "success") {
                that.dialogVisible_role = false
                that.permission_list();
                that.power();
                that.hintInfo("success", "添加页面权限组成功");
                // this.$refs.mychild.break();//成功后调用子组件方法
              } else {
                console.log(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
              that.hintInfo("warning", "添加页面权限组失败")
            })


        }
      },
      //权限组修改
      amend_page(node, data) {
        console.log(node, data);
        let that = this;
        that.Edite = true;
        that.title = "修改操作组"
        that.dialogVisible_role = true;
        that.groups_name = node.data.name;//权限名称
        // this.status_bar=node.data.status;//状态
        that.permission_name_id = node.data.id;//id
        that.chinese_name = node.data.desc;//中文备注
        that.english_name = node.data.desc_en;//英文备注
        // this.pub = node.data.hotel_id;
      },
      //权限组删除
      remove(node, data) {
        console.log(node, data);
        let id = node.data.id;
        let that = this;
        if (data.rules.length === 0) {
          that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$message({
              type: 'success',
              message: '删除成功!'
            });

            that.$axios({
              url: that.api + "/v1/common/rule_group/remove/" + id,
              method: "get",
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res)
                  // location.reload(); // 强制刷新
                  // that.$refs.mychild.break();//成功后调用子组件方法
                  that.permission_list();
                }

              })
              .catch(error => {
                console.log(error);
              })

          }).catch(() => {
            that.$message({
              type: 'info',
              message: '已取消删除',

            });
          });

        } else {
          that.hintInfo("warning", "权限组下拥有权限，请先删除权限")
        }


      },
      /**编辑url的穿梭框*/
      handleChange_api(value, direction, movedKeys) {
        let that = this;
        // console.log(direction);
        // console.log(movedKeys);//发生移动数据的数组
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
        if (direction === "right") {
          that.direction_tf = "1";
          for (let i in value) {
            for (let item in that.url_list) {
              if (value[i] === that.url_list[item].id) {
                that.check_url.push(that.url_list[item])
              }

            }
            ;
            console.log(that.check_url);
            that.check_url = that.unique(that.check_url);
            if (that.check_url.length === 0) {
              console.log("测试");
              that.main_url = '';
            }

          }
        }
        if (direction === "left") {
          that.direction_tf = "2";
          console.log(value);
          if (value.length === 0) {
            that.check_url = [];
            that.main_url = '';
          }
          let set = [];
          for (let u of that.check_url) {
            for (let v of value) {
              if (u.id === v) {
                set.push(u);
                that.check_url = set;
                that.main_url = that.check_url[0].id;
              }
            }
          }
        }

      },
      //去重url
      unique(arr) {
        const res = new Map();
        return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
      },
      /**
       *
       * 开始写权限的增删该查
       * **/
      //新增权限
      rower_item() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1) {
          that.dialogVisible_rower = true;
          that.title = "新增操作"
        } else {
          that.hintInfo("warning", "您没有此操作的权限")
        }

      },
      //点击新增权限后的保存
      saveInfo_rower() {
        let that = this;
        if (!that.param.name || !that.rule_groups || !that.param.code) {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.api + "/v1/common/rule/add",
            method: "post",
            data: {
              name: that.param.name,//角色名
              rule_group: that.rule_groups,//权限组
              code: that.param.code,//代码
              // status:that.normal+"",//状态
              desc: that.param.desc,//中文备注
              desc_en: that.param.desc_en,//英文备注
            },
          })
            .then(res => {
              if (res.data.message == "success") {
                console.log(res);
                that.dialogVisible_rower = false;
                that.power();
                that.hintInfo("success", "新增操作成功");
                // this.$emit('children')
              }
              else {
                console.log(res.data.message);
                if (res.data.message.search("duplicated value") !== -1) {
                  that.hintInfo("warning", "代码重复，请检查后重新输入")
                }

              }
            })
            .catch(error => {
              console.log(error);
              that.hintInfo("warning", "新增操作失败");
            });

        }
      },
      //点击权限上的修改弹出蒙版层
      revision(srow, id, index, list) {
        console.log(srow, id);
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        let that = this;
        if (root_level !== 1) {
          that.hintInfo("warning", "您没有此权限")
        } else {
          that.title = "修改操作"
          that.revamp_rower = true;
          that.permission_monicker = srow.name;//权限名称
          that.url = srow.url;//url
          that.status_bar = srow.status + "";
          if (srow.rule_group === null) {
            that.rule_groups = ""
          } else {
            that.rule_groups = srow.rule_group.id
          }
          // this.rule_groups=srow.rule_group.name
          that.permission_name_id = srow.id;//id
          that.chinese_name = srow.desc;//中文备注
          that.english_name = srow.desc_en;//英文备注
          if (srow.page_id === null) {
            that.associated = srow.page_id;//关联页面
          } else {
            that.associated = srow.page_id.name;//关联页面
          }

          // this.associated_id = srow.page_id.id
          console.log(this.permission_name_id);
        }
      },
      //点击权限上的修改后的保存
      keep() {
        let that = this;
        if (!that.permission_monicker || !that.rule_groups) {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.api + "/v1/common/rule/update/" + that.permission_name_id,
            method: "post",
            data: {
              name: that.permission_monicker,
              desc: that.chinese_name,
              desc_en: that.english_name,
              // status: that.status_bar+"",
              url: that.url,
              rule_group: that.rule_groups,
              // page_id: that.associated_id,

            },
          })
            .then(res => {
              console.log(res);
              if (res.data.message === "success") {
                that.power();
                that.revamp_rower = false;
                that.hintInfo("success", "修改操作成功")
                // console.log(that.permission_name);
                // that.$emit('children')
              } else {
                console.log(res.data.message)
                that.hintInfo("warning", "修改操作失败")
              }

            })
            .catch(error => {
              console.log(error);
              that.hintInfo("warning", "修改操作失败")
            })
        }
      },
      //点击权限上的删除
      cance(id, index, list) {
        console.log(id);
        console.log(index);
        console.log(list);
        let that = this;
        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$message({
            type: 'success',
            message: '删除成功!'
          });
          list.splice(index, 1);
          that.$axios({
            url: that.api + "/v1/common/rule/remove/" + id,
            method: "post",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                that.power();
                that.permission_list();
                // this.$emit('children');
              }
              // location.reload(); // 强制刷新
            })
            .catch(error => {
              console.log(error);
            })


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //点击url出现的页面
      compile_api(id, index) {
        console.log(id);
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        console.log(root_level);
        if (root_level === 1 || root_level === 2) {
          that.checkedNames = [];
          that.authority = id.name;
          that.permission_id = id.id;
          // console.log( that.permission_id)
          that.title = "编辑API"
          that.url_methodes();
          that.bind_url_api();
          that.dialog_url = true;
          that.arg = "";
        } else {
          that.hintInfo("warning", "您没有此操作的权限")
        }
      },
      //封装获得已有的url
      bind_url_api() {
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/api/info_list",
          method: "post",
          data: {
            rule_id: that.permission_id,
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data);
              that.check_url = res.data.data.list;
              if (that.check_url.length !== 0) {
                that.main_url = that.check_url[0].id;
              } else {
                that.main_url = ""
              }

              // 遍历拿到所需要url
              res.data.data.list.forEach(item => {
                that.checkedNames.push(item.id)
              });
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      //点击编辑url后到的保存
      saveInfo_api() {
        let that = this;
        if (that.checkedNames.length !== 0) {
          if (that.main_url === "") {
            that.hintInfo("warning", "请选择主url")
          } else {
            that.$axios({
              url: that.api + "/v1/common/rule/bind_api",
              method: "post",
              data: {
                rule_id: that.permission_id,//所点击的id
                apis: JSON.stringify(that.checkedNames),//选中的url
                main_api: that.main_url,
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res.data);
                  that.checkedNames = [];
                  that.dialog_url = false;
                  that.hintInfo("success", "编辑url成功")
                }
                else {
                  console.log(res.data.message);
                  if (res.data.message === "错误的期待结果 length: 2") {
                    that.hintInfo("warning", "主url已经被选择，请检查后重新输入")
                  }
                }
              })
              .catch(error => {
                console.log(error);
                that.hintInfo("warning", "编辑api失败")
              });
          }

        } else {
          that.$axios({
            url: that.api + "/v1/common/rule/bind_api",
            method: "post",
            data: {
              rule_id: that.permission_id,//所点击的id
              apis: JSON.stringify(that.checkedNames),//选中的url
              main_api: null,
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res.data);
                that.checkedNames = [];
                that.dialog_url = false;
              }
              else {
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        }


      },

      //url里的url搜索
      searches() {
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/api/info_list",
          method: "post",
          data: {
            name: that.site_url,
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.url_list = res.data.data.list;
              console.log(that.rulelists)
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },

      //权限分页
      permissionPage(page) {
        let that = this
        console.log(page) // 当前页}
        that.cur_page = page;
        //获取信息列表
        that.$axios({
          "url": that.api + "/v1/common/rule/info_list",
          "method": "get",
          params: {
            page_num: page,
            page_size: 10
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.rulelists = res.data.data.list
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**url筛选*/
      refer_type() {
        let that = this;
        that.$axios({
          url: "" + that.api + "/v1/common/api/info_list",
          method: "post",
          data: {
            arg: that.arg,
            // the_type:that.the_type+"",
            page_size: 999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list);
              that.url_list = res.data.data.list;
              if (res.data.data.list.length === 0) {
                that.hintInfo("warning", "暂无此URL名称，请检查后重新输入")
              }
            }
            else {
              console.log(res.data.data.message)
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取url
      url_methodes() {
        let that = this;
        that.$axios({
          url: that.api + "/v1/common/api/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              that.url_list = res.data.data.list;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },

      // 点击权限组的节点显示编辑和删除
      nodeClick(index) {
        let that = this;
        console.log(index);
        that.rule_index = index.id;
        that.power()
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
    }
  }
</script>

<style lang="less" scoped>
  .page-table {
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow-y: scroll;
    .shopping {
      /*margin-top: 20px;*/
      height: 348px;
      .shopping_title {
        li {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .foot {
      width: 100%;
      height: 400px;
      overflow: hidden;
      p {
        width: 100%;
        height: 40px;
        padding-left: 10px;
        background: #eeeeee;
        /*color: white;*/
        line-height: 40px;
        font-weight: bold;
      }
      .left {
        width: 280px;
        float: left;
        height: 100%;
        .content {
          height: 100%;
          .control {
            height: 78%;
            /*background:rgba(247,247,247,1);*/
            overflow-y: scroll;
          }
        }
      }
      .right {
        width: calc(100% - 280px);
        height: 100%;
        float: left;
      }
      .mask_information {
        overflow: hidden;
        li {
          float: left;
          width: 100%;
          span {
            display: inline-block;
            width: 100px;
          }
          margin-bottom: 10px;
        }
      }
    }
    .dialog_style {
      overflow: hidden;
      li {
        /*float: left;*/
        /*width: 50%;*/
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 76px;
        }
      }
    }
  }
</style>
<style scoped>
  .el-transfer > > > .el-transfer-panel {
    width: 417px;
    margin-top: 10px;
  }
</style>
