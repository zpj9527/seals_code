<template>
  <div class="role-privileges">
    <div class="paging-title" style="position: relative;overflow: hidden">
      <div style="margin-top: 10px">
        <span style="font-size: 16px; cursor: pointer;" title="查看全部角色" @click="all_role">角色  </span>
        <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt=""  @click="dialogVisible_role = true;plot()" style="position: absolute;top: 0px" >-->
        <button @click="plot();add_title()"
                style="width: 80px;height: 27px;line-height: 27px;background: #4488e9;border:none;border-radius: 3px;color:white ;margin-left: 10px">
          新增
        </button>
        <!--<button @click="all_role" style="width: 100px;height: 27px;line-height: 27px;background: #4488e9;border:none;border-radius: 3px;color:white ">查看全部角色</button>-->
      </div>

      <!--新增角色出现的页面-->
      <el-dialog
        :visible.sync="dialogVisible_role"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose" class="dialog-style">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title_head }}</span>
        </div>
        <ul class="mask_information">

          <li v-if="root_man">
            <span><i style="color: red;font-size: 18px">*</i>酒店 ：</span>
            <el-select v-model="hotel_id" placeholder="请选择" size="mini" style="width: 217px;">
              <el-option
                v-for="item in hotel_list"
                :key="item.value"
                :label="item.full_name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>角色名</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>角色组 ：</span>
            <el-select v-model="role_group " placeholder="请选择" size="mini" style="width: 217px;">
              <el-option
                v-for="item in role_set"

                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <span>中文备注 ：</span>
            <el-input v-model="param.desc" style="width: 217px;" placeholder="请输入内容"
                      size="mini"></el-input>
          </li>
          <li>
            <span >英文备注 ：</span>
            <el-input v-model="param.desc_en" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
          </li>
          <li v-show="root_man">
            <span style="margin-left: 10px">集团码：</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>
          <li v-show="root_sys">
            <span style="margin-left: 10px">系统码：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li style="width: 317px;">
            <span style="margin-left: 10px">状态：</span>
            <el-radio v-model="normal" label="1">正常</el-radio>
            <el-radio v-model="normal" label="0">停用</el-radio>
          </li>

        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_role = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" saveInfo_role()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--新增权限出现的页面-->
      <el-dialog
        :visible.sync="dialogVisible_rower"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose" class="dialog-style">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title_head }}</span>
        </div>
        <ul class="mask_information">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>权限名称 ：</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>权限组 ：</span>
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
          <li style="width: 400px;">
            <i style="color: red;font-size: 18px">*</i>
            <span>状态：</span>
            <el-radio v-model="normal" label="1">正常</el-radio>
            <el-radio v-model="normal" label="0">停用</el-radio>
          </li>
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
      <!--编辑权限出现的页面-->
      <el-dialog
        title="编辑权限"
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        width="58%"
        :before-close="handleClose" class="dialog-style">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name">为角色 <span style="color: #4488E9">{{authority}}</span>  {{ title_head }}</span>
        </div>
        <!--<span style="display: inline-block;width: 290px;">可选择的权限</span>-->
        <!--<p style="display: inline-block;width: 198px;">编辑权限角色 ：<span style="color:#4488e9"> {{authority}}</span></p>-->
        <ul class="mask_information" style="overflow: hidden;">
          <tree-transfer :title="title" :from_data='bind_list' :to_data='toData' :defaultProps="{label:'name'}"
                         default-expand-all="true"
                             @addBtn='add' @removeBtn='remove' :mode='mode' height='450px' width="700px"
                         style="float: left">   
          </tree-transfer>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--编辑url-->
      <el-dialog
        title="编辑API"
        :visible.sync="dialogVisibleurl"
        :close-on-click-modal='false'
        width="57%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name">为权限  <span style="color: #4488E9">{{authority}}</span> {{ title_head }}</span>
        </div>
        <!--<p style="display: inline-block;width: 198px;">编辑url权限名称 ：<span style="color:#4488e9"> {{authority}}</span></p>-->
        <ul style="overflow: hidden">
          <div style="float: left">
            <el-input v-model="arg" placeholder="请输入API名称" style="width:260px;float: left;margin-top: 10px"
                      size="mini"></el-input>
            <!--<el-radio v-model="the_type" label="0" style="margin-top: 20px;margin-left: 10px">名字</el-radio>-->
            <!--<el-radio v-model="the_type" label="1" style="margin-left: 6px">url</el-radio>-->
            <button @click="refer_type"
                    style=" width: 60px;height: 24px; border: none;outline: none; margin-right: 74px;background:rgba(68,136,233,1); border-radius:4px; color: white;margin-left: 6px;margin-top: 10px">
              查询
            </button>
            <el-select v-model="main_url" clearable placeholder="请选择主API" size="mini" style="width: 300px;">
              <el-option
                v-for="item in check_data"
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
            @change="handleChange"
            :data="url_list"
          ></el-transfer>
        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleurl = false ;cancel()" size="mini">取 消</el-button>
          <el-button type="primary" @click="saveInfo_url()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改角色-->
      <el-dialog
        :visible.sync="amend_role"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose" class="dialog-style">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title_head }}</span>
        </div>
        <!--点击角色上的修改弹出的蒙版-->
        <ul class="mask_information">
          <li v-if="root_man">
            <span >酒店：</span>
            <el-input v-model="hotel_id" style="width: 217px;" :disabled="true" placeholder="请输入内容"
                      size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>角色名：</span>
            <el-input v-model="part_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>角色组：</span>
            <!--<el-input v-model="name" placeholder="请输入内容" style="width: 300px;"></el-input>-->
            <el-select v-model="role_group" placeholder="请选择" size="mini" style="width: 217px;">
              <el-option
                v-for="item in role_set"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>代码</span>
            <el-input v-model="code" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <span >中文备注</span>
            <el-input v-model="desc" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
          </li>
          <li>
            <span>英文备注</span>
            <el-input v-model="desc_en" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <!--v-show="root_man"-->
          <li v-show="root_man">
            <span >集团码</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>
          <li v-show="root_man">
            <span>系统码</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li>
          <li style="width: 317px;">
            <span >状态：</span>
            <el-radio v-model="normal" label="1">正常</el-radio>
            <el-radio v-model="normal" label="0">停用</el-radio>
          </li>


        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="amend_role = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" preserve()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--修改权限-->
      <el-dialog
        :visible.sync="revamp_rower"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose" class="dialog-style">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title_head }}</span>
        </div>
        <ul class="mask_information">
          <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>权限名称</span>
            <el-input v-model="permission_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
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
          <li>
            <span style="margin-left: 10px">状态</span>
            <el-radio v-model="status_bar" label="1">可用</el-radio>
            <el-radio v-model="status_bar" label="0">禁用</el-radio>
          </li>

        </ul>
        <span slot="footer" class="dialog-footer">
          <el-button @click="revamp_rower = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" keep()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <el-container>
      <!--角色-->
      <el-header style="height: 50%;padding: 0">
        <div class="paging">
          <!--列表-->
          <el-table
            :data="newlists"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',width:'100%',textAlign:'center'}"
            height="276px"
            size="mini"
            stripe>
            <el-table-column
              prop="name"
              fixed
              label="角色名">
            </el-table-column>
            <el-table-column
              prop="role_group.name"
              label="角色组">
            </el-table-column>
            <el-table-column
              prop="code"
              label="代码">
            </el-table-column>
            <el-table-column
              prop="is_sys "
              label="是否系统码">
              <!--传过来的值改变格式-->
              <template slot-scope="scope">
                <span v-if="scope.row.is_sys === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_group"
              label="是否集团码">
              <!--传过来的值改变格式-->
              <template slot-scope="scope">
                <span v-if="scope.row.is_group === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status "
              label="状态">
              <!--传过来的值改变格式-->
              <template slot-scope="scope">
                <span v-if="scope.row.status === 0">禁用</span>
                <span v-else>可用</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="desc"
              label="中文备注">
            </el-table-column>
            <el-table-column
              prop="desc_en"
              label="英文备注">
            </el-table-column>
            <el-table-column
              prop="hotel_id.short_name"
              label="酒店">
            </el-table-column>
            <el-table-column
              prop="address"
              width="240 "
              label="操作"
              fixed="right"
            >
              <!-- v-if="scope.row.is_sys===0"-->
              <template slot-scope="scope">
                <el-button @click="cancels(scope.row,scope.row.id,scope.$index, newlists)" type="danger" size="mini">删除</el-button>
                <el-button size="mini" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
                <el-button size="mini" @click="compile_power(scope.row,scope.row.id,scope.$index, newlists) ">可用权限
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="5"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
      </el-header>
      <el-main style="padding: 0">
        <!--权限-->
        <div class="rule" style="position: relative;overflow-y: scroll">
          <div style="margin-top: 10px">
            <!--cursor: pointer;   改变鼠标的样式改成小手-->
            <span style="font-size: 16px;cursor: pointer;" @click="all_rule" title="查看所有权限"> 权限 </span>
            <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" style="position: absolute;top: 14px"@click="rower_item();flush()">-->
            <!--<button @click="rower_item();flush()" style="width: 80px;height: 27px;line-height: 27px;background: #4488e9;border:none;border-radius: 3px;color:white ">新增</button>-->
            <!--<button @click="all_rule" style="width: 100px;height: 27px;line-height: 27px;background: #4488e9;border:none;border-radius: 3px;color:white ">查看全部权限</button>-->
          </div>
          <div class="paging" style="margin-top: 10px;">
            <!--列表-->
            <el-table
              :data="rulelists"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center',}"
              style="overflow-y: scroll"
              size="mini"
              stripe>
              <el-table-column
                prop="name"
                fixed
                label="权限名称">
              </el-table-column>
              <el-table-column
                prop="rule_group.name"
                label="页面权限组">
              </el-table-column>
              <el-table-column
                prop="status "
                label="状态">
                <!--传过来的值改变格式-->
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">禁用</span>
                  <span v-else>可用</span>
                </template>
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
                prop="page_id.name"
                label="关联页面">
              </el-table-column>
              <!--<el-table-column-->
              <!--width="240"-->
              <!--prop="address"-->
              <!--label="操作"-->
              <!--fixed="right"-->
              <!--&gt;-->
              <!--<template slot-scope="scope">-->
              <!--<el-button @click="cance(scope.row.id,scope.$index, rulelists)"type="danger" size="mini" disabled>删除</el-button>-->
              <!--<el-button   size="small" @click="revision(scope.row,scope.row.id,scope.$index, rulelists)">修改</el-button>-->
              <!--<el-button   size="small" @click="compile(scope.row,scope.row.id,scope.$index, rulelists)" >编辑操作</el-button>-->
              <!--</template>-->
              <!--</el-table-column>-->
            </el-table>
            <!--分页-->
            <el-pagination style="float: right;"
                           layout="prev, pager, next"
                           :page-size="10"
                           @current-change="permissionPage"
                           :total="power_total">
            </el-pagination>
          </div>
        </div>
      </el-main>
    </el-container>

  </div>
