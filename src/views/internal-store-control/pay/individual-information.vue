<template>
  <div class="individual-information">
    <div class="head">
      <span style="margin-right: 20px">个税信息</span>
      <ul>
        <li>
          <span style="margin-right: 10px">所得月份:</span>
          <el-date-picker
            v-model="value"
            type="date"
            size="mini"
            value-format="yyyy-MM-dd"
            style="width: 130px;"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li style="margin-left: 10px">
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
        <li style="margin-left: 10px">
          <el-button type="primary" size="mini">搜索</el-button>
        </li>
        <li style="float: right;margin-right: 10px">
          <el-button type="primary" size="mini">导入</el-button>
          <el-button type="primary" size="mini">从税局下载</el-button>
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
        style="width: 100%;">
        <el-table-column
          prop="number"
          fixed
          label="所得月份">
        </el-table-column>
        <el-table-column
          prop="name"
          label="员工编号">
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
          label="上期累计免税收入">
        </el-table-column>
        <el-table-column
          prop="name"
          label="累计减除费用">
        </el-table-column>
        <el-table-column
          prop="name"
          label="累计专项扣除合计">
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          label="累计专项扣除附加合计">
        </el-table-column>
        <el-table-column
          prop="name"
          label="已预交税额">
        </el-table-column>
        <el-table-column
          prop="name"
          label="错误消息">
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
    name: "individual-information",
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
    },
  }
</script>

<style lang="less" scoped>
  .individual-information {
    width: 96%;
    height: 97%;
    margin-left: 10px;
    overflow-y: scroll;
    .head {
      margin-top: 10px;
      margin-bottom: 10px;
      ul {
        overflow: hidden;
        margin-top: 10px;
        li {
          float: left;
        }
      }
    }
    .paging_table {
      height: 97%;
      background: white;
    }
  }
</style>
