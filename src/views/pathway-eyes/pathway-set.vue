<template>
  <div class="pathway-set">
    <header style="margin: 10px;overflow: hidden">
      <p style="font-size: 18px;display: inline-block;" >设置</p>
      <i class="el-icon-setting" style="font-size: 20px"></i>
      <div style="float: right;margin-right: 40px">
        <el-button type="primary" size="mini" style="width: 80px;margin-left: 20px;" >新增</el-button >
      </div>

    </header>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="智控探头设置" name="first">智控探头设置</el-tab-pane>
      <el-tab-pane label="智控录像机设置" name="second">智控录像机设置</el-tab-pane>
      <el-tab-pane label="智控小主机设置" name="third">智控小主机设置</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "pathway-set",
      data(){
          return{
            activeName:"first"
          }
      },
      created(){

      },
      methods:{
          /**tab的点击函数*/
          handleClick(tab, event){

        }
      },
    }
</script>

<style scoped>

</style>
