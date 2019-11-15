<template>
  <div class="entry-value">
    <!--支付方式 -->
    <div class="shopping">
      <div style="position: relative">
        <span
          style="vertical-align: top;display: inline-block;line-height: 35px;padding:10px;font-weight: bold;cursor:pointer"
          @click="screen_all">入账代码</span>
        <el-button type="primary" @click="flush();add_title()" size="mini"
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
          :data="income_list"
          size="mini"
          max-height="700"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
          style="width: 100%;">
          <el-table-column
            prop="name"
            width="150"
            label="入账代码名称">
          </el-table-column>
          <el-table-column
            prop="in_or_out"
            label="收/支">
            <template slot-scope="scope">
              <span v-if="scope.row.in_or_out === 'in'">收</span>
              <span v-else-if="scope.row.in_or_out === 'out'">支</span>
              <span v-else>收/支</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="code"
            label="代码">
          </el-table-column>
          <el-table-column
            prop="desc"
            width="180"
            label="中文描述">
          </el-table-column>
          <!--<el-table-column-->
          <!--prop="desc_en"-->
          <!--label="英文描述">-->
          <!--</el-table-column>-->
          <!--<el-table-column-->
          <!--prop="app_id.name"-->
          <!--label="所属模块">-->
          <!--</el-table-column>-->
          <el-table-column
            prop="belong_to_balance.name"
            label="所属部门">
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
          <!--<el-table-column-->
          <!--prop="is_halt "-->
          <!--label="停用">-->
          <!--<template slot-scope="scope">-->
          <!--<span v-if="scope.row.is_halt === 0">否</span>-->
          <!--<span v-else>是</span>-->
          <!--</template>-->
          <!--</el-table-column>-->
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
              <el-button size="mini" type="danger" @click="cancel(scope.row,scope.row.id,scope.$index, income_list)"
                        >删除
              </el-button>
              <el-button size="mini"
                         @click="amend(scope.row,scope.row.id,scope.$index, income_list) " >修改
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
            <span>收付款原因 ：</span>
            <el-select v-model="in_out" placeholder="请选择" style="width: 200px;" size="mini" @change="in_out_type">
              <el-option
                v-for="item in in_out_list"
                :key="item.id"
                :label="item.name"
                :value="item.id +','+ item.in_or_out">
              </el-option>
            </el-select>
          </li>
          <li>
            <span style="margin-left: 10px">收支 ：</span>
            <el-radio v-model="in_or_out" disabled label="in">收</el-radio>
            <el-radio v-model="in_or_out" disabled label="out">支</el-radio>
            <el-radio v-model="in_or_out" disabled label="in/out">收/支</el-radio>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>入账代码名称 ：</span>
            <el-input v-model="param.name" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>

          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>代码 ：</span>
            <el-input v-model="param.code" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>

          <li>
            <span style="margin-left: 10px">中文描述 ：</span>
            <el-input v-model="param.desc" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>
          </li>
          <!--<li>-->
          <!--<span style="margin-left: 10px">英文描述 ：</span>-->
          <!--<el-input v-model="param.desc_en" placeholder="请输入内容" style="width: 200px;" size="mini"></el-input>-->
          <!--</li>-->
          <li v-show="group">
            <span style="margin-left: 10px">所属酒店 ：</span>
            <el-select v-model="hotel_id" placeholder="请选择" size="mini" style="width: 200px;" @change="hotel_change">
              <el-option
                v-for="item in hotel_list"
                :key="item.value"
                :label="item.full_name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>
          <li>
            <span style="margin-left: 10px">所属部门 ：</span>
            <el-select v-model="belong_to_balance" placeholder="请选择" style="width: 200px;" size="mini" @focus="balance_focus">
              <el-option
                v-for="item in dept_list"
                :key="item.value"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </li>

          <li v-show="sys" style="margin-left: 10px">
            <span>系统码 ：</span>
            <el-radio v-model="is_sys" label="1">是</el-radio>
            <el-radio v-model="is_sys" label="0">否</el-radio>
          </li>
          <li v-show="group" style="margin-left: 10px">
            <span>集团码 ：</span>
            <el-radio v-model="is_group" label="1">是</el-radio>
            <el-radio v-model="is_group" label="0">否</el-radio>
          </li>

          <!--<li>-->
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <!--<span>停用 ：</span>-->
          <!--<el-radio v-model="is_halt" label="1">是</el-radio>-->
          <!--<el-radio v-model="is_halt" label="0">否</el-radio>-->

          <!--</li>-->
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
    name: "entry-value",
    data() {
      return {
        url: this.api.api_9022_9519,
        title: '',
        //分页
        total: 10,
        pagesize: 10,
        cur_page: 1,
        dialogVisible: false,//修改页面的显示和隐藏
        //收支
        in_out: "",
        income_list: [],//入账代码
        in_out_list: [],//获取收付款原因
        // app_list:[],//模块
        dept_list: [],//部门
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新

        param: {},//新增入账代码里的内容
        //筛选条件
        is_syss: false,//是否系统码
        is_groups: false,//是否集团码
        is_halts: false,//是否停用
        //  入账代码的内容
        in_or_out: '', //收支
        desc: '',//中文描述
        // desc_en:'',//英文描述
        // app_id:'',//所属模块
        code: '',//代码
        name: '',//入账代码名称
        is_sys: 1,//是否系统码
        is_group: 1,//是否集团码
        belong_to_balance: '',//归属部门
        group:true,//判断是否显示集团码
        sys:true,//判断是否显示系统码
        hotel_id:'',
        hotel_list:[],
      }
    },
    created: function () {
      let that = this;
      that.in_out_data();//获取付款原因
      that.enter_code();//获取入账代码
      that.hotel();
    },
    methods: {
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      //查看部门信息
      examine() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/dept/info_list",
          method: "get",
          params: {
            hotel_id:that.hotel_id,
            page_size: 999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.dept_list = res.data.data.list;
            }
            else {
              console.log(res.data.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取付款原因
      in_out_data() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/code_pay_for/info_list",
          method: "get",
          params: {
            page_size: 999
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.in_out_list = res.data.data.list;
            }
            else {
              console.log(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //选则的收付款原因
      in_out_type(value) {
        console.log(value);
        let that = this;
        let arr = value.split(",");
        console.log(arr[1]);
        that.in_or_out = arr[1]
      },
      //封装查询集团下有哪些app
      demandApp() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/app/info_list",
          method: "post",

        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res)
              // 遍历拿到所需要APP
              that.app_list = res.data.data.list;

            }
            else {
              that.error(res.data.message)
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          })

      },
      //封装获取酒店的信息
      hotel() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/hotel/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              that.hotel_list = res.data.data.list;
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
      /**选择酒店事件*/
      hotel_change(val){
        let that =this;
        if(val){
          that.hotel_id=val;
          that.examine();
        }
      },
      /**选择部门获取焦点*/
      balance_focus(){
        let that =this;
        if(that.hotel_id===""){
          that.hintInfo("warning", "请选择酒店")
        }
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
          // desc_en:'',//英文描述
          code: '',//代码
          create_time: '',//创建时间
          create_user: '',//创建用户
          modify_time: '',//修改时间
          modify_user: "",//修改用户
          name: '',//入账代码名称

        }
        that.is_sys = '';//是否系统码
        that.is_group = "";//是否集团码
        that.belong_to_balance = '';//归属部门
        // that.is_halt='0',//是否停用
        // that.app_id='',//所属模块
        that.in_or_out = '';//收支
        that.in_out = "";
        that.hotel_id=''
      },
      //筛选条件--是否集团码
      screen() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/incoming_account_code/info_list",
          method: "post",
          data: {
            is_group: that.is_groups ? 1 : 0,
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
      //筛选条件--是否系统码
      screen_sys() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/incoming_account_code/info_list",
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
      //全部入帐代码
      screen_all() {
        let that = this;
        that.enter_code();
        that.is_syss = '';
        that.is_groups = '';
      },
      //封装获取入账代码
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_num: that.cur_page,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              // let arr_sys=[],arr_group=[],arr=[];
              // for(let item of res.data.data.list){
              //   if(item.is_sys===1){
              //     arr_sys.push(item)
              //   }
              //   if(item.is_sys===1 || item.is_group===1){
              //     arr_group.push(item)
              //   }
              //   if(item.is_sys===0 || item.is_group===0 || item.is_sys===1 || item.is_group===1){
              //     arr.push(item);
              //   }
              // }
              // // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
              // let root_level = parseInt(sessionStorage.getItem("root_level"));
              // console.log(root_level,arr);
              // if(root_level===1){
              //   that.income_list = arr_sys
              // }else if(root_level===1){
              //   that.income_list = arr_group
              // }else {
              //   that.income_list = arr
              // }
              that.income_list = res.data.data.list;
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
          url: that.url + "/v1/finance/incoming_account_code/info_list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize,
            // is_group: that.is_groups ? 1 : 0,
            // is_sys: that.is_syss ? 1 : 0,
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.income_list = res.data.data.list
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
      cancel(srow,id, index, list) {
        console.log(id);
        console.log(index);
        console.log(list);
        let that = this;
        // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
        let root_level = parseInt(sessionStorage.getItem("root_level"));
         if(srow.is_sys===1){
           if(root_level===1){
             that.cancel_remove(srow,id, index, list)
           }else {
             that.hintInfo("warning", "权限不足")
           }
         }else if(srow.is_group===1){
           if(root_level===2){
             that.cancel_remove(srow,id, index, list)
           }else {
             that.hintInfo("warning", "权限不足")
           }
         }else {
           that.cancel_remove(srow,id, index, list);
         }

      },
      /**封装删除函数*/
      cancel_remove(srow,id, index, list){
        let that =this;
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
            url: that.url + "/v1/finance/incoming_account_code/remove/" + id,
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
        that.hotel();
        // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if(srow.is_group===1){
          if( root_level===2){
            that.group=true;
            that.sys=false;
            that.Edite = true;
            that.dialogVisible = true;
          }else {
            that.hintInfo("warning", "权限不足")
          }
        }else if(srow.is_sys===1) {
          if( root_level===1){
            that.group=false;
            that.sys=true;
            that.Edite = true;
            that.dialogVisible = true;
          }else {
            that.hintInfo("warning", "权限不足")
          }
        }else if(srow.is_sys===0 && srow.is_group===0){
          that.group=false;
          that.sys=false;
          that.Edite = true;
          that.dialogVisible = true;
        }
        that.Edite = true;
        that.id = id;
        console.log(srow);
        that.title = "修改入账代码"
        //  入账代码的内容
        that.in_or_out = srow.in_or_out; //收支
        that.in_out = srow.code_pay_for.id + ',' + srow.in_or_out;
        that.param.desc = srow.desc;//中文描述
        that.param.code = srow.code,//代码
          that.param.name = srow.name,//入账代码名称
          that.is_sys = srow.is_sys + "",//是否系统码
          that.is_group = srow.is_group + ""//是否集团码
          that.hotel_id = srow.hotel_id.id;
          if(srow.hotel_id.id){
            that.examine();
          }
        if (srow.belong_to_balance === null) {
          that.belong_to_balance = srow.belong_to_balance //归属部门
        } else {
          that.belong_to_balance = srow.belong_to_balance.id//归属部门
        }
      },
      /**新增入账代码*/
      add_title() {
        let that = this;
        // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        that.hotel();
        if(root_level===1){
          that.group=false;
          that.sys=true;
          that.is_sys="1";
          that.is_group="0"
          that.dialogVisible = true;
          that.title = "新增入账代码";
        }else if(root_level===2){
          that.sys=false;
          that.group=true;
          that.is_sys="0";
          that.is_group="1";
          that.dialogVisible = true;
          that.title = "新增入账代码";
        }else {
          that.sys=false;
          that.group=false;
          that.is_sys="0";
          that.is_group="0";
          that.dialogVisible = true;
          that.title = "新增入账代码";
        }
      },
      //点击入账代码新增和修改后的保存
      ensure() {
        let that = this;
        // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        if (!that.in_out || !that.param.code || !that.param.name ) {
          that.hintInfo("warning", "*为必填项")
        } else {
          let arr = that.in_out.split(",");
          that.in_out = arr[0]
          let urldata = that.Edite ? (that.url + "/v1/finance/incoming_account_code/update/" + that.id) : (that.url + "/v1/finance/incoming_account_code/add");
          console.info(urldata);
          that.$axios({
            url: urldata,
            method: "post",
            data: {
              //  入账代码的内容
              // subject:that.subject,//科目
              in_or_out: that.in_or_out, //收支
              desc: that.param.desc,//中文描述
              code_pay_for: that.in_out,//收付款原因
              // desc_en: that.param.desc_en,//英文描述
              // app_id: that.app_id,//所属模块
              code: that.param.code,//代码
              name: that.param.name,//入账代码
              is_sys: that.is_sys,//是否系统码
              is_group: that.is_group,//是否集团码
              hotel_id:that.hotel_id,
              belong_to_balance: that.belong_to_balance,//归属部门
              // is_halt: that.is_halt + ""//是否停用
            },

          })
            .then(res => {
              if (res.data.message === "success") {
                that.enter_code();
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
                  that.hintInfo("warning", "修改失败:"+res.data.message)
                } else {
                  that.hintInfo("warning", "新增失败:"+res.data.message)
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
  .entry-value {
    width: 95%;
    height: 95%;
    margin: 1%;
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
