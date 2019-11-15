<template>
  <div class="tasks">
    <div class="navigation">
      <div>
        <p style="padding: 10px;">请选择酒店 ：</p>
        <el-select v-model="hotel_group" placeholder="请选择" size="mini" style="width: 229px;margin: 10px">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;">
        <!--<el-menu-->
          <!--default-active="1-1"-->
          <!--class="el-menu-vertical-demo"-->
          <!--@open="handleOpen"-->
          <!--@close="handleClose">-->
          <!--<el-menu-item-group :default-active="activeIndex" router mode="horizontal">-->
            <!--<div v-for="(item,index) in mission_list " :key="index">-->
              <!--<router-link :to="item.code_category">-->
              <!--<el-menu-item :index="item.id +''">{{item.descript}}</el-menu-item>-->
              <!--</router-link>-->
            <!--</div>-->
          <!--</el-menu-item-group>-->
        <!--</el-menu>-->

        <ul class="navigation">
          <router-link :to="item.code_category" v-for="(item,index) in mission_list " :key="index">
            <li :class="activeClass == index ? 'active':''" @click="getItem(index,item)">{{item.descript}}</li>
          </router-link>
        </ul>
      </el-col>
    </div>
    <div class="router">
      <div class="ini">
        <money-task></money-task>
      </div>
      <router-view  ></router-view>
    </div>
    <div class="screen" @click="filtrate">
      <i class="el-icon-setting" style="position: absolute;top: 130px;right: 10px;color: #c0c4cc;font-size: 32px;z-index: 100" ></i>
    </div>
    <!--设置出现的页面-->
    <el-dialog
      title="设置"
      :visible.sync="dialogVisible"
      :close-on-click-modal='false'
      width="58%"
      :before-close="handleClose" class="dialog-style">
      <ul>
        <li style="margin-bottom: 10px">
          <span><i style="color: red;font-size: 18px">*</i>角色：</span>
          <el-select v-model="role_id" placeholder="请选择" size="mini" style="width: 217px;" @change="role_change">
            <el-option
              v-for="item in bind_list"
              :key="item.value"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </li>
        <el-transfer
          v-model="toData"
          :props="{key: 'id',label: 'desc'}"
          :titles="['角色职责', '角色已拥有职责']"
          @change="handleChange"
          :data="responsibility_list"
        ></el-transfer>
        <!--<el-transfer v-model="toData" :data="responsibility_list"></el-transfer>-->
      </ul>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="mini" type="danger" plain>退出</el-button>
          <el-button type="primary" @click="ensure()" size="mini">保存</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import treeTransfer from 'el-tree-transfer';
  export default {
    name: "tasks",
    data() {
      return {
        url: this.api.api_9022_9519,
        activeClass: 0,
        hotel_list: [],//获取酒店
        mission_list:[],//获取任务体系
        hotel_group: '',
        id: '',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        //设置内容
        dialogVisible:false,
        title: ["所有职责", "角色赋予的职责"],
        mode: "transfer", // transfer addressList
        bind_list:[],//角色
        toData:[],
        role_id:"",//角色
        responsibility_list:[],//所有角色职责
        personal_role: false,//用来判断是不是传给后台的数组是否为空
        change_role_id:"",//选择的角色id
        responsibility_id:'',//传值子级
      }
    },
    components: {treeTransfer}, // 注册
    created: function () {
      let that = this;
      that.hotel();
      that.task_data();//获取任务体系
      that.part();//获取角色
    },

    methods: {
      //封装错误信息
      error_message(msg) {
        this.$message.error('错了哦，错误消息为' + msg);
      },
      //封装获取酒店的信息
      hotel() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/dept/get_tree",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
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
      /**封装获取任务体系*/
      task_data(){
        let that = this;
        that.$axios({
          url: that.api.api_code_9103 + "/v1/system/settings/get_code_base_list/?parent_code=mission&ordering=id&page_size=999",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data)
              that.mission_list = res.data.data.results;
              that.activeIndex =  that.mission_list[0].id+"";
              that.service_type = that.mission_list[0].id;
              that.task_role();
              console.log(that.activeIndex);
            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取角色信息列表
      part() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/role/info_list",
          method: "post",
          data:{
            page_size:999,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              let arr =[];
              for(let item of  res.data.data.list){
                 if(item.is_sys===0){
                   arr.push(item)
                 }
              }
              that.bind_list = arr;

            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
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
              if(that.change_role_id){
                that.role_obligation();//角色拥有的职责
              }

            }
            else {
              that.error_message(res.data.message)
            }

          })
          .catch(error => {
            console.log(error);
          });
      },
      /**设置后的确定*/
      ensure() {
        let that = this;
        if(that.role_id===""){
          that.hintInfo("warning", "*为必填项")
        }
        else  {
          //传给后台两个值
          //1：所点击的角色的id   that.role_id
          //2：所选中的权限组    that.role_checked

          that.$axios({
            url: "" + that.url + "/v1/common/role_duty/bind_role",
            method: "post",
            data: {
              role_id: that.role_id,//所选择的角色
              duty_ids: JSON.stringify( that.toData),//选中的职责
            },

          })
            .then(res => {
              if (res.data.message === "success") {
                console.log(res.data);
                // that.dialogVisible = false;
                that.hintInfo("success", "设置角色职责成功");
              }
              else {
                console.log(res.data.message);
                that.hintInfo("warning", "设置角色职责失败")
              }
            })
            .catch(error => {
              console.log(error);
            });
        }
      },
      /**设置*/
      filtrate(){
        let that =this;
        that.responsibility();//获取角色职责
          that.dialogVisible=true;
        that.role_id="";
        that.change_role_id='';
        that.toData=[];
      },
      //选择角色
      role_change(value){
        let that =this;
        that.change_role_id=value;
        that.role_obligation();//角色职责
      },
      /**封装获取角色拥有的职责*/
      role_obligation(){
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/role/get_info/"+that.change_role_id,
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              let arr=[];
              for(let item of res.data.data.data.duties){
                arr.push(item.id)
              }
           that.toData = arr;
              console.log(that.toData);
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },


      //点击事件
      getItem(index,item) {
        console.log(item);
       let that=this;
        this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
        that.service_type =item.id;
        that.task_role();
      },
      handleChange(value, direction, movedKeys) {
        console.log(value, direction, movedKeys);
        //可以通过direction回调right/left 来进行操作，right：把数字移到右边，left把数据移到左边
        if(direction === "right") {
        }
        if(direction === "left") {

        }

      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      /**查询任务体系的属于角色职责*/
      task_role(){
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/role_duty/info_list",
          method: "post",
          data:{
            service_type:that.service_type,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data.data);
              if(res.data.data.list.length>0){
                that.responsibility_id = res.data.data.list[0].id;
                sessionStorage.setItem("responsibility_id",that.responsibility_id)
              }

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
      //Dialog 的隐藏
      handleClose(done) {
        done()
      },
    }
  }
</script>

<style lang="less" scoped>
  .tasks {
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation {
      float: left;
      width: 280px;
      height: 100%;
      background: white;
      overflow-y: scroll;
      li {
        height: 50px;
        padding-left: 40px;
        line-height: 50px;
      }
    }
    .router {
      width: calc(100% - 280px);
      height: 100%;
      overflow-y: scroll;
      float: left;
      background: white;
      .ini {
        height: calc(100% - 60px);
        position: absolute;
        right: 0px;
        top: 60px;
        z-index: 10;
      }
    }
  }
  .active {
    /* background: #eee; */
    background: #eeeeee;
    font-weight: bolder;
    border-radius: 4px;
  }

</style>
<style scoped>
  .tasks>>> .el-transfer-panel{
    width: 320px;
  }
</style>
