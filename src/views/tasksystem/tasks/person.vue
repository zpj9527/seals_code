<template>
  <div class="person">
    <div class="title">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="margin:0 10px">
        <el-tab-pane label="未送物" name="second">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="not_room" clearable placeholder="请选择" size="mini" style="width: 150px;" @change="filtrate">
                <el-option
                  v-for="item in room_number"
                  :key="item.value"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>日期 ：</span>
              <el-date-picker
                v-model="reception_time"
                @change="filtrate"
                type="date"
                size="mini"
                style="width: 150px;"
                value-format="yyyy-MM-dd"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <!--<button @click="filtrate()" size="mini">筛选</button>-->
          </div>
          <el-button type="primary" @click="round_add()" size="mini" style="width: 80px;margin: 10px 0">
            <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
            新增
          </el-button>
          <!--表格-->
          <div class="status">
            <el-table
              :data="income_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="delivery_type"
                label="送物来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>
              <el-table-column type="expand" width="100"
                               prop="goods_list"
                               label="商品详情">
                <template slot-scope="props">
                  <!--<span>{{props.row.goods_list}}</span>-->
                  <el-table
                    :data=" props.row.goods_list"
                    align="center"
                    :cell-style="{textAlign:'center'}"
                    :header-cell-style="{background:'#ffffff',color:'#000000',textAlign:'center'}"
                    stripe>
                    <el-table-column
                      prop="name"
                      label="商品名称">
                    </el-table-column>
                    <el-table-column
                      prop="list_price"
                      label="商品价格">
                    </el-table-column>
                    <el-table-column
                      prop="account_number"
                      label="商品数量">
                    </el-table-column>
                    <el-table-column
                      prop="is_whether"
                      label="是否免费">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_whether===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="is_returned"
                      label="是否需要归还">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_returned===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods_total_price"
                label="商品总价">
              </el-table-column>
              <el-table-column
                prop="status"
                label="送物状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 5">工作中</span>
                  <span v-else>删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="create_datetime"
                width="140"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="modify_datetime"
                width="140"
                label="修改时间">
              </el-table-column>
              <el-table-column
                prop="create_user"
                label="创建人">
              </el-table-column>
              <el-table-column
                prop="modify_user"
                label="修改人">
              </el-table-column>
              <el-table-column
                prop="address"
                width="220 "
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)">删除
                  </el-button>
                  <el-button size="mini"
                             @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
                  </el-button>
                  <el-button size="mini"
                             @click="dialog_entertain = true;reception(scope.row,scope.row.id,scope.$index, income_list) ">
                    送物
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
            width="50%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul class="dialog_style">
              <!--商品消费-->
              <div>
                <el-row style="margin-bottom: 10px;overflow: hidden">
                  <div style="display: inline-block;font-weight: bold;margin-left: 35%;">商品入账</div>
                  <div style=" margin-left: 50px;float: right">
                    <span style="text-align: center">房间号：</span>
                    <el-select v-model="room_mark" clearable placeholder="请选择" size="mini" style="width: 150px;"
                               @focus="acquire_room">
                      <el-option
                        v-for="item in room_number_mark"
                        :key="item.value"
                        :label="item.room_no"
                        :value="item.room_no">
                      </el-option>
                    </el-select>
                  </div>
                </el-row>
                <el-table :data="merchandise_list_data"
                          :cell-style="{textAlign:'center'}"
                          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                          size="mini">
                  <el-table-column prop="id" label="序号"></el-table-column>
                  <el-table-column prop="code" label="商品编码"></el-table-column>
                  <el-table-column prop="name" label="商品名称"  width="200"></el-table-column>
                  <el-table-column prop="uom_name" label="单位"></el-table-column>
                  <el-table-column prop="account_number" label="数量" width="150">
                    <template slot-scope="scope">
                      <el-input-number v-model="scope.row.account_number" :min="1" :max="scope.row.qty_available "
                                       label="描述文字" size="mini"></el-input-number>
                      <!--<el-input v-model="scope.row.account_number"   style="width: 120px;ime-mode:Disabled"   min=1-->
                      <!--onkeyup="value=(parseInt((value=value.replace(/\D/g,''))==''||parseInt((value=value.replace(/\D/g,''))===0)?'1':value,10))" onafterpaste="value=(parseInt((value=value.replace(/\D/g,''))==''||parseInt((value=value.replace(/\D/g,''))==0)?'1':value,10))"-->
                      <!--type="number" size="mini"-->
                      <!--&gt;</el-input>-->
                    </template>
                  </el-table-column>
                  <el-table-column prop="list_price" label="单价">
                  </el-table-column>
                  <el-table-column prop="money" label="金额">
                    <template slot-scope="scope">
                      <span>{{scope.row.account_number*scope.row.list_price}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="qty_available" label="库存"></el-table-column>
                  <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger"
                                 @click=" shift_out(scope.row.id,scope.$index, merchandise_list_data)">移出
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div style="width: 100%;height: 38px;border-bottom: 1px solid #ebeef5;line-height: 38px">
                  <span>合计：</span>
                  <div style="float: right;margin-right: 40px">
                    <span>共 <span style="color: orangered">{{count_number}}</span></span> 件
                    <span style="margin-left: 10px">共 <span style="color: red">{{count_money}}</span></span> 元
                  </div>
                </div>
                <el-row class="pagination">
                  <!--<p class="pull-left">显示第1到第6条记录，共6条记录</p>-->
                  <el-pagination style="float: right;margin-right: 2%"
                                 layout="prev, pager, next"
                                 :page-size="pagesize"
                                 @current-change="handleCurrentChange"
                                 :total="total">
                  </el-pagination>


                </el-row>
                <el-row>
                  商品类别：
                  <el-select v-model="goods_type" style="width: 120px" placeholder="请选择" size="mini"
                             @change="commodity_type">
                    <el-option
                      v-for="item in category"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                  商品名称：
                  <el-select v-model="goods_name" style="width: 120px" placeholder="请选择" size="mini"
                             @change="merchandise_name">
                    <el-option
                      v-for="item in merchandise_list"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select> &nbsp;

                </el-row>
                <el-row style="margin-top: 20px; display: flex; justift-content: space-between">
                  <span style="width: 35px">备注:</span>
                  <el-input type="textarea" :rows="4" v-model="desc"></el-input>
                </el-row>
              </div>
              <!--<div style="height: 40px; margin-top: 40px">-->
              <!--<div style="float: left">-->
              <!--<el-button  type="info">预约发票</el-button>-->
              <!--</div>-->
              <!--<div style="float: right">-->
              <!--<el-button  type="primary">开具专票</el-button>-->
              <!--<el-button  type="primary">开具普票</el-button>-->
              <!--</div>-->
              <!--</div>-->

            </ul>

            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
          </el-dialog>
          <!--点击配送-->
          <el-dialog
            title="请选择配送员"
            :visible.sync="dialog_entertain"
            :close-on-click-modal='false'
            width="30%"
            :before-close="handleClose">
            <ul class="dialog_style">
              <li>
                <span style="text-align: right">配送员 ：</span>
                <el-select v-model="complete_user_name" placeholder="请选择" size="mini">
                  <el-option
                    v-for="item in distribution_shift"
                    :key="item.id"
                    :label="item.real_name"
                    :value="item.user_id">
                  </el-option>
                </el-select>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_entertain = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="determine()" size="mini">确 定</el-button>
             </span>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="待送物" name="third">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="reception_room" clearable placeholder="请选择房间号" size="mini" style="width: 150px;" @change="reception_filtrate">
                <el-option
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>日期 ：</span>
              <el-date-picker
                @change="reception_filtrate"
                v-model="reception_data"
                type="date"
                size="mini"
                value-format="yyyy-MM-dd"
                clearable
                style="width: 150px;"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 10px">
              <span>配送员 ：</span>
              <el-select v-model="reception_man" clearable placeholder="请选择配送员" size="mini" style="width: 150px;" @change="reception_filtrate">
                <el-option
                  v-for="item in distribution_man"
                  :key="item.id"
                  :label="item.real_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <!--<el-button type="text" @click="dialog = true;flush()">-->
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          <!--</el-button>-->
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="receive_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <!--<el-table-column-->
              <!--prop="master_single_num"-->
              <!--label="编号">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="delivery_type"
                label="送物来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.delivery_type===10">微信</span>
                  <span v-else-if="scope.row.delivery_type===20">前台</span>
                  <span v-else-if="scope.row.delivery_type===30">客房部</span>
                  <span v-else>其它</span>
                </template>
              </el-table-column>
              <el-table-column type="expand" width="100"
                               prop="goods_name"
                               label="商品详情">
                <template slot-scope="props">
                  <!--<span>{{props.row.goods_list}}</span>-->
                  <el-table
                    :data=" props.row.goods_list"
                    align="center"
                    :cell-style="{textAlign:'center'}"
                    :header-cell-style="{background:'#ffffff',color:'#000000',textAlign:'center'}"
                    stripe>
                    <el-table-column
                      prop="name"
                      label="商品名称">
                    </el-table-column>
                    <el-table-column
                      prop="list_price"
                      label="商品价格">
                    </el-table-column>
                    <el-table-column
                      prop="account_number"
                      label="商品数量">
                    </el-table-column>
                    <el-table-column
                      prop="is_whether"
                      label="是否免费">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_whether===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="is_returned"
                      label="是否需要归还">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_returned===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>

              <!--<el-table-column-->
              <!--prop="count"-->
              <!--label="商品数量">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="goods_price"-->
              <!--label="商品价格">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="goods_total_price"
                label="商品总价">
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="is_free"-->
              <!--label="是否免费">-->
              <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row.is_need_to_return === 0">否</span>-->
              <!--<span v-else>是</span>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="is_need_to_return"-->
              <!--label="是否需要归还">-->
              <!--<template slot-scope="scope">-->
              <!--<span v-if="scope.row.is_need_to_return === 0">否</span>-->
              <!--<span v-else>是</span>-->
              <!--</template>-->
              <!--</el-table-column>-->

              <el-table-column
                prop="status"
                label="送物状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="complete_user_name"
                label="配送人">
              </el-table-column>
              <el-table-column
                prop="create_datetime"
                width="140"
                label="创建时间">
              </el-table-column>
              <el-table-column
                prop="create_user"
                label="创建人">
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="address"-->
              <!--fixed="right"-->
              <!--label="操作">-->
              <!--<template slot-scope="scope" >-->
              <!--<el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, receive_list)" >删除</el-button>-->
              <!--&lt;!&ndash;<el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>&ndash;&gt;-->
              <!--&lt;!&ndash;<el-button size="mini" @click="dialog_entertain = true;reception(scope.row,scope.row.id,scope.$index, income_list) ">送物</el-button>&ndash;&gt;-->
              <!--</template>-->
              <!--</el-table-column>-->

            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           @current-change="handleCurrentChange_receive"
                           :total="receive_total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="routing">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="achieve_room" placeholder="请选择" size="mini" style="width: 150px;"  clearable @change="achieve_filtrate">
                <el-option
                  clearable
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>日期 ：</span>
              <el-date-picker
                @change="achieve_filtrate"
                v-model="achieve_time"
                type="date"
                size="mini"
                style="width: 150px;"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 10px">
              <span>配送员 ：</span>
              <el-select v-model="achieve_man" clearable placeholder="请选择" size="mini" style="width: 150px;" @change="achieve_filtrate">
                <el-option
                  v-for="item in distribution_man"
                  :key="item.id"
                  :label="item.real_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <!--<button @click="achieve_filtrate()">筛选</button>-->
          </div>
          <!--<el-button type="text" @click="dialogGrabble = true;flush()">-->
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
          <!--</el-button>-->
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="had_done"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <!--<el-table-column-->
              <!--prop="master_single_num"-->
              <!--label="编号">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="delivery_type"
                label="送物来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.delivery_type === 10">微信</span>
                  <span v-else-if="scope.row.delivery_type === 20">前台</span>
                  <span v-else-if="scope.row.delivery_type === 30">客房部</span>
                  <span v-else-if="scope.row.delivery_type === 40">其它</span>
                </template>
              </el-table-column>
              <el-table-column
                type="expand"
                prop="goods_lists"
                width="100"
                label="商品详情">
                <template slot-scope="props">
                  <!--<span>{{props.row.goods_list}}</span>-->
                  <el-table
                    :data=" props.row.goods_list"
                    align="center"
                    :cell-style="{textAlign:'center'}"
                    :header-cell-style="{background:'#ffffff',color:'#000000',textAlign:'center'}"
                    stripe>
                    <el-table-column
                      prop="name"
                      label="商品名称">
                    </el-table-column>
                    <el-table-column
                      prop="list_price"
                      label="商品价格">
                    </el-table-column>
                    <el-table-column
                      prop="account_number"
                      label="商品数量">
                    </el-table-column>
                    <el-table-column
                      prop="is_whether"
                      label="是否免费">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_whether===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="is_returned"
                      label="是否需要归还">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_returned===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="count"-->
              <!--label="商品数量">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="goods_price"-->
              <!--label="商品价格">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="goods_total_price"
                label="商品总价">
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="is_free"-->
              <!--label="是否免费">-->
              <!--</el-table-column>-->
              <!--<el-table-column-->
              <!--prop="is_need_to_return"-->
              <!--label="是否需要归还">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="done_id"
                label="配送人">
              </el-table-column>
              <el-table-column
                prop="status"
                label="送物状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="done_time"
                label="完成时间">
              </el-table-column>
              <el-table-column
                prop="address"
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel_had(scope.row.id,scope.$index, had_done)">删除
                  </el-button>
                  <!--<el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
                  <!--<el-button size="mini" @click="dialog_entertain = true;reception(scope.row,scope.row.id,scope.$index, income_list) ">送物</el-button>-->
                </template>
              </el-table-column>

            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           @current-change="handleCurrentChange_achieve"
                           :total="had_total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已删除" name="delete">
          <div class="grabble">
            <div>
              <span>房间号 ：</span>
              <el-select v-model="delete_room" placeholder="请选择" size="mini" style="width: 150px;" @change="delete_filtrate">
                <el-option
                  clearable
                  v-for="item in room_number"
                  :key="item.room_no"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
            <div style="margin-left: 10px">
              <span>日期 ：</span>
              <el-date-picker
                @change="delete_filtrate"
                v-model="delete_time"
                type="date"
                size="mini"
                style="width: 150px;"
                clearable
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div style="margin-left: 10px">
              <span>配送员 ：</span>
              <el-select v-model="delete_man" clearable placeholder="请选择" size="mini" style="width: 150px;" @change="delete_filtrate">
                <el-option
                  v-for="item in distribution_man"
                  :key="item.id"
                  :label="item.real_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </div>
            <!--<button @click="delete_filtrate()">筛选</button>-->
          </div>
          <!--表格-->
          <div class="status" style="margin-top: 20px">
            <el-table
              :data="delete_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="room_no"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="delivery_type"
                label="送物来源">
                <template slot-scope="scope">
                  <span v-if="scope.row.delivery_type === 10">微信</span>
                  <span v-else-if="scope.row.delivery_type === 20">前台</span>
                  <span v-else-if="scope.row.delivery_type === 30">客房部</span>
                  <span v-else-if="scope.row.delivery_type === 40">其它</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods_name"
                type="expand"
                width="100"
                label="商品详情">
                <template slot-scope="props">
                  <!--<span>{{props.row.goods_list}}</span>-->
                  <el-table
                    :data=" props.row.goods_list"
                    align="center"
                    :cell-style="{textAlign:'center'}"
                    :header-cell-style="{background:'#ffffff',color:'#000000',textAlign:'center'}"
                    stripe>
                    <el-table-column
                      prop="name"
                      label="商品名称">
                    </el-table-column>
                    <el-table-column
                      prop="list_price"
                      label="商品价格">
                    </el-table-column>
                    <el-table-column
                      prop="account_number"
                      label="商品数量">
                    </el-table-column>
                    <el-table-column
                      prop="is_whether"
                      label="是否免费">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_whether===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="is_returned"
                      label="是否需要归还">
                      <template slot-scope="scope">
                        <span v-if="scope.row.is_returned===1">是</span>
                        <span v-else>否</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column
                prop="goods_total_price"
                label="商品总价">
              </el-table-column>
              <el-table-column
                prop="complete_user_name"
                label="配送人">
              </el-table-column>
              <el-table-column
                prop="status"
                label="送物状态">
                <template slot-scope="scope">
                  <span v-if="scope.row.status === 0">初始</span>
                  <span v-else-if="scope.row.status === 5">待完成</span>
                  <span v-else-if="scope.row.status === 10">完成</span>
                  <span v-else-if="scope.row.status === 20">删除</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="done_time"
                label="完成时间">
              </el-table-column>
              <el-table-column
                prop="address"
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel_remove(scope.row.id,scope.$index, delete_list)">删除
                  </el-button>
                  <!--<el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
                  <!--<el-button size="mini" @click="dialog_entertain = true;reception(scope.row,scope.row.id,scope.$index, income_list) ">送物</el-button>-->
                </template>
              </el-table-column>

            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           @current-change="handleCurrentChange_jesse"
                           :total="delete_total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import ElButton from "element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    name: "person",
    data() {
      return {
        activeName2: 'second',//这个是默认头部
        url: this.api.api_service_9104,
        //分页
        total: 10,
        pagesize: 10,
        receive_total: 10,//代送物的总数据条数
        had_total: 10,//已完成的总数据条数
        delete_total: 10,//已删除的总数据条数
        cur_page: 1,//第几页
        title: "",
        dialogVisible: false,//未送物的修改页面和新增页面的显示与隐藏
        dialog: false,//代送物的修改页面和新增页面的显示与隐藏
        dialogGrabble: false,//已完成的修改页面和新增页面的显示与隐藏
        dialog_entertain: false,//接待
        distribution_man: [],//接待人
        distribution_shift:[],//在班的接待人
        income_list: [],//未送物的列表
        receive_list: [],//待送物列表
        room_number: [], //这个是房间号
        room_number_mark: [],//新增送物的房间号
        had_done: [],//已完成
        delete_list: [],//已删除
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新

        param: {},//新增入账代码里的内容
        //筛选条件

        // 送物来源
        gift_package: [
          {
            value: 10,
            label: '微信'
          },
          {
            value: 20,
            label: '前台'
          },
          {
            value: 30,
            label: '客房部'
          },
          {
            value: 40,
            label: '其它'
          },
        ],

        //订单状态
        order_status: [
          {
            value: "0",
            label: '初始'
          },

        ],

        /*
       * 未接待的筛选
       * */
        not_room: '',//未接待房间号
        reception_time: '',//未接待时间
        /*
       * 待接待的筛选
       * */
        reception_room: '',//待接待房间号
        reception_data: '',//待接待时间
        reception_man: '',//待接待人
        /*
        * 完成接待的筛选
        * */
        achieve_room: '',//完成接待房间号
        achieve_time: '',//完成接待日期
        achieve_man: '',//完成接待人
        /**
         * 已删除的筛选
         * */
        delete_room: '',
        delete_time: '',
        delete_man: '',

        complete_user_name: '',//送物人
        // master_single_num:'', //编号
        room_no: '',//房间号
        delivery_type: '',//送物来源
        status: '',//订单状态
        goods_type: '',//商品种类
        goods_name: '',//商品名称
        // account_number:1,//商品数量
        goods_price: '',//商品价格
        goods_total: '',//商品总价
        is_free: '',//是否免费
        is_need_to_return: '',//是否需要归还
        complete_time: '',//送物时间
        merchandise_list: [],//获取送物
        merchandise_list_data: [],//物品详细信息
        desc: '',//备注
        category: [],//商品种类
        // count_money:"",//总价钱
        commodity_id: '',//商品类别id;
        account_arr: [],//push所有选中的数据
        arr_list: [],
        room_mark: "",//新增送物的房间号
      };
    },
    created: function () {
      let that = this;
      that.enter_code();//获取未送物的list
      that. receiver();//获取送物人
      that.get_room_number();

    },
    computed: {
      count_number: function () {
        let number = 0;

        for (let i = 0; i < this.merchandise_list_data.length; i++) {
          number += parseInt(this.merchandise_list_data[i].account_number)
        }
        return number;
      },
      count_money() {
        let number = 0;
        for (let i = 0; i < this.merchandise_list_data.length; i++) {
          number += parseInt(this.merchandise_list_data[i].account_number) * this.merchandise_list_data[i].list_price
        }
        return number;
      },
    },
    methods: {
      //    这个是选择头部的方法
      handleClick(tab, event) {
        console.log(tab, event);
        let that = this;
        if (tab.label === "待送物") {
          that.await_code();
        } else if (tab.label === "已完成") {
          that.achieve_code();
        } else if (tab.label === "已删除") {
          that.jesse_code()
        }

      },
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },

      /**点击商品名称并且push新的数组展示*/
      merchandise_name(value) {
        let that = this;
        console.log(value);
        that.$axios({
          url: that.api.api_9530_9503 + "/v1/stock/product_product/get/" + value,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let is_whether, is_returned;
              res.data.data.account_number = 1;
              res.data.data.money = res.data.data.list_price;
              res.data.data.money = res.data.data.list_price;//价格
              if (parseInt(res.data.data.list_price) > 0) {
                is_whether = 0;
                is_returned = 0
              } else {
                is_returned = 1;
                is_returned = 1
              }
              res.data.data.is_whether = is_whether;//是否免费
              res.data.data.is_returned = is_returned//是否需要归还
              //判断该table里面是不是存在一个id
              let ayy = {};
              for (let i of that.account_arr) {
                ayy[i.id] = i.name;
              }
              ;
              if (value in ayy) {
                //nothing...
              }
              else {
                that.account_arr.push(res.data.data);
                that.merchandise_list_data = that.account_arr;
              }
              console.log("step");
              console.log(that.merchandise_list_data);
            }
          })
          .catch(error => {
            console.error(error)
          });
        for (let i = 0; i < that.account_arr.length; i++) {
          if (value === that.account_arr[i].id) {
            console.log("重复");
            console.log(that.account_arr[i].account_number);
            that.account_arr[i].account_number += 1;
          } else {

          }
        }
        that.merchandise_list_data = that.account_arr;


      },
      /**获取商品类别*/
      merchandise_type() {
        let that = this;
        that.$axios({
          url: that.api.api_9530_9503 + "/v1/stock/product_category/list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.category = res.data.data;
              if (that.category) {
                that.goods_type = res.data.data[0].id;
                that.commodity_id = res.data.data[0].id;
                if (that.commodity_id !== ""  ) {
                  that.merchandise();//获取商品
                }

              }

            }
          })
          .catch(error => {

          })
      },
      /**点击商品类别*/
      commodity_type(value) {
        console.log(value);
        let that = this;
        that.commodity_id = value;
        that.merchandise();//获取商品
      },
      /**移出商品*/
      shift_out(id, index, list) {
        let that = this;
        list.splice(index, 1);
        that.goods_name = "";
      },
      /**点击新增送物获取的房间号*/
      acquire_room() {
        let that = this;
        that.room_list();
      },


      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          master_single_num: '', //编号
          goods_price: '',//商品价格
          account: '',//商品id
          goods_total: '',//商品总价
        }
        that.account = '1',//商品数量
          that.goods_name = '',//商品名称
          that.room_no = '',//房间号
          that.delivery_type = '',//送物来源
          that.status = '0',//订单状态
          that.is_free = '1',//是否免费
          that.is_need_to_return = '0',//是否需要归还
          that.complete_time = ''//送物时间
        that.room_mark = "";//房间号

      },
      //新增送物封装获取房间号
      room_list() {
        let that = this
        that.$axios({
          url: that.api.api_price_9101 + '/v1/room/room_status/get_room_map_list/?room_state__in=OC,OD',
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res)
              that.room_number_mark = res.data.data.results
            }
            else {
              console.log(res)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**获取房间号*/
      get_room_number() {
        let that = this
        that.$axios({
          url: that.api.api_price_9101 + '/v1/room/room_status/get_room_map_list/',
          method: "get",
          params: {
            page_size: 999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res)
              that.room_number = res.data.data.results
            }
            else {
              console.log(res)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**封装获取送物人*/
      receiver() {
        let that = this;
        let arr=[];
        let responsibility_id = sessionStorage.getItem("responsibility_id");
        console.log(responsibility_id);
        arr.push(responsibility_id);
        that.$axios({
          url: that.api.api_9022_9519 + "/v1/common/employee/get_by_duty",
          method: "post",
          data: {
            page_size: 999,
            duty_ids:JSON.stringify(arr),
          }

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.distribution_man = res.data.data.list

            }
            else {
              console.log(res)

            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**获取商品*/
      merchandise() {
        let that = this;
        let arr = [];
        // that.merchandise_list=[];
        that.goods_name = "";
        that.$axios({
          url: that.api.api_9530_9503 + "/v1/stock/product_product/list",
          method: "post",
          data: {
            categ_id: that.commodity_id
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              for (let i = 0; i < res.data.data.length; i++) {
                if (res.data.data[i].qty_available !== 0) {
                  arr.push(res.data.data[i])
                }

              }
              that.merchandise_list = arr;
              if (that.merchandise_list.length === 0) {
                that.hintInfo("warning", "该商品类别下暂无商品")
              }
            }
          })
          .catch(error => {
            console.error(err);
          })
      },
      /**封装获取未送物*/
      enter_code() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/task/room_service/get_delivery_list/",
          method: "get",
          params: {
            status: 0,
            page_num: that.cur_page
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data.results);
              let income_arr = [];//未送物
              income_arr = res.data.data.results
              that.total = res.data.data.count;
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.income_list = [];
              that.activeName2 = 'second'
              let create_datetime, create_time, modify_datetime, modify_time;
              /**循环改变所有未送物的good_list 数据结构*/
              for (let i = 0; i < income_arr.length; i++) {
                income_arr[i].goods_list = JSON.parse(income_arr[i].goods_list);
                create_datetime = income_arr[i].create_datetime.split('T');
                modify_datetime = income_arr[i].modify_datetime.split('T');
                create_time = create_datetime[1].split('.');
                modify_time = modify_datetime[1].split('.');
                income_arr[i].create_datetime = create_datetime[0] + "-" + create_time[0];
                income_arr[i].modify_datetime = modify_datetime[0] + "-" + modify_time[0];
              }
              that.income_list = income_arr;
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**封装待送物*/
      await_code() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/task/room_service/get_delivery_list/",
          method: "get",
          params: {
            status: 5,
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let receive_arr = [];
              that.activeName2 = 'third'
              let create_datetime, create_time;
              receive_arr = res.data.data.results
              that.receive_total = res.data.data.count;
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.receive_list = [];
              /**循环改变所有待送物的good_list 数据结构*/
              for (let i = 0; i < receive_arr.length; i++) {
                receive_arr[i].goods_list = JSON.parse(receive_arr[i].goods_list);
                create_datetime = receive_arr[i].create_datetime.split('T');
                create_time = create_datetime[1].split('.');
                receive_arr[i].create_datetime = create_datetime[0] + "-" + create_time[0];
              }
              that.receive_list = receive_arr;
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });

      },
      /**封装已完成*/
      achieve_code() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/task/room_service/get_delivery_list/",
          method: "get",
          params: {
            status: 10,
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.activeName2 = 'routing'
              let had_arr = [];//已完成
              let create_datetime, create_time;
              had_arr = res.data.data.results
              that.had_total = res.data.data.count;
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.had_done = [];
              /**循环改变所有已完成good_list 数据结构*/
              for (let i = 0; i < had_arr.length; i++) {
                had_arr[i].goods_list = JSON.parse(had_arr[i].goods_list);
                // create_datetime = had_arr[i].done_time.split('T');
                // create_time = create_datetime[1].split('.');
                // had_arr[i].done_time = create_datetime[0]+"-"+create_time[0];
              }
              that.had_done = had_arr;
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**封装已删除*/
      jesse_code() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/task/room_service/get_delivery_list/",
          method: "get",
          params: {
            status: 20,
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.activeName2 = 'delete'
              let create_datetime, create_time;
              let delete_arr = [];//已删除
              delete_arr = res.data.data.results
              that.delete_total = res.data.data.count;
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.delete_list = [];
              /**循环改变所有已删除good_list 数据结构*/
              for (let i = 0; i < delete_arr.length; i++) {
                // delete_arr[i].goods_list = JSON.parse(delete_arr[i].goods_list);
                for (let i = 0; i < delete_arr.length; i++) {
                  delete_arr[i].goods_list = JSON.parse(delete_arr[i].goods_list);
                  // create_datetime = delete_arr[i].done_time.split('T');
                  // create_time = create_datetime[1].split('.');
                  // delete_arr[i].done_time = create_datetime[0]+"-"+create_time[0];
                }
              }
              that.delete_list = delete_arr;
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //点击未送物分页上的页数
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.api + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            status: 0
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              let income_arr = [];//未送物
              income_arr = res.data.data.results
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.income_list = [];
              /**循环改变所有未送物的good_list 数据结构*/
              for (let i = 0; i < income_arr.length; i++) {
                income_arr[i].goods_list = JSON.parse(income_arr[i].goods_list);
              }
              that.income_list = income_arr;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**点击待送物的分页*/
      handleCurrentChange_receive(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.api + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            status: 5
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              let receive_arr = [];
              receive_arr = res.data.data.results
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.receive_list = [];
              /**循环改变所有待送物的good_list 数据结构*/
              for (let i = 0; i < receive_arr.length; i++) {
                receive_arr[i].goods_list = JSON.parse(receive_arr[i].goods_list)
              }
              that.receive_list = receive_arr;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**点击已完成的分页*/
      handleCurrentChange_achieve(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.api + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            status: 10
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              let had_arr = [];//已完成
              had_arr = res.data.data.results
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.had_done = [];
              /**循环改变所有已完成good_list 数据结构*/
              for (let i = 0; i < had_arr.length; i++) {
                had_arr[i].goods_list = JSON.parse(had_arr[i].goods_list)
              }
              that.had_done = had_arr;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**点击删除的分页*/
      handleCurrentChange_jesse(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.api + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            status: 10
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              let delete_arr = [];//已删除
              delete_arr = res.data.data.results
              that.delete_total = res.data.data.count;
              //push 的时候要先清空数组，保证这个是一个空的数组
              that.delete_list = [];
              /**循环改变所有已删除good_list 数据结构*/
              for (let i = 0; i < delete_arr.length; i++) {
                delete_arr[i].goods_list = JSON.parse(delete_arr[i].goods_list)
              }
              that.delete_list = delete_arr;
            }
            else {
              // console.log(resp.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //  点击未送物删除
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
            url: that.url + "/v1/task/room_service/remove_delivery/" + id + '/',
            method: "post",
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
      /**点击已完成的删除*/
      cancel_had(id, index, list) {
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
            url: that.url + "/v1/task/room_service/remove_delivery/" + id + '/',
            method: "post",
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
      /**点击已删除的删除*/
      cancel_remove(id, index, list){
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
            url: that.url + "/v1/task/room_service/remove_delivery/" + id + '/',
            method: "post",
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
      //点击未送物修改
      amend(srow, id, index, list) {
        let that = this;
        that.title = "修改送物"
        that.Edite = true;
        that.id = id;
        console.log(srow);
        that.merchandise_type();
        that.room_mark = srow.room_no;
        that.merchandise_list_data = srow.goods_list;
        that.desc = srow.remark;


      },
      /***点击新增*/
      round_add() {
        let that = this;
        that.title = "新增送物";
        that.dialogVisible = true;
        that.flush();
        // that.merchandise();//获取物品
        that.merchandise_type();//获取商品类别
        for (let item of that.merchandise_list_data) {
          console.log(item);
          item.account_number = "";
        }
        // that.merchandise_list_data=[];//商品
        /**清空数组*/
        // that.merchandise_list_data.splice(0,that.merchandise_list_data.length);
        that.merchandise_list_data.length = 0;
        that.desc = "";
        console.log(that.merchandise_list_data);

      },

      //点击未送物新增和修改后的保存
      ensure() {
        let that = this;
        if (that.room_mark === "" || that.count_money === 0) {
          that.hintInfo("warning", "请选择房间号和商品")
          console.log(that.merchandise_list_data);
        } else {
          console.log(that.merchandise_list_data);
          for (let i = 0; i < that.merchandise_list_data.length; i++) {
            // that.arr_list=[];
            that.arr_list = [];
            for (let item of that.merchandise_list_data) {
              let arr = {};
              console.log(item);
              //arr.push(item.id,item.name,item.account_number,item.list_price,item.is_whether,item.is_returned,);
              arr.id = item.id;
              arr.name = item.name;
              arr.account_number = item.account_number;
              arr.list_price = item.list_price;
              arr.is_whether = item.is_whether;
              arr.is_returned = item.is_returned;
              arr.qty_available = item.qty_available;
              console.info(arr);
              that.arr_list.push(arr);
              console.info(that.arr_list);
            }

          }
          // console.log(JSON.stringify(that.arr_list));
          // console.log(JSON.parse(that.arr_list));
          let urldata = that.Edite ? (that.url + "/v1/task/room_service/update_delivery/" + that.id + "/") : (that.url + "/v1/task/room_service/add_delivery/");
          console.info(urldata);
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              goods_total_price: that.count_money,
              delivery_type: 20,
              room_no: that.room_mark,
              goods_list: JSON.stringify(that.arr_list),
              remark: that.desc,
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                that.dialogVisible = false;
                that.enter_code();
              }
              else {
                that.hintInfo("warning", res.data.message)
              }
            })
            .catch(error => {
              console.log(error);
              that.hintInfo("warning", res.data.message)
            });

        }
      },
      //点击送物
      reception(srow, id, index, list) {
        let that = this;
        console.log(srow);
        that.id = id;
        that.complete_user_name = "";
        let arr =[];
        //这里根绝角色职责得到员工，然后把员工的id传给后台，拿到在班的员工
        for(let item of that.distribution_man){
          arr.push(item.id)
        }
        that.on_guard(arr);

      },
      /**封装获取在班人员*/
      on_guard(arr){
        let that =this;
        that.$axios({
          url:that.api.api_9530_9503+"/v1/manage/duty_record/on_duty_employees",
          method:"post",
          data:{
            users_id:JSON.stringify(arr)
          }
        })
          .then(res =>{
            console.log( res.data.data);
            that.distribution_shift = res.data.data;
          })
          .catch(error=>{
            console.log(error);
          })
      },
      //点击送物后的保存
      determine() {
        let that = this;
        console.log(that.complete_user_name);
        if (that.complete_user_name === "") {
          that.hintInfo("warning", "请选择配送员")
        } else {
          that.$axios({
            url: that.url + "/v1/task/room_service/assign_update_delivery/" + that.id + '/',
            method: "post",
            data: {
              work_user_id: that.complete_user_name,//送物人
            },
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.enter_code();
                that.dialog_entertain = false;
                that.hintInfo("success", "成功选择配送员")
              }
              else {
                that.error(res.data.message)
                console.log(res.data.message);
                that.hintInfo("warning", "该员工未绑定小程序")
              }
            })
            .catch(error => {
              console.log(error);
              that.hintInfo("warning", "该员工未绑定小程序")
            });
        }

      },

      /*
      * 筛选条件
      * */
      //点击未送物的筛选
      filtrate() {
        console.log(1);
        let that = this;
        if(that.not_room===''){
          that.not_room=undefined
        }else if(that.reception_time===""){
          that.reception_time=undefined
        }
          that.$axios({
            url: that.url + "/v1/task/room_service/get_delivery_list/",
            method: "get",
            params:{
              status: 0,
              room_no :that.not_room ,
              plan_start_time: that.reception_time,

            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res.data.data.results);
                let income_arr = [];//未送物
                income_arr = res.data.data.results
                that.total = res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.income_list = [];
                that.activeName2 = 'second'
                let create_datetime, create_time, modify_datetime, modify_time;
                /**循环改变所有未送物的good_list 数据结构*/
                for (let i = 0; i < income_arr.length; i++) {
                  income_arr[i].goods_list = JSON.parse(income_arr[i].goods_list);
                  create_datetime = income_arr[i].create_datetime.split('T');
                  modify_datetime = income_arr[i].modify_datetime.split('T');
                  create_time = create_datetime[1].split('.');
                  modify_time = modify_datetime[1].split('.');
                  income_arr[i].create_datetime = create_datetime[0] + "-" + create_time[0];
                  income_arr[i].modify_datetime = modify_datetime[0] + "-" + modify_time[0];
                }
                that.income_list = income_arr;
              }
              else {
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
      },
      //点击待送物的筛选、
      reception_filtrate() {
        let that = this;
        if(that.reception_room===''){
          that.reception_room=undefined
        }else if(that.reception_data===""){
          that.reception_data=undefined
        }else if(that.reception_man===""){
          that.reception_man=undefined
        }
          that.$axios({
            url: that.url + "/v1/task/room_service/get_delivery_list/",
            method: "get",
            params:{
              room_no:that.reception_room ,
              plan_start_time:that.reception_data ,
              complete_user_name:that.reception_man,
              status: 5,
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                let receive_arr = [];
                that.activeName2 = 'third'
                let create_datetime, create_time;
                receive_arr = res.data.data.results
                that.receive_total = res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.receive_list = [];
                /**循环改变所有待送物的good_list 数据结构*/
                for (let i = 0; i < receive_arr.length; i++) {
                  receive_arr[i].goods_list = JSON.parse(receive_arr[i].goods_list);
                  create_datetime = receive_arr[i].create_datetime.split('T');
                  create_time = create_datetime[1].split('.');
                  receive_arr[i].create_datetime = create_datetime[0] + "-" + create_time[0];
                }
                that.receive_list = receive_arr;
              }
              else {
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

      },
      //点击已完成
      achieve_filtrate() {
        let that = this;
        if(that.achieve_room===''){
          that.achieve_room=undefined
        }else if(that.achieve_time===""){
          that.achieve_time=undefined
        }else if(that.achieve_man===""){
          that.achieve_man=undefined
        }
          that.$axios({
            url: that.url + "/v1/task/room_service/get_delivery_list/",
            method: "get",
            params:{
              room_no:that.achieve_room ,
              plan_start_time:that.achieve_time ,
              complete_user_name:that.achieve_man,
              status: 10
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.activeName2 = 'routing'
                let had_arr = [];//已完成
                let create_datetime, create_time;
                had_arr = res.data.data.results
                that.had_total = res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.had_done = [];
                /**循环改变所有已完成good_list 数据结构*/
                for (let i = 0; i < had_arr.length; i++) {
                  had_arr[i].goods_list = JSON.parse(had_arr[i].goods_list);
                  // create_datetime = had_arr[i].done_time.split('T');
                  // create_time = create_datetime[1].split('.');
                  // had_arr[i].done_time = create_datetime[0]+"-"+create_time[0];
                }
                that.had_done = had_arr;
              }
              else {
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });
      },
      //点击删除
      delete_filtrate() {
        let that = this;
          that.$axios({
            url: that.url + "/v1/task/room_service/get_delivery_list/",
            method: "get",
            params:{
                  room_no:that.achieve_room ,
                  plan_start_time:that.achieve_time ,
                  complete_user_name: that.achieve_man,
                  status: 20,
            }
          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res);
                that.activeName2 = 'delete'
                let create_datetime, create_time;
                let delete_arr = [];//已删除
                delete_arr = res.data.data.results
                that.delete_total = res.data.data.count;
                //push 的时候要先清空数组，保证这个是一个空的数组
                that.delete_list = [];
                /**循环改变所有已删除good_list 数据结构*/
                for (let i = 0; i < delete_arr.length; i++) {
                  for (let i = 0; i < delete_arr.length; i++) {
                    delete_arr[i].goods_list = JSON.parse(delete_arr[i].goods_list);

                  }
                }
                that.delete_list = delete_arr;
              }
              else {
                console.log(res.data.data.message);
              }
            })
            .catch(error => {
              console.log(error);
            });

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
  .person {
    width: 97%;
    height: 100%;
    .title {
      width: 100%;
      height: 100%;
      background: white;
      padding-top: 16px;
      .grabble {
        div {
          display: inline-block;
        }
        button {
          width: 80px;
          height: 24px;
          background: rgba(68, 136, 233, 1);
          border: none;
          border-radius: 4px;
          color: white;
          margin-left: 20px;
        }
      }
      .dialog_style {
        /*overflow: hidden;*/
        margin-left: 20px;
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
  }
</style>




