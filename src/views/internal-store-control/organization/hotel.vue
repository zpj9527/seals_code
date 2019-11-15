<template>
  <div class="hotel" style="background: #eeeeee">
    <el-container>
      <el-aside width="60%" style="background: white">
        <div class="left">
          <div class="message">
            <p>基本信息</p>
            <ul>
              <li><span style="vertical-align:top;">酒店全称：</span>
                <div>{{bit.full_name}}</div>
              </li>
              <li><span>酒店简称：</span>
                <div>{{bit.short_name}}</div>
              </li>
              <li><span>代码：</span>
                <div>{{bit.code}}</div>
              </li>
              <!--<li style="height: 46px;line-height: 46px">-->
              <!--<span>审核状态：</span>-->
              <!--<el-checkbox v-if="bit.audit==1" v-model="checked" disabled style="display: inline-block">已通过</el-checkbox>-->
              <!--<el-checkbox v-else="bit.audit==0"   v-model="checked" disabled style="display: inline-block">未通过</el-checkbox>-->
              <!--</li>-->
              <li><span>中文描述：</span>
                <div>{{bit.desc}}</div>
              </li>
              <li><span>英文描述：</span>
                <div>{{bit.desc_en}}</div>
              </li>
            </ul>
          </div>
          <div class="contact">
            <p>联系方式</p>
            <ul>
              <li>
                <span>总机：</span>
                <div>{{bit.office_tel}}</div>
              </li>
              <li>
                <span>国家：</span>
                <div>{{country_code_id}}</div>
              </li>
              <li>
                <span>订房电话：</span>
                <div>{{bit.reserve_tel}}</div>
              </li>
              <li>
                <span>州/省：</span>
                <div>{{province_code_id}}</div>
              </li>
              <li>
                <span>服务电话：</span>
                <div>{{bit.service_tel}}</div>
              </li>
              <li>
                <span>城市：</span>
                <div>{{city_id}}</div>
              </li>
              <li>
                <span>传真：</span>
                <div>{{bit.fax}}</div>
              </li>
              <li style="height: 35px;vertical-align: top">
                <span style="vertical-align: top;margin-top: 5px">地理位置：</span>
                <span style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 40px">东经 ： </span>
                <span
                  style="width: 110px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_east}}</span>
                <span style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 40px">北纬：</span>
                <span
                  style="width: 110px;height: 30px; border: 1px solid rgba(204,204,204,1);line-height: 30px;overflow: hidden;text-overflow: ellipsis;border-radius: 4px">{{position_west}}</span>
              </li>
              <li>
                <span>官网：</span>
                <div>{{bit.web_site}}</div>
              </li>
              <li>
                <span>邮箱：</span>
                <div>{{bit.email}}</div>
              </li>
            </ul>
          </div>
          <div class="phone">
            <img :src="src_group" alt="集团照片">
          </div>
        </div>
      </el-aside>
      <el-main style="background: white">
        <div class="right">
          <div class="log">
            <img :src="src_log" alt="log">
          </div>

          <ul class="site">
            <li>
              <span>DNS ： </span>
              <div>{{bit.dns}}</div>
            </li>
            <li>
              <span>邮编 ： </span>
              <div>{{bit.postal_code}}</div>
            </li>
            <li>
              <span style="vertical-align: top">地址1 ：</span>
              <div >{{bit.address_1}}</div>
            </li>
            <li>
              <span style="vertical-align: top">地址2 ：</span>
              <div >{{bit.address_2}}</div>
            </li>
          </ul>
          <ul class="establish">
            <li><span>创建人 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc">{{bit.create_user }}</span></li>
            <li><span>创建日期 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc">{{bit.create_time }}</span></li>
            <li><span>修改日期 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc">{{bit.modify_time }}</span></li>
            <li><span>修改人 ： </span><span style="display: inline-block;width: 300px;border-bottom: 1px solid #cccccc">{{bit.modify_user }}</span></li>
            <li>
              <!--<button @click="amend" style="font-size: 10px;width: 80px;height: 27px;line-height: 27px;border: none;border-radius: 3px ;margin-right: 10px">修改酒店信息</button>-->
              <!--<button @click="remove" style="font-size: 10px;width: 80px;height: 27px;line-height: 27px;border: none;border-radius: 3px">删除酒店</button>-->
              <!--<button @click="examine" style="font-size: 10px;width: 80px;height: 27px;line-height: 27px;border: none;border-radius: 3px">查看酒店部门</button>-->
              <el-button @click="amend" type="primary" size="mini">修改酒店信息</el-button>
              <el-button @click="remove" type="danger" size="mini" >删除酒店</el-button>
              <el-button @click="examine" type="primary" size="mini">查看酒店部门</el-button>


            </li>
            <li></li>
          </ul>
        </div>
      </el-main>
    </el-container>
    <!--点击修改酒店-->
    <el-dialog
      :visible.sync="dialog"
      :close-on-click-modal='false'
      width="60%"
      class="dialog-style"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <div class="basicInfo">
        <el-steps :active="active" finish-status="success" align-center="true">
          <el-step title="修改酒店信息" ></el-step>
          <el-step title="修改酒店管理员"></el-step>
          <el-step title="修改路眼配置"></el-step>
          <el-step title="修改微信支付配置"></el-step>
        </el-steps>
        <div class="hotel_amend"  v-if="active===0" >
          <el-container>
            <el-aside width="64%" style="background: white">
              <div class="left">
                <p>基本信息</p>
                <ul>
                  <!--<li> <span>所属集团：</span><el-input v-model="affiliation_name " style="width: 217px" placeholder="请输入内容" :disabled="true"></el-input></li>-->
                  <li>
                    <span><i style="color: red;font-size: 18px">*</i>酒店全称:</span>
                    <el-input v-model="input" style="width: 246px;" placeholder="请输入内容" size="mini"></el-input>
                  </li>
                  <li>
                    <span> <i style="color: red;font-size: 18px">*</i>酒店简称：</span>
                    <el-input v-model="hotel_input" style="width: 246px;" placeholder="请输入内容"
                              size="mini"></el-input>
                  </li>
                  <li>
                    <span> <i style="color: red;font-size: 18px">*</i>代码：</span>
                    <el-input v-model="code" placeholder="请输入内容"style="width: 246px;" size="mini"></el-input>
                  </li>
                  <li>
                    <span >中文描述：</span>
                    <el-input v-model="desc " placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
                  </li>
                  <li>
                    <span >英文描述：</span>
                    <el-input v-model="desc_en " placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
                  </li>
                </ul>
                <p>联系方式</p>
                <ul>
                  <li>
                    <span>总机：</span>
                    <el-input v-model="office_tel " maxlength="12" placeholder="请输入内容" style="width: 246px;"
                              size="mini"></el-input>
                  </li>
                  <li>
                    <span>国家：</span>
                    <el-select v-model="country_code" placeholder="请选择" filterable size="mini" style="width: 246px;">
                      <el-option
                        v-for="item in country_code_list"
                        :key="item.value"
                        :label="item.descript"
                        :value="item.code">
                      </el-option>
                    </el-select>
                  </li>

                  <li>
                    <span>订房电话：</span>
                    <el-input v-model="reserve_tel " placeholder="请输入内容" maxlength="12" style="width: 246px;"
                              size="mini"></el-input>
                  </li>
                  <li>
                    <span>州/省：</span>
                    <!--<el-input v-model="province" placeholder="请输入内容" style="width: 210px" size="mini"></el-input>-->
                    <el-select v-model="province" placeholder="请选择" filterable size="mini" style="width: 246px;"
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
                    <span> 服务电话：</span>
                    <el-input v-model="service_tel" placeholder="请输入内容" maxlength="12" style="width: 246px;"
                              size="mini"></el-input>
                  </li>
                  <li>
                    <span><i style="color: red;font-size: 18px">*</i>城市：</span>
                    <!--<el-input v-model="city" placeholder="请输入内容" style="width: 210px" size="mini"> </el-input>-->
                    <el-select v-model="city" placeholder="请选择" size="mini" filterable style="width: 246px;"
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
                    <el-input v-model="fax" placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
                  </li>
                  <li style="height:28px;">
                    <span>地理位置：</span>
                    <span
                      style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 38px;display: inline-block;">东经：</span>
                    <input style="width: 76px;height:28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px;line-height: 28px"
                           v-model="position_east">
                    <span
                      style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 38px;display: inline-block">北纬：</span>
                    <input style="width: 76px;height: 28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px;line-height: 28px"
                           v-model="position_west">

                  </li>
                  <li style="height: 28px;">
                    <span>状态：</span>
                    <el-radio v-model="normal" label="1">正常</el-radio>
                    <el-radio v-model="normal" label="0">停用</el-radio>
                  </li>
                  <li>
                    <span >官网：</span>
                    <el-input v-model="web_site " placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
                  </li>
                  <li>
                    <span >邮箱：</span>
                    <el-input v-model="email" placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
                  </li>
                  <li style="width: 90%;height: 260px ;">
                    <el-upload
                      class="upload-demo"
                      drag
                      action="https://oss.crowncrystalhotel.com/resource/hotel_photo/upload"
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
              <div class="right">
                <div class="log_amd" style="margin-top: 40px;text-align: center">
                  <el-upload
                    class="avatar-uploader"
                    action="https://oss.crowncrystalhotel.com/resource/hotel_logo/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="src_log" :src="src_log" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon">log</i>
                  </el-upload>
                </div>
                <ul class="site_right">
                  <li style="margin-top: 10px">
                    <span style="margin-left: 20px;">DNS：</span>
                    <el-input v-model="dns " placeholder="请输入内容" style="width: 246px;margin-bottom: 10px"
                              size="mini"></el-input>
                  </li>
                  <li style="margin-top: 10px">
                    <span style="margin-left: 20px">邮编：</span>
                    <el-input v-model="postal_code" size="mini" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                              ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容"
                              style="width: 246px;margin-bottom: 10px"></el-input>
                  </li>
                  <li style="margin-top: 10px">
                    <i style="color: red;font-size: 18px;vertical-align: top">*</i>
                    <span style="vertical-align: top">地址1 ：</span>
                    <textarea style="width: 246px; height: 140px;resize: none" v-model="address_1 "></textarea>
                  </li>
                  <li style="margin-top: 10px">
                    <span style="vertical-align: top ;margin-left: 10px">地址2 ：</span>
                    <textarea style="width: 246px; height: 140px;resize: none" v-model="address_2 "></textarea>
                  </li>
                </ul>
              </div>
            </el-main>
          </el-container>
          <span slot="footer" class="dialog-footer" style="float: right">
            <!--<el-button @click="dialog = false" size="mini">取 消</el-button>-->
            <el-button type="primary" @click="save()" size="mini">确 定</el-button>
             <el-button @click="next" type="warning" plain size="mini">跳过</el-button>
          </span>
        </div>
        <div class="admin_add" v-if="active===1" style="margin-top: 10px">
          <ul>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>用户账号：</span>
              <el-input v-model="user_name" placeholder="请输入内容" style="width: 500px;" size="mini"></el-input>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>用户密码：</span>
              <el-input v-model="user_password" placeholder="请输入内容" type="password" style="width: 500px;"
                        size="mini"></el-input>
            </li>
            <li>
              <span> <i style="color: red;font-size: 18px">*</i>用户姓名：</span>
              <el-input v-model="real_name" style="width:500px;" placeholder="请输入内容" size="mini"></el-input>
            </li>

            <li>
              <span >昵称：</span>
              <el-input v-model="nick_name" placeholder="请输入内容" style="width: 500px;" size="mini"></el-input>
            </li>

            <li>
              <span >生日：</span>
              <el-date-picker
                v-model="birth_date"
                type="date"
                style="width: 500px;"
                size="mini"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </li>
            <li>
              <span >国籍：</span>
              <el-select v-model="manage_code" placeholder="请选择" filterable size="mini" style="width: 500px;">
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
              <el-input v-model="manage_phone" placeholder="请输入内容" style="width: 500px;" maxlength="11" size="mini"
                        oninput="value=value.replace(/[^\d]/g,'')"></el-input>
            </li>

            <li >
              <span >微信号 : </span>
              <el-input v-model="wechat " placeholder="请输入内容" style="width: 500px;" maxlength="11"
                        size="mini"></el-input>
            </li>
            <li style="height: 28px">
              <span> 人员状态：</span>
              <el-radio v-model="manage_radio" label="1">正常</el-radio>
              <el-radio v-model="manage_radio" label="0">停用</el-radio>
            </li>
            <li style="height: 28px">
              <span>性别：</span>
              <el-radio v-model="gender" label="男">男</el-radio>
              <el-radio v-model="gender" label="女">女</el-radio>
            </li>
            <li>
              <span style="vertical-align: top">照片：</span>
              <el-upload
                style="display: inline-block"
                class="avatar-uploader"
                action="https://oss.crowncrystalhotel.com/resource/employee/upload"
                :show-file-list="false"
                :on-success="handleAvatarHotel"
                :before-upload="beforeAvatarUpload">
                <img v-if="man_log" :src="man_log" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">照片</i>
              </el-upload>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer" style="float: right">
            <el-button type="primary"  size="mini" @click="manage_add">确定</el-button>
           <el-button @click="next" size="mini"  type="warning" plain>跳过</el-button>
        </span>
        </div>
        <div class="police_amend"  v-if="active===2"  style="margin-top: 20px">
          <ul>
            <li>
              <span>用户名：</span>
              <el-input v-model="ispider_user" placeholder="请输入用户名" size="mini" style="width: 500px;"></el-input>
            </li>
            <li>
              <span>用户密码：</span>
              <el-input v-model="ispider_password" placeholder="请输入用户密码" size="mini"  type="password"  style="width: 500px;"></el-input>
            </li>
            <li>
              <span>公安管理员账号：</span>
              <el-input v-model="sh_police_manager" placeholder="请输入公安管理员账号" size="mini" style="width: 500px;"></el-input>
            </li>
            <li>
              <span>公安管理员密码：</span>
              <el-input v-model="sh_police_password" placeholder="请输入公安管理员密码" type="password"  size="mini" style="width: 500px;"></el-input>
            </li>
            <li>
              <span>一楼电梯口摄像头名称：</span>
              <el-input v-model="call_elevator_camera" placeholder="请输入一楼电梯口摄像头名称" size="mini" style="width: 500px;"></el-input>
            </li>
            <li>
              <span>电梯识别名：</span>
              <el-input v-model="elevator_marks" placeholder="请输入电梯识别名" size="mini" style="width: 500px;"></el-input>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer" style="float: right">
             <!--<el-button type="danger" plain  size="mini" @click="dialog=false">退出</el-button>-->
            <el-button type="primary"  size="mini" @click="police_determine">确 定</el-button>
           <el-button @click="next" size="mini"  type="warning" plain>跳过</el-button>
        </span>
        </div>
        <div class="payment_amend " v-if="active===3" style="margin-top: 20px">
          <!--<div>-->
            <!--<span style="display: inline-block;width: 200px;text-align: right">支付方式：</span>-->
            <!--<el-select v-model="disburse" placeholder="请选择" size="mini" style="width: 500px;">-->
              <!--<el-option-->
                <!--v-for="item in disburse_list"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</div>-->
          <ul >
            <li>
              <span><i style="color: red;font-size: 18px">*</i>app_id ：</span>
              <el-input v-model="pub_app_id" placeholder="请输入公众号app_id" style="width: 500px;" size="mini"
                        clearable></el-input>
            </li>
            <li>
              <span> <i style="color: red;font-size: 18px">*</i>支付商户号 ：</span>
              <el-input v-model="pay_mch_id" placeholder="请输入mch_id" style="width: 500px;" size="mini"
                        clearable></el-input>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>支付密钥 ：</span>
              <el-input v-model="pay_api_key" placeholder="请输入api_key" style="width: 500px;" size="mini"
                        clearable></el-input>
            </li>
            <li>

              <span> <i style="color: red;font-size: 18px">*</i>账单服务器IP ：</span>
              <el-input v-model="server_ip" placeholder="请输入账单服务器IP" style="width: 500px;" size="mini"
                        clearable></el-input>
            </li>
            <li>
              <span> <i style="color: red;font-size: 18px">*</i>支付结果通知域名 ：</span>
              <el-input v-model="server_domain" placeholder="请输入支付结果通知域名" style="width: 500px;" size="mini"
                        clearable></el-input>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer" style="float: right">
                <el-button type="primary"  size="mini" @click="payment_determine">确 定</el-button>
               <el-button @click="next" size="mini" type="warning" plain>跳过</el-button>
             </span>
        </div>
        <div class="success"  v-if="active===4" style="margin-left: 35%">
          <div style="width: 400px;height: 300px;color: #a4da89;text-align: center;line-height: 300px;font-size: 30px">设置完成</div>
          <el-button @click="dialog=false" size="mini" type="success" style="float: right">完成</el-button>
        </div>
      </div>

    </el-dialog>
  </div>
