<template>
  <div class="submitted">
    <div class="head">
      <span style="margin-right: 20px">人员报送</span>
      <span style="color:#2080DE">返回</span>
      <ul>
        <li>
          <el-select v-model="value" placeholder="请选择" size="mini" style="width: 130px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li style="margin-left: 10px">
          <el-input v-model="input" placeholder="按员工号、姓名、证件号码" size="mini"></el-input>
        </li>
        <li style="float: right;margin-right: 10px">
          <el-button type="primary" size="mini">同步人员</el-button>
          <el-button type="primary" size="mini">报送</el-button>
          <el-button type="primary" size="mini">获取反馈</el-button>
        </li>
      </ul>
    </div>
    <!--模块列表-->
    <div class="paging_table">
      <el-table
        :data="newlists"
        :cell-style="{textAlign:'center'}"
        :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
        size="mini"
        style="width: 100%;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="number"
          fixed
          label="工号">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="证件类型">
        </el-table-column>
        <el-table-column
          prop="name"
          label="证件号码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="性别">
        </el-table-column>
        <el-table-column
          prop="name"
          label="手机号码">
        </el-table-column>
        <el-table-column
          prop="name"
          label="人员状态">
        </el-table-column>
        <el-table-column
          prop="name"
          label="报送状态">
        </el-table-column>
        <el-table-column
          prop="name"
          label="身份验证状态">
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
    name: "submitted",
    data() {
      return {
        newlists: [],
        pagesize: 10,
        total: 10,
        value: '',
        input: '',
        options: [],
      }
    },
    created() {

    },
    methods: {
      /**点击分页上的页数*/
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
      },
      /**选中的*/
      handleSelectionChange() {

      }
    },
  }
</script>

<style lang="less" scoped>
  .submitted {
    width: 96%;
    height: 97%;
    margin-left: 10px;
    background: white;
    overflow-y: scroll;
    .head {
     margin: 10px;
      ul {
        overflow: hidden;
        margin-top: 10px;
        li {
          float: left;
        }
      }
    }
    .paging_table {
     margin-left: 10px;
      background: white;
    }
  }
</style>
