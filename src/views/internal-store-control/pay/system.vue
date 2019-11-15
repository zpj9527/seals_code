<template>
  <div class="system">
    <div class="head">
      <p style="margin-right: 20px;font-size: 16px">社保方案</p>
      <div style="float: right;margin-right: 10px">
        <el-button type="primary" size="mini">添加城市标准社保方案</el-button>
        <el-button type="primary" size="mini">创建自定义社保方案</el-button>
      </div>
    </div>
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
          prop="number"
          fixed
          label="名称">
        </el-table-column>
        <el-table-column
          prop="name"
          label="工时制">
        </el-table-column>
        <el-table-column
          prop="name"
          label="生效日期">
        </el-table-column>
        <!--<el-table-column-->
        <!--prop="address"-->
        <!--width="190"-->
        <!--fixed="right"-->
        <!--label="操作">-->
        <!--<template slot-scope="scope">-->
        <!--<el-button @click="cancel(scope.row.id,scope.$index, newlists)"type="danger" size="mini" disabled>删除</el-button>-->
        <!--<el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->

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
</template>

<script>
  export default {
    name: "system",
    data() {
      return {
        newlists: [],
        pagesize: 10,
        total: 10,
      }
    },
    created() {

    },
    methods: {
      /**点击分页上的页数*/
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
      }
    },
  }
</script>

<style lang="less" scoped>
  .system {
    width: 96%;
    height: 100%;
    margin-left: 10px;
    overflow-y: scroll;
    background: white;
    .head {
      margin: 10px;
      overflow: hidden;
    }
    .paging_table {
      margin-left: 10px;
      background: white;
    }
  }
</style>
