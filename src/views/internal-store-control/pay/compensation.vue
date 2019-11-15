<template>
  <div class="compensation">
    <div class="paging">
      <div class="title" style="margin-bottom: 10px">
        <p style="font-size: 16px">薪酬维护</p>
        <ul>
          <li>
            <el-date-picker
              v-model="value1"
              size="mini"
              style="width: 130px;"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </li>
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
          <li>
            <el-input v-model="input" placeholder="员工号/姓名" size="mini" style="width: 130px;"></el-input>
          </li>
          <li>
            <el-button type="primary" size="mini">搜索</el-button>
          </li>
          <li style="float: right;margin-right: 20px">
            <el-button type="primary" size="mini">批量调整/修改</el-button>
            <el-button type="primary" size="mini">导出</el-button>
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
        >
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
            prop="address"
            width="190"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="cancel(scope.row.id,scope.$index, newlists)" type="danger" size="mini" disabled>删除
              </el-button>
              <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">修改</el-button>
            </template>
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
</template>

<script>
  export default {
    name: "compensation",
    data() {
      return {
        newlists: [],
        pagesize: 10,
        total: 10,
        options: [],
        value1: '',
        input: '',
        value: '',
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
  .compensation {
    width: 96%;
    height: 97%;
    overflow-y: scroll;
    margin-left: 10px;
    background: white;
    .paging {
      p {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
        padding-left: 10px;
        margin-top: 10px;
      }
      .title {
        min-width: 1000px;
        ul {
          overflow: hidden;
          li {
            float: left;
            margin-left: 10px;
          }
        }
      }
      .paging_table {
        height: 97%;
        background: white;
      }
    }
  }
</style>
