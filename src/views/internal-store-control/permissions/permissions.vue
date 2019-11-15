<template>
  <div class="permissions">
    <div class="tree" >
      <el-container style="height: 100%;">
        <el-header  style="padding: 0;height:40%">
          <div class="moduleTree"><span style="color: black">角色组</span></div>
          <div class="content">
            <div class="control">
              <el-tree
                :data="role_set"
                node-key="node.id"
                :expand-on-click-node="false"
                node-contextmenu
                :highlight-current="highlight"
                @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="position: absolute;right: 20px">
                      <!-- v-show="setpro"-->
                      <i class="el-icon-edit" style="margin-right: 30px " @click="() => revise(node, data)"
                         title="修改角色组"></i>
                      <i class="el-icon-delete" @click="() => cancel  (node, data)" style="margin-right: 30px "
                         title="删除角色组"></i>
                      <!--<i class="el-icon-circle-plus" @click="() => append(data)" style="margin-right: 30px "></i>-->
                    </span>
                 </span>
              </el-tree>
              <!--<p @click="add();dialogVisible_hint=true" title="新增角色组">+</p>-->

            </div>
          </div>
          <p @click="add();dialogVisible_hint=true"
             style="margin-top: 10px;padding-left: 100px ; font-size: 16px;background: white ;border: 1px solid #eeeeee;color: #4488E9;padding: 5px 60px">
            <span style="font-size:18px;margin-right: 6px">+</span>新增角色组</p>
        </el-header>
        <el-main style="padding: 0;height:32%;margin-top: 10px;overflow: hidden" >
          <div class="moduleTree" style="margin-top: 10px">业务权限组</div>
          <div class="content"  >
            <div class="control">
              <el-tree
                :data="permission_group"
                node-key="id"
                :expand-on-click-node="true"
                node-contextmenu
                style="font-size: 14px;"
                :highlight-current="highlight_group"
                @node-click="nodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id" >{{data.name}}</span>
                      <span  v-if="data.children" style="position: absolute;right: 20px">
                      <i class="el-icon-edit" style="margin-right: 10px " @click="() => amend(node, data)"
                         title="修改权限组"></i>
                      <i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 10px "
                         title="删除权限组"></i>
                      <i class="el-icon-setting" @click="() => redact(data)" style="margin-right: 10px "
                         title="绑定权限"></i>
                    </span>
                    </span>
              </el-tree>
              <!--<p @click="append();dialogVisible_role=true" style="font-size: 16px">新增权限组</p>-->
            </div>
          </div>
          <p @click="append();"
             style="margin-top: 10px;padding-left: 100px ; font-size: 16px;background: white ;border: 1px solid #eeeeee;color: #4488E9;padding: 5px 60px">
            <span style="font-size:18px;margin-right: 6px">+</span>新增权限组</p>
        </el-main>
      </el-container>



    </div>

    <div class="router">
      <child ref="mychild" :role_set="role_set" :permission_group="permission_group" @children="refresh_father"
             @led_rule="led_group" @led="led_hight" :role_index="role_index" :rule_index="rule_index"></child>
    </div>
    <div class="ini">
      <logon-view></logon-view>
    </div>
    <!--新增角色组-->
    <el-dialog
      :visible.sync="dialogVisible_hint"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose" class="dialog-style">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <ul class="mask_information">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li v-if="root_group">
          <i style="color: red;font-size: 18px">*</i>
          <span>酒店</span>
          <el-select v-model="hotel_id" placeholder="请选择" size="mini" style="width: 217px;">
            <el-option
              v-for="item in part_hotel_list"
              :key="item.value"
              :label="item.full_name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>角色组名称</span>
          <el-input v-model="name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>代码</span>
          <el-input v-model="code" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>

        <li>
          <span style="margin-left: 10px">中文备注</span>
          <el-input v-model="desc" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
        </li>
        <li>
          <span style="margin-left: 10px">英文备注</span>
          <el-input v-model="desc_en" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>
        <li v-show="root_sys">
          <span style="margin-left: 10px">系统码</span>
          <el-radio v-model="is_sys" label="1">是</el-radio>
          <el-radio v-model="is_sys" label="0">否</el-radio>
        </li>
        <li v-show="root_man">
          <span style="margin-left: 10px">集团码</span>
          <el-radio v-model="is_group" label="1">是</el-radio>
          <el-radio v-model="is_group" label="0">否</el-radio>
        </li>
        <li>
          <span style="margin-left: 10px">状态</span>
          <el-radio v-model="status" label="1">可用</el-radio>
          <el-radio v-model="status" label="0">禁用</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_hint = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" conserve()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!--修改角色组-->
    <el-dialog
      :visible.sync="dialog_hint"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose" class="dialog-style">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <ul class="mask_information">
        <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
        <li v-if="root_sys">
          <span style="margin-left: 10px">酒店</span>
          <el-select v-model="pub" placeholder="请选择" disabled size="mini" style="width: 217px;">
            <el-option
              v-for="item in part_hotel_list"
              :key="item.value"
              :label="item.full_name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>角色组名称</span>
          <el-input v-model="name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>
        <li>
          <i style="color: red;font-size: 18px">*</i>
          <span>代码</span>
          <el-input v-model="code" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>

        <li>
          <span style="margin-left: 10px">中文备注</span>
          <el-input v-model="desc" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
        </li>
        <li>
          <span style="margin-left: 10px">英文备注</span>
          <el-input v-model="desc_en" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>
        <li v-show="root_sys">
          <span style="margin-left: 10px">系统码</span>
          <el-radio v-model="is_sys" label="1">是</el-radio>
          <el-radio v-model="is_sys" label="0">否</el-radio>
        </li>
        <li v-show="root_man">
          <span style="margin-left: 10px">集团码</span>
          <el-radio v-model="is_group" label="1">是</el-radio>
          <el-radio v-model="is_group" label="0">否</el-radio>
        </li>
        <li>
          <span style="margin-left: 10px">状态</span>
          <el-radio v-model="status" label="1">可用</el-radio>
          <el-radio v-model="status" label="0">禁用</el-radio>
        </li>

      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialog_hint = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" preserve()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!--新增权限组-->
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
          <el-input v-model="permission_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>
        <li>
          <span style="margin-left: 10px">中文备注：</span>
          <el-input v-model="chinese_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
        </li>
        <li>
          <span style="margin-left: 10px">英文备注：</span>
          <el-input v-model="english_name" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
        </li>
        <li>
          <span style="margin-left: 10px">排序值：</span>
          <el-input v-model="order" type="number" style="width: 217px;ime-mode:Disabled" min=1
                    onkeyup="value=(parseInt((value=value.replace(/\D/g,''))==''||parseInt((value=value.replace(/\D/g,''))==0)?'1':value,10))"
                    onafterpaste="value=(parseInt((value=value.replace(/\D/g,''))==''||parseInt((value=value.replace(/\D/g,''))==0)?'1':value,10))"

                    placeholder="请输入内容排序值" size="mini"></el-input>
        </li>
        <!--<li>-->
        <!--<span style="margin-left: 10px">状态</span>-->
        <!--<el-radio v-model="status" label="1">可用</el-radio>-->
        <!--<el-radio v-model="status" label="0">禁用</el-radio>-->
        <!--</li>-->
        <li v-show="sys_group">
          <span style="margin-left: 10px">集团码</span>
          <el-radio v-model="is_group" label="1">是</el-radio>
          <el-radio v-model="is_group" label="0">否</el-radio>
        </li>
        <li v-show="sys_group">
          <span style="margin-left: 10px">系统码</span>
          <el-radio v-model="is_sys" label="1">是</el-radio>
          <el-radio v-model="is_sys" label="0">否</el-radio>
        </li>

        <!--<li v-show="hotel_pub" style="margin-top:50px ;"><button @click="abolish">取消</button><button @click="keep">保存</button> </li>-->
        <!--<li v-show="pub_hotel" style="margin-top:50px;"><button @click="abolish">取消</button><button @click="keep_pub">保存</button> </li>-->
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible_role = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" keep()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!--修改权限组-->
    <el-dialog
      :visible.sync="dialog"
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
          <el-input v-model="permission_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
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
        <!--<span style="margin-left: 10px">状态</span>-->
        <!--<el-radio v-model="status" label="1">可用</el-radio>-->
        <!--<el-radio v-model="status" label="0">禁用</el-radio>-->
        <!--</li>-->
        <!--是否是集团码，是否系统码，只有在系统管理员登陆的时候才会展示，酒店管理员两个都不用展示-->
        <li v-show="sys_group">
          <span style="margin-left: 10px">集团码</span>
          <el-radio v-model="is_group" label="1">是</el-radio>
          <el-radio v-model="is_group" label="0">否</el-radio>
        </li>
        <li v-show="sys_group">
          <span style="margin-left: 10px">系统码</span>
          <el-radio v-model="is_sys" label="1">是</el-radio>
          <el-radio v-model="is_sys" label="0">否</el-radio>
        </li>

        <!--<li v-show="hotel_pub" style="margin-top:50px ;"><button @click="abolish">取消</button><button @click="keep">保存</button> </li>-->
        <!--<li v-show="pub_hotel" style="margin-top:50px;"><button @click="abolish">取消</button><button @click="keep_pub">保存</button> </li>-->
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialog = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" keep_pub()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!--给权限组添加权限-->
    <!--编辑权限出现的页面-->
    <el-dialog
      title="编辑权限"
      :visible.sync="dialog_redact"
      :close-on-click-modal='false'
      width="58%"
      :before-close="handleClose" class="dialog-style">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name">为<span
          style="color: #4488E9">{{authority_name}}</span>权限组{{title }}</span>
      </div>
      <ul class="mask_information" style="overflow: hidden;">
        <!--<tree-transfer :title="title" :from_data='rulelists' :to_data='toData'  :defaultProps="{label:'name'}"-->
        <!--    @addBtn='add' @removeBtn='remove' :mode='mode' height='450px'  width="700px" style="float: left">   -->
        <!--</tree-transfer>-->
        <li>
          <el-input placeholder="请输入权限名称" size="mini" style="width: 240px;" v-model="role_name"></el-input>
          <el-button type="primary" size="mini" @click="inquire">查询</el-button>
        </li>
        <el-transfer
          v-model="checkedNames"
          style="float: left;"
          :props="{key: 'id',label: 'name'}"
          :titles="['权限组未绑定权限', '权限组已绑定权限 ']"
          @change="handleChange"
          :data="rulelists"
        ></el-transfer>
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialog_redact = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import Child from './role-privileges';
  import treeTransfer from 'el-tree-transfer';

  let id = 1000;
  export default {
    name: "permissions",
    components: {
      child: Child
    },
    data() {
      const data = [{}];
      return {
        options: [{
          value: '0',
          name: '禁用'
        }, {
          value: '1',
          name: '可用'
        }],
        title: '',
        value: '',
        url_url: this.api.api_9022_9519,
        activeName2: 'first',
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data)),
        index: this.data,
        setpro_group: false,//权限组的添加修改
        authorization_token: '',//获取token值
        permission_group: [],//获取后台传的权限数组
        masking: false,//蒙版层
        dialogVisible_hint: false,//新增角色组
        dialog_hint: false,//修改权限组
        right_control: false,//点击权限的修改显示和隐藏
        dialogVisible_role: false,//新增权限显示与隐藏
        dialog: false,//修改权限的显示与隐藏
        permission_hotel: '',//添加权限组下的酒店
        // 蒙版里的角色信息
        name: '',////角色名
        role_group: '',//角色组
        roles_id: '',//传给后台的所选择的角色组id
        code: '',//代码
        status: '1',//状态
        is_sys: '1',
        is_group: '1',
        order: 1,
        sys_group: false,
        desc: '',//中文备注
        desc_en: '',//英文备注
        hotel_id: '',//酒店
        grogshop_id: '',//点击修改后传给后台的酒店id
        role_set: [],//接受后台返回的角色组渲染蒙版层里的角色组
        root_id: '',//模块种类
        has_entry: '',//模块类型
        url: '',//链接
        newlists: [],//接受后端传过来的数据
        setpro: false,//模块树上的图标显示和隐藏
        save_add: false,//点击加号显示的保存和取消
        save_childen: false,//点击自身图标显示的保存和取消
        save_preserve: false,//点击修改显示的保存和取消
        //  蒙版里的权限信息
        permission_name: '',//权限名称
        status_bar: '',//状态
        chinese_name: '',//中文备注
        english_name: '',//英文备注
        associated: '',//关联页面
        permission_name_id: '',//权限修改传给后台的id
        role_set_id: '',//角色组修改传给后台的id
        pub: '',//点击自身的修改  权限组的酒店
        pub_hotel: false,//点击自身修改显示的 权限组的酒店
        hotel_pub: false,//  点击加号显示的 权限组的酒店
        part_hotel_list: [],//获取角色组的酒店
        group_id: "",//集团id
        role_index: '',//角色组传给子组件id
        rule_index: '',//权限组传给子组件id
        root_man: false,
        root_group:false,//集团码的显示
        root_sys:false,//判断显示不显示是不是系统码
        /**给业务权限组添加权限*/
        dialog_redact: false,//点击绑定权限出现的页面
        authority_name: '',//点击的权限组
        rulelists: [],//权限
        mode: "transfer", // transfer addressList
        toData: [],//选中的所有的权限
        checkedNames: [],
        permission_id: '',//选中的权限组id绑定权限使用
        highlight: true,//角色组显示高亮
        highlight_group: true,//权限组显示高亮
        role_name:'',//查询权限时的权限名称

      };
    },
    created: function () {
      let that = this;
      //获取角色组数据
      that.part();
      //  获取权限组
      that.permission_data();
      //获取集团--从而获取酒店
      that.full();

    },
    methods: {
      //  刷新数据
      refresh() {
        let that = this;
        that.name = "";
        that.code = "";
        that.status = "1";
        that.desc = "";
        that.desc_en = "";
        that.hotel_id = "";
      },
      //封装获取集团信息
      full() {
        let that = this;
        that.$axios({
          "url": that.url_url + "/v1/common/hotel_group/info_list",
          "method": "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data);
              that.group_id = res.data.data.list[0].id;
              sessionStorage.setItem("group_id", res.data.data.list[0].id)
              that.part_hotel();
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取权限组的函数
      permission_data() {
        let that = this
        that.$axios({
          url: "" + that.url_url + "/v1/common/fork_rule_group/get_tree",
          method: "post",
          data: {
            // only: JSON.stringify(['id', 'name','desc','desc_en','status','code',]),
            page_size: 999,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.permission_group = res.data.data
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
      //封装获取角色组的函数
      part() {
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
              console.log(res);
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
              console.log(that.permission_group);

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
      //封装获取角色组的酒店
      part_hotel() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/hotel/info_list",
          method: "post",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res)
              that.part_hotel_list = res.data.data.list;
              console.log(that.part_hotel_list[0].id);
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**子组件触发父组件方法*/
      refresh_father() {
        let that = this;
        that.part();
        that.permission();
      },
      led_hight() {
        let that = this;
        that.highlight = false;
      },
      led_group() {
        let that = this;
        that.highlight_group = false;
      },
      // 检查去重
      check_repeat(field, keyword) {
        // console.log(this.urls.indexOf(keyword));
        // field 字段名
        //keyworld 输入值
        // 关键词
        if (field === "name") {
          if (this.names.indexOf(keyword) == -1) {
            // alert("bu重复")
          } else {
            alert("输入内容已存在，请检查后重新输入")
          }
        }
        else if (field === "name") {
          if (this.permission_name.indexOf(keyword) == -1) {
            // alert("bu重复")
          } else {
            alert("输入内容已存在，请检查后重新输入")
          }
        }
        else {
          //
        }
      },
      //当添加信息里的模块代码，链接 失焦事件
      unfocused(field, keyword) {
        this.check_repeat(field, keyword);
      },
      // 点击角色组的节点显示编辑和删除
      handleNodeClick(index) {
        this.setpro = true;
        console.log(index);
        this.highlight = true;
        this.role_index = index.id;
      },
      // 点击权限组的节点显示编辑和删除
      nodeClick(index) {
        this.setpro_group = true;
        console.log(index);
        this.highlight_group = true;
        if (index.children) {
          this.rule_index = index.id;
        } else {
          this.rule_index = undefined;
        }

      },
      //点击角色组的加号
      add() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1 ) {
          that.root_sys=true
          that.root_group = true;
        }else if(root_level===2){
          that.root_group = true;
          that.root_man = true;
        }
        // if( root_level===3) {
        that.refresh();
        that.title = "新增角色组"
      },
      //点击角色组的加号后的保存
      conserve() {
        let that = this;
        console.log(that.hotel_id);
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1) {
          if (!that.name || !that.status || !that.code || !that.hotel_id) {
            that.hintInfo("warning", "*为必填项")
          } else {
            console.log(that.creator)
            that.$axios({
              url: that.url_url + "/v1/common/role_group/add",
              method: "post",
              // params:{},
              data: {
                name: that.name,
                desc: that.desc,
                desc_en: that.desc_en,
                code: that.code,
                status: that.status + "",
                hotel_id: that.hotel_id,
                hotel_group_id: that.group_id,
                // url:this.url,
                is_sys:that.is_sys,
                is_group:that.is_group

              },
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  that.dialogVisible_hint = false
                  console.log(that.name);
                  that.part();
                  that.hintInfo("success", "添加角色组成功")
                  that.$refs.mychild.break();//成功后调用子组件方法
                } else {
                  console.log(res.data.message);
                  if (res.data.message.search("duplicated value") !== -1) {
                    that.hintInfo("warning", "角色组名或代码重复，请检查后重新输入")
                  }
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        }else if(root_level === 2) {
          if (!that.name || !that.status || !that.code || !that.hotel_id) {
            that.hintInfo("warning", "*为必填项")
          } else {
            console.log(that.creator)
            that.$axios({
              url: that.url_url + "/v1/common/role_group/add",
              method: "post",
              // params:{},
              data: {
                name: that.name,
                desc: that.desc,
                desc_en: that.desc_en,
                code: that.code,
                status: that.status + "",
                hotel_id: that.hotel_id,
                hotel_group_id: that.group_id,
                // url:this.url,
                // is_sys:that.is_sys,
                is_group:that.is_group

              },
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  that.dialogVisible_hint = false
                  console.log(that.name);
                  that.part();
                  that.hintInfo("success", "添加角色组成功")
                  that.$refs.mychild.break();//成功后调用子组件方法
                } else {
                  console.log(res.data.message);
                  if (res.data.message.search("duplicated value") !== -1) {
                    that.hintInfo("warning", "角色组名或代码重复，请检查后重新输入")
                  }
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        }

        else {
          if (!that.name || !that.status || !that.code) {
            that.hintInfo("warning", "*为必填项")
          } else {
            console.log(this.creator)
            that.$axios({
              url: that.url_url + "/v1/common/role_group/add",
              method: "post",
              // params:{},
              data: {
                name: that.name,
                desc: that.desc,
                desc_en: that.desc_en,
                code: that.code,
                status: that.status + "",
                // hotel_id: this.hotel_id,
                hotel_group_id: that.group_id,
                // url:this.url,

              },
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  that.dialogVisible_hint = false
                  console.log(that.name);
                  that.part();
                  that.hintInfo("success", "添加角色组成功")
                  that.$refs.mychild.break();//成功后调用子组件方法
                } else {
                  console.log(res.data.message);
                  if (res.data.message.search("duplicated value") !== -1) {
                    that.hintInfo("warning", "角色组名或代码重复，请检查后重新输入")
                  }
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        }
      },
      //点击角色组自身的修改
      revise(node, data) {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        console.log(root_level);
        if (root_level === 1) {
          // that.root_man = true;
          that.root_sys=true;
          that.root_group = true;
          that.dialog_hint = true;
        } else {
          that.root_man = false;
          that.root_group = true;
          if(data.is_sys===1){
            this.hintInfo("warning", "权限不足")
          }else {
            that.dialog_hint = true;
          }
        }
        console.log(node, data);
        that.title = "修改角色组"
        that.name = data.name;
        that.code = data.code;
        that.desc = data.desc;
        that.desc_en = data.desc_en;
        that.pub = data.hotel_id.id;
        that.role_set_id = data.id;
        that.status = data.status + "";

      },
      //点击角色组自身修改后的保存
      preserve() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1) {
          if (!that.name || !that.status || !that.code) {
            that.hintInfo("warning", "*为必填项")
          } else {
            console.log('保存');
            that.$axios({
              url: that.url_url + "/v1/common/role_group/update/" + that.role_set_id,
              method: "post",
              // params:{},
              data: {
                name: that.name,
                code: that.code,
                desc: that.desc,
                desc_en: that.desc_en,
                status: that.status + "",
                hotel_id: that.pub,
                is_sys:that.is_sys,
                is_group:that.is_group
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  //location.reload();  //强制刷新
                  console.log(that.name);
                  that.part();
                  that.dialog_hint = false;
                  that.hintInfo("success", "角色组修改成功")
                  that.$refs.mychild.break();//成功后调用子组件方法
                } else {
                  console.log(res.data.message);
                  if (res.data.message.search("Duplicate entry") !== -1) {
                    that.hintInfo("warning", "角色组名或代码重复，请检查后重新输入")
                  }
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        } else {
          if (!that.name || !that.status || !that.code) {
            that.hintInfo("warning", "*为必填项")
          } else {
            console.log('保存');
            that.$axios({
              url: that.url_url + "/v1/common/role_group/update/" + that.role_set_id,
              method: "post",
              // params:{},
              data: {
                name: that.name,
                code: that.code,
                desc: that.desc,
                desc_en: that.desc_en,
                status: that.status + "",
                // hotel_id: this.pub,

              },
            })
              .then(res => {

                if (res.data.message === "success") {
                  //location.reload();  //强制刷新
                  console.log(that.name);
                  that.part();
                  that.dialog_hint = false;
                  that.hintInfo("success", "角色组修改成功")
                  that.$refs.mychild.break();//成功后调用子组件方法
                } else {
                  console.log(res.data.message);
                  if (res.data.message.search("Duplicate entry") !== -1) {
                    that.hintInfo("warning", "角色组名或代码重复，请检查后重新输入")
                  }
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        }
      },

      //点击权限上添加保存
      // ||!this.permission_hotel
      keep() {
        let that = this;
        if (!that.permission_name) {
          that.hintInfo("warning", "*为必填项")
        } else {
          console.log("保存");
          console.log(this.creator);
          let root_level = parseInt(sessionStorage.getItem("root_level"));
          if (root_level === 1) {
            that.$axios({
              url: that.url_url + "/v1/common/fork_rule_group/add",
              method: "post",
              data: {
                name: that.permission_name,
                desc: that.chinese_name,
                desc_en: that.english_name,
                order: that.order,
                is_sys: that.is_sys,
                is_group: that.is_group,
                // hotel_id: this.permission_hotel
                // url:this.url,

              },
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  that.dialogVisible_role = false
                  // that.permission();
                  that.permission_data();
                  that.hintInfo("success", "添加权限组成功");
                  that.$refs.mychild.break();//成功后调用子组件方法
                } else {
                  console.log(res.data.message);
                  that.hintInfo("warning", res.data.message);
                }

              })
              .catch(error => {
                console.log(error);
                that.hintInfo("warning", "添加权限组失败")
              })
          } else {
            that.$axios({
              url: that.url_url + "/v1/common/fork_rule_group/add",
              method: "post",
              data: {
                name: that.permission_name,
                desc: that.chinese_name,
                desc_en: that.english_name,
                order: that.order,
                // status: this.status,
                // hotel_id: this.permission_hotel
                // url:this.url,

              },
            })
              .then(res => {
                console.log(res);
                if (res.data.message === "success") {
                  that.dialogVisible_role = false
                  console.log(that.permission_name);
                  // that.permission();
                  that.permission_data();
                  that.hintInfo("success", "添加权限组成功")
                  that.$refs.mychild.break();//成功后调用子组件方法
                } else {
                  console.log(res.data.message)
                  that.hintInfo("warning", res.data.message);
                }

              })
              .catch(error => {
                console.log(error);
                this.hintInfo("warning", "添加权限组失败")
              })
          }

        }
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
          this.parent_id = '',
          this.order = ''

      },

      handleClick(tab, event) {
        // console.log(tab, event);
      },
      //权限组加号的添加
      append() {
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        console.log(root_level);
        let that = this;
        if (root_level === 1) {
          that.sys_group = true;

        } else {
          that.sys_group = false;
        }
        that.title = "新增权限组";
        that.dialogVisible_role = true;
        that.right_control = true;
        that.pub_hotel = false;//点击自身修改显示的 权限组的酒店
        that.hotel_pub = true;//  点击加号显示的 权限组的酒店
        that.permission_name = "",
          that.order = 1,
          that.chinese_name = "",
          that.english_name = "",
          that.permission_hotel = "",
          that.is_group = '1',
          that.is_sys = '1'

      },

      //权限组自身的修改
      amend(node, data) {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if( root_level!==1) {
          this.hintInfo("warning","您没有此权限")
        }else {
        console.log(node, data)
        this.title = "修改权限组"
        this.right_control = true;
        this.dialog = true;
        this.permission_name = node.data.name;//权限名称
        // this.status_bar=node.data.status;//状态
        this.permission_name_id = node.data.id;//id
        this.chinese_name = node.data.desc;//中文备注
        this.english_name = node.data.desc_en;//英文备注
        this.pub = node.data.hotel_id;
        }
      },
      //权限组自身修改后的保存
      keep_pub() {
        if (!this.permission_name) {
          this.hintInfo("warning", "*为必填项")
        } else {
          console.log("保存");
          this.$axios({
            url: this.url_url + "/v1/common/fork_rule_group/update/" + this.permission_name_id,
            method: "post",
            // params:{},
            data: {
              name: this.permission_name,
              desc: this.chinese_name,
              desc_en: this.english_name,
              order: this.order,
            },
          })
            .then(res => {
              console.log(res);
              if (res.data.message === "success") {
                // location.reload();  //强制刷新
                // this.permission();
                this.permission_data()
                this.dialog = false;
                this.hintInfo("success", "权限修改成功");
                this.$refs.mychild.break();//成功后调用子组件方法
              } else {
                console.log(res.data.message)
                this.hintInfo("warning", res.data.message)
              }

            })
            .catch(error => {
              console.log(error);
            })
        }
      },
      //角色组自身--删除
      cancel(node, data, index) {
        console.log(node, data);
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (root_level === 1) {
          let node_arr = [];
          let test = 0;
          if (node.data.roles) {
            for (let item of node.data.roles) {
              if (item.is_deleted === 0) {
                console.log("删除");
                test++;
                node_arr.push(item.is_deleted);
                console.log(item.is_deleted);
              } else {
                node_arr = [];
              }
            }
            console.log(node_arr);
              if (test !== 0) {
                this.hintInfo("warning", "角色组下存在角色，请先删除角色");
              } else {
                const parent = node.parent;
                const children = parent.data || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                let id = node.data.id
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  children.splice(index, 1);
                  this.$axios({
                    url: "" + this.url_url + "/v1/common/role_group/remove/" + id,
                    method: "post",
                  })
                    .then(res => {

                      if (res.data.message === "success") {
                        console.log(res)
                        this.$refs.mychild.break();//成功后调用子组件方法
                        // location.reload(); // 强制刷新
                      }

                    })
                    .catch(error => {
                      console.log(error);
                    })

                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '已取消删除',

                  });
                });
              }
          }
        }else {
          if(data.is_sys===1){
            this.hintInfo("warning", "无操作权限")
          }else {
            let node_arr = [];
            let test = 0;
            if (node.data.roles) {
              for (let item of node.data.roles) {
                if (item.is_deleted === 0) {
                  console.log("删除");
                  test++;
                  node_arr.push(item.is_deleted);
                  console.log(item.is_deleted);
                } else {
                  node_arr = [];
                }
              }
              console.log(node_arr);
              if (data.is_sys === 1) {
                this.hintInfo("warning", "无操作权限");
              }
              else {
                if (test !== 0) {
                  this.hintInfo("warning", "角色组下存在角色，请先删除角色");
                } else {
                  const parent = node.parent;
                  const children = parent.data || parent.data;
                  const index = children.findIndex(d => d.id === data.id);
                  let id = node.data.id
                  this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$message({
                      type: 'success',
                      message: '删除成功!'
                    });
                    children.splice(index, 1);
                    this.$axios({
                      url: "" + this.url_url + "/v1/common/role_group/remove/" + id,
                      method: "post",
                    })
                      .then(res => {

                        if (res.data.message === "success") {
                          console.log(res);
                          this.$refs.mychild.break();//成功后调用子组件方法
                          // location.reload(); // 强制刷新
                        }

                      })
                      .catch(error => {
                        console.log(error);
                      })

                  }).catch(() => {
                    this.$message({
                      type: 'info',
                      message: '已取消删除',

                    });
                  });
                }
              }
            }
          }
        }
      },
      //权限组自身---删除
      remove(node, data) {
        console.log(node, data);
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if( root_level!==1) {
          this.hintInfo("warning","您没有此权限")
        }else {
          if (node.childNodes.length === 0) {
            let id = node.data.id
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });

              this.$axios({
                url: this.url_url + "/v1/common/fork_rule_group/remove/" + id,
                method: "get",
              })
                .then(res => {
                  if (res.data.message === "success") {
                    console.log(res)
                    // location.reload(); // 强制刷新
                    this.$refs.mychild.break();//成功后调用子组件方法
                    // this.permission();
                    this.permission_data();
                  }

                })
                .catch(error => {
                  console.log(error);
                })

            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',

              });
            });
          } else {
            this.hintInfo("warning", "该权限组下存在权限，请先删除权限")
          }
        }
      },
      /**
       * 为权限组绑定权限
       * */
      //查询权限
      inquire(){
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/rule/info_list",
          method: "post",
          data: {
            rule_name:that.role_name,
            page_size:999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.rulelists = res.data.data.list;
            }
            else {
              // console.log(resp.data.message);
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
          url: that.url_url + "/v1/common/rule/info_list",
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.rulelists = res.data.data.list;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //业务权限组增加权限
      redact(data) {
        let that = this;
        console.log(data);
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if( root_level!==1) {
          this.hintInfo("warning","您没有此权限")
        }else {
          that.dialog_redact = true;
          that.title = "绑定权限";
          that.permission_id = data.id;
          that.authority_name = data.name;
          that.checkedNames = [];
          that.role_name = '';
          that.power();
          that.pinless();
        }
      },
      /**查看权限组已经绑定的权限*/
      pinless() {
        let that = this;
        that.$axios({
          url: that.url_url + "/v1/common/rule/info_list",
          method: "post",
          data: {
            fork_rule_groups: that.permission_id,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.hintInfo("success", "获取数据成功")
              console.log(res);
              for (let item of  res.data.data.list) {
                console.log(item.id);
                res.data.data.list.forEach(item => {
                  that.checkedNames.push(item.id)
                });

              }
              console.log(that.checkedNames);
            }
            else {
              that.hintInfo("warning", "获取数据失败")
            }
          })
          .catch(error => {
            console.log(error);
            that.hintInfo("warning", "获取数据失败")
          });


      },
      //穿梭框事件
      handleChange(value, direction, movedKeys) {
        let that = this;
        // console.log(direction);
        // console.log(movedKeys);//发生移动数据的数组
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
        if (direction === "right") {
          that.direction_tf = "1";

        }
        if (direction === "left") {
          that.direction_tf = "2";

        }

      },
      /**绑定权限后的保存*/
      ensure() {
        let that = this;
        console.log(that.checkedNames);
        that.$axios({
          url: that.url_url + "/v1/common/fork_rule_group/bind_rules",
          method: "post",
          data: {
            rule_group_id: that.permission_id,
            rule_ids: that.checkedNames,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.dialog_redact = false;
              that.permission();
              that.hintInfo("success", "绑定权限成功")
            }
          })
          .catch(error => {
            that.hintInfo("warning", "绑定权限失败")
          })
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
      //增加权限的显示隐藏
      handleClose(done) {
        done();
      },

    }
  }
</script>

<style lang="less" scoped>
  .permissions {
    width: 100%;
    height: 95%;
    /*overflow-y: scroll;*/
    //min-width: 1800px;
    position: relative;
    /*margin-top: 60px;*/
    overflow: hidden;
    .tree {
      height: 100%;
      width: 280px;
      /*min-height: 1000px;*/
      /*background:rgba(247,247,247,1);*/
      float: left;
      .serialNumber {
        height: 60px;
        line-height: 60px;
        font-size: 18px;
        padding-left: 20px;
        span {
          margin-left: 20px;
        }
      }
      .moduleTree {
        width: 100%;
        height: 40px;
        background: rgba(238, 238, 238, 1);
        font-size: 16px;
        font-family: Adobe Heiti Std R;
        font-weight: normal;
        color: black;
        line-height: 40px;
        margin-left: -15px;
        padding-left: 98px;
      }
      .content {
        width: 100%;
        height: 70%;
        /*background:rgba(247,247,247,1);*/
        overflow-y: scroll;
        .control {
          width: 100%;

          p {
            font-size: 26px;
            background: rgba(247, 247, 247, 1);
            padding-left: 84px;

          }
          .my_node{
            display: inline-block;
            width: 138px;
            overflow: hidden;
            text-overflow:ellipsis;
          }
          .my_node:hover{
            height: auto;
            word-break:break-all;
            white-space: pre-wrap;
            text-decoration: none;
          }
        }
      }

    }
    .router {
      width: calc(100% - 330px);
      /*height: 100%;*/
      font-size: 20px;
      float: left;
      /*overflow-y: scroll;*/
      white-space: nowrap;
      /*background: rgba(247, 247, 247, 1);*/

    }
    /*蒙版层*/
    .masking {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 13, 32, 0.3);
      z-index: 1000;
      .mask_information {
        width: 70%;
        height: 70%;
        background: white;
        margin: 7% auto;
        li {
          width: 45%;
          display: inline-block;
          margin-left: 30px;
          margin-top: 20px;
          float: left;
          span {
            width: 100px;
            display: inline-block;
            text-align: left;

          }
          button {
            width: 80px;
            height: 40px;
            line-height: 40px;
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
    .dialog-style {
      .mask_information {
        /*overflow: hidden;*/
        margin-left: 20px;
        li {
          /*width: 50%;*/
          /*float: left;*/
          margin-bottom: 10px;
          span {
            display: inline-block;
            width: 100px;
          }
        }
      }
    }
    .ini {
      height: 100%;
     float: right;

    }
  }
</style>

<style scoped>
  .content>>> .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background: #e9e9eb;
    border-radius: 4px;
    /*color: white;*/
  }

  .permissions>>> .el-transfer-panel {
    width: 336px;
  }
</style>
