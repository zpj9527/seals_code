<template>
  <!--公共头文件-->
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap">
      <div class="topbar-logo topbar-btn">
        <router-link to="/"><img src="@/assets/logo.png" style="padding-left:8px;"></router-link>
      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff;"><span v-show="!$store.state.collapsed"></span></a>
      </div>
      <div class="topbar-title">
        <el-row v-show="$store.state.topNavState==='home'"><!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
          <el-col :span="24">
            <el-menu :default-active="defaultActiveIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true">
              <el-menu-item index="/main">主页</el-menu-item>
              <el-menu-item index="/houseStatus">房态图</el-menu-item>
              <el-menu-item index="/orderList">订单</el-menu-item>
              <el-menu-item index="/accountsReceivable">账务</el-menu-item>
              <el-menu-item index="/customer">客户</el-menu-item>
              <el-menu-item index="/marketing">市场</el-menu-item>
              <el-menu-item index="/invoicing">进销存</el-menu-item>
              <el-menu-item index="/reports/commonReport">报表中心</el-menu-item>
              <el-menu-item index="" @click="setMaskShow">交接班</el-menu-item>
              <el-menu-item index="/nightaudit">夜审</el-menu-item>
              <el-menu-item index="/setting/charges">设置</el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>

      <div class="topbar-account topbar-btn" >
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <i class="iconfont icon-user"></i> {{nickname}}   <i class="el-icon-caret-bottom"></i></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>
            </el-dropdown-item>
            <el-dropdown-item>
              <div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>
            </el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <!--隐藏层-->
        <div class="mask" v-show="maskShow">
          <div class="mask-suspen">
            <div class="mask-head">
              <label>交接班报表</label>
            </div>
            <div class="mask-body">
              <div class="mask-left">
                <el-table
                  :data="tableData"
                  border
                  stripe
                  :header-cell-style="{background:'#68819E',color:'#ffffff'}"
                  height="500px"
                  size="mini"
                  style="width: 100%">
                  <el-table-column
                    prop="img">
                    <!--label="">-->
                    <template slot-scope="scope">
                      <img style="width: 20px;height: 20px"
                           :src="scope.row.img"/><!--规定写法-->
                      <!--如果要有label内容 放这里，没有 先注释-->
                      <!--<span style="margin-left: 10px"></span>-->
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="report"
                    label="报表"
                    width="280">
                  </el-table-column>
                  <el-table-column
                    prop="count"
                    label="份数">
                  </el-table-column>
                </el-table>
              </div>
              <div class="mask-right">
                <div class="mask-right-first" style="">
                  <label style="color: black">统计条件</label>
                </div>
                <div class="mask-right-second">
                  <div>
                    <input value="营业日期" style="width: 80px;border: none;margin-right: 10px;background: #ffffff" disabled readonly/>
                    <el-date-picker
                      v-model="reservearrive"
                      type="datetime"
                      prefix-icon="el-icon-date"
                      placeholder="选择日期时间"
                      size="mini" style="width: 165px;margin-left: -10px">
                    </el-date-picker>
                  </div>
                  <div>
                    <input value="用户名" style="width: 80px;border: none;background: #ffffff" disabled readonly/>
                    <input/>
                  </div>
                  <div>
                    <input value="班别" style="width: 80px;border: none;background: #ffffff" disabled readonly/>
                    <input/>
                  </div>
                </div>
                <div class="mask-right-three">
                  <label style="color: black">报表反馈</label>
                </div>
                <div class="mask-right-fifth">
                  <el-radio-group v-model="radioshift">
                    <el-radio :label="3">打印</el-radio>
                    <el-radio :label="6">显示</el-radio>
                    <el-radio :label="9">导出</el-radio>
                  </el-radio-group>
                </div>
                <div class="mask-right-last">
                  <textarea></textarea>
                </div>
              </div>
            </div>
            <div class="mask-bottom">
              <button>确定</button>
              <button @click="setMaskShow" style="background: #68819E">退出</button>
            </div>
          </div>
        </div>
        <!--遮罩层-->
      </div>

      <!--
        右侧导航栏
       -->
       <div class="rightNav column" :style="{ height: availHeight }">
          <ul class="navItem">
            <li v-for="(item,index) in rightNav" :key="index" @click="item.action">
              <img :src=" item.url " alt="">
            </li>
          </ul>
       </div>
      <!--底部提示信息-->
      <Bottom_prompt></Bottom_prompt>
    </el-col>

    <!--中间-->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-row>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {
        //日期
        reservearrive:'',
        //报表选项
        radioshift:3,
        //控制显示与隐藏
        maskShow:false,
        defaultActiveIndex: "/",
        loading: false,
        nickname: '',
        availHeight: '500px;',
        //表格数据
        tableData: [
            {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '收银员交接表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台入账明细',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台入账简表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台入账汇总',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台收款明细',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台收款汇总',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '前台转账报表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '冲账调账报表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '结账实收统计',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/F.png")],
            report: '结账实收明细',
            count: '1'
          }, {
            report: '',
            count: ''
          }, {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: 'AR收款报表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: '应收账入账总表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: '应收账入账明细',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/A.png")],
            report: 'AR入账简表',
            count: '1'
          }, {
            report: '',
            count: ''
          }, {
            img: [require("@/assets/images/pms/shifting/R.png")],
            report: '客房中心入账汇总表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/R.png")],
            report: '商务中心入账汇总表',
            count: '1'
          }, {
            report: '',
            count: ''
          }, {
            img: [require("@/assets/images/pms/shifting/C.png")],
            report: '储值卡款项汇总表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/C.png")],
            report: '储值卡充值明细表',
            count: '1'
          }, {
            img: [require("@/assets/images/pms/shifting/C.png")],
            report: '储值卡消费明细表',
            count: '1'
          }
        ],


        /*
          右侧导航栏
        */
        rightNav:[
          {
            url: require('@/views/pms/common/img/icon-right-user.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-setting.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-code.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-home.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-order.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-card.png'),
            action: ''
          },
          {
            url: require('@/views/pms/common/img/icon-right-duka.png'),
            action: ''
          }
        ]
      }
    },
    created() {// 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchNavData();
      this.availHeight = screen.availHeight +'px';
    },
    methods: {
      /**
       * 控制显示与隐藏
       * @param index
       */
      setMaskShow(){
        this.maskShow = !this.maskShow;
      },
      handleSelect(index){
        this.defaultActiveIndex = index;
      },
      fetchNavData () { // 初始化菜单激活项
      // debugger
        var cur_path = this.$route.path; //获取当前路由
        var routers = this.$router.options.routes; // 获取路由对象
        var nav_type = "", nav_name = "";
        for (var i = 0; i < routers.length; i++) {
          var children = routers[i].children;
          if(children){
            for (var j = 0; j < children.length; j++) {
              var grand_children = children[j].children;
              if(grand_children){
                for (var k = 0; k < grand_children.length; k++) {
                  if (grand_children[k].path === cur_path) {
                    nav_type = routers[i].type;
                    nav_name = routers[i].name;
                    break;
                  }
                  // 如果该菜单下还有子菜单
                  if(children[j].children) {
                    let grandChildren = children[j].children;
                    for(let z=0; z<grandChildren.length; z++) {
                      if(grandChildren[z].path === cur_path) {
                        nav_type = routers[i].type;
                        nav_name = routers[i].name;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        this.$store.state.topNavState = nav_type;  // 改变topNavState状态的值
        this.$store.state.leftNavState = nav_name;  // 改变leftNavState状态的值
        if(nav_type == "home"){
          this.defaultActiveIndex = "/";
        } else {
          this.defaultActiveIndex = "/" + nav_name + "Manager";
        }
      },
      jumpTo(url){
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout(){
        //logout
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          localStorage.removeItem('access-user');
          that.$router.go('/login'); //用go刷新
        }).catch(() => {});
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    },
    watch: {
      '$route': 'fetchNavData'  //监听router值改变时，改变导航菜单激活项
    }
  }
</script>
<style lang="less" scoped>
  .rightNav{
    background: #373d41;
    position: absolute;
    right: 0;
    top: 60px;
    z-index: 99;
  }
  .navItem{
    width: 38px;
    height: 38px;
    margin: 10px;
  }
  .navItem li img:hover{
    width: 45px;
    height: 45px;
  }
  .mask{
    width: 100%;
    height: 100%;
    position: fixed;
    //这里的颜色是直接可以设置背景透明的，为什么不用opacity关键字的原因是这个关键字会导致一个子继承父透明度的问题
    background: rgba(7, 13, 32, 0.2);
    top: 0;
    left: 0;
    z-index: 998;
    //悬浮框样式
    .mask-suspen {
      background: #F5F5F5;
      width: 80%;
      height: 80%;
      position: fixed;
      z-index: 999;
      top: 10%;
      left: 10%;
      //头部样式
      .mask-head{
        height: 40px;
        background: #303A41;
        line-height: 40px;
        label{
          color: #ffffff;
          margin-left: 10px;
        }
      }
      //table层的样式
      .mask-body{
        border-bottom: 1px solid #CCCCCC;
        //table样式
        .mask-left{
          float: left;
          margin-top: 10px;
          margin-left: 10px;
          margin-bottom: 10px;
          width: 65%;
        }
        //右侧统计条件样式
        .mask-right{
          height: 500px;
          float: left;
          margin-left: 10px;
          margin-top: 10px;
          width: 33%;
          .mask-right-first{
            label{
              margin-left: 20px;
            }
          }
          .mask-right-second{
            border: 1px solid #CCCCCC;
            background: #ffffff;
            margin-top: 10px;
            padding-left: 10px;
            input{
              margin-left: 1px;
              height: 27px;
              width: 175px;
              margin-top: 10px;
              margin-bottom: 10px;
              border: 1px solid #CCCCCC;
              border-radius: 4px;
            }
          }
          .mask-right-three{
            margin-top: 10px;
            label{
              margin-left: 20px;
            }
          }
          .mask-right-fifth{
            height: 86px;
            line-height: 100px;
            margin-top: 10px;
            padding-left: 20px;
            background: #ffffff;
            border: 1px solid #CCCCCC;
          }
          .mask-right-last{
            margin-top: 10px;
            height: 70px;
            textarea{
              width: 100%;
              height: 100%;
              border: 1px solid #CCCCCC;
            }
          }
        }
      }
      //底部样式
      .mask-bottom{
        button{
          float: right;
          margin-right: 10px;
          margin-top: 10px;
          height: 27px;
          width: 100px;
          border: none;
          color: #ffffff;
          line-height: 27px;
          background: #4488E9;
          border-radius: 4px;
        }
      }
    }
  }
</style>
<style>
  /*.el-menu{text-align: center}*/
  .el-menu--horizontal>.el-menu-item.is-active{border-bottom:5px solid #409EFF}
</style>
