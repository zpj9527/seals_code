<template>
  <div class="deduct">
    <div class="head">
      <span style="margin-right: 20px;">专项附加扣除</span>
      <ul>
        <li>
          <span style="margin-right: 10px">计薪月:</span>
          <el-date-picker
            v-model="value"
            type="date"
            size="mini"
            value-format="yyyy-MM-dd"
            style="width: 130px;"
            placeholder="选择日期">
          </el-date-picker>
        </li>
        <li style="margin-left: 10px;margin-top: 4px">
          <span>所得月：</span>
          <span>2019年2月</span>
        </li>
        <li style="margin-left: 10px">
          <el-input v-model="input" placeholder="按员工号、姓名、证件号码" size="mini"></el-input>
        </li>
        <li style="margin-left: 10px">
          <el-button type="primary" size="mini">搜索</el-button>
        </li>
      </ul>
      <div class="count">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="在职员工" name="first">
            <!--模块列表-->
            <div class="paging_table">
              <el-table
                :data="newlists"
                :cell-style="{textAlign:'center'}"
                :header-cell-style="{background:'#68819EFF',color:'white',textAlign:'center'}"
                size="mini"
                style="width: 100%">
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
          </el-tab-pane>
          <el-tab-pane label="本月半更员工" name="second">本月半更员工</el-tab-pane>
          <el-tab-pane label="已离职员工" name="third">已离职员工</el-tab-pane>

        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "deduct",
    data() {
      return {
        newlists: [],
        pagesize: 10,
        total: 10,
        value: '',
        input: '',
        options: [],
        activeName: 'first',
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
      /**所选择的标签*/
      handleClick(tab, event) {
        console.log(tab, event);
      },
    },
  }
</script>

<style lang="less" scoped>
  .deduct {
    width: 96%;
    height: 97%;
    /*margin: 0 1%;*/
    margin-left: 10px;
    background: white;
    overflow-y: scroll;
    .head {
      margin: 10px 0 10px 10px;

      ul {
        overflow: hidden;
        margin-top: 10px;
        margin-left: 10px;
        li {
          float: left;
        }
      }
    }
    .count {
      height: 100%;
      .paging_table {
        /*width: 100% ;*/
        height: 97%;
        margin-right: 10px;
        background: white;
      }
    }

  }
</style>
