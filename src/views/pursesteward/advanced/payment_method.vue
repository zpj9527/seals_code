<template>
  <div class="payment_method">
    <!--支付方式 -->
    <div class="shopping">
      <div style="position: relative">
        <span
          style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold;cursor: pointer"
          @click="screen_all" title="全部付款方式">付款方式</span>
        <el-button type="primary" @click="dialogVisible = true;flush();add_title()" size="mini"
                   style="margin-top: 14px;width: 80px;">
          新增
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
        </el-button>
        <div style="position: absolute;top: 18px;left: 200px">
          <el-checkbox v-model="is_groups" @change="screen">集团码</el-checkbox>
          <el-checkbox v-model="is_syss" @change="screen_sys">系统码</el-checkbox>
          <el-checkbox v-model="is_halts" @change="screen_halt">停用</el-checkbox>
        </div>

      </div>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          :cell-style="{textAlign:'center'}"
          max-height="700"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <!--<el-table-column-->
          <!--prop="hotel_group_id.desc"-->
          <!--label="集团ID">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="hotel_id.desc"-->
          <!--label="酒店ID">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="pay_model_type"
            fixed="left"
            width="135"
            label="付款方式类型">
          </el-table-column>
          <el-table-column
            prop="model_name"
            fixed="left"
            width="150"
            label="付款方式名">
          </el-table-column>
          <el-table-column
            prop="code"
            widt="150"
            label="付款代码">
          </el-table-column>
          <el-table-column
            prop="desc"
            width="150"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="desc_en"
            width="150"
            label="英文描述">
          </el-table-column>
          <el-table-column
            prop="is_group "
            label="集团码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_group === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_sys"
            label="系统码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_sys === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="is_halt"
            label="停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="140"
            label="创建日期">
          </el-table-column>
          <el-table-column
            prop="create_user.real_name"
            label="创建用户">
          </el-table-column>
          <el-table-column
            prop="modify_time"
            width="140"
            label="修改日期">
          </el-table-column>
          <el-table-column
            prop="modify_user.real_name"
            label="修改用户">
          </el-table-column>

          <el-table-column
            prop=" fields"
            width="150"
            fixed="right"
            label="字段定义">
            <template slot-scope="scope">
              <el-button size="mini" @click="dialog = true; empty(scope.row,scope.$index, income_list) ">添加</el-button>
              <el-button size="mini" @click="dialog_check = true; fields_list(scope.row,scope.$index, income_list) ">
                查看
              </el-button>
              <!--<el-button  size="mini" type="danger"  @click="expurgate(scope.row.id,scope.$index, income_list)" >删除</el-button>-->
              <!--<el-button size="mini" @click="dialog = true;recompose(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            width="180 "
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)"
                         v-if="scope.row.is_sys===1" disabled>删除
              </el-button>
              <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)" v-else>删除
              </el-button>
              <el-button size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) "
                         v-if="scope.row.is_sys===1" >修改
              </el-button>
              <el-button size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) " v-else>修改
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
        width="30%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name">{{ title }}</span>
        </div>
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>付款方式类型 ：</span>
            <el-select v-model="payment_genre" placeholder="请选择付款方式类型" size="mini" style="width: 200px;">
              <el-option
                v-for="item in payment_type"
                :key="item.value"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>付款方式名 ：</span>
            <el-input v-model="param.model_name " placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>

          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>付款代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">中文描述 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述 ：</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>系统码 ：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>集团码 ：</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>停用 ：</span>
            <el-radio v-model="is_halt" label="1">是</el-radio>
            <el-radio v-model="is_halt" label="0">否</el-radio>

          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
      </el-dialog>
      <!--点击新增修改字段定义的页面-->
      <el-dialog
        :visible.sync="dialog"
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose">
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name">{{ title }}</span>
        </div>
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>字段名称 ：</span>
            <el-input v-model="param.field_name_cn " placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>

          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>字段英文名称 ：</span>
            <el-input v-model="param.field_name " placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>

          </li>
          <li>
            <i style="color: red;font-size: 18px ">*</i>
            <span>字段类型 ：</span>
            <!--<el-input v-model="param.field_type " placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <el-select v-model="field_type" placeholder="请选择" size="mini" style="width: 200px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>


          </li>

          <li>
            <i style="color: red;font-size: 18px ;vertical-align: top">*</i>
            <span style="vertical-align: top">字段说明 ：</span>
            <!--<el-input v-model="param.field_desc" placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <textarea style="width: 200px; height: 100px;resize: none ;border: 1px solid #dcdfe6;border-radius: 4px"
                      v-model="param.field_desc "></textarea>
          </li>
          <!--<li>-->
          <!--<span style="margin-left: 10px">是否不能为空 ：</span>-->
          <!--<el-radio-group v-model="not_null" size="mini" disabled>-->
          <!--<el-radio label="1" >是</el-radio>-->
          <!--<el-radio label="0" >否</el-radio>-->
          <!--</el-radio-group>-->
          <!--</li>-->
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialog = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="augment()" size="mini">确 定</el-button>
             </span>
      </el-dialog>
      <!--点击查看字段自定义的页面-->
      <el-dialog
        :visible.sync="dialog_check"
        :close-on-click-modal='false'
        width="60%"
        :before-close="handleClose">
        <!--<p style="padding: 10px;font-weight: bold">字段定义</p>-->
        <div slot="title" class="dialog_style_header-title">
          <span class="dialog_style_title-name">{{ title }}</span>
        </div>
        <div class="status">
          <el-table
            :data="segment_list"
            size="mini"
            max-height="700"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            style="width: 100%;  overflow-y: scroll">
            <el-table-column
              prop="field_name_cn"
              label="字段名称">
            </el-table-column>
            <el-table-column
              prop="field_name"
              label="字段英文名称">
            </el-table-column>
            <el-table-column
              prop="field_type"
              label="字段类型">
            </el-table-column>
            <el-table-column
              prop="field_desc"
              label="字段说明">
            </el-table-column>

            <!--<el-table-column-->
            <!--prop="not_null"-->
            <!--label="是否不能为空">-->
            <!--<template slot-scope="scope">-->
            <!--<span v-if="scope.row.not_null === 0">否</span>-->
            <!--<span v-else>是</span>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column
              prop="address"
              width="180 "
              fixed="right"
              label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="expurgate(scope.row.id,scope.$index, segment_list)">删除
                </el-button>
                <el-button size="mini"
                           @click="dialog=true;recompose(scope.row,scope.row.id,scope.$index, segment_list) ">修改
                </el-button>
              </template>
            </el-table-column>

          </el-table>

          <!--&lt;!&ndash;分页&ndash;&gt;-->
          <!--<el-pagination style="float: right;margin-right: 2%"-->
          <!--layout="prev, pager, next"-->
          <!--:page-size="p_fields"-->
          <!--@current-change="handleCurrentCe"-->
          <!--:total="total_fields">-->
          <!--</el-pagination>-->
        </div>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_check = false" size="mini">取 消</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "payment_method",
    data() {
      return {
        url: this.api.api_9022_9519,
        title: '',
        //分页
        total: 5,
        pagesize: 10,
        cur_page: 1,
        dialogVisible: false,//修改页面的显示和隐藏
        dialog: false,//字段定义的显示和隐藏
        dialog_check: false,//字段自定义的查看显示与隐藏
        income_list: [],//票据种类
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        param: {},//新增入账代码里的内容

        //  入账代码的内容
        model_name: '',//模型名称
        collection_name: '',//模型英文名称
        code: '',//付款代码
        desc: '',//中文描述
        desc_en: '',//英文描述
        is_sys: '',//是否系统码
        is_group: '',//是否集团码
        is_halt: '',//是否停用

        //筛选条件
        is_syss: false,//是否系统码
        is_groups: false,//是否集团码
        is_halts: false,//是否停用

        // 字段自定义
        options: [
          {
            value: 'str',
            label: '字符串'
          }, {
            value: 'list',
            label: '数组'
          }, {
            value: 'dict',
            label: '字典/对象'
          }, {
            value: 'int',
            label: '整数'
          }, {
            value: 'Decimal',
            label: '高精度数字'
          },
        ],
        //付款类型
        payment_type: [
          {
            label: "实时到账",
            value: "1"
          },
          {
            label: "信用付款",
            value: "2"
          },
          {
            label: "优惠付款",
            value: "3"
          },
        ],
        model_id: '',
        // total_fields:1,//total
        // p_fields:10,//每页展示
        segment_list: [],//获取字段自定义
        not_null: '1',//是否为空
        field_name: '',//字段名称
        field_type: '',//字段类型
        field_desc: '',//字段说明
        field_name_cn: '',
        payment_genre: '',//付款类型
      }
    },
    created: function () {
      let that = this;
      // that.authorization = sessionStorage.getItem("authorization");
      that.enter_code();//获取付款方式
    },
    methods: {
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.Edite_false = true;
        that.param = {
          model_name: '',//模型名称
          // collection_name:'',//模型英文名称
          code: '',//付款代码
          desc: '',//中文描述
          desc_en: '',//英文描述


        }
        that.is_sys = '1';//是否系统码
        that.is_group = "1";//是否集团码
        that.is_halt = '0';//是否停用
        that.payment_genre = ""//付款类型

      },
      //用来刷新字段定义的数据刷新
      empty(srow, index, list) {
        let that = this;
        console.log(srow, index, list);
        that.model_id = srow.id;
        //第一件事    将标志位改为false
        that.title = srow.model_name + "添加字段";
        that.Edite = false;
        that.param = {
          field_name: '',//字段名称
          field_desc: '',//字段说明
          field_name_cn: '',
        }
        that.not_null = '1'//是否为空
        that.field_type = ''//字段类型

      },
      /**获取所有的*/
      screen_all() {
        let that = this;
        that.enter_code();
        that.is_groups = '';
        that.is_syss = '';
        that.is_halts = '';
      },
      //筛选条件--是否集团码
      screen() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/info_list",
          method: "post",
          data: {
            is_group: that.is_groups ? 1 : 0,
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list
              that.total = res.data.data.total_count;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //筛选条件--是否系统码
      screen_sys() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/info_list",
          method: "post",
          data: {
            is_sys: that.is_syss ? 1 : 0,
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list
              that.total = res.data.data.total_count;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //筛选条件--是否停用
      screen_halt() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/info_list",
          method: "post",
          data: {
            is_halt: that.is_halts ? 1 : 0
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(that.is_halts);
              console.log(res.data.data)
              that.income_list = res.data.data.list
              that.total = res.data.data.total_count;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //获取付款方式
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/info_list",
          method: "get",
          params: {
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list
              that.total = res.data.data.total_count;

            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //点击分页上的页数
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        that.cur_page = curPage,
          //获取信息列表
          that.$axios({
            url: that.url + "/v1/finance/pay_mode/info_list",
            method: "get",
            params: {
              page_num: curPage,
              page_size: that.pagesize
            },

          })
            .then(res => {
              if (res.data.message == "success") {
                that.income_list = res.data.data.list
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
      //  点击删除
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
            url: that.url + "/v1/finance/pay_mode/remove/" + id,
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
        let that = this;
        that.Edite = true;
        that.Edite_false = false;
        that.id = id;
        console.log(srow);
        that.title = "修改付款方式";
        //  付款方式
        that.param.model_name = srow.model_name, //模型名称
          // that.param.collection_name=srow.collection_name,//模型英文名称
          that.param.code = srow.code,//code
          that.param.desc = srow.desc,//中文描述
          that.param.desc_en = srow.desc_en,//英文描述
          that.is_sys = srow.is_sys + "",//是否系统码
          that.is_group = srow.is_group + "",//是否集团码
          that.is_halt = srow.is_halt + "";//是否停用
        that.payment_genre = srow.pay_model_type;//付款类型

      },
      //点击新增付款方式
      add_title() {
        let that = this;
        that.title = "新增付款方式";
      },
      //点击付款方式新增和修改后的保存
      ensure() {
        let that = this;
        if (!that.param.model_name || !that.param.code || !that.is_sys || !that.is_group || !that.is_halt || !that.payment_genre) {
          that.hintInfo("warning", "*为必填项")
        } else {
          let urldata = that.Edite ? (that.url + "/v1/finance/pay_mode/update/" + that.id) : (that.url + "/v1/finance/pay_mode/add");
          console.info(urldata);
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              //  入账代码的内容
              model_name: that.param.model_name,//模型名称
              code: that.param.code,//代码
              // collection_name :that.param.collection_name,//模型英文名称
              desc: that.param.desc,//中文描述
              desc_en: that.param.desc_en,//英文描述
              is_sys: that.is_sys + "",//是否系统码
              is_group: that.is_group + "",//是否集团码
              is_halt: that.is_halt + "",//是否停用
              pay_model_type: that.payment_genre,//付款类型
            },

          })
            .then(res => {
              if (res.data.message === "success") {
                that.enter_code();
                that.dialogVisible = false;
                if (that.Edite) {
                  that.hintInfo("success", "修改付款方式成功")
                } else {
                  that.hintInfo("success", "新增付款方式成功")
                }
              }
              else {
                console.log(res.data.message);
                let message = [{error: 'object is exists! model_type=pay_mode'}];
                let reg = "^((?!object is exists).)*$";
                if (reg) {
                  that.hintInfo("warning", "数据类型错误")
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },

      /*
      * 字段自定义
      *
      * */
      //查看字段自定义的信息
      fields_list(srow, index, list) {
        let that = this;
        console.log(srow);
        that.model_id = srow.id;
        that.title = "查看" + srow.model_name + "字段自定义"
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/get_fields",
          method: "post",
          data: {
            model_id: that.model_id,
            page_size: 999,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.segment_list = res.data.data.list
              // that.total_fields=res.data.data.total_count;
            }
            else {
              // that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },

      //点击修改字段自定义
      recompose(srow, id, index, list) {
        let that = this;
        that.Edite = true;
        that.id = id;
        console.log(srow);
        that.title = srow.model_name + "修改字段";
        that.param.field_name = srow.field_name, //字段名称
          that.field_type = srow.field_type,//字段类型
          that.param.field_desc = srow.field_desc,//字段说明
          that.not_null = srow.not_null + ""//是否可以为空
        that.param.field_name_cn = srow.field_name_cn
      },
      //点击字段定义的新增和修改后的保存
      augment() {
        let that = this;
        if (!that.param.field_name || !that.field_type || !that.param.field_desc || !that.param.field_name_cn) {
          that.hintInfo("warning", "*为必填项")
        } else {
          let urldata = that.Edite ? (that.url + "/v1/finance/pay_mode/update_field/" + that.id) : (that.url + "/v1/finance/pay_mode/add_field");
          console.info(urldata);
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              //  入账代码的内容
              model_id: that.model_id,
              field_name: that.param.field_name,//字段名称
              field_name_cn: that.param.field_name_cn,
              field_type: that.field_type,//字段类型
              field_desc: that.param.field_desc,//字段说明
              not_null: that.not_null + "",//是否可以为空

            },
          })
            .then(res => {
              if (res.data.message === "success") {
                that.dialog = false;
                if (that.Edite) {
                  that.hintInfo("success", "修改字段成功")
                } else {
                  that.hintInfo("success", "新增字段成功")
                }
                //刷新修改后的数据
                that.$axios({
                  url: that.url + "/v1/finance/pay_mode/get_fields",
                  method: "post",
                  data: {
                    model_id: that.model_id,
                  },
                })
                  .then(res => {
                    if (res.data.message == "success") {
                      console.log(res.data.data)
                      that.segment_list = res.data.data.list
                      that.total = res.data.data.total_count;
                      that.dialog = false;

                    }
                    else {
                      // that.error_message(res.data.message)
                    }

                  })
                  .catch(error => {
                    console.log(error);
                  });
              }
              else {
                if (that.Edite) {
                  that.hintInfo("warning", "修改字段失败")
                } else {
                  that.hintInfo("warning", "新增字段失败")
                }
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      //点击字段自定义的删除
      expurgate(id, index, list) {
        console.log(id, index, list);
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
            url: that.url + "/v1/finance/bill_type/remove_field/" + id,
            method: "post",
            data: {
              model_id: that.model_id,
            },
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                //刷新修改后的数据
                that.$axios({
                  url: that.url + "/v1/finance/pay_mode/get_fields",
                  method: "post",
                  data: {
                    model_id: that.model_id,
                    page_size: 999,
                  }
                })
                  .then(res => {
                    if (res.data.message == "success") {
                      console.log(res.data.data)
                      that.segment_list = res.data.data.list
                      that.total = res.data.data.total_count;
                    }
                    else {
                      // that.error_message(res.data.message)
                    }

                  })
                  .catch(error => {
                    console.log(error);
                  });
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
      //点击分页上的页数
      handleCurrentCe(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/pay_mode/get_fields",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.p_fields
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              that.segment_list = res.data.data.list
              that.total_fields = res.data.data.total_count;
            }
            else {
              // console.log(resp.data.message);
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
  .payment_method {
    width: 95%;
    height: 95%;
    margin: 1%;
    background: white;
    overflow: hidden;
    .title {
      margin-top: 23px;
      min-width: 1200px;
      li {
        display: inline-block;
        margin-left: 10px;
        button {
          width: 80px;
          height: 30px;
          background: rgba(68, 136, 233, 1);
          border: none;
          border-radius: 4px;
          color: white;
          margin-left: 20px;
        }
      }
    }
    .shopping {
      /*margin-top: 20px;*/
      .shopping_title {
        li {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .dialog_style {
      /*overflow: hidden;*/
      li {
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 110px;
        }
      }
    }
  }
</style>
<style>
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
  /*z-index: 0;*/
  /*}*/

</style>
