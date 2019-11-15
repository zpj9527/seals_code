<template>
  <div class="obligation">
    <!--支付方式 -->
    <div class="shopping">
      <div style="position: relative">
        <span
          style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;cursor:pointer;font-size: 18px"
          @click="screen_all">角色职责</span>
        <el-button type="primary" @click="dialogVisible = true;flush();add_title()" size="mini"
                   style="margin-top: 14px;width: 80px;">
          新增
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" >-->
        </el-button>
        <div style="position: absolute;top: 18px;left: 200px">
          <el-checkbox v-model="is_groups" @change="screen">集团码</el-checkbox>
          <el-checkbox v-model="is_syss" @change="screen_sys">系统码</el-checkbox>
          <!--<el-checkbox v-model="is_halts" @change="screen_halt">停用</el-checkbox>-->
        </div>

      </div>
      <!--账户种类 状态 ... -->
      <div class="status">
        <el-table
          :data="responsibility_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="service_type.desc"
            width="150"
            label="服务类型">
          </el-table-column>
          <el-table-column
            prop="desc"
            label="职责说明">
          </el-table-column>
          <el-table-column
            prop="is_group "
            width="120"
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
            prop="modify_user.real_name"
            label="修改用户">
          </el-table-column>

          <el-table-column
            prop="address"
            width="180 "
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, responsibility_list)"
                         v-if="scope.row.is_sys === 1" disabled>删除
              </el-button>
              <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, responsibility_list)"
                         v-else>删除
              </el-button>
              <el-button size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, responsibility_list) "
                         v-if="scope.row.is_sys === 1" disabled>修改
              </el-button>
              <el-button size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, responsibility_list) "
                         v-else>修改
              </el-button>
            </template>
          </el-table-column>

        </el-table>

        <!--分页-->
        <el-pagination style="float: right;margin-right: 2%"
                       layout="prev, pager, next"
                       :page-size="page_size"
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
            <span><i style="color: red;font-size: 18px">*</i>服务类型 ：</span>
            <el-select v-model="service_type" placeholder="请选择" style="width: 200px;" size="mini" >
              <el-option
                v-for="item in mission_list"
                :key="item.id"
                :label="item.descript"
                :value="item.id">
              </el-option>
            </el-select>
          </li>

          <li>
            <span ><i style="color: red;font-size: 18px">*</i>职责说明 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>

          <li>
            <span>系统码 ：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li>

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
        name: "obligation",
        data() {
          return {
            url: this.api.api_9022_9519,
            title: '',
            //分页
            total: 10,
            page_size: 10,
            cur_page: 1,
            dialogVisible: false,//修改页面的显示和隐藏
            //角色职责
            responsibility_list:[],
            mission_list: [],//获取服务类型
            id: "",//选中修改项的id
            Edite: true, //标志位 判断的是新增还是更新

            param: {},//新增角色职责里的内容
            //筛选条件
            is_syss: false,//是否系统码
            is_groups: false,//是否集团码
            //  角色职责的内容
            service_type:'',//服务类型
            desc: '',//备注
            is_sys: 1,//是否系统码
            is_group: 1,//是否集团码

          }
        },
        created: function () {
          let that = this;
          that.responsibility();//获取付款原因
           that.enter_code();//获取任务
        },
        methods: {
          //封装错误信息
          error_message(msg) {
            this.$message.error('错了哦，错误消息为' + msg);
          },

          //封装获取角色职责
          responsibility() {
            let that = this;
            that.$axios({
              url: that.url + "/v1/common/role_duty/info_list",
              method: "get",
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res.data.data);
                  that.responsibility_list = res.data.data.list;
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
          //全部角色职责
          screen_all(){
            let that=this;
            that.mission_data();
            that.is_syss= "";//是否系统码
            that.is_groups= "";//是否集团码
          },
          //封装获取任务体系
          enter_code() {
            let that = this;
            that.$axios({
              url: that.api.api_code_9103 + "/v1/system/settings/get_code_base_list/?parent_code=mission",
              method: "get",
              params:{
                page_size:999
              }
            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res.data.data)
                  that.mission_list = res.data.data.results;
                }
                else {
                  that.error_message(res.data.message)
                }

              })
              .catch(error => {
                console.log(error);
              });
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
            }
            that.is_sys = '1';//是否系统码
            that.is_group = "1";//是否集团码
            that.service_type="";//服务类型
          },
          //筛选条件--是否集团码
          screen() {
            let that = this
            that.$axios({
              url: that.url + "/v1/common/role_duty/info_list",
              method: "post",
              data: {
                is_group: that.is_groups ? 1 : 0,
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res.data.data)
                  that.mission_list = res.data.data.list
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
              url: that.url + "/v1/common/role_duty/info_list",
              method: "post",
              data: {
                is_sys: that.is_syss ? 1 : 0,
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res.data.data)
                  that.mission_list = res.data.data.list
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
              url: that.url + "/v1/common/role_duty/info_list",
              method: "get",
              params: {
                page_num: curPage,
                page_size: that.pagesize
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  console.log(res);
                  that.mission_list = res.data.data.list
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
                url: that.url + "/v1/common/role_duty/remove/" + id,
                method: "get",
              })
                .then(res => {
                  console.log(res)
                  if (res.data.message === "success") {
                    that.responsibility();
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
            that.title = "修改角色职责"
            //  入账代码的内容
            that.service_type = srow.service_type.id;
            that.param.desc = srow.desc;//中文描述
              that.is_sys = srow.is_sys + "",//是否系统码
              that.is_group = srow.is_group + ""//是否集团码


          },
          //新增
          add_title() {
            let that = this;
            that.title = "新增角色职责"
          },
          //点击角色职责新增和修改后的保存
          ensure() {
            let that = this;
            if (  !that.service_type  ||!that.param.desc) {
              that.hintInfo("warning", "*为必填项")
            } else {
              let urldata = that.Edite ? (that.url + "/v1/common/role_duty/update/" + that.id) : (that.url + "/v1/common/role_duty/add");
              console.info(urldata);
              that.$axios({
                url: urldata,
                method: "post",
                data: {
                  desc: that.param.desc,//中文描述
                  service_type: that.service_type,//服务类型
                  is_sys: that.is_sys,//是否系统码
                  is_group: that.is_group,//是否集团码
                },
              })
                .then(res => {
                  if (res.data.message === "success") {
                    that.responsibility();
                    that.dialogVisible = false;
                    if (that.Edite) {
                      that.hintInfo("success", "修改成功")
                    } else {
                      that.hintInfo("success", "新增成功")
                    }

                  }
                  else {
                    console.log(res.data.message);
                    if (that.Edite) {
                      that.hintInfo("warning", "修改失败，请刷新后重试")
                    } else {
                      that.hintInfo("warning", "新增失败，请刷新后重试")
                    }
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
  .obligation {
    width: 99%;
    height: 95%;
    margin-left: 10px;
    background: white;
    overflow: inherit;
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
      margin-left: 20px;
      /*overflow: hidden;*/
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
</style>
