<template>
  <div class="ticket">
    <div class="navigation">
      <div>
        <p style="padding: 10px;">酒店名称</p>
        <el-select v-model="hotel_group" placeholder="请选择" style="width: 229px;margin-bottom: 10px" size="mini">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;">
        <p style="padding: 10px 0 10px 10px; background: #68819EFF;color: white;">收银点</p>
        <el-tree
          :data="register_list"
          node-key="node.id"
          :expand-on-click-node="false"
          node-contextmenu
          @node-click="handleNodeClick">
               <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span class="my_node" :data-id="data.id">{{data.desc}}</span>
               </span>
        </el-tree>
      </el-col>
    </div>


    <div class="router">
      <div class="ini">
        <money-task></money-task>
      </div>
      <!--<router-view  :branch_id="branch_id"></router-view>-->
      <div class="ballot">
        <!--头部的搜索-->
        <ul class="title">
          <li>
            <div class="block">
              <span class="demonstration">营业日期起 :</span>
              <el-date-picker
                style="width: 150px;"
                v-model="biz_start"
                type="date"
                size="mini"
                @change="date_click"
                :picker-options="pickerOptionsStart"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </li>
          <li>
            <div class="block">
              <span class="demonstration">营业日期止 :</span>
              <el-date-picker
                style="width: 150px;"
                v-model="closing_date"
                type="date"
                size="mini"
                :picker-options="pickerOptionsEnd"
                @change="date_click"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </li>
          <li>
            <div class="block">
              <span class="demonstration">房间号 :</span>
              <el-select v-model="room_number" placeholder="请选择" filterable  clearable style="width: 150px;" size="mini" @change="date_click">
                <el-option
                  v-for="item in room_list"
                  :key="item.value"
                  :label="item.room_no"
                  :value="item.room_no">
                </el-option>
              </el-select>
            </div>
          </li>
          <li>
            <el-radio v-model="personage" label="" @change="date_click">全部</el-radio>
            <el-radio v-model="personage" label="0" @change="date_click">普通发票</el-radio>
            <el-radio v-model="personage" label="1" @change="date_click">增值税专用发票</el-radio>
          </li>
        </ul>
        <!--支付方式 -->
        <div class="shopping">
          <!--账户种类 状态 ... -->
          <div class="status" style="margin-top: 10px">
            <el-table
              :data="income_list"
              size="mini"
              max-height="700"
              :cell-style="{textAlign:'center'}"
              :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
              style="width: 100%;">
              <el-table-column
                prop="account_id.room_num"
                label="房间号">
              </el-table-column>
              <el-table-column
                prop="invoice_type"
                width="150"
                label="发票类型">
                <template slot-scope="scope">
                  <span v-if="scope.row.invoice_type ===  0">普通发票</span>
                  <span v-else>增值税专用发票</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="invoice_number"
                width="300"
                label="发票号">
              </el-table-column>

              <el-table-column
                prop="invoice_title"
                width="300"
                label=" 发票抬头">
              </el-table-column>
              <el-table-column
                prop="merge_flag"
                width="120"
                label="是否合并开票">
                <template slot-scope="scope">
                  <span v-if="scope.row.merge_flag ===  1">是</span>
                  <span v-else>否</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="amount"
                label="总开票金额">
              </el-table-column>
              <!--<el-table-column-->
              <!--prop="pay_detail_id"-->
              <!--width="180"-->
              <!--label="合并开票账户的数量">-->
              <!--</el-table-column>-->
              <el-table-column
                prop="issued_date"
                width="140"
                label="开票日期">
              </el-table-column>
              <el-table-column
                prop="modify_user.real_name"
                label="开票人">
              </el-table-column>
              <el-table-column
                prop="desc"
                label="备注">
              </el-table-column>
              <el-table-column
                prop="address"
                width="180 "
                fixed="right"
                label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)" disabled>
                    删除
                  </el-button>
                  <el-button size="mini"
                             @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
                  </el-button>
                </template>
              </el-table-column>

            </el-table>

            <!--分页-->
            <el-pagination style="float: right;margin-right: 2%"
                           layout="prev, pager, next"
                           :page-size="pagesize"
                           :current-page="cur_page"
                           @current-change="handleCurrentChange"
                           :total="total">
            </el-pagination>
          </div>
          <!--点击修改显示的页面-->
          <el-dialog
            :visible.sync="dialogVisible"
            :close-on-click-modal='false'
            width="40%"
            :before-close="handleClose">
            <div slot="title" class="dialog_style_header-title">
              <span class="dialog_style_title-name"> {{ title }}</span>
            </div>
            <ul class="dialog_style">
              <!--<li>-->

              <!--<span> <i style="color: red;font-size: 18px">*</i>个人/公司 ：</span>-->
              <!--<el-radio v-model="person_or_corp" label="1">个人</el-radio>-->
              <!--<el-radio v-model="person_or_corp" label="0">公司</el-radio>-->
              <!--</li>-->
              <li>
                <span><i style="color: red;font-size: 18px">*</i>发票号：</span>
                <el-input v-model="invoice_number" placeholder="请输入内容" oninput="value=value.replace(/[^\d]/g,'')"
                          style="width: 200px;" size="mini"></el-input>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px">*</i>发票抬头：</span>
                <el-input v-model="invoice_title" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px">*</i>发票类型：</span>
                <el-select v-model="invoice_type" clearable placeholder="请选择" size="mini" style="width: 200px;"
                           disabled>
                  <el-option
                    v-for="item in open_ticket_type"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </li>
              <li>
                <span><i style="color: red;font-size: 18px">*</i>总开票金额 ：</span>
                <el-input v-model="amount" placeholder="请输入内容" style="width: 200px;" size="mini" disabled></el-input>
              </li>
              <li>
                <span> <i style="color: red;font-size: 18px">*</i>是否合并开票 ：</span>
                <el-radio v-model="merge_flag" label="1">是</el-radio>
                <el-radio v-model="merge_flag" label="0">否</el-radio>
              </li>
              <!--:disabled="true"-->

              <!--<li>-->
              <!--<span >合并开票账户的数量 ：</span>-->
              <!--<el-input v-model="param.pay_detail_id" placeholder="请输入内容" style="width: 200px;" :disabled="true"  size="mini"></el-input>-->
              <!--</li>-->
              <li>
                <span style="vertical-align: top">备注 ：</span>
                <textarea cols="30" rows="8" v-model="invoice_desc"
                          style="width: 220px; border: 1px solid #DCDFE6;border-radius: 4px;resize:none"
                          size="mini"></textarea>
              </li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
          </el-dialog>
          <!--点击查看字段自定义的页面-->
          <el-dialog
            title=""
            :visible.sync="dialog_check"
            :close-on-click-modal='false'
            width="80%"
            :before-close="handleClose">
            <p style="padding: 10px;font-weight: bold">更多详情</p>
            <div class="status">

              <!--更多详情的内容   遍历对象-->
              <ul v-for="(value, key) in segment_list">
                <li style="width: 50%;float: left;margin-bottom: 10px">
                  <span style="display: inline-block;width: 120px">{{ key }}：</span>
                  <span
                    style="display: inline-block;width: 300px;height: 40px;border: 1px solid #dcdfe6;line-height: 40px;padding-left: 10px;border-radius: 4px">{{ value }}</span>
                </li>
              </ul>


            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialog_check = false">取 消</el-button>
             </span>
          </el-dialog>


        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "ticket",
    data() {
      return {
        url: this.api.api_9022_9519,
        title: '',
        activeIndex: '1',
        hotel_list: [],//酒店
        register_list: [],//收银点
        hotel_group: '',//酒店
        branch_id: '',//所选择的收银点id
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        //分页
        total: 10,
        pagesize: 10,
        cur_page: 1,
        dialogVisible: false,//修改页面的显示和隐藏
        dialog: false,//字段定义的显示和隐藏
        dialog_check: false,//字段自定义的查看显示与隐藏
        income_list: [],//票据列表
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        param: {},//新增入账代码里的内容

        //  修改票的内容
        invoice_type: '',//票据类型
        invoice_number: '',//发票号
        invoice_title: '',//发票抬头
        invoice_desc: '',//备注
        amount: '',//总开票金额
        merge_flag: '',//是否合并开票
        person_or_corp: '',//个人/公司
        pay_detail_id: '',//合并开票账户的数量
        model_id: '',
        total_fields: 1,//total
        p_fields: 10,//每页展示
        segment_list: {},//获取字段自定义
        not_null: '1',//是否为空
        field_name: '',//字段名称
        field_type: '',//字段类型
        field_desc: '',//字段说明
        //开票类型
        open_ticket_type: [
          {
            value: 0,
            label: '普通发票'
          },
          {
            value: 1,
            label: '增值税专用发票'
          },
        ],
        /*
      * 筛选条件
      * */
        biz_start: '',//筛选条件起始时间
        closing_date: '',//筛选条件营业日期止
        personage: '',//发票种类
        room_number: '',//房间号
        room_list: [],//获取房间号
        //消费清单
        activeName2: 'first',
        branch_data: '',//部门id
        //营业日期起止
        pickerOptionsStart: {
          disabledDate: time => {
            let endDateVal = this.closing_date;
            if (endDateVal) {
              return time.getTime() > new Date(endDateVal).getTime();
            }
          }
        },
        pickerOptionsEnd: {
          disabledDate: time => {
            let beginDateVal = this.biz_start;
            if (beginDateVal) {
              return (
                time.getTime() <
                new Date(beginDateVal).getTime() - 1 * 24 * 60 * 60 * 1000
              );
            }
          }
        },


      }
    },
    created: function () {
      let that = this;
      that.cash_register();//获取酒店部门
      that.hotel();//获取酒店
      that.enter_code();//获取票列表
      that.room_data();//获取房间号
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //封装获取酒店的信息
      hotel() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/dept/get_tree",
          "method": "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              that.hotel_list = res.data.data;
              that.hotel_group = that.hotel_list[0].name;
              that.id = that.hotel_list[0].id;

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
      /*
     * 封装获取收银点
     * */
      cash_register() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/cash_register/info_list",
          method: "post",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.register_list = res.data.data.list;
            }
            else {
              console.log(res.data.message);
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //收银点事件
      handleNodeClick(data) {
        // console.log(data.id);
        let that = this;
        // that.branch_id=data.id;
        // that.enter_code();//获取票
        that.hintInfo("warning", "此收银点暂未开放")

      },
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      //筛选
      date_click(value) {
        console.log(value);
        let that = this;
        that.cur_page=1;
        that.$axios({
          url: that.url + "/v1/finance/invoice_detail/info_list",
          method: "post",
          data: {
            // pay_mode_id:that.tabvelue,
            // field_name:'create_time',
            begin_date: that.biz_start,
            end_date: that.closing_date,
            invoice_type: that.personage,
            room_num:that.room_number
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.list;
              that.total = res.data.data.total_count;
            }
            else {
              console.log(res.data.message);
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //获取票列表
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/invoice_detail/info_list",
          method: "post",
          data: {
            dept_id: that.branch_id,
            page_num: that.cur_page,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
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
      /**获取房间号*/
      room_data() {
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
              that.room_list = res.data.data.results;
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
        console.log(curPage); // 当前页}
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/invoice_detail/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            // pay_mode_id:that.tabvelue,
            // field_name:'create_time',
            begin_date: that.biz_start,
            end_date: that.closing_date,
            invoice_type: that.personage,
            room_num:that.room_number
          },

        })
          .then(res => {
            if (res.data.message === "success") {
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
            url: that.url + "/v1/finance/invoice_detail/remove/" + id,
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
        that.id = srow.id;
        console.log(srow, id, index);
        that.title = "修改票据信息"
        //  付款方式
        that.invoice_type = srow.invoice_type; //单据种类
        that.invoice_number = srow.invoice_number;//发票号
        that.merge_flag = srow.merge_flag + "";//是否合并开票
        that.amount = srow.amount;//总开票金额
        that.invoice_title = srow.invoice_title;//发票抬头
        that.invoice_desc = srow.desc;
        that.model_id = srow.model_id;
      },
      //点击票的
      ensure() {
        let that = this;
        if (that.invoice_type === "" || that.invoice_number === "" || that.amount === "" || that.invoice_title === "") {
          that.hintInfo("warning", "*为必填项")
        } else {
          that.$axios({
            url: that.url + "/v1/finance/invoice_detail/update/" + that.id,
            method: "post",
            data: {
              //  入账代码的内容
              // item_id:that.id,
              invoice_type: that.invoice_type,//票据种类
              merge_flag: that.merge_flag + "",//是否合并开票
              amount: that.param.amount,//总开票金额
              invoice_number: that.invoice_number,//发票号
              invoice_title: that.invoice_title,//合并开票账户数量
              desc: that.invoice_desc,
              // item_id:that.model_id,
            },

          })
            .then(res => {
              if (res.data.message == "success") {
                that.enter_code();
                that.dialogVisible = false;
                that.hintInfo("success", "修改发票成功")
              }
              else {
                that.error(res.data.message)
                console.log(res.data.message);
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
      fields_list(srow, id, index, list) {
        let that = this
        console.log(srow, index, list);
        that.$axios({
          url: that.url + "/v1/finance/bill_detail/pretty_info",
          method: "post",
          data: {
            model_id: srow.model_id,
            item_id: srow._id,
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.segment_list = res.data.data
              that.total_fields = res.data.data.total_count;
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
        that.param.field_name = srow.field_name, //字段名称
          that.field_type = srow.field_type,//字段类型
          that.param.field_desc = srow.field_desc,//字段说明
          that.not_null = srow.not_null + ""//是否可以为空

      },
      //点击字段定义的新增和修改后的保存
      augment() {
        let that = this;
        let urldata = that.Edite ? (that.url + "/v1/finance/pay_mode/update_field/" + that.id) : (that.url + "/v1/finance/pay_mode/add_field");
        console.info(urldata);
        that.$axios({
          url: urldata,
          method: "post",
          data: {
            //  入账代码的内容
            model_id: that.model_id,
            field_name: that.param.field_name,//字段名称
            field_type: that.field_type,//字段类型
            field_desc: that.param.field_desc,//字段说明
            not_null: that.not_null + "",//是否可以为空
          },

        })
          .then(res => {
            if (res.data.message == "success") {
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
              that.error(res.data.message)
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
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
                  url: that.api + "/v1/finance/pay_mode/get_fields",
                  method: "post",
                  data: {
                    model_id: that.model_id,
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
              // that.income_list=res.data.data.list
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
  .ticket {
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation {
      float: left;
      width: 249px;
      height: 100%;
      background: white;
      overflow-y: scroll;
    }
    .router {
      width: calc(100% - 249px);
      height: 100%;
      float: left;
      .ballot {
        width: 95%;
        height: 95%;
        margin: 1%;
        background: white;
        overflow-y: scroll;
        /*overflow: hidden;*/

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
          overflow: hidden;
          li {
            /*float: left;*/
            /*width: 50%;*/
            margin-bottom: 20px;

            span {
              display: inline-block;
              width: 150px;
              text-align: right;
            }
          }
        }
      }
      .ini {
        height: calc(100% - 60px);
        position: absolute;
        right: 0;
        top: 60px;
        z-index: 10;
      }
    }
  }
</style>

