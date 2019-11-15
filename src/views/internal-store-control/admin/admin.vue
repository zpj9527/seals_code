<template>
  <div class="admin">
    <div class="left">
      <div>
        <p style="margin: 10px 0   0px 10px">集团名称：</p>
        <el-select v-model="hotel_group" placeholder="请选择" style="width: 229px;margin: 10px" size="mini"
                   @change="group_click">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.full_name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="tree">
        <p style="height: 40px;line-height: 40px;margin-bottom: 10px;">酒店名称：</p>
        <div class="content" style="margin-left: -10px">
          <div id="control" style="background: #eeeeee">
            <el-tree :data="personal_list" :props="defaultProps" :highlight-current="highlight"
                     @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
    </div>
    <div class="right">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="集团管理员" name="first" v-if="save">
          <div class="role">
            <div class="head" style="width: 100%;height: 40px;margin-top: 10px">
              <span style="vertical-align: top;display: inline-block;font-size: 18px">集团管理员</span>
              <el-button type="primary" @click="group_add();" class="btn" :disabled="isDisabled"
                         style="width: 80px;height: 24px;line-height: 2px;margin-left: 20px"
                         data-code="/v1/common/employee/add">新增
              </el-button>
            </div>
            <!--添加人员显示的-->
            <el-dialog
              :visible.sync="dialogVisible_group"
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
                    <li >
                      <span><i style="color: red;font-size: 18px">*</i>集团：</span>
                      <el-select v-model="hotel_group_name" placeholder="请选择集团" clearable size="mini" style="width: 217px;"
                                 @change="select_group">
                        <el-option
                          v-for="item in hotel_group_list"
                          :key="item.id"
                          :label="item.full_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <span><i style="color: red;font-size: 18px">*</i>用户姓名：</span>
                      <el-input v-model="param.real_name" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
                    </li>

                    <li>
                      <span >昵称：</span>
                      <el-input v-model="param.nick_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
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
                      <span >国籍：</span>
                      <el-select v-model="country_code" placeholder="请选择" filterable size="mini" style="width: 217px;">
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

                    <li >
                      <span >微信号 : </span>
                      <el-input v-model="param.wechat " placeholder="请输入内容" style="width: 217px;" maxlength="11"
                                size="mini"></el-input>
                    </li>
                    <li style="height: 28px">
                      <span>人员状态：</span>
                      <el-radio v-model="radio" label="1">正常</el-radio>
                      <el-radio v-model="radio" label="0">停用</el-radio>
                    </li>
                    <li style="height: 28px">
                      <span>性别：</span>
                      <el-radio v-model="gender" label="男">男</el-radio>
                      <el-radio v-model="gender" label="女">女</el-radio>
                    </li>
                    <li>
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
                  <el-button @click="dialogVisible_group = false" size="mini">取 消</el-button>
                  <el-button type="primary" @click="saveInfo_group()" size="mini">确 定</el-button>
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
                <span class="dialog_style_title-name"> 为 <span style="color: #4488E9">{{authority}}</span> {{ role_title }} </span>
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
                :data="group_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
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
                  prop="hotel_group_id.full_name"
                  width="150"
                  label="集团">
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
                  prop="country_code"
                  label="国籍">
                </el-table-column>
                <el-table-column
                  prop="address"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button :disabled="show_hide_delete" @click="cancel_group(scope.row.id,scope.$index, group_list)"
                               type="danger" size="mini" data-code="/v1/common/employee/remove">删除
                    </el-button>
                    <el-button :disabled="show_hide_update" size="small"
                               @click="submit_group(scope.row,scope.row.id,scope.$index, group_list)"
                               data-code="/v1/common/employee/update">修改
                    </el-button>
                    <!--<el-button v-if="scope.row.open_id" size="small"-->
                               <!--@click="relieve_pinless(scope.row,scope.row.id,scope.$index, group_list)" type="danger">-->
                      <!--解除绑定-->
                    <!--</el-button>-->
                    <!--<el-button v-else size="small" @click="pinless(scope.row,scope.row.id,scope.$index, group_list)">-->
                      <!--绑定微信-->
                    <!--</el-button>-->
                    <!--<el-button    :disabled="show_hide_bind_role" size="small" @click="new_power(scope.row,scope.row.id,scope.$index, employee_list)"   data-code="/v1/common/employee/bind_role">编辑角色</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <!--<el-pagination style="float: right;margin-right: 2%"-->
                             <!--layout="prev, pager, next"-->
                             <!--:page-size="pagesize"-->
                             <!--:current-page.sync="cur_page"-->
                             <!--@current-change="handleCurrentChange"-->
                             <!--:total="total">-->
              <!--</el-pagination>-->
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="酒店管理员" name="second">
          <div class="role">
            <div class="head" style="width: 100%;height: 40px;margin-top: 10px">
              <span style="vertical-align: top;display: inline-block;font-size: 18px">酒店管理员</span>
              <el-button type="primary" @click="man_add();" class="btn" :disabled="isDisabled"
                         style="width: 80px;height: 24px;line-height: 2px;margin-left: 20px"
                         data-code="/v1/common/employee/add">新增
              </el-button>
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
                    <li >
                      <span><i style="color: red;font-size: 18px">*</i>集团：</span>
                      <el-select v-model="hotel_group_name" placeholder="请选择集团" clearable size="mini" style="width: 217px;"
                                 @change="select_group">
                        <el-option
                          v-for="item in hotel_group_list"
                          :key="item.id"
                          :label="item.full_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </li>
                    <li >
                      <span><i style="color: red;font-size: 18px">*</i>酒店：</span>
                      <el-select v-model="hotel_name_id" placeholder="请选择酒店" clearable size="mini" style="width: 217px;"
                                 @focus="select_hotel">
                        <el-option
                          v-for="item in personal_data"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <span><i style="color: red;font-size: 18px">*</i>用户姓名：</span>
                      <el-input v-model="param.real_name" style="width: 217px;" placeholder="请输入内容" size="mini"></el-input>
                    </li>

                    <li>
                      <span >昵称：</span>
                      <el-input v-model="param.nick_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                    </li>
                    <li>
                      <span><i style="color: red;font-size: 18px">*</i>用户账号：</span>
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
                      <span >国籍：</span>
                      <el-select v-model="country_code" placeholder="请选择" filterable size="mini" style="width: 217px;">
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

                    <li >
                      <span >微信号 : </span>
                      <el-input v-model="param.wechat " placeholder="请输入内容" style="width: 217px;" maxlength="11"
                                size="mini"></el-input>
                    </li>
                    <li style="height: 28px">
                      <span>人员状态：</span>
                      <el-radio v-model="radio" label="1">正常</el-radio>
                      <el-radio v-model="radio" label="0">停用</el-radio>
                    </li>
                    <li style="height: 28px">
                      <span>性别：</span>
                      <el-radio v-model="gender" label="男">男</el-radio>
                      <el-radio v-model="gender" label="女">女</el-radio>
                    </li>
                    <li>
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
                <span class="dialog_style_title-name"> 为 <span style="color: #4488E9">{{authority}}</span> {{ role_title }} </span>
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
                  prop="hotel_group_id.full_name"
                  width="150"
                  label="集团">
                </el-table-column>
                <el-table-column
                  prop="hotel_id.short_name"
                  width="150"
                  label="酒店">
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
                  prop="country_code"
                  label="国籍">
                </el-table-column>
                <el-table-column
                  prop="address"
                  width="340"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button :disabled="show_hide_delete" @click="cancel(scope.row.id,scope.$index, employee_list)"
                               type="danger" size="mini" data-code="/v1/common/employee/remove">删除
                    </el-button>
                    <el-button :disabled="show_hide_update" size="small"
                               @click="submit(scope.row,scope.row.id,scope.$index, employee_list)"
                               data-code="/v1/common/employee/update">修改
                    </el-button>
                    <el-button v-if="scope.row.open_id" size="small"
                               @click="relieve_pinless(scope.row,scope.row.id,scope.$index, employee_list)" type="danger">
                      解除绑定
                    </el-button>
                    <el-button v-else size="small" @click="pinless(scope.row,scope.row.id,scope.$index, employee_list)">
                      绑定微信
                    </el-button>
                    <!--<el-button    :disabled="show_hide_bind_role" size="small" @click="new_power(scope.row,scope.row.id,scope.$index, employee_list)"   data-code="/v1/common/employee/bind_role">编辑角色</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <el-pagination style="float: right;margin-right: 2%"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             :current-page.sync="cur_page"
                             @current-change="handleCurrentChange"
                             :total="total">
              </el-pagination>
            </div>

          </div>
        </el-tab-pane>
        <el-tab-pane label="设备管理员" name="fourth">
          <div class="role">
            <div class="head" style="width: 100%;height: 40px;margin-top: 10px">
              <span style="vertical-align: top;display: inline-block;font-size: 18px">设备管理员</span>
              <el-button type="primary" @click="equipment_add();" class="btn" :disabled="isDisabled"
                         style="width: 80px;height: 24px;line-height: 2px;margin-left: 20px"
                         data-code="/v1/common/employee/add">新增
              </el-button>
            </div>
            <!--添加人员显示的-->
            <el-dialog
              :visible.sync="dialogVisible_equipment"
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
                    <li >
                      <span><i style="color: red;font-size: 18px">*</i>集团：</span>
                      <el-select v-model="hotel_group_name" placeholder="请选择集团" clearable size="mini" style="width: 217px;"
                                 @change="select_group">
                        <el-option
                          v-for="item in hotel_group_list"
                          :key="item.id"
                          :label="item.full_name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </li>
                    <li >
                      <span><i style="color: red;font-size: 18px">*</i>酒店：</span>
                      <el-select v-model="hotel_name_id" placeholder="请选择酒店" clearable size="mini" style="width: 217px;"
                                 @focus="select_hotel">
                        <el-option
                          v-for="item in personal_data"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </li>
                    <li>
                      <span> <i style="color: red;font-size: 18px">*</i>设备名：</span>
                      <el-input v-model="param.real_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                    </li>
                    <li>
                      <span> <i style="color: red;font-size: 18px">*</i>设备账号：</span>
                      <el-input v-model="param.user_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
                    </li>
                    <li>
                      <span><i style="color: red;font-size: 18px">*</i>账号密码：</span>
                      <el-input v-model="param.password " placeholder="请输入内容" type="password" style="width: 217px;"
                                size="mini"></el-input>
                    </li>
                    <li>
                      <span><i style="color: red;font-size: 18px">*</i>手机号码：</span>
                      <el-input v-model="param.phone" placeholder="请输入内容" style="width: 217px;" maxlength="11" size="mini"
                                oninput="value=value.replace(/[^\d]/g,'')"></el-input>
                    </li>

                    <li style="height: 28px">
                      <span>设备状态：</span>
                      <el-radio v-model="radio" label="1">正常</el-radio>
                      <el-radio v-model="radio" label="0">停用</el-radio>
                    </li>
                    <li>
                      <span style="vertical-align: top;margin-left: 10px"><i style="color: red;font-size: 18px">*</i>备注：</span>
                      <!--<el-input v-model="param.desc" placeholder="请输入内容" style="width: 217px;" maxlength="11" size="mini"-->
                      <!--&gt;</el-input>-->
                      <textarea rows="6" cols="28" v-model="param.desc" style="resize:none" ></textarea>
                    </li>
                  </ul>
                </div>

              </div>

              <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible_equipment = false" size="mini">取 消</el-button>
    <el-button type="primary" @click="saveInfo_equipment()" size="mini">确 定</el-button>
  </span>
            </el-dialog>
            <div class="paging">
              <!--模块列表-->
              <el-table
                :data="equipment_list"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                size="mini"
                style="width: 100%;">
                <el-table-column
                  prop="real_name"
                  label="设备名">
                </el-table-column>
                <el-table-column
                  prop="user_name"
                  label="设备登陆名">
                </el-table-column>
                <el-table-column
                  prop="hotel_group_id.full_name"
                  label="集团">
                </el-table-column>
                <el-table-column
                  prop="hotel_id.short_name"
                  label="酒店">
                </el-table-column>
                <el-table-column
                  prop="status"
                  label="设备状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.status === 0">停用</span>
                    <span v-else>正常</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号">
                </el-table-column>
                <el-table-column
                  prop="desc"
                  label="备注">
                </el-table-column>
                <el-table-column
                  prop="address"
                  fixed="right"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button :disabled="show_hide_delete" @click="cancel_equipment(scope.row.id,scope.$index, equipment_list)"
                               type="danger" size="mini" data-code="/v1/common/employee/remove">删除
                    </el-button>
                    <el-button :disabled="show_hide_update" size="small"
                               @click="submit_equipment(scope.row,scope.row.id,scope.$index, equipment_list)"
                               data-code="/v1/common/employee/update">修改
                    </el-button>
                    <!--<el-button    :disabled="show_hide_bind_role" size="small" @click="new_power(scope.row,scope.row.id,scope.$index, employee_list)"   data-code="/v1/common/employee/bind_role">编辑角色</el-button>-->
                  </template>
                </el-table-column>
              </el-table>
              <!--分页-->
              <!--<el-pagination style="float: right;margin-right: 2%"-->
                             <!--layout="prev, pager, next"-->
                             <!--:page-size="pagesize"-->
                             <!--:current-page.sync="cur_page"-->
                             <!--@current-change="handleCurrentChange"-->
                             <!--:total="total">-->
              <!--</el-pagination>-->
            </div>

          </div>
        </el-tab-pane>
      </el-tabs>

    </div>
    <!--绑定微信显示的二维码-->
    <el-dialog
      title="微信二维码 (有效期两小时)"
      :visible.sync="dialogVisible_img"
      :close-on-click-modal='false'
      width="30%"
      :before-close="handleClose">
      <div class="dialogVisible_style">
        <!--<span style="display: inline-block;width: 290px;margin-bottom: 20px">可选择的权限</span>-->
        <!--<p style="display: inline-block;width: 198px;margin-bottom: 20px">增加角色人员名称 ：<span style="color:#4488e9"> {{authority}}</span></p>-->
        <!--<p style="font-weight: bold;font-size: 18px;margin-bottom: 10px">增加权限</p>-->
        <ul>
          <div id="qrcode" ref="qrcode" style="display: inline-block;margin-left: 25%"></div>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible_img = false" size="mini">取 消</el-button>
        <!--<el-button type="primary"@click=" saveInfo_power()" size="mini">确 定</el-button>-->
     </span>
    </el-dialog>
    <div class="ini">
      <logon-view></logon-view>
    </div>
  </div>
