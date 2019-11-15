<template>
  <div class="salary">
    <div class="head" style="margin-left: 10px">
      <span>生成工资 -</span>
      <span>{{nowTime}}</span>
      <div class="journal">

      </div>
      <div class="buttons">
        <el-button type="info" size="mini">查看结果</el-button>
        <el-button type="info" size="mini">重新生成</el-button>
        <el-button type="primary" size="mini">锁定</el-button>
      </div>

    </div>
    <div class="paging">
      <div class="title" style="margin-bottom: 10px">
        <p style="font-size: 14px">工资生成历史记录</p>
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
            label="月份">
          </el-table-column>
          <el-table-column
            prop="name"
            label="运行日期">
          </el-table-column>
          <el-table-column
            prop="name"
            label="员工数">
          </el-table-column>
          <el-table-column
            prop="name"
            label="总成本">
          </el-table-column>
          <el-table-column
            prop="name"
            label="总薪资支付">
          </el-table-column>
          <el-table-column
            prop="name"
            label="状态">
          </el-table-column>
          <el-table-column
            prop="address"
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <!--<el-button @click="cancel(scope.row.id,scope.$index, newlists)"type="danger" size="mini" disabled>删除</el-button>-->
              <el-button size="small" @click="submit(scope.row,scope.row.id,scope.$index, newlists)">查看结果</el-button>
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
    name: "salary",
    data() {
      return {
        newlists: [],
        pagesize: 10,
        total: 10,
        options: [],
        value1: '',
        input: '',
        value: '',
        nowTime: '',//现在时间
      }
    },
    created() {
    },
    methods: {
      /** 获取当前时间函数*/
      timeFormate(timeStamp) {
        let year = new Date(timeStamp).getFullYear();
        let month = new Date(timeStamp).getMonth() + 1 < 10 ? "0" + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1;
        let date = new Date(timeStamp).getDate() < 10 ? "0" + new Date(timeStamp).getDate() : new Date(timeStamp).getDate();
        let hh = new Date(timeStamp).getHours() < 10 ? "0" + new Date(timeStamp).getHours() : new Date(timeStamp).getHours();
        let mm = new Date(timeStamp).getMinutes() < 10 ? "0" + new Date(timeStamp).getMinutes() : new Date(timeStamp).getMinutes();
        let str = "星期" + "日一二三四五六".charAt(new Date().getDay());
        this.week = str;
        // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        this.nowTime = year + "年" + month + "月";
        this.nowTimer = hh + ":" + mm;
        // console.log(this.nowTime);
      },
      /** 定时器函数*/
      nowTimes() {
        this.timeFormate(new Date());
        setInterval(this.nowTimes, 30 * 1000);
      },
      /**点击分页上的页数*/
      handleCurrentChange(curPage) {
        let that = this
        console.log(curPage) // 当前页}
      },
    },
    mounted: function () {
      // 编译好的HTML挂载到页面完成后执行的事件钩子
      // el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
      // 此钩子函数中一般会做一些ajax请求获取数据进行数据初始化
      this.nowTimes();
    },
  }
</script>

<style lang="less" scoped>
  .salary {
    width: 96%;
    height: 97%;
    background: white;
    overflow-y: scroll;
    margin-left: 10px;
    .head {
      margin-top: 10px;
      .journal {
        height: 200px;
        border: 1px solid #2080DE;
        background: rgba(240, 248, 255, 1);
        margin-top: 10px;
      }
      .buttons {
        margin-top: 10px;
      }
    }
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
        /*width: 100% ;*/
        height: 100%;
        background: white;
        margin-right: 10px;
      }
    }
  }
</style>
