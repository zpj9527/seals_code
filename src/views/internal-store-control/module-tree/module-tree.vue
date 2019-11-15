<template>
  <div class="module-tree">
    <el-container style="height: 93%; border: 1px solid #eee">
      <!--左侧内容-->
      <el-aside width="278px" style="background-color: #eeeeee;padding-left: 10px">
        <div class="filtrate">
          <p>快速筛选</p>
          <el-input v-model="module_name" placeholder="请输入模块名称" clearable size="mini"
                    style="width: 170px;margin-top: 10px"></el-input>
          <button @click="seek" style="width: 80px;height: 27px;line-height: 27px">查找</button>
          <div style="display: inline-block;margin-top: 10px">
            <span>根模块 ：</span>
            <el-select v-model="modulization" clearable placeholder="请选择" size="mini" @change="modulization_seek"
                       style="width: 170px">
              <el-option
                v-for="item in kinds"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div style="display: inline-block;margin-top: 10px">
            <span>模块类型 ：</span>
            <el-select v-model="module_type" clearable size="mini" placeholder="请选择" @change="modulization_seek"
                       style="width: 170px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="tree">
          <p style="height: 30px;line-height: 30px">模块树</p>
          <div class="content">
            <div id="control">
              <el-tree
                class="ddd"
                :data="module_list"
                node-key="node.id"
                :expand-on-click-node="true"
                node-contextmenu
                :highlight-current="highlight"
                style="font-size: 16px;background: rgb(238, 238, 238)"
                @node-click="handleNodeClick">
                 <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.name}}</span>
                    <span style="position: absolute;right: 20px">
                      <!--v-show="setpro"-->
                      <!--<i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>-->
                      <!--<i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px " title="删除该模块"></i>-->
                      <!--<i class="el-icon-circle-plus" @click="append(data);flush()"  title="新增该模块下的导航" style="margin-right: 30px "></i>-->
                    </span>
                 </span>
              </el-tree>
              <p @click="masking_true();flush()"
                 style="margin-top: 10px;padding-left: 80px ;background: white ;border: 1px solid #eeeeee;color: #4488E9">
                <span style="font-size:18px;margin-right: 6px">+</span>添加根模块</p>
              <p @click="append();flush()"
                 style="margin-top: 10px;padding-left: 80px ;background: white ;border: 1px solid #eeeeee;color: #4488E9">
                <span style="font-size:18px;margin-right: 6px">+</span>添加页面</p>
            </div>
          </div>
        </div>
      </el-aside>
      <!--新增模块树-->
      <el-dialog
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul class="mask_information">
          <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>模块名称</span>
            <el-input v-model="param.name" placeholder="请输入内容" size="mini" style="width: 217px;"
                      maxlength="8"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" size="mini" style="width: 217px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>模块代码</span>
            <el-input v-model="param.code" placeholder="请输入内容" size="mini" @blur="unfocused('code', code)"
                      style="width: 217px;"></el-input>
          </li>
          <!--<li>-->
          <!--<span style="margin-left: 10px">模块种类</span>-->
          <!--<el-input v-model="param.root_id"  style="width: 217px;"  :disabled="true" size="mini"></el-input>-->
          <!--</li>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>模块类型</span>
            <el-select v-model="has_entry" placeholder="请选择" size="mini" style="width:217px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>链接</span>
            <el-input v-model="param.url" placeholder="请输入内容" size="mini" @blur="unfocused('url', url)"
                      style="width: 217px;"></el-input>
          </li>
          <!--<li v-show="bbb">-->
          <!--<span >父级模块</span>-->
          <!--<el-select v-model="parent_id" placeholder="请选择">-->
          <!--<el-option-->
          <!--v-for="item in parents"-->
          <!--:key="item.id"-->
          <!--:label="item.name"-->
          <!--:value="item.id"-->
          <!--&gt;-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</li>-->
          <!--<li >-->
          <!--<i></i>-->
          <!--<span style="margin-left: 10px">父级模块</span>-->
          <!--<el-input v-model="param.parent_id"   style="width: 217px;"   :disabled="true"  size="mini"></el-input>-->
          <!--</li>-->
          <li>
            <span style="margin-left: 10px">版本号</span>
            <el-input v-model="versions" placeholder="1.0" style="width: 217px;" :disabled="true"
                      size="mini"></el-input>
          </li>
          <!--<li style="margin-top:50px;" v-show="save_add"><button @click="save">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_childen"><button @click="conserve">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_preserve "><button @click="preserve ">保存</button> <button @click="cancel">取消</button></li>-->
        </ul>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="save()" size="mini">确 定</el-button>
      </span>
      </el-dialog>
      <!--模块树里的加号新增模-->
      <el-dialog
        :visible.sync="dialog_children"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul class="mask_information">
          <!--<div class="hint" v-show="masking_hint">输入内容已存在，请检查后重新输入</div>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>根模块</span>
            <el-select v-model="parent_id" placeholder="请选择父级模块" size="mini" style="width: 217px;">
              <el-option
                v-for="item in parents"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>子模块名称</span>
            <el-input v-model="param.name" placeholder="请输入模块名称" style="width: 217px;" maxlength="8"
                      size="mini"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述</span>
            <el-input v-model="param.desc_en" placeholder="请输英文描述" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>模块代码</span>
            <el-input v-model="param.code" placeholder="请输入模块代码" @blur="unfocused('code', code)" style="width: 217px;"
                      size="mini"></el-input>
          </li>
          <!--<li>-->
          <!--<span  style="margin-left: 10px">模块种类</span>-->
          <!--<el-input v-model="param.root_id"  style="width: 217px;"  placeholder="请输入模块种类"  :disabled="true" size="mini"></el-input>-->
          <!--</li>-->
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>模块类型</span>
            <el-select v-model="has_entry" placeholder="请选择模块类型" size="mini" style="width: 217px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>链接</span>
            <el-input v-model="param.url" placeholder="请输入链接" @blur="unfocused('url', url)" style="width: 217px;"
                      size="mini"></el-input>
          </li>

          <!--<li ><span >父级模块</span><el-input v-model="parent_id"   style="width: 217px;"   :disabled="true" ></el-input></li>-->
          <li>
            <span style="margin-left: 10px">版本号</span>
            <el-input v-model="param.versions" placeholder="1.0" style="width: 217px;" :disabled="true"
                      size="mini"></el-input>
          </li>
          <!--<li style="margin-top:50px;" v-show="save_add"><button @click="save">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_childen"><button @click="conserve">保存</button> <button @click="cancel">取消</button></li>-->
          <!--<li style="margin-top:50px;" v-show="save_preserve "><button @click="preserve ">保存</button> <button @click="cancel">取消</button></li>-->
        </ul>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_children = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="save_append()" size="mini">确 定</el-button>
      </span>
      </el-dialog>
      <!--模块信息的更改-->
      <el-dialog
        :visible.sync="dialog_mask"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul class="mask_information">
          <li>
            <span>根模块</span>
            <el-input v-model="mask_input_kind" style="width: 217px;" :disabled="true" size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>模块名称</span>
            <el-input v-model="mask_name" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>模块代码</span>
            <el-input v-model="mask_code" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>

          <li>
            <span><i style="color: red;font-size: 18px">*</i>模块类型</span>
            <el-select v-model="mask_has_entry" placeholder="请选择" size="mini" style="width: 217px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </li>

          <!--<li>-->
          <!--<span >父级模块</span>-->
          <!--<el-input v-model="mask_input_father"  style="width: 217px;" :disabled="true" size="mini"></el-input>-->
          <!--</li>-->
          <li>
            <span><i style="color: red;font-size: 18px">*</i>链接</span>
            <el-input v-model="mask_url" placeholder="请输入内容" style="width: 217px;" size="mini"></el-input>
          </li>
          <li>
            <span>版本号</span>
            <el-input v-model="mask_input" placeholder="1.0" style="width: 217px;" :disabled="true"
                      size="mini"></el-input>
          </li>
        </ul>

        <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_mask = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="preserve_keep()" size="mini">确 定</el-button>
        </span>
      </el-dialog>
      <!--右侧内容-->
      <el-container class="right">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick"
                 style="width: 96%;height: 100%;margin-top: 10px;margin-left: 10px">
          <el-tab-pane label="模块信息" name="first">
            <div class="status" style="margin-left: 10px">
              <el-table
                :data="module_newlists"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                size="mini">
                <el-table-column
                  prop="name"
                  fixed="left"
                  width="140"
                  label="模块名称">
                </el-table-column>
                <el-table-column
                  prop="desc_en"
                  label="英文描述">
                </el-table-column>
                <el-table-column
                  prop="code"
                  label="模块代码">
                </el-table-column>
                <el-table-column
                  prop="root_id.name"
                  label="根模块">
                </el-table-column>
                <el-table-column
                  prop="has_entry"
                  width="140"
                  label="模块类型(登陆入口)">
                  <!--父级传过来的值改变格式-->
                  <template slot-scope="scope">
                    <span v-if="scope.row.has_entry === 0">否</span>
                    <span v-else>是</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="url"
                  label="链接">
                </el-table-column>
                <el-table-column
                  prop="creator.real_name"
                  label="创建人">
                </el-table-column>
                <el-table-column
                  prop="create_time"
                  width="140"
                  label="创建时间">
                </el-table-column>
                <el-table-column
                  prop="version"
                  label="版本号">
                </el-table-column>
                <el-table-column
                  prop="last_time"
                  width="140"
                  label="修改时间">
                </el-table-column>
                <el-table-column
                  prop="address"
                  fixed="right"
                  width="240"
                  label="操作">
                  <template slot-scope="scope">
                    <el-button @click="cancel(scope.row.id,scope.$index, module_newlists)" type="danger" size="mini">
                      删除
                    </el-button>
                    <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, module_newlists)">修改
                    </el-button>
                    <el-button size="small" @click="examine()">查看日志</el-button>
                  </template>
                </el-table-column>

              </el-table>
              <!--分页-->
              <el-pagination style="float: right;"
                             layout="prev, pager, next"
                             :page-size="pagesize"
                             :current-page.sync="cur_page"
                             @current-change="module_handleCurrentChange"
                             :total="module_total">
              </el-pagination>
            </div>
          </el-tab-pane>
          <el-tab-pane label="页面管理" name="second">
            <div class="shopping">
              <span
                style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold;cursor: pointer;"
                title="查看所有页面设置">页面设置</span>
              <!--<el-button type="text" @click="page_add();flush()">-->
              <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
              <!--</el-button>-->
              <button @click="page_add();flush_redraw()"
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
                      <el-tag style="border: none;   background-color:transparent;color: #777777">
                        {{scope.row.rule_groups}}
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
                    width="200"
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
                      <el-button size="mini" type="danger" @click="cancel_page(scope.row.id,scope.$index, income_list)"
                                 disabled>删除
                      </el-button>
                      <el-button size="mini"
                                 @click="dialog_page = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
                      </el-button>
                      <el-button size="small" @click="compile(scope.row,scope.row.id,scope.$index, income_list)">编辑操作
                      </el-button>
                    </template>
                  </el-table-column>

                </el-table>

                <!--分页-->
                <el-pagination style="float: right;margin-right: 2%"
                               layout="prev, pager, next"
                               :page-size="role_pagesize"
                               :current-page.sync="page_cur_page"
                               @current-change="handleCurrentChange"
                               :total="total">
                </el-pagination>
              </div>
              <!--点击新增修改显示的页面-->
              <el-dialog
                :visible.sync="dialog_page"
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
                    <el-input v-model="param.url" placeholder="请输入页面地址" style="width: 280px;" disabled
                              size="mini"></el-input>
                  </li>
                  <li v-if="page_true">
                    <i style="color: red;font-size: 18px">*</i>
                    <span>APP ：</span>
                    <el-select v-model="department_hotel " placeholder="请选择模块" style="width: 280px" clearable
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
                    <textarea
                      style="width: 280px; height: 100px;resize: none;border: 1px solid #dcdfe6;border-radius: 4px"
                      v-model="param.desc "></textarea>
                  </li>

                </ul>
                <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_page = false" size="mini">取 消</el-button>
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
                  <el-input v-model="permission_name" placeholder="请输入操作组名称" size="mini"
                            style="width: 230px;"></el-input>
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
                     style="background: rgb(104, 129, 158);height: 35px;line-height: 34px;padding-left: 10px;color: white">
                  页面操作组
                </div>
                <div class="content_group">
                  <div class="control">
                    <el-tree
                      :data="permission_group"
                      node-key="node.id"
                      :expand-on-click-node="false"
                      node-contextmenu
                      :highlight-current="highlight_group"
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
                  </div>
                  <p @click="append_role();"
                     style=" margin-top: 10px;height: 40px; font-size: 16px;background: white ;border: 1px solid #eeeeee;color: #4488E9;padding: 5px 60px;line-height: 24px">
                    <span style="font-size:18px;margin-right: 6px">+</span>新增页面操作组</p>
                </div>
              </div>
              <div class="right_page">
                <!--列表-->
                <el-table
                  :data="rulelists"
                  :cell-style="{textAlign:'center'}"
                  :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center',}"
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
                    prop="page_id.name"
                    label="关联页面">
                  </el-table-column>
                  <el-table-column
                    width="260"
                    prop="address"
                    label="操作"
                    fixed="right">
                    <template slot-scope="scope">
                      <el-button @click="cance(scope.row.id,scope.$index, rulelists)" type="danger" size="mini">删除
                      </el-button>
                      <el-button size="small" @click="revision(scope.row,scope.row.id,scope.$index, rulelists)">修改
                      </el-button>
                      <el-button size="small" @click="compile_api(scope.row,scope.row.id,scope.$index, rulelists)">
                        编辑API
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!--分页-->
                <el-pagination style="float: right;"
                               layout="prev, pager, next"
                               :page-size="7"
                               :current-page.sync="role_cur_page"
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
                      <el-input v-model="param.desc_en" style="width: 217px;" placeholder="请输入内容"
                                size="mini"></el-input>
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
                      <span>操作名称</span>
                      <el-input v-model="permission_monicker" placeholder="请输入内容" style="width: 217px;"
                                size="mini"></el-input>
                    </li>
                    <li>
                      <i style="color: red;font-size: 18px">*</i>
                      <span>操作组</span>
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
                    <span class="dialog_style_title-name">为权限  <span style="color: #4488E9">{{authority}}</span> {{ title }}</span>
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
          </el-tab-pane>
          <el-tab-pane label="API管理" name="third">
            <div class="api">
              <div class="paging">
                <p style="margin: 10px"><span style=" cursor: pointer;">API信息</span></p>
                <!--模块列表-->
                <div class="paging_table">
                  <el-table
                    :data="api_data"
                    :cell-style="{textAlign:'center'}"
                    :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                    size="mini"
                    style="width: 100%;"
                  >
                    <el-table-column
                      prop="name"
                      width="300"
                      fixed
                      label="API名称">
                    </el-table-column>
                    <el-table-column
                      prop="alias"
                      label="别名">
                    </el-table-column>
                    <el-table-column
                      prop="url"
                      label="API地址">
                    </el-table-column>
                    <el-table-column
                      prop="desc"
                      label="API备注">
                    </el-table-column>


                  </el-table>
                  <!--分页-->
                  <el-pagination style="float: right;"
                                 layout="prev, pager, next"
                                 :page-size="api_pagesize"
                                 @current-change="api_handleCurrentChange"
                                 :total="api_total">
                  </el-pagination>
                </div>

              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="ini">
          <logon-view></logon-view>
        </div>
      </el-container>

    </el-container>
  </div>
