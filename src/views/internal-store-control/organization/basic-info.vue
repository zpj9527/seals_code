<template>
  <div class="basicInfo" style="background: #eeeeee">
    <el-container>
      <el-aside width="60%" style="background: white">
        <div class="left">
          <div class="message">
            <p>基本信息</p>
            <ul>
              <li><span style="vertical-align:top;">集团全称：</span>
                <div>{{group_list.full_name}}</div>
              </li>
              <li><span>集团简称：</span>
                <div>{{group_list.short_name}}</div>
              </li>
              <li><span>代码：</span>
                <div>{{group_list.code}}</div>
              </li>
              <!--<li style="height: 46px;line-height: 46px">-->
              <!--<span>审核状态：</span>-->
              <!--<el-checkbox v-if="group_list.creator==1" v-model="checked1" disabled style="display: inline-block">已通过</el-checkbox>-->
              <!--<el-checkbox v-else   v-model="checked1" disabled style="display: inline-block">未通过</el-checkbox>-->
              <!--</li>-->
              <li><span>中文描述：</span>
                <div>{{group_list.desc}}</div>
              </li>
              <li><span>英文描述：</span>
                <div>{{group_list.desc_en}}</div>
              </li>
            </ul>
          </div>
          <div class="contact">
            <p>联系方式</p>
            <ul>
              <li><span>总机：</span>
                <div>{{group_list.office_tel}}</div>
              </li>
              <li><span>国家：</span>
                <div>{{country_code_id}}</div>
              </li>
              <li><span>订房电话：</span>
                <div>{{group_list.reserve_tel}}</div>
              </li>
              <li><span>州/省：</span>
                <div>{{province_code_id}}</div>
              </li>
              <li><span>服务电话：</span>
                <div>{{group_list.service_tel}}</div>
              </li>
              <li><span>城市：</span>
                <div>{{city_id}}</div>
              </li>
              <li><span>传真：</span>
                <div>{{group_list.fax}}</div>
              </li>
              <li style="height: 46px;vertical-align: top">
                <span style="vertical-align: top;margin-top: 5px">地理位置：</span>
                <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 40px">东经 ： </span>
                <span
                  style="width: 73px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_east}}</span>
                <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 40px">北纬：</span>
                <span
                  style="width: 73px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_west}}</span>
              </li>
              <li><span>官网：</span>
                <div>{{group_list.web_site}}</div>
              </li>
              <li><span>邮箱：</span>
                <div>{{group_list.email}}</div>
              </li>
            </ul>

          </div>
          <div class="phone">
            <img :src="src_group" alt="集团照片">
          </div>
        </div>
      </el-aside>
      <el-main  style="background: white">
        <div class="right">
          <div class="log" style="width: 80%;">
            <img :src="src_log" alt="log">
          </div>
          <ul class="site">
            <li>
              <span>DNS ： </span>
              <div  style="width: 409px;overflow: hidden; text-overflow:ellipsis;">{{group_list.dns}}</div>
            </li>
            <li>
              <span>邮编 ： </span>
              <div style="width: 409px;overflow: hidden; text-overflow:ellipsis;">{{group_list.postal_code}}</div>
            </li>
            <li>
              <span style="vertical-align: top">地址1 ：</span>
              <div class="my_node" style="width: 409px;overflow: hidden; text-overflow:ellipsis;">{{group_list.address_1}}</div>
            </li>
            <li>
              <span style="vertical-align: top">地址2 ：</span>
              <div class="my_node"  style="width: 409px;overflow: hidden; text-overflow:ellipsis;">{{group_list.address_2}}</div>
            </li>
          </ul>
          <ul class="establish">
            <li><span >创建人 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc;">{{group_list.creator }}</span></li>
            <li><span>创建日期 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc">{{group_list.create_time }}</span></li>
            <li><span>修改日期 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc">{{group_list.last_time}}</span></li>
            <li><span>修改人 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc">{{group_list.last_user }}</span></li>
            <li>
              <el-button @click="amend" type="primary" size="mini">修改</el-button>
              <el-button type="danger" @click="omit" size="mini">删除</el-button>
              <!--<button @click=" appObtain()" style="width: 80px;height: 27px;line-height: 27px">集团APP</button>-->
              <el-button @click=" appObtain()" type="primary" size="mini">可用APP</el-button>
            </li>

          </ul>
        </div>
      </el-main>
    </el-container>
    <!--查看集团的APP-->
    <!--编辑APp出现的页面-->
    <el-dialog
      title="集团APP"
      :visible.sync="dialogVisibleApp"
      :close-on-click-modal='false'
      width="60%"
      style="overflow: hidden"
      :before-close="handleClose" class="dialog-style">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> <span style="color: #4488E9">{{group_list.full_name}}</span> {{ title }}</span>
      </div>
      <!--<p style="display: inline-block;width: 198px;margin-bottom: 10px">集团名称 ：<span style="color:#4488e9"> {{group_list.full_name}}</span></p>-->
      <ul style="overflow: hidden">
        <el-transfer
          v-model="multipleSelection"
          style="float: left"
          :props="{key: 'id',label: 'name'}"
          :titles="['集团未拥有APP', '集团已添加APP ']"
          @change="handleChange"
          :data="appList"
        ></el-transfer>

      </ul>

      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibleApp = false ;cancel()" size="mini">取消</el-button>
          <el-button type="primary" @click="dialogVisibleApp = false; saveInfo_app()" size="mini">确定</el-button>
        </span>
    </el-dialog>
    <!--修改集团-->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="60%"
      class="dialog-style"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <div class="basicInfo_amd">
        <el-container>
          <el-aside width="64%" style="background: white">
            <div class="left">
              <p>基本信息</p>
              <ul>
                <li>
                  <span><i style="color: red;font-size: 18px">*</i>集团全称：</span>
                  <el-input v-model="full_name " style="width: 246px" placeholder="请输入内容" size="mini"></el-input>
                </li>
                <li>
                  <span> <i style="color: red;font-size: 18px">*</i>集团简称：</span>
                  <el-input v-model="short_name " style="width: 246px" maxlength="10" placeholder="请输入内容"
                            size="mini"></el-input>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px">*</i>代码：</span>
                  <el-input v-model="code" placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li>
                  <span >中文描述：</span>
                  <el-input v-model="desc " placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li>
                  <span >英文描述：</span>
                  <el-input v-model="desc_en " placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
              </ul>
              <p>联系方式</p>
              <ul>
                <li>
                  <span><i style="color: red;font-size: 18px">*</i>总机：</span>
                  <el-input v-model="office_tel " placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li>
                  <span>国家：</span>
                  <el-select v-model="country_code" placeholder="请选择" filterable size="mini" style="width: 246px">
                    <el-option
                      v-for="item in country_code_list"
                      :key="item.value"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </li>

                <li>
                  <span><i style="color: red;font-size: 18px">*</i>订房电话：</span>
                  <el-input v-model="reserve_tel " placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li>
                  <span>州/省：</span>
                  <!--<el-input v-model="province" placeholder="请输入内容" style="width: 217px"  size="mini"></el-input>-->
                  <el-select v-model="province" placeholder="请选择" filterable size="mini"style="width: 246px"
                             @focus="province_nation">
                    <el-option
                      v-for="item in continent_list"
                      :key="item.value"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px">*</i>服务电话：</span>
                  <el-input v-model="service_tel" placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px">*</i>城市：</span>
                  <!--<el-input v-model="city" placeholder="请输入内容" style="width: 217px"  size="mini"> </el-input>-->
                  <el-select v-model="city" placeholder="请选择" filterable size="mini" style="width: 246px"
                             @focus="province_city">
                    <el-option
                      v-for="item in get_division_list"
                      :key="item.value"
                      :label="item.descript"
                      :value="item.code">
                    </el-option>
                  </el-select>
                </li>
                <li>
                  <span >传真：</span>
                  <el-input v-model="fax" placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li >
                  <span style="line-height: 28px">地理位置：</span>
                  <span
                    style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 38px;display: inline-block;">东经:</span>
                  <input style="width: 76px;height: 28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px;line-height: 28px"
                         v-model="position_east">
                  <span
                    style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 38px;display: inline-block;">北纬：</span>
                  <input style="width: 76px;height: 28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px;line-height: 28px"
                         v-model="position_west">

                </li>
                <li style="height: 28px">
                  <span>状态：</span>
                  <el-radio v-model="normal" label="1">正常</el-radio>
                  <el-radio v-model="normal" label="0">停用</el-radio>
                </li>
                <li>
                  <span >官网：</span>
                  <el-input v-model="web_site " placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li>
                  <span >邮箱：</span>
                  <el-input v-model="email" placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li style="width: 94%;height: 260px ;">
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://oss.crowncrystalhotel.com/resource/group_photo/upload"
                    :on-success="handlehotel_group"
                    :before-upload="beforehotel_group"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip" style="text-align: center">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </li>
              </ul>
            </div>
          </el-aside>
          <el-main style="padding: 0 10px">
            <div class="right_amd">
              <div class="log" style="margin-top: 44px;text-align: center">
                <el-upload
                  class="avatar-uploader"
                  action="https://oss.crowncrystalhotel.com/resource/group_logo/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="src_log" :src="src_log" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon">log</i>
                </el-upload>
              </div>
              <ul class="site">
                <li>
                  <span >DNS ： </span>
                  <el-input v-model="dns " placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                </li>
                <li>
                  <span >邮编 ： </span>
                  <el-input v-model="postal_code" size="mini" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                            ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容" style="width: 246px"></el-input>
                </li>
                <li>
                  <span ><i style="color: red;font-size: 18px;vertical-align: top">*</i>地址1 ：</span>
                  <textarea style="width: 246px; height: 130px;resize: none;border: 1px solid #dcdfe6;border-radius: 4px"
                            v-model="address_1 "></textarea>
                </li>
                <li>
                  <span >地址2 ：</span>
                  <textarea style="width: 246px; height: 130px;resize: none;border: 1px solid #dcdfe6;border-radius: 4px"
                            v-model="address_2 "></textarea>
                </li>
              </ul>
            </div>
          </el-main>
        </el-container>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="save()" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    name: "basic-info",

    data() {
      return {
        // http://47.98.113.173:9022
        url: this.api.api_9022_9519,
        title: '',
        input: '',
        checked1: true,
        checked: true,
        basic: false,//新增机构显示的页面
        info: true,//页面打开显示的页面,
        masking: false,//蒙版层
        dialogVisibleApp: false,//集团App的显示隐藏
        hotel_masking: false,//酒店添加的蒙版显示
        group_list: {},//获取后台的集团信息
        group_full_name: '',//集团信息
        id: '',//选取集团信息的id
        position: '',//地理位置
        logo: '',//log
        //log里的东西
        dialogImageUrl: '',
        dialogVisible: false,
        appList: [],//后台传过来的app数组
        multipleSelection: [],//所选中的App数组
        splict_add: [],//地理位置
        group_hotel_id: '',
        country_code_list: [],//国家列表
        get_division_list: [],//获取城市
        continent_list: [],//获取洲省
        imageUrl: '',
        imge_list: '',
        imge_group: '',
        group_id: '',
        /**
         * 集团修改
         *
         * */
        // group:'',//集团信息的选择框
        full_name: '', //集团全称
        short_name: '',   //集团简称
        code: '',  //代码
        desc: '',//中文描述
        desc_en: '',//英文描述
        office_tel: '',//总机
        country_code: '',//国家
        reserve_tel: '',//订房电话
        province: '',//州/省
        service_tel: '',//服务电话
        city: '',//城市
        fax: '',//传真
        position_east: '',// 东经
        position_west: '',// 北纬
        normal: '1',//正常
        web_site: '',//官网
        email: '',//邮箱
        photo: '',//集团照片
        log: '',//log
        dns: '',//DNS
        postal_code: '',//邮编
        address_1: '',//地址1
        address_2: '',//地址二
        src_log: '',
        src_group: '',
        country_code_id: "",
        province_code_id: '',
        city_id: '',

      }
    },
    created: function () {
      let that = this;
      that.full();//获取集团信息
    },
    methods: {
      //封装获取国家的列表
      country_info() {
        this.$axios({
          url: this.api.api_code_9103 + "/v1/system/settings/get_country_list/?page_size=300",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log("这是国家");
              console.log(res.data.data.results);
              this.country_code_list = res.data.data.results;
              // this.country_code = res.data.data.results[0].code;
              this.continent();
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**获取洲省*/
      continent() {
        let that = this;
        that.$axios({
          url: that.api.api_code_9103 + "/v1/system/settings/get_province_list/",
          methods: "get",
          params: {
            page_size: 300,
            country: that.country_code,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              this.continent_list = res.data.data.results;
              // this.province = res.data.data.results[0].code;
              this.get_division();
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          })
      },
      /**获取城市*/
      get_division() {
        this.$axios({
          url: this.api.api_code_9103 + "/v1/system/settings/get_division_list/",
          method: "get",
          params: {
            page_size: 500,
            province: this.province,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              this.get_division_list = res.data.data.results;

            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**点击省份，首先判断是否选择了国家*/
      province_nation() {
        let that = this;
        if (that.country_code === "") {
          this.hintInfo("warning", "请先选择国家")
        } else {
          // that.country_code = that.country_code_id;
          that.continent();
        }
      },
      /**点击城市,首先判断是否选择了洲省*/
      province_city() {
        let that = this;
        if (that.province === "") {
          this.hintInfo("warning", "请先选择省份")
        } else {
          // that.province = that.province_code_id,
          that.get_division()
        }
      },
      //封装后台传过来的国家转换为名字
      code_desc(flag, data, list_code) {
        // flag为1的时候code转desc
        let that = this;
        // list = that.country_code_list;
        for (let i in list_code) {
          if (flag && data === list_code[i].code) {
            return list_code[i].descript
          } else if (!flag && data === list_code[i].descript) {
            return list_code[i].code
          }
        }
      },
      //封装获取集团信息
      full() {
        let that = this;
        that.group = sessionStorage.getItem('group');
        that.$axios({
          url: that.url + "/v1/common/hotel_group/get_info/" + that.group,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              //localStorage.setItem('authorization',res.data.new_authorization);
              console.log(res.data.data);
              that.group_list = res.data.data;
              that.src_log =  that.group_list.logo;
              that.src_group =  that.group_list.photo;
              // position
              that.splict_add = that.group_list.position.split(',');
              // console.log(that.splict_add);
              that.position_east = that.splict_add[0];
              that.position_west = that.splict_add[1];
              that.country_code_id = that.group_list.country_dict.desc;
              that.province_code_id = that.group_list.province_dict.desc;
              that.city_id = that.group_list.division_dict.desc;
            } else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //点击修改
      amend() {
        console.log(11);
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 1 || root_level === 2) {
          this.dialogVisible = true;
          this.title = "修改集团信息";
          if (this.group_list.country_dict) {
            this.country_info();
          }
          //集团蒙版的基本信息
          this.full_name = this.group_list.full_name;//集团全称
          this.short_name = this.group_list.short_name;  //集团简称
          this.code = this.group_list.code;  //代码
          //审核状态
          console.log(this.group_list);
          this.group_id = this.group_list.id
          this.desc = this.group_list.desc; //中文描述
          this.desc_en = this.group_list.desc_en;//英文描述
          // // 集团蒙版的联系方式
          this.office_tel = this.group_list.office_tel;//总机
          this.country_code = this.group_list.country_dict.code;//国家
          this.reserve_tel = this.group_list.reserve_tel;//订房电话
          this.province = this.group_list.province_dict.code;//州/省
          this.service_tel = this.group_list.service_tel//服务电话
          this.city = this.group_list.division_dict.code;//城市
          this.fax = this.group_list.fax;//传真
          // //地理位置
          this.splict_add = this.group_list.position.split(",");
          this.position_west = this.splict_add[1];// 北纬
          this.position_east = this.splict_add[0];
          // //状态
          // normal:'1',//正常
          this.normal = this.group_list.status + "";
          this.web_site = this.group_list.web_site//官网
          this.email = this.group_list.email//邮箱
          // photo:'',//集团照片
          this.logo = this.imge_list,//log
            this.dns = this.group_list.dns;//DNS
          this.postal_code = this.group_list.postal_code;//邮编
          this.address_1 = this.group_list.address_1;//地址1
          this.address_2 = this.group_list.address_2;//地址二
        } else {
          this.hintInfo("warning", "您没有修改集团权限")
        }
      },
      //点击修改集团后的保存
      save() {
        let that = this;
        if ((!that.full_name) || (!that.short_name) || (!that.code) || (!that.office_tel) || (!that.reserve_tel)
          || (!that.service_tel) || (!that.city) || (!that.normal) || (!that.address_1)
        ) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          let tel = /0\d{2,3}-\d{7,8}/;
          if (!tel.test(that.reserve_tel) && !tel.test(that.office_tel) && !tel.test(that.service_tel)) {
            that.hintInfo("warning", "座机号码需以0开始,中间使用-分隔符")
          } else {
            this.$axios({
              url: "" + that.url + "/v1/common/hotel_group/update/" + that.group,
              method: "post",
              // params:{},
              data: {
                //集团蒙版的基本信息
                full_name: that.full_name, //集团全称
                short_name: that.short_name,   //集团简称
                code: that.code, //代码
                audit: that.radio,//审核状态
                desc: that.desc,//中文描述
                desc_en: that.desc_en,//英文描述
                // 集团蒙版的联系方式
                office_tel: that.office_tel,//总机
                country_code: that.country_code,//国家
                reserve_tel: that.reserve_tel,//订房电话
                province: that.province,//州/省
                service_tel: that.service_tel,//服务电话
                city: that.city,//城市
                fax: that.fax,//传真
                position: that.position_east + ',' + that.position_west,
                //地理位置
                // position_east:'',// 东经
                // position_west:'',// 北纬
                status: that.normal + "",//状态
                web_site: that.web_site,//官网
                email: that.email,//邮箱
                photo: that.imge_group,//集团照片
                logo: that.imge_list,//log
                dns: that.dns,//DNS
                postal_code: that.postal_code,//邮编
                address_1: that.address_1,//地址1
                address_2: that.address_2,//地址二
              },
            })
              .then(res => {
                if (res.data.message === "success") {
                  //localStorage.setItem('authorization',res.data.new_authorization);
                  console.log(res);
                  this.dialogVisible = false;
                  this.full();
                  this.$emit('handleClick', that.group);
                  that.hintInfo("success", "修改集团成功")
                } else {
                  console.log(res.data.message);
                  if (res.data.message.search("Duplicate entry") !== -1) {
                    that.hintInfo("warning", "代码重复，请检查后重新输入")
                  }
                }

              })
              .catch(error => {
                console.log(error);
              })
          }
        }

      },
      //点击删除
      omit() {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 1 || root_level === 2) {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            console.log(this.group);
            this.$axios({
              url: this.url + "/v1/common/hotel_group/remove/" + this.group,
              method: "post",
            })
              .then(res => {
                if (res.data.message === "success") {
                  this.$emit('handleClick');
                  this.full();
                } else {
                  console.log(res.data.message)
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
        } else {
          this.hintInfo("warning", "您没有删除集团权限")
        }
      },
      //集团App的隐藏
      handleClose(done) {
        done();
      },

      handleChange(value, direction, movedKeys) {
        let that = this;
        console.log(value);
        console.log(direction);
        console.log(movedKeys);//发生移动数据的数组
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边

      },
      //点击app
      appObtain() {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 1 || root_level === 2) {
          let that = this;
          that.dialogVisibleApp = true;
          that.title = "集团APP"
          that.multipleSelection = [];
          that.demandApp();
          that.$axios({
            url: that.url + "/v1/common/app/root_list",
            method: "get",
            params: {
              page_size: 999
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res)
                that.appList = res.data.data;
              }
              else {
                this.error(res.data.message)
                console.log(res.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            })
        } else {
          this.hintInfo("warning", "您没有集团APP权限")
        }
      },
      //点击确定
      saveInfo_app() {
        let that = this;
        that.$axios({
          url: "" + that.url + "/v1/common/hotel_group/bind_app",
          method: "post",
          data: {
            hotel_group_id: that.group,//所点击的id
            apps: JSON.stringify(that.multipleSelection),//选中的app
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res)
              console.log(that.multipleSelection);
            }
            else {
              this.error(res.data.message)
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          })
      },

      //封装查询集团下有哪些app
      demandApp() {
        let that = this;
        that.$axios({
          url: "" + that.url + "/v1/common/app/root_list",
          method: "post",
          data: {
            hotel_group_id: that.group,
            page_size: 999
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              //localStorage.setItem('authorization',res.data.new_authorization);
              console.log(res)
              // 遍历拿到所需要APP
              res.data.data.forEach(item => {
                that.multipleSelection.push(item.id)
              });
              console.log(that.multipleSelection);
              // that.multipleSelection=res.data.data.list;
            }
            else {
              this.error(res.data.message)
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          })

      },
      /**父组件触发子组件*/
      break() {
        let that = this;
        that.full()
      },

      /**
       * 点击上传logo 方法
       * */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
        this.imge_list =file.response.complete;
        this.src_log = file.response.complete;
        if(file.response.message==="success"){
          this.hintInfo("success", "上传图片成功")
        }else {
          this.hintInfo("warning", "上传图片失败")
        }
      },
      beforeAvatarUpload(file) {
        console.log(file);
        // this.imge_list = file.
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      //集团照片
      handlehotel_group(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
        this.imge_group = file.response.complete;
        this.src_group = file.response.complete;
        if(file.response.message==="success"){
          this.hintInfo("success", "上传图片成功")
        }else {
          this.hintInfo("warning", "上传图片失败")
        }
      },
      beforehotel_group(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg'|| "image/png";
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      //点击蒙版里的取消
      cancel() {
        this.masking = false;
        //集团蒙版的基本信息
        this.full_name = '', //集团全称
          this.short_name = '',   //集团简称
          this.code = '',  //代码
          this.radio = "1",//审核状态
          this.desc = '',//中文描述
          this.desc_en = '',//英文描述
          // 集团蒙版的联系方式
          this.office_tel = '',//总机
          this.country_code = '',//国家
          this.reserve_tel = '',//订房电话
          this.province = '',//州/省
          this.service_tel = '',//服务电话
          this.city = '',//城市
          this.fax = '',//传真
          //地理位置
          this.position_east = '',// 东经
          this.position_west = '',// 北纬
          //状态
          this.normal = '1',//正常
          this.web_site = '',//官网
          this.email = '',//邮箱
          this.photo = '',//集团照片
          this.logo = '',//log
          this.dns = '',//DNS
          this.postal_code = '',//邮编
          this.address_1 = '',//地址1
          this.address_2 = ''//地址二
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
  .basicInfo {
    width:98%;
    height: 100%;
    overflow-y: scroll;
    .left {
      min-width: 700px;
      .message {
        width: 100%;
        padding-left: 29px;
        p {
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          margin-top: 16px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        ul {
          overflow: hidden;
          width: 100%;
          li {
            float: left;
            width: 50%;
            font-size: 16px;
            margin-bottom: 5px;
            span {
              width: 78px;
              display: inline-block;
              vertical-align: top;
            }
            div {
              display: inline-block;
              width:70%;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
              padding-left: 10px;
              line-height: 30px;
            }
          }
        }
      }
      .contact {
        width: 100%;
        padding-left: 29px;
        p {
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          margin: 10px 0;
          font-weight: bold;
        }
        ul {
          overflow: hidden;
          width: 100%;
          li {
            float: left;
            width: 50%;
            font-size: 16px;
            margin-bottom: 5px;
            span {
              width: 78px;
              display: inline-block;
              vertical-align: top;
            }
            div {
              width: 70%;
              display: inline-block;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
              padding-left: 10px;
              line-height: 30px;
            }

          }
        }
      }
      .phone {
        width: 82%;
        height: 327px;
        /*line-height: 398px;*/
        text-align: center;
        /*background: white;*/
        margin-left: 31px;
        margin-top: 32px;
        margin-bottom: 24px;
        img {
          width:100%;
          /*height:327px;*/
          max-width: 100%;
          max-height: 100%;
        }
      }

    }
    .right {
      /*width:30%;*/
      /*float: left;*/
      .log {
        height: 227px;
        background: white;
        line-height: 227px;
        text-align: center;
        margin-top: 8px;
        margin-bottom: 30px;
        img {
          width: 327px;
          height: 227px;
        }
      }
      .site {
        /*margin-left: 60px;*/
        font-size: 16px;
        li {
          margin-bottom: 10px;
          span {
            width: 70px;
            display: inline-block;
            text-align: left;
            vertical-align: top;
          }
          div {
            display: inline-block;
            height: 30px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 4px;
            padding-left: 10px;
            line-height: 30px;
          }
          .my_node:hover{
            height: auto;
            word-break:break-all;
            white-space: pre-wrap;
            text-decoration: none;
          }

        }
      }
      .establish {
        font-size: 16px;
        li {
          margin-bottom: 22px;
          span{
            display: inline-block;
            width: 100px;
          }
        }
      }
    }
    .basicInfo_amd {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      background: white;
      .left {
        width: 52%;
        float: left;
        p {
          width: 80px;
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          margin-top: 16px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        ul {
          overflow: hidden;

          li {
            float: left;
            width: 50%;
            font-size: 16px;
            margin-bottom: 10px;
            span {
              width: 80px;
              display: inline-block;
              text-align: right;
              /*vertical-align: top;*/
            }

          }
        }
      }
      .contact {
        padding-left: 29px;
        p {
          font-size: 16px;
          margin: 10px 0;
          font-weight: bold;
        }
        ul {
          overflow: hidden;

          li {
            float: left;
            width: 50%;
            font-size: 16px;
            margin-bottom: 5px;
            span {
              width: 80px;
              display: inline-block;
              vertical-align: top;
            }

          }
        }
      }
      .phone {
        width: 600px;
        height: 230px;
        text-align: center;
        background: white;
        margin-left: 31px;
        margin-bottom: 24px;
        border: 1px solid rgb(204, 204, 204);
      }
      .right_amd {
        .log {
          background: white;
          text-align: center;
        }
        .site {
          font-size: 16px;
          li {
           margin-top: 20px;
            span {
              width: 70px;
              display: inline-block;
              text-align: right;
              vertical-align: top;
            }

          }
        }
        .establish {
          margin-top: 100px;
          font-size: 16px;
          li {
            margin-bottom: 22px;
          }
        }
      }
    }
  }

  .group_app {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 13, 32, 0.3);
    /*z-index: 9000;*/

  }

</style>
<style scoped>
  .dialog-style>>> .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .dialog-style>>> .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .dialog-style>>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .dialog-style>>> .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .dialog-style>>> .el-transfer-panel {
    width: 317px;
    margin-top: 10px;
    height: 460px;
  }

  .dialog-style>>> .el-transfer-panel__list {
    height: 460px;
  }
  .dialog-style>>> .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .dialog-style>>> .avatar {
    width: 246px;
    height:160px;
    display: block;
  }
  .dialog-style>>> .el-upload-dragger{
    width: 650px;
  }
</style>
