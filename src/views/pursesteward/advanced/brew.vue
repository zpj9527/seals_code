<template>
  <div class="brew">
    <!--支付方式 -->
    <div class="shopping">
      <span
        style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold">冲调帐原因</span>
      <el-button type="primary" @click="dialogVisible = true;flush();add_title()" size="mini"
                 style="margin-top: 14px;width: 80px;">
        新增
        <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
      </el-button>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <!--<el-table-column-->
          <!--prop="code"-->
          <!--label="代码">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="desc"
            label="中文描述">
          </el-table-column>
          <el-table-column
            prop="desc_en"
            label="英文描述">
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
            prop="is_group "
            label="集团码">
            <template slot-scope="scope">
              <span v-if="scope.row.is_group === 0">否</span>
              <span v-else>是</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_user.user_name"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="create_time"
            width="150"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="modify_time"
            width="150"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="modify_user.user_name"
            label="修改用户">
          </el-table-column>

          <el-table-column
            prop="name"
            label="冲调帐原因">
            <template slot-scope="scope">
              <el-tag style="border: none;   background-color:transparent;color: #777777">{{scope.row.name}}</el-tag>
            </template>
          </el-table-column>

          <!--查帐原因-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="冲调帐原因 : ">
                  <span>{{ props.row.name }}</span>
                </el-form-item>

              </el-form>
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            width="180 "
            fixed="right"
            label="操作">
            <template slot-scope="scope">

              <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)"
                         v-if="scope.row.is_sys === 1" disabled>删除
              </el-button>
              <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, income_list)" v-else>删除
              </el-button>
              <el-button size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) "
                         v-if="scope.row.is_sys === 1" disabled>修改
              </el-button>
              <el-button size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) "
                         v-else >修改
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
            <i style="color: red;font-size: 18px">*</i>
            <span>中文描述 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>
          <li>
            <span style="margin-left: 10px">英文描述 ：</span>
            <el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>

          <li>
            <i style="color: red;font-size: 18px ;vertical-align: top">*</i>
            <span style="vertical-align: top">冲调帐原因 ：</span>
            <!--<el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;"></el-input>-->
            <textarea
              style="width: 200px; height: 100px;resize: none;     border: 1px solid #dcdfe6; border-radius: 4px"
              v-model="name "></textarea>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>系统码 ：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>

          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>集团码 ：</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "brew",
    data() {
      return {
        url: this.api.api_9022_9519,
        title: '',
        //分页
        total: 10,
        pagesize: 10,
        cur_page: 1,
        dialogVisible: false,//修改页面的显示和隐藏
        income_list: [],//查账原因列表
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        param: {},//新增查账里的内容

        //  查账原因的内容
        desc: '',//中文描述
        desc_en: '',//英文描述
        is_sys: 1,//是否系统码
        is_group: 1,//是否集团码
        create_time: '',//创建时间
        create_user: '',//创建用户
        modify_time: '',//修改时间
        modify_user: "",//修改用户
        name: '',//冲调账原因
        code: '',

      }
    },
    created: function () {
      let that = this;
      that.enter_code();//获取冲调帐原因
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
          create_time: '',//创建时间
          create_user: '',//创建用户
          modify_time: '',//修改时间
          modify_user: "",//修改用户
          code: '',//代码

        }
        that.is_sys = '1',//是否系统码
          that.is_group = "1",//是否集团码
          that.name = ''//查账原因

      },
      //封装获冲调账原因
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/arrange_account_reason/info_list",
          method: "get",
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
        that.cur_page = curPage;
        //获取信息列表
        that.$axios({
          url: that.url + "/v1/finance/arrange_account_reason/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize
          },
        })
          .then(res => {
            if (res.data.message == "success") {
              that.income_list = res.data.data.list
              // that.total=res.data.data.total_count;
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
            url: that.url + "/v1/finance/arrange_account_reason/remove/" + id,
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
      //点击修改
      amend(srow, id, index, list) {
        let that = this;
        that.Edite = true;
        that.id = id;
        console.log(srow);
        that.title = "修改冲调帐原因";
        //  入账代码的内容
        that.param.desc = srow.desc,//中文描述
          that.param.desc_en = srow.desc_en,//英文描述
          that.is_sys = srow.is_sys + "",//是否系统码
          that.is_group = srow.is_group + ""//是否集团码
        that.param.code = srow.code//code
        that.name = srow.name//查账原因
      },
      add_title() {
        let that = this;
        that.title = "新增冲调帐原因"
      },
      //查账原因的新增和修改后的保存
      ensure() {
        let that = this;
        if (!that.param.code || !that.is_sys || !that.is_group || !that.name || !that.param.desc) {
          that.hintInfo("warning", "*为必填项")
        } else {
          let urldata = that.Edite ? (that.url + "/v1/finance/arrange_account_reason/update/" + that.id) : (that.url + "/v1/finance/arrange_account_reason/add");
          console.info(urldata);
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              //  入账代码的内容
              code: that.param.code,
              desc: that.param.desc,//中文描述
              desc_en: that.param.desc_en,//英文描述
              is_sys: parseInt(that.is_sys),//是否系统码
              is_group: parseInt(that.is_group),//是否集团码
              name: that.name,//查账原因
            },

          })
            .then(res => {
              if (res.data.message == "success") {
                that.enter_code();
                that.dialogVisible = false;
                if (that.Edite) {
                  that.hintInfo("success", "修改冲调帐原因成功")
                } else {
                  that.hintInfo("success", "新增冲调帐原因成功")
                }
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
  .brew {
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