</template>
<script>
  export default {
    name: "module-tree",
    data() {
      return {
        // 'http://47.98.113.173:9022'/
        url_api: this.api.api_9022_9519,
        title: '',
        module_total: 10,
        cur_page: 1,//模块信息默认页码
        page_cur_page: 1,
        api_cur_page: 1,
        role_cur_page: 1,
        pagesize: 10,
        role_pagesize: 5,
        highlight: true,//左侧显示高亮的
        highlight_group: true,//右侧显示高亮
        /*
        * 筛选条件
        * */
        module_name: '',//筛选模块名称
        modulization: '',//模块种类
        kinds: [],//模块种类的列表
        module_type: '',//模块类型
        //模块类型
        options: [{
          value: 1,
          label: '有登陆入口'
        }, {
          value: 0,
          label: '无登陆入口'
        }],

        dialogVisible: false,//新增模块树的显示与隐藏
        dialog_children: false,//模块树的新增显示和隐藏
        dialog_mask: false,//模块信息的修改页面的显示和隐藏
        module_list: [],//模块树列表
        module_newlists: [],//模块信息
        //  新增模块树的内容
        param: {},
        name: '',//模块名称
        desc_en: '',//英文描述
        code: '',//模块代码
        root_id: '',//模块种类
        parent_id: '',//父级模块
        has_entry: '',//模块类型
        url: '',//链接
        versions: '',//版本号

        //  m模块树里的加号点击显示的内容
        parents: [],
        codes: [],
        urls: [],

        // 模块信息里的内容
        mask_name: '',//模块名字
        mask_desc_en: '',//英文描述
        mask_code: '',//模块代码
        mask_input_kind: '',//模块种类
        mask_has_entry: '',//模块类型
        mask_url: '',//url
        mask_input_father: '',//父级模块
        mask_input: '',//版本号
        mask_input_father_id: '',//父级模块id
        rules: '',//判断是否是系统管理员
        activeName: 'first',
        /**
         * 页面管理
         * */
        //分页
        dialog_page: false,//修改页面的显示和隐藏
        dialogVisibleurl: false,//编辑url显示隐藏
        url_list: [],//url列表
        authority: '',//所选中的页面名字
        permission_id: '',//选择到的权限的id
        checkedNames: [],//选中的所有权限的id
        bind_list: [],//获取权限组
        income_list: [],//页面
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        sys_group: false,
        //  入账代码的内容
        page_true: true,
        desc: '',//说明
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
        total: 5,
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
        page_size: 5,
        dialogVisible_rower: false,//新增权限出现的页面
        // order:'',//排序值
        rule_groups: '',
        revamp_rower: false,//修改权限出现的页面
        associated: '',//关联页面
        permission_monicker: "",//修改的权限的权限名称
        dialog_url: false,//编辑api的页面
        arg: "",//搜索api
        check_url: [],
        main_url: '',
        /**API管理*/
        api_data: [],
        api_total: 10,
        api_pagesize: 10,
        /**点击左侧*/
        dataLabel_id: '',
      }
    },
    created: function () {
      // console.log('拿到验证开始:'+sessionStorage.getItem("authorization"));
      let that = this;
      that.module_list_methods();//获取模块树
      that.kinds_methodes();//模块种类
      that.message_list();//模块信息
      that.rules = parseInt(sessionStorage.getItem("root_level"))
    },
    methods: {
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          desc_en: '',//英文描述
          name: '',//模块名称
          code: '',//模块代码
          root_id: '',//模块种类
          url: '',//url

        }
        that.has_entry = '',//模块类型
          that.parent_id = ""//父级模块


      },
      /**查看日志*/
      examine() {
        let that = this;
        that.hintInfo("warning", "暂时没有开放")
      },
      //封装获取树状结构
      module_list_methods() {
        let that = this;
        //获取树形结构数据
        that.$axios({
          url: that.url_api + "/v1/common/module/get_tree",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              that.module_list = res.data.data;
              console.log(that.module_list);
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
      //封装获取模块种类
      kinds_methodes() {
        let that = this;
        //  获取模块种类
        that.$axios({
          url: that.url_api + "/v1/common/module/root_list",
          method: "get",
          params: {
            page_size: 9999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.kinds = res.data.data
            }
            else {
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //封装模块信息
      message_list() {
        let that = this;
        //获取信息列表
        that.$axios({
          url: that.url_api + "/v1/common/module/info_list",
          method: "get",
          params: {
            page_num: that.cur_page,
            root_id: that.dataLabel_id,
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.module_newlists = res.data.data.list;
              that.module_total = res.data.data.total_count;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      // 检查去重
      check_repeat(field, keyword) {
        // console.log(this.urls.indexOf(keyword));
        // field 字段名
        //keyworld 输入值
        // 关键词
        if (field === "param.url") {
          if (this.urls.indexOf(keyword) == -1) {
            // alert("bu重复")
          } else {
            alert("输入内容已存在，请检查后重新输入")
          }
        }
        else if (field === "param.code") {
          if (this.code.indexOf(keyword) == -1) {
            // alert("bu重复")
          } else {
            alert("输入内容已存在，请检查后重新输入")
          }
        }
        else {

          //
        }
      },
      // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员,
      //全局查找
      seek() {
        let that = this;
        //发送查找内容给后台  查找
        that.$axios({
          url: that.url_api + "/v1/common/module/info_list",
          method: "post",
          data: {
            keyword: that.module_name,
            // root_id:that.modulization,
            // has_entry:that.module_type
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data);
              that.module_newlists = res.data.data.list
              that.module_total = res.data.data.total_count
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //快速筛选
      modulization_seek() {
        let that = this;
        //发送查找内容给后台  查找
        that.$axios({
          url: that.url_api + "/v1/common/module/info_list",
          method: "post",
          data: {
            root_id: that.modulization,
            has_entry: that.module_type
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data);
              that.module_newlists = res.data.data.list
              that.module_total = res.data.data.total_count
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**
       * 点击树形控件的节点
       * */
      handleNodeClick(data, e) {
        let that = this;
        that.highlight = true;
        that.page_cur_page = 1;
        that.role_cur_page = 1;
        that.cur_page = 1;
        // this.$refs.mychild.handleClick();
        if (data.parent_id === null) {
          that.dataLabel_id = data.id;
          if (that.activeName === 'first') {
            that.message_list();
          } else if (that.activeName === 'second') {
            that.enter_code();
          }else if(that.activeName==='third'){
            that.hintInfo("warning", "API管理暂时不能进行查找")
           }
        }else {
          that.hintInfo("warning", "请选择父模块节点进行查找")
        }
        console.log(data);

        /**api不做筛选，全部都用一套的，后端是这样做的*/
        // else if(that.activeName==='third'){
        //   that. api_message();
        // }


      },

      masking_true() {
        let that = this;
        if (that.rules !== 1) {
          that.hintInfo("warning", "您没有此操作权限")
        } else {
          that.dialogVisible = true;
          that.title = "添加根模块"
        }
      },
      //点击加号显示的保存以后向后台发送数据
      save() {
        let that = this;
        if ((!that.param.name) || (!that.param.code) || (!that.param.url) || (!that.has_entry)) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          that.$axios({
            url: that.url_api + "/v1/common/module/add",
            method: "post",
            data: {
              name: that.param.name,
              desc_en: that.param.desc_en,
              code: that.param.code,
              root_id: that.param.root_id,
              has_entry: that.has_entry + "",
              url: that.param.url,
              creator: that.creator,
              parent_id: that.param.parent_id
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.dialogVisible = false;
                that.module_list_methods();//获取模块树
                that.kinds_methodes();//模块种类
                that.message_list();//模块信息
                that.hintInfo("success", "添加模块成功")
              }
              else {
                console.log(res.data.message);
                if (res.data.message.search("duplicated") !== -1) {
                  that.hintInfo("warning", "模块代码重复，请检查后重新输入")
                }

              }

            })
            .catch(error => {
              console.log(error);
            });
        }

      },
      //点击树状图上的添加
      append(data) {
        let that = this;
        if (that.rules !== 1) {
          that.hintInfo("warning", "对不起，您没有此操作权限")
        } else {
          that.dialog_children = true;
          // console.log(data.data.id);
          that.title = "添加子模块"
          that.father_app();
        }
      },
      //封装获取根模块
      father_app() {
        let that = this;
        that.$axios({
          url: that.url_api + "/v1/common/module/parents",
          method: "post",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.parents = res.data.data.parents;
              that.codes = res.data.data.codes;
              that.urls = res.data.data.urls;
              console.log(res.data.data.parents)

              console.log(res.data.data.root);
              that.root_id = res.data.data.root.name
              that.parent_id = res.data.data.root.id;
            } else {
              console.log(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          })
      },
      //点击树状图上的添加后的保存---添加子模块
      save_append() {
        let that = this;
        if (that.param.name === "" || that.param.code === "" || that.param.url === "" || that.has_entry === "" || that.parent_id === "") {
          that.hintInfo("warning", "* 为必填项")
        } else {
          that.$axios({
            url: that.url_api + "/v1/common/module/add",
            method: "post",
            data: {
              name: that.param.name,
              desc_en: that.param.desc_en,
              code: that.param.code,
              // root_id:that.param.root_id,
              has_entry: that.has_entry + "",
              url: that.param.url,
              creator: that.creator,
              parent_id: that.parent_id
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.dialog_children = false;
                that.module_list_methods();//获取模块树
                that.kinds_methodes();//模块种类
                that.message_list();//模块信息
                that.hintInfo("success", "添加模块成功")
              }
              else {
                if (res.data.message.search("duplicated") !== -1) {
                  that.hintInfo("warning", "模块代码重复，请检查后重新输入")
                }
              }

            })
            .catch(error => {
              console.log(error);
            });
        }

      },
      //树状图上的删除
      remove(node, data) {
        let that = this;
        if (that.rules !== 1) {
          that.hintInfo("warning", "对不起，您没有此操作权限")
        } else {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          let id = data.id;
          console.log(id)
          console.log(children);
          if (node.childNodes == "") {
            that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              that.$message({
                type: 'success',
                message: '删除成功!'
              });
              children.splice(index, 1);
              console.log(that.authorization_token);
              that.$axios({
                url: that.url_api + "/v1/common/module/remove/" + id,
                method: "post",
              })
                .then(res => {
                  console.log(res.data.message)
                  if (res.data.message === "success") {
                    //获取信息列表
                    that.module_list_methods();//获取模块树
                    that.kinds_methodes();//模块种类
                    that.message_list();//模块信息
                  } else {
                    console.log(res.data.message)
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
          } else {
            that.hintInfo("warning", "这是一个父目录，子目录还存在，不能删除")
          }
        }

      },
      //点击树状图上的修改
      amend(node, data) {
        this.masking = true;
        this.save_preserve = true;
        this.save_add = false;
        this.save_childen = false;
        this.id = node.data.id;
        console.log(node, data);
        this.name = data.name;
        if (data.parent_id == "") {
          this.parent_id = node.parent.data.name
        } else {
          this.parent_id = node.parent.data.name;
        }

      },
      //点击树状图上的修改后的保存
      preserve() {
        let that = this;
        if (that.has_entry == "有登录入口") {
          that.has_entry = 1
        } else if (that.has_entry == "无登录入口") {
          that.has_entry = 0
        }
        ;
        console.log("保存");
        // console.log(that.creator)
        that.$axios({
          url: that.url_api + "/v1/common/module/update/" + that.id,
          method: "post",
          // params:{},
          data: {
            name: that.name,
            desc_en: that.desc_en,
            code: that.code,
            root_id: that.root_id,
            has_entry: that.has_entry,
            url: that.url,
            creator: that.creator.name,
            // create_time:this.create_time,
            // last_time:this.last_time,
            parent_id: that.parent_id
          },
        })
          .then(res => {
            console.log(res);
            if (res.data.message === "success") {
              that.masking = false;
              that.module_list_methods();//获取模块树
              that.kinds_methodes();//模块种类
              that.message_list();//模块信息
              that.hintInfo("success", "修改成功")
            } else {
              console.log(res.data.message)

            }

          })
          .catch(error => {
            console.log(error);
          })


      },

      //模块信息的修改
      submit(srow, id, index, list) {
        let that = this;
        if (that.rules !== 1) {
          that.hintInfo("warning", "对不起，您没有此操作权限")
        } else {
          console.log(srow);
          that.dialog_mask = true;
          that.title = "修改模块信息"
          that.id = id;
          that.mask_name = srow.name,//模块名字
            that.mask_desc_en = srow.desc_en,//英文描述
            that.mask_code = srow.code,//模块代码
            that.mask_input_kind = srow.root_id.name,//模块种类
            // that.mask_has_entry=srow.has_entry+"",//模块类型
            that.mask_url = srow.url,//url
            // that.mask_input_father=srow.parent_id.name,//父级模块
            that.mask_input = srow.version//版本号
          that.mask_input_father_id = srow.parent_id;

          if (!srow.parent_id) {
            that.mask_input_father = srow.parent_id;

          } else {
            that.mask_input_father = srow.parent_id.name;

          }
          ;
          if (srow.has_entry == 1) {
            that.mask_has_entry = "有登录入口"
          } else if (srow.has_entry == 0) {
            that.mask_has_entry = "无登录入口"
          }
        }
      },
      //模块信息的更改后的保存
      preserve_keep() {
        let that = this;
        if ((!that.mask_name) || (!that.mask_code) || (!that.mask_url) || (!that.mask_has_entry)) {
          that.hintInfo("warning", "* 为必填项")
        } else {
          if (that.mask_has_entry == "有登录入口") {
            that.mask_has_entry = 1
          } else if (that.mask_has_entry == "无登录入口") {
            that.mask_has_entry = 0
          }
          ;
          that.$axios({
            url: that.url_api + "/v1/common/module/update/" + that.id,
            method: "post",
            // params:{},
            data: {
              name: that.mask_name,
              desc_en: that.mask_desc_en,
              code: that.mask_code,
              root_id: that.mask_input_kind,
              has_entry: that.mask_has_entry,
              url: that.mask_url,
              // creator:that.creator.name,
              parent_id: that.mask_input_father_id
            },
          })
            .then(res => {
              console.log(res);
              if (res.data.message === "success") {
                // location.reload();  //强制刷新
                that.dialog_mask = false;
                that.hintInfo("success", "修改模块成功")
                that.module_list_methods();//获取模块树
                that.kinds_methodes();//模块种类
                that.message_list();//模块信息
                that.highlight = true;

              } else {
                console.log(res.data.message)
                if (res.data.message.search("code") !== -1) {
                  that.hintInfo("warning", "模块代码重复，请检查后重新输入")
                }
              }

            })
            .catch(error => {
              console.log(error);
              if (error.substr(0, 100) === "code") {
                that.hintInfo("warning", "模块代码重复，请检查后重新输入")
              } else {
                console.log(1);
              }
            })
        }
      },
      //模块信息的删除
      cancel(id, index, list) {
        let that = this;
        if (that.rules !== 1) {
          that.hintInfo("warning", "对不起，您没有此操作权限")
        } else {
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
              url: that.url_api + "/v1/common/module/remove/" + id,
              method: "get",
            })
              .then(res => {
                console.log(res.message)
                if (res.data.message === "success") {
                  // location.reload(); // 强制刷新
                  // that.module_list_methods();//获取模块树
                  // that.kinds_methodes();//模块种类
                  that.message_list();//模块信息
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
        }
      },
      //当添加信息里的模块代码，链接 失焦事件
      unfocused(field, keyword) {
        this.check_repeat(field, keyword);
      },
      //点击分页上的页数
      module_handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: "" + that.url_api + "/v1/common/module/info_list",
          method: "get",
          params: {
            root_id: that.dataLabel_id,
            page_num: curPage,
            page_size: 10
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              // var resp = res.data.data;
              // var new_lists = resp['list'];
              // var total_count= resp['total_count'];
              that.module_newlists = res.data.data.list;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });


      },
      //新增的显示与隐藏
      handleClose(done) {
        done();
      },
      /**右侧内容*/
      handleClick(tab, event) {
        console.log(tab, event);
        let that = this;
        that.dataLabel_id = null;
        that.highlight = false;
        if (tab.label === "页面管理") {
          that.page_cur_page = 1;
          that.app_type();//获取APP
          that.enter_code();
          that.permission_list();//获取权限组
          that.power();//获取权限
        } else if (tab.label === "模块信息") {
          that.message_list();
        }
        else if (tab.label === "API管理") {
          that.api_message();//获取API信息列表
        }
      },
      /**
       * 页面管理的函数
       * */
      /**
       * @flush_redraw 是用来刷新数据的
       * */
      flush_redraw() {
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
      //封装获取APP
      app_type() {
        let that = this;
        that.$axios({
          url: that.url_api + "/v1/common/module/root_list",
          method: "post",
          // data:{
          //   hotel_group_id:that.conglomerate,
          // }
        })
          .then(res => {
            if (res.data.message === "success") {
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
      //查看页面
      enter_code() {
        let that = this;
        console.log(that.dataLabel_id);
        that.$axios({
          url: that.url_api + "/v1/common/page/info_list",
          method: "post",
          data: {
            app_id: that.dataLabel_id,
            page_num: that.page_cur_page,
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
          that.dialog_page = true;
          that.title = "新增页面"
        } else {
          this.hintInfo("warning", "您没有此操作权限")

        }

      },
      //点击分页上的页数
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.page_cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.url_api + "/v1/common/page/info_list",
          method: "get",
          params: {
            app_id: that.dataLabel_id,
            page_num: curPage,
            page_size: that.role_pagesize
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
      cancel_page(id, index, list) {
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
            url: that.url_api + "/v1/common/page/remove/" + id,
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
          let urldata = that.Edite ? (that.url_api + "/v1/common/page/update/" + that.id) : (that.url_api + "/v1/common/page/add");
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
              if (res.data.message === "success") {
                that.enter_code();
                that.dialog_page = false;
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
          url: that.url_api + "/v1/common/rule_group/get_tree",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
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
          url: that.url_api + "/v1/common/page/get_info/" + that.permission_id,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
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
          url: that.url_api + "/v1/common/page/bind_access_rules",
          method: "post",
          data: {
            page_id: that.permission_id,//所点击的id
            rule_group_ids: JSON.stringify(that.checkedNames),//选中的url
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.checkedNames = [];
              that.enter_code();
              that.dialogVisibleurl = false;
              that.hintInfo("success", "编辑操作成功");
              that.power();
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
          url: that.url_api + "/v1/common/rule_group/get_tree",
          method: "post",
          data: {
            rule_group_name: that.permission_name,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
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
          url: that.url_api + "/v1/common/rule_group/info_list",
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
        that.highlight_group = false;
      },
      //封装获取权限列表
      power() {
        let that = this;
        that.$axios({
          url: that.url_api + "/v1/common/rule/info_list",
          method: "get",
          params: {
            page_size: 7,
            page_num: that.role_cur_page,
            rule_group_id: that.rule_index,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
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
      append_role() {
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
          let urldata = that.Edite ? (that.url_api + "/v1/common/rule_group/update/" + that.permission_name_id) : ("" + that.url_api + "/v1/common/rule_group/add");
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
                if (that.Edite) {
                  that.hintInfo("success", "修改页面权限组成功");
                } else {
                  that.hintInfo("success", "添加页面权限组成功");
                }
                that.enter_code()
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
              url: that.url_api + "/v1/common/rule_group/remove/" + id,
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
            };
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
            url: that.url_api + "/v1/common/rule/add",
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
              if (res.data.message === "success") {
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
            url: that.url_api + "/v1/common/rule/update/" + that.permission_name_id,
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
            url: that.url_api + "/v1/common/rule/remove/" + id,
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
          url: that.url_api + "/v1/common/api/info_list",
          method: "post",
          data: {
            rule_id: that.permission_id,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
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
              url: that.url_api + "/v1/common/rule/bind_api",
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
            url: that.url_api + "/v1/common/rule/bind_api",
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
          url: that.url_api + "/v1/common/api/info_list",
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
        that.role_cur_page = page;
        //获取信息列表
        that.$axios({
          url: that.url_api + "/v1/common/rule/info_list",
          method: "get",
          params: {
            page_num: page,
            page_size: 7,
            rule_group_id: that.rule_index,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
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
          url: "" + that.url_api + "/v1/common/api/info_list",
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
          url: that.url_api + "/v1/common/api/info_list",
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
      // 点击权限组的节点显示编辑和删除
      nodeClick(index) {
        let that = this;
        console.log(index);
        that.highlight_group = true;
        that.role_cur_page = 1,
          that.rule_index = index.id;
        that.power()
      },
      /***
       *
       * API管理
       *
       * */
      /**获取API信息*/
      api_message() {
        let that = this;
        that.$axios({
          url: that.url_api + "/v1/common/api/page_list",
          methods: "get",
          params: {
            page_id: that.page_id,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.api_data = res.data.data.list;
              console.log(res.data.data.total_count);
              that.api_total = res.data.data.total_count;
              // that.hintInfo("success","成功获取API信息")
            } else {
              that.hintInfo("warning", "获取API信息失败")
            }
          })
          .catch(error => {
            console.error(error)
          })
      },
      //分页
      api_handleCurrentChange(curPage) {
        let that = this;
        that.$axios({
          url: that.url_api + "/v1/common/api/page_list",
          methods: "get",
          params: {
            page_num: curPage,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.api_data = res.data.data.list;
            }
          })
          .catch(error => {
            console.error(error);
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


    },
  }
</script>

<style lang="less" scoped>
  .module-tree {
    width: 100%;
    height: 100%;
    .filtrate {
      p {
        height: 40px;
        width: 94%;
        background: white;
        line-height: 40px;
        padding-left: 10px;
        margin-top: 10px;
        border-radius: 4px;
      }
      button {
        display: inline-block;
        width: 44px;
        height: 40px;
        background: #4488E9;
        color: white;
        border-radius: 4px;
        line-height: 40px;
        text-align: center;
        border: none;
      }
    }
    .tree {
      p {
        width: 94%;
        height: 40px;
        background: white;
        line-height: 40px;
        padding-left: 10px;
        margin-top: 10px;
        border-radius: 4px;
      }
    }
    .mask_information {
      /*overflow: hidden;*/
      margin-left: 30px;
      li {
        /*float: left;*/
        /*width: 50%;*/
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 80px;

        }
      }
    }
    .right {
      width: calc(100% - 278px);
      height: 93%;
      overflow-y: scroll;
      .status {
        width: 100%;
        .paging_table {
          width: 100%;
          height: 90%;
          background: white;
        }
      }
      .ini {
        position: absolute;
        right: 0;
        top: 30px;
        height: 96%;
        z-index: 10;
      }
      //页面操作的
      .foot {
        width: 100%;
        height: 420px;
        margin-top: 34px;
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
          width: 380px;
          float: left;
          height: 64%;
          .content_group {
            height: 100%;
            .control {
              height: 100%;
              /*background:rgba(247,247,247,1);*/
              overflow-y: scroll;
            }
          }
        }
        .right_page {
          width: calc(100% - 380px);
          height: 96%;
          overflow-y: scroll;
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
  .el-transfer >>> .el-transfer-panel {
    width: 417px;
    margin-top: 10px;
  }

  .content >>> .el-tree-node__content {
    background: #eeeeee;
  }

  .content >>> .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background: #4488E9;
    border-radius: 4px;
    color: white;
  }

  .content_group >>> .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background: white;
    border-radius: 4px;
    color:  rgb(68, 136, 233);
  }

  .content >>> .el-tree {
    color: black;
  }
</style>
