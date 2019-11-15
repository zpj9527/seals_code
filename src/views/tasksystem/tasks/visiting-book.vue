<template>
  <div class="visiting-book">
    <header style="margin: 10px">
      <p style="font-size: 16px;display: inline-block;" >访客登记</p>
      <el-button type="primary" size="mini" style="width: 80px;margin-left: 10px;margin-right: 10px" @click="add">新增</el-button >
      <el-radio-group v-model="caller_type" @change="search_caller">
        <el-radio :label="2">全部</el-radio>
        <el-radio :label="0">临时访客</el-radio>
        <el-radio :label="1">长期访客</el-radio>
      </el-radio-group>
    </header>
    <div class="content ">
      <el-table
        :data="visitant_list"
        size="mini"
        max-height="700"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        style="width: 100%;">
        <el-table-column
          prop="visitor_type"
          label="访客类型">
          <template slot-scope="scope">
            <span v-if="scope.row.visitor_type===0">临时访客</span>
            <span v-else>长期访客</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="company"
          label="访客所属公司">
          <template slot-scope="scope">
            <span v-if="scope.row.company">{{scope.row.company}}</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="visit_room_num"
          label="被访人房间号">
          <template slot-scope="scope">
            <span v-if="scope.row.visit_room_num">{{scope.row.visit_room_num}}</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="visitee_name"
          label="被访人姓名">
          <template slot-scope="scope">
            <span v-if="scope.row.visitee_name">{{scope.row.visitee_name}}</span>
            <span v-else>暂无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="访问人电话">
        </el-table-column>
        <el-table-column
          prop="head_img_id"
          label="访问人头像">
          <template slot-scope="scope">
            <el-popover placement="right" title="" trigger="hover">
              <img  :src="scope.row.head_img_id" style="width:160px;height: auto">
              <img slot="reference"   :src="scope.row.head_img_id" alt="" style="max-height: 50px;max-width: 130px">
            </el-popover>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="is_group "-->
          <!--label="访问时常">-->
        <!--</el-table-column>-->
        <el-table-column
          prop="create_user"
          label="创建者">
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
          prop="modify_user"
          label="修改用户">
        </el-table-column>

        <el-table-column
          prop="address"
          width="180 "
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="cancel(scope.row.id,scope.$index, visitant_list)"
                      >删除
            </el-button>
            <el-button size="mini"
                       @click="dialogVisible = true;amend(scope.row,scope.row.id,scope.$index, visitant_list) "
                       >修改
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
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <span>访客类型 ：</span>
          <el-radio-group v-model="visitor_type" :disabled="caller">
          <el-radio :label="0">临时访客</el-radio>
          <el-radio :label="1">长期访客</el-radio>
        </el-radio-group>
        </li>
        <li v-if="visitor_type===1">
          <!--<i style="color: red;font-size: 18px">*</i>-->

          <span>长期访客所属公司 ：</span>
          <el-input v-model="param.company" placeholder="请输入被访人房间号" style="width: 200px;" size="mini"></el-input>
        </li>
        <li v-if="visitor_type===0">
          <span>被访人房间号 ：</span>
          <el-select v-model="visit_room_num" filterable  placeholder="请选择" @focus="room_list"  size="mini" style="width: 200px;">
            <el-option
              v-for="item in room_number_mark"
              :key="item.value"
              :label="item.room_no"
              :value="item.room_no">
            </el-option>
          </el-select>
        </li>
        <li v-if="visitor_type===0">
          <span>被访人姓名 ：</span>
          <el-input v-model="param.visitee_name" placeholder="请输入被访人姓名" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <span>访问人姓名 ：</span>
          <el-input v-model="param.name" placeholder="请输入访问人姓名" style="width: 200px;" size="mini"></el-input>
        </li>
        <li>
          <span>访问人电话 ：</span>
          <el-input v-model="param.phone" placeholder="请输入访问人电话" style="width: 200px;" maxlength="11" size="mini"
                    oninput="value=value.replace(/[^\d]/g,'')"></el-input>
        </li>
        <li v-if="visitor_type===0">
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <span style="vertical-align: top">进店时间 ：</span>
          <!--<el-input v-model="nowTime" placeholder="请输入访问人电话" style="width: 200px;" size="mini"></el-input>-->
          <div style="width: 200px;height: 28px;border: 1px solid #ebeef5;display: inline-block;border-radius: 4px;line-height: 28px;padding-left: 16px">{{nowTime}}</div>
        </li>
        <li v-if="visitor_type===0">
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <span>预离时间 ：</span>
          <el-date-picker
            v-model="out_time"
            size="mini"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="width: 200px;"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </li>
        <li v-if="visitor_type===0">
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <span style="vertical-align: top">访问时长 ：</span>
          <div style="width: 200px;height: 28px;border: 1px solid #ebeef5;display: inline-block;border-radius: 4px;line-height: 28px;padding-left: 16px">{{duration}}分钟</div>
        </li>
        <li v-if="visitor_type===1">
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <span style="vertical-align: top">生效日期 ：</span>
          <el-date-picker
            v-model="effect_time"
            size="mini"
            style="width: 200px;"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li v-if="visitor_type===1">
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <span>失效日期 ：</span>
          <el-date-picker
            v-model="expire_time"
            type="date"
            size="mini"
            style="width: 200px;"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </li>

         <li style="position: relative">
           <!--<i style="color: red;font-size: 18px">*</i>-->
           <span style="vertical-align: top">访问人头像：</span>
           <!--图片展示-->
           <img src="../../.././assets/images/tasksystem/tasks/camera.png" alt=""  ref="img"
                style="position: absolute;top: 34px;left:162px" >
           <video ref="video" width="100" height="100" autoplay style="border: 1px dotted rgba(204,204,204,1)" @click="callCamera">

           </video>
           <canvas ref="canvas" width="100" height="100" style="border: 1px solid rgba(204,204,204,1)"></canvas>
           <el-button size="mini" type="primary" @click="photograph" v-show="photograph_img">确认拍照</el-button>
         </li>
        <li>
          <!--<i style="color: red;font-size: 18px">*</i>-->
          <span style="vertical-align: top">备注 ：</span>
          <textarea rows="7" cols="26" v-model="param.remark" style="resize:none" ></textarea>
        </li>

        <div>
          <!--开启摄像头-->
          <!--<el-button @click="callCamera">开始拍照</el-button>-->
          <!--<el-button @click="closeCamera">关闭摄像头</el-button>-->
          <!--canvas截取流-->
          <!--确认-->
        </div>
      </ul>

      <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false;closeCamera()" size="mini">取 消</el-button>
              <el-button type="primary" @click="ensure()" size="mini">确 定</el-button>
             </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name: "visiting-book",
    data () {
      return {
        url:this.api.api_9530_9503,
        pagesize:10,
        total:10,
        dialogVisible:false,
        Edite:true, //标志位 判断的是新增还是更新
        //  新增内容
        param:{},
        title:'',
        caller:false,//访客类型的时新增还是修改，如果是修改disabled为true
        duration:"0",
        id:'',//修改的id
        nowTime:'',//当前时间
        visitant_list:[],//参数list
        visitor_type:'',//访客类型
        company:'',//长期访客所属的公司名
        out_time:'',//实际离开时间
        name:'',//被访问人
        visitee_name:"",//访问人
        phone:'',//被访人电话
        effect_time:'',//生效日期
        expire_time:'',//失效日期
        room_number_mark:[],//封装获取房间号
        visit_room_num:'',//被访房间号
        remark:'',//备注
        img_id:"",//拍照的图片de id
        photograph_img:false,
        /**筛选*/
        caller_type:2
      }
    },
    created(){
      let that =this;
      that.visitant();//获取访客登记的列表

    },
    watch:{
      //监听预离时间，从而的到访问时长
      out_time(val){
        console.log(val);
        if(val){
          let that =this;
          let time = that.nowTime.split(" ")[1];//得到时间
          let time_h = time.split(":")[0]*60*60;//小时转秒数
          let time_m = time.split(":")[1]*60;//得到分钟转秒数
          let time_s = time.split(":")[2];//得到秒
          let time_all = time_h+time_m+time_s;
          //  预离时间
          let leave = that.out_time.split(" ")[1];//得到时间
          let leave_h = leave.split(":")[0]*60*60;//得到小时
          let leave_m = leave.split(":")[1]*60;//得到分钟
          let leave_s = leave.split(":")[2];//得到秒
          let leave_all = leave_h+leave_m+leave_s;
          that.duration = Math.floor((leave_all-time_all)/60/100);
        }

      },
    },
    methods: {
      //刷新数据
      flush() {
        let that = this;
        //第一件事    将标志位改为false
        that.Edite = false;
        that.param = {
          name: '',
          remark: '',
          company: '',
          phone: '',
          visitee_name: '',
        };
        that.visitor_type = 0;//访客类型
        that.out_time = "";
        that.visit_room_num = "";
        that.effect_time = "";
        that.expire_time = "";


      },
      /**获取访客登记的数据*/
      visitant() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/security/visitor/list",
          method: "get",
          params:{
            page_size:10,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              for (let item of res.data.data.list) {
                item.head_img_id = " https://image.eloadspider.com/resource/camera_face_event?id=" + item.head_img_id
                // arr.push("https://image.eloadspider.com/resource/camera_face_event?id="+item)
              }
              that.visitant_list = res.data.data.list;
              console.log(that.visitant_list);
              that.total = res.data.data.total_count;

            } else {
              console.log(res);
            }
          })
          .catch(err => {
            console.error(err)
          })
      },
      //新增访客登记
      add() {
        let that = this;
        that.dialogVisible = true;
        that.title = "新增参数设置";
        that.caller=false;
        that.flush();
        /**q清空画布*/
        that.$nextTick(function () {
          that.clea();
          that.$refs.canvas.style.border = "none"
        });
        that.timeFormate(new Date());

      },
      /**修改访客登记*/
      amend(row, id) {
        let that = this;
        that.Edite = true;
        console.log(row, id);
        that.room_list();
        that.caller=true;
        that.title = "修改访客登记"
        that.param.name = row.name;
        that.param.visitee_name = row.visitee_name;
        that.param.phone = row.phone;
        that.visit_room_num = row.visit_room_num;
        that.visitor_type = row.visitor_type;
        that.param.company = row.company;
        that.nowTime = row.in_time;
        that.out_time = row.out_time;
        // that.img_id=row.head_img_id;
        that.param.remark = row.remark;
        that.effect_time = row.effect_time;
        that.expire_time = row.expire_time;
        that.id = id;
        this.$nextTick(function () {
          this.clea();
          this.$refs.canvas.style.border = "none"
        });
      },
      /**删除访客登记*/
      cancel(id, index, list) {
        console.log(id);
        let that =this;
        that.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          that.$axios({
            url:  that.url + "/v1/security/visitor/delete/" + id,
            method: "post",
          })
            .then(res => {
              console.log(res)
              if (res.data.message === "success") {
                that.visitant();
                that.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                list.splice(index, 1);
              }
              // location.reload(); // 强制刷新
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
      /**搜索*/
      search_caller(){
        let that =this;
        let caller_type =that.caller_type
        if(caller_type===2){
          caller_type=""
        }
        that.$axios({
          url:that.url+"/v1/security/visitor/list",
          method:"get",
          params:{
            visitor_type:caller_type+"",
          }
        })
          .then(res=>{
           if(res.data.message==="success"){
             console.log(res);
             for (let item of res.data.data.list) {
               item.head_img_id = " https://image.eloadspider.com/resource/camera_face_event?id=" + item.head_img_id
               // arr.push("https://image.eloadspider.com/resource/camera_face_event?id="+item)
             }
             that.visitant_list = res.data.data.list;
             console.log(that.visitant_list);
             that.total = res.data.data.total_count;
           }
          })
          .catch(err=>{
            console.error(err)
          })
      },
      /**新增修改访客登记确定*/
      ensure(){
        let that =this;
        let tel = /^1[3456789]\d{9}$/;
        if (!tel.test(that.param.phone)) {
          that.hintInfo("warning", "手机号输入不规范，请检查后重新输入")
        } else {
          if(that.visitor_type===0){
            if(that.duration>60){
              that.hintInfo("warning", "访问时长不能大于60分钟")
            }else {
              let url = that.Edite ? (that.url + "/v1/security/visitor/update/" + that.id) : (that.url + "/v1/security/visitor/add");
              that.$axios({
                url: url,
                method: "post",
                data: {
                  name: that.param.name,
                  visitee_name: that.param.visitee_name,
                  phone: that.param.phone,
                  visit_room_num: that.visit_room_num,
                  visitor_type: that.visitor_type + "",
                  company: that.param.company,
                  in_time: that.nowTime,
                  out_time: that.out_time,
                  head_img_id: that.img_id,
                  remark: that.param.remark,
                  effect_time: that.effect_time,
                  expire_time: that.expire_time,
                }
              })
                .then(res => {

                  if (res.data.message === "success") {
                    console.log(res);
                    if (that.Edite) {
                      that.hintInfo("success", "修改访客登记成功")
                    } else {
                      that.hintInfo("success", "新增访客登记成功")
                    }
                    that.dialogVisible = false;
                    that.visitant();
                  } else {
                    if (that.Edite) {
                      that.hintInfo("warning", "修改访客登记失败")
                    } else {
                      that.hintInfo("warning", "新增访客登记失败")
                    }

                  }
                })
                .catch(err => {
                  console.error(err)
                  if (that.Edite) {
                    that.hintInfo("warning", "修改访客登记失败")
                  } else {
                    that.hintInfo("warning", "新增访客登记失败")
                  }
                })
            }
          }else {
            let url = that.Edite ? (that.url + "/v1/security/visitor/update/" + that.id) : (that.url + "/v1/security/visitor/add");
            that.$axios({
              url: url,
              method: "post",
              data: {
                name: that.param.name,
                visitee_name: that.param.visitee_name,
                phone: that.param.phone,
                visit_room_num: that.visit_room_num,
                visitor_type: that.visitor_type + "",
                company: that.param.company,
                in_time: that.nowTime,
                out_time: that.out_time,
                head_img_id: that.img_id,
                remark: that.param.remark,
                effect_time: that.effect_time,
                expire_time: that.expire_time,
              }
            })
              .then(res => {

                if (res.data.message === "success") {
                  console.log(res);
                  if (that.Edite) {
                    that.hintInfo("success", "修改访客登记成功")
                  } else {
                    that.hintInfo("success", "新增访客登记成功")
                  }
                  that.dialogVisible = false;
                  that.visitant();
                } else {
                  if (that.Edite) {
                    that.hintInfo("warning", "修改访客登记失败")
                  } else {
                    that.hintInfo("warning", "新增访客登记失败")
                  }

                }
              })
              .catch(err => {
                console.error(err)
                if (that.Edite) {
                  that.hintInfo("warning", "修改访客登记失败")
                } else {
                  that.hintInfo("warning", "新增访客登记失败")
                }
              })
          }

          }

      },
     /**获取当前日期*/
     timeFormate(timeStamp) {
       let year = new Date(timeStamp).getFullYear();
       let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
       let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
       let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
       let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
       let str = "星期" + "日一二三四五六".charAt(new Date().getDay());
       this.week=str;
       let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
       // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
       this.nowTime = year + "-" + month + "-" + date  + " "+hh+":"+mm+":"+ss;

       console.log(this.nowTime);
     },
      //点击分页上的页数
      handleCurrentChange(curPage) {
        console.log(curPage);
        let that =this;
        let caller_type =that.caller_type
        if(caller_type===2){
          caller_type=""
        }
        that.$axios({
          url:that.url+"/v1/security/visitor/list",
          method:"get",
          params:{
            visitor_type:caller_type+"",
            page_num:curPage
          }
        })
          .then(res=>{
            if(res.data.message==="success"){
              console.log(res);
              for (let item of res.data.data.list) {
                item.head_img_id = " https://image.eloadspider.com/resource/camera_face_event?id=" + item.head_img_id
                // arr.push("https://image.eloadspider.com/resource/camera_face_event?id="+item)
              }
              that.visitant_list = res.data.data.list;
              console.log(that.visitant_list);
              that.total = res.data.data.total_count;
            }
          })
          .catch(err=>{
            console.error(err)
          })

      },
      //修改页面的显示和隐藏
      handleClose(done) {
        done();
        this.closeCamera ();//关闭摄像头
      },
      //封装获取房间号
      room_list() {
        let that = this
        that.$axios({
          url: that.api.api_price_9101 + '/v1/room/room_status/get_room_map_list/?room_state__in=OC,OD',
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res)
              that.room_number_mark = res.data.data.results
            }
            else {
              console.log(res)
            }

          })
          .catch(error => {
            console.log(error);
          });
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













      // 调用摄像头
      callCamera () {
        // this.$refs['canvas'].innerHTML='';
        // H5调用电脑摄像头API
        navigator.mediaDevices.getUserMedia({
          video: true
        }).then(success => {
          // 摄像头开启成功
          this.$refs['video'].srcObject = success;
          // 实时拍照效果
          this.$refs['video'].play()
          this.$refs.img.style.display="none"
          this.photograph_img = true;
          //清除画布
          this.$nextTick(function () {
            this.clea();
            this.$refs.canvas.style.border="none"
          });
        }).catch(error => {
          this.hintInfo("warning","摄像头开启失败，请检查摄像头是否可用！")
          console.error('摄像头开启失败，请检查摄像头是否可用！')
        })
      },
      // 拍照
      photograph () {
        let that =this;
        let ctx = that.$refs['canvas'].getContext('2d')
        // 把当前视频帧内容渲染到canvas上
        ctx.drawImage(that.$refs['video'], 0, 0, 100, 100);
        // 转base64格式、图片格式转换、图片质量压缩
        let imgBase64 = that.$refs['canvas'].toDataURL('image/jpeg', 0.7);
        // 由字节转换为KB 判断大小
        let str = imgBase64.replace('data:image/jpeg;base64,', '')
        let strLength = str.length
        let fileLength = parseInt(strLength - (strLength / 8) * 2)
        // 图片尺寸  用于判断
        let size = (fileLength / 1024).toFixed(2)
        // 上传拍照信息  调用接口上传图片 .........
        if(imgBase64){
          console.log(imgBase64);
          that. closeCamera ();//关闭摄像头
          let blob = that.dataURLtoBlob(imgBase64);
          let file = that.blobToFile(blob, "访客登记");
          console.log(file,blob);
          let fd = new FormData();
          fd.append("upfile", file,"image.png");
          let config = {headers: {'Content-Type': 'multipart/form-data'}};
          let url = 'https://image.eloadspider.com/resource/camera_face_event/head_image/upload';
          that.$axios.post(url,fd,config).then(res=>{
            console.info(res);
            that.img_id = res.data.id;
            console.log(that.img_id);
            that.hintInfo('success','照片片上传成功！');
            this.$refs.img.style.display="inline-block"
            this.photograph_img = false;
          }).catch((err)=>{
            console.error(err);
            that.hintInfo('warning','图片上传失败！');
          })
        }
      },
      /**清空画布*/
      clea(){
        let that =this;
        let  canvas = that.$refs.canvas;
        let context=canvas.getContext("2d");
        context.clearRect(0,0,canvas.width,canvas.height);
        context.beginPath();
      },
      // 关闭摄像头
      closeCamera () {
        if (!this.$refs['video'].srcObject) return
        let stream = this.$refs['video'].srcObject
        let tracks = stream.getTracks()
        tracks.forEach(track => {
          track.stop();
          this.$refs.img.style.display="inline-block"
        })
        this.$refs['video'].srcObject = null
      },
      /**base64转换二进制*/
      dataURLtoBlob : function(dataurl) {
        let arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        while(n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {
          type: mime
        });
      },
      /**
       * @param {Object} theBlob 文件
       * @param {Object} fileName 文件名字
       */
      blobToFile : function(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
      },

    },
  }
</script>
<style lang="less"  scoped>
  .visiting-book{
    width: 96%;
    height: 98%;
    background: white;
    margin-left: 10px;
    .dialog_style {
      margin-left: 20px;
      /*overflow: hidden;*/
      li {
        /*float: left;*/
        /*width: 50%;*/
        margin-bottom: 10px;
        span {
          display: inline-block;
          width: 132px;
          text-align: right;
        }
      }
    }
  }
</style>