</template>

<script>
  import Qs from 'qs';
  import treeTransfer from 'el-tree-transfer';

  let id = 1000;
  export default {
    name: "role-privileges",
    props: ["role_index", "permission_group", "rule_index"],
    data() {
      return {
        title: ["角色未拥有权限", "角色已添加权限"],
        title_head: '',
        the_type: '0',//url筛选
        arg: '',//url筛选
        param: {},//新增权限的内容
        Edite: true, //标志位 判断的是新增还是更新
        mode: "transfer", // transfer addressList
        url_url: this.api.api_9022_9519,
        value: '',
        /**
         * 角色组的筛选
         * */
        seek_rolegroup: '',//筛选
        seek_rolename: '',//筛选角色名字
        /**
         * 权限组的筛选
         * */
        seek_rulename: '',//权限组名称
        seek_rulegroup: '',//所选权限组

        normal: "1",//新增角色的状态
        is_group:"1",//是否是集团码
        is_sys:"1",//是否是系统码
        radio: '1',//单选
        total: 5,//代表总条数
        power_total: 10,//代表全部权限总条数
        dialogVisible: false,//编辑权限显示隐藏
        dialogVisibleurl: false,//编辑url显示隐藏
        dialogVisible_role: false,//新增角色的显示隐藏
        dialogVisible_rower: false,//新增权限显示隐藏
        amend_role: false,//修改角色
        revamp_rower: false,//修改权限
        id: '',//修改此项的id 传给后台
        authorization_token: '',//获取token值
        newlists: [],//角色组
        rulelists: [],//权限组
        bind_list: [],//权限组树形
        // 蒙版里的角色信息
        part_name: '',////角色名
        role_group: '',//角色组
        roles_id: '',//传给后台的所选择的角色组id
        grogshop_id: '',//点击修改后传给后台的酒店id
        role_sets: [],//接受后台返回的角色组渲染蒙版层里的角色组
        role_set: [],
        root_id: '',//模块种类
        has_entry: '',//模块类型
        url: '',//链接
        creator: '',//创建人
        create_time: '',//创建时间
        last_time: '',//修改时间
        parent_id: '',//父级模块
        //  蒙版里的权限信息
        permission_name: '',//权限名称
        status_bar: '',//状态
        chinese_name: '',//中文备注
        english_name: '',//英文备注
        associated: '',//关联页面
        associated_id: '',//关联页面的id
        permission_name_id: '',//权限修改传给后台的id
        /*
        * 新增角色上用到的
        * */
        hotel_list: [],
        /*
        * 新增角色里的内容
        * */
        name: '',//角色名
        // role_group:'',//角色组
        code: '',//代码
        hotel_id: '',//酒店id
        status: '',//状态
        desc: '',//中文备注
        desc_en: '',//英文备注

        /*新增权限*/
        rule_groups: '',//权限组

        //编辑url
        site_url: '',//url搜索的内容
        checked: false,
        url_list: [],//url列表
        authority: '',//所选中的权限名
        checkedNames: [],//选中的所有url的id
        check_data: [],
        main_url: '',//所选择主url
        toData: [],//选中的所有的权限
        permission_id: '',//选择到的权限的id
        role_id: "",//选择到的角色的id
        direction_tf: "",//判断点击的是left还是right
        root_man: false,
        root_sys:false,
        cur_page: 1,//记录操作那一页
      }
    },
    created: function () {
      let that = this;
      //获取角色信息列表
      that.part();
      that.part_list();//获取角色组
      //获取权限列表
      that.power();
      that.hotel()
    },
    watch: {
      // 权限组
      rule_index: function (newVal) {
        console.log(newVal);
        let that = this;
        that.seek_rulegroup = newVal;
        that.grabble_rule();
      },
      //角色组
      role_index(newVal, oldval) {
        console.log(newVal);
        let that = this;
        that.seek_rolegroup = newVal;
        that.cur_page=1;
        that.grabble_role();
      },

    },
    components: {treeTransfer}, // 注册
    methods: {
      handleChange(value, direction, movedKeys) {
        let that = this;
        // console.log(direction);
        // console.log(movedKeys);//发生移动数据的数组
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
        if (direction === "right") {
          that.direction_tf = "1";
          for (let i in value) {
            for (let item in that.url_list) {
              if (value[i] === that.url_list[item].id) {
                that.check_data.push(that.url_list[item])
              }
            };
            console.log(that.check_data);
            that.check_data = that.unique(that.check_data);
            if (that.check_data.length === 0) {
              console.log("测试");
              that.main_url = '';
            }

          }
        }
        if (direction === "left") {
          that.direction_tf = "2";
          console.log(value);
          if (value.length === 0) {
            that.check_data = [];
            that.main_url = '';
          }
          let set = [];
          for (let u of that.check_data) {
            for (let v of value) {
              if (u.id === v) {
                set.push(u);
                that.check_data = set;
                that.main_url = that.check_data[0].id;
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
      /**父组件触发子组件*/
      break() {
        let that = this;
        that.part_list();//获取角色组
        that.part();//获取角色
      },

      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          code: '',//说明
          name: '',//名字
          desc: '',//中文描述
          desc_en: '',//英文描述
        }
        that.rule_groups = '',//权限组
          that.normal = '1'//状态
      },
      /**
       * plot  用来刷新角色的数据
       * */

      plot() {
        let that = this;
        that.param = {
          name: '',//角色名
          code: '',//代码
          desc: '',//中文备注
          desc_en: '',//英文备注
        }
        that.role_group = '',//角色组,//权限组
          that.normal = '1',//状态
          that.hotel_id = ''//酒店id

      },
      //封装获取角色组的函数
      part_list() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/role_group/info_list",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              // console.log(res)
              let root_level = parseInt(sessionStorage.getItem("root_level"));
              let arr=[],arr_is_sys=[];
              for(let item of res.data.data.list){
                if(item.is_sys===1){
                  arr_is_sys.push(item);
                }
              }
              if(root_level===1){
                that.role_set = arr_is_sys
              }else {
                that.role_set = res.data.data.list
              }
              // that.role_set = res.data.data.list;
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取酒店的信息
      hotel() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/hotel/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.hotel_list = res.data.data.list;
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
      //封装获取角色信息列表
      part() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level")),is_sys=1;
        if(root_level===1){
          is_sys=1
        }else {
          is_sys=null
        }
        that.$axios({
          url: that.url_url + "/v1/common/role/info_list",
          method: "get",
          params: {
            page_size:5,
            role_group_id: that.seek_rolegroup,//筛选
            page_num: that.cur_page,
            is_sys:is_sys
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.newlists = res.data.data.list;
              that.total = res.data.data.total_count;

            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取权限列表
      power() {
        let that = this;
        that.$axios({
          "url": that.url_url + "/v1/common/rule/info_list",
          "method": "get",
          params: {
            page_num: that.curPage,
            page_size: 10,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
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
      //封装获取url
      url_methodes() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/api/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
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
      /**角色的筛选*/
      grabble_role() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/role/info_list",
          method: "post",
          data: {
            role_group_id: that.seek_rolegroup,//筛选
            page_num: that.cur_page,
            // role_name: that.seek_rolename,//筛选角色名字
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.newlists = res.data.data.list;
              that.total = res.data.data.total_count;
              console.log(res.data.data.total_count);
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**筛选全部角色*/
      all_role() {
        let that = this;
        that.seek_rolegroup = '';
        that.grabble_role();
        that.$emit('led')
      },


      /**权限的筛选*/
      grabble_rule() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/rule/info_list",
          method: "post",
          data: {
            fork_rule_groups: that.seek_rulegroup,//权限组名称
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
      all_rule() {
        let that = this;
        that.seek_rulegroup = '';
        that.grabble_rule();
        that.$emit('led_rule')
      },
      /**url筛选*/
      refer_type() {
        let that = this;
        that.$axios({
          "url": "" + that.url_url + "/v1/common/api/info_list",
          "method": "post",
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
      //

      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log('toData', toData);
        console.log('obj', obj);

        let that = this;
        for (let item of toData) {
          if (item.children.length === 0) {
            that.hintInfo("warning", "请选择权限组下的权限")
          } else {
            that.toData = toData;
          }
        }


      },
      // 监听穿梭框组件移除
      remove(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的{keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log('fromData', fromData);
        console.log('toData', toData);
        console.log('obj', obj);
        let that = this;
        // that.rolePrivileges();
        that.toData = toData;

      },

      //增加权限的显示隐藏
      handleClose(done) {
        done();
      },
      //封装转换角色组
      role_id_name(flag, data) {
        // flag为1的时候code转desc
        for (let i in list) {
          if (flag && data == list[i].code) {
            return list[i].desc
          } else if (!flag && data == list[i].desc) {
            return list[i].code
          }
        }
      },

      /*
      * 点击角色
      * */
      //点击角色分页上的页数
      handleCurrentChange(curPage) {
        let that = this
        that.cur_page = curPage;
        console.log(curPage) // 当前页}
        //获取信息列表
        that.$axios({
          url:  that.url_url + "/v1/common/role/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: 5,
            role_group_id: that.seek_rolegroup,//筛选
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.newlists = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      //点击角色上的修改弹出蒙版层
      submit(srow, id, index, list) {
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        let that =this;
        if(srow.is_sys===1){
          if (root_level === 1){
            that.root_man = false;
            that.root_sys=true;
            that.amend_role = true;
          }else {
            that.hintInfo("warning", "权限不足")
          }
        }else if(srow.is_group===1) {
          if (root_level === 1) {
            that.root_man = true;
            that.root_sys = false;
            that.amend_role = true;
          } else {
            that.hintInfo("warning", "权限不足")
          }
        }else {
          that.amend_role = true;
        }
        that.id = id;
        console.log(srow);
        that.title_head = "修改角色"
        that.part_name = srow.name;
        that.role_group = srow.role_group.id;
        that.code = srow.code;//代码
        that.normal = srow.status+"";
        if(srow.is_sys){
          that.is_sys=srow.is_sys+"";
        }
        if(srow.is_group){
          that.is_group = srow.is_group+"";
        }
        that.desc = srow.desc;//中文备注
        that.desc_en = srow.desc_en;//英文备注
        if (srow.hotel_id === null) {
          that.hotel_id = srow.hotel_id;//酒店
        } else {
          that.hotel_id = srow.hotel_id.full_name
        }
        if (srow.hotel_id === null) {
          that.grogshop_id = srow.hotel_id
        } else {
          that.grogshop_id = srow.hotel_id.id  //传给后台的酒店id
        }
      },
      //点击角色上的删除
      cancels(srow,id, index, list) {
        let that =this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if(srow.is_sys===1){
          if(root_level===1){
            that.cancel_remove(srow,id, index, list)
          }else {
            that.hintInfo("warning", "权限不足")
          }
        }else if(srow.is_group===1){
          if(root_level===2){
            that.cancel_remove(srow,id, index, list)
          }else {
            that.hintInfo("warning", "权限不足")
          }
        }else {
          that.cancel_remove(srow,id, index, list);
        }
      },
      /**封装删除函数*/
      cancel_remove(srow,id, index, list){
        let that =this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          list.splice(index, 1);
          this.$axios({
            url: this.url_url + "/v1/common/role/remove/" + id,
            method: "post",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                this.part();
                this.masking = false;
                this.$emit('children')
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
              } else {
                this.hintInfo("warning", res.data.message)
              }

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
      //点击角色修改蒙版的保存
      preserve() {
        let that = this
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1) {
          if (!that.part_name || !that.code || !that.role_group) {
            that.hintInfo("warning", "*为必填项")
          } else {
            console.log(this.creator)
            that.$axios({
              url: that.url_url + "/v1/common/role/update/" + that.id,
              method: "post",
              data: {
                name: that.part_name,
                code: that.code,
                desc: that.desc,
                desc_en: that.desc_en,
                hotel_id: that.grogshop_id,
                role_group: that.role_group,
                is_group:that.is_group,
                is_sys:that.is_sys,
                status: that.normal + "",//状态

              },
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  // location.reload();  //强制刷新
                  that.part();
                  that.amend_role = false;
                  this.$emit('children')
                  this.hintInfo("success", "修改角色成功")
                  that.total = 5;
                } else {
                  console.log(res.data.message)
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        } else {
          if (!that.part_name || !that.code || !that.role_group) {
            that.hintInfo("warning", "*为必填项")
          } else {
            console.log(this.creator)
            that.$axios({
              url: that.url_url + "/v1/common/role/update/" + that.id,
              method: "post",
              data: {
                name: that.part_name,
                code: that.code,
                desc: that.desc,
                desc_en: that.desc_en,
                // hotel_id:that.grogshop_id,
                role_group: that.role_group,
                status:that.normal+"",

              },
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  // location.reload();  //强制刷新
                  that.part();
                  that.amend_role = false;
                  this.$emit('children')
                  this.hintInfo("success", "修改角色成功")
                } else {
                  console.log(res.data.message)
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        }
      },
      //角色新增
      add_title() {
        let that = this;
        that.title_head = "新增角色"
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1 ) {
          that.root_sys = true;
          that.root_man = false;
        } else if( root_level === 2) {
          that.root_man = true;
          that.root_sys = false;
        }else {
          that.root_man = false;
          that.root_sys = false;
        }
        that.dialogVisible_role = true;
      },
      //点击角色新增后的保存
      saveInfo_role() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1) {
          if (!that.param.name || !that.role_group || !that.param.code || !that.hotel_id || !that.normal) {
            this.hintInfo("warning", "*为必填项")
          } else {
            that.$axios({
              "url": "" + that.url_url + "/v1/common/role/add",
              "method": "post",
              data: {
                name: that.param.name,//角色名
                role_group: that.role_group,//角色组
                code: that.param.code,//代码
                hotel_id: that.hotel_id,//酒店id
                status: that.normal + "",//状态
                desc: that.param.desc,//中文备注
                desc_en: that.param.desc_en,//英文备注
                hotel_group_id: parseInt(sessionStorage.getItem("group_id")),
                // is_group:that.is_group,
                is_sys:that.is_sys
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  // console.log(res);
                  that.dialogVisible_role = false;
                  that.part();
                  this.hintInfo("success", "新增角色成功")
                  this.$emit('children')
                }
                else {
                  console.log(res.data.message);
                  let fault = res.data.message;
                  console.log(fault);
                  if (fault) {
                    that.hintInfo("warning", "角色名或者代码已存在，请重新输入")
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        } else if(root_level === 2){
          if (!that.param.name || !that.role_group || !that.param.code || !that.hotel_id || !that.normal) {
            this.hintInfo("warning", "*为必填项")
          } else {
            that.$axios({
              "url": "" + that.url_url + "/v1/common/role/add",
              "method": "post",
              data: {
                name: that.param.name,//角色名
                role_group: that.role_group,//角色组
                code: that.param.code,//代码
                hotel_id: that.hotel_id,//酒店id
                status: that.normal + "",//状态
                desc: that.param.desc,//中文备注
                desc_en: that.param.desc_en,//英文备注
                hotel_group_id: parseInt(sessionStorage.getItem("group_id")),
                is_group:that.is_group,
                // is_sys:that.is_sys
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  // console.log(res);
                  that.dialogVisible_role = false;
                  that.part();
                  this.hintInfo("success", "新增角色成功")
                  this.$emit('children')
                }
                else {
                  console.log(res.data.message);
                  let fault = res.data.message;
                  console.log(fault);
                  if (fault) {
                    that.hintInfo("warning", "角色名或者代码已存在，请重新输入")
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
        else {
          if (!that.param.name || !that.role_group || !that.param.code || !that.normal) {
            this.hintInfo("warning", "*为必填项")
          } else {
            that.$axios({
              "url": "" + that.url_url + "/v1/common/role/add",
              "method": "post",
              data: {
                name: that.param.name,//角色名
                role_group: that.role_group,//角色组
                code: that.param.code,//代码
                // hotel_id: that.hotel_id,//酒店id
                status: that.normal + "",//状态
                desc: that.param.desc,//中文备注
                desc_en: that.param.desc_en,//英文备注
                hotel_group_id: parseInt(sessionStorage.getItem("group_id"))
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  that.dialogVisible_role = false;
                  that.part();
                  this.hintInfo("success", "新增角色成功")
                  this.$emit('children')
                }
                else {
                  console.log(res.data.message);
                  that.hintInfo("warning", "新增角色失败："+res.data.message)
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      },


      /**
       * 点击权限
       * */
      //点击新增权限后的保存
      saveInfo_rower() {
        let that = this;
        if (!that.param.name || !that.rule_groups || !that.param.code || !that.normal) {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.url_url + "/v1/common/rule/add",
            method: "post",
            data: {
              name: that.param.name,//角色名
              rule_group: that.rule_groups,//权限组
              code: that.param.code,//代码
              status: that.normal + "",//状态
              desc: that.param.desc,//中文备注
              desc_en: that.param.desc_en,//英文备注
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.dialogVisible_rower = false;
                that.power();
                that.hintInfo("success", "新增权限成功");
                this.$emit('children')
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
      //点击权限上的修改弹出蒙版层
      revision(srow, id, index, list) {
        console.log(srow, id);
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level !== 1) {
          this.hintInfo("warning", "您没有此权限")
        } else {
          this.title_head = "修改权限"
          this.revamp_rower = true;
          this.permission_name = srow.name;//权限名称
          this.url = srow.url;//url
          this.status_bar = srow.status + "";
          if (srow.rule_group === null) {
            this.rule_groups = ""
          } else {
            this.rule_groups = srow.rule_group.id
          }
          // this.rule_groups=srow.rule_group.name
          this.permission_name_id = srow.id;//id
          this.chinese_name = srow.desc;//中文备注
          this.english_name = srow.desc_en;//英文备注
          if (srow.page_id === null) {
            this.associated = srow.page_id;//关联页面
          } else {
            this.associated = srow.page_id.name;//关联页面
          }

          // this.associated_id = srow.page_id.id
          console.log(this.permission_name_id);
        }
      },
      //点击权限上的删除
      cance(id, index, list) {
        console.log(id);
        console.log(index);
        console.log(list);
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          list.splice(index, 1);
          this.$axios({
            url: "" + this.url_url + "/v1/common/rule/remove/" + id,
            method: "post",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                this.power();
                this.$emit('children');
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
      //点击权限上的修改后的保存
      keep() {
        let that = this;
        if (!that.permission_name || !that.rule_groups || !that.status_bar) {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.url_url + "/v1/common/rule/update/" + that.permission_name_id,
            // url:'http://192.168.2.154:9519/v1/common/rule/update/'+this.permission_name_id,
            method: "post",
            // params:{},
            data: {
              name: that.permission_name,
              desc: that.chinese_name,
              desc_en: that.english_name,
              status: that.status_bar + "",
              url: that.url,
              rule_group: that.rule_groups,
              // page_id: that.associated_id,

            },
          })
            .then(res => {
              console.log(res);
              if (res.data.message === "success") {
                // location.reload();  //强制刷新
                that.power();
                that.revamp_rower = false;
                that.hintInfo("success", "修改权限成功")
                // console.log(that.permission_name);
                that.$emit('children')
                // that.power_total=5
              } else {
                console.log(res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            })
        }
      },
      //点击编辑权限出现的页面
      compile_power(id, index) {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if(id.is_sys===1){
          if (root_level === 1 ||root_level === 2) {
            console.log(id);
            that.toData = [];
            that.title_head = "编辑权限"
            that.authority = id.name;
            that.role_id = id.id;
            that.rolePrivileges();//获取所有权限
            that.role_referrer();//查询角色已有权限
            that.dialogVisible = true;
          } else {
            that.hintInfo("warning", "您没有此操作的权限")
          }
        }else if(id.is_sys===0){
          if (root_level !== 1 ) {
            console.log(id);
            that.toData = [];
            that.title_head = "编辑权限"
            that.authority = id.name;
            that.role_id = id.id;
            that.rolePrivileges();//获取所有权限
            that.dialogVisible = true;

          } else {
            that.hintInfo("warning", "您没有此操作的权限")
          }
        }
      },
      //封装获取角色权限--树形格式
      rolePrivileges() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/fork_rule_group/get_tree",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              // console.log(res.data.data);
              that.bind_list = res.data.data;
              that.role_referrer();//查询角色已有权限
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //查看角色已有的权限
      role_referrer() {
        let that = this;
        console.log(that.role_id);
        that.$axios({
          url: that.url_url + "/v1/common/role/get_tree",
          method: "post",
          data: {
            role_id: that.role_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              // console.log(res.data.data);
              that.toData = res.data.data;
              console.log(that.bind_list, that.toData);
            }
            else {
              console.log(res.data.message);
              that.hintInfo("warning", res.data.message)
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //新增权限
      rower_item() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1) {
          that.dialogVisible_rower = true;
          that.title_head = "新增权限"
        } else {
          that.hintInfo("warning", "您没有此操作的权限")
        }

      },
      //点击编辑权限后的保存
      ensure() {
        console.log(this.role_id);
        let that = this;
        //传给后台两个值
        //1：所点击的角色的id   that.role_id
        //2：所选中的权限组    that.role_checked
        let edule = 0;
        for (let item of  that.toData) {
          if (item.children.length === 0) {
            that.hintInfo("warning", "请选择权限组下的权限");
            edule++;
          } else {
            edule = 0;
          }

        }
        if (edule === 0) {
          let rule_groups = [];
          let rules = [];
          that.toData.forEach(item => {
            console.log(item.id)
            rule_groups.push(item.id);

          });
          for (let i = 0; i < that.toData.length; i++) {
            if (that.toData[i].children) {
              for (let test of that.toData[i].children) {
                rules.push(test.id)
              }

            }
          }
          console.log(rule_groups, rules);
          that.$axios({
            url: that.url_url + "/v1/common/role/bind_rule_group",
            method: "post",
            data: {
              role_id: that.role_id,//所点击的id
              rule_groups: JSON.stringify(rule_groups),//选中的url
              rules: JSON.stringify(rules),
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res.data);
                that.dialogVisible = false;
                that.hintInfo("success", "编辑权限成功")
              }
              else {
                console.log(res.data.message);
                that.hintInfo("warning", "编辑权限失败");
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      //点击url出现的页面
      compile(id, index) {
        console.log(id);
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        console.log(root_level);
        if (root_level === 1 || root_level === 2) {
          that.checkedNames = [];
          that.authority = id.name;
          that.permission_id = id.id;
          // console.log( that.permission_id)
          that.title_head = "编辑url"
          that.url_methodes();
          that.bind_url();
          that.dialogVisibleurl = true;
          that.arg = "";
        } else {
          that.hintInfo("warning", "您没有此操作的权限")
        }
      },
      //封装获得已有的url
      bind_url() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/api/info_list",
          method: "post",
          data: {
            rule_id: that.permission_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.check_data = res.data.data.list;
              if (that.check_data.length !== 0) {
                that.main_url = that.check_data[0].id;
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
      saveInfo_url() {
        let that = this;
        if (that.checkedNames.length !== 0) {
          if (that.main_url === "") {
            that.hintInfo("warning", "请选择主url")
          } else {
            that.$axios({
              url: that.url_url + "/v1/common/rule/bind_api",
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
                  that.dialogVisibleurl = false;
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
              });
          }

        } else {
          that.$axios({
            url: that.url_url + "/v1/common/rule/bind_api",
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
                that.dialogVisibleurl = false;
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
          url: "" + that.url_url + "/v1/common/api/info_list",
          method: "post",
          data: {
            name: that.site_url,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
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
        that.curPage = page;
        //获取信息列表
        that.$axios({
          "url": "" + that.url_url + "/v1/common/rule/info_list",
          "method": "get",
          params: {
            page_num: page,
            page_size: 10,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
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
      //点击取消
      cancel() {
        let that = this;
        that.permission = "";
        that.power();
      },
      //点击蒙版的取消
      abolish() {
        this.masking = false
        this.name = '',
          this.desc_en = '',
          this.code = '',
          this.root_id = '',
          this.has_entry = '',
          this.url = '',
          this.creator = '',
          this.create_time = '',
          this.last_time = '',
          this.parent_id = ''

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

<style lang="less" scoped>
  .role-privileges {
    width: 97%;
    height: 95%;
    margin: 0 10px;
    .paging-title {
      display: inline-block;
      div {
        display: inline-block;
      }
      .dialog-style {
        .mask_information {
          margin-left: 20px;
          li {
            margin-right: 10%;
            margin-bottom: 10px;
            span {
              display: inline-block;
              width: 100px;
              text-align: left;
            }
          }
        }
      }
    }
    .seek {
      button {
        width: 90px;
        height: 30px;
        border: none;
        outline: none;
        margin-right: 28px;
        background: rgba(68, 136, 233, 1);
        border-radius: 4px;
        color: white;
      }
    }
    .paging_rule {
      overflow: hidden;
      background: rgba(255, 255, 255, 1);
      .title {
        width: 100%;
        height: 40px;
        background: #68819EFF;
        margin-right: 104px;
        line-height: 40px;
        display: flex;
        li {
          font-size: 14px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
          flex-grow: 1;
          margin-left: 20px;;
        }
      }
      .amend, .save {
        width: 100%;
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #EDEDED;
        margin-bottom: 7px;
        position: relative;
        input {
          width: 101.7px;
          background: rgba(247, 247, 247, 1);
          outline: none;
          text-align: center;
        }
        div {
          position: absolute;
          top: 0px;
          right: 0;
          span {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(104, 129, 158, 1);
          }
        }
      }
    }
    .paging {
      overflow: hidden;
      background: rgba(255, 255, 255, 1);
      .title {
        width: 100%;
        height: 40px;
        background: #68819EFF;
        margin-right: 104px;
        line-height: 40px;
        display: flex;
        li {
          font-size: 14px;
          font-family: Adobe Heiti Std R;
          font-weight: normal;
          color: rgba(255, 255, 255, 1);
          flex-grow: 1;
          margin-left: 20px;;
        }
      }
      .amend, .save {
        width: 100%;
        height: 44px;
        line-height: 44px;
        border-bottom: 1px solid #EDEDED;
        margin-bottom: 7px;
        position: relative;
        input {
          width: 101.7px;
          background: rgba(247, 247, 247, 1);
          outline: none;
          text-align: center;
        }
        div {
          position: absolute;
          top: 0px;
          right: 0;
          span {
            font-size: 14px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(104, 129, 158, 1);
          }
        }
      }
    }
    /*蒙版层*/
    .mask_information {
      background: white;
      li {
        margin-top: 10px;
        span {
          width: 100px;
          display: inline-block;
          text-align: left;
        }
        button {
          width: 80px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          background: rgba(68, 136, 233, 1);
          color: white;
          border: none;
          border-radius: 4px;
          outline: none;
          margin-left: 20px;
        }
      }

    }

  }
</style>

