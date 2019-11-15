<template>
  <div class="organization">
    <div class="tree">
      <router-link to="/organization/basic-info">
        <div class="serialNumber" style="color: black;font-size: 16px;margin: 0"><span>集团信息:</span>
          <span style="margin: 0;color:#4488e9; font-size: 16px">{{group_name}}</span>
          <!--<span style=" font-size:26px; margin-left: 84px;margin-top: 10px;margin-bottom: 20px"  @click="group_add" >+</span>-->
        </div>
      </router-link>
      <el-select v-model="group" placeholder="请选择集团" clearable @change="bloc" size="mini"
                 style="margin-left: 10px;width: 230px;">
        <el-option
          v-for="item in group_list"
          :key="item.value"
          :label="item.full_name"
          :value="item.id">
        </el-option>
      </el-select>
      <div class="btn" style="margin-top: 10px;margin-left: 10px">
        <el-button type="primary" plain @click="group_add()" size="mini" style="width: 90px;">新增集团</el-button>
        <el-button type="primary" plain @click="hotel_add(); flush()" size="mini" style="width: 90px;">新增酒店</el-button>
      </div>
      <!--<div class="moduleTree" style="margin-top: 60px"><router-link to="/organizationchart/hotel"><span style="color: black">添加酒店</span></router-link></div>-->
      <div class="content">
        <div class="control">
          <el-tree
            :data="hotel_list"
            node-key="node.id"
            :expand-on-click-node="true"
            default-expand-all
            node-contextmenu
            @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                    <!--<router-link to="/organizationchart/hotel">-->
                     <span class="my_node" :data-id="data.id " style="padding-left: 15px;"
                           @click="section_click(node,data)">{{data.name}}</span>
                   <!--</router-link>-->
                    <span style="margin-left: 50px ;position: absolute;right: 0">
                      <!--<i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>-->
                      <!--<i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px "></i>-->
                      <i class="el-icon-circle-plus" @click="() => append(data)" style="margin-right: 30px "
                         title="新增部门"></i>
                    </span>
                 </span>
          </el-tree>
        </div>
      </div>
    </div>
    <!--子路由-->
    <div class="router">
      <router-view :hotelid="hotelid" @handleClick="hande_list" ref="sections_means"></router-view>
      <div class="ini">
        <logon-view></logon-view>
      </div>
    </div>

    <!--点击新增集团-->
    <el-dialog
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="60%"
      class="dialog-style"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <div class="basicInfo">
        <el-container>
          <el-aside width="68%" style="background: white">
            <div class="left">
              <p>基本信息</p>
              <ul>
                <li>
                  <span><i style="color: red;font-size: 18px">*</i>集团全称：</span>
                  <el-input v-model="full_name "  style="width: 217px;"  placeholder="请输入内容" size="mini"></el-input>
                </li>
                <li>
                  <span> <i style="color: red;font-size: 18px">*</i>集团简称：</span>
                  <el-input v-model="short_name "  style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
                </li>
                <li>
                  <span><i style="color: red;font-size: 18px">*</i>代码：</span>
                  <el-input v-model="code" placeholder="请输入内容"  style="width: 217px;" size="mini"></el-input>
                </li>
                <li>
                  <span >中文描述：</span>
                  <el-input v-model="desc " placeholder="请输入内容"  style="width: 217px;" size="mini"></el-input>
                </li>
                <li>
                  <span >英文描述：</span>
                  <el-input v-model="desc_en " placeholder="请输入内容"  style="width: 217px;" size="mini"></el-input>
                </li>
              </ul>
              <p>联系方式</p>
              <ul>
                <li>
                  <span>总机：</span>
                  <el-input v-model="office_tel " placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                </li>
                <li>
                  <span>国家：</span>
                  <el-select v-model="country_code" placeholder="请选择" filterable size="mini" style="width: 217px;"
                             @focus="country">
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
                  <el-input v-model="reserve_tel " placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                </li>
                <li>
                  <span>州/省：</span>
                  <!--<el-input v-model="province" placeholder="请输入内容" style="width: 217px"  size="mini"></el-input>-->
                  <el-select v-model="province" placeholder="请选择" size="mini" filterable style="width: 217px;"
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
                  <span>服务电话：</span>
                  <el-input v-model="service_tel" placeholder="请输入内容" style="width: 217px;" size="mini">

                  </el-input>
                </li>
                <li>
                  <span> <i style="color: red;font-size: 18px">*</i>城市：</span>
                  <!--<el-input v-model="city" placeholder="请输入内容" style="width: 217px" size="mini"> </el-input>-->
                  <el-select v-model="city" placeholder="请选择" size="mini" filterable style="width: 217px;"
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
                  <el-input v-model="fax" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                </li>
                <li >
                  <span>地理位置：</span>
                  <span
                    style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 48px;display: inline-block">东经:</span>
                  <input style="width: 50px;height:28px;line-height: 28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px"
                         v-model="position_east">
                  <span
                    style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 50px;display: inline-block">北纬：</span>
                  <input style="width: 50px;height: 28px;line-height: 28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px"
                         v-model="position_west">

                </li>
                <li >
                  <span>状态：</span>
                  <el-radio v-model="normal" label="1">正常</el-radio>
                  <el-radio v-model="normal" label="0">停用</el-radio>
                </li>
                <li>
                  <span >官网：</span>
                  <el-input v-model="web_site " placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                </li>
                <li>
                  <span >邮箱：</span>
                  <el-input v-model="email" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                </li>
                <li style="width: 88%;">
                  <el-upload
                    style=" text-align: center"
                    class="upload-demo"
                    drag
                    action="https://oss.crowncrystalhotel.com/resource/group_photo/upload"
                    :on-success="handlehotel_group"
                    :before-upload="beforehotel_group"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  </el-upload>
                </li>
              </ul>
            </div>
          </el-aside>
          <el-main style="padding: 0">
            <div class="right">
              <div class="log" style="margin-left: 10px;margin-top: 44px;text-align: center">
                <el-upload
                  class="avatar-uploader"
                  action="https://oss.crowncrystalhotel.com/resource/group_logo/upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess_group"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="src_log" :src="src_log" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon" style="width: 246px;height: 160px;font-size: 16px">添加logo</i>
                </el-upload>

              </div>
              <ul class="site">
                <li>
                  <span >DNS ： </span>
                  <el-input v-model="dns " placeholder="请输入内容" style="width: 234px" size="mini"></el-input>
                </li>
                <li>
                  <span >邮编 ： </span>
                  <el-input v-model="postal_code" onkeypress="return event.keyCode>=48&&event.keyCode<=57"
                            ng-pattern="/[^a-zA-Z]/" placeholder="请输入内容" style="width: 234px"  size="mini"></el-input>
                </li>
                <li>
                  <span > <i style="color: red;font-size: 18px;vertical-align: top">*</i>地址1 ：</span>
                  <textarea style="width: 234px; height: 130px;resize: none;border: 1px solid #dcdfe6;border-radius: 3px"
                            v-model="address_1 "></textarea>
                </li>
                <li>
                  <span style="vertical-align: top;">地址2 ：</span>
                  <textarea style="width: 234px; height: 130px;resize: none;border: 1px solid #dcdfe6;border-radius: 3px"
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
    <!--点击新增酒店-->
    <el-dialog
      :visible.sync="dialog_hotel"
      :close-on-click-modal='false'
      width="64%"
      class="dialog-style"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <div class="basicInfo">
        <el-steps :active="active" finish-status="success" align-center="true">
          <el-step title="新增酒店" ></el-step>
          <el-step title="新增酒店管理员" ></el-step>
          <el-step title="路眼配置"></el-step>
          <el-step title="微信支付配置"></el-step>
        </el-steps>
          <div class="hotel_add" v-if="active===0" style="margin-top: 10px">
            <el-container>
              <el-aside width="66%" style="background: white">
                <div class="left" >
                  <p>基本信息</p>
                  <ul>
                    <li>
                      <span> <i style="color: red;font-size: 18px">*</i>选择集团：</span>
                      <el-select v-model="group" placeholder="请选择集团" size="mini" style="width: 246px;">
                        <el-option
                          v-for="item in group_list"
                          :key="item.value"
                          :label="item.full_name"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </li>
                    <!--<li> <span>所属集团：</span><el-input v-model="affiliation_name " style="width: 217px" placeholder="请输入内容" :disabled="true"></el-input></li>-->
                    <li>
                      <span><i style="color: red;font-size: 18px">*</i>酒店全称:</span>
                      <el-input v-model="input" style="width: 246px;" placeholder="请输入内容" size="mini"></el-input>
                    </li>
                    <li>
                      <span ><i style="color: red;font-size: 18px">*</i>酒店简称：</span>
                      <el-input v-model="hotel_input" style="width: 246px;" placeholder="请输入内容"
                                size="mini"></el-input>
                    </li>
                    <li>
                      <span> <i style="color: red;font-size: 18px">*</i>代码：</span>
                      <el-input v-model="code" placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
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
                      <span> 总机：</span>
                      <el-input v-model="office_tel " placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
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
                      <el-input v-model="reserve_tel " placeholder="请输入内容" style="width: 246px; "size="mini"></el-input>
                    </li>
                    <li>
                      <span>州/省：</span>
                      <!--<el-input v-model="province" placeholder="请输入内容" style="width: 210px" size="mini"></el-input>-->
                      <el-select v-model="province" placeholder="请选择" filterable size="mini" style="width: 246px;"
                                 @focus="province_nation">
                        <el-option
                          v-for="item in continent_list"
                          :key="item.id"
                          :label="item.descript"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <span>服务电话：</span>
                      <el-input v-model="service_tel" placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
                    </li>
                    <li>
                      <span><i style="color: red;font-size: 18px">*</i>城市：</span>
                      <!--<el-input v-model="city" placeholder="请输入内容" style="width: 210px" size="mini"> </el-input>-->
                      <el-select v-model="city" placeholder="请选择" filterable size="mini" style="width: 246px;"
                                 @focus="province_city">
                        <el-option
                          v-for="item in get_division_list"
                          :key="item.code"
                          :label="item.descript"
                          :value="item.code">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <span >传真：</span>
                      <el-input v-model="fax" placeholder="请输入内容" style="width: 246px;" size="mini"></el-input>
                    </li>
                    <li >
                      <span>地理位置：</span>
                      <span
                        style="font-size: 16px ;vertical-align: top ;margin-top: 5px;width: 48px;display: inline-block">东经:</span>
                      <input style="width: 66px;height: 28px;line-height: 28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px"
                             v-model="position_east">
                      <span
                        style="font-size: 16px;vertical-align: top;margin-top: 5px;width: 50px;display: inline-block">北纬：</span>
                      <input style="width: 66px;height: 28px;line-height: 28px; border: 1px solid rgba(204,204,204,1);border-radius: 4px"
                             v-model="position_west">

                    </li>
                    <li >
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
                    <li style="width: 88%;margin-top: 10px">
                      <el-upload
                        class="upload-demo"
                        drag
                        action="https://oss.crowncrystalhotel.com/resource/hotel_photo/upload"
                        :on-success="handlehotel_group_hotel"
                        :before-upload="beforehotel_group"
                        multiple>
                        <i class="el-icon-upload" ></i>
                        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip" style="text-align: center">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                    </li>

                  </ul>
                </div>
              </el-aside>
              <el-main style="padding: 0 10px">
                <div class="right" >
                  <div class="log" style="margin-top: 40px;text-align: center">
                    <el-upload
                      class="avatar-uploader"
                      action="https://oss.crowncrystalhotel.com/resource/hotel_logo/upload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="src_log" :src="src_log" class="avatar">
                      <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 14px;width: 246px;height: 166px;">添加logo</i>
                    </el-upload>

                  </div>
                  <ul class="site">
                    <li>
                      <span style="margin-left: 10px">DNS ： </span>
                      <el-input v-model="dns " placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                    </li>
                    <li>
                      <span style="margin-left: 10px">邮编 ： </span>
                      <el-input v-model="postal_code"  placeholder="请输入内容" style="width: 246px" size="mini"></el-input>
                    </li>
                    <li>
                      <i style="color: red;font-size: 18px;vertical-align: top">*</i>
                      <span style="vertical-align: top">地址1 ：</span>
                      <textarea style="width: 246px; height: 140px;resize: none;border: 1px solid #dcdfe6;border-radius: 3px"
                                v-model="address_1 "></textarea>
                    </li>
                    <li>
                      <span style="vertical-align: top ;margin-left: 10px">地址2 ：</span>
                      <textarea style="width: 246px; height: 140px;resize: none; border: 1px solid #dcdfe6;border-radius: 3px"
                                v-model="address_2 "></textarea>
                    </li>
                  </ul>
                </div>
              </el-main>
            </el-container>
            <span slot="footer" class="dialog-footer" style="float: right">
              <el-button @click="dialog_hotel = false" size="mini" >取 消</el-button>
              <el-button type="primary" @click=" hold()" size="mini">确 定</el-button>
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
           <div class="police"  v-if="active===2"  style="margin-top: 20px">
          <ul>
            <li>
              <span>用户名：</span>
              <el-input v-model="ispider_user" placeholder="请输入用户名" size="mini" style="width: 500px;"></el-input>
            </li>
            <li>
              <span>用户密码：</span>
              <el-input v-model="ispider_password" placeholder="请输入用户密码" size="mini" type="password" style="width: 500px;"></el-input>
            </li>
            <li>
              <span>公安管理员账号：</span>
              <el-input v-model="sh_police_manager" placeholder="请输入公安管理员账号" size="mini" style="width: 500px;"></el-input>
            </li>
            <li>
              <span>公安管理员密码：</span>
              <el-input v-model="sh_police_password" placeholder="请输入公安管理员密码"   type="password" size="mini" style="width: 500px;"></el-input>
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
            <el-button type="primary"  size="mini" @click="police_add">确 定</el-button>
           <el-button @click="next" size="mini"  type="warning" plain>跳过</el-button>
        </span>
        </div>
           <div class="payment " v-if="active===3" style="margin-top: 20px">
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
                <el-button type="primary"  size="mini" @click="payment_add">确 定</el-button>
               <el-button @click="next" size="mini" type="warning" plain>跳过</el-button>
             </span>
           </div>
           <div class="success"  v-if="active===4" style="margin-left: 35%">
             <div style="width: 400px;height: 300px;color: #a4da89;text-align: center;line-height: 300px;font-size: 30px">设置完成</div>
             <el-button @click="dialog_hotel=false" size="mini" type="success" style="float: right">完成</el-button>
           </div>
      </div>
      <!--<el-button @click="next" size="mini">跳过</el-button>-->
    </el-dialog>
    <!--新增酒店的部门-->
    <el-dialog
      :visible.sync="dialog_section"
      :close-on-click-modal='false'
      width="40%"
      :before-close="handleClose">
      <div slot="title" class="dialog_style_header-title">
        <span class="dialog_style_title-name"> {{ title }}</span>
      </div>
      <div class="message">
        <p>部门信息</p>
        <ul>
          <li>
            <span style="margin-left: 10px">所属酒店：</span>
            <el-select v-model="department_hotel " placeholder="请选择酒店" style="width: 210px" :disabled="true" clearable
                       size="mini">
              <el-option
                v-for="item in hotel_list"
                :key="item.value"
                :label="item.full_name"
                value-key="id"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <span style="margin-left: 10px">上级部门：</span>
            <el-input v-model="superior_department " style="width: 210px" placeholder="请输入内容" :disabled="true"
                      size="mini"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span>部门名称：</span>
            <el-input v-model="department_name " style="width: 210px" placeholder="请输入内容" size="mini"></el-input>
          </li>


          <li style="height: 28px;line-height: 28px">
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span>审核状态：</span>
            <el-radio v-model="radio" label="1">已通过</el-radio>
            <el-radio v-model="radio" label="0">未通过</el-radio>
          </li>
          <li style="height: 28px;line-height: 28px">
            <i style="color: red;font-size: 18px;vertical-align: top">*</i>
            <span>是否营业部门：</span>
            <el-radio v-model="attr" label="1">是</el-radio>
            <el-radio v-model="attr" label="0">否</el-radio>
          </li>
          <li>
            <span style="margin-left: 10px">中文描述：</span>
            <el-input v-model="chinese_name " placeholder="请输入内容" style="width: 210px" size="mini"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述：</span>
            <el-input v-model="english_name " placeholder="请输入内容" style="width: 210px" size="mini"></el-input>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialog_section = false" size="mini">取 消</el-button>
    <el-button type="primary" @click=" hotel_save()" size="mini">确 定</el-button>
  </span>
    </el-dialog>

  </div>
