<template>
  <div class="many-stores">
      <div class="content ">
        <div class="head">
          <el-button size="mini" style="width: 80px;" type="primary" @click="add_personnel ">新增</el-button>
        </div>
        <div class="details">
          <el-table
            :data="newlists"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini">
            <el-table-column
              prop="real_name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="user_name"
              label="账号">
            </el-table-column>
            <el-table-column
              prop="head_image"
              label="照片">
              <template slot-scope="scope">
                <el-popover placement="right" title="" trigger="hover">
                  <img  :src="scope.row.head_image" style="width: 200px;height: auto">
                  <img slot="reference" :src="scope.row.head_image" alt="" style="max-height: 50px;max-width: 150px">
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话">
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.status===1">正常</span>
                <span v-else>禁用</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="gender"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="create_user"
              label="创建人">
            </el-table-column>
            <el-table-column
              prop="create_datetime"
              label="创建时间">
            </el-table-column>
            <el-table-column
              prop="name"
              label="修改人">
            </el-table-column>
            <el-table-column
              prop="name"
              label="修改时间">
            </el-table-column>
            <el-table-column
            prop="address"
            width="240"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
            <el-button @click="cancel(scope.row.id,scope.$index, newlists)"type="danger" size="mini" >删除</el-button>
            <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
              <el-button size="small" @click="binding_hotel(scope.row,scope.row.id,scope.$index, newlists)">绑定账号</el-button>
            </template>
            </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>
        <!--新增修改的弹出框-->
        <el-dialog
          :visible.sync="dialogVisible"
          :close-on-click-modal='false'
          width="30%"
          :before-close="handleClose">
          <div slot="title" class="dialog_style_header-title">
            <span class="dialog_style_title-name"> {{ title }}</span>
          </div>
          <ul class="condition">
            <li>
            <span><i style="color: red;font-size: 18px">*</i>姓名：</span>
            <el-input v-model="param.real_name" placeholder="请输入内容" size="mini" style="width: 300px;"></el-input>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>账号：</span>
              <el-input v-model="param.user_name" placeholder="请输入内容" size="mini" style="width: 300px;"></el-input>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>密码：</span>
              <el-input v-model="param.password" placeholder="请输入内容" size="mini" type="password"  style="width: 300px;"></el-input>
            </li>
            <li>
              <span><i style="color: red;font-size: 18px">*</i>电话：</span>
              <el-input v-model="param.phone" placeholder="请输入内容" size="mini" maxlength="11"  style="width: 300px;"></el-input>
            </li>
            <li>
              <span>人脸id：</span>
              <el-input v-model="param.face_id" placeholder="请输入内容" size="mini" style="width: 300px;"></el-input>
            </li>
            <li style="line-height: 28px;width: 400px;">
              <span>状态：</span>
              <el-radio v-model="status" label="1">正常</el-radio>
              <el-radio v-model="status" label="0">禁用</el-radio>
            </li>
            <li style="line-height: 28px;width: 400px;">
              <span>性别：</span>
              <el-radio v-model="gender" label="男">男</el-radio>
              <el-radio v-model="gender" label="女">女</el-radio>
            </li>
            <li>
              <span style="vertical-align: top">照片：</span>
              <el-upload
                class="avatar-uploader"
                action="https://oss.crowncrystalhotel.com/resource/employee/upload"
                :show-file-list="false"
                style="display: inline-block"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="head_image" :src="head_image" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon">照片</i>
              </el-upload>
            </li>
          </ul>
          <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
          <el-button type="primary" @click="confirm" size="mini">确 定</el-button>
        </span>
        </el-dialog>
        <!--绑定账号-->
        <el-dialog
          :visible.sync="binding_dialogVisible"
          width="54%"
          :close-on-click-modal='false'
          :before-close="handleClose">
          <div slot="title" class="dialog_style_header-title">
            <span class="dialog_style_title-name"> {{ title }}</span>
          </div>
          <ul class="condition">
            <li>
              <span style="width: 44px;">集团：</span>
              <el-select v-model="hotel_group" placeholder="请选择" @focus="group_account" size="mini" style="width: 150px;">
                <el-option
                  v-for="item in group_account_list"
                  :key="item.id"
                  :label="item.short_name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <li>
              <span style="width:44px ">酒店：</span>
              <el-select v-model="hotel" placeholder="请选择" size="mini" style="width: 150px;" @focus="hotel_focus" @change="hotel_change">
                <el-option
                  v-for="item in hotel_data"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </li>
            <el-transfer v-model="binding_data"
                         style="float: left"
                         @change="handleChange"
                         :left-check-change="leftChange"
                         :props="{key: 'id',label: 'hotel_real_name'}"
                         :titles="['人员未绑定账号', '人员已绑定账号 ']"
                         :button-texts="['解除绑定', '绑定账号']"
                         :data="binding_list">

            </el-transfer>
          </ul>
          <span slot="footer" class="dialog-footer">
          <el-button  @click="binding_dialogVisible = false" size="mini"  type="danger" plain>退出</el-button>
        </span>
        </el-dialog>
      </div>
    <div class="right">
      <logon-view></logon-view>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import qs from 'qs'
  import crypto from 'crypto';
  export default {
    name: "many-stores",
    data() {
      return {
        url:"http://organ.crowncrystalhotel.com",
        pagesize:10,
        total:1,
        title:"",
        Edite: true, //标志位 判断的是新增还是更新
        dialogVisible:false,//新增/修改的弹出框
        newlists:[],//所有人员
        //新增更改人员信息
        param:{},
        id:'',//修改时的id；
        length:'',//password.length
        real_name:'',//姓名
        user_name:'',//用户名
        password:'',//密码
        face_id:'',//人脸id
        head_image:'',//头像路由
        phone:'',//手机号
        status:'',//状态
        gender:'',//性别
       //账号绑定
        binding_dialogVisible:false,
        binding_data:[],//绑定的账号
        binding_list:[],//所有帐号
        group_account_list:[],//所有集团
        hotel_group:'',//选择的集团
        hotel_data:[],
        hotel:'',//选择的酒店
      }

    },
    created: function () {
          let that = this;
          that. personnel_list();

    },
    methods: {
      /**
       * @flush 是用来刷新数据的
       * */
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          real_name:"",//用户姓名
          user_name: '',//用户账号
          password: '',//密码
          face_id:'',//人脸id
          phone: '',//电话

        }
        that.status = '1';//人员状态
        that.gender = "男";//性别
        that.head_image="";//头像路由
      },
      /**获取所有的多店人员*/
      personnel_list(){
        let that =this;
          that.$axios({
            url:that.url+"/v1/organization/ht/employee/get_personnel/",
            method:"get",
            params:{
              page_size:10
            }
          })
            .then(res=>{
               if(res.data.message==="success"){
                 console.log(res);
                 that.newlists = res.data.data.results;
                 that.total =   res.data.data.count;
               }
            })
            .catch(err=>{
              console.log(err);
            })
      },

      /**新增*/
      add_personnel(){
        let that =this;
        that.dialogVisible=true;
        that.title="新增人员";
        that.flush();
      },
      /**修改*/
      submit(row,id,index,list){
          let that =this;
          console.log(row);
          that.title="修改人员",
          that.Edite = true;
          that.param.real_name=row.real_name,//用户姓名
          that.param.user_name=row.user_name,//用户名
          that.param.password=row.password,//密码
          that.param.phone=row.phone,//电话
          that.status=row.status + "",//人员状态
          that.head_image = row.head_image,//照片
          that.gender=row. gender
          that.dialogVisible = true;
          that.id = id;
          that.length = row.password.length;
      },
      /***新增修改的确定*/
      confirm(){
        let that =this;
        if(that.param.real_name==="" || that.param.user_name===""  || that.param.password==="" ||that.param.phone===""){
          that.hintInfo("warning", "*为必填项")
        }else{
          let tel = /^1[3456789]\d{9}$/;
          if (!tel.test(that.param.phone)) {
            that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
          } else {
            let password;
            let urldata = that.Edite ? (that.url+"/v1/organization/ht/employee/update_personnel/"+ that.id+"/") : (that.url+"/v1/organization/ht/employee/add_personnel/");
            if (that.Edite === true) {
              console.log(that.Edite);
              if (that.param.password.length < that.length) {
                password = that.getmd5(that.param.password)
              } else {
                password = that.param.password;
              }
            }else {
              password = that.getmd5(that.param.password)
            }
            that.$axios({
              url: urldata,
              method: "post",
              data: {
                real_name: that.param.real_name,//用户姓名
                user_name: that.param.user_name.toLowerCase(),//用户名
                password: password,//密码
                phone: that.param.phone,//电话
                status: that.status + "",//人员状态
                head_image: that.imge_list,//照片
                gender: that.gender,
              },

            })
              .then(res => {
                if (res.data.message === "success") {
                  that.dialogVisible = false;
                  that.personnel_list();
                  if (that.Edite) {
                    that.hintInfo("success", "修改人员成功")
                  } else {
                    that.hintInfo("success", "新增人员成功")
                  }
                }
                else {
                  let fault = res.data.message;
                  console.log(fault);
                  if (fault) {
                    that.hintInfo("warning", "用户名或手机号已存在，请重新输入")
                  }
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }

      },
      /**删除**/
      cancel(id,index,list){
        let that =this;
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            list.splice(index, 1);
            this.$axios({
              url:that.url+ "/v1/organization/ht/employee/remove_personnel/"+ id+"/",
              method: "post",
            })
              .then(res => {
                console.log(res)
                if (res.data.message === "success") {
                  this.personnel_list();
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
              })
              .catch(error => {
                console.log(error);
              })

          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        },
      /**
       * @getmd5 加密密码使用
       */
      getmd5(pwd) {
        var md5 = crypto.createHash("md5");
        md5.update(pwd);
        var password = md5.digest('hex');
        return password;
      },
      /**
       * 点击上传照片 方法
       * */
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file);
        this.imge_list =file.response.complete;
        // this.src_log = "https://image.eloadspider.com/" + file.response.url;
        this.head_image = file.response.complete;
        if(file.response.message==="success"){
          this.hintInfo("success", "上传照片成功")
        }else {
          this.hintInfo("warning", "上传照片失败")
        }
      },
      beforeAvatarUpload(file) {
        console.log(file);
        // this.imge_list = file.
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
     /***
      * 绑定账号
      * */
     binding_hotel(row,id,index,list){
       let that =this;
       that.binding_dialogVisible = true;
       that.title=row.real_name +" ："+ "绑定账号";
       that.id = id;
       that.group_account_list=[],//所有集团
       that.hotel_group='';//选择的集团
       that.hotel_data=[];
       that.hotel='';//选择的酒店
       that.binding_data=[];
       that. staff_account(id);
       that. accountAll('');
     },
    /***获取所有账号*/
    accountAll(value){
      let that =this;
      that.binding_list = [];
      that.$axios({
        url: that.api.api_9022_9519 + "/v1/common/employee/info_list",
        method: "post",
        data: {
          page_size:999,
          hotel_id:value
        },
      })
        .then(res => {
          if (res.data.message === "success") {
            console.log(res);
            let arr =[];
               for(let i of res.data.data.list){
                 if(i.hotel_id){
                   i.hotel_real_name = i.real_name+"——"+i.hotel_id.full_name
                    arr.push(i);
                 }
               }
               that.binding_list = arr;
            console.log(that.binding_list);
          }
          else {
            console.log(res.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
      /**获取人员的账号绑定关系*/
      staff_account(key){
        let that =this;
        that.$axios({
          url: that.url+ "/v1/organization/ht/employee/get_person_employee/?personnel="+key,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let arr =[];
              for(let item of res.data.data.results){
                  arr.push(item.employee_id);
              }
              that.binding_data =arr;
              console.log(that.binding_data);
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**获取集团*/
      group_account(){
        let that =this;
        that.hotel='';
        that.$axios({
          url: that.api.api_9022_9519 + "/v1/common/hotel_group/info_list",
          method: "post",
          data: {
            page_size:999,
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.group_account_list = res.data.data.list;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //选择酒店时
      hotel_focus(){
        let that =this;
        if(that.hotel_group===''){
          that.hintInfo("warning", "请选择集团")
        }else {
          that.hotel_list(that.hotel_group);
        }
      },
      /**封装获取酒店*/
      hotel_list(value) {
        let that = this;
        that.$axios({
          url: that.api.api_9022_9519 +"/v1/common/dept/get_tree" ,
          method: "post",
          data: {
            hotel_group_id: value
          },
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.hotel_data = res.data.data;
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      /**酒店选择事件*/
      hotel_change(value){
        let that =this;
        that.accountAll(value)
      },
      //绑定账号事件
      handleChange(value, direction, movedKeys) {
        let that = this;
        console.log(value);
        console.log(direction);//方向
        console.log(movedKeys);//发生移动数据的数组
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
        if(direction==="right"){
          if(movedKeys.length===1){
            that.add_person_employee(movedKeys[0])
          }else {
            that.hintInfo("warning", "请选择其中一条绑定")
            that.staff_account(that.id)
            that.accountAll()
          }

        }else if(direction==="left"){
          if(movedKeys.length===1){
            that.remove_person_employee(movedKeys[0])
          }else {
            that.hintInfo("warning", "请选择其中一条解除")
            that.staff_account(that.id)
          }

        }



      },
     /**左侧被选中事件*/
     leftChange(value){
       console.log(value);
     },
   /**人员和账户的关联绑定*/
   add_person_employee(value){
      let that =this;
      that.$axios({
        url:that.url+"/v1/organization/ht/employee/add_person_employee/",
        method:"post",
        data:{
          personnel:that.id,
          employee_id:value,
        }
      })
        .then(res=>{
          if(res.data.message==="success"){
            that.hintInfo("success", "账号绑定成功")
          }else {
            that.hintInfo("warning", res.data.message)
          }
        })
        .catch(err=>{
          that.hintInfo("warning", "账号绑定接口调用失败")
        })
   },
   /**s删除人员与账户的关系*/
   remove_person_employee(value){
     let that =this;
     that.$axios({
       url:that.url+"/v1/organization/ht/employee/remove_person_employee_with_person_and_employee/",
       method:"post",
       data:{
         personnel_id:that.id,
         employee_id:value,
       }
     })
       .then(res=>{
         if(res.data.message==="success"){
           that.hintInfo("success", "账号解除绑定成功")
           that. staff_account(that.id)
         }else {
           that.hintInfo("warning", res.data.message)
           that.staff_account(that.id)
         }
       })
       .catch(err=>{
         that.hintInfo("warning", "账号解除绑定接口失败")
         that.staff_account(that.id)
       })
   },
      //分页
    handleCurrentChange(curPage) {
        console.log(curPage) // 当前页}
        this.curPage = curPage;
        let that =this;
        that.$axios({
          url:that.url+"/v1/organization/ht/employee/get_personnel/",
          method:"get",
          params:{
            page:curPage,
            page_size:10,
          }
        })
          .then(res=>{
            if(res.data.message==="success"){
              console.log(res);
              that.newlists = res.data.data.results;
              that.total =   res.data.data.count;
            }
          })
          .catch(err=>{
            console.log(err);
          })
      },
      //弹出框关闭
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

<style scoped lang="less">
  .many-stores{
    width: 100%;
    margin-top: 70px;
     .content{
       width: 98%;
       margin-top: 10px;
        .head{
          margin-left: 10px;
        }
       .details{
         width: 98%;
         margin-top: 10px;
         margin-left: 10px;
       }
       .condition{
         overflow: hidden;
         li{
           float: left;
           margin-bottom: 10px;
           span{
             display: inline-block;
             width: 100px;
             text-align: right;
           }
         }
       }
     }
  }
  .right {
    position: absolute;
    right: 0;
    top: 60px;
    height: 94%;
    z-index: 100;
  }

</style>
<style >
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }


</style>
<style scoped>
  .many-stores>>> .el-transfer-panel{
    width: 400px;
  }
</style>