</template>
<script>
  import eventVue from './eventVue';
  import crypto from 'crypto';
  import md5 from 'js-md5';
  export default {
    name: "hotel",
    data() {
      return {
        // 'http://47.98.113.173:9022'
        url: this.api.api_9022_9519,
        title: '',
        input: '',
        authorization_token: '',
        checked: true,
        country_code_list: [],
        bit_list: [],
        //log
        dialogImageUrl: '',
        dialogVisible: false,
        dialog: false,//修改酒店的页面
        basic: false,//新增机构显示的页面
        info: true,//页面打开显示的页面
        bits: '',//监测酒店数据id的变动
        hotel_list: [],//接受后台传过来的酒店数据
        section_list: [],//接收后台传的部门信息
        hotel_id: '',//修改酒店的id
        toFatherList: [],
        imageUrl: '',
        //蒙版信息
        //  full_name :'', //酒店全称
        short_name: '',   //酒店简称
        hotel_input: '',//酒店简称
        code: '',  //代码
        radio: "1",//审核状态
        desc: '',//中文描述
        desc_en: '',//英文描述
        // 集团蒙版的联系方式
        office_tel: '',//总机
        country_code: '',//国家
        reserve_tel: '',//订房电话
        province: '',//州/省
        service_tel: '',//服务电话
        city: '',//城市
        fax: '',//传真
        //地理位置
        position_east: '',// 东经
        position_west: '',// 北纬
        position: '',
        //状态
        normal: '1',//正常
        web_site: '',//官网
        email: '',//邮箱
        photo: '',//集团照片
        log: '',//log
        dns: '',//DNS
        postal_code: '',//邮编
        address_1: '',//地址1
        address_2: '',//地址二
        bit: [],
        // hotelid:'',
        old_list: [],
        detection: '',//
        splict_add: [],//地理位置
        imge_list: '',
        src_log: '',
        src_group: '',
        get_division_list: [],//获取城市
        continent_list: [],//获取洲省
        country_code_id: "",
        province_code_id: '',
        city_id: '',
        active:0,
         /* * 路眼配置字段
          * */
        ispider_user:'',//用户名
        ispider_password:'',//用户密码
        sh_police_manager:'',//公安管理员登陆账号
        sh_police_password:'',//公安管理员登陆密码
        call_elevator_camera:'',//一楼电梯口的摄像头名字
        elevator_marks:'',//电梯标识名
        hotel_group:'',//集团id;
        grogshop:'',//新建一个酒店的id
        oculomotor_id:'',//修改路眼的id
        sh_police_password_length:'',//公安密码的length
        length:'',//用户密码的length
        eye_list:[],//获取路眼
        /**支付配置*/
        disburse:'0',//选择的支付方式
        disburse_list:[
        {
          value: '0',
          label: '微信支付'
        },
        {
          value: '1',
          label: '支付宝支付'
        },
        {
          value: '2',
          label: '收钱吧'
        },

      ],
        //微信配置
        server_ip: '',//生成微信账单的服务器IP
        pub_app_id: '',//app_id
        pay_api_key: "",//支付密钥
        pay_mch_id: '',//支付商户号
        server_domain: '',//支付结果通知域名
        pay_id: "",//修改微信配置的id
        payment_list:[],//获取微信配置
        /**酒店管理员*/
        user_name:'',//用户账号
        user_password:'',//用户密码
        real_name:'',//用户姓名
        nick_name:'',//昵称v
        birth_date:'',//生日
        manage_code:'',//国籍
        manage_phone:'',//手机号
        wechat: '',//微信号
        manage_radio:"1",
        gender: '男',//性别
        imge_man: '',
        man_log: '',
        gain_list:[],
        commid:'',//所点击的酒店管理员
        head_image:'',
      }
    },
    created: function () {
      let that = this;
      // that.country_info();
      //JSON.parse
      that.hotelid = sessionStorage.getItem("hotelid")
      // that.examine();
    },
    props: ["hotelid"],
    watch: {
      hotelid(val, oldval) {
        let that = this;
        that.hotelid = val;
        that.hotel_type();
      }
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
              console.log(res.data);
              this.country_code_list = res.data.data.results;
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
          if (flag && data == list_code[i].code) {
            return list_code[i].descript
          } else if (!flag && data == list_code[i].descript) {
            return list_code[i].code
          }
        }
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
      //酒店信息
      hotel_type() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/hotel/get_info/" + that.hotelid,
          "method": "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              // if(data.children!=""){
              that.bit = res.data.data;
              console.log(that.bit);
              that.src_log =  that.bit.logo;
              that.src_group = that.bit.photo;
              // console.log(that.src_log);
              that.splict_add = that.bit.position.split(",")
              that.position_east = that.splict_add[0];
              that.position_west = that.splict_add[1];
              that.country_code_id = that.bit.country_dict.desc;
              that.province_code_id = that.bit.province_dict.desc;
              that.city_id = that.bit.division_dict.desc;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //查看部门信息
      examine() {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 3 || root_level === 2 || root_level === 1) {
          this.$router.push({path: "/organizationchart/sections"})
          sessionStorage.setItem("branch_id", this.bit.id)
          console.log(this.bit.id);
        } else {
          this.hintInfo("warning", "您没有权限查看酒店部门")
        }
      },
      //修改酒店信息
      amend() {
        let that = this;
        console.log(sessionStorage.getItem("root_level"));
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 2 || root_level === 1) {
          let bit = that.bit;
          if (bit.country_dict) {
            that.country_info();
          }
          that.active=0;
          that.dialog = true;
          that.title = "修改酒店信息";
          console.log(that.bit);
          that.input = bit.full_name;
          that.hotel_id = bit.id;
          that.hotel_group = bit.hotel_group_id;
          that.hotel_input = bit.short_name;
          that.code = bit.code;
          that.desc_en = bit.desc_en;
          that.desc = bit.desc;
          that.office_tel = bit.office_tel;
          that.country_code = bit.country_dict.code;
          that.reserve_tel = bit.reserve_tel;
          that.province = bit.province_dict.code;
          that.service_tel = bit.service_tel;
          that.city = bit.division_dict.code;
          that.fax = bit.fax;
          // this.position_east=bit.position;
          that.position_west = bit.position;

          that.normal = bit.status + "",
            that.web_site = bit.web_site;//官网
          that.email = bit.email;//邮箱
          that.photo = bit.photo;//集团照片
          that.log = that.src;//log
          that.dns = bit.dns;//DNS
          that.postal_code = bit.postal_code;//邮编
          that.address_1 = bit.address_1;//地址1
          that.address_2 = bit.address_2;//地址二
          that.splict_add = bit.position.split(",")
          that.position_east = that.splict_add[0];
          that.position_west = that.splict_add[1];
          that.way_eye(bit.id);//获取路眼
          that.payment_type(bit.id);//获取微信支付
          that. gain_hotel(bit.id);//获取酒店管理员
        } else {
          this.hintInfo("warning", "您没有权限修改酒店信息")
        }
      },
      /***获取路眼配置*/
      way_eye(value){
        let that =this;
        that.$axios({
          url:that.api.api_9530_9503+"/v1/security/config/list",
          method:"post",
          data:{
            hotel_id:value,
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
              let eye = res.data.data.list[0];
              that.eye_list= res.data.data.list;
              if(res.data.data.list.length>0){
                that.ispider_user=eye.ispider_user,//用户名
                that.ispider_password=eye.ispider_password,//用户密码
                that.length = eye.ispider_password.length;
                that.sh_police_manager=eye.sh_police_manager,//公安管理员登陆账号
                that.sh_police_password=eye.sh_police_password,//公安管理员登陆密码
                that.sh_police_password_length = eye.sh_police_password.length;
                that.call_elevator_camera=eye.sh_police_manager,//一楼电梯口的摄像头名字
                that.elevator_marks=eye.elevator_marks;//电梯标识名
                that.oculomotor_id = eye.id;
                that.hotel_id = eye.hotel_id;
              }else {
                that.ispider_user='',//用户名
                that.ispider_password='',//用户密码
                that.sh_police_manager='',//公安管理员登陆账号
                that.sh_police_password='',//公安管理员登陆密码
                that.call_elevator_camera='',//一楼电梯口的摄像头名字
                that.elevator_marks='';//电梯标识名
                // that.oculomotor_id = eye.id;
                // that.hotel_id = eye.hotel_id;
              }

            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      /**确定修改路眼设置*/
      police_determine(){
        let that = this;
        if(that.eye_list.length>0){
          that.police_confirm();
        }else {
          that. police_increase();
        }
      },
      /**新增路眼配置的确定*/
      police_increase(){
        let that =this;
        that.$axios({
          url:that.api.api_9530_9503+"/v1/security/config/add",
          method:"post",
          data:{
            ispider_user:that.ispider_user,//用户名
            ispider_password:md5(that.ispider_password),//用户的密码
            sh_police_manager:that.sh_police_manager,//公安旅馆web的管理员登录名
            sh_police_password:md5(that.sh_police_password),//公安旅馆web的管理员的密码
            call_elevator_camera:that.call_elevator_camera,//一楼电梯口的摄像头名字
            elevator_marks:that.elevator_marks,//逗号分隔的电梯标识名
            // hotel_group_id:that.hotel_group,//集团
            hotel_id:that.hotel_id,//酒店

          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
              that.next();//执行下一步
              that.hintInfo("success", "配置路眼成功")
            }else {
              that.hintInfo("error", "配置路眼失败")
            }
          })
          .catch(err=>{
            console.error(err)
          })
      },
      /**修改路眼配置的确定*/
      police_confirm(){
        let that =this;
        let ispider_password,sh_police_password;
        if (that.ispider_password.length < that.length) {
          ispider_password = that.getmd5(that.ispider_password)
        } else {
          ispider_password = that.ispider_password;
        }

        if (that.sh_police_password.length < that.sh_police_password_length) {
          console.log(1);
          sh_police_password = that.getmd5(that.sh_police_password)
        } else {
         sh_police_password = that.sh_police_password;
        }
        that.$axios({
          url:that.api.api_9530_9503+"/v1/security/config/update/"+that.oculomotor_id,
          method:"post",
          data:{
              ispider_user:that.ispider_user,//用户名
              ispider_password:ispider_password,//用户密码
              sh_police_manager:that.sh_police_manager,//公安管理员登陆账号
              sh_police_password:sh_police_password,//公安管理员登陆密码
              call_elevator_camera:that.sh_police_manager,//一楼电梯口的摄像头名字
              elevator_marks:that.elevator_marks,//电梯标识名
              // hotel_group_id:that.hotel_group,//集团
              hotel_id:that.hotel_id,//酒店
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
             that.hintInfo("success","路眼配置修改成功")
              that.next();
            }else {
              that.hintInfo("warning",res.data.message)
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },

      /**获取微信支付配置d的方式*/
      payment_type(value){
        let that =this;
        that.$axios({
          url:that.api.api_9530_9503+"/v1/payment/weixin_config/list",
          method:"post",
          data:{
            hotel_id:value,
            pub_usage:0
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
             let pay=res.data.data.list[0];
              that.payment_list = res.data.data.list;
             if(res.data.data.list.length>0){
               console.log(pay);
               that.pub_app_id=pay.pub_app_id;//pub_app_id:
               that.pay_mch_id=pay.pay_mch_id;//支付商户号
               that.pay_api_key=pay.pay_api_key;//支付密钥
               that.server_domain=pay.server_domain;//支付结果通知域名
               that.server_ip=pay.server_ip;
               that.pay_id = pay.id;
               that.pay_hotel_id = pay.hotel_id;
             }else {
               //微信配置
               that.server_ip= '';//生成微信账单的服务器IP
               that.pub_app_id= '';//app_id
               that.pay_api_key= "";//支付密钥
               that.pay_mch_id='';//支付商户号
               that.server_domain= '';//支付结果通知域名
             }

            }else {
              that.hintInfo("warning",res.data.message)
            }
          })
          .catch(err=>{
            console.log(err)
          })
      },
      /***修改支付配置确定*/
      payment_determine(){
         let that =this;
         if(that.payment_list.length>0){
           that.payment_confirm();
         }else {
           that.payment_increase();
         }
      },
      /**确定封装微信修改配置*/
      payment_confirm (){
        let that =this;
        that.$axios({
          url:that.api.api_9530_9503+"/v1/payment/weixin_config/update/"+that.pay_id,
          method:"post",
          data:{
            pub_app_id: that.pub_app_id,//pub_app_id:
            pay_mch_id: that.pay_mch_id,//支付商户号
            pay_api_key: that.pay_api_key,//支付密钥
            server_domain: that.server_domain,//支付结果通知域名
            server_ip: that.server_ip,
            pub_usage:0,//所绑定公众号的用途 0-支付， 1-公众号， 2-小程序。 hotel_id + pub_usage 须全表唯一
            hotel_id:that.hotel_id,//酒店
          }
        })
          .then(res=>{
            if(res.data.message="success"){
              that.hintInfo("success","微信支付配置修改成功")
              that.next();
            }else {
              that.hintInfo("warning",res.data.message)
            }
          })
          .catch(err=>{
            console.log(err);
          })
      },
      /**新增微信配置确定*/
      payment_increase(){
        let that =this;
        that.$axios({
          url:that.api.api_9530_9503+ "/v1/payment/weixin_config/add",
          method:"post",
          data:{
            pub_app_id: that.pub_app_id,//pub_app_id:
            pay_mch_id: that.pay_mch_id,//支付商户号
            pay_api_key: that.pay_api_key,//支付密钥
            server_domain: that.server_domain,//支付结果通知域名
            server_ip: that.server_ip,
            pub_usage:0,//所绑定公众号的用途 0-支付， 1-公众号， 2-小程序。 hotel_id + pub_usage 须全表唯一
            hotel_id:that.hotel_id,//酒店
            // hotel_group_id:3,//集团
            // hotel_id:3,//酒店
          }
        })
          .then(res=>{
            console.log(res);
            if(res.data.message==="success"){
              that.next();//执行下一步
              that.hintInfo("success", "配置微信支付成功")
            }else {
              that.hintInfo("error", "配置微信支付失败")
            }
          })
          .catch(err=>{
            console.error(err)
          })
      },
      /**修改酒店员工确定*/
      manage_add(){
        let that =this,urldata;
        if(that.gain_list.length>0 ){
          urldata = true;
        }else {
          urldata = false;
        }
        that.amend_hotel(urldata);
      },
      /**获取酒店员工*/
      gain_hotel(value){
        let that =this;
        this.$axios({
          url: that.url + "/v1/common/employee/root_list",
          method: "post",
          data: {
            hotel_id: value,
            include_self:0
          }

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              // let hotel = res.data.data.list[0].id;
              that.commid =res.data.data.list[0].id;
              that.gain_list = res.data.data.list;
              that.$axios({
                url: that.url + "/v1/common/employee/get_info/" + res.data.data.list[0].id,
                method: "get",
              })
                .then(res => {
                  if (res.data.message === "success") {
                    console.log(res);
                    let srow = res.data.data.data;
                    that.Edite = true;
                    that.length = srow.password.length;
                    that.real_name=srow.real_name;//用户姓名
                    that.nick_name=srow.nick_name,//简称
                    that.user_name= srow.user_name,//用户名
                    that.user_password= srow.password,//密码
                    that.birth_date=srow.birth_date,//生日
                    that.manage_phone=srow.phone,//电话
                    that.wechat=srow.wx_code,//微信
                    that.manage_code=srow.country_code,//国家
                    that.manage_radio= srow.status + "",//人员状态
                    that.head_image=srow.head_image,//照片
                    that.gender= srow.gender;//性别
                    if(srow.hotel_id){
                      that.hotel_name_id = srow.hotel_id.id;//所属酒店的id
                    }
                    if(srow.hotel_group_id){
                      that.hotel_full_id = srow.hotel_group_id.id
                    }
                    if(srow.head_image){
                      that.man_log = srow.head_image;
                    }

                  }
                  else {
                    console.log(res.data.message);
                  }
                })
                .catch(error => {
                  console.log(error);
                });


            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            // console.log(error);
          });
      },
      /**修改/增加酒店员工*/
      amend_hotel(value) {
        let that = this;
        if ((!that.real_name) || (!that.user_name) || (!that.user_password) || (!that.manage_phone)) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
          if (!tel.test(that.manage_phone)) {
            that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
          } else {
            let  urldata = value ? (that.url + "/v1/common/employee/update/" + that.commid) : (that.url + "/v1/common/employee/add_root");
            console.log(value);
            let p_d;
            if (value === false) {
              p_d = that.getmd5(that.user_password);

            } else {
              if (that.user_password.length < that.length) {
                p_d = that.getmd5(that.user_password)
              } else {
                p_d = that.user_password;
              }

            }
            let man_log;
            if(that.imge_list!==''){
              man_log = that.imge_list;
            }else {
              man_log = that.head_image;
            }
            this.$axios({
              url: urldata,
              method: "post",
              data: {
                real_name: that.real_name,//用户姓名
                nick_name: that.nick_name,//简称
                user_name: that.user_name.toLowerCase(),//用户名
                password: p_d,//密码
                birth_date: that.birth_date,//生日
                phone: that.manage_phone,//电话
                wx_code: that.wechat,//微信
                country_code: that.country_code,//国家
                hotel_group_id: that.hotel_group,//新增人员的集团信息
                hotel_id: that.hotel_id,//新增人员的酒店信息
                status: that.manage_radio + "",//人员状态
                head_image: that.imge_list,//照片
                gender: that.gender,//性别
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  if (value) {
                    that.hintInfo("success", "修改人员成功")
                  } else {
                    that.hintInfo("success", "新增人员成功")
                  }
                  that.next();
                }
                else {
                  that.hintInfo("warning", res.data.message)
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }
      },
      /**点击修改酒店信息显示蒙版后的保存*/
      save() {
        let that = this;
        if ((!that.input) || (!that.hotel_input) || (!that.code)
          || (!that.city) || (!that.normal) || (!that.address_1)
        ) {
          that.hintInfo("warning", "* 为必填项")

        } else {
          // let tel = /0\d{2,3}-\d{7,8}/;
          // if (!tel.test(that.reserve_tel) && !tel.test(that.office_tel) && !tel.test(that.service_tel)) {
          //   that.hintInfo("warning", "座机号码需以0开始,中间使用-分隔符")
          // } else {

            that.$axios({
              url: that.url + "/v1/common/hotel/update/" + that.hotel_id,
              method: "post",
              // params:{},
              data: {
                //集团蒙版的基本信息
                full_name: that.input, //酒店全称
                short_name: that.hotel_input,   //酒店简称
                code: that.code, //代码
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
                  // console.log(res.config.data);
                  that.hotel_type();
                  this.$emit('handleClick');
                  that.hintInfo("success", "修改酒店成功")
                  that.next();
                  // this.detection=1;
                  // this.old_list = JSON.stringify(res.config.data)
                  // sessionStorage.setItem('bit_list',JSON.stringify(res.config.data));
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
        // }
      },
      /**修改酒店的步骤条*/
      next() {
        if (this.active++ > 4){
          this.active = 4;
        }
      },
      //删除酒店
      remove() {
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 3 || root_level === 2 || root_level === 1) {
          console.log(this.bits);
          let hotel_id = this.bit.id;
          console.log(hotel_id);
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            // list.splice(index, 1);
            this.$axios({
              url: this.url + "/v1/common/hotel/remove/" + hotel_id,
              method: "get",
            })
              .then(res => {
                console.log(res.message)
                if (res.data.message === "success") {
                  this.$emit('handleClick');
                  this.hotel_type();
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
          this.hintInfo("warning", "您没有删除酒店权限")
        }
      },
      //如果认证错误
      new_authorization(msg) {
        let that = this;
        if (msg === "authorization invalid") {
          that.authorization()
        }
      },
      break() {
        let that = this;
        that.hotel_type()
      },
      /**
       * 点击上传酒店logo 方法
       * */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
        // this.imge_list = file.response.url;
        // this.src_log = "https://image.eloadspider.com/" + file.response.url;
        // this.man_log = "https://image.eloadspider.com/" + file.response.url;
        this.imge_list =file.response.complete;
        this.src_log = file.response.complete;
        if(file.response.message==="success"){
          this.hintInfo("success", "上传图片成功")
        }else {
          this.hintInfo("warning", "上传图片失败")
        }
      },
      /**酒店管理员的照片*/
      handleAvatarHotel(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
        if(file.response.url){
          this.hintInfo("success", "上传照片成功")
        }else {
          this.hintInfo("warning", "上传照片成功")
        }
        this.imge_list =file.response.complete;
        this.man_log = file.response.complete;

      },
      beforeAvatarUpload(file) {
        console.log(file);
        // this.imge_list = file.
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG或者PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },

      //集团照片
      handlehotel_group(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
          that.$message.error('出错了！');
        }
      },

    },
  }
</script>

<style lang="less" scoped>
  .hotel {
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    .left {
      .message {
        padding-left: 10px;
        p {
          font-size: 16px;
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
              line-height: 30px;
              padding-left: 10px;
            }
          }
        }
      }
      .contact {
        padding-left: 10px;
        p {
          font-size: 16px;
          /*height: 60px;*/
          /*line-height: 60px;*/
          margin: 10px 0;
          font-weight: bold;
        }
        ul {
          overflow: hidden;
          li {
            float: left;
            height: 30px;
            width: 50%;
            font-size: 16px;
            margin-bottom: 10px;
            span {
              width: 78px;
              display: inline-block;
              vertical-align: top;
            }
            div {
              display: inline-block;
              width: 70%;
              height: 30px;
              border: 1px solid rgb(204, 204, 204);
              border-radius: 4px;
              line-height: 30px;
              padding-left: 10px;
            }

          }
        }
      }
      .phone {
        width: 80%;
        height: 327px;
        /*line-height: 398px;*/
        text-align: center;
        /*background: white;*/
        margin-left: 31px;
        margin-top: 32px;
        margin-bottom: 24px;
        img {
          width: 100%;
          height: 327px;
        }
      }
    }
    .right {
      .log {
        width: 80%;
        height:227px;
        background: white;
        margin-bottom: 10px;
        margin-top: 10px;
        img {
          width: auto;
          height: 227px;
          margin-left: 134px;
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
            width: 70%;
            height: 30px;
            border: 1px solid rgb(204, 204, 204);
            border-radius: 4px;
            line-height: 30px;
            padding-left: 10px;
          }
        }
      }
      .establish {
        /*margin-left: 79px;*/
        font-size: 16px;
        li {
          margin-bottom: 32px;
        }
      }
    }
    .basicInfo {
      width: 100%;
      height: 85%;
      overflow-y: scroll;
      background: white;
      .left {
        p {
          width: 80px;
          font-size: 16px;
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
            margin-bottom:10px;
            span {
              width: 80px;
              display: inline-block;
              text-align: right;
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
            margin-bottom: 10px;
            span {
              width: 80px;
              display: inline-block;
              vertical-align: top;
              text-align: right;
            }
          }
        }
      }
      .phone {
        width: 100%;
        height: 230px;
        /*line-height: 398px;*/
        text-align: center;
        background: white;
        margin-left: 31px;
        /*margin-top: 15px;*/
        margin-bottom: 24px;
        border: 1px solid rgb(204, 204, 204);
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          max-width: 100%;
          max-height: 200px;

        }
      }
      .right {
        .site {
          font-size: 16px;
          margin-bottom: 10px;
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
      .police_amend,.payment_amend,.admin_add{
        li{
          margin-top: 10px;
          span{
            display: inline-block;
            width: 200px;
            text-align: right;
          }
        }
      }
    }
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
