<template>
  <div class="advanced">
    <div class="navigation">
      <div>
        <p style="padding: 15px;background: #68819EFF;color: white">代码设置</p>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-submenu index="1">
            <template slot="title">
              <!--<i class="el-icon-caret-bottom"></i>-->
              <span>帐设置</span>
            </template>
            <el-menu-item-group :default-active="this.$route.path" router mode="horizontal">
              <router-link to="/advanced/entry-value">
                <el-menu-item index="1-1">入账代码</el-menu-item>
              </router-link>
              <router-link to="/advanced/audit">
                <el-menu-item index="1-2">查账原因</el-menu-item>
              </router-link>
              <router-link to="/advanced/brew">
                <el-menu-item index="1-3">冲调帐原因</el-menu-item>
              </router-link>
              <router-link to="/advanced/revocation">
                <el-menu-item index="1-4">撤销原因（冲调帐.转账.平帐）</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>付款方式设置</span>
            </template>
            <el-menu-item-group>
              <router-link to="/advanced/payment_method">
                <el-menu-item index="2-3">付款方式设置</el-menu-item>
              </router-link>
              <router-link to="/advanced/template">
                <el-menu-item index="2-4">付款方式模板设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <span>收付款原因（业务类型）设置</span>
            </template>
            <el-menu-item-group>
              <router-link to="/advanced/payment_account">
                <el-menu-item index="2-5">收付款原因</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <span>票据种类设置</span>
            </template>
            <el-menu-item-group>
              <router-link to="/advanced/commercial-bill">
                <el-menu-item index="4-3">票据种类设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <span>AR账号一览表</span>
            </template>
            <el-menu-item-group>
              <router-link to="/advanced/ar_account">
                <el-menu-item index="2-1">AR帐设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <span>收银点设置</span>
            </template>
            <el-menu-item-group>
              <router-link to="/advanced/cashiers">
                <el-menu-item index="2-3">收银点操作记录</el-menu-item>
              </router-link>
              <router-link to="/advanced/checkstand">
                <el-menu-item index="2-5">收银点设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <span>其他基础设置</span>
            </template>
            <el-menu-item-group>
              <router-link to="/advanced/currency">
                <el-menu-item index="3-1">币种设置</el-menu-item>
              </router-link>
              <router-link to="/advanced/fixed_charges">
                <el-menu-item index="3-2">固定支出</el-menu-item>
              </router-link>
              <router-link to="/advanced/security_type">
                <el-menu-item index="3-3">担保种类设置</el-menu-item>
              </router-link>
              <router-link to="/advanced/parameters">
                <el-menu-item index="3-4">参数设置</el-menu-item>
              </router-link>
              <router-link to="/advanced/credit-card">
                <el-menu-item index="3-5">信用卡设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>


        </el-menu>
      </el-col>
    </div>
    <div class="router">
      <div class="ini">
        <money-task></money-task>
      </div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: "advanced",
    data() {
      return {
        activeIndex: '1',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    }
  }
</script>

<style lang="less" scoped>
  .advanced {
    width: 100%;
    height: calc(100% - 60px);
    background: #eeeeee;
    overflow: hidden;
    .navigation {
      float: left;
      width: 249px;
      height: 100%;
      background: white;
      overflow-y: scroll;
    }
    .router {
      width: calc(100% - 249px);
      height: 100%;
      float: left;
      overflow-y: scroll;
      .ini {
        height: calc(100% - 60px);
        position: absolute;
        right: 0;
        top: 60px;
        z-index: 10;
      }
    }
  }
</style>
