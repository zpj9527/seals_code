<template>
  <div class="currency">
    <!--支付方式 -->
    <div class="shopping">
      <div style="position: relative">
        <span
          style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">币种设置</span>
        <!--<el-button type="text" @click="dialogVisible = true;flush()">-->
        <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
        <!--</el-button>-->
        <!--<div style="position: absolute;top: 18px;left: 100px">-->
        <!--<el-checkbox v-model="is_groups"  @change="screen">是否集团码</el-checkbox>-->
        <!--<el-checkbox v-model="is_syss" @change="screen_sys">是否系统码</el-checkbox>-->
        <!--<el-checkbox v-model="is_halts" @change="screen_halt">是否停用</el-checkbox>-->
        <!--</div>-->

      </div>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="base"
            label="基础">
          </el-table-column>
          <el-table-column
            prop="discount"
            label="换算比率">
          </el-table-column>
          <el-table-column
            prop="buying_rate"
            label="买入汇率">
          </el-table-column>
          <el-table-column
            prop="selling_rate"
            label="卖出汇率">
          </el-table-column>

          <el-table-column
            prop="code"
            label="代码">
          </el-table-column>
          <el-table-column
            prop="descript"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="descript_en"
            label="英文描述">
          </el-table-column>

          <el-table-column
            prop="is_halt "
            label="是否停用">
            <template slot-scope="scope">
              <span v-if="scope.row.is_halt === 'F'">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>

          <el-table-column
            prop="create_user"
            label="创建者">
          </el-table-column>
          <el-table-column
            prop="create_datetime"
            width="150"
            label="创建时间">
          </el-table-column>

          <!--<el-table-column-->
          <!--prop="address"-->
          <!--width="180 "-->
          <!--fixed="right"-->
          <!--label="操作">-->
          <!--<template slot-scope="scope" >-->
          <!--<el-button  size="mini" type="danger"  @click="cancel(scope.row.id,scope.$index, income_list)" >删除</el-button>-->
          <!--<el-button size="mini" @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改</el-button>-->
          <!--</template>-->
          <!--</el-table-column>-->

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
        title=""
        :visible.sync="dialogVisible"
        :close-on-click-modal='false'
        width="80%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <span style="margin-left: 10px">中文描述 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述 ：</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>货币名称 ：</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <span>兑换比率 ：</span>
            <el-input v-model="param.exchange_rate" placeholder="请输入内容" style="width: 200px;"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>是否是系统码 ：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>是否集团码 ：</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>是否停用 ：</span>
            <el-radio v-model="is_halt" label="1">是</el-radio>
            <el-radio v-model="is_halt" label="0">否</el-radio>

          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false;ensure()">确 定</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "currency",
    data() {
      return {
        url: this.api.api_9022_9519,
        //分页
        total: 10,
        pagesize: 10,
        dialogVisible: false,//修改页面的显示和隐藏
        income_list: [],//币种设置列表
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新

        param: {},//新增入账代码里的内容

        //筛选条件
        is_syss: false,//是否系统码
        is_groups: false,//是否集团码
        is_halts: false,//是否停用

        //  付款原因的内容
        exchange_rate: '', //兑换比率
        desc: '',//中文描述
        desc_en: '',//英文描述
        name: '',//货币名称
        code: '',//代码
        is_sys: '',//是否系统码
        is_group: '',//是否集团码
        is_halt: '',//是否停用

      }
    },
    created: function () {
      let that = this;
      that.enter_code();//获取币种设置

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
        that.param = {

          desc: '',//中文描述
          desc_en: '',//英文描述
          name: '',//货币名称
          code: '',//代码

        }
        that.is_sys = '',//是否系统码
          that.is_group = "",//是否集团码
          that.is_halt = '',//是否停用
          that.exchange_rate = ''//兑换比率
      },
      //封装获取币种设置
      enter_code() {
        let that = this
        that.$axios({
          url: that.api.api_code_9103 + '/v1/system/settings/get_currency_list/',
          method: "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data)
              that.income_list = res.data.data.results
              that.total = res.data.data.count;
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //筛选条件--是否集团码
      screen() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/money_type/info_list",
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
          url: that.url + "/v1/finance/money_type/info_list",
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
          url: that.url + "/v1/finance/money_type/info_list",
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
      //点击分页上的页数
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/money_type/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize
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
            url: that.url + "/v1/finance/money_type/remove/" + id,
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
        that.id = id;
        console.log(srow);
        //  入账代码的内容
        that.exchange_rate = srow.exchange_rate, //收支
          that.param.desc = srow.desc,//中文描述
          that.param.desc_en = srow.desc_en,//英文描述
          that.param.code = srow.code,//代码
          that.param.name = srow.name,//币种名称
          that.is_sys = srow.is_sys + "",//是否系统码
          that.is_group = srow.is_group + "",//是否集团码
          that.is_halt = srow.is_halt + ""//是否停用


      },
      //点击入账代码新增和修改后的保存
      ensure() {
        let that = this;
        let urldata = that.Edite ? (that.url + "/v1/finance/money_type/update/" + that.id) : (that.url + "/v1/finance/money_type/add");
        console.info(urldata);
        that.$axios({
          url: urldata,
          method: "post",
          data: {
            //  入账代码的内容
            exchange_rate: that.param.exchange_rate, //币种汇率
            desc: that.param.desc,//中文描述
            desc_en: that.param.desc_en,//英文描述
            name: that.param.name,//币种名称
            code: that.param.code,//代码
            is_sys: that.is_sys + "",//是否系统码
            is_group: that.is_group + "",//是否集团码
            is_halt: that.is_halt + ""//是否停用
          },

        })
          .then(res => {
            if (res.data.message == "success") {
              that.enter_code();
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

      //修改页面的显示和隐藏
      handleClose(done) {

        done();
      }
    }
  }
</script>

<style lang="less" scoped>
  .currency {
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
      overflow: hidden;
      li {
        float: left;
        width: 50%;
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
  /*.el-table .cell{*/
  /*text-align:center;*/
  /*}*/
  /*.el-table--border::after, .el-table--group::after, .el-table::before{*/
  /*z-index: 0;*/
  /*}*/
</style>
