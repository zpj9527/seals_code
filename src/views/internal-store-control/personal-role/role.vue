<template>
  <div class="role">
    <div class="head" style="width: 100%;height: 40px;margin-top: 10px">
      <span style="vertical-align: top;display: inline-block;font-size: 18px;">人员</span>
      <button @click="man_add();" class="btn" :disabled="isDisabled" data-code="/v1/common/employee/add"
              style="width: 80px;height: 27px;line-height: 27px;background: #4488e9;border:none;border-radius: 3px;color:white ;margin-left: 10px">
        新增
      </button>
      <div class="seek" style="float: right">
        <el-input v-model="personnel" placeholder="请输入人员名字" style="width: 160px;" size="mini" clearable @keyup.enter.native="find"></el-input>
        <el-button type="primary" size="mini" @click="find ">查询</el-button>
      </div>
    </div>
    <!--添加人员显示的-->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="50%"
      title="用户信息"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title_add }}</span>
      </div>
      <div class="dialogVisible_style">
        <div class="message">
          <!--<p style="font-weight: bold;font-size: 18px;margin-bottom: 10px"></p>-->
          <ul>
            <li>
              <span> <i style="color: red;font-size: 18px">*</i>用户姓名：</span>
              <el-input v-model="param.real_name" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
            </li>
            <li>
              <span >昵称：</span>
              <el-input v-model="param.nick_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <span> <i style="color: red;font-size: 18px">*</i>工号：</span>
              <el-input v-model="param.work_id " placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <span> <i style="color: red;font-size: 18px">*</i>用户账号：</span>
              <el-input v-model="param.user_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>用户密码：</span>
              <el-input v-model="param.password " placeholder="请输入内容" type="password" style="width: 217px;"
                        size="mini"></el-input>
            </li>
            <li>
              <span >生日：</span>
              <el-date-picker
                v-model="birth_date"
                type="date"
                style="width: 217px;"
                size="mini"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>部门：</span>
              <el-select v-model="dept_id" placeholder="请选择" size="mini" style="width: 217px;">
                <el-option
                  v-for="item in department_list"
                  :key="item.value"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>

            <li>
              <span >国籍：</span>
              <el-select v-model="country_code" placeholder="请选择" filterable size="mini" clearable
                         style="width: 217px;">
                <el-option
                  v-for="item in country_code_list"
                  :key="item.value"
                  :label="item.descript"
                  :value="item.code">
                </el-option>
              </el-select>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>手机号码：</span>
              <el-input v-model="param.phone" placeholder="请输入内容" style="width: 217px;" maxlength="11" size="mini"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </li>
            <li style="line-height: 28px">
              <span>人员状态：</span>
              <el-radio v-model="radio" label="1">正常</el-radio>
              <el-radio v-model="radio" label="0">停用</el-radio>
            </li>
            <li >
              <span>微信号：</span>
              <el-input v-model="param.wechat " placeholder="请输入内容" style="width: 217px;" maxlength="11"
                        size="mini"></el-input>
            </li>
            <li style="line-height: 28px">
              <span>性别：</span>
              <el-radio v-model="gender" label="男">男</el-radio>
              <el-radio v-model="gender" label="女">女</el-radio>
            </li>
            <li>
              <!--action="https://image.eloadspider.com/resource/employee/head_image/upload"-->
              <el-upload
                class="avatar-uploader"
                action="https://oss.crowncrystalhotel.com/resource/employee/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="src_log" :src="src_log" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">照片</i>
              </el-upload>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="saveInfo_role()" size="mini">确 定</el-button>
  </span>
    </el-dialog>
    <!--为人员增加角色显示的-->
    <el-dialog
      title="增加角色"
      :visible.sync="dialogVisible_power"
      :close-on-click-modal='false'
      width="60%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> 为 <span
          style="color: #4488E9">{{authority}}</span> {{ role_title }} </span>
      </div>
      <div class="dialogVisible_style">
        <!--<span style="display: inline-block;width: 290px;margin-bottom: 20px">可选择的权限</span>-->
        <!--<p style="display: inline-block;width: 198px;margin-bottom: 20px">增加角色人员名称 ：<span style="color:#4488e9"> {{authority}}</span></p>-->
        <!--<p style="font-weight: bold;font-size: 18px;margin-bottom: 10px">增加权限</p>-->
        <ul>
          <tree-transfer :title="title" :from_data='bind_list' :to_data='toData' :defaultProps="{label:'name'}"
                             @addBtn='add' @removeBtn='remove' height='400px' width="700px">   
          </tree-transfer>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible_power = false" size="mini">取 消</el-button>
          <el-button type="primary" @click=" saveInfo_power()" size="mini">确 定</el-button>
     </span>
    </el-dialog>
    <div class="paging">
      <!--模块列表-->
      <el-table
        :data="employee_list"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        @cell-dblclick="relieve"
        size="mini"
        style="width: 100%;">
        <el-table-column
          prop="real_name"
          fixed
          label="用户姓名">
        </el-table-column>
        <el-table-column
          prop="nick_name"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="user_name"
          label="用户登陆名">
        </el-table-column>
        <el-table-column
          prop="work_id"
          label="工号">
        </el-table-column>
        <el-table-column
          prop="status"
          label="人员状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">停用</span>
            <span v-else>正常</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          width="150"
          label="手机号">
        </el-table-column>
        <el-table-column
          prop="birth_date"
          width="150"
          label="生日">
        </el-table-column>
        <el-table-column
          prop="dept_id.name"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别">
        </el-table-column>


        <el-table-column
          prop="address"
          width="340"
          fixed="right"
          style="position: relative"
          label="操作">
          <template slot-scope="scope" >
            <el-button :disabled="show_hide_delete" @click="cancel(scope.row.id,scope.$index, employee_list)"
                       type="danger" size="mini" data-code="/v1/common/employee/remove">删除
            </el-button>
            <el-button :disabled="show_hide_update" size="small"
                       @click="submit(scope.row,scope.row.id,scope.$index, employee_list)"
                       data-code="/v1/common/employee/update">修改
            </el-button>
            <el-button :disabled="show_hide_bind_role" size="small"
                       @click="new_power(scope.row,scope.row.id,scope.$index, employee_list)"
                       data-code="/v1/common/employee/bind_role">编辑角色
            </el-button>
            <!--<el-button v-else size="small" @click="pinless(scope.row,scope.row.id,scope.$index, employee_list)">绑定微信-->
            <!--</el-button>-->
            <el-button  size="small" v-if="scope.row.mp_id  && scope.row.open_id"
                        style="width: 80px;" disabled type="success">已绑定</el-button>
            <el-button  size="small"  v-else
                        style="width: 80px;" @click="bound(scope.row,scope.row.id,scope.$index, employee_list)">绑定</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页-->
      <el-pagination style="float: right;margin-right: 2%"
                     layout="prev, pager, next"
                     :page-size="10"
                     :current-page.sync="cur_page"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
    <!--绑定显示的二维码-->
    <el-dialog
      title="二维码 (有效期两小时)"
      :visible.sync="dialogVisible_img"
      :close-on-click-modal='false'
      :show-close='false'
      width="30%"
      :before-close="handleClose">
      <div class="dialogVisible_style">
        <ul style="overflow: hidden">
          <li style="float: left;margin-left: 130px" v-show="routine_show">
            <el-button @click="pinless_click" :class="{active1:routine}" >微信小程序</el-button>
          </li>
          <li style="float: left;margin-left: 20px" v-show="daojie_show"  ref="daojie" id="daojie">
            <el-button @click="bjnews_click" style="width: 112px;" :class="{active2:daojie}">公众号</el-button>
          </li>
        </ul>
        <div id="qrcode" ref="qrcode" style="display: inline-block;margin-left: 25%;margin-top: 20px"></div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="danger" plain  @click="dialogVisible_img = false;quit()" size="mini">退出</el-button>
     </span>
    </el-dialog>
    <!--解除绑定显示的页面-->
    <el-dialog
      title="解除绑定"
      :visible.sync="dialogVisible_relieve"
      :close-on-click-modal='false'
      :show-close='false'
      width="20%"
      :before-close="handleClose">
      <div class="dialogVisible_style">
        <ul>
          <li>
            <span>人员：</span>
            <div style="display: inline-block;width: 200px;border-bottom: 1px solid #ebeef5;height: 32px;line-height: 32px ">{{relieve_name}}</div>
          </li>
          <li style="margin-top: 20px">
            <el-button @click="relieve_pinless"  type="danger" size="mini"  v-if="wx_real">解除小程序绑定</el-button>
            <el-button @click="bjnews_pinless"  type="danger" size="mini"  v-if="bjnews_real">解除公众号绑定</el-button>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="danger" plain  @click="dialogVisible_relieve  = false;" size="mini">退出</el-button>
     </span>
    </el-dialog>

  </div>
