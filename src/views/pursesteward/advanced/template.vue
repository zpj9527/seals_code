<template>
  <div class="template">
    <!--支付方式 -->
    <div class="shopping">
      <div class="head" style="width: 100%;margin-bottom: 10px">
        <span
          style="vertical-align: top;display: inline-block;margin-left: 10px;margin-top: 4px;margin-right: 10px;font-size: 16px">付款方式模板设置</span>
        <el-button type="primary" @click="dialogVisible = true;flush();classes_add()" class="btn" :disabled="isDisabled"
                   style="width: 80px;height: 24px;line-height: 1px;margin-top:4px;"
                   data-code="/v1/manage/duty_shift/add">
          <!--<img src="../../../../src/assets/images/internal-store-control/add.png" alt="" style="margin-top: 18px">-->
          新增
        </el-button>
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
          <el-table-column
            prop="name"
            fixed="left"
            label="名称">
          </el-table-column>
          <el-table-column
            prop="pub_usage.name"
            label="类型">
          </el-table-column>
          <el-table-column
            prop="pub_app_id"
            label="app_id">
          </el-table-column>
          <el-table-column
            prop="pub_app_secret"
            label="app_secret">
          </el-table-column>
          <el-table-column
            prop="pub_app_key"
            label="app_key">
          </el-table-column>
          <el-table-column
            prop="pay_mch_id"
            label="支付商户号">
          </el-table-column>
          <el-table-column
            prop="pay_api_key"
            label="支付密钥">
          </el-table-column>
          <el-table-column
            prop="server_ip"
            label="账单服务器IP">
          </el-table-column>
          <el-table-column
            prop="server_domain"
            width="150"
            label="支付结果通知域名">
          </el-table-column>
          <el-table-column
            prop="address"
            width="150 "
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button :disabled="show_hide_delete" size="mini" type="danger"
                         @click="cancel(scope.row.id,scope.$index, income_list)">删除
              </el-button>
              <el-button :disabled="show_hide_update" size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
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
          <span class="dialog_style_title-name"> {{ title }}</span>
        </div>
        <ul class="dialog_style">
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>类型 ：</span>
            <el-select v-model="pub_usage" placeholder="请选择" style="width: 220px;" size="mini" @change="wechat_click">
              <el-option
                v-for="item in wechat_type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>名称 ：</span>
            <el-input v-model="param.name" placeholder="请输入名称" clearable style="width: 220px;" size="mini"></el-input>
          </li>
          <li>
            <i style="color: red;font-size: 18px">*</i>
            <span>app_id ：</span>
            <el-input v-model="param.pub_app_id" placeholder="请输入公众号app_id" style="width: 220px;" size="mini"
                      clearable></el-input>
          </li>

          <template v-if="add_wechat">
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>支付商户号 ：</span>
              <el-input v-model="param.pay_mch_id" placeholder="请输入mch_id" style="width: 220px;" size="mini"
                        clearable></el-input>

            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>支付密钥 ：</span>
              <el-input v-model="param.pay_api_key" placeholder="请输入api_key" style="width: 220px;" size="mini"
                        clearable></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>账单服务器IP ：</span>
              <el-input v-model="param.server_ip" placeholder="请输入账单服务器IP" style="width: 220px;" size="mini"
                        clearable></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>支付结果通知域名 ：</span>
              <el-input v-model="param.server_domain" placeholder="请输入支付结果通知域名" style="width: 220px;" size="mini"
                        clearable></el-input>
            </li>
            <!--<li>-->
            <!--<i style="color: red;font-size: 18px">*</i>-->
            <!--<span>SSL证书文件 ：</span>-->
            <!--<el-input v-model="param.ssl_cert_file" placeholder="请输入SSL证书文件" style="width: 220px;" size="mini" clearable></el-input>-->
            <!--</li>-->
            <!--<li>-->
            <!--<i style="color: red;font-size: 18px">*</i>-->
            <!--<span>SSL密钥文件 ：</span>-->
            <!--<el-input v-model="param.ssl_key_file" placeholder="请输入SSL密钥文件" style="width: 220px;" size="mini" clearable></el-input>-->

            <!--</li>-->
          </template>
          <template v-else>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>app_key ：</span>
              <el-input v-model="param.pub_app_key" placeholder="请输入公众号app_key" style="width: 220px;" size="mini"
                        clearable></el-input>
            </li>
            <li>
              <i style="color: red;font-size: 18px">*</i>
              <span>app_secret ：</span>
              <el-input v-model="param.pub_app_secret" placeholder="请输入公众号app_secret" style="width: 220px;" size="mini"
                        clearable></el-input>
            </li>
          </template>

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
    name: "template",
    data() {
      return {
        // "http://47.98.113.173:9530"
        url: this.api.api_9530_9503,
        title: '',
        add_wechat: false,//判断是不是支付类型
        //分页
        total: 10,
        pagesize: 10,
        cur_page: 1,
        dialogVisible: false,//修改页面的显示和隐藏
        income_list: [],//微信配置列表
        wechat_type: [
          {
            value: '0',
            label: '支付'
          },
          {
            value: '1',
            label: '公众号'
          },
          {
            value: '2',
            label: '小程序'
          },

        ],//微信类型
        id: "",//选中修改项的id
        Edite: true, //标志位 判断的是新增还是更新
        tips: false,
        param: {},//新增入账代码里的内容
        msg: 6,
        // 微信配置的内容
        server_ip: '',//生成微信账单的服务器IP
        name: '',//名称
        pub_usage: '',//类型
        pub_app_id: '',//app_id
        pub_app_key: '',//app_key
        pub_app_secret: '',//app_secret
        pay_api_key: "",//支付密钥
        pay_mch_id: '',//支付商户号
        server_domain: '',//支付结果通知域名
        ssl_key_file: '',//密钥


        show_hide_delete: false,//判断删除按钮是否显示
        show_hide_update: false,//判断修改按钮是否显示
        isDisabled: false,//新增是否显示
        key_index: '',
      }
    },
    created: function () {
      let that = this;
      // that.authorization = sessionStorage.getItem("authorization");
      that.enter_code();//获取入账代码

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
        that.add_wechat = false;
        that.param = {
          server_ip: '',//生成微信账单的服务器IP
          name: '',//名称
          pub_app_id: '',//app_id
          pub_app_key: '',//app_key
          pub_app_secret: '',//app_secret
          pay_api_key: "",//支付密钥
          pay_mch_id: '',//支付商户号
          server_domain: '',//支付结果通知域名
        }
        that.pub_usage = '1'

      },
      /**选择类型*/
      wechat_click(value) {
        let that = this;
        console.log(value);
        if (value === '0') {
          that.add_wechat = true;
        } else {
          that.add_wechat = false;
        }
      },
      //封装获取付款方式模板设置
      enter_code() {
        let that = this
        that.$axios({
          url: that.url + "/v1/payment/weixin_config/list",
          method: "get",
          params: {
            page_num: that.cur_page,
          }
        })
          .then(res => {
            console.log(res.data.message)
            if (res.data.message === "success") {
              console.log(res)
              that.man_list = res.data.data.list;
              console.log(that.man_list);
              // let show_delete = "/v1/manage/duty_shift/delete";
              //  let show_update ="/v1/manage/duty_shift/update";
              //  let show_add = "/v1/manage/duty_shift/add";
              //   let rules = JSON.parse(sessionStorage.getItem("rules"));
              //   console.log(rules);
              //   Object.keys(rules.内控宝).forEach(function (key, index) {
              //     if(key===that.$route.path){
              //       console.log(key,index);
              //       that.key_index=key;
              //       console.log(rules.内控宝[that.key_index]);
              //
              //     }
              //   });
              // Object.keys(rules.内控宝[that.key_index]).forEach(function (key,index) {
              //   console.log(key);
              //   console.log(show_delete);
              //   //这俩判断按钮能不能显示
              //   if(show_add===key){
              //     console.log(1);
              //     that.isDisabled=false//新增是否显示
              //   }else {
              //     that.isDisabled=true//新增是否显示
              //   }
              //   if(show_delete===key){
              //     that.show_hide_delete=false
              //   }else {
              //     that.show_hide_delete=true
              //   }
              //   if(show_update===key){
              //     that.show_hide_update=false
              //   }else {
              //     that.show_hide_update=true
              //   }
              //
              // })


              // if(that.itemList[i].projectName!=="权限管理"&&that.itemList[i].projectName!=="模块树"){
              //   navigation_list.push(that.itemList[i])
              // }
              // let  keys =JSON.parse(sessionStorage.getItem("rules"))  ;//反序列化取出存储的序列化对象
              // console.log(JSON.stringify(keys));
              // if(JSON.stringify(keys) !== "{}" && keys !==null){
              //   let page_path =this.$route.path;
              //   let keys_path = keys[page_path];
              //   console.log(page_path);
              //   let show_delete = keys_path["/v1/manage/duty_shift/delete"];
              //   let show_update = keys_path["/v1/manage/duty_shift/update"];
              //   for(let item of  this.man_list){
              //     let  source = { show_hide_delete: show_delete, show_hide_update: show_update};
              //     let returnedTarget = Object.assign(item, source);
              //     console.log( returnedTarget);
              //     this.income_list.push(item);
              //     console.log(this.income_list);
              //     //取出需要的字段并赋值到data的字段里
              //     for(let i in this.income_list){
              //       if(this.income_list[i].show_hide_delete===1){
              //         this.show_hide_delete=false;
              //       }else {
              //         this.show_hide_delete=true;
              //       };
              //       if(this.income_list[i].show_hide_update===1){
              //         this.show_hide_update=false;
              //       }else {
              //         this.show_hide_update=true;
              //       };
              //
              //
              //     }
              //   }
              // }
              // else if(keys ===null){
              //   this.income_list=res.data.data.list;
              // } else {
              //   this.income_list=res.data.data.list;
              //   this.show_hide_delete=true;//判断删除按钮是否显示
              //   this.show_hide_update=true;//判断修改按钮是否显示
              //   this.isDisabled=true;//新增是否显示
              // }
              that.income_list = res.data.data.list
              that.total = res.data.data.total_count;
              // that.init_btn();
            }
            else {
              // that.error_message(res.data.message)
              console.log(res.data.message);
            }

          })
          .catch(error => {
            console.log(error);
          });

      },
      //点击分页上的页数
      handleCurrentChange(curPage) {
        let that = this;
        that.cur_page = curPage;
        console.log(curPage) // 当前页}
        //获取信息列表
        that.$axios({
          url: "" + that.url + "/v1/payment/weixin_config/list",
          method: "get",
          params: {
            page_num: curPage,
            page_size: that.pagesize
          },

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.income_list = res.data.data.list
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
            url: "" + that.url + "/v1/payment/weixin_config/delete/" + id,
            method: "get",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                that.enter_code();
                that.total = 10;
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
      //点击新增
      classes_add() {
        let that = this;
        that.title = "新增微信配置"
      },
      //点击修改
      amend(srow, id, index, list) {
        let that = this;
        that.Edite = true;
        that.id = srow.id;
        console.log(srow);
        that.title = "修改微信配置"
        // server_ip:'',//生成微信账单的服务器IP
        // name:'',//名称
        // pub_app_id:'',//app_id
        // pub_app_key:'',//app_key
        // pub_app_secret:'',//app_secret
        // pay_api_key:"",//支付密钥
        // pay_mch_id:'',//支付商户号
        // server_domain:'',//支付结果通知域名
        //
        if (srow.pub_usage.id === 0) {
          console.log(1);
          that.param.name = srow.name;
          that.pub_usage = srow.pub_usage.id + "";
          that.add_wechat = true
          that.param.pub_app_id = srow.pub_app_id;
          that.param.pay_mch_id = srow.pay_mch_id;
          that.param.pay_api_key = srow.pay_api_key;
          that.param.server_ip = srow.server_ip;
          that.param.server_domain = srow.server_domain;
        } else {
          console.log(0);
          that.param.name = srow.name;
          that.pub_usage = srow.pub_usage.id + "";
          that.add_wechat = false
          that.param.pub_app_id = srow.pub_app_id;
          that.param.pub_app_key = srow.pub_app_key;
          that.param.pub_app_secret = srow.pub_app_secret;
        }


      },
      //点击微信配置新增和修改后的保存
      ensure() {
        let that = this;
        if (that.add_wechat === false) {
          if (!that.param.name || !that.param.pub_app_id || !that.param.pub_app_key || !that.param.pub_app_secret) {
            that.hintInfo("warning", "*为必填项")
          } else {
            let urldata = that.Edite ? (that.url + "/v1/payment/weixin_config/update/" + that.id) : ("" + that.url + "/v1/payment/weixin_config/add");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                //  入账代码的内容
                name: that.param.name,//名称
                pub_usage: that.pub_usage + "",//类型
                pub_app_id: that.param.pub_app_id,//pub_app_id:
                pub_app_key: that.param.pub_app_key,//pub_app_key
                pub_app_secret: that.param.pub_app_secret,//终止时间

              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  that.enter_code();
                  that.dialogVisible = false;
                  if (that.Edite) {
                    that.hintInfo("success", "修改微信配置成功")
                  } else {
                    that.hintInfo("success", "新增微信配置成功")
                  }
                  that.total = 10;
                  that.$emit('func', that.msg)
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
        }
        else {
          if (!that.param.name || !that.param.pub_app_id || !that.param.pay_mch_id || !that.param.pay_api_key || !that.param.server_domain || !that.param.server_ip) {
            that.hintInfo("warning", "*为必填项")
          } else {
            let urldata = that.Edite ? (that.url + "/v1/payment/weixin_config/update/" + that.id) : (that.url + "/v1/payment/weixin_config/add");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                //  入账代码的内容
                name: that.param.name,//名称
                pub_usage: that.pub_usage + "",//类型
                pub_app_id: that.param.pub_app_id,//pub_app_id:
                pay_mch_id: that.param.pay_mch_id,//支付商户号
                pay_api_key: that.param.pay_api_key,//支付密钥
                server_domain: that.param.server_domain,
                server_ip: that.param.server_ip,
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  that.enter_code();
                  that.dialogVisible = false;
                  if (that.Edite) {
                    that.hintInfo("success", "修改微信配置成功")
                  } else {
                    that.hintInfo("success", "新增微信配置成功")
                  }
                  that.total = 10;
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
      /**
       * 给静态按钮设置权限
       *
       * */

      init_btn: function () {
        let that = this;
        let keys = JSON.parse(sessionStorage.getItem("rules"));//反序列化取出存储的序列化对象
        let page_path = "/#" + that.$route.path;
        let keys_path = keys[page_path];
        console.log(keys_path)
        //取出所有按钮的code
        if (keys) {
          let elementList = document.querySelectorAll(".btn");
          for (let item of elementList) {
            Object.keys(keys_path).forEach(function (key) {
              console.log(item.dataset.code, key);
              if (item.dataset.code === key) {
                console.log(55);
                item.dataset.code = keys_path[key];
                console.log(item.dataset.code);
                that.isDisabled = parseInt(item.dataset.code);
                if (that.isDisabled === 1) {
                  that.isDisabled = false;
                } else {
                  that.isDisabled = true;
                }
              }

            });

          }
        } else {
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .template {
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
        /*float: left;*/
        /*width: 50%;*/
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 130px;
        }
      }
    }
  }
</style>