</template>

<script>
  import Son from "./basic-info";
  import Childen from "./sections";
  import HotelSon from "./hotel"
  import md5 from 'js-md5';
  let id = 1000;
  export default {
    name: "organization",
    data() {
      const data = [{
        id: 1,
        label: '内控店控',
        children: [{
          id: 2,
          label: '组织机构管理'
        }, {
          id: 3,
          label: '权限管理'
        },
          {
            id: 4,
            label: '薪资管理'
          }
        ]
      }];
      return {
        url: this.api.api_9022_9519,
        title: '',
        country_code_list: [],//获取国家列表
        get_division_list: [],//获取城市
        continent_list: [],//获取洲省
        son: false,
        hotelson: false,
        childen: false,
        activeName2: 'first',
        active: 0,
        data4: JSON.parse(JSON.stringify(data)),
        data5: JSON.parse(JSON.stringify(data)),
        masking: false,//蒙版的显示隐藏
        department: false,//添加部门的显示和隐藏
        input: '',//酒店的全程
        hotel_input: '',//酒店的简称
        group_name: '',//集团名
        // checked:'',//状态
        options: [{
          value: '0',
          name: '无登陆入口'
        }, {
          value: '1',
          name: '有登录入口'
        },],
        value: '',
        attr: '1',
        dialogVisible: false,//新增集团
        dialog_hotel: false,//新增酒店
        dialog_section: false,//新增酒店的部门
        affiliation_name: '',//所属集团
        group_list: [],//获取后台的集团信息
        hotel_list: [],//获取酒店的信息
        hotel_id: '',//需要修改的酒店的

        /**
         * 新增集团下的内容
         * */
        param: {},
        group: '',//集团信息的选择框
        full_name: '', //集团全称
        short_name: '',   //集团简称
        code: '',  //代码
        radio: "1",//审核状态
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
        normal: "1",//正常
        web_site: '',//官网
        email: '',//邮箱
        photo: '',//集团照片
        log: '',//log
        dns: '',//DNS
        postal_code: '',//邮编
        address_1: '',//地址1
        address_2: '',//地址二
        group_full_name: '',//集团信息
        id: '',//选取集团信息的id
        imgUrl_id: '',//酒店logo的url
        //集团蒙版的基本信息
        //状态
        //log里的东西
        src_log: '',
        imge_list: '',
        circle: '',
        imge_group: '',
        src_group: '',
        //  酒店的基本信息de id
        //  bit:[],
        //点击添加部门时获得的酒店
        department_hotel: '',
        department_hotel_id: '',
        //  获得上级部门id
        superior_department_id: '',
        //  部门信息
        hotelid: '',//所点击的酒店id
        hotel_id_name: '',//所属酒店
        department_name: '',//部门名称
        superior_department: '',//上级部门
        chinese_name: '',//中文备注
        english_name: '',//英文备注
        /**
         * 路眼配置字段
         * */
        ispider_user:'',//用户名
        ispider_password:'',//用户密码
        sh_police_manager:'',//公安管理员登陆账号
        sh_police_password:'',//公安管理员登陆密码
        call_elevator_camera:'',//一楼电梯口的摄像头名字
        elevator_marks:'',//电梯标识名
        hotel_group:'',//集团id;
        grogshop:'',//新建一个酒店的id
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
        imageUrl: '',
        imge_man: '',
        man_log: '',
        length: '',
        hotel_group_list: [],//新增人员的集团信息
        personal_data: [],//新增人员的酒店信息
        alignCenter:null,

      };
    },
    created: function () {
      let that = this;
      that.full();
      that.hotel();
    },
    methods: {
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
          that.full_name = '', //集团全称
          that.short_name = '',   //集团简称
          that.code = '',  //代码
          that.desc = '',//中文描述
          that.desc_en = '',//英文描述
          that.office_tel = '',//总机
          that.reserve_tel = '',//订房电话
          that.province = '',//州/省
          that.service_tel = '';//服务电话
          that.city = '',//城市
          that.fax = '',//传真
          that.position_east = '',// 东经
          that.position_west = '',// 北纬
          that.web_site = '',//官网
          that.email = '',//邮箱
          that.photo = '',//集团照片
          that.src_log = '';//log
          that.dns = '',//DNS
          that.postal_code = '',//邮编
          that.address_1 = '',//地址1
          that.address_2 = '',//地址二
          that.radio = '1',//审核状态
          that.country_code = '',//国家
          that.group = '',//集团信息的选择框
          that.normal = '1';//正常/
      },
      /**
       * @refresh 用来刷新增部门
       *
       * **/
      refresh() {
        let that = this;
        that.hotelid = '',//所点击的酒店id
          that.hotel_id_name = '',//所属酒店
          that.department_name = '',//部门名称
          that.radio = "1",
          that.attr = '1',
          that.superior_department = '',//上级部门
          that.chinese_name = '',//中文备注
          that.english_name = ''//英文备注
      },
      //这里缓存集团的id
      bloc(val) {
        console.log(val);
        let that = this;
        that.circle = val;
        that.$axios({
          "url": that.url + "/v1/common/hotel_group/get_info/" + val,
          "method": "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              //localStorage.setItem('authorization',res.data.new_authorization);
              console.log(res);
              sessionStorage.setItem("group", res.data.data.id);
              that.group_name = res.data.data.full_name;
              that.group = res.data.data.id;
              that.hotel();
              this.$refs.sections_means.break();
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //点击酒店查看部门
      section_click(node, data) {
        this
        console.log(node.data);
        if (node) {
          if (node.data.is_hotel) {
            console.log(1);
            this.$router.push('/organizationchart/hotel')
          } else {
            console.log(2);
            this.$router.push({path: '/organizationchart/sections', query: {hotelid: data.id}});
          }
        }
      },
      //封装获取集团信息
      full() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/hotel_group/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.group_name = res.data.data.list[0].full_name;
              that.group_list = res.data.data.list;
              that.group = res.data.data.list[0].id;
              sessionStorage.setItem("group", res.data.data.list[0].id);
              // if(that.group_list.length>0){
              //   that.src_log = "https://image.eloadspider.com/" + that.group_list[0].logo;
              //   that.src_group = "https://image.eloadspider.com/" + that.group_list[0].photo;
              //   console.log(that.group_list);
              // }

              that.group_full_name = res.data.data.list.full_name;
              that.hotel();
              this.$refs.sections_means.break();
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
        console.log(that.group);
        that.$axios({
          url: that.url + "/v1/common/dept/get_tree",
          method: "post",
          data: {
            hotel_group_id: that.group
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.hotel_list = res.data.data;
              console.log(res);
              console.log(that.hotel_list);
              if (that.hotel_list.length !== 0) {
                that.hotelid = res.data.data[0].id;
                that.src_log = "https://image.eloadspider.com/" + that.hotel_list[0].logo;
                that.src_group = "https://image.eloadspider.com/" + that.hotel_list[0].photo;
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
      },
      //封装获取国家的列表
      country_info() {
        this.$axios({
          url: this.api.api_code_9103 + "/v1/system/settings/get_country_list/?page_size=300",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              this.country_code_list = res.data.data.results;
              // this.hotel();
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
              this.province = res.data.data.results[0].code
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
            page_size: 300,
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
          that.continent()
        }
      },
      /**点击城市,首先判断是否选择了洲省*/
      province_city() {
        let that = this;
        if (that.province === "") {
          this.hintInfo("warning", "请先选择省份")
        } else {
          that.get_division()
        }
      },
      /**点击国家时获取国家列表*/
      country() {
        let that = this;
        that.country_info();
      },
      //封装后台传过来的国家转换为名字
      code_desc(flag, data) {
        // flag为1的时候code转desc
        let that = this,
          list = that.country_code_list;
        // console.log(list)
        for (let i in list) {
          if (flag && data === list[i].code) {
            return list[i].descript
          } else if (!flag && data == list[i].descript) {
            return list[i].code
          }
        }
      },
      //封装错误信息提示
      error(message) {
        this.$message({
          showClose: true,
          message: '错误哦，这是' + message + "的错误",
          type: 'warning'
        });
      },
      /**新增集团*/
      group_add() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 1 || root_level === 2) {
          that.dialogVisible = true;
          that.title = "新增集团"
          that.flush();
        } else {
          this.hintInfo("warning", "权限不足")
        }
      },
      //点击添加集团显示蒙版后的保存
      save() {
        let that = this;
        if ((!that.full_name) || (!that.short_name) || (!that.code) || (!that.city) || (!that.normal) || (!that.address_1)) {
          that.hintInfo("warning", "* 为必填项")
        } else {
            that.$axios({
              // url:that.url+"/v1/common/hotel_group/add",
              url: that.url + '/v1/common/hotel_group/add',
              method: "post",
              // params:{},
              data: {
                //集团蒙版的基本信息
                full_name: that.full_name, //集团全称
                short_name: that.short_name,   //集团简称
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
                position: that.position_west + ',' + that.position_east,
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
                  that.dialogVisible = false;
                  console.log(res);
                  that.full();
                  that.hintInfo("success", "新增集团成功")
                } else {
                  console.log(res.data.message);
                  that.hintInfo("warning", res.data.message);
                  if (res.data.message.search("duplicated value") !== -1) {
                    that.hintInfo("warning", "代码重复，请检查后重新输入")
                  }
                }

              })
              .catch(error => {
                console.log(error);
              })
        }
      },
      /**新增酒店的步骤条*/
      next() {
        if (this.active++ > 4){
          this.active = 4;
        }
      },
      /**新增路眼配置的确定*/
      police_add(){
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
            hotel_group_id:that.hotel_group,//集团
            hotel_id:that.grogshop,//酒店
            // hotel_group_id:3,//集团
            // hotel_id:3,//酒店
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
      /**新增微信配置确定*/
      payment_add(){
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
            hotel_group_id:that.hotel_group,//集团
            hotel_id:that.grogshop,//酒店
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
      /**酒店管理员的确定*/
      manage_add(){
        let that = this;
        if ((!that.real_name) || (!that.user_name) || (!that.user_password)
         || (!that.manage_phone)
        ) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
          if (!tel.test(that.manage_phone)) {
            that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
          } else {
            this.$axios({
              url: that.url + "/v1/common/employee/add_root",
              method: "post",
              data: {
                real_name: that.real_name,//用户姓名
                nick_name: that.nick_name,//简称
                user_name: that.user_name.toLowerCase(),//用户名
                password: md5(that.user_password),//密码
                birth_date: that.birth_date,//生日
                phone: that.manage_phone,//电话
                wx_code: that.wechat,//微信
                country_code: that.country_code,//国家
                status: that.manage_radio + "",//人员状态
                head_image: that.imge_list,//照片
                gender: that.gender,//性别
                // hotel_group_id: that.hotel_group,//新增人员的集团信息
                // hotel_id: that.hotel_id,//新增人员的酒店信息
                hotel_group_id: that.hotel_group ,//新增人员的集团信息
                hotel_id: that.grogshop ,//新增人员的酒店信息
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log("成功");
                  that.hintInfo("success", "新增管理人员成功")
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
      //点击添加酒店显示蒙版，添加酒店
      hotel_add() {
        let that = this;
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 1 || root_level === 2) {
          that.src_log='',
            that.code = '',  //代码
            that.desc = '',//中文描述
            that.desc_en = '',//英文描述
            // 集团蒙版的联系方式
            that.input="",//酒店全名
            that.hotel_input="",//酒店简称
            that.office_tel = '',//总机
            that.country_code = '',//国家
            that.reserve_tel = '',//订房电话
            that.province = '',//州/省
            that.service_tel = '',//服务电话
            that.city = '',//城市
            that.fax = '',//传真
            //地理位置
            that.position_east = '',// 东经
            that.position_west = '',// 北纬
            //状态
            that.web_site = '',//官网
            that.email = '',//邮箱
            that.photo = '',//集团照片
            that.postal_code = '',//邮编
            that.address_1 = '',//地址1
            that.address_2 = '',//地址二
            that.full();
          that.dialog_hotel = true;
          that.title = "新增酒店";
          that.active=0;
          that.country_info();
        } else {
          this.hintInfo("warning", "您没有新增酒店权限")
        }
      },
      //点击添加酒店后的保存
      hold() {
        let that = this;
        if ((!that.group) || (!that.input) || (!that.hotel_input) || (!that.code)
            || (!that.city) || (!that.normal) || (!that.address_1)
        ) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          // let tel = /0\d{2,3}-\d{7,8}/;
          // if (!tel.test(that.reserve_tel) && !tel.test(that.office_tel) && !tel.test(that.service_tel)) {
          //   that.hintInfo("warning", "座机号码需以0开始,中间使用-分隔符")
          // } else {
            that.$axios({
              url: that.url + "/v1/common/hotel/add",
              method: "post",
              data: {
                //集团蒙版的基本信息
                hotel_group_id: that.group,
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
                position: that.position_west + ',' + that.position_east,
                //地理位置
                status: that.normal,//状态
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
                  that.hotel();
                  // that.dialog = false;
                  that.hintInfo("success", "新增酒店成功");
                  that.hotel_group=that.group;//选择的集团id，下一步配置的时候使用
                  that.next();//执行下一步
                  that.grogshop= res.data.id;//新建酒店成功以后，返回的酒店id，下一步配置的时候使用
                  console.log(res,that.grogshop);
                }
                else {
                  this.error(res.data.message)
                  console.log(res.data.message);
                  if (res.data.message.search("duplicated value") !== -1) {
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
      //点击下属酒店
      handleNodeClick(data) {
        let that = this;
        that.hotelid = data.id;
        sessionStorage.setItem("hotelid", data.id)
        console.log(that.hotelid);
      },
      //子组件改变后触发父组件
      hande_list(str) {
        console.log(str);
        // this.bit = str
        this.full();
        this.group = parseInt(str);
        this.hotel();
      },
      //点击树状图上的添加
      append(data) {
        console.log(sessionStorage.getItem("root_level"));
        let root_level = parseInt(sessionStorage.getItem("root_level"))
        if (root_level === 3) {
          console.log(data);
          this.dialog_section = true;
          this.refresh();
          this.superior_department_id = data.id;//上级部门
          this.superior_department = data.name;//上级名字
          // this.department_hotel=data.short_name;//酒店名字

          if (data.is_hotel && data.is_hotel == 1) {
            this.department_hotel_id = data.id;
            this.department_hotel = data.name;//酒店名字
            this.superior_department_id = null//上级部门
            this.superior_department = '';//上级名字

          } else {
            this.department_hotel_id = data.hotel_id;
            this.department_hotel = data.short_name;//酒店名字
            this.superior_department_id = data.id;//上级部门
            this.superior_department = data.name;//上级名字
          }
          this.title = "新增酒店部门"
        } else {
          this.hintInfo("warning", "您没有添加酒店部门权限")

        }

      },
      //点击树状图上的添加后的保存
      hotel_save() {
        let that = this;
        if (!that.department_name || !that.radio || !that.attr) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          that.$axios({
            url: that.url + "/v1/common/dept/add",
            method: "post",
            data: {
              hotel_id: that.department_hotel_id,//所属酒店
              name: that.department_name,//部门名称
              parent_id: that.superior_department_id,//上级部门id
              audit: that.radio + "",//审核状态
              desc: that.chinese_name,//中文备注
              desc_en: that.english_name,//英文备注
              attr: that.attr + ""//上级部门的
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.dialog_section = false;
                that.hotel();
                that.$refs.sections_means.examine();
                that.hintInfo("success", "新增部门成功")
              } else {
                console.log(res.data.message)
                that.hintInfo("warning", "新增部门失败")
              }

            })
            .catch(error => {
              this.error(res.data.message)
              console.log(error);
            })
        }
      },
      handleClose(done) {
        done();
      },
      //酒店的删除
      remove(node, data) {
        console.log(node, data);
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        let id = data.id;
        console.log(id)
        console.log(children);
        if (node.childNodes === "") {
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
              url: "" + this.url + "/v1/common/hotel/remove/${id}",
              method: "post",
            })
              .then(res => {
                console.log(res.data.message)
                if (res.data.message === "success") {
                  //获取信息列表
                  this.hotel();
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
          alert("这是一个父目录，子目录还存在，不能删除")
        }

      },
      /**
       * 点击上传酒店logo 方法
       * */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
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
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 或PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //新增集团时上传logo
      handleAvatarSuccess_group(res, file) {
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
      /**上传酒店管理员*/
      handleAvatarHotel(res, file){
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
        // this.imge_list = file.
        const isJPG = file.type === 'image/jpeg'|| 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 或者 PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //新增酒店的图片
      handlehotel_group_hotel(res, file) {
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
  .organization {
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 60px);
    overflow-y: scroll;
    min-width: 1500px;
    .tree {
      width: 280px;
      max-width: 410px;
      height: 100%;
      /*overflow-y: scroll;*/
      /*min-height: 1000px;*/
      /*background: rgba(247, 247, 247, 1);*/
      float: left;
      .serialNumber {
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        padding-left: 10px;
      }
      .moduleTree {
        width: 286px;
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
        margin-top: 10px;
        .control {
          width: 100%;
          height: 640px;
          overflow-y: scroll;
          p {
            font-size: 26px;
            background: rgba(247, 247, 247, 1);
            padding-left: 84px;

          }

        }
      }

    }
    .router {
      width: calc(100% - 300px);
      /*overflow: hidden;*/
      overflow-y: scroll;
      /*height: 100%;*/
      font-size: 20px;
      float: left;
      overflow: hidden;
      /*min-height: 1000px;*/
      white-space: nowrap;
      /*background: rgba(247, 247, 247, 1);*/
      /*background: red;*/
      .ini {
        height: 96.8%;
        position: absolute;
        right: 0;
        top: 30px;

      }
    }
    .basicInfo {
      height: 80%;
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
            margin-bottom: 10px;
            span {
              width: 100px;
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
        /*height: 230px;*/
        /*line-height: 398px;*/
        text-align: center;
        background: white;
        margin-left: 31px;
        /*margin-top: 15px;*/
        margin-bottom: 24px;
        border: 1px solid rgb(204, 204, 204);
      }
      .right {
        /*.log {*/
        /*width: 227px;*/
        /*height: 227px;*/
        /*background: white;*/
        /*!*margin-left: 100px;*!*/
        /*line-height: 227px;*/
        /*text-align: center;*/
        /*!*margin-bottom: 22px;*!*/
        /*border: 1px solid rgb(204, 204, 204);*/
        /*margin-top: 50px;*/
        /*}*/
        .site {
          /*margin-left: 60px;*/
          font-size: 16px;
          margin-top: 20px;
          li {
            margin-bottom: 20px;
            span {
              width: 62px;
              display: inline-block;
              text-align: left;
              vertical-align: top;
            }

          }
        }
      }
      .police,.payment,.admin_add{
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
    .message {
      p {
        font-size: 16px;
        /*height: 60px;*/
        /*line-height: 60px;*/
        padding-top: 16px;
        margin-bottom: 10px;
        margin-left: 60px;
        font-weight: bold;
      }
      ul {
        overflow: hidden;
        margin-left: 60px;
        li {
          float: left;
          width: 480px;
          font-size: 16px;
          margin-bottom: 15px;
          span {
            width: 120px;
            display: inline-block;
            vertical-align: top;
          }

        }
        button {
          outline: none;
          width: 90px;
          height: 40px;
          background: rgba(68, 136, 233, 1);
          border-radius: 4px;
          color: white;
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
    width: 246px;
    height:160px;
    display: block;
  }
  .dialog-style>>> .el-upload-dragger{
    width: 700px;
  }
</style>
                
