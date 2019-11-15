<template>
  <div class="pay">
    <div class="navigation">
      <div>
        <p style="padding: 10px;background: #eeeeee;">酒店名称</p>
        <el-select v-model="hotel_group" placeholder="请选择" style="width: 229px;margin: 10px 6px" size="mini" clearable>
          <el-option
            v-for="item in hotel_list"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 280px;">
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose">
          <router-link to="/pay/compensation">
            <el-menu-item index="1-1">薪酬维护</el-menu-item>
          </router-link>
          <router-link to="/pay/SocialSecurity">
            <el-menu-item index="1-2">社保管理</el-menu-item>
          </router-link>
          <router-link to="/pay/Monthly">
            <el-menu-item index="1-3">月度输入</el-menu-item>
          </router-link>
          <router-link to="/pay/Entering">
            <el-menu-item index="1-4">考勤录入</el-menu-item>
          </router-link>
          <router-link to="/pay/Salary">
            <el-menu-item index="1-5">生成工资</el-menu-item>
          </router-link>
          <router-link to="/pay/Salarisafschrift">
            <el-menu-item index="1-6">工资报表</el-menu-item>
          </router-link>
          <el-submenu index="7">
            <template slot="title">
              <span>薪酬方案</span>
            </template>
            <el-menu-item-group>
              <router-link to="/pay/Program">
                <el-menu-item index="1-7">薪酬方案</el-menu-item>
              </router-link>
              <router-link to="/pay/paycomponent">
                <el-menu-item index="2-7">薪酬分项设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <router-link to="/pay/System">
            <el-menu-item index="1-8">社保方案</el-menu-item>
          </router-link>
          <el-submenu index="2">
            <template slot="title">
              <span>个税信息</span>
            </template>
            <el-menu-item-group>
              <router-link to="/pay/Submitted">
                <el-menu-item index="2-3">人员报送</el-menu-item>
              </router-link>
              <router-link to="/pay/IndividualInformation">
                <el-menu-item index="2-4">个税信息</el-menu-item>
              </router-link>
              <router-link to="/pay/Deduct">
                <el-menu-item index="2-5">专项附加扣除</el-menu-item>
              </router-link>
              <router-link to="/pay/Payset">
                <el-menu-item index="2-6">设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <router-link to="/pay/Paystatement">
            <el-menu-item index="3-1">薪资报表</el-menu-item>
          </router-link>
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
    name: "pay",
    data() {
      return {
        url: this.api.api_9022_9519,
        hotel_group: '',
        hotel_list: [],
      }
    },
    created: function () {
      let that = this;
      that.hotel();
    },
    methods: {
      /**封装获取酒店的信息*/
      hotel() {
        let that = this;
        let url = that.url + '/v1/common/dept/get_tree';
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
              that.hotel_group = that.hotel_list[0].name;
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
      handleOpen(key, keyPath) {
        console.log(key, keyPath);

      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    },

  }
</script>

<style lang="less" scoped>
  .pay {
    width: 100%;
    height: calc(100% - 60px);
    /*background: #eeeeee;*/
    overflow: hidden;
    .navigation {
      float: left;
      width: 280px;
      height: 100%;
      background: white;
      overflow-y: scroll;
    }
    .router {
      width: calc(100% - 282px);
      height: 100%;
      float: left;
      background: #eeeeee;
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
