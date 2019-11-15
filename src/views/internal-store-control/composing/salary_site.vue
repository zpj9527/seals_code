<template>
  <div class="salary_site">
    <!--支付方式 -->
    <div class="shopping">
      <div class="head" style="width: 100%;height: 40px;margin-top: 10px">
        <span style="vertical-align: top;display: inline-block;margin-left: 10px;margin-top: 4px;margin-right: 10px">考勤点设置列表</span>
        <el-button type="primary" @click="dialogVisible = true;flush();classes_add()" class="btn"
                   style="width: 80px;height: 24px;line-height: 1px" data-code="/v1/manage/duty_shift/add">
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
            label="考勤点">
          </el-table-column>
          <el-table-column
            prop="remark"
            label="备注">
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态">
            <template slot-scope="scope">
               <span v-if="scope.row.status===1">正常</span>
                <span v-else>停用 </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间">
          </el-table-column>
          <el-table-column
            prop="create_user.real_name"
            label="创建人">
          </el-table-column>
          <el-table-column
            prop="modify_time"
            label="修改时间">
          </el-table-column>
          <el-table-column
            prop="modify_user.real_name"
            label="修改人">
          </el-table-column>

          <el-table-column
            prop="address"
            width="300 "
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button  size="mini" type="danger"
                         @click="cancel(scope.row.id,scope.$index, income_list)">删除
              </el-button>
              <el-button  size="mini"
                         @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, income_list) ">修改
              </el-button>
              <el-button  size="mini" type="primary" plain
                          @click="drag = true;salary_code(scope.row,scope.row.id,scope.$index, income_list) ">考勤二维码
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
            <span><i style="color: red;font-size: 18px">*</i>考勤点 ：</span>
            <el-input v-model="param.name" placeholder="请输入中文描述" clearable style="width: 220px;"
                      size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>经度最大值 ：</span>
            <el-input v-model="param.longitude_max" placeholder="请输入经度最大值" clearable style="width: 220px;" size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>经度最小值 ：</span>
            <el-input v-model="param.longitude_min" placeholder="请输入经度最小值" clearable style="width: 220px;" size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>维度最大值 ：</span>
            <el-input v-model="param.latidue_max" placeholder="请输入维度最大值" clearable style="width: 220px;" size="mini"></el-input>
          </li>
          <li>
            <span><i style="color: red;font-size: 18px">*</i>维度最小值 ：</span>
            <el-input v-model="param.latitude_min" placeholder="请输入维度最小值" clearable style="width: 220px;" size="mini"></el-input>
          </li>
          <li>
            <span>状态 ：</span>
            <el-radio v-model="status" label="1">正常</el-radio>
            <el-radio v-model="status" label="0">停用</el-radio>

          </li>
          <li>
            <span >备注 ：</span>
            <textarea
              style="width: 220px; height: 100px;resize: none;vertical-align: top;border: 1px solid #dcdfe6;border-radius: 3px"
              v-model="param.remark"></textarea>
          </li>

          <!--<li>-->
          <!--<input class="pub_textAlign_right" placeholder="例如，${memoDate }" type="text" name="preLiveInDate" id="preLiveInDate" maxlength="50" readonly="readonly">-->
          <!--<input class="pub_textAlign_right" placeholder="（长期入住可不填）" type="text" name="preLeaveOutDate" id="preLeaveOutDate" maxlength="50" readonly="readonly">-->

          <!--</li>-->

        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
      </el-dialog>
       <!--二维码-->
      <el-dialog
        title="考勤二维码"
        :visible.sync="drag"
        :show-close='false'
        :close-on-click-modal='false'
        width="30%"
        :before-close="handleClose">
        <ul class="dialog_style">
          <li>
            <span>考勤点：</span>
            <div style="display: inline-block;width: 300px;height: 28px;line-height: 28px;border-bottom: 1px solid #eeeeee;color: green">{{salary_name}}</div>
          </li>
          <li>
            <div id="qrcode" ref="qrcode" style="display: inline-block;margin-left: 25%;margin-top: 20px"></div>
          </li>
        </ul>
        <span slot="footer" class="dialog-footer">
              <el-button @click="drag = false" size="mini" type="danger" plain>退出</el-button>
             </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import treeTransfer from 'el-tree-transfer';
  import QRCode from 'qrcodejs2'
    export default {
        name: "salary_site",
      data() {
        return {
          // "http://47.98.113.173:9530"
          url: this.api.api_9530_9503,
          title: '',
          //分页
          total: 10,
          pagesize: 10,
          cur_page: 1,//默认页
          dialogVisible: false,//修改页面的显示和隐藏
          id: "",//选中修改项的id
          Edite: true, //标志位 判断的是新增还是更新
          drag: false,//生成二维码的页面
          qr_id:"",//生成二维码时选中的考勤点
          salary_name:'',//点击的考勤点名称
          img_src:'',//二维码
          timer:null,//定时器
          param: {},//新增入账代码里的内容

          //  入账代码的内容
          income_list:[],
          name: '',//中文描述
          status:'',//状态
          remark:'',//备注
          longitude_min:'',//	经度最小值
          longitude_max:'',//经度最大值
          latitude_min:'',//	纬度最小值
          latidue_max:'',//	纬度最大值

        }
      },
      created: function () {
        let that = this;
        // that.authorization = sessionStorage.getItem("authorization");
        that.enter_code();//获取入账代码

      },
      components: {treeTransfer, QRCode}, // 注册
      watch:{
        drag(value){
          let that =this;
          if(that.drag===true){
            that.timer = setInterval(that.qr_code, 600000);
          }else {
            clearInterval(that.timer)
          }
        }
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
            name:'',
            longitude_min:'',//	经度最小值
            longitude_max:'',//经度最大值
            latitude_min:'',//	纬度最小值
            latidue_max:'',//	纬度最大值
            remark:'',//备注
          }
          that. status='1';//状态

        },
        //封装获取考勤点设置列表
        enter_code() {
          let that = this
          that.$axios({
            url: that.url + "/v1/manage/duty_place/list",
            method: "get",
            params: {
              page_num: that.cur_page
            }
          })
            .then(res => {
              console.log(res);
              if (res.data.message === "success") {
                that.income_list = res.data.data.list
                that.total = res.data.data.total_count;
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
          let that = this
          console.log(curPage) // 当前页}
          that.cur_page = curPage;
          //获取信息列表
          that.$axios({
            url:  that.url + "/v1/manage/duty_place/list",
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
            that.$axios({
              url:  that.url + "/v1/manage/duty_place/delete/" + id,
              method: "get",
            })
              .then(res => {
                console.log(res)
                if (res.data.message === "success") {
                  that.enter_code();
                  that.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                  list.splice(index, 1);
                }else if(res.data.message === "fail"){
                  that.hintInfo("warning", res.data.data);
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
          that.title = "新增考勤点"
        },
        //点击修改
        amend(srow, id, index, list) {
          let that = this;
          that.Edite = true;
          that.id = srow.id;
          console.log(srow);
          that.title = "修改考勤点";
          that.param.name = srow.name;//考勤点
          that.param.longitude_min=srow.longitude_min;//	经度最小值
          that.param.longitude_max=srow.longitude_max;//经度最大值
          that.param.latitude_min=srow.latitude_min;//	纬度最小值
          that.param.latidue_max=srow.latidue_max;//	纬度最大值
          that.param.remark=srow.remark;//备注
          that.status=srow.status+"";//状态
        },
        //点击入账代码新增和修改后的保存
        ensure() {
          let that = this;
          if (!that.param.name) {
            that.hintInfo("warning", "*为必填项")
          } else {
            let urldata = that.Edite ? (that.url + "/v1/manage/duty_place/update/" + that.id) : (that.url + "/v1/manage/duty_place/add");
            console.info(urldata);
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                name:that.param.name,//考勤点
                longitude_min:that.param.longitude_min,//	经度最小值
                longitude_max:that.param.longitude_max,//经度最大值
                latitude_min:that.param.latitude_min,//	纬度最小值
                latidue_max:that.param.latidue_max,//	纬度最大值
                remark:that.param.remark,//备注
                status:that.status+"",//状态
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  that.enter_code();
                  that.dialogVisible = false;
                  if (that.Edite) {
                    that.hintInfo("success", "修改考勤点成功")
                  } else {
                    that.hintInfo("success", "新增考勤点成功")
                  }
                }
                else {
                  if (that.Edite) {
                    that.hintInfo("success", "修改考勤点失败")
                  } else {
                    that.hintInfo("success", "新增考勤点失败")
                  }
                }
              })
              .catch(error => {
                console.log(error);
                if (that.Edite) {
                  that.hintInfo("warning", "修改考勤点失败")
                } else {
                  that.hintInfo("warning", "新增考勤点失败")
                }
              });
          }
        },
        //修改页面的显示和隐藏
        handleClose(done) {
          done();
        },
        /**考勤二维码*/
        salary_code(srow, id, index, list){
          let that = this;
          that.qr_id = id;
          that.salary_name = srow.name;
          that.qr_code(that.qr_id);
        },
        /**封装获取二维码地址*/
        qr_code(id){
          let that =this;
          this.$nextTick(function () {
            that.$refs.qrcode.innerHTML = "";
          });
          if(!id){
            id = that.qr_id
          }
          that.$axios({
            url:that.url+"/v1/manage/duty_record/get_place_2d",
            method:"post",
            data:{
              duty_place_id:id,
            }
          })
            .then(res=>{
              console.log(res);
              that.img_src =res.data.data.code_2d;
              if (that.img_src !== "") {
                this.$nextTick(function () {
                  this.qrcode();
                })
              }
            })
            .catch(err=>{
              console.log(err);
            })
        },
        /**获取二维码*/
        qrcode() {
          let that = this;
          let qrcode = new QRCode('qrcode', {
            width: 232,  // 设置宽度
            height: 232, // 设置高度
            text: that.img_src
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
      }
    }
</script>

<style lang="less" scoped>
  .salary_site {
    width: 96%;
    height: 96%;
    margin-left: 10px;
    background: white;
    overflow-y: scroll;
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
          text-align: right;
          display: inline-block;
          width: 130px;
        }
      }
    }

  }
</style>
