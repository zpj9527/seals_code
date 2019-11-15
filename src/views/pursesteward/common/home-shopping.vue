<template>

  <el-row class="container">
    <!--头部-->
    <el-col :span="24" class="topbar-wrap" style=" min-width: 1400px;white-space:nowrap; overflow: hidden">
      <div class="topbar-logo topbar-btn">
        <router-link to="/index"><img src="../../../assets/logo.png" style="padding-left:8px;"></router-link>
      </div>
      <div class="topbar-logos">
        <a href="/" style="color: #fff;"><span v-show="!$store.state.collapsed"></span></a>
      </div>
      <div class="topbar-title" style="margin-left: 86px">
        <el-row v-show="$store.state.topNavState==='home'"><!-- 注意：这里就是topNavState作用之处，根据当前路由所在根路由的type值判断显示不同顶部导航菜单 -->
          <el-col :span="24">
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
                     :router="true" style="float: left">
              <el-menu-item v-for="(item,i) in  navigation_list" :key="i" :index="item.path"
                            style="width:100px;text-align: center">{{item.projectName}}
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
      <!--<div class="search" style=" float: right;" >-->
      <!--<input type="text" placeholder="手机号/姓名/房号/订单号">-->
      <!--</div>-->
      <div class="rule" style="float: right;margin-right:60px;line-height: 60px">
        <person-message></person-message>
      </div>
    </el-col>

    <!--中间-->
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </el-row>
</template>

<script>
  export default {
    name: "home-shopping",
    data() {
      return {
        defaultActiveIndex: "/",
        loading: false,
        nickname: '',
        itemList: [
          {
            projectName: '帐',
            path: '/accounting'
          },
          {
            projectName: '钱',
            path: '/money/cash'
          },
          {
            projectName: '票',
            path: '/ticket/ballot'
          },
          {
            projectName: '设置',
            path: '/advanced/entry-value'
          },


        ],
        navigation_list:[],
      }

    },
    created() {// 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.display_conceal();
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
          if (root_level === 1 || root_level === 2) {
            if (that.itemList[i].projectName !== "帐" && that.itemList[i].projectName !== "钱"  && that.itemList[i].projectName !== "票") {
              navigation_list.push(that.itemList[i])
            }
          }
          else if (root_level === 0) {
            let rules = JSON.parse(sessionStorage.getItem("rules"));
            console.log(rules);
            Object.keys(rules.钱管家).forEach(function (key, index) {
              if (key === that.itemList[i].path) {
                console.info(that.itemList[i].path);
                if (rules.钱管家[key]) {
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
          // else if (that.itemList[i].projectName !== "页面管理" && that.itemList[i].projectName !== "模块树"
          //   && that.itemList[i].projectName !== "模块版本管理" && that.itemList[i].projectName !== "模块销售管理" && that.itemList[i].projectName !== "管理员"
          //   && that.itemList[i].projectName !== "API管理" && that.itemList[i].projectName !== "管理员"
          // )
          else {
            let cur_path = this.$route.path; //获取当前路由
            navigation_list.push(that.itemList[i]);
            //that.navigation_list.push(that.itemList[i])
          }
        }
        that.navigation_list = navigation_list;
      },



      handleSelect(index) {
        this.defaultActiveIndex = index;
      },
      fetchNavData() { // 初始化菜单激活项
        // debugger
        var cur_path = this.$route.path; //获取当前路由
        var routers = this.$router.options.routes; // 获取路由对象
        var nav_type = "", nav_name = "";
        for (var i = 0; i < routers.length; i++) {
          var children = routers[i].children;
          if (children) {
            for (var j = 0; j < children.length; j++) {
              var grand_children = children[j].children;
              if (grand_children) {
                for (var k = 0; k < grand_children.length; k++) {
                  if (grand_children[k].path === cur_path) {
                    nav_type = routers[i].type;
                    nav_name = routers[i].name;
                    break;
                  }
                  // 如果该菜单下还有子菜单
                  if (children[j].children) {
                    let grandChildren = children[j].children;
                    for (let z = 0; z < grandChildren.length; z++) {
                      if (grandChildren[z].path === cur_path) {
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
        if (nav_type == "home") {
          this.defaultActiveIndex = "/";
        } else {
          this.defaultActiveIndex = "/" + nav_name + "Manager";
        }
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
