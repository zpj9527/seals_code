<template>
  <div class="setting">
    <ul class="navigation">
      <router-link :to="item.path" v-for="(item,index) in itemList " :key="index">
        <li :class="activeClass == index ? 'active':''" @click="getItem(index)">{{item.projectName}}</li>
      </router-link>
    </ul>
    <div class="router">
      <router-view @func="getMsgFormSon"></router-view>
      <div class="ini">
        <logon-view></logon-view>
      </div>
    </div>
  </div>

</template>

<script>
  import axios from 'axios'
  import qs from 'qs'

  export default {
    name: "setting",
    data() {
      return {
        activeClass: 0,
        itemList: [
          {
            projectName: '证件',
            path: '/setting/papers',
            parent_code: 'idcode'

          },
          {
            projectName: '市场销售',
            path: '/setting/marketing'
          },
          {
            projectName: '房态',
            path: '/setting/room-status'
          },
          {
            projectName: '预定',
            path: '/setting/reserve'
          },
          {
            projectName: '前台',
            path: '/setting/reception'
          },
          {
            projectName: '客房',
            path: '/setting/guest-room'
          },
          {
            projectName: '支付配置',
            path: '/setting/wechat'
          },
          {
            projectName: '任务体系',
            path: '/setting/mission'
          },
          {
            projectName: '角色职责',
            path: '/setting/obligation'
          },
          {
            projectName: '参数设置',
            path: '/setting/parameter'
          },
          {
            projectName: '其他',
            path: '/setting/else'
          }


        ],
        total: 20,//总条数
        tableData: [],
        pagesize: 10,
      }
    },
    methods: {
      getItem(index) {
        this.activeClass = index;  // 把当前点击元素的index，赋值给activeClass
      },
      /**接受子组件的传值*/
      getMsgFormSon(data) {
        let that = this;
        that.activeClass = data;
      },

    },
    created: function () {

    },

  }
</script>

<style lang="less" scoped>
  .active {
    /* background: #eee; */
    background: white;
    font-weight: bolder;
  }
  .setting {
    width: 100%;
    /*height: 100%;*/
    height: calc(100% - 60px);
    /*overflow: hidden;*/
    overflow-y: scroll;
    // min-width: 1900px;
    .navigation {
      float: left;
      width: 280px;
      height: 100%;
      background: #f7f7f7;
      li {
        height: 50px;
        padding-left: 40px;
        line-height: 50px;
      }
    }
    /*显示子路由*/
    .router {
      width: calc(100% - 330px);
      margin-right: 20px;
      height: 100%;
      /*overflow-y: scroll;*/
      font-size: 20px;
      float: left;
      min-width: 50px;
      /*min-height: 1000px;*/
      white-space: nowrap;
      .ini {
        height: calc(100% - 30px);
        position: absolute;
        right: 0;
        top: 30px;

      }
    }
  }

</style>
