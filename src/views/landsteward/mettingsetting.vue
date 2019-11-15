<template>
  <div class="global-sty">
    <el-row>
      <el-col :span="12"><div>
        <el-button size="mini" type="primary" >新增</el-button>
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div>
        <el-table
          size="mini"
          :data="tableData_task_execute"
          tooltip-effect="dark"
          :cell-style="{textAlign:'center'}"
          :header-cell-style="{background:'#68819E',color:'white',textAlign:'center'}"
          style="width: 100%;margin-top: 10px">
          <el-table-column
            prop="roomtype"
            label="房型">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column
            prop="roomnum"
            label="房间号">
          </el-table-column>
          <el-table-column
            prop="address"
            label="生成日期">
          </el-table-column>
          <el-table-column
            prop="address"
            label="生成时间">
          </el-table-column>
        </el-table>
      </div></el-col>
    </el-row>
<!--  添加会场  -->

  </div>

</template>

<script>
    export default {
        name: "buroomsetting"
    }
</script>

<style scoped lang="less">
  .global-sty {
    width: 94%;
    margin-left: 10px;
    margin-top: 10px;
  }
</style>
