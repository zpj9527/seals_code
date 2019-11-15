<template>
  <div class="api">
    <div class="left">
      <div>
        <p style="margin: 10px 0   0px 10px">集团名称：</p>
        <el-select v-model="hotel_group" placeholder="请选择" style="width: 229px;margin: 10px" size="mini">
          <el-option
            v-for="item in hotel_list"
            :key="item.value"
            :label="item.full_name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="tree">
        <p>模块树</p>
        <div class="content">
          <div id="control">
            <!--<el-tree-->
            <!--:data="module_list"-->
            <!--node-key="node.id"-->
            <!--:expand-on-click-node="true"-->
            <!--node-contextmenu-->
            <!--style="font-size: 14px;"-->
            <!--@node-click="handleNodeClick">-->
            <!--<span class="custom-tree-node" slot-scope="{ node, data }">-->
            <!--<span class="my_node" :data-id="data.id">{{data.name}}</span>-->
            <!--<span style="position: absolute;right: 20px">-->
            <!--&lt;!&ndash;v-show="setpro"&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="el-icon-edit" style="margin-right: 30px " @click="() => amend(node, data)" ></i>&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="el-icon-delete" @click="() => remove(node, data)" style="margin-right: 30px " title="删除该模块"></i>&ndash;&gt;-->
            <!--&lt;!&ndash;<i class="el-icon-circle-plus" @click="append(data);flush()"  title="新增该模块下的导航" style="margin-right: 30px "></i>&ndash;&gt;-->
            <!--</span>-->
            <!--</span>-->
            <!--</el-tree>-->
            <el-tree :data="module_list" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
    <div class="right">
      <div class="paging">
        <p style="margin: 10px"><span @click="api_list" style=" cursor: pointer;">API信息</span></p>
        <!--模块列表-->
        <div class="paging_table">
          <el-table
            :data="newlists"
            :cell-style="{textAlign:'center'}"
            :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
            size="mini"
            style="width: 100%;"
          >
            <el-table-column
              prop="name"
              width="300"
              fixed
              label="API名称">
            </el-table-column>
            <el-table-column
              prop="alias"
              label="别名">
            </el-table-column>
            <el-table-column
              prop="url"
              label="API地址">
            </el-table-column>
            <el-table-column
              prop="desc"
              label="API备注">
            </el-table-column>


          </el-table>
          <!--分页-->
          <el-pagination style="float: right;"
                         layout="prev, pager, next"
                         :page-size="pagesize"
                         @current-change="handleCurrentChange"
                         :total="total">
          </el-pagination>
        </div>

      </div>
    </div>
    <div class="ini">
      <logon-view></logon-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: "api",
    data() {
      return {
        url: this.api.api_9022_9519,
        hotel_group: "",//集团
        hotel_list: [],//集团
        module_list: [],//树状结构
        newlists: [],//API信息列表
        pagesize: 10,
        total: 10,
        app_id: '',
        page_id: '',
        defaultProps: {
          children: 'page_id',
          label: 'name'
        }
      }
    },
    created() {
      let that = this;
      that.full();//获取集团
      that.module_list_methods();//获取模块书
      that.api_message();//获取API信息列表
    },
    methods: {
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
              that.hotel_group = res.data.data.list[0].id;
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
      //封装获取树状结构
      module_list_methods() {
        let that = this;
        //获取树形结构数据
        that.$axios({
          url: that.url + "/v1/common/module/get_tree2",
          method: "get",
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.module_list = res.data.data;
              console.log(that.module_list);
            }
            else {
              console.log(res.data.message);
            }

            // that.newlists=res.data.data
          })
          .catch(error => {
            console.log(error);
          });
      },
      //树状结构的事件
      handleNodeClick(data, e) {
        // this.$refs.mychild.handleClick();
        console.log(data);
        let that = this;
        if (data.page_id) {
          that.app_id = data.id
          that.page_id = null;
        } else {
          that.app_id = null;
          that.page_id = data.id
        }
        that.api_message();
        console.log(that.app_id);
        console.log(that.page_id);
      },
      /**获取API信息*/
      api_message() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/api/page_list",
          methods: "get",
          params: {
            app_id: that.app_id,
            page_id: that.page_id,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.newlists = res.data.data.list;
              that.total = res.data.data.total_count;
              // that.hintInfo("success","成功获取API信息")
            } else {
              that.hintInfo("warning", "获取API信息失败")
            }
          })
          .catch(error => {
            console.error(error)
          })
      },
      /**点击API信息获取所有的信息*/
      api_list() {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/api/page_list",
          methods: "get",

        })
          .then(res => {
            if (res.data.message === "success") {
              console.log(res);
              that.newlists = res.data.data.list;
              that.total = res.data.data.total_count;
              // that.hintInfo("success","成功获取API信息")
            } else {
              that.hintInfo("warning", "获取API信息失败")
            }
          })
          .catch(error => {
            console.error(error)
          })
      },
      //分页
      handleCurrentChange(curPage) {
        let that = this;
        that.$axios({
          url: that.url + "/v1/common/api/page_list",
          methods: "get",
          params: {
            page_num: curPage,
          }
        })
          .then(res => {
            if (res.data.message === "success") {
              that.newlists = res.data.data.list;
            }
          })
          .catch(error => {
            console.error(error);
          })
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

    },
  }
</script>

<style lang="less" scoped>
  .api {
    width: 100%;
    height: 94%;
    overflow: hidden;

    .left {
      width: 260px;
      height: 100%;
      margin-left: 10px;
      margin-right: 10px;
      float: left;
      .tree {
        height: 40px;
        background: #eeeeee;
        line-height: 40px;
        padding-left: 10px;
      }
    }
    .right {
      float: left;
      width: calc(100% - 330px);
      height: 100%;
      background: #eeeeee;
      .paging {
        width: 98%;
        margin: 1%;
        height: 100%;
        .paging_table {
          height: 90%;
          background: white;
        }
      }
    }
    .ini {
      height: 100%;
      float: right;
    }
  }
</style>
