<template>
  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap" style=" min-width: 1400px;white-space:nowrap; overflow: hidden">
      <div class="topbar-logo topbar-btn" style="width: 280px;">
        <router-link to="/index"><img src="../../../assets/logo.png" style="padding-left:38px;"></router-link>

      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff;"><span v-show="!$store.state.collapsed"></span></a>
      </div>
      <div class="topbar-title" style="margin-left: 86px">
        <el-row v-show="$store.state.topNavState==='home'"><!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
          <el-col :span="24">
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                     :router="true" style="float: left">
              <el-menu-item v-for="(item,i) in navigation_list" :key="i" :index="item.path+''">{{item.projectName}}
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <div class="rule" style="float: right;margin-right: 60px;line-height: 60px">
        <person-message></person-message>
      </div>
      <!--<div class="search" style=" float: right;" >-->
      <!--<input type="text" placeholder="手机号/姓名/房号/订单号">-->
      <!--</div>-->
      <!--<div class="topbar-account topbar-btn">-->
      <!--<el-dropdown trigger="click">-->
      <!--<span class="el-dropdown-link userinfo-inner">-->
      <!--<i class="iconfont icon-user"></i> {{nickname}}   <i class="el-icon-caret-bottom"></i></span>-->
      <!--<el-dropdown-menu slot="dropdown">-->
      <!--<el-dropdown-item>-->
      <!--<div @click="jumpTo('/user/profile')"><span style="color: #555;font-size: 14px;">个人信息</span></div>-->
      <!--</el-dropdown-item>-->
      <!--<el-dropdown-item>-->
      <!--<div @click="jumpTo('/user/changepwd')"><span style="color: #555;font-size: 14px;">修改密码</span></div>-->
      <!--</el-dropdown-item>-->
      <!--<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>-->
      <!--</el-dropdown-menu>-->
      <!--</el-dropdown>-->
      <!--</div>-->
    </el-col>

    <!--中间-->
    <transition name="fade" mode="out-in">

      <router-view></router-view>
    </transition>
  </el-row>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        navigation_list: [],
        defaultActiveIndex: "/",
        loading: false,
        nickname: '',
        itemList: [
          {
            projectName: '模块管理',
            path: '/module-tree/moduleinformation'
          },
          // {
          //   projectName: '页面管理',
          //   path: '/page-management/page-table'
          // },
          {
            projectName: '角色权限管理',
            path: '/permissions/role-privileges'
          },
          {
            projectName: '人员管理',
            path: '/personal-role/role'
          },
          {
            projectName: '管理员',
            path: '/admin'
          },
          {
            projectName: '排班考勤管理',
            path: '/composing/checking-in'
          },
          {
            projectName: '薪资管理',
            path: '/pay/compensation'
          },

          {
            projectName: '组织结构管理',
            path: '/organization/basic-info'
          },
          // {
          //   projectName: 'API管理',
          //   path: '/api'
          // },


          // {
          //   projectName: '模块类型设置',
          //   path: '/module-type-setting/module-type'
          // },

          // {
          //   projectName: '模块版本管理',
          //   path: '/module-versioning/version-list'
          // },
          {
            projectName: '多店人员管理',
            path: '/many-stores/many-stores'
          },


          // {
          //   projectName: '模块登陆日志',
          //   path: '/module-login-log/log'
          // },


        ],
      }
    },
    created() {// 组件创建完后获取数据，
      let that =this;
      /**这一块是想根据进来的路由来判断是否需要展示表头*/
      // this.index =  sessionStorage.getItem('index');
      // console.log(this.index);
      // if(that.index!=='0' ){
      //   that.navigation_list = [];
      //   that.display_conceal();
      // }else {
      //   that.navigation_list = [];
      //   that.display_conceal();
      // }
      that.navigation_list = [];
      that.display_conceal();
    },
    methods: {
      // 级别 0, 1,2,3 0 一般用户,1 系统管理员,2 集团管理员,3酒店管理员,
      display_conceal() {
        let that = this;
        let rules = sessionStorage.getItem("rules")
        let root_level = parseInt(sessionStorage.getItem("root_level"));
        console.info(root_level);
        console.log(rules);
        let navigation_list = [];
        for (let i = 0; i < that.itemList.length; i++) {
          // console.log(that.itemList[i]);
          if (root_level === 1) {
            if (that.itemList[i].projectName !== "排班考勤管理" && that.itemList[i].projectName !== "人员管理"  && that.itemList[i].projectName !== "薪资管理") {
              navigation_list.push(that.itemList[i])
            }
          } else if(root_level === 2){
            if (that.itemList[i].projectName !== "排班考勤管理" && that.itemList[i].projectName !== "人员管理" && that.itemList[i].projectName !== "模块管理" && that.itemList[i].projectName !== "多店人员管理" ) {
              navigation_list.push(that.itemList[i])
            }
          } else if (root_level === 0) {
            let rules = JSON.parse(sessionStorage.getItem("rules"));
            console.log(rules);
            Object.keys(rules.内控宝).forEach(function (key, index) {
              if (key === that.itemList[i].path) {
                console.info(that.itemList[i].path);
                if (rules.内控宝[key]) {
                  console.log(that.itemList[i]);
                  navigation_list.push(that.itemList[i])
                }
              }
              console.log(navigation_list);
            })
            // if(that.itemList[i].projectName!=="权限管理"&&that.itemList[i].projectName!=="模块树"){
            //   navigation_list.push(that.itemList[i])
            // }
          }
          else if (that.itemList[i].projectName !== "页面管理"
            && that.itemList[i].projectName !== "模块管理"
            && that.itemList[i].projectName !== "API管理" && that.itemList[i].projectName !== "管理员" && that.itemList[i].projectName !== "多店人员管理"
          ) {
            let cur_path = this.$route.path; //获取当前路由
            navigation_list.push(that.itemList[i]);
            //that.navigation_list.push(that.itemList[i])
          }
        }
        that.navigation_list = navigation_list;
      },
      //循环登陆后rules
      rules_type() {
        let that = this;


      },


      handleSelect(index) {
        this.defaultActiveIndex = index;
      },
      jumpTo(url) {
        this.defaultActiveIndex = url;
        this.$router.push(url); //用go刷新
      },
      logout() {
        //logout
        let that = this;
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonClass: 'el-button--warning'
        }).then(() => {
          //确认
          localStorage.removeItem('access-user');
          that.$router.go('/login'); //用go刷新
        }).catch(() => {
        });
      }
    },
    mounted() {
      let user = localStorage.getItem('access-user');
      if (user) {
        user = JSON.parse(user);
        this.nickname = user.nickname || '';
      }
    },
    // watch: {
    //   '$route': 'fetchNavData'  //监听router值改变时，改变导航菜单激活项
    // }
  }
</script>

<style lang="less" scoped>
  .search {
    input {
      width: 200px;
      height: 30px;
      margin-right: 10px;
    }

  }

  .topbar-title {

    white-space: nowrap;

  }
</style>
