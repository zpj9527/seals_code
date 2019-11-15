<template>
  <div class="composing">
    <div class="navigation">
      <!--<span>{{hotel_value}}</span>-->
      <div>
        <p style="padding: 10px 0  0  10px;">酒店名称</p>
        <el-select v-model="hotel_value" placeholder="请选择" style="width: 229px;margin: 10px" size="mini">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;">
        <p style="padding: 10px 0 10px 10px; background: #68819EFF;color: white">全部</p>
        <!--default-active="1-1"-->
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <el-menu-item-group :default-active="this.$route.path" router mode="horizontal">
            <router-link to="/composing/checking-in">
              <el-menu-item index="1-1">班次设置</el-menu-item>
            </router-link>
            <router-link to="/composing/schedule">
              <el-menu-item index="1-2">排班方式</el-menu-item>
            </router-link>
            <router-link to="/composing/crew">
              <el-menu-item index="1-3">人员排班方式设置</el-menu-item>
            </router-link>
            <router-link to="/composing/crew_calendar">
              <el-menu-item index="1-4">人员排班日历表</el-menu-item>
            </router-link>
            <router-link to="/composing/summary_one">
              <el-menu-item index="1-5">考勤一览表</el-menu-item>
            </router-link>
            <router-link to="/composing/audit_management">
              <el-menu-item index="1-6">审核管理</el-menu-item>
            </router-link>
            <router-link to="/composing/salary_site">
              <el-menu-item index="1-7">考勤点设置</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-menu>
      </el-col>
    </div>

    <div class="router">
      <div class="ini">
        <logon-view></logon-view>
      </div>
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: "composing",
    data() {
      return {
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
        hotel_value: '',
        hotel_list: [],//获取酒店
      }

    },
    created: function () {
      let that = this;
      that.hotel();
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);

      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //封装获取酒店的信息
      hotel() {
        let that = this;
        let url = that.api.api_9022_9519 + '/v1/common/dept/get_tree';
        console.info(url);
        that.$axios({
          // http://47.98.113.173:9022
          url: url,
          "method": "get",
        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res.data.data);
              that.hotel_list = res.data.data;
              that.hotel_value = that.hotel_list[0];
              console.log(that.hotel_list[0]);
              // that.bit= res.data.data.list[0].id
              // that.hotel();
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
    },
  }
</script>
<style lang="less" scoped>
  .composing {
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
    }
    .router {
      width: calc(100% - 280px);
      height: 100%;
      overflow-y: scroll;
      float: left;
      .ini {
        height: calc(100% - 30px);
        position: absolute;
        right: 0;
        top: 30px;
        z-index: 10;
      }
    }
  }
</style>
<style scoped>
  .navigation>>> .el-menu{
    border: 0;
  }
</style>
