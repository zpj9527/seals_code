<template>
  <div class="page-management">
    <div class="navigation">
      <div>
        <p style="padding: 10px;background: #eeeeee;">集团名称</p>
        <el-select v-model="hotel_group" placeholder="请选择" @change="bloc" style="width: 229px;margin: 10px" size="mini">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.full_name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <el-col class="pull-left" style="background-color: #EAEDF1; width: 250px;">
        <p style="padding: 10px 0 10px 10px; background: #68819EFF;color: white">酒店APP列表</p>
        <el-tree :data="branch_list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
      </el-col>
    </div>


    <div class="router">
      <div class="ini">
        <logon-view></logon-view>
      </div>
      <router-view :branch_id="branch_id" :conglomerate="conglomerate"></router-view>
    </div>

  </div>
</template>

<script>
  export default {
    name: "page-management",
    data() {
      return {
        // "http://47.98.113.173:9022"
        url: this.api.api_9022_9519,
        activeIndex: '1',
        hotel_list: [],//酒店
        branch_list: [],//app
        hotel_group: '',//酒店
        branch_id: '',//所选择app
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        conglomerate: '',
      }
    },
    created: function () {
      let that = this;
      // that.examine();//获取酒店部门
      that.full();//获取酒店
      that.app_type();//app列表
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      //点击酒店事件
      bloc(val) {
        console.log(val);
        let that = this;
        that.circle = val;
        that.app_type();
        that.conglomerate = val;

      },

      //封装获取集团信息
      full() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/hotel_group/info_list",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res.data);
              that.hotel_group = res.data.data.list[0].full_name;
              that.conglomerate = res.data.data.list[0].id;
              that.hotel_list = res.data.data.list;
              // that.circle = res.data.data.list[0].id
            }
            else {
              console.log(res.data.message);
            }
          })
          .catch(error => {
            console.log(error);
          });
      },
      //封装获取APP
      app_type() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/module/root_list",
          method: "post",
          data: {
            hotel_group_id: that.circle,
          }

        })
          .then(res => {
            if (res.data.message == "success") {
              console.log(res);
              that.branch_list = res.data.data;
              // that.branch_id=that.branch_list[0].id;
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
      //部门事件
      handleNodeClick(data) {
        let that = this;
        that.branch_id = data.id;

      },
    }
  }
</script>

<style lang="less" scoped>
  .page-management {
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