</template>

<script>
  import crypto from 'crypto';
  import treeTransfer from 'el-tree-transfer';
  import QRCode from 'qrcodejs2'
  import $ from 'jquery'

  let id = 1000;
  export default {
    name: "role",
    data() {
      return {
        url: this.api.api_9022_9519,
        title_add: '',//人员显示的头部内容
        role_title: '',//编辑角色显示的头部内容
        //commid
        commid: 1,//个人id
        cur_page: 1,
        //commpwd
        commpwd: '',
        title: ['人员未拥有角色', '人员已添加角色'],
        man_list: [],//先接收后台的值，然后添加自定义属性
        show_hide_delete: false,//判断删除按钮是否显示
        show_hide_update: false,//判断修改按钮是否显示
        show_hide_bind_role: false,//判断编辑角色是否显示
        isDisabled: false,//新增是否显示
        toData: [],//选择的角色组
        bind_list: [],//所有角色组
        checked: false,//状态
        role_checked: [],//所选中的权限
        role_id: 0,//选中的人员id
        authority: "",//所选中的名字
        direction_tf: '',//判断是增加权限还是降低权限
        amend: true,
        save: false,
        personal_role: false,//用来判断是不是传给后台的数组是否为空
        dept_id: '',
        authorization_token: '',
        pagesize: 10, //代表每页显示的条数
        total: 10,//代表总条数
        input: '',//输入内容
        dialogVisible: false,//新增人员的显示控制
        dialogVisible_power: false,//增加角色显示的控制
        dialogVisible_img: false,//绑定显示的界面
        dialogVisible_relieve:false,//解除绑定
        relieve_name:'',//解除绑定员工姓名
        wx_real:false,//判断解除微信是否展示
        bjnews_real:false,//判断解除公众号是否展示
        hotel_code:'',
        code_id :'',
        routine:true,//微信二维码
        daojie:false,//公众号二维码
        routine_show:false,//判断微信二维码显示不显示
        daojie_show:false,//公众号二维码显示不显示
        //上传照片的
        dialogImageUrl: '',
        Edite: true, //标志位 判断的是新增还是更新
        department_list: [],//获得部门的值
        employee_list: [],//获得人员的值
        country_code_list: [],//获取国家的列表
        country_code: '',
        hotel_id_father: '',
        // branch_data:'',
        birth_date: '',//部门id
        radio: '1',
        /*
        新增员工里的内容
        * */
        param: {},
        group_id: '',//集团id
        gender: '男',
        imageUrl: '',
        imge_list: '',
        src_log: '',
        length: '',
        wechat: '',//微信号
        img_src: '',
        /**筛选*/
        personnel:'',//人员名称

      }
    },
    props: ['hotel_id', 'branch_id', 'group_name'],
    created() {
      let that = this;
      // that.country_info();
      that.employee();
    },

    watch: {
      // 监听后台传过来的值得变化
      hotel_id: function (newValue, oldValue) {
        this.hotel_id_father = newValue;
        // console.log(this.hotel_id_father);
        this.examine();
        this.employee();
        this.cur_page = 1;
      },
      //部门的id
      branch_id: function (newValue, oldValue) {
        this.branch_data = newValue;
        this.cur_page = 1;
        this.employee()
      },
      group_name: function (val, oldVal) {
        let that = this;
        that.group_id = val;
        this.examine();
      },
      deep: true
    },
    components: {treeTransfer, QRCode}, // 注册
    methods: {
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          real_name: '',//用户姓名
          nick_name: '',//简称
          user_name: '',//用户名
          password: '',//密码
          work_id: '',//工号
          phone: '',//电话
          status: '',
          wechat: "",
        }
        that.radio = '1';//人员状态
        that.country_code = '';//国家
        that.dept_id = '';//部门
        that.birth_date = '';//生日
        that.src_log = '';
        that.gender = "男";//性别
      },
      //封装后台传过来的国家转换为名字
      code_desc(flag, data) {
        // flag为1的时候code转desc
        let that = this,
          list = that.country_code_list;
        // console.log(list)
        for (let i in list) {
          if (flag && data == list[i].code) {
            return list[i].descript
          } else if (!flag && data == list[i].descript) {
            return list[i].code
          }
        }
      },
      //封装获取人员列表
      employee() {
        this.$axios({
          url: this.url + "/v1/common/employee/info_list",
          method: "post",
          data: {
            page_size:10,
            hotel_id: this.hotel_id_father,
            hotel_group_id: this.group_id,
            dept_id: this.branch_data,
            page_num: this.cur_page
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              this.total = res.data.data.total_count;
              this.employee_list = res.data.data.list;
              this.man_list = res.data.data.list;
              let keys = JSON.parse(sessionStorage.getItem("rules"));//反序列化取出存储的序列化对象
              if (keys === null) {
                this.employee_list = res.data.data.list;
                for (let li in this.employee_list) {
                  if (this.employee_list[li].country_code != null) {
                    this.employee_list[li].country_code = this.code_desc(1, this.employee_list[li].country_code);
                  }
                }
                console.log(this.employee_list);
              }
              let page_path = "/#" + this.$route.path;
              let keys_path = keys[page_path];
              if (page_path !== keys) {
                if (JSON.stringify(keys) !== "{}" && keys !== null && keys !== undefined) {
                  console.log(JSON.stringify(keys));
                  let show_delete = keys_path["/v1/common/employee/remove"]
                  let show_update = keys_path["/v1/common/employee/update"]
                  let show_bind_role = keys_path["/v1/common/employee/bind_role"]
                  for (let item of  this.man_list) {
                    let source = {
                      show_hide_delete: show_delete,
                      show_hide_update: show_update,
                      show_hide_bind_role: show_bind_role
                    };
                    let returnedTarget = Object.assign(item, source);
                    // console.log( returnedTarget);
                    this.employee_list.push(item);
                    console.log(this.employee_list);
                    //取出需要的字段并赋值到data的字段里
                    for (let i in this.employee_list) {
                      if (this.employee_list[i].show_hide_delete === 1) {
                        this.show_hide_delete = false;
                      } else {
                        this.show_hide_delete = true;
                      };
                      if (this.employee_list[i].show_hide_update === 1) {
                        this.show_hide_update = false;
                      } else {
                        this.show_hide_update = true;
                      };
                      if (this.employee_list[i].show_hide_bind_role === 1) {
                        this.show_hide_bind_role = false;
                      } else {
                        this.show_hide_bind_role = true
                      }
                    }
                  }
                  for (let li in this.employee_list) {
                    if (this.employee_list[li].country_code != null) {
                      this.employee_list[li].country_code = this.code_desc(1, this.employee_list[li].country_code);
                    } else {
                    }
                  }
                }
                else {
                  console.log(555);
                  this.employee_list = res.data.data.list;
                  for (let li in this.employee_list) {
                    if (this.employee_list[li].country_code != null) {
                      this.employee_list[li].country_code = this.code_desc(1, this.employee_list[li].country_code);
                    } else {
                    }
                  }
                  this.show_hide_delete = true;//判断删除按钮是否显示
                  this.show_hide_update = true;//判断修改按钮是否显示
                  this.show_hide_bind_role = true;//判断编辑角色是否显示
                  this.isDisabled = true;//新增是否显示
                }
                this.total = res.data.data.total_count;
                this.init_btn();
              }
              else {
                this.employee_list = res.data.data.list;
                for (let li in this.employee_list) {
                  if (this.employee_list[li].country_code != null) {
                    this.employee_list[li].country_code = this.code_desc(1, this.employee_list[li].country_code);
                  } else {
                  }
                }
                this.show_hide_delete = true;//判断删除按钮是否显示
                this.show_hide_update = true;//判断修改按钮是否显示
                this.show_hide_bind_role = true;//判断编辑角色是否显示
                this.isDisabled = true;//新增是否显示
              }
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            // console.log(error);
          });
      },
      //封装获取国家的列表
      country_info() {
        this.$axios({
          url: this.api.api_code_9103 + "/v1/system/settings/get_country_list/?page_size=300",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.results)
              this.country_code_list = res.data.data.results;
              // this.employee();
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //获取个人信息
      personal_details() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/employee/get_info/" + that.commid,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              // console.log(1);
              console.log(res.data.data.data);
              let srow = res.data.data.data;
              that.param.commpwd = srow.password;
              that.Edite = true;
              that.length = srow.password.length;
              that.dialogVisible = true;
              that.param.real_name = srow.real_name,//用户姓名
                that.param.nick_name = srow.nick_name,//简称
                that.param.user_name = srow.user_name,//用户名
                that.param.password = srow.password,//密码
                that.param.work_id = srow.work_id,//工号
                that.birth_date = srow.birth_date,//生日
                that.dept_id = srow.dept_id.id,//部门
                that.param.phone = srow.phone,//电话
                that.country_code = srow.country_code,//国家
                that.param.wechat = srow.wx_code,//微信
                that.radio = srow.status + "";//人员状态
              that.gender = srow.gender;
              that.hotel_id = srow.hotel_id.id;//所属酒店的id
              if(srow.head_image){
                that.src_log = srow.head_image;
              }else {
                that.src_log = ""
              }

            }
            else {
              that.hintInfo("warning", "获取信息失败")
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**查询人员*/
      find (){
       let that =this;
       that.$axios({
         url:that.url + "/v1/common/employee/info_list",
         method:"post",
         data:{
           real_name:that.personnel
         }
       })
         .then(res=>{
           console.log(res);
           if(res.data.message==="success"){
             that.total = res.data.data.total_count;
             that.employee_list = res.data.data.list;
           }
         })
         .catch(error=>{
           console.log(error);
         })
      },
      /**父组件触发子组件*/
      break() {
        let that = this;
        that.country_info();
      },
      /**
       * @getmd5 加密密码使用
       */
      getmd5(pwd) {
        var md5 = crypto.createHash("md5");
        md5.update(pwd);
        var password = md5.digest('hex');
        return password;
      },
      // 点击修改
      submit(srow, id, index, list) {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        let that = this;
        if (root_level === 3 || root_level === 0) {
          console.log(srow, id, index, list);
          console.log(id);
          that.commid = id,
            that.src_log = "",
            that.title_add = "修改人员";
          // that.country_info();//国家
          that.personal_details();//人员信息
          that.examine();//部门信息
        } else {
          that.hintInfo("warning", "您没有修改人员权限")
        }

      },
      /**绑定*/
      bound(srow, id, index, list){
        let that =this;
        console.log(srow);
        that.dialogVisible_img = true;
        that.hotel_code = srow.hotel_group_id.code;
        that.code_id = id;
        this.$nextTick(function () {
          that.$refs.qrcode.innerHTML = "";
        })
        if(!srow.mp_id && !srow.open_id){
          that.routine=true;//微信二维码
          that.daojie=false;//公众号二维码
          that.routine_show=true;//微信二维码
          that.daojie_show=true;//公众号二维码
          that. pinless();
        }else if(srow.mp_id){
          that.routine=false;//微信二维码
          that.daojie=true;//公众号二维码
          that.bjnews();
          that.routine_show=false;//微信二维码
          that.daojie_show=true;//公众号二维码
          this.$nextTick(function () {
            this.$refs.daojie.style='margin-left:160px'
          })

        }else if(srow.open_id){
          that.routine=true;//微信二维码
          that.daojie=false;//公众号二维码
          that. pinless();
          that.routine_show=true;//微信二维码
          that.daojie_show=false;//公众号二维码
        }
      },

      /**封装绑定公众号*/
      bjnews(){
        /**假登陆 获取authorization  用于绑定微信的时候获取二维码*/
        let that = this;

        that.$axios({
          url: that.api.api_code_9103 + "/v1/system/wechat/get_user_authorization/",
          method: "post",
          data: {
            // group_code: that.hotel_code,
            id: that.code_id,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              console.log(res.data.data.data);
              let authorization = res.data.data.data;
              let full_name = res.data.data.full_name;
              let logo = res.data.data.logo;
              let photo = res.data.data.photo;
              let appid = res.data.data.app_id;
              // let src = "http://gzh.crowncrystalhotel.com/member/?authorization=" + authorization+"-full_name="+full_name+"-logo="+logo+"-photo="+photo;
              let src = "http://gzh.eloadspider.com/login?authorization=" + authorization+"-full_name="+full_name;
              that.img_src = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appid+"&redirect_uri="+src+"&response_type=code&scope=snsapi_userinfo#wechat_redirect"
              console.log(that.img_src);
              console.log(src);
              if (that.img_src !== "") {
                that.dialogVisible_img = true;
                this.$nextTick(function () {
                  this.qrcode();
                })
              }
              that.$refs.qrcode.innerHTML = "";
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**封装绑定微信*/
      pinless() {
        // let code = srow.hotel_group_id.code;
        // console.log(code);
        // console.log(id, index, list);
        // console.log(srow.user_name, srow.password);
        /**假登陆 获取authorization  用于绑定微信的时候获取二维码*/
        let that = this;
        // that.routine=true;//微信二维码
        // that.daojie=false;//公众号二维码
        that.$axios({
          url: that.api.api_code_9103 + "/v1/system/wechat/get_user_authorization/",
          method: "post",
          data: {
            // group_code: that.hotel_code,
            id: that.code_id,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              console.log(res.data.data.data);
              let authorization = res.data.data.data;
              that.img_src = "http://gzh.crowncrystalhotel.com/member/?authorization=" + authorization;
              console.log(that.img_src);
              if (that.img_src !== "") {
                that.dialogVisible_img = true;
                this.$nextTick(function () {
                  this.qrcode();
                })
              }
              that.$refs.qrcode.innerHTML = "";
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**点击绑定公众号*/
      bjnews_click(){
        let that =this;
        that.routine=false;//微信二维码
        that.daojie=true;//公众号二维码
        that.bjnews();
      },
      /**点击绑定微信*/
      pinless_click(){
        let that =this;
        that.routine=true;//微信二维码
        that.daojie=false;//公众号二维码
        that. pinless();
      },
      /**获取二维码*/
      qrcode() {
        let that = this;
        let qrcode = new QRCode('qrcode', {
          width: 232,  // 设置宽度
          height: 232, // 设置高度
          text: that.img_src
        })
      },
      /**解除绑定*/
      relieve(value){
        let that =this;
        if(value.open_id || value.mp_id){
          that.dialogVisible_relieve=true;
          that.code_id = value.id;
          that.relieve_name = value.real_name;
          if(value.mp_id){
            that.wx_real=true;
          }else {
            that.wx_real=false;
          }
          if(value.open_id){
            that.bjnews_real = true;
          }else {
            that.bjnews_real = false;
          }
        }else {
          that.hintInfo("warning", "暂无绑定信息")
        }

      },
      /**解除绑定公众号*/
      bjnews_pinless(srow, id, index, list){
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/employee/update/" + that.code_id,
          method: "post",
          data: {
            open_id: null,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.employee();
              that.hintInfo("success", "解除绑定成功");
              that.dialogVisible_relieve=false;
            }
            else {
              that.hintInfo("warning", "解除绑定失败")
            }
          })
          .catch(error => {
            console.log(error);
            that.hintInfo("warning", "解除绑定失败")
          });
      },
      /**解除绑定微信*/
      relieve_pinless(srow, id, index, list) {
        console.log(srow.mp_id);
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/employee/update/" + that.code_id,
          method: "post",
          data: {
            mp_id: null,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.employee();
              that.hintInfo("success", "解除绑定成功");
              that.dialogVisible_relieve=false;
            }
            else {
              that.hintInfo("warning", "解除绑定失败")
            }
          })
          .catch(error => {
            console.log(error);
            that.hintInfo("warning", "解除绑定失败")
          });
      },
      /**退出微信二维码页面*/
      quit(){
        let that =this;
        that.employee();
      },
      //点击角色上的删除
      cancel(id, index, list) {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 3) {
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
              url: "" + this.url + "/v1/common/employee/remove/" + id,
              method: "post",
            })
              .then(res => {
                console.log(res)
                if (res.data.message === "success") {
                  this.employee();
                  // this.masking=false;
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
        } else {
          this.hintInfo("warning", "您没有删除人员权限")
        }

      },
      //点击新增
      man_add() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 3 || root_level === 0) {
          that.dialogVisible = true;
          that.country_info();//国家
          that.examine();
          that.title_add = "新增人员";
          that.flush();

          /**
           * 员工工号加1,先获取所有的员工，拿到所有员工后进行操作
           * */
          that.all_staff();

        } else {
          that.hintInfo("warning", "您没有新增人员权限")
        }
      },
      /**获取所有的员工*/
      all_staff(){
        let that =this;
        that.$axios({
          url: that.url + "/v1/common/employee/info_list",
          method: "post",
          data: {
            page_size:999,
            hotel_id: that.hotel_id_father,
            hotel_group_id: that.group_id,
            dept_id: that.branch_data,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              /**
               *
               * 员工工号加1；
               *
               * */
              let all_list = res.data.data.list;
              //取出人员数组的最后一项
              let end = all_list.slice(-1);
              let add_num = parseInt(end[0].work_id)+1
              let num = (Array(3).join(0) +add_num).slice(-3);
              that.param.work_id = num  ;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
             console.log(error);
          });
      },
      //点击人员新增和修改后的保存
      saveInfo_role() {
        let that = this;
        if ((!that.param.real_name) || (!that.param.user_name) || (!that.param.password) || (!that.param.work_id)
          || (!that.dept_id) || (!that.param.phone)
        ) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          let tel = /^1[3456789]\d{9}$/;
          if (!tel.test(that.param.phone)) {
            that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
          } else {
            let urldata = that.Edite ? (that.url + "/v1/common/employee/update/" + that.commid) : (that.url + "/v1/common/employee/add");
            if (that.Edite === false) {
              that.password = that.getmd5(that.param.password)
            } else {
              console.log(25);
              if (that.param.password.length < that.length) {
                console.log(1);
                that.password = that.getmd5(that.param.password)
              } else {
                that.password = that.param.password;
              }

            }
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                real_name: that.param.real_name,//用户姓名
                nick_name: that.param.nick_name,//简称
                user_name: that.param.user_name.toLowerCase(),//用户名
                password: that.password,//密码
                work_id: that.param.work_id,//工号
                birth_date: that.birth_date,//生日
                dept_id: that.dept_id,//部门
                phone: that.param.phone,//电话
                wx_code: that.param.wechat,//微信
                country_code: that.country_code,//国家
                status: that.radio + "",//人员状态
                hotel_id: that.hotel_id,//所属酒店的id
                head_image: that.imge_list,//照片
                gender: that.gender,
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  // console.log(res);
                  that.dialogVisible = false;
                  that.employee();
                  if (that.Edite) {
                    that.hintInfo("success", "修改人员成功")
                  } else {
                    that.hintInfo("success", "新增人员成功")
                  }
                }
                else {
                  let fault = res.data.message;
                  console.log(fault);
                  if (fault) {
                    that.hintInfo("warning", "用户名或手机号已存在，请重新输入")
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }

        }
      },
      //点击编辑角色
      new_power(id, index) {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 3 || root_level === 1 ||root_level===2) {
          that.role_title = "编辑角色"
          that.toData = [];
          that.dialogVisible_power = true;
          console.log(id, index);
          that.authority = id.real_name;
          that.role_id = id.id;
          that.part();//获取所有角色组
          that.personalRole();
        } else {
          that.hintInfo("warning", "您没有编辑角色权限")
        }

      },
      //点击编辑角色后的保存
      saveInfo_power() {
        let that = this;
        if (that.personal_role) {
          //传给后台两个值
          //1：所点击的角色的id   that.role_id
          //2：所选中的权限组    that.role_checked
          console.log(that.toData);
          // that.toData.forEach(item =>{
          //   console.log(item.id)
          // });
          let add = [];
          for (let item  of that.toData) {
            if (item.children.length !== 0) {
              console.log(0);
              for (let i of  item.children)
                add.push(i.id)
            }
          }
          console.log(add);
          that.$axios({
            url:  that.url + "/v1/common/employee/bind_role",
            method: "post",
            data: {
              user_id: that.role_id,//所点击的id
              roles: JSON.stringify(add),//选中的url
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res.data);
                that.dialogVisible_power = false;
                that.hintInfo("success", "编辑角色成功")
              }
              else {
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
        } else {
          that.hintInfo("warning", "不能添加空角色组，请检查后重新选择")
        }
      },
      //封装获取角色组
      part() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/role_group/get_tree",
          method: "get",
          params:{
            page_size:999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
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
      //封装获取人员已有的角色
      personalRole() {
        let that = this;
        that.$axios({
          url: "" + that.url + "/v1/common/employee/get_roles",
          method: "post",
          data: {
            user_id: that.role_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.toData = res.data.data;
              if (that.toData.length === 0) {
                that.personal_role = true;
              }
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 监听穿梭框组件添加
      add(fromData, toData, obj) {
        // 树形穿梭框模式transfer时，返回参数为左侧树移动后数据、右侧树移动后数据、移动的 {keys,nodes,halfKeys,halfNodes}对象
        // 通讯录模式addressList时，返回参数为右侧收件人列表、右侧抄送人列表、右侧密送人列表
        console.log('toData', toData);
        console.log('obj', obj);
        let that = this;
        that.toData = toData;
        for (let item  of that.toData) {
          if (item.children.length === 0) {
            that.personal_role = false;
            that.hintInfo("warning", "不能添加空角色组，请检查后重新选择")
          } else {
            that.personal_role = true;
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
        that.toData = toData;
        // that.part();
        if (that.toData.length === 0) {
          that.personal_role = true;
        }
      },
      //查看部门信息
      examine() {
        let that =this;
        // console.log(that.hotel_id);
        that.$axios({
          url: that.url + "/v1/common/dept/info_list",
          method: "post",
          data: {
            hotel_id: that.hotel_id_father,
            group_hotel_id: that.group_id,
            page_size: 999,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list);
              let arr =[];
              for(let item of res.data.data.list){
                if(item.audit===1){
                  arr.push(item);
                }
              }
              that.department_list = arr;
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
        console.log(curPage) // 当前页}
        let that =this;
        that.cur_page = curPage;
        // this.curPage=curPage;
        that.$axios({
          url: that.url + "/v1/common/employee/info_list",
          method: "post",
          data: {
            page_num: curPage,
            page_size: 10,
            hotel_id: that.hotel_id_father,
            hotel_group_id: that.group_id,
            dept_id: that.branch_data,
            real_name:that.personnel
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list);
              that.employee_list = res.data.data.list;
              for (let li in that.employee_list) {
                if (that.employee_list[li].country_code != null) {
                  that.employee_list[li].country_code = that.code_desc(1, that.employee_list[li].country_code);
                } else {
                }
              }
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      //新增人员你的显示控制
      handleClose(done) {
        done()
      },
      /**
       * 点击上传照片 方法
       * */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
        this.imge_list =file.response.complete;
        // this.src_log = "https://image.eloadspider.com/" + file.response.url;
        this.src_log = file.response.complete;
        if(file.response.message==="success"){
          this.hintInfo("success", "上传照片成功")
        }else {
          this.hintInfo("warning", "上传照片失败")
        }
      },
      beforeAvatarUpload(file) {
        console.log(file);
        // this.imge_list = file.
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //如果认证错误
      new_authorization(msg) {
        let that = this;
        if (msg === "authorization invalid") {
          that.authorization()
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
      /**给静态按钮设置权限*/
      init_btn: function () {
        let that = this;
        let keys = JSON.parse(sessionStorage.getItem("rules"));//反序列化取出存储的序列化对象
        let page_path = "/#" + that.$route.path;
        let keys_path = keys[page_path];
        //取出所有按钮的code
        if (keys) {
          let elementList = document.querySelectorAll(".btn");
          for (let item of elementList) {
            Object.keys(keys_path).forEach(function (key) {
              if (item.dataset.code === key) {
                item.dataset.code = keys_path[key];
                that.isDisabled = parseInt(item.dataset.code);
                if (that.isDisabled === 1) {
                  that.isDisabled = false
                } else {
                  that.isDisabled = true;
                }
              }

            });

          }
        } else {
        }
      },
    },
  }
</script>

<style lang="less" scoped>
  .role {
    width: 97%;
    height: 100%;
    margin-left: 1%;
    .dialogVisible_style {
      .message {
        ul {
          overflow: hidden;
          span {
            display: inline-block;
            width: 90px;
          }
          li {
            width: 50%;
            margin-bottom: 10px;
            float: left;
            span{
              text-align: right;
            }
            .code {
              p {
                width: 150px;
                height: 150px;
                margin-left: 90px;
                border: 1px solid #dcdfe6;
                text-align: center;
                line-height: 150px;
              }
              .establish {
                overflow: hidden;
                margin-top: 10px;
                margin-left: 90px;
                li {
                  float: left;
                  width: 300px;
                }
              }
            }
          }
        }
      }
      .active1{
        background:rgb(68, 136, 233) ;
        color: white;
      }
      .active2{
        background:rgb(68, 136, 233) ;
        color: white;
      }
    }
    .paging {
      width: 100%;
      height: 95%;
      overflow: hidden;
      overflow-y: scroll;
      background: rgba(255, 255, 255, 1);
      .title {
        width: calc(100% - 30px);
        height: 40px;
        background: #68819EFF;
        /*margin: 0 104px  0  24px;*/
        /*margin-right: 104px;*/
        line-height: 40px;
        display: flex;
        /*min-width: 1140px;*/
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
        width: calc(100% - 30px);
        height: 44px;
        line-height: 44px;
        /*background:rgba(247,247,247,1);*/
        border-bottom: 1px solid #EDEDED;
        margin-bottom: 7px;
        position: relative;
        /*min-width: 1200px;*/
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
    .user {
      .left {
        width: 1000px;
        /*height: 100%;*/
        float: left;
        .message {
          padding-left: 29px;
          position: relative;
          p {
            font-size: 16px;
            height: 60px;
            line-height: 60px;
          }
          ul {
            overflow: hidden;

            li {
              float: left;
              width: 480px;
              font-size: 16px;
              margin-bottom: 24px;
              span {
                width: 78px;
                display: inline-block;
              }
              input {
                width: 300px;
                height: 30px;
                margin-bottom: 10px;
                margin-left: 10px;
              }
              p {
                display: inline-block;
              }
              .code {
                display: inline-block;
                margin-left: 10px;
                p {
                  width: 157px;
                  height: 146px;
                  background: #00C1DE;
                  vertical-align: top;

                }

                .establish {
                  display: inline-block;
                  font-size: 16px;
                  margin-left: 34px;
                  li {
                    margin-bottom: 18px;

                  }
                }
              }
            }
          }
          .btn {
            position: absolute;
            bottom: 20px;
            left: 29px;
            button {
              outline: none;
              border: none;
              width: 90px;
              height: 40px;
              background: rgba(68, 136, 233, 1);
              border-radius: 4px;
              color: white;
            }

          }
        }

      }
      .right {
        float: left;
        .phone {
          width: 236px;
          height: 236px;
          background: white;
          text-align: center;
          line-height: 236px;
          margin-top: 82px;
          margin-left: 128px;
        }
        .save {
          width: 236px;
          overflow: hidden;
          margin-left: 128px;
          margin-top: 32px;
          button {
            width: 90px;
            height: 40px;
            border: none;
            outline: none;
            background: rgba(68, 136, 233, 1);
            border-radius: 4px;
            float: left;
            color: white;
          }
        }
      }
    }
  }
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>



