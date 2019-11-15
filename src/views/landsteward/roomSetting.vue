<template>
  <!--场地设置-->
  <div class="site-all">
    <div class="code-top">
      <i class="el-icon-setting"></i>
      <label>房设置</label>
    </div>
    <div class="tab">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="楼栋设置" name="first">
          <button class="setbtn" @click="dialogVisibleLd = true;flush()">新增</button>
          <el-table
            :data="tableDataBuilding"
            size="mini"
            :cell-style="cellStyle"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="code"
              label="代码"
              width="140">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="address"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="dialogVisibleLd =true; EditeInfoLd(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteLd(scope.$index, scope.row,tableDataBuilding)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeLd"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="楼层设置" name="second">
          <button class="setbtn" @click="dialogVisibleLc = true; flush()">新增</button>
          <el-table
            :data="tableDataRoomFloor"
            size="mini"
            :cell-style="cellStyle"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="code"
              label="代码"
              width="140">
            </el-table-column>
            <el-table-column
              prop="building_name"
              label="楼栋">
            </el-table-column>
            <el-table-column
              prop="zone"
              label="区域">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="dialogVisibleLc =true; EditeInfoLc(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteLc(scope.$index, scope.row,tableDataRoomFloor)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeLc"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="房型设置" name="third">
          <button class="setbtn" @click="dialogVisibleFx = true; flush();room_type_img=''">新增</button>
          <el-table
            :data="tableDataRoomSet"
            size="mini"
            :cell-style="cellStyle"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="code"
              label="代码"
              width="140">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="area"
              label="面积">
            </el-table-column>
            <el-table-column
              prop="bed_num"
              label="床数">
            </el-table-column>
            <el-table-column
              prop="bed_type"
              label="床型">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_hour_room"
              label="是否钟点房">
              <template slot-scope="scope">
                <span v-if="scope.row.is_hour_room === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_overbooking"
              label="是否允许超预定">
              <template slot-scope="scope">
                <span v-if="scope.row.is_overbooking === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_selfmachine_use"
              label="是否只对自助机可见">
              <template slot-scope="scope">
                <span v-if="scope.row.is_selfmachine_use === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="list_order"
              label="排序">
            </el-table-column>
            <el-table-column
              prop="max_checkin_num"
              label="最大入住人数">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="dialogVisibleFx = true; EditeInfoFx(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteFx(scope.$index, scope.row,tableDataRoomSet)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeFx"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="房类设置" name="fourth">
          <button class="setbtn" @click="dialogVisibleFl = true; flush()">新增</button>
          <el-table
            :data="tableDataRoomType"
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="code"
              label="代码"
              width="140">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="room_class_name"
              label="房类">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="option"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="dialogVisibleFl = true; EditeInfoFl(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteFl(scope.$index, scope.row,tableDataRoomType)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeFl"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="房间特征" name="fifth">
          <button class="setbtn" @click="dialogVisibleTrait = true; flush()">新增</button>
          <el-table
            :data="tableDataRoomTrait"
            size="mini"
            :cell-style="cellStyle"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="code"
              label="代码"
              width="140">
            </el-table-column>
            <el-table-column
              prop="descript"
              label="描述">
            </el-table-column>
            <el-table-column
              prop="descript_en"
              label="英文描述">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="option"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="dialogVisibleTrait = true; EditeInfoTrait(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handDeleteTrait(scope.$index, scope.row,tableDataRoomTrait)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeTrite"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="房间设置" name="six">
          <button class="setbtn" @click="dialogVisibleRoomNum = true; flush()">新增</button>
          <button class="setbtn" @click="dialogVisibleRoomNum_batch = true; flush()">批量新增</button>
          <el-table
            :data="tableDataRoomNum"
            size="mini"
            :cell-style="cellStyle"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="room_no"
              label="房号">
            </el-table-column>
            <el-table-column
              prop="room_type"
              label="房型名称">
            </el-table-column>
            <el-table-column
              prop="floor_number"
              label="楼层">
            </el-table-column>
            <el-table-column
              prop="building_name"
              label="楼栋中文名称">
            </el-table-column>
            <el-table-column
              prop="room_class_name"
              label="房类名称">
            </el-table-column>
            <el-table-column
              prop="room_state"
              label="房间状态">
            </el-table-column>
            <el-table-column
              prop="room_phone_short"
              label="客房座机短号">
            </el-table-column>
            <el-table-column
              prop="self_machine_can_sale"
              label="自助机可用状态">
              <template slot-scope="scope">
                <span v-if="scope.row.self_machine_can_sale === 0">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="option"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="dialogVisibleRoomNum = true; EditeInfoRoomNum(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handDeleteRoomNum(scope.$index, scope.row,tableDataRoomNum)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeRoomNum"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <!--<el-tab-pane label="床型设置" name="seven">
          <button class="setbtn" @click="dialogVisiblecx = true; handleAdd()">新增</button>
          <el-table
            :data="tableDatacx"
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="code"
              label="床名称">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="使用床单种类">
            </el-table-column>
            <el-table-column
              prop="desc_en"
              label="使用被罩种类">
            </el-table-column>
            <el-table-column
              prop="color"
              label="垫背种类">
            </el-table-column>
            <el-table-column
              prop="被子种类"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="枕头数量"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              prop="address"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="dialogVisibleFt =true; addAndUpdate = false; handleEdit(scope.row)">编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteFt(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>-->
        <!-- 房态设置 -->
        <el-tab-pane label="房态设置" name="eight">
          <button class="setbtn" @click="dialogVisibleFt = true; handleAdd()">新增</button>
          <el-table
            :data="tableDataStatus"
            size="mini"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#303A41',color:'white',textAlign:'center'}"
            style="width: 100%;margin-top: 10px">
            <el-table-column
              type="index"
              label="编号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="code"
              label="房间状态"
              width="140">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="说明"
              width="140">
            </el-table-column>
            <el-table-column
              prop="desc_en"
              label="英文说明"
              width="170">
            </el-table-column>
            <el-table-column
              prop="color"
              label="显示颜色">
            </el-table-column>
            <el-table-column
              prop="is_halt"
              label="是否停用">
              <template slot-scope="scope">
                <span v-if="scope.row.is_halt === 1">是</span>
                <span v-else>否</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="remark"
              label="备注"
              width="140">
            </el-table-column>
            <el-table-column
              prop="modify_user"
              label="更新者">
            </el-table-column>
            <el-table-column
              prop="modify_datetime"
              label="更新时间"
              width="170">
              <template slot-scope="scope">
                <span>{{scope.row.modify_datetime.split('T')[0]}} {{scope.row.modify_datetime.split('T')[1].split('.')[0]}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column
              fixed="right"
              prop="address"
              label="操作"
              width="150">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDeleteFt(scope.row)">删除
                </el-button>
              </template>
            </el-table-column>-->
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeFt"
            :current-page="currentPage"
            :page-size="pagesize"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--楼栋dialog-->
    <el-dialog
      title="楼栋设置"
      :visible.sync="dialogVisibleLd"
      width="50%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <ul>
        <li><span>*代码:</span><input v-model="param.code" :disabled="flag_dis" maxlength="9"/></li>
        <li><span>*描述:</span><input v-model="param.descript"/></li>
        <li><span>*英文描述:</span><input v-model="param.descript_en"/></li>
        <li><span>父节点:</span><input v-model="param.parent_code"/></li>
        <li>
          <span>*是否停用:</span>
          <el-radio v-model="is_halt" label='1'>是</el-radio>
          <el-radio v-model="is_halt" label='0'>否</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleLd = false">取 消</button>
        <button type="primary" @click="saveInfoLd">确 定</button>
        </span>
    </el-dialog>
    <!--楼层dialog-->
    <el-dialog
      title="楼层设置"
      :visible.sync="dialogVisibleLc"
      width="50%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <ul>
        <li><span>*代码:</span><input v-model="param.code" :disabled="flag_dis" maxlength="9" type="number"/></li>
        <li><span>*描述:</span><input v-model="param.descript"/></li>
        <li><span>*英文描述:</span><input v-model="param.descript_en"/></li>
        <li><span>*区域:</span><input v-model="param.zone"/></li>
        <li>
          <span>*楼栋:</span>
          <el-select v-model="param.building_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
        </li>
        <!--<li><span>图片:</span><input v-model="param.picture"/></li>-->
        <li>
          <span>*是否停用:</span>
          <el-radio v-model="is_halt" label='1'>是</el-radio>
          <el-radio v-model="is_halt" label='0'>否</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleLc = false">取 消</button>
        <button type="primary" @click="saveInfoLc">确 定</button>
        </span>
    </el-dialog>
    <!--房型dialog-->
    <el-dialog
      title="房型设置"
      :visible.sync="dialogVisibleFx"
      width="60%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <el-container>
        <el-aside width="400px" style="background: white">
          <ul>
            <li>
              <span>*代码:</span>
              <input v-model="param.code" :disabled="flag_dis" maxlength="9"/>
            </li>
            <li>
              <span>*描述:</span>
              <input v-model="param.descript"/></li>
            <li>
              <span>*英文描述:</span>
              <input v-model="param.descript_en"/></li>
            <li>
              <span>最大入住数:</span>
              <input v-model="param.max_checkin_num" type="number"/>
            </li>
            <li>
              <span>面积:</span>
              <input v-model="param.area"/>
            </li>
            <li>
              <span>床数:</span>
              <input v-model="param.bed_num" type="number"/>
            </li>
            <li>
              <span>超预定数量:</span>
              <input v-model="param.overbokking_number" type="number"/>
            </li>
            <li>
              <span>床型:</span>
              <input v-model="param.bed_type"/>
            </li>
          </ul>
        </el-aside>
        <el-main style="padding: 0">
          <ul>
            <li >
              <el-upload
                class="avatar-uploader"
                action="https://image.eloadspider.com/resource/room_type/picture/upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="room_type_img" :src="room_type_img" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" style="font-size: 14px;width: 240px;height: 140px;">添加房型图</i>
              </el-upload>
            </li>
            <li>
              <span>*是否查房:</span>
              <el-radio v-model="is_check_room" label='1'>是</el-radio>
              <el-radio v-model="is_check_room" label='0'>否</el-radio>
            </li>
            <li>
              <span>*是否停用:</span>
              <el-radio v-model="is_halt" label='1'>是</el-radio>
              <el-radio v-model="is_halt" label='0'>否</el-radio>
            </li>
            <li>
              <span>*是否自助机可见:</span>
              <el-radio v-model="is_selfmachine_use" label='1'>是</el-radio>
              <el-radio v-model="is_selfmachine_use" label='0'>否</el-radio>
            </li>
            <li>
              <span>*是否允许超预定:</span>
              <el-radio v-model="is_overbooking" label='1'>是</el-radio>
              <el-radio v-model="is_overbooking" label='0'>否</el-radio>
            </li>
            <li>
              <span>*是否是钟点房:</span>
              <el-radio v-model="is_hour_room" label='1'>是</el-radio>
              <el-radio v-model="is_hour_room" label='0'>否</el-radio>
            </li>
            <li>

              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </li>
          </ul>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleFx = false">取 消</button>
        <button type="primary" @click="saveInfoFx">确 定</button>
        </span>
    </el-dialog>
    <!--房类dialog-->
    <el-dialog
      title="房类设置"
      :visible.sync="dialogVisibleFl"
      width="50%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <ul>
        <li><span>*代码:</span><input v-model="param.code" :disabled="flag_dis" maxlength="9"/></li>
        <li><span>*描述:</span><input v-model="param.descript"/></li>
        <li><span>*英文描述:</span><input v-model="param.descript_en"/></li>
        <li>
          <span>*是否停用:</span>
          <el-radio v-model="is_halt" label='1'>是</el-radio>
          <el-radio v-model="is_halt" label='0'>否</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleFl = false">取 消</button>
        <button type="primary" @click="saveInfoFl">确 定</button>
        </span>
    </el-dialog>
    <!--房间特征dialog-->
    <el-dialog
      title="房间特征设置"
      :visible.sync="dialogVisibleTrait"
      width="50%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <ul>
        <li><span>*代码:</span><input v-model="param.code" :disabled="flag_dis" maxlength="9"/></li>
        <li><span>*描述:</span><input v-model="param.descript"/></li>
        <li><span>*英文描述:</span><input v-model="param.descript_en"/></li>
        <li>
          <span>*是否停用:</span>
          <el-radio v-model="is_halt" label='1'>是</el-radio>
          <el-radio v-model="is_halt" label='0'>否</el-radio>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
        <button @click="dialogVisibleTrait = false">取 消</button>
        <button type="primary" @click="saveInfoTrait">确 定</button>
        </span>
    </el-dialog>
    <!--房间号dialog-->
    <el-dialog
      title="房号设置"
      :visible.sync="dialogVisibleRoomNum"
      width="50%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <ul>
        <li><span>*所属房型:</span>
          <el-select v-model="param.room_type_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options_room_type_name"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
          <span>*房间号:</span><input v-model="param.room_no"/>
        </li>
        <li>
          <span>*楼层:</span>
          <el-select v-model="param.floor_number" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options_floor_number"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
          <span>客房座机长号:</span><input v-model="param.room_phone"/>
        </li>
        <li><span>*房间特征:</span>
          <el-select v-model="param.feature_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px" multiple
                     collapse-tags>
            <el-option
              v-for="item in options_feature_name"
              :key="item.code"
              :label="item.descript"
              :value="item.id">
            </el-option>
          </el-select>
          <span>客房座机短号:</span><input v-model="param.room_phone_short"/>
        </li>
        <li>
          <span>*楼栋:</span>
          <el-select v-model="param.building_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
          <span>*是否停用:</span>
          <el-radio v-model="is_halt" label='1'>是</el-radio>
          <el-radio v-model="is_halt" label='0'>否</el-radio>
        </li>
        <li>
          <span>*房类名称:</span>
          <el-select v-model="param.room_class_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options_room_class_name"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
      <button @click="dialogVisibleRoomNum = false">取 消</button>
      <button type="primary" @click="saveInfoRoomNum">确 定</button>
    </span>
    </el-dialog>
    <!--批量新增房间号-->
    <el-dialog
      title="批量新增房号设置"
      :visible.sync="dialogVisibleRoomNum_batch"
      width="50%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <ul>
        <li><span>*所属房型:</span>
          <el-select v-model="param.room_type_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options_room_type_name"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
          <span>新增房间数:</span><input type="number" v-model="param.number_rooms"/>
        </li>
        <li>
          <span>*楼层:</span>
          <el-select v-model="param.floor_number" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options_floor_number"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
          <span>排除的房间号:</span><input v-model="param.extral_end" placeholder="4,13" disabled/>
        </li>
        <li><span>*房间特征:</span>
          <el-select v-model="param.feature_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px" multiple
                     collapse-tags>
            <el-option
              v-for="item in options_feature_name"
              :key="item.code"
              :label="item.descript"
              :value="item.id">
            </el-option>
          </el-select>
          <span>起始房间号:</span><input type="number" v-model="param.start_no"/>
        </li>
        <li>
          <span>*楼栋:</span>
          <el-select v-model="param.building_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
          <span>前缀:</span><input v-model="param.start_info"/>
        </li>
        <li>
          <span>*房类名称:</span>
          <el-select v-model="param.room_class_name" @change="change()" placeholder="请选择" size="mini"
                     style="margin-left: 6px">
            <el-option
              v-for="item in options_room_class_name"
              :key="item.code"
              :label="item.descript"
              :value="item.code">
            </el-option>
          </el-select>
        </li>
        <li>

          <!--<span>*是否停用:</span>
          <el-radio v-model="is_halt" label='1'>是</el-radio>
          <el-radio v-model="is_halt" label='0'>否</el-radio>-->
        </li>
        <li>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
      <button @click="dialogVisibleRoomNum_batch = false">取 消</button>
      <button type="primary" @click="saveInfoRoomNum_batch">确 定</button>
    </span>
    </el-dialog>
    <!--房态dialog-->
    <el-dialog
      :title="statusTitle"
      :visible.sync="dialogVisibleFt"
      width="50%"
      :close-on-click-modal = 'false'
      class="dialog-style">
      <ul>
        <li><span>*房间状态:</span><input v-model="ft_param.code" maxlength="3"/><span>*说明:</span><input
          v-model="ft_param.desc"/></li>
        <li><span>*英文说明:</span><input v-model="ft_param.desc_en"/><span>*显示颜色:</span><input v-model="ft_param.color"/>
        </li>
        <li><span>*是否停用:</span>
          <el-radio v-model="ft_is_halt" label='1'>是</el-radio>
          <el-radio v-model="ft_is_halt" label='0'>否</el-radio>
        </li>
        <li>
          <span>备注:</span>
          <input v-model="ft_param.remark" maxlength="100"/>
        </li>
      </ul>
      <span slot="footer" class="dialog-footer">
          <button @click="dialogVisibleFt = false">取 消</button>
          <button type="primary" @click="saveInfoStatus">确 定</button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import util from '../../common/util.js'
  export default {
    name: "RoomSet",
    data() {
      return {
        //文件上传
        imageUrl: '',
        statusTitle: '', //房态标题
        fileList2: [],
        dialogImageUrl: '',
        dialogVisible: false,
        //提示信息
        hint: '删除成功！',
        //分页
        currentPage: 1,
        currentPageLd : 1,
        currentPageLc : 1,
        currentPageFx : 1,
        currentPageFl : 1,
        currentPageTrite : 1,
        currentPageRoomNum : 1,
        currentPageFt : 1,
        pagesize: 15,
        total: 0,
        authorization: '',
        url: this.api.api_price_9101 + '/v1/',
        //dialog的隐藏于显示
        dialogVisibleLd: false, //楼栋的dialog
        dialogVisibleLc: false,//楼层的dialog
        dialogVisibleFx: false,//房型的dialog
        dialogVisibleFl: false,//房类的dialog
        dialogVisibleTrait: false,//房间特征dialog
        dialogVisibleRoomNum: false,//房间号dialog
        dialogVisibleRoomNum_batch : false,//批量新增房间号
        dialogVisibleFt: false,//房态dialog //添加和更新dislog
        addAndUpdate: true,//判断增加或修改标记
        maskShow: false,
        //新增房型遮罩层控制
        maskShowaddroomtype: false,
        //新增房间遮罩层控制
        maskShowaddroom: false,
        // 是否显示房间房型设置
        activeName: 'first',
        // 搜索房间号
        SearchNum: '',
        //楼栋设置
        tableDataBuilding: [],
        //楼层设置
        tableDataRoomFloor: [],
        //房型设置
        tableDataRoomSet: [],
        room_type_img:'',//房型图片
        //房间分类
        tableDataRoomType: [],
        //房间特征
        tableDataRoomTrait: [],
        //房间信息（房号）
        tableDataRoomNum: [],
        //房间特征与房间信息
        tableDataRoomTraAndNum: [],
        //床型设置
        tableDatacx: [],
        //房态信息
        tableDataStatus: [],
        //控制遮罩层的开启与关闭
        flagopenwin: '',
        //下拉框
        options: [],
        options_feature_name: [],
        options_room_type_name: [],
        options_floor_number: [],
        options_room_class_name: [],
        //新增需要的字段
        param: {},
        ft_param: {},
        //编辑操作的Id
        comEdite: {},
        //是否是编辑 true;编辑 false：新增
        isEdite: true,
        //文件数据
        fileList: [],
        isConfirm: true,
        //当前页码
        curr_page : 1,
        //判断是否为可编辑状态
        flag_dis : false,
        is_halt : '0',//是否停用
        is_hour_room: '1', //是否钟点房
        is_overbooking: '1', //是否允许超预定
        is_selfmachine_use: '1', //是否只对自助机可见
        is_check_room: '1', //是否查房
        ft_is_halt  : ''
      }
    },
    /**
     * 默认加载的是第一个tab的数据
     */
    created: function () {
      let that = this;
      that.update_ld();
    },
    mounted() {
      // this.getAuthorization()//调用获取授权
    },
    methods: {
      /**
       * @cellStyle 将表格的所有信息居中
       */
      cellStyle(row, column, rowIndex, columnIndex) {
        return 'text-align:center';
      },
      /**
       * @handleAvatarSuccess
       */
      /*handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.info("This is file");
        console.log(file);
      },
      handleError(err, file) {
        console.info(err,file);
        this.fileList = [];
      },
      handleSuccess(res, file) {
        console.info(res,file);
        this.fileList = [];
      },
      handleExceed(files, fileList) {},
      async handleChange() {
        const isSubmit = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return false
        }).catch(() => {
          return true
        });
        if (isSubmit) {
          this.$refs.upload.submit()
        } else {
          this.fileList = []
        }
      },*/
      /**
       * @change 强制刷新render
       */
      change() {
        this.$forceUpdate();
      },
      /**
       * @flush 初始化数据 给数据制空的操作
       * @param no
       */
      flush() {
        let that = this;
        that.isEdite = false;
        that.flag_dis = false;
        //当用户点击
        if (that.flagopenwin === 'second') {
          that.selectBuildName();
        } else if (that.flagopenwin === 'six') {
          that.select_floor();
          that.selectroom_type_name();
          that.selectFeature();
          that.selectRoom_class_name();
          that.selectBuildName();
        }
        that.is_halt = '0',//是否停用
        that.param = {
          code: '', //代码
          code_name: '',//代码名称
          create_user: '',  // 创建者
          descript: '', //描述
          descript_en: '', //英文描述
          hotel_group_id: '1939', //酒店ID
          hotel_id: '1939', //
          modify_user: '', //更新者
          building_name: '', //楼栋中文名称
          parent_code: '',  //父节点
          create_datetime: '',  //创建时间
          modify_date: '',  //更新日期
          area: '',  //面积
          bed_type: '',  //床型
          picture: '', //图片
          room_type_name: '',  //房型中文名称
          room_type_name_en: '', //房型英文名称
          short_name: '', //房型英文缩写
          tag: '',       //房类名称
          feature: '',  //房间特征
          feature_en: '', //房间特征英文
          room_phone_short: '', //房间座机短号
          room_phone: '',  //房间座机长号
          room_number_guest_en: '',//对客门牌号英文
          room_number_inner_en: '',//对内门牌号英文
          room_number_inner: '', //对内门牌号
          room_number_guest: '', //对客门牌号
          room_no: '',  //房间号
          room_class_name: '', //房类名称
          bed_num: 1,  //床数
          list_order: 100, //排序
          max_checkin_num: 1, //最大入住人数
          overbokking_number: 1, //超预定数量
          floor_number: '', //楼层
          self_machine_can_sale: '1', //自助机可用状态
          room_num_state: 1, //房间状态
          is_hour_room: '1', //是否钟点房
          is_overbooking: '1', //是否允许超预定
          is_selfmachine_use: '1', //是否只对自助机可见
          is_halt: '0',  //是否停用
          number: 1,//楼层
          room_number_id: 1001,//房间号
          feature_name: [],//房间特征名称
          is_check_room: '1', //是否查房
          zone : '',//
          start_no : 1,//起始房间号
          number_rooms : 1,//新增房间数
          start_info : '',//前缀
          extral_end : '',//排除的房间号
        }
      },
      /**
       *@selectBuildName 选择楼栋的操作 options（select）
       * @param no
       */
      selectBuildName: function () {
        let that = this;
        //let url = that.url+'/room/get_room_building_list_tree/';
        let url = that.url + 'room/room_status/get_room_building_list/';
        that.$axios({
          method: 'get',
          url: url
        }).then(function (res) {
          that.options = res.data.data.results;
          console.info(res);
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @selectRoom_class_name 选择房类的操作 options（select）
       * @param no
       */
      selectRoom_class_name: function () {
        let that = this;
        //let url = that.url +'/room/get_roomclass_list_tree/';
        let url =that.url + 'room/room_status/get_room_class_list/';
        that.$axios({
          method: 'get',
          url: url
        }).then(function (res) {
          that.options_room_class_name = res.data.data.results;
          console.info(res);
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @selectfloor 选择楼层的操作
       */
      select_floor() {
        let that = this;
        //let url = that.url+'/room/get_roomfloor_list_tree/';
        let url =that.url + 'room/room_status/get_room_floor_list/';
        that.$axios({
          method: 'get',
          url: url
        }).then(function (res) {
          that.options_floor_number = res.data.data.results;
          console.info(res);
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @selectroom_type_name 选择房型的操作
       */
      selectroom_type_name: function () {
        let that = this;
        //let url = that.url+'/room/get_roomtype_list_tree/';
        let url =that.url + 'room/room_status/get_room_type_list/';
        that.$axios({
          method: 'get',
          url: url
        }).then(function (res) {
          that.options_room_type_name = res.data.data.results;
          console.info(res);
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @selectFeature 选择房间特征的操作 options （select）
       * @param no
       */
      selectFeature: function () {
        let that = this;
        //let url = that.url+'/room/get_roomfeatures_list_tree/';
        let url = that.url + 'room/room_status/get_room_features_list/';
        that.$axios({
          method: 'get',
          url: url
        }).then(function (res) {
          that.options_feature_name = res.data.data.results;
          console.info(res.data);
        }).catch(function (err) {
          console.info(err);
        })
      },
      //=========================更新操作后的数据===================
      update_ld() {
        let that = this;
        let url = that.url + 'room/room_status/get_room_building_list/';
        //let url = that.url+'room/room/get_room_building_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: that.currentPageLd,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res);
          that.total = res.data.data.count;
          that.tableDataBuilding = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      update_lc() {
        let that = this;
        let url = that.url + 'room/room_status/get_room_floor_list/';
        //let url = that.url+'/room/get_roomfloor_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: that.currentPageLc,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res);
          that.tableDataRoomFloor = res.data.data.results;
          that.total = res.data.data.count;
        }).catch(function (err) {
          console.info(err);
        })
      },
      update_fx() {
        let that = this;
        let url = that.url + 'room/room_status/get_room_type_list/';
        //let url = that.url+'/room/get_roomtype_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: that.currentPageFx,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res);
          that.tableDataRoomSet = res.data.data.results;
          that.total = res.data.data.count;
        }).catch(function (err) {
          console.info(err);
        })
      },
      update_fl() {
        let that = this;
        let url = that.url + 'room/room_status/get_room_class_list/';
        //let url = that.url+'/room/get_roomclass_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: that.currentPageFl,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res);
          that.tableDataRoomType = res.data.data.results;
          that.total = res.data.data.count;
        }).catch(function (err) {
          console.info(err);
        })
      },
      update_fjtz() {
        let that = this;
        let url = that.url + 'room/room_status/get_room_features_list/';
        //let url = that.url+'/room/get_roomfeatures_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: that.currentPageTrite,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res);
          that.tableDataRoomTrait = res.data.data.results;
          that.total = res.data.data.count;
        }).catch(function (err) {
          console.info(err);
        })
      },
      update_fjsz() {
        let that = this;
        let url = that.url + 'room/room_status/get_room_map_list/';//获取到所有的房间
        //let url = that.url+'/room/get_roomnumber_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: that.currentPageRoomNum,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res);
          that.tableDataRoomNum = res.data.data.results;
          that.total = res.data.data.count;
        }).catch(function (err) {
          console.info(err);
        })
      },
      //床型
      update_cx() {
        let that = this;
        //请求床型的接口

      },
      update_ft() {
        let that = this;
        let url = that.url + 'room/room_status/get_code_room_state_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            //page: that.currentPageFt, //目前先不做房态的分页，第一是数据量比较小，第二是没有房态的分页操作。
            page_size: 15,
          },
        }).then(function (res) {
          console.info(res);
          that.tableDataStatus = res.data.data.results;
          that.total = res.data.data.count;
        }).catch(function (err) {
          console.error(err);
        })
      },


      /**
       * @handleClick tab切换的事件
       * @param tab  可以根据tab.name判断用户点击的是哪一个tab 进而得到相应的数据
       * @param event 该tab的所有事件
       */
      handleClick(tab, event) {
        let that = this;
        //楼栋信息
        if (tab.name === 'first') {
          that.flagopenwin = tab.name;
          that.update_ld();//楼栋
          console.log(tab.name);
        } else if (tab.name === 'second') {
          that.flagopenwin = tab.name;
          that.update_lc();//楼层
        } else if (tab.name === 'third') {
          that.flagopenwin = tab.name;
          that.update_fx();//房型
        } else if (tab.name === 'fourth') {
          that.flagopenwin = tab.name;
          that.update_fl();//房类设置
        } else if (tab.name === 'fifth') {
          that.flagopenwin = tab.name;
          that.update_fjtz();//房间特征
        } else if (tab.name === 'six') {
          that.flagopenwin = tab.name;
          that.update_fjsz();//房间设置
        } else if (tab.name === 'seven') {
          that.flagopenwin = tab.name;
          //床型设置
          that.update_cx();//床型
          console.info("该选项暂未开放！");
          //房态设置
        } else {
          that.flagopenwin = tab.name;
          that.update_ft();//房态
        }
      },
      /**
       * 该函数只做隐藏的操作，不做显示的操作，原因是每一个页面的隐藏都是需要将遮罩层取消的。
       * @SetMaskFalseShow 控制遮罩层隐藏，根据flagopenwin来判断当前是属于哪一个页面的关闭
       * @param no
       */
      SetMaskFalseShow: function () {
        let that = this;
        that.maskShow = false;
        if (that.flagopenwin === 'first') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'second') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'third') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'fourth') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'fifth') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'six') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'seven') {
          console.info('当前点击的是' + that.flagopenwin);
        } else {
          console.info('当前点击的是' + that.flagopenwin);
        }
      },
      //==================分页操作===============================
      /**
       * 分页-楼栋的分页
       * @handleSizeChange 控制每页显示多少条数据的函数 当前该功能未开放
       * @handleCurrentChangeLd 控制当前的页数
       * @param currentPage 当前的页码
       */
      handleSizeChange: function (size) {
        /*this.pagesize = size;
        console.info(size)*/
      },
      handleCurrentChangeLd: function (currentPage) {
        console.info(currentPage);
        let that = this;
        that.currentPageLd = currentPage;//将当前的页码给到操作的页码，这样操作以后的页码才是正确的。
        //let url = that.url + '/room/get_room_building_list/';
        let url = that.url + 'room/room_status/get_room_building_list/'
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res.data.data.count);
          that.tableDataBuilding = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @handleCurrentChangeLc 楼层的分页
       */
      handleCurrentChangeLc: function (currentPage) {
        console.info(currentPage);
        let that = this;
        that.currentPageLc = currentPage;
        let url = that.url + 'room/room_status/get_roomfloor_list/';
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res.data.data.results);
          that.tableDataRoomFloor = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @handleCurrentChangeFx 房型的分页
       */
      handleCurrentChangeFx: function (currentPage) {
        console.info(currentPage);
        let that = this;
        that.currentPageFx = currentPage;
        let url = that.url + 'room/room_status/get_roomtype_list/';
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res.data.data.results);
          that.tableDataRoomSet = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @handleCurrentChangeFl 房间分类的分页
       */
      handleCurrentChangeFl: function (currentPage) {
        console.info(currentPage);
        let that = this;
        that.currentPageFl = currentPage;
        let url = that.url + 'room/room_status/get_roomclass_list/';
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res.data.data.results);
          that.tableDataRoomType = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @handleCurrentChangeTrite 房间特征的分页
       */
      handleCurrentChangeTrite: function (currentPage) {
        console.info(currentPage);
        let that = this;
        that.currentPageTrite = currentPage;
        let url = that.url + 'room/room_status/get_roomfeatures_list/';
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res.data.data.results);
          that.tableDataRoomTrait = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      /**
       * @handleCurrentChangeRoomNum 房间号（房间信息）的分页
       */
      handleCurrentChangeRoomNum: function (currentPage) {
        console.info(currentPage);
        let that = this;
        that.currentPageRoomNum = currentPage;
        //let url = that.url + '/room/get_roomnumber_list/';
        let url = that.url + 'room/room_status/get_room_map_list/'
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 15
          }
        }).then(function (res) {
          console.info(res.data.data.results);
          that.tableDataRoomNum = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      //===================删除操作==============================
      /**
       * 删除操作-楼栋
       * @handleDeleteLd 删除楼栋的操作
       * @param index 当前的行数
       * @param row 当前行的数据  为了拿到id 进行删除
       * @param TableData 当前被渲染的表格
       */
      handleDeleteLd: function (index, row, TableData) {
        let that = this;
        //let url = that.url + '/room/remove_room_building/' + row.id + '/';
        let url = that.url + 'room/room_status/remove_room_building/' + row.id + '/';;
        that.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            method: 'post',
            url: url
          }).then(function (res) {
            if (res.data.message === 'success') {
              that.hintInfo('success', '删除成功');
              TableData.splice(index, 1);
              that.update_ld();
            } else {
              that.hintInfo('warning', res.data.message);
            }
          }).catch(function (err) {
            console.info(err);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        console.info(index, row.id);
      },
      /**
       * 删除操作-楼层
       * @handleDeleteLc 楼层的删除
       * @param index 当前的行数
       * @param row 当前行的数据
       * @param TableData 当前被渲染的表格  为了做假删除
       */
      handleDeleteLc: function (index, row, TableData) {
        let that = this;
        let url =that.url + 'room/room_status/remove_room_floor/' + row.id + '/';
        that.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            method: 'post',
            url: url
          }).then(function (res) {
            console.info(res);
            if (res.data.message === 'success') {
              that.hintInfo('success', '删除成功');
              TableData.splice(index, 1);
              that.update_lc();
            } else {
              that.hintInfo('warning', res.data.message);
            }
          }).catch(function (err) {
            console.info(err);
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        //let url = that.url + '/room/remove_roomfloor/' + row.id + '/';

        console.info(index, row.id);
      },
      /**
       * 删除操作-房型
       * @handleDeleteFx 房型的删除
       * @param index 当前的行数
       * @param row 当前行的数据
       * @param TableData 当前被渲染的表格
       */
      handleDeleteFx: function (index, row, TableData) {
        let that = this;
        //let url = that.url + '/room/remove_roomtype/' + row.id + '/';
        let url =that.url + 'room/room_status/remove_room_type/' + row.id + '/';
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            method: 'post',
            url: url
          }).then(function (res) {
            console.info(res);
            if (res.data.message === 'success') {
              that.hintInfo('success', '删除成功');
              TableData.splice(index, 1);
              that.update_fx();
            } else {
              that.hintInfo('warning', res.data.message);
            }
          }).catch(function (err) {
            console.info(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        console.info(index, row.id);
      },
      /**
       * 删除操作-房类
       * @handleDeleteFl 房型的删除
       * @param index 当前的行数
       * @param row 当前行的数据
       * @param TableData 当前被渲染的表格
       */
      handleDeleteFl: function (index, row, TableData) {
        let that = this;
        //let url = that.url + '/room/remove_roomclass/' + row.id + '/';
        let url = that.url + 'room/room_status/remove_room_class/' + row.id + '/'
        this.$confirm('此操作将永久删除该数据，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            method: 'post',
            url: url
          }).then(function (res) {
            console.info(res);
            if (res.data.message === 'success') {
              that.hintInfo('success', '删除成功');
              TableData.splice(index, 1);
              that.update_fl();
            } else {
              that.hintInfo('warning', res.data.message);
            }
          }).catch(function (err) {
            console.info(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        console.info(index, row.id);
      },
      /**
       * 删除操作-房间特征
       * @handleDeleteFl 房类的删除
       * @param index 当前的行数
       * @param row 当前行的数据
       * @param TableData 当前被渲染的表格
       */
      handDeleteTrait: function (index, row, TableData) {
        let that = this;
        //let url = that.url + '/room/remove_roomfeatures/' + row.id + '/';
        let url = that.url + 'room/room_status/remove_room_features/' + row.id + '/';
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            method: 'post',
            url: url
          }).then(function (res) {
            console.info(res);
            if (res.data.message === 'success') {
              that.hintInfo('success', '删除成功');
              TableData.splice(index, 1);
              that.update_fjtz();
            } else {
              that.hintInfo('warning', res.data.message);
            }
          }).catch(function (err) {
            console.info(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.info(index, row.id);
      },
      /**
       * 删除操作-房间号
       * @handleDeleteFl 房间号的删除
       * @param index 当前的行数
       * @param row 当前行的数据
       * @param TableData 当前被渲染的表格
       */
      handDeleteRoomNum: function (index, row, TableData) {
        let that = this;
        //let url = that.url + '/room/remove_roomnumber/' + row.id + '/';
        let url = that.url + 'room/room_status/remove_room_map/' + row.id + '/';
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            method: 'post',
            url: url
          }).then(function (res) {
            console.info(res);
            if (res.data.message === 'success') {
              that.hintInfo('success', '删除成功');
              TableData.splice(index, 1);
              that.update_fjsz();
            } else {
              that.hintInfo('warning', res.data.message);
            }
          }).catch(function (err) {
            console.info(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
        console.info(index, row.id);
      },
      //===================编辑操作===============================
      /**
       * @EditeInfoLd 编辑楼栋的信息
       * @param  rows
       */
      EditeInfoLd: function (rows) {
        let that = this;
        console.info(rows);
        that.flag_dis = true;
        let is_halt = rows.is_halt ? '1' : '0';
        //这里将一个是否编辑的操作改为true 重置当前的isEdite
        that.isEdite = true;
        that.comEdite = rows,
          that.param.code = rows.code,
          that.param.descript = rows.descript,
          that.param.descript_en = rows.descript_en,
          that.is_halt = is_halt,
          that.param.parent_code = rows.parent_code
      },
      /**
       * @EditeInfoLc 编辑楼层的信息
       * @param  rows
       */
      EditeInfoLc: function (rows) {
        let that = this;
        that.selectBuildName();
        that.flag_dis = true;
        let is_halt = rows.is_halt ? '1' : '0';
        console.info(rows);
        that.isEdite = true;
        that.comEdite = rows,
          that.param.code = rows.code,
          //url   http://room.crowncrystalhotel.com/v1/room/
          that.param.descript = rows.descript,
          that.param.descript_en = rows.descript_en,
          that.param.building_name = rows.building_name,
          that.is_halt = is_halt,
          that.param.zone = rows.zone
        //that.param.hotel_id = rows.hotel_id//该字段不是必传项，但是没有的话就检索不到！
        //picture : that.param.picture,
      },
      /**
       * @EditeInfoFx 编辑房型的信息
       * @param  rows
       */
      EditeInfoFx: function (rows) {
        console.info(rows);
        let that = this;
        that.flag_dis = true;
        let is_halt = rows.is_halt ? '1' : '0';
        let is_hour_room = rows.is_hour_room ? '1' : '0';
        let is_overbooking = rows.is_overbooking ? '1' : '0';
        let is_selfmachine_use = rows.is_selfmachine_use ? '1' : '0';
        let is_check_room = rows.is_check_room ? '1' : '0';
        that.isEdite = true;
        that.comEdite = rows,
          that.param.code = rows.code,
          that.param.descript = rows.descript,
          that.param.descript_en = rows.descript_en,
          that.is_halt = is_halt,
          that.param.area = rows.area,
          that.param.bed_num = rows.bed_num,
          that.param.bed_type = rows.bed_type,
          //that.dialogImageUrl = rows.dialogImageUrl,
          that.is_overbooking = is_overbooking,
          that.param.overbokking_number = rows.overbokking_number,
          that.is_hour_room = is_hour_room,
          that.is_selfmachine_use = is_selfmachine_use,
          that.param.max_checkin_num = rows.max_checkin_num,
          that.is_check_room = is_check_room;
        that.room_type_img = "https://image.eloadspider.com/" + rows.picture;
        console.log(that.room_type_img);
      },
      /**
       * @EditeInfoFl 编辑房类的信息
       * @param  rows
       */
      EditeInfoFl: function (rows) {
        let that = this;
        let is_halt = rows.is_halt ? '1' : '0';
        that.isEdite = true;
        that.flag_dis = true;
        that.comEdite = rows,
          that.param.code = rows.code,
          that.param.descript = rows.descript,
          that.param.descript_en = rows.descript_en,
          that.is_halt = is_halt
      },
      /**
       * @EditeInfoTrait 编辑房间特征的信息
       * @param  rows
       */
      EditeInfoTrait: function (rows) {
        let that = this;
        that.select_floor();
        let is_halt = rows.is_halt ? '1' : '0';
        that.isEdite = true;
        that.flag_dis = true;
        that.comEdite = rows,
          that.param.code = rows.code,
          that.param.descript = rows.descript,
          that.param.descript_en = rows.descript_en,
          that.is_halt = is_halt;

      },
      /**
       * @EditeInfoRoomNum 编辑房间号的信息
       * @param  rows
       */
      EditeInfoRoomNum: function (rows) {
        let that = this;
        that.select_floor();
        that.selectroom_type_name();
        that.selectFeature();
        that.selectRoom_class_name();
        that.selectBuildName();
        console.info(rows);
        console.log(rows.room_no);
        that.flag_dis = true;
        let is_halt = rows.is_halt ? '1' : '0';
        that.isEdite = true;
        that.comEdite = rows,
          that.is_halt = is_halt,
          that.param.building_name = rows.building_name,
          that.param.room_class_name = rows.room_class_name,
          that.param.room_type_name = rows.room_type_name ,
          that.param.feature_name = rows.feature_array ? JSON.parse(rows.feature_array) : '',
          that.param.room_phone = rows.room_phone,
          that.param.room_phone_short = rows.room_phone_short,
          that.param.room_no = rows.room_no,
          that.param.floor_number = rows.floor_number
      },
      //===================新增操作===============================
      /**
       * @openWinLd 打开楼栋的遮罩层  根据flagopenwin来判断当前是属于哪一个页面的打开
       * @param no
       */
      SetMaskTrueShow: function () {
        let that = this;
        if (that.flagopenwin === 'first') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'second') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'third') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'fourth') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'fifth') {
          console.info('当前点击的是' + that.flagopenwin);
        } else if (that.flagopenwin === 'six') {
          console.info('当前点击的是' + that.flagopenwin);
        } else {
          console.info('当前点击的是' + that.flagopenwin);
        }
      },
      /**
       * @saveInfoLd 新增楼栋的操作
       * @param no
       * @isEdit  判断一个当前的值是不是新增  true为编辑  false为新增
       * @urlData 当前的url是属于编辑还是新增的的操作
       */
      saveInfoLd: function () {
        let that = this;
        //如果isEdite为false就是进行新增操作
        //let urlData = that.isEdite ? that.url+'/room/update_room_building/'+that.comEdite.id+'/' : that.url+'/room/add_room_building/';
        let urlData = that.isEdite ? that.url + 'room/room_status/update_room_building/' + that.comEdite.id + '/' : that.url + 'room/room_status/add_room_building/';
        if (that.param.code && that.param.descript && that.param.descript_en) {
          that.$axios({
            method: 'post',
            url: urlData,
            data: {
              code: that.param.code,
              descript: that.param.descript,
              descript_en: that.param.descript_en,
              is_halt: that.is_halt, //是否停用
              parent_code: that.param.parent_code,
            }
          }).then(function (res) {
              console.info(res);
            if(res.data.message === 'success'){
              that.dialogVisibleLd = false;
              that.hintInfo("success",'操作成功');
              that.update_ld();
            }else{
              that.hintInfo('warning',res.data.message);
            }
          }).catch(function (err) {
            that.hintInfo('warning','操作失败');
            console.info(err);
          })
        } else {
          that.$message({
            message: '*为必填项！',
            type: 'warning'
          });
        }
      },
      /**
       * @saveInfoLc 新增楼层的操作
       * @param no
       */
      saveInfoLc: function () {
        let that = this;
        //let urlData=that.isEdite ? that.url+'/room/update_roomfloor/'+that.comEdite.id+'/' : that.url+'/room/add_roomfloor/';
        let urlData = that.isEdite ? that.url + 'room/room_status/update_room_floor/' + that.comEdite.id + '/' : that.url + 'room/room_status/add_room_floor/';
        if (that.param.code && that.param.descript && that.param.descript_en && that.param.building_name) {
          that.$axios({
            method: 'post',
            url: urlData,
            data: {
              code: that.param.code,
              descript: that.param.descript,
              descript_en: that.param.descript_en,
              building_name: that.param.building_name,
              is_halt: that.is_halt,
              zone : that.param.zone
              //hotel_id : that.param.hotel_id,//该字段不是必传项，但是没有的话就检索不到！
              //picture : that.param.picture,
            }
          }).then(function (res) {
            if(res.data.message === 'success'){
              that.dialogVisibleLc = false;
              that.hintInfo("success",'操作成功');
              that.update_lc();
            }else{
              that.hintInfo('warning',res.data.message);
            }
          }).catch(function (err) {
            that.$message({
              message: err.message,
              type: 'warning'
            });
          })
        } else {
          that.hintInfo("warning",'*为必填项');
        }
      },
      /**
       * @saveInfoFx 新增房型的操作
       * @param no
       * @explain room_type_name 唯一的
       */
      saveInfoFx: function () {
        let that = this;
        //let urlData = that.isEdite ? that.url+'/room/update_roomtype/'+that.comEdite.id+'/' : that.url+'/room/add_roomtype/';
        let urlData = that.isEdite ? that.url + 'room/room_status/update_room_type/' + that.comEdite.id + '/' : that.url + 'room/room_status/add_room_type/';
        if (that.param.code && that.param.descript && that.param.descript_en && that.is_halt) {
          that.$axios({
            method: 'post',
            url: urlData,
            data: {
              code: that.param.code,
              descript: that.param.descript,
              descript_en: that.param.descript_en,
              is_halt: that.is_halt,
              area: that.param.area,
              bed_num: that.param.bed_num,
              bed_type: that.param.bed_type,
              picture: that.picture,
              is_overbooking: that.is_overbooking,
              overbokking_number: that.param.overbokking_number,
              max_checkin_num: that.param.max_checkin_num,
              is_hour_room: that.is_hour_room,
              is_selfmachine_use: that.is_selfmachine_use,
              is_check_room: that.is_check_room
            }
          }).then(function (res) {
            if(res.data.message === 'success'){
              that.dialogVisibleFx = false;
              that.hintInfo("success",'操作成功');
              that.update_fx();
            }else{
              that.hintInfo('warning',res.data.message);
            }
          }).catch(function (err) {
            that.hintInfo('warning','操作失败');
            console.info(err);
          })
        } else {
          that.hintInfo('warning','*为必填项');
        }
      },
      /**
       * @saveInfoFl 新增房类设置的操作
       * @param no
       */
      saveInfoFl: function () {
        let that = this;
        //let urlData = that.isEdite ? that.url+'/room/update_roomclass/'+that.comEdite.id+'/' : that.url+'/room/add_roomclass/';
        let urlData = that.isEdite ? that.url + 'room/room_status/update_room_class/' + that.comEdite.id + '/' : that.url + 'room/room_status/add_room_class/';
        if (that.param.code && that.param.descript && that.param.descript_en && that.is_halt) {
          that.$axios({
            method: 'post',
            url: urlData,
            data: {
              code: that.param.code,
              descript: that.param.descript,
              descript_en: that.param.descript_en,
              is_halt: that.is_halt,
            }
          }).then(function (res) {
            if(res.data.message === 'success'){
              that.dialogVisibleFl = false;
              that.hintInfo("success",'操作成功');
              that.update_fl();
            }else{
              that.hintInfo('warning',res.data.message);
            }
          }).catch(function (err) {
            that.hintInfo('warning','操作失败');
            console.info(err);
          })
        } else {
          that.hintInfo('warning','*为必填项');
        }
      },
      /**
       * @saveInfoTrait 新增房类特征的操作
       * @param no
       */
      saveInfoTrait: function () {
        /*that.param.code && that.param.code_name && that.param.descript && that.param.descript_en
        && that.is_halt && that.param.list_order && that.param.feature && that.param.feature_en*/
        let that = this;
        //let urlData = that.isEdite ? that.url+'/room/update_roomfeatures/'+that.comEdite.id+'/' : that.url+'/room/add_roomfeatures/';
        let urlData = that.isEdite ? that.url + 'room/room_status/update_room_features/' + that.comEdite.id + '/' : that.url + 'room/room_status/add_room_features/';
        that.$axios({
          method: 'post',
          url: urlData,
          data: {
            code: that.param.code,
            descript: that.param.descript,
            descript_en: that.param.descript_en,
            is_halt: that.is_halt,
          }
        }).then(function (res) {
          if(res.data.message === 'success'){
            that.dialogVisibleTrait = false;
            that.hintInfo("success",'操作成功');
            that.update_fjtz();
          }else{
            that.hintInfo('warning',res.data.message);
          }
        }).catch(function (err) {
          that.hintInfo('warning','操作失败');
          console.info(err);
        })
      },
      /**
       * @saveInfoRoomNum 新增一个房号 (房间)
       * @param no
       * dialogVisibleRoomNum
       */
      saveInfoRoomNum: function () {
        /* that.param.code && that.param.code_name && that.param.descript && that.param.descript_en && that.is_halt
         && that.param.list_order && that.param.room_number_id && that.param.building_name && that.param.room_number_guest
         && that.param.room_number_inner && that.param.room_number_guest_en && that.param.room_number_inner_en && that.param.room_class_name
         && that.param.feature_en && that.param.feature_name && that.param.self_machine_can_sale && that.param.room_num_state
         && that.param.room_phone && that.param.room_phone_short*/
        let that = this;
        //let urlData = that.isEdite ? that.url+'/room/update_roomnumber/'+that.comEdite.id+'/' : that.url+'/room/add_roomnumber/';
        let urlData = that.isEdite ? that.url + 'room/room_status/update_room_map/' + that.comEdite.id + '/' : that.url + 'room/room_status/add_room_map/';
        console.info(that.param.room_class_name);
        that.$axios({
          method: 'post',
          url: urlData,
          data: {
            is_halt: that.is_halt, //是否停用
            building_name: that.param.building_name, //楼栋
            room_class_name: that.param.room_class_name,//房类
            room_type_name: that.param.room_type_name,//房型
            feature_array: that.param.feature_name ? JSON.stringify(that.param.feature_name) : '',//房间特征的数组
            room_phone: that.param.room_phone, //客户座机长号
            room_phone_short: that.param.room_phone_short,//客户座机短号
            room_no: that.param.room_no, //房间号
            floor_number: that.param.floor_number,//楼层
          }
        }).then(function (res) {
          if(res.data.message === 'success'){
            that.hintInfo("success",'操作成功');
            that.dialogVisibleRoomNum = false;
            that.update_fjsz(); //房间设置
          }else{
            that.hintInfo('warning',res.data.message);
          }
        }).catch(function (err) {
          that.hintInfo('warning','操作失败');
          console.info(err);
        })

      },
      /**
       * @saveInfoRoomNum_batch 批量新增房间号
       */
      saveInfoRoomNum_batch(){
          let that = this;
          let url = that.url + 'room/room_status/add_room_map_in_batches/';
          if(that.param.building_name && that.param.floor_number && that.param.room_class_name && that.param.room_type_name && that.param.start_no && that.param.number_rooms && that.param.start_info){
            that.$axios({
              method : 'post',
              url : url,
              data : {
                building_name : that.param.building_name,
                floor_number : that.param.floor_number,
                room_class_name : that.param.room_class_name,
                room_type_name : that.param.room_type_name,
                start_no : parseInt(that.param.start_no),
                number : parseInt(that.param.number_rooms),
                start_info : that.param.start_info,
                extral_end : "[4,13]",
              }
            }).then((res)=>{
              console.info(res);
              if(res.data.message === 'success'){
                that.hintInfo("success",'操作成功');
                that.dialogVisibleRoomNum_batch = false;
                that.update_fjsz(); //房间设置
              }else{
                that.hintInfo('warning',res.data.message);
              }
            }).catch((err)=>{
              console.error(err);
            })
          }else{
            that.hintInfo('warning','*为必填项');
          }

      },
      //分页查询房态
      handleCurrentChangeFt(currentPage) {
        let that = this;
        let url = that.url + '/v1/room/room_status/get_code_room_state_list/';
        //that.currentPage = currentPage; // 这里不可以直接重置当前的页码，这样的话，别的页面是出现错误
        that.$axios({
          method: 'get',
          url: url,
          params: {
            page: currentPage,
            page_size: 15
          },
        }).then(function (res) {
          console.info(res.data.data.results);
          that.tableDataStatus = res.data.data.results;
        }).catch(function (err) {
          console.info(err);
        })
      },
      //增加按钮处理
      handleAdd() {
        this.ft_param = {}
        this.addAndUpdate = true //标记为增加状态
        this.statusTitle = '添加'
      },
      //编辑按钮处理   目前的修改是不做的，因为不可以修改，修改的话，会对系统造成bug
      handleEdit(row) {
        this.statusTitle = '修改'
        this.addAndUpdate = false
        let that = this;
        let id = row.id;
        that.rowId = id
        let url = that.api.api_price_9101 + '/v1/room/room_status/get_code_room_state_info/' + id + '/';
        that.$axios.get(url).then(res => {
          if (res.data.message === 'success') {
            that.ft_param = res.data.data;
            that.ft_is_halt === 0 ? that.ft_is_halt = '0' : that.ft_is_halt = '1'
          } else {
            that.$message.error('获取数据失败')
          }
        }).catch(error => {
        })
        that.handleCurrentChangeFt()
      },
      //验证数据
      validateData() {
        return (
          util.validateBlank(this.ft_param.code, '房间状态是必填项', this) &&
          util.validateBlank(this.ft_param.desc, '说明是必填项', this) &&
          util.validateBlank(this.ft_param.desc_en, '英文说明是必填项', this) &&
          util.validateBlank(this.ft_param.color, '显示颜色是必填项', this) &&
          util.validateBlank(this.ft_is_halt, '是否停用是必填项', this)
        )
      },
      handleDeleteFt(row) {
        let that = this;
        let id = row.id;
        let url = that.api.api_price_9101 + '/v1/room/room_status/remove_code_room_state/' + id + '/';
        that.$axios.post(url).then(() => {
          that.update_ft();
          that.$message({
            message: '删除成功',
            type: 'success'
          })
        }).catch((error) => {
          // that.$message.error('删除失败!')
        })
        that.handleCurrentChangeFt()
      },
      //新增/编辑房态
      saveInfoStatus() {
        if (!this.validateData()) {
          return
        }
        let that = this
        let id = that.rowId
        let url = that.api.api_price_9101 + '/v1/room/room_status/add_code_room_state/';
        let url_2 = that.api.api_price_9101 + '/v1/room/room_status/update_code_room_state/' + id + '/';
        that.$axios.post(that.addAndUpdate === true ? url : url_2, that.ft_param).then((res) => {
          if (res.data.message === 'success') {
            that.update_ft();
            that.$message({
              message: '操作成功',
              type: 'success'
            })
          } else {
            that.$message.error('操作失败');
          }
          that.handleCurrentChangeFt()
        }).catch(error => {
        })
        that.dialogVisibleFt = false
      },
      /**点击上传房型图方法*/
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
        this.picture = file.response.url;
        this.room_type_img = "https://image.eloadspider.com/" + file.response.url;
      },
      beforeAvatarUpload(file) {
        console.log(file);
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      /**
       * @hintInfo 操作提示信息
       * @param success  成功提示
       * @param warning 警告信息
       * @info 需要提示的信息
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
  .site-all {
    width: 94%;
    margin-left: 10px;
    margin-top: 10px;

    .code-top {
      height: 40px;
      line-height: 40px;

      i {
        color: #777777;
        font-size: x-large;
      }

      label {
        position: absolute;
        margin-top: -3px;
        margin-left: 5px;
        font-size: small;
        color: #777777;
      }
    }

    .tab {
      .setbtn {
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: #4488E9;
        border: none;
        border-radius: 4px;
        color: #ffffff;
      }
    }

    .dialog-style {
      ul {
        li {
          margin-top: 10px;

          span {
            display: inline-block;
            width: 140px;
            text-align: right;
          }

          input {
            height: 27px;
            width: 200px;
            margin-left: 10px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            padding-left: 15px;
            color: #606266;
          }

          label {
            margin-left: 10px;
          }
        }
      }

      button {
        width: 80px;
        height: 30px;
        background: #4488E9;
        border: none;
        color: #ffffff;
        line-height: 30px;
        border-radius: 4px;
      }
    }
  }

  //遮罩层样式
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: rgba(7, 13, 32, 0.6);
    top: 0;
    left: 0;
    z-index: 900;
    //控制房间类型的样式

    //控制房间的样式
    .mask-room {
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
    width: 240px;
    height: 140px;
    display: block;
  }
</style>