</template>

<script>
  import crypto from 'crypto';
  import treeTransfer from 'el-tree-transfer';
  import QRCode from 'qrcodejs2'
  import $ from 'jquery'
  let id = 1000;
  export default {
    name: "admin",
    data() {
      return {
        url: this.api.api_9022_9519,
        activeName:"first",
        hotel_group: "",//集团
        hotel_list: [],//集团
        personal_list: [],//树状结构
        newlists: [],//API信息列表
        pagesize: 10,
        total: 10,
        app_id: '',
        page_id: '',
        defaultProps: {
          children: 'page_id',
          label: 'name'
        },
        title_add: '',//人员显示的头部内容
        role_title: '',//编辑角色显示的头部内容
        commid: 1,//个人id
        cur_page: 1,
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
        save: true,
        personal_role: false,//用来判断是不是传给后台的数组是否为空
        authorization_token: '',
        input: '',//输入内容
        dialogVisible: false,//新增人员的显示控制
        dialogVisible_power: false,//增加角色显示的控制
        //上传照片的
        dialogImageUrl: '',
        Edite: true, //标志位 判断的是新增还是更新
        add_update: true,//新增和修改使用的标志
        employee_list: [],//获得人员的值
        country_code_list: [],//获取国家的列表
        country_code: '',
        hotel_id_father: '',
        // branch_data:'',
        birth_date: '',//部门id
        radio: '1',
        hotel_id: '',//酒店id;
        /**新增集团管理员*/
        dialogVisible_group:false,//集团管理员显示隐藏的页面
        group_list:[],//集团管理员
        /*
        新增员工里的内容
        * */
        param: {},
        hotel_group_name: '',//新增管理员的集团
        hotel_name_id: '',//新增管理员的酒店
        group_id: '',//集团id
        imageUrl: '',
        imge_list: '',
        src_log: '',
        length: '',
        wechat: '',//微信号
        hotel_group_list: [],//新增人员的集团信息
        personal_data: [],//新增人员的酒店信息
        gender: '男',//性别
        highlight: true,
        dialogVisible_img: false,
        /**设备账户*/
        dialogVisible_equipment:false,
        equipment_list:[],//设备管理员
        desc:"",//备注

      }
    },
    created() {
      let that = this;
      that.full();//获取集团
      that.country_info();//获取国家
      //这里判断登陆的账号属于什么级别
      let root_level = parseInt(sessionStorage.getItem("root_level"));
      if(root_level===2){
        that.$nextTick(function () {
          that.save = false;
           that.activeName="second";
        });
      }
    },
    methods: {
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
              that.hotel_group = res.data.data.list[0].id;
              that.hotel_list = res.data.data.list;
              that.group=res.data.data.list[0].id;
              // that.circle = res.data.data.list[0].id
              that.hotel();//获取模块书
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
          url: that.url + "/v1/common/dept/get_tree",
          method: "post",
          data: {
            hotel_group_id: that.hotel_group
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.personal_list = res.data.data;
              if(that.personal_list.length!==0){
                that.hotel_id = that.personal_list[0].id
              }
              that.employee();//获取g管理员信息列表

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
      //树状结构的事件
      handleNodeClick(data, e) {
        let that = this;
        console.log(data.id);
        that.cur_page = 1;
        that.hotel_id = data.id;
        that.employee();//获取g管理员信息列表
        that. employee_equipment();
      },
      /**集团选择*/
      group_click(value) {
        let that = this;
        console.log(value);
        that.group = value;
        that.hotel();
        that.employee_group();
        that. employee_equipment();
      },
      //分页
      handleCurrentChange(curPage) {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/api/page_list",
          methods: "get",
          params: {
            page_num: curPage,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.newlists = res.data.data.list;
            }
          })
          .catch(error => {
            console.error(error);
          })
      },
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
          phone: '',//电话
          status: '',
          wechat: "",
          desc:'',
        }
        that.gender = '男',//性别
          that.radio = '1';//人员状态
        that.country_code = '';//国家
        that.birth_date = '';//生日
        that.src_log = '';
        that.hotel_group_name = "";
        that.hotel_name_id = "";
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
      /**封装获取人员列表
       * 以其中top_root_level 这个字段判断 是不是酒店管理员
       *
       * */
      employee() {
        let that =this;
        this.$axios({
          url: that.url + "/v1/common/employee/root_list",
          method: "post",
          data: {
            hotel_id: that.hotel_id,
            hotel_group_id: that.hotel_group_id,
            page_num: that.cur_page,
            include_self:0
          }

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.total = res.data.data.total_count;
              for(let item of res.data.data.list){
                if (item.country_code!== null) {
                  item.country_code= that.code_desc(1, item.country_code,that.country_code_list);
                }
              }
              that.employee_list = res.data.data.list;

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
              this.employee();
              this.employee_group();
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
              console.log(res);
              let srow = res.data.data.data;
              // that.param.commpwd = srow.password;
              that.Edite = true;
              that.length = srow.password.length;
              that.param.real_name = srow.real_name,//用户姓名
                that.param.nick_name = srow.nick_name,//简称
                that.param.user_name = srow.user_name,//用户名
                that.param.password = srow.password,//密码
                that.param.work_id = srow.work_id,//工号
                that.birth_date = srow.birth_date,//生日
                that.param.phone = srow.phone,//电话
                that.country_code = srow.country_code,//国家
                that.param.wechat = srow.wx_code,//微信
                that.radio = srow.status + "";//人员状态
                that.gender = srow.gender;
              if(srow.hotel_id){
                that.hotel_name_id = srow.hotel_id.id;//所属酒店的id
              }
              if(srow.hotel_group_id){
                that.hotel_full_id = srow.hotel_group_id.id
                that.hotel_full();
              }
              that.hotel_group_id = srow.hotel_group_id.id;//集团的id
              that.hotel_group_name = srow.hotel_group_id.id;//所属集团
              if(srow.head_image){
                that.src_log = srow.head_image;
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
      /**
       * @getmd5 加密密码使用
       */
      getmd5(pwd) {
        var md5 = crypto.createHash("md5");
        md5.update(pwd);
        var password = md5.digest('hex');
        return password;
      },
     /**标签页的选择*/
     handleClick(tab, event) {
       console.log(tab, event);
       let that =this;
       if(tab.label==="设备管理员"){
         that.employee_equipment()
       }else if(tab.label==="酒店管理员"){
        that.hotel();
       }else if(tab.label==="集团管理员"){
         that. employee_group();
       }
     },
      /**集团管理员新增*/
      group_add(){
        let that =this;
        that.dialogVisible_group=true;
        that.title_add = "新增集团管理员"
        that.flush()
        that.full_list();
        that.hotel_group_name = that.hotel_group;
        that.hotel_full_id = that.hotel_group
      },
      /**修改集团管理员*/
      submit_group(srow, id, index, list){
        let that = this;
        that.add_update = false;
        that.dialogVisible_group=true;
        console.log(srow, id, index, list);
        // console.log(id);
        that.commid = id,
          that.src_log = "",
          that.title_add = "修改集团管理员"
        that.personal_details();
        that.full_list();//获取集团
      },
      /**新增/修改集团管理员*/
      saveInfo_group(){
        let that = this;
          if ((!that.param.real_name) || (!that.param.user_name) || (!that.param.password)
            || (!that.hotel_group_name) || (!that.param.phone)
          ) {
            that.hintInfo("warning", "* 为必填项")
          } else {
            let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if (!tel.test(that.param.phone)) {
              that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
            } else {
              let urldata = that.Edite ? (that.url + "/v1/common/employee/update/" + that.commid) : (that.url + "/v1/common/employee/add_root");
              console.log(that.Edite);
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
              this.$axios({
                url: urldata,
                method: "post",
                data: {
                  real_name: that.param.real_name,//用户姓名
                  nick_name: that.param.nick_name,//简称
                  user_name: that.param.user_name.toLowerCase(),//用户名
                  password: that.password,//密码
                  birth_date: that.birth_date,//生日
                  phone: that.param.phone,//电话
                  wx_code: that.param.wechat,//微信
                  country_code: that.country_code,//国家
                  hotel_group_id: that.hotel_group_name,//新增人员的集团信息
                  status: that.radio + "",//人员状态
                  head_image: that.imge_list,//照片
                  gender: that.gender,//性别
                },

              })
                .then(res => {
                  if (res.data.message === "success") {
                    // console.log(res);
                    that.dialogVisible_group = false;
                    that.employee_group();
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
      /**删除系统管理员*/
      cancel_group(id, index, list){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: this.url + "/v1/common/employee/remove/" + id,
            method: "post",
          })
            .then(res => {
              if (res.data.message === "success") {
                this.employee_group();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                list.splice(index, 1);
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
     /**获取集团管理员*/
     employee_group() {
       let that =this;
       that.$axios({
         url: that.url + "/v1/common/employee/root_list",
         method: "post",
         data: {
           hotel_group_id: that.group,
           include_self:1,
           page_size:999
         }
       })
         .then(res => {
           if (res.data.message === "success") {
             console.log(res);
             let arr =[];
             for(let item of res.data.data.list){
               if(item.hotel_id===null){
                 arr.push(item);
               }
               if (item.country_code!== null) {
                 item.country_code= that.code_desc(1, item.country_code,that.country_code_list);
               }
             }
             that.group_list = arr;
             console.log(that.group_list);
           }
           else {
             console.log(res.data.message);
           }
         })
         .catch(error => {
           // console.log(error);
         });
     },
      /**
       *
       * 设备管理
       * */
      /**新增设备管理账号*/
      equipment_add(){
        let that =this;
        that.dialogVisible_equipment=true;
        that.title_add = "新增设备管理员"
        that.flush()
        that.full_list();
        that.hotel_group_name = that.hotel_group;
        that.hotel_full_id = that.hotel_group
      },
      /**修改设备管理账户*/
      submit_equipment(srow, id, index, list){
        let that = this;
        that.add_update = false;
        that.dialogVisible_equipment = true;
        console.log(srow, id, index, list);
        // console.log(id);
        that.commid = id,
          that.src_log = "",
          that.title_add = "修改设备管理账户"
        that.param.desc = srow.desc;
        that.personal_details();
        that.full_list();//获取集团
      },
      /**删除设备管理账户*/
      cancel_equipment(id, index, list){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            url: this.url + "/v1/common/employee/remove/" + id,
            method: "get",
          })
            .then(res => {
              if (res.data.message === "success") {
                this.employee_equipment();
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                list.splice(index, 1);
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
      /**新增修改备管理账号后的确定*/
      saveInfo_equipment(){
        let that = this;
        if ( (!that.param.user_name) || (!that.param.password) ||(!that.param.desc)
          || (!that.hotel_group_name) || (!that.param.phone) || (!that.hotel_name_id) ||(!that.param.real_name)
        ) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
          if (!tel.test(that.param.phone)) {
            that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
          } else {
            let urldata = that.Edite ? (that.url + "/v1/common/employee/update/" + that.commid) : (that.url + "/v1/common/employee/add_root");
            console.log(that.Edite);
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
            this.$axios({
              url: urldata,
              method: "post",
              data: {
                user_name: that.param.user_name.toLowerCase(),//用户名
                password: that.password,//密码
                phone: that.param.phone,//电话
                hotel_group_id: that.hotel_group_name,//新增人员的集团信息
                hotel_id: that.hotel_name_id,//新增人员的酒店信息
                status: that.radio + "",//人员状态
                is_device : 1,//隐藏信息，不让看到
                desc:that.param.desc,
                real_name:that.param.real_name
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  // console.log(res);
                  that.dialogVisible_equipment = false;
                  that.employee_equipment();
                  if (that.Edite) {
                    that.hintInfo("success", "修改设备管理员成功")
                  } else {
                    that.hintInfo("success", "新增设备管理员成功")
                  }
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
      /**获取设备管理员*/
      employee_equipment(){
        let that =this;
        that.$axios({
          url: that.url + "/v1/common/employee/root_list",
          method: "post",
          data: {
            hotel_id: that.hotel_id,
            hotel_group_id: that.hotel_group_id,
            page_num: that.cur_page,
            include_self:1,
            page_size:999,
            include_device : 1
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let arr =[];
              for(let item of res.data.data.list){
                if(item.is_device===1){
                  arr.push(item);
                }
              }
              that.equipment_list = arr;
              console.log(that.equipment_list);
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            // console.log(error);
          });
      },




      /**
       *
       * 这里请求集团和酒店为了新增人员的时候使用
       *  新增人员的时候需要选择集团，选择酒店的时候需要判断是否选择了酒店
       *
       * */
      //封装获取集团信息
      full_list() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/hotel_group/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.hotel_group_list = res.data.data.list;
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
      hotel_full() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/dept/get_tree",
          method: "post",
          data: {
            page_size:999,
            hotel_group_id: that.hotel_full_id
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              that.personal_data = res.data.data;
              console.log(res);

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
      /**选择集团后*/
      select_group(value) {
        let that = this;
        that.hotel_full_id = value;
        that.hotel_name_id = "";
        that.hotel_full();
      },

      /**点击酒店--- 查询集团信息
       * 如果没有选择集团，提示选择集团
       *
       * */
      select_hotel(value) {
        let that = this;
        if (that.hotel_group_name === "") {
          that.hintInfo("warning", "请选择集团")
        } else {
          that.hotel_full();//获取酒店
        }
      },
      // 点击修改
      submit(srow, id, index, list) {
        let that = this;
        that.add_update = false;
        console.log(srow, id, index, list);
        that.commid = id,
        that.src_log = "",
        that.title_add = "修改人员";
        that.full_list();//获取集团
          that.personal_details();
          that.dialogVisible = true;



      },
      //点击角色上的删除
      cancel(id, index, list) {
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
            url: this.url + "/v1/common/employee/remove/" + id,
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
      },
      //点击新增
      man_add() {
        let that = this;
        that.dialogVisible = true;
        that.title_add = "新增人员";
        that.add_update = true;
        console.log(that.hotel_group);
        that.flush()
        that.full_list();
        that.hotel_group_name = that.hotel_group;
        that.hotel_full_id = that.hotel_group
        console.log(that.hotel_group_name);
      },
      //点击人员新增和修改后的保存
      saveInfo_role() {
        let that = this;
          if ((!that.param.real_name) || (!that.param.user_name) || (!that.param.password)
            || (!that.hotel_group_name) || (!that.param.phone) || (!that.hotel_name_id)
          ) {
            that.hintInfo("warning", "* 为必填项")
          } else {
            let tel = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
            if (!tel.test(that.param.phone)) {
              that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
            } else {
              let urldata = that.Edite ? (that.url + "/v1/common/employee/update/" + that.commid) : (that.url + "/v1/common/employee/add_root");
              console.log(that.Edite);
              if (that.Edite === false) {
                that.password = that.getmd5(that.param.password)
              } else {
                if (that.param.password.length < that.length) {
                  console.log(1);
                  that.password = that.getmd5(that.param.password)
                } else {
                  that.password = that.param.password;
                }

              }
              this.$axios({
                url: urldata,
                method: "post",
                data: {
                  real_name: that.param.real_name,//用户姓名
                  nick_name: that.param.nick_name,//简称
                  user_name: that.param.user_name.toLowerCase(),//用户名
                  password: that.password,//密码
                  birth_date: that.birth_date,//生日
                  phone: that.param.phone,//电话
                  wx_code: that.param.wechat,//微信
                  country_code: that.country_code,//国家
                  hotel_group_id: that.hotel_group_name,//新增人员的集团信息
                  hotel_id: that.hotel_name_id,//新增人员的酒店信息
                  status: that.radio + "",//人员状态
                  head_image: that.imge_list,//照片
                  gender: that.gender,//性别
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
                    that.hintInfo("warning", res.data.message)
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
        if (root_level === 3 || root_level === 1) {
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
            url: "" + that.url + "/v1/common/employee/bind_role",
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
      //点击分页上的页数
      handleCurrentChange(curPage) {
        console.log(curPage) // 当前页}
        this.cur_page = curPage;
        // this.curPage=curPage;
        this.$axios({
          url: this.url + "/v1/common/employee/root_list",
          method: "post",
          data: {
            page_num: curPage,
            page_size: this.pagesize,
            hotel_id: this.hotel_id,
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.list);
              this.employee_list = res.data.data.list;
              for (let li in this.employee_list) {
                if (this.employee_list[li].country_code != null) {
                  this.employee_list[li].country_code = this.code_desc(1, this.employee_list[li].country_code);
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
        this.imge_list = file.response.complete;
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
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
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
      /**绑定微信*/
      pinless(srow, id, index, list) {
        let code = srow.hotel_group_id.code;
        console.log(code);
        console.log(srow, id, index, list);
        console.log(srow.user_name, srow.password);
        /**假登陆 获取authorization  用于绑定微信的时候获取二维码*/
        let that = this;
        that.$axios({
          url: that.api.api_code_9103 + "/v1/system/wechat/get_user_authorization/",
          method: "post",
          data: {
            group_code: code,
            id: id,
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
      /**获取二维码*/
      qrcode() {
        let that = this;
        let qrcode = new QRCode('qrcode', {
          width: 232,  // 设置宽度
          height: 232, // 设置高度
          text: that.img_src
        })
      },
      /**解除绑定微信*/
      relieve_pinless(srow, id, index, list) {
        console.log(srow.open_id);
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/employee/update/" + id,
          method: "post",
          data: {
            open_id: null,
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              that.employee();
              that.hintInfo("success", "解除绑定成功")
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
  .admin {
    width: 100%;
    height: 94%;
    /*overflow-y: scroll;*/
    .left {
      width: 280px;
      height: 100%;
      padding: 0 10px;
      float: left;
      background: #eeeeee;
      .tree {
        height: 40px;
        background: white;
        line-height: 40px;
        padding-left: 10px;
        border-radius: 6px;

      }
    }
    .right {
      float: left;
      width: calc(100% - 342px);
      /*height: 100%;*/
      margin-left: 10px;
      margin-top: 10px;
      .role {
        width: 99%;
        /*width: 100%;*/
        height: 100%;
        margin-left: 10px;
        /*overflow-y: scroll;*/
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
                    /*width: 400px;*/
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

        }
        .paging {
          width: 100%;
          height: 94%;
          overflow: hidden;
          /*overflow-y: scroll;*/
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
                /*margin-left: 20px;*/
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
    }
    .ini {
      height: 100%;
      float: right;
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
<style scoped>
  .content >>> .el-tree--highlight-current .el-tree-node.is-current >>> .el-tree-node__content {
    background: #e9e9eb;
    border-radius: 4px;
  }
  .left>>> .el-tree{
    background: #eeeeee;
  }
</style>
